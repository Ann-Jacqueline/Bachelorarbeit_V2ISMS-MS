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

    Gibt eine deterministische, klar als Mock erkennbare Antwort zurück –
    damit lassen sich Logging, Freigabe-Workflow und Endpoints
    vollständig end-to-end testen, bevor ein echter Key vorliegt.
    """

    provider_name = "mock"

    def complete(self, system_prompt: str, user_prompt: str) -> LLMResponse:
        text = (
            "[MOCK-ANTWORT – kein echtes LLM angebunden] "
            f"System-Prompt ({len(system_prompt)} Zeichen) und "
            f"User-Prompt ({len(user_prompt)} Zeichen) empfangen."
        )
        return LLMResponse(text=text, model="mock-model", provider=self.provider_name)


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
