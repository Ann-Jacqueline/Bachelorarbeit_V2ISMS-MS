"""Zentraler Einstiegspunkt für alle Agent-Aufrufe.

Jeder Call läuft über run_agent_action(): LLM aufrufen, Ergebnis IMMER
im agent_log protokollieren (auch Fehler), Ergebnis nur als Vorschlag
('proposed') zurückgeben. Kein Agent schreibt jemals direkt in Fachtabellen –
Freigabe erfolgt separat durch einen Menschen (review_proposal).
"""

from module_agents.llm_client import create_llm_client, LLMClient
from module_agents.agent_log import (
    ensure_agent_log_table,
    insert_agent_log,
    review_agent_log,
    get_agent_log,
    get_agent_logs,
)


class AgentService:

    def __init__(self, conn, llm_client: LLMClient | None = None):
        self.conn = conn
        self.llm_client = llm_client or create_llm_client()
        ensure_agent_log_table(conn)

    def run_agent_action(
        self,
        agent_name: str,
        action: str,
        system_prompt: str,
        user_prompt: str,
        session_id: str | None = None,
        control_id: str | None = None,
    ) -> dict:
        """Führt einen Agent-Call aus und protokolliert ihn vollständig.

        Rückgabe ist immer ein Vorschlag (status='proposed') oder ein
        Fehler (status='error') – nie eine automatisch wirksame Änderung.
        """
        input_text = f"[system]\n{system_prompt}\n\n[user]\n{user_prompt}"

        try:
            llm_response = self.llm_client.complete(system_prompt, user_prompt)
        except Exception as exc:
            log_id = insert_agent_log(
                self.conn,
                agent_name=agent_name,
                action=action,
                input_text=input_text,
                output_text=f"FEHLER: {exc}",
                provider=self.llm_client.provider_name,
                model="unknown",
                status="error",
                session_id=session_id,
                control_id=control_id,
            )
            return {
                "status": "error",
                "message": "Agent-Aufruf fehlgeschlagen.",
                "data": {"log_id": log_id},
            }

        log_id = insert_agent_log(
            self.conn,
            agent_name=agent_name,
            action=action,
            input_text=input_text,
            output_text=llm_response.text,
            provider=llm_response.provider,
            model=llm_response.model,
            status="proposed",
            session_id=session_id,
            control_id=control_id,
        )

        return {
            "status": "success",
            "message": "Agent-Vorschlag erstellt – wartet auf menschliche Freigabe.",
            "data": {
                "log_id": log_id,
                "proposal": llm_response.text,
                "provider": llm_response.provider,
                "model": llm_response.model,
                "review_status": "proposed",
            },
        }

    def review_proposal(self, log_id: int, decision: str, reviewed_by: str | None = None) -> dict:
        """Menschliche Freigabe ('accepted') oder Ablehnung ('rejected')."""
        try:
            updated = review_agent_log(self.conn, log_id, decision, reviewed_by)
        except ValueError as exc:
            return {"status": "error", "message": str(exc), "data": None}

        if not updated:
            return {
                "status": "not_found",
                "message": f"Kein offener Vorschlag (status='proposed') mit log_id={log_id}.",
                "data": None,
            }

        return {
            "status": "success",
            "message": f"Vorschlag {log_id} wurde als '{decision}' markiert.",
            "data": get_agent_log(self.conn, log_id),
        }

    def list_proposals(self, status: str | None = None, session_id: str | None = None) -> dict:
        """Listet Agent-Logs/Vorschläge für Transparenz und Review-UI."""
        logs = get_agent_logs(self.conn, status=status, session_id=session_id)
        return {"status": "success", "message": None, "data": logs}
