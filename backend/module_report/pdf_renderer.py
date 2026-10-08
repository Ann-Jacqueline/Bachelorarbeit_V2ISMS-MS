from io import BytesIO
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

_ACCENT = colors.HexColor("#16324F")
_MUTED = colors.HexColor("#5B6B79")
_LIGHT_ROWS = colors.HexColor("#F4F6F8")


def _pdf_safe(value):
    if value is None:
        return ""
    text = str(value)
    text = text.replace("\u2194", " / ")
    return escape(text.encode("cp1252", errors="replace").decode("cp1252"))


def _fmt(value, suffix="%"):
    if value is None:
        return "n/a"
    return f"{value:.1f}{suffix}"


def _styles():
    base = getSampleStyleSheet()
    return {
        "h1": ParagraphStyle(
            "RpH1", parent=base["Heading1"], fontName="Helvetica-Bold",
            fontSize=18, textColor=_ACCENT, spaceAfter=4 * mm,
        ),
        "h2": ParagraphStyle(
            "RpH2", parent=base["Heading2"], fontName="Helvetica-Bold",
            fontSize=13, textColor=_ACCENT, spaceBefore=6 * mm, spaceAfter=3 * mm,
        ),
        "h3": ParagraphStyle(
            "RpH3", parent=base["Heading3"], fontName="Helvetica-Bold",
            fontSize=11, textColor=_ACCENT, spaceBefore=4 * mm, spaceAfter=2 * mm,
        ),
        "body": ParagraphStyle(
            "RpBody", parent=base["BodyText"], fontName="Helvetica",
            fontSize=9, leading=13, spaceAfter=2 * mm,
        ),
        "small": ParagraphStyle(
            "RpSmall", parent=base["BodyText"], fontName="Helvetica",
            fontSize=7.5, leading=10.5, textColor=_MUTED, spaceAfter=1.5 * mm,
        ),
        "cell": ParagraphStyle(
            "RpCell", parent=base["BodyText"], fontName="Helvetica",
            fontSize=8, leading=10.5,
        ),
    }


def _meta_table(styles, report):
    rows = [
        [Paragraph("<b>Session</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("session_id")), styles["cell"])],
        [Paragraph("<b>Status</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("status")), styles["cell"])],
        [Paragraph("<b>Erstellt</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("created_at")), styles["cell"])],
        [Paragraph("<b>Zuletzt geändert</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("updated_at")), styles["cell"])],
        [Paragraph("<b>Export erzeugt</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("generated_at")), styles["cell"])],
    ]
    return _styled_table(rows, [35 * mm, None])


def _styled_table(rows, col_widths=None):
    table = Table(rows, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), _LIGHT_ROWS),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD3DA")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table


def _executive_section(styles, executive):
    story = []
    story.append(Paragraph(
        _pdf_safe(executive.get("statement")) or "",
        styles["body"],
    ))
    rows = [
        [Paragraph("<b>Kennzahl</b>", styles["cell"]), Paragraph("<b>Wert</b>", styles["cell"])],
        [
            Paragraph("Reifegrad (gesamter Prüfumfang, unbewertet = 0)", styles["cell"]),
            Paragraph(_fmt(executive.get("percentage")), styles["cell"]),
        ],
        [
            Paragraph("Reifegrad (nur bewertete Controls)", styles["cell"]),
            Paragraph(_fmt(executive.get("rated_percentage")), styles["cell"]),
        ],
        [
            Paragraph("Ø MIL-Level", styles["cell"]),
            Paragraph(_pdf_safe(executive.get("avg_mil_display")) or "n/a", styles["cell"]),
        ],
        [
            Paragraph("Punkte", styles["cell"]),
            Paragraph(f"{_pdf_safe(executive.get('achieved_points'))} / {_pdf_safe(executive.get('max_points'))}", styles["cell"]),
        ],
    ]
    story.append(_styled_table(rows, [90 * mm, None]))
    return story


def _coverage_section(styles, executive):
    coverage = executive.get("coverage") or {}
    rows = [
        [Paragraph("<b>Kennzahl</b>", styles["cell"]), Paragraph("<b>Wert</b>", styles["cell"])],
        [Paragraph("Controls im Prüfumfang", styles["cell"]), Paragraph(_pdf_safe(coverage.get("total_controls")), styles["cell"])],
        [Paragraph("Bewertete Controls", styles["cell"]), Paragraph(_pdf_safe(coverage.get("rated_controls")), styles["cell"])],
        [Paragraph("Vollständig bewertet", styles["cell"]), Paragraph(_pdf_safe(coverage.get("complete_controls")), styles["cell"])],
        [Paragraph("Nicht vollständig bewertet", styles["cell"]), Paragraph(_pdf_safe(coverage.get("incomplete_controls")), styles["cell"])],
        [Paragraph("Nicht bewertet (0 Punkte)", styles["cell"]), Paragraph(_pdf_safe(coverage.get("unrated_controls")), styles["cell"])],
        [Paragraph("Abdeckung", styles["cell"]), Paragraph(_fmt(coverage.get("coverage_percentage")), styles["cell"])],
    ]
    zero_rows = [
        [Paragraph("<b>Grund für 0 Punkte</b>", styles["cell"]), Paragraph("<b>Anzahl</b>", styles["cell"])],
        [
            Paragraph("Explizit MIL 0 (Not Implemented)", styles["cell"]),
            Paragraph(_pdf_safe(coverage.get("zero_not_implemented")), styles["cell"]),
        ],
        [
            Paragraph("Nicht bewertet (keine Reifegrad-Bewertung)", styles["cell"]),
            Paragraph(_pdf_safe(coverage.get("zero_not_rated")), styles["cell"]),
        ],
    ]
    return [
        _styled_table(rows, [90 * mm, None]),
        Spacer(1, 3 * mm),
        Paragraph("0-Punkte-Differenzierung", styles["h3"]),
        _styled_table(zero_rows, [90 * mm, None]),
    ]


def _domains_section(styles, report):
    domains = report.get("domains") or []
    rows = [
        [
            Paragraph("<b>Domäne</b>", styles["cell"]),
            Paragraph("<b>Reifegrad</b>", styles["cell"]),
            Paragraph("<b>Punkte</b>", styles["cell"]),
            Paragraph("<b>Ø MIL</b>", styles["cell"]),
            Paragraph("<b>Abdeckung</b>", styles["cell"]),
        ]
    ]
    for domain in domains:
        coverage = domain.get("coverage") or {}
        avg = domain.get("avg_mil_level")
        avg_text = "n/a" if avg is None else f"MIL {round(float(avg), 1):.1f}"
        rows.append([
            Paragraph(_pdf_safe(domain.get("domain")), styles["cell"]),
            Paragraph(_fmt(domain.get("percentage")), styles["cell"]),
            Paragraph(
                f"{_pdf_safe(domain.get('achieved_points'))} / {_pdf_safe(domain.get('max_points'))}",
                styles["cell"],
            ),
            Paragraph(avg_text, styles["cell"]),
            Paragraph(_fmt(coverage.get("coverage_percentage")), styles["cell"]),
        ])
    table = Table(rows, colWidths=[38 * mm, 26 * mm, 28 * mm, 30 * mm, 28 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), _LIGHT_ROWS),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD3DA")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return [table]


def _controls_section(styles, report):
    story = []
    for domain in report.get("domains") or []:
        story.append(Paragraph(_pdf_safe(domain.get("domain")), styles["h3"]))
        rows = [
            [
                Paragraph("<b>Control</b>", styles["cell"]),
                Paragraph("<b>Status</b>", styles["cell"]),
                Paragraph("<b>MIL-Level</b>", styles["cell"]),
                Paragraph("<b>0-Punkte-Grund</b>", styles["cell"]),
                Paragraph("<b>Notiz</b>", styles["cell"]),
            ]
        ]
        for control in domain.get("controls") or []:
            zero_reason_label = {
                "not_implemented": "Not Implemented (MIL 0)",
                "not_rated": "nicht bewertet",
            }.get(control.get("zero_reason"), "–")
            note = _pdf_safe(control.get("note"))
            if len(note) > 160:
                note = note[:160] + "…"
            rows.append([
                Paragraph(
                    f"{_pdf_safe(control.get('control_id'))} – {_pdf_safe(control.get('control_name'))}",
                    styles["cell"],
                ),
                Paragraph(_pdf_safe(control.get("status")), styles["cell"]),
                Paragraph(_pdf_safe(control.get("mil_display")) or "n/a", styles["cell"]),
                Paragraph(zero_reason_label, styles["cell"]),
                Paragraph(note or "–", styles["cell"]),
            ])
        table = Table(
            rows,
            colWidths=[42 * mm, 18 * mm, 40 * mm, 28 * mm, None],
            repeatRows=1,
        )
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), _LIGHT_ROWS),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD3DA")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]))
        story.append(table)
        story.append(Spacer(1, 3 * mm))

        notes_any = any(
            control.get("metric_notes") for control in domain.get("controls") or []
        )
        if notes_any:
            story.append(Paragraph("Audit-Notizen (je Metrik)", styles["h3"]))
            for control in domain.get("controls") or []:
                metric_notes = control.get("metric_notes") or []
                if not metric_notes:
                    continue
                story.append(Paragraph(
                    f"{_pdf_safe(control.get('control_id'))} – "
                    f"{_pdf_safe(control.get('control_name'))}",
                    styles["body"],
                ))
                note_rows = [
                    [
                        Paragraph("<b>Metrik</b>", styles["cell"]),
                        Paragraph("<b>Audit-Notiz</b>", styles["cell"]),
                    ]
                ]
                for metric_note in metric_notes:
                    label = _pdf_safe(metric_note.get("metric_name")) or _pdf_safe(
                        metric_note.get("metric_id")
                    )
                    note_rows.append([
                        Paragraph(
                            f"{label}<br/><i>{_pdf_safe(metric_note.get('metric_id'))}</i>",
                            styles["cell"],
                        ),
                        Paragraph(_pdf_safe(metric_note.get("note")), styles["cell"]),
                    ])
                story.append(_styled_table(note_rows, [52 * mm, None]))
                story.append(Spacer(1, 2 * mm))
            story.append(Spacer(1, 2 * mm))

        missing_any = any(
            control.get("missing_metrics") for control in domain.get("controls") or []
        )
        if missing_any:
            story.append(Paragraph(
                "Nicht bewertete Fragen (Maturity Evaluator)", styles["h3"]
            ))
            for control in domain.get("controls") or []:
                missing_metrics = control.get("missing_metrics") or []
                if not missing_metrics:
                    continue
                lines = [
                    f"{_pdf_safe(metric_ref.get('metric_name')) or _pdf_safe(metric_ref.get('metric_id'))}"
                    f" <i>({_pdf_safe(metric_ref.get('metric_id'))})</i> – nicht bewertet"
                    for metric_ref in missing_metrics
                ]
                story.append(Paragraph(
                    f"<b>{_pdf_safe(control.get('control_id'))} – "
                    f"{_pdf_safe(control.get('control_name'))}</b>",
                    styles["body"],
                ))
                story.append(Paragraph("<br/>".join(lines), styles["small"]))
                story.append(Spacer(1, 2 * mm))
            story.append(Spacer(1, 2 * mm))
    return story


def _agents_section(styles, report):
    story = []
    agent_logs = report.get("agent_logs") or []
    if not agent_logs:
        story.append(Paragraph(
            "Für diese Session wurden keine Agent-Analysen erfasst.", styles["body"]
        ))
        return story

    for log in agent_logs:
        story.append(Paragraph(
            f"{_pdf_safe(log.get('agent_name'))} – {_pdf_safe(log.get('action'))}",
            styles["h3"],
        ))
        rows = [
            [Paragraph("<b>Status</b>", styles["cell"]), Paragraph(_pdf_safe(log.get("status")), styles["cell"])],
            [Paragraph("<b>Freigegeben von</b>", styles["cell"]), Paragraph(_pdf_safe(log.get("reviewed_by")) or "–", styles["cell"])],
            [Paragraph("<b>Freigabe am</b>", styles["cell"]), Paragraph(_pdf_safe(log.get("reviewed_at")) or "–", styles["cell"])],
            [Paragraph("<b>Zeitpunkt</b>", styles["cell"]), Paragraph(_pdf_safe(log.get("created_at")), styles["cell"])],
        ]
        if log.get("control_id"):
            rows.append([Paragraph("<b>Control</b>", styles["cell"]), Paragraph(_pdf_safe(log.get("control_id")), styles["cell"])])
        rows.append([Paragraph("<b>Modell</b>", styles["cell"]), Paragraph(f"{_pdf_safe(log.get('provider'))} / {_pdf_safe(log.get('model'))}", styles["cell"])])
        story.append(_styled_table(rows, [42 * mm, None]))
        story.append(Spacer(1, 2 * mm))
        output = _pdf_safe(log.get("output_text"))
        if len(output) > 800:
            output = output[:800] + "…"
        story.append(Paragraph(output, styles["body"]))
        story.append(Spacer(1, 4 * mm))
    return story


def _methodology_section(styles, report):
    methodology = report.get("methodology") or {}
    story = []
    for key, text in methodology.items():
        if key == "maturity_bands":
            continue
        story.append(Paragraph(f"<b>{_pdf_safe(key)}</b>: {_pdf_safe(text)}", styles["body"]))
    bands = methodology.get("maturity_bands") or []
    if bands:
        rows = [
            [Paragraph("<b>MIL</b>", styles["cell"]), Paragraph("<b>Reifegradband</b>", styles["cell"])]
        ]
        for band in bands:
            rows.append([
                Paragraph(_pdf_safe(band.get("mil")), styles["cell"]),
                Paragraph(_pdf_safe(band.get("label")), styles["cell"]),
            ])
        story.append(Spacer(1, 3 * mm))
        story.append(_styled_table(rows, [28 * mm, None]))
    return story


def render_pdf(report):
    styles = _styles()
    story = [
        Paragraph("V2ISMS-MS Reifegrad-Report", styles["h1"]),
        _meta_table(styles, report),
        Paragraph("1. Executive Summary", styles["h2"]),
        *_executive_section(styles, report.get("executive") or {}),
        Paragraph("2. Abdeckung und 0-Punkte-Auswertung", styles["h2"]),
        *_coverage_section(styles, report.get("executive") or {}),
        Paragraph("3. Reifegrad nach Domänen", styles["h2"]),
        *_domains_section(styles, report),
        Paragraph("4. Control-Details", styles["h2"]),
        *_controls_section(styles, report),
        Paragraph("5. AI-Analysen (Agent-Audit-Trail)", styles["h2"]),
        *_agents_section(styles, report),
        Paragraph("6. Berechnungsmethodik", styles["h2"]),
        *_methodology_section(styles, report),
    ]

    buffer = BytesIO()
    document = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="V2ISMS-MS Reifegrad-Report",
    )

    def _footer(canvas_obj, doc_obj):
        canvas_obj.saveState()
        canvas_obj.setFont("Helvetica", 7.5)
        canvas_obj.setFillColor(_MUTED)
        canvas_obj.drawRightString(A4[0] - 18 * mm, 10 * mm, f"Seite {doc_obj.page}")
        canvas_obj.drawString(
            18 * mm, 10 * mm,
            f"V2ISMS-MS Reifegrad-Report – {str(report.get('session_id'))}",
        )
        canvas_obj.restoreState()

    document.build(story, onFirstPage=_footer, onLaterPages=_footer)
    return buffer.getvalue()