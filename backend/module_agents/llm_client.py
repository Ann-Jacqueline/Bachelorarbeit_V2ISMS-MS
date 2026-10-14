"""LLM-Client-Abstraktion für V²ISMS-MS.

Design-Prinzip (siehe V2ISMS-MS_Agents.md):
- Agenten haben ausschließlich Vorschlagsrecht (max. Level 2).
- Der Provider ist per Umgebungsvariable austauschbar:
    AGENT_LLM_PROVIDER = mock | openai | anthropic | deepseek (Default: mock)
    AGENT_LLM_MODEL = Modellname (optional, providerabhängiger Default)
    OPENAI_API_KEY / ANTHROPIC_API_KEY / DEEPSEEK_API_KEY = API-Key des Providers

Der Mock-Provider erlaubt Entwicklung und Tests komplett ohne API-Key.
"""

import os
import re
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class LLMResponse:
    """Einheitliches Antwortformat aller Provider."""
    text: str
    model: str
    provider: str


class LLMClient(ABC):
    """Gemeinsame Schnittstelle aller LLM-Provider."""

    provider_name: str = "abstract"

    @abstractmethod
    def complete(self, system_prompt: str, user_prompt: str) -> LLMResponse:
        """Führt einen einzelnen Completion-Call aus."""
        raise NotImplementedError


class MockLLMClient(LLMClient):
    """Platzhalter-Provider ohne API-Key.

    Liefert für den Notiz-Analyse-Prompt (NoteAnalyzerAgent) eine realistische,
    strukturierte Analyse auf Basis des Notiztextes – damit lassen sich
    Logging, Freigabe-Workflow und Endpoints vollständig end-to-end testen,
    bevor ein echter Key vorliegt. Die Antwort bleibt klar als Mock erkennbar.
    """

    provider_name = "mock"

    def complete(self, system_prompt: str, user_prompt: str) -> LLMResponse:
        text = self._build_mock_response(user_prompt)
        return LLMResponse(text=text, model="mock-model", provider=self.provider_name)

    def _build_mock_response(self, user_prompt: str) -> str:
        if "ISMS-Reifegrad-Kontext" in user_prompt:
            return self._build_mock_isms_assessment(user_prompt)
        if "Priorisierte Verbesserungskandidaten" in user_prompt:
            return self._build_mock_improvements(user_prompt)

        note = self._extract_note(user_prompt)
        if note is None:
            return (
                "[MOCK-ANTWORT – kein echtes LLM angebunden] "
                f"System-Prompt ({len(user_prompt)} Zeichen) empfangen."
            )

        control = self._field(user_prompt, r"Control:\s*([^\n]+)")
        domain = self._field(user_prompt, r"Domain:\s*([^\n]+)")
        mil_level = self._field(user_prompt, r"MIL-Wert[^:]*:\s*([0-9.]+)")

        lines = []
        lines.append(self._mock_summary(control, domain, note))
        lines.append("")
        lines.append("**Belegte Sicherheitsaspekte:**")
        aspects = self._mock_aspects(note)
        lines.extend(aspects or ["- Keine konkreten Angaben in der Notiz."])
        lines.append("")
        lines.append("**Offene Punkte:**")
        open_points = self._mock_open_points(note)
        lines.extend(open_points or ["Keine erkennbar."])
        if mil_level:
            lines.append("")
            lines.append(
                f"(Kontextinformation: gewählter MIL-Wert {mil_level} – "
                "wird vom Agenten bewusst nicht bewertet.)"
            )
        lines.append("")
        lines.append(
            "— [MOCK-Antwort, automatisch aus dem Notiztext erzeugt; "
            "keine echte LLM-Auswertung.]"
        )
        return "\n".join(lines)

    def _build_mock_isms_assessment(self, user_prompt: str) -> str:
        percentage = self._field(user_prompt, r"Gesamt-Reifegrad[^:]*:\s*([^\n]+)")
        avg_mil = self._field(user_prompt, r"Ø MIL-Level:\s*([^\n]+)")
        coverage = self._field(user_prompt, r"Abdeckung:\s*([^\n]+)")
        not_implemented = self._field(
            user_prompt, r"Explizit MIL 0 \(Not Implemented\):\s*([^\n]+)"
        )

        domains = re.findall(
            r"^-\s*([^:]+):\s*Reifegrad\s*([^,]+),\s*Ø MIL\s*([^,]+),\s*Abdeckung\s*([^,]+)",
            user_prompt,
            re.MULTILINE,
        )

        lines = []
        lines.append(
            "**Gesamteinschätzung:** "
            f"Auf Basis der vorgegebenen Scores liegt der Gesamt-Reifegrad bei "
            f"{percentage or 'n/a'} (Ø MIL {avg_mil or 'n/a'}, Abdeckung "
            f"{coverage or 'n/a'}). "
            "Das ISMS zeigt eine teilweise Umsetzung der Controls; die Abdeckung "
            "ist bei der Bewertung der Aussagekraft zu berücksichtigen."
        )
        lines.append("")
        lines.append("**Stärken:**")

        sorted_domains = sorted(
            domains, key=lambda item: item[1], reverse=True
        )
        strengths = sorted_domains[:2]
        if strengths:
            for name, pct, mil, cov in strengths:
                lines.append(
                    f"- {name.strip()}: vergleichsweise hoher Reifegrad "
                    f"({pct.strip()}, Ø MIL {mil.strip()})."
                )
        else:
            lines.append("- Keine Domänendaten ableitbar.")
        lines.append("")
        lines.append("**Schwächen und Risiken:**")
        weaknesses = sorted_domains[-2:] if len(sorted_domains) > 2 else sorted_domains
        if weaknesses:
            for name, pct, mil, cov in weaknesses:
                lines.append(
                    f"- {name.strip()}: niedriger Reifegrad ({pct.strip()}, "
                    f"Ø MIL {mil.strip()}); Handlungsbedarf."
                )
        if not_implemented and not_implemented.strip() not in ("0", "None"):
            lines.append(
                f"- {not_implemented.strip()} Control(s) explizit MIL 0 "
                "(Not Implemented) – nicht umgesetzt."
            )
        lines.append("")
        lines.append("**Dringendster Handlungsbedarf:**")
        if weaknesses:
            name = weaknesses[0][0].strip()
            lines.append(
                f"- Zuerst Domäne {name} adressieren (schwächster Reifegrad im "
                "vorgegebenen Score)."
            )
        lines.append(
            "- Nicht/vollständig bewertete Controls nachbewerten, um die "
            "Aussagekraft des Gesamtscores zu erhöhen."
        )
        lines.append("")
        lines.append(
            "— [MOCK-Antwort, aus den vorgegebenen Scores erzeugt; keine echte "
            "LLM-Auswertung. Der Agent bewertet keine MIL-Werte selbst.]"
        )
        return "\n".join(lines)

    def _build_mock_improvements(self, user_prompt: str) -> str:
        candidates = re.findall(
            r"^\d+\.\s*([^|]+)\|\s*([^|]+)\|\s*Kritikalität:\s*([^|]+)\|\s*Priorität:\s*([^\n]+)",
            user_prompt,
            re.MULTILINE,
        )

        lines = []
        lines.append(
            "**Zusammenfassung:** "
            f"Der größte Hebel liegt bei den {len(candidates)} höchstpriorisierten "
            "Controls (hohe Kritikalität bei gleichzeitig niedrigem Umsetzungsgrad)."
        )
        lines.append("")
        lines.append("**Priorisierte Verbesserungsvorschläge:**")
        if not candidates:
            lines.append("- Keine Kandidaten übergeben.")
        for control, mil, krit, prio in candidates:
            control = control.strip()
            lines.append(
                f"- **{control}**: Maßnahme – Umsetzungsgrad von {mil.strip()} "
                f"gezielt anheben; Bezug – Kritikalität {krit.strip()} bei "
                f"Priorität {prio.strip()}. Erwarteter Effekt: spürbare Reduktion "
                "des Risikos in diesem Control."
            )
        lines.append("")
        lines.append("**Hinweis:** Die Priorisierung basiert auf MIL-Lücke und Kritikalität.")
        lines.append("")
        lines.append(
            "— [MOCK-Antwort, aus den vorgegebenen Kandidaten erzeugt; keine echte "
            "LLM-Auswertung. Der Agent bewertet keine MIL-Werte selbst.]"
        )
        return "\n".join(lines)

    def _field(self, text: str, pattern: str) -> str | None:
        match = re.search(pattern, text)
        if not match:
            return None
        return match.group(1).strip()

    def _extract_note(self, user_prompt: str) -> str | None:
        match = re.search(r"Audit-Notiz:\s*\n?(.*)$", user_prompt, re.DOTALL)
        return match.group(1).strip() if match else None

    def _split_points(self, note: str, max_points: int = 4):
        parts = re.split(r"[\n;•]", note)
        points = [p.strip(" -.\t") for p in parts if p and p.strip(" -.\t")]
        if not points:
            sentences = [s.strip() for s in note.split(".") if s.strip()]
            points = [s for s in sentences]
        return points[:max_points]

    def _mock_summary(self, control, domain, note) -> str:
        first = self._split_points(note, 1)[0] if self._split_points(note, 1) else note
        if len(first) > 140:
            first = first[:140].rstrip() + " …"
        context = control if control else "des Controls"
        if domain:
            context = f"{context} (Domain {domain})"
        return (
            f"**Zusammenfassung:** Die Audit-Notiz zu {context} beschreibt: "
            f"„{first}“."
        )

    def _mock_aspects(self, note: str) -> list:
        return [f"- {point}" for point in self._split_points(note, 4)]

    def _mock_open_points(self, note: str) -> list:
        hints = [
            "offen", "geplant", "ausstehend", "noch ", "fehlt", "fehlend",
            "unzureichend", "nicht umgesetzt", "kein ", "lücke", "Lücke",
            "TODO", "ausstehend", "zu prüfen", "noch nicht",
        ]
        open_points = []
        for point in self._split_points(note, 6):
            lowered = point.lower()
            if any(hint.lower() in lowered for hint in hints):
                open_points.append(f"- {point}")
        return open_points[:2]


class OpenAIClient(LLMClient):
    """OpenAI-Provider (benötigt `openai`-Paket und OPENAI_API_KEY)."""

    provider_name = "openai"
    default_model = "gpt-4o-mini"

    def __init__(self, model: str | None = None):
        from openai import OpenAI  # lazy import: Paket nur nötig, wenn Provider aktiv
        self._client = OpenAI()  # liest OPENAI_API_KEY aus der Umgebung
        self._model = model or self.default_model

    def complete(self, system_prompt: str, user_prompt: str) -> LLMResponse:
        response = self._client.chat.completions.create(
            model=self._model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        return LLMResponse(
            text=response.choices[0].message.content or "",
            model=self._model,
            provider=self.provider_name,
        )


class DeepSeekClient(OpenAIClient):
    """DeepSeek-Provider – nutzt die OpenAI-kompatible API von DeepSeek.

    Benötigt `openai`-Paket und DEEPSEEK_API_KEY.
    """

    provider_name = "deepseek"
    default_model = "deepseek-chat"

    def __init__(self, model: str | None = None):
        from openai import OpenAI  # lazy import
        api_key = os.environ.get("DEEPSEEK_API_KEY")
        if not api_key:
            raise ValueError("DEEPSEEK_API_KEY ist nicht gesetzt.")
        self._client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")
        self._model = model or self.default_model


def create_llm_client() -> LLMClient:
    """Factory: liefert den per AGENT_LLM_PROVIDER konfigurierten Client."""
    provider = os.environ.get("AGENT_LLM_PROVIDER", "mock").strip().lower()
    model = os.environ.get("AGENT_LLM_MODEL") or None

    if provider == "mock":
        return MockLLMClient()
    if provider == "openai":
        return OpenAIClient(model=model)
    if provider == "deepseek":
        return DeepSeekClient(model=model)

    raise ValueError(
        f"Unbekannter LLM-Provider '{provider}'. "
        "Erlaubt: mock, openai, anthropic, deepseek (AGENT_LLM_PROVIDER)."
    )
