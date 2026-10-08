def _fmt(value, suffix="%"):
    if value is None:
        return "n/a"
    return f"{value:.1f}{suffix}"


def _safe(value):
    return "" if value is None else str(value)


def _maturity_band_label(value):
    if value is None:
        return "n/a"
    if value >= 3.0:
        return "Fully Implemented"
    if value >= 2.0:
        return "Largely Implemented"
    if value >= 1.0:
        return "Partially Implemented"
    return "Not Implemented"


def render_markdown(report):
    lines = []
    lines.append("# V2ISMS-MS Reifegrad-Report")
    lines.append("")
    lines.append(f"- **Session**: `{_safe(report.get('session_id'))}`")
    lines.append(f"- **Status**: {_safe(report.get('status'))}")
    lines.append(f"- **Erstellt**: {_safe(report.get('created_at'))}")
    lines.append(f"- **Zuletzt geändert**: {_safe(report.get('updated_at'))}")
    lines.append(f"- **Export erzeugt**: {_safe(report.get('generated_at'))}")
    lines.append("")

    executive = report.get("executive") or {}
    lines.append("## 1. Executive Summary")
    lines.append("")
    lines.append(_safe(executive.get("statement")))
    lines.append("")
    lines.append("| Kennzahl | Wert |")
    lines.append("|---|---|")
    lines.append(f"| Reifegrad (gesamter Prüfumfang, unbewertet = 0) | {_fmt(executive.get('percentage'))} |")
    lines.append(f"| Reifegrad (nur bewertete Controls) | {_fmt(executive.get('rated_percentage'))} |")
    avg_display = executive.get("avg_mil_display")
    lines.append(f"| Ø MIL-Level | {_safe(avg_display)} |")
    lines.append(
        f"| Punkte | {_safe(executive.get('achieved_points'))} / "
        f"{_safe(executive.get('max_points'))} |"
    )
    lines.append("")

    coverage = executive.get("coverage") or {}
    lines.append("## 2. Abdeckung und 0-Punkte-Auswertung")
    lines.append("")
    lines.append("| Kennzahl | Wert |")
    lines.append("|---|---|")
    lines.append(f"| Controls im Prüfumfang | {_safe(coverage.get('total_controls'))} |")
    lines.append(f"| Bewertete Controls | {_safe(coverage.get('rated_controls'))} |")
    lines.append(f"| Vollständig bewertet | {_safe(coverage.get('complete_controls'))} |")
    lines.append(f"| Nicht vollständig bewertet | {_safe(coverage.get('incomplete_controls'))} |")
    lines.append(f"| Nicht bewertet (0 Punkte) | {_safe(coverage.get('unrated_controls'))} |")
    lines.append(f"| Abdeckung | {_fmt(coverage.get('coverage_percentage'))} |")
    lines.append("")
    lines.append("**0-Punkte-Differenzierung:**")
    lines.append("")
    lines.append("| Grund | Anzahl |")
    lines.append("|---|---|")
    lines.append(
        "| 0 Punkte – explizit MIL 0 (Not Implemented) | "
        f"{_safe(coverage.get('zero_not_implemented'))} |"
    )
    lines.append(
        "| 0 Punkte – nicht bewertet (keine Reifegrad-Bewertung) | "
        f"{_safe(coverage.get('zero_not_rated'))} |"
    )
    lines.append("")

    domains = report.get("domains") or []
    lines.append("## 3. Reifegrad nach Domänen")
    lines.append("")
    lines.append("| Domäne | Reifegrad | Punkte | Ø MIL | Abdeckung |")
    lines.append("|---|---|---|---|---|")
    for domain in domains:
        domain_coverage = domain.get("coverage") or {}
        lines.append(
            f"| {_safe(domain.get('domain'))} | {_fmt(domain.get('percentage'))} | "
            f"{_safe(domain.get('achieved_points'))} / {_safe(domain.get('max_points'))} | "
            f"{_safe(_mil_display_short(domain.get('avg_mil_level')))} | "
            f"{_fmt(domain_coverage.get('coverage_percentage'))} |"
        )
    lines.append("")

    lines.append("## 4. Control-Details")
    lines.append("")
    for domain in domains:
        lines.append(f"### {_safe(domain.get('domain'))}")
        lines.append("")
        lines.append("| Control | Status | MIL-Level | 0-Punkte-Grund | Notiz |")
        lines.append("|---|---|---|---|---|")
        for control in domain.get("controls") or []:
            zero_reason_label = {
                "not_implemented": "Not Implemented (MIL 0)",
                "not_rated": "nicht bewertet",
            }.get(control.get("zero_reason"), "–")
            note = _safe(control.get("note")).replace("|", "\\|")
            note = (note[:80] + "…") if len(note) > 80 else note
            lines.append(
                f"| {_safe(control.get('control_id'))} {_safe(control.get('control_name'))} "
                f"| {_safe(control.get('status'))} | {_safe(control.get('mil_display'))} "
                f"| {zero_reason_label} | {note} |"
            )
        lines.append("")

        notes_any = any(
            control.get("metric_notes") for control in domain.get("controls") or []
        )
        if notes_any:
            lines.append("#### Audit-Notizen (je Metrik)")
            lines.append("")
            for control in domain.get("controls") or []:
                metric_notes = control.get("metric_notes") or []
                if not metric_notes:
                    continue
                lines.append(
                    f"**{_safe(control.get('control_id'))} – "
                    f"{_safe(control.get('control_name'))}**"
                )
                lines.append("")
                for metric_note in metric_notes:
                    label = _safe(metric_note.get("metric_name")) or _safe(
                        metric_note.get("metric_id")
                    )
                    lines.append(
                        f"- **{label}** ({_safe(metric_note.get('metric_id'))}): "
                        f"{_safe(metric_note.get('note'))}"
                    )
                lines.append("")

        missing_any = any(
            control.get("missing_metrics") for control in domain.get("controls") or []
        )
        if missing_any:
            lines.append("#### Nicht bewertete Fragen (Maturity Evaluator)")
            lines.append("")
            for control in domain.get("controls") or []:
                missing_metrics = control.get("missing_metrics") or []
                if not missing_metrics:
                    continue
                lines.append(
                    f"**{_safe(control.get('control_id'))} – "
                    f"{_safe(control.get('control_name'))}**"
                )
                lines.append("")
                for metric_ref in missing_metrics:
                    label = _safe(metric_ref.get("metric_name")) or _safe(
                        metric_ref.get("metric_id")
                    )
                    lines.append(
                        f"- **{label}** ({_safe(metric_ref.get('metric_id'))}) – nicht bewertet"
                    )
                lines.append("")

    agent_logs = report.get("agent_logs") or []
    lines.append("## 5. AI-Analysen (Agent-Audit-Trail)")
    lines.append("")
    if not agent_logs:
        lines.append("Für diese Session wurden keine Agent-Analysen erfasst.")
        lines.append("")
    else:
        for log in agent_logs:
            lines.append(f"### {_safe(log.get('agent_name'))} – {_safe(log.get('action'))}")
            lines.append("")
            lines.append(f"- **Status**: {_safe(log.get('status'))}")
            lines.append(f"- **Freigegeben von**: {_safe(log.get('reviewed_by')) or '–'}")
            lines.append(f"- **Freigabe am**: {_safe(log.get('reviewed_at')) or '–'}")
            lines.append(f"- **Zeitpunkt**: {_safe(log.get('created_at'))}")
            if log.get("control_id"):
                lines.append(f"- **Control**: {_safe(log.get('control_id'))}")
            lines.append(f"- **Modell**: {_safe(log.get('provider'))} / {_safe(log.get('model'))}")
            lines.append("")
            lines.append("```")
            lines.append(_safe(log.get("output_text")) + "\n")
            lines.append("```")
            lines.append("")

    methodology = report.get("methodology") or {}
    lines.append("## 6. Berechnungsmethodik")
    lines.append("")
    for key, text in methodology.items():
        if key == "maturity_bands":
            continue
        lines.append(f"- **{key}**: {_safe(text)}")
    lines.append("")

    return "\n".join(lines) + "\n"


def _mil_display_short(avg_mil_level):
    if avg_mil_level is None:
        return "n/a"
    return f"MIL {round(float(avg_mil_level), 1):.1f} ({_maturity_band_label(avg_mil_level)})"