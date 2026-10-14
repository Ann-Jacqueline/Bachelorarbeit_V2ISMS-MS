from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.graphics.shapes import Drawing, Rect, String, Wedge, Circle
from reportlab.platypus import (
    HRFlowable,
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

# Corporate Dark: Akzent aus dem V²ISMS-Branding, komplett dunkles Report-Design.
_ACCENT = colors.HexColor("#2596be")
_ACCENT_BRIGHT = colors.HexColor("#7fd4ef")
_ACCENT_DARK = colors.HexColor("#1b6f8f")
_ACCENT_SOFT = colors.HexColor("#123043")
_DARK = colors.HexColor("#0B1220")
_PANEL = colors.HexColor("#121A2B")
_PANEL_ALT = colors.HexColor("#16203a")
_TRACK = colors.HexColor("#1d2a44")
_TEXT = colors.HexColor("#E8EEF5")
_TEXT_MUTED = colors.HexColor("#9FB0C0")
_GRID = colors.HexColor("#243049")
_WHITE = colors.HexColor("#FFFFFF")

_LOGO_PATH = (
    Path(__file__).resolve().parents[2]
    / "frontend"
    / "public"
    / "assets"
    / "V2ISMS-MS_logo.png"
)

_REVIEW_STATUS_LABELS = {
    "proposed": "Wartet auf Freigabe",
    "accepted": "Freigegeben",
    "rejected": "Abgelehnt",
    "error": "Fehler",
}


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
            fontSize=18, textColor=_TEXT, leading=21, spaceAfter=0,
        ),
        "h2": ParagraphStyle(
            "RpH2", parent=base["Heading2"], fontName="Helvetica-Bold",
            fontSize=13, textColor=_ACCENT_BRIGHT, spaceBefore=6 * mm, spaceAfter=3 * mm,
        ),
        "h3": ParagraphStyle(
            "RpH3", parent=base["Heading3"], fontName="Helvetica-Bold",
            fontSize=11, textColor=_ACCENT, spaceBefore=4 * mm, spaceAfter=2 * mm,
        ),
        "body": ParagraphStyle(
            "RpBody", parent=base["BodyText"], fontName="Helvetica",
            fontSize=9, leading=13, spaceAfter=2 * mm, textColor=_TEXT,
        ),
        "small": ParagraphStyle(
            "RpSmall", parent=base["BodyText"], fontName="Helvetica",
            fontSize=7.5, leading=10.5, textColor=_TEXT_MUTED, spaceAfter=1.5 * mm,
        ),
        "cell": ParagraphStyle(
            "RpCell", parent=base["BodyText"], fontName="Helvetica",
            fontSize=8, leading=10.5, textColor=_TEXT,
        ),
        "cellHeader": ParagraphStyle(
            "RpCellHeader", parent=base["BodyText"], fontName="Helvetica-Bold",
            fontSize=8, leading=10.5, textColor=_WHITE,
        ),
        "kpiValue": ParagraphStyle(
            "RpKpiValue", parent=base["Heading1"], fontName="Helvetica-Bold",
            fontSize=17, leading=19, textColor=_ACCENT_BRIGHT, alignment=1,
        ),
        "kpiLabel": ParagraphStyle(
            "RpKpiLabel", parent=base["BodyText"], fontName="Helvetica",
            fontSize=7.5, leading=10, textColor=_TEXT_MUTED, alignment=1,
        ),
        "coverTitle": ParagraphStyle(
            "RpCoverTitle", parent=base["Heading1"], fontName="Helvetica-Bold",
            fontSize=20, textColor=_WHITE, leading=24,
        ),
        "coverMeta": ParagraphStyle(
            "RpCoverMeta", parent=base["BodyText"], fontName="Helvetica",
            fontSize=9, leading=13, textColor=colors.HexColor("#B7C4CF"),
        ),
    }


def _logo_flowable():
    if not _LOGO_PATH.exists():
        return None
    try:
        image = Image(str(_LOGO_PATH))
        ratio = image.imageHeight / float(image.imageWidth or 1)
        width = 48 * mm
        image.drawWidth = width
        image.drawHeight = width * ratio
        return image
    except Exception:
        return None


def _cover_header(styles, report):
    title_block = [
        Paragraph("V2ISMS-MS Reifegrad-Report", styles["coverTitle"]),
        Spacer(1, 1.5 * mm),
        Paragraph(
            _pdf_safe(report.get("generated_with")) or "V2ISMS-MS",
            styles["coverMeta"],
        ),
        Paragraph(
            f"Session: {_pdf_safe(report.get('session_id'))} &nbsp;·&nbsp; "
            f"Export: {_pdf_safe(report.get('generated_at'))}",
            styles["coverMeta"],
        ),
    ]

    logo = _logo_flowable()
    if logo is not None:
        row = [logo, title_block]
        col_widths = [52 * mm, None]
    else:
        row = [title_block]
        col_widths = [None]

    table = Table([row], colWidths=col_widths)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), _PANEL),
        ("BOX", (0, 0), (-1, -1), 0.5, _GRID),
        ("LINEBELOW", (0, 0), (-1, -1), 3, _ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    return [
        table,
        Spacer(1, 4 * mm),
    ]


def _meta_table(styles, report):
    rows = [
        [Paragraph("<b>Session</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("session_id")), styles["cell"])],
        [Paragraph("<b>Status</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("status")), styles["cell"])],
        [Paragraph("<b>Erstellt</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("created_at")), styles["cell"])],
        [Paragraph("<b>Zuletzt geändert</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("updated_at")), styles["cell"])],
        [Paragraph("<b>Export erzeugt</b>", styles["cell"]), Paragraph(_pdf_safe(report.get("generated_at")), styles["cell"])],
    ]
    return _styled_table(rows, [35 * mm, None], has_header=False)


def _styled_table(rows, col_widths=None, has_header=True):
    table = Table(rows, colWidths=col_widths, repeatRows=1 if has_header else 0)
    style = [
        ("GRID", (0, 0), (-1, -1), 0.4, _GRID),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]
    if has_header:
        style.append(("BACKGROUND", (0, 0), (-1, 0), _ACCENT_DARK))
        style.append(("BACKGROUND", (0, 1), (-1, -1), _PANEL))
        style.append(("ROWBACKGROUNDS", (0, 1), (-1, -1), [_PANEL, _PANEL_ALT]))
    else:
        style.append(("BACKGROUND", (0, 0), (-1, -1), _PANEL))
    table.setStyle(TableStyle(style))
    return table


def _executive_section(styles, executive):
    story = []
    story.append(Paragraph(
        _pdf_safe(executive.get("statement")) or "",
        styles["body"],
    ))
    rows = [
        [Paragraph("Kennzahl", styles["cellHeader"]), Paragraph("Wert", styles["cellHeader"])],
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
        [Paragraph("Kennzahl", styles["cellHeader"]), Paragraph("Wert", styles["cellHeader"])],
        [Paragraph("Controls im Prüfumfang", styles["cell"]), Paragraph(_pdf_safe(coverage.get("total_controls")), styles["cell"])],
        [Paragraph("Bewertete Controls", styles["cell"]), Paragraph(_pdf_safe(coverage.get("rated_controls")), styles["cell"])],
        [Paragraph("Vollständig bewertet", styles["cell"]), Paragraph(_pdf_safe(coverage.get("complete_controls")), styles["cell"])],
        [Paragraph("Nicht vollständig bewertet", styles["cell"]), Paragraph(_pdf_safe(coverage.get("incomplete_controls")), styles["cell"])],
        [Paragraph("Nicht bewertet (0 Punkte)", styles["cell"]), Paragraph(_pdf_safe(coverage.get("unrated_controls")), styles["cell"])],
        [Paragraph("Abdeckung", styles["cell"]), Paragraph(_fmt(coverage.get("coverage_percentage")), styles["cell"])],
    ]
    zero_rows = [
        [Paragraph("Grund für 0 Punkte", styles["cellHeader"]), Paragraph("Anzahl", styles["cellHeader"])],
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


def _kpi_dashboard(styles, executive):
    coverage = executive.get("coverage") or {}
    cards = [
        (_fmt(executive.get("percentage")), "Reifegrad (Prüfumfang)"),
        (_pdf_safe(executive.get("avg_mil_display")) or "n/a", "Ø MIL-Level"),
        (_fmt(coverage.get("coverage_percentage")), "Abdeckung bewerteter Controls"),
        (
            f"{_pdf_safe(executive.get('achieved_points'))} / {_pdf_safe(executive.get('max_points'))}",
            "Punkte (erreicht / max.)",
        ),
    ]
    row = [
        [
            Paragraph(_pdf_safe(value), styles["kpiValue"]),
            Spacer(1, 1.5 * mm),
            Paragraph(_pdf_safe(label), styles["kpiLabel"]),
        ]
        for value, label in cards
    ]
    table = Table([row], colWidths=[None, None, None, None])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), _PANEL),
        ("BOX", (0, 0), (-1, -1), 0.5, _GRID),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, _GRID),
        ("LINEABOVE", (0, 0), (-1, 0), 2, _ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table


def _donut_flowable(percentage, caption, size=32 * mm):
    pct = 0.0 if percentage is None else max(0.0, min(100.0, float(percentage)))
    drawing = Drawing(size, size)
    radius = size / 2 - 3
    center = size / 2
    drawing.add(Circle(center, center, radius, fillColor=_TRACK, strokeColor=_GRID, strokeWidth=0.5))
    if pct > 0:
        sweep = 360.0 * (pct / 100.0)
        drawing.add(
            Wedge(
                center, center, radius,
                startangledegrees=90 - sweep,
                endangledegrees=90,
                fillColor=_ACCENT,
                strokeColor=None,
            )
        )
    drawing.add(Circle(center, center, radius * 0.6, fillColor=_DARK, strokeColor=None))
    drawing.add(
        String(center, center - 2, f"{pct:.0f}%", fontName="Helvetica-Bold",
               fontSize=12, fillColor=_TEXT, textAnchor="middle")
    )
    drawing.add(
        String(center, center - 13, caption, fontName="Helvetica",
               fontSize=6, fillColor=_TEXT_MUTED, textAnchor="middle")
    )
    return drawing


def _domain_bars_flowable(domains, width=170 * mm, bar_h=8 * mm, gap=3 * mm):
    if not domains:
        return None
    height = len(domains) * (bar_h + gap) + gap
    drawing = Drawing(width, height)
    label_w = 54 * mm
    value_w = 14 * mm
    track_w = width - label_w - value_w
    y = height - gap - bar_h
    for domain in domains:
        percentage = domain.get("percentage")
        pct = 0.0 if percentage is None else max(0.0, min(100.0, float(percentage)))
        name = str(domain.get("domain") or "Unbekannt")
        if len(name) > 34:
            name = name[:33] + "…"
        drawing.add(
            String(0, y + bar_h / 2 - 2.5, name, fontName="Helvetica",
                   fontSize=7.5, fillColor=_TEXT)
        )
        drawing.add(Rect(label_w, y, track_w, bar_h, fillColor=_TRACK, strokeColor=None))
        if pct > 0:
            drawing.add(
                Rect(label_w, y, track_w * (pct / 100.0), bar_h,
                     fillColor=_ACCENT, strokeColor=None)
            )
        drawing.add(
            String(label_w + track_w + 1.5 * mm, y + bar_h / 2 - 2.5, f"{pct:.1f}%",
                   fontName="Helvetica-Bold", fontSize=7.5, fillColor=_ACCENT_BRIGHT)
        )
        y -= (bar_h + gap)
    return drawing


def _dashboard_graphics(styles, report):
    executive = report.get("executive") or {}
    coverage = executive.get("coverage") or {}
    donuts = Table(
        [[
            _donut_flowable(executive.get("percentage"), "Reifegrad"),
            _donut_flowable(coverage.get("coverage_percentage"), "Abdeckung"),
            _donut_flowable(executive.get("rated_percentage"), "bewertete Controls"),
        ]],
        colWidths=[None, None, None],
    )
    donuts.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))

    story = [donuts, Spacer(1, 2 * mm)]
    bars = _domain_bars_flowable(report.get("domains") or [])
    if bars is not None:
        story.append(Paragraph("Reifegrad je Domäne", styles["h3"]))
        story.append(bars)
    return story


def _domains_section(styles, report):
    domains = report.get("domains") or []
    rows = [
        [
            Paragraph("Domäne", styles["cellHeader"]),
            Paragraph("Reifegrad", styles["cellHeader"]),
            Paragraph("Punkte", styles["cellHeader"]),
            Paragraph("Ø MIL", styles["cellHeader"]),
            Paragraph("Abdeckung", styles["cellHeader"]),
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
        ("BACKGROUND", (0, 0), (-1, 0), _ACCENT_DARK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [_PANEL, _PANEL_ALT]),
        ("GRID", (0, 0), (-1, -1), 0.4, _GRID),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return [table]


def _ai_section(styles, section, candidates=None):
    story = []
    if not section:
        story.append(Paragraph(
            "Für diese Session wurde keine KI-Analyse erfasst.", styles["body"]
        ))
        return story

    rows = [
        [Paragraph("Status", styles["cellHeader"]),
         Paragraph(_REVIEW_STATUS_LABELS.get(section.get("status"), _pdf_safe(section.get("status"))), styles["cell"])],
        [Paragraph("Erstellt", styles["cellHeader"]),
         Paragraph(_pdf_safe(section.get("created_at")), styles["cell"])],
        [Paragraph("Freigegeben von", styles["cellHeader"]),
         Paragraph(_pdf_safe(section.get("reviewed_by")) or "–", styles["cell"])],
        [Paragraph("Freigabe am", styles["cellHeader"]),
         Paragraph(_pdf_safe(section.get("reviewed_at")) or "–", styles["cell"])],
        [Paragraph("Modell", styles["cellHeader"]),
         Paragraph(f"{_pdf_safe(section.get('provider'))} / {_pdf_safe(section.get('model'))}", styles["cell"])],
    ]
    story.append(_styled_table(rows, [42 * mm, None]))
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph(_pdf_safe(section.get("output_text")), styles["body"]))
    story.append(Spacer(1, 4 * mm))

    if candidates:
        story.append(Paragraph("Priorisierte Kandidaten (deterministisch)", styles["h3"]))
        candidate_rows = [
            [
                Paragraph("Control", styles["cellHeader"]),
                Paragraph("Domäne", styles["cellHeader"]),
                Paragraph("Umsetzungsgrad", styles["cellHeader"]),
                Paragraph("Kritikalität", styles["cellHeader"]),
                Paragraph("Priorität", styles["cellHeader"]),
            ]
        ]
        for candidate in candidates:
            candidate_rows.append([
                Paragraph(
                    f"{_pdf_safe(candidate.get('control_id'))} – "
                    f"{_pdf_safe(candidate.get('control_name'))}",
                    styles["cell"],
                ),
                Paragraph(_pdf_safe(candidate.get("domain")), styles["cell"]),
                Paragraph(_pdf_safe(candidate.get("mil_display")) or "nicht bewertet", styles["cell"]),
                Paragraph(_pdf_safe(candidate.get("kritikalitaet")) or "unbekannt", styles["cell"]),
                Paragraph(_pdf_safe(candidate.get("priority_score")), styles["cell"]),
            ])
        candidate_table = Table(
            candidate_rows,
            colWidths=[44 * mm, 30 * mm, 40 * mm, 26 * mm, 20 * mm],
            repeatRows=1,
        )
        candidate_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), _ACCENT_DARK),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [_PANEL, _PANEL_ALT]),
            ("GRID", (0, 0), (-1, -1), 0.4, _GRID),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]))
        story.append(candidate_table)
        story.append(Spacer(1, 3 * mm))

    return story


def _controls_section(styles, report):
    story = []
    for domain in report.get("domains") or []:
        story.append(Paragraph(_pdf_safe(domain.get("domain")), styles["h3"]))
        rows = [
            [
                Paragraph("Control", styles["cellHeader"]),
                Paragraph("Status", styles["cellHeader"]),
                Paragraph("MIL-Level", styles["cellHeader"]),
                Paragraph("0-Punkte-Grund", styles["cellHeader"]),
                Paragraph("Notiz", styles["cellHeader"]),
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
            ("BACKGROUND", (0, 0), (-1, 0), _ACCENT_DARK),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [_PANEL, _PANEL_ALT]),
            ("GRID", (0, 0), (-1, -1), 0.4, _GRID),
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
                        Paragraph("Metrik", styles["cellHeader"]),
                        Paragraph("Audit-Notiz", styles["cellHeader"]),
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
            [Paragraph("Status", styles["cellHeader"]), Paragraph(_pdf_safe(log.get("status")), styles["cell"])],
            [Paragraph("Freigegeben von", styles["cellHeader"]), Paragraph(_pdf_safe(log.get("reviewed_by")) or "–", styles["cell"])],
            [Paragraph("Freigabe am", styles["cellHeader"]), Paragraph(_pdf_safe(log.get("reviewed_at")) or "–", styles["cell"])],
            [Paragraph("Zeitpunkt", styles["cellHeader"]), Paragraph(_pdf_safe(log.get("created_at")), styles["cell"])],
        ]
        if log.get("control_id"):
            rows.append([Paragraph("Control", styles["cellHeader"]), Paragraph(_pdf_safe(log.get("control_id")), styles["cell"])])
        rows.append([Paragraph("Modell", styles["cellHeader"]), Paragraph(f"{_pdf_safe(log.get('provider'))} / {_pdf_safe(log.get('model'))}", styles["cell"])])
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
            [Paragraph("MIL", styles["cellHeader"]), Paragraph("Reifegradband", styles["cellHeader"])]
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
        *_cover_header(styles, report),
        _meta_table(styles, report),
        Paragraph("1. Executive Summary", styles["h2"]),
        *_executive_section(styles, report.get("executive") or {}),
        Spacer(1, 3 * mm),
        _kpi_dashboard(styles, report.get("executive") or {}),
        Spacer(1, 5 * mm),
        *_dashboard_graphics(styles, report),
        Paragraph("2. Abdeckung und 0-Punkte-Auswertung", styles["h2"]),
        *_coverage_section(styles, report.get("executive") or {}),
        Paragraph("3. Reifegrad nach Domänen", styles["h2"]),
        *_domains_section(styles, report),
        Paragraph("4. KI-Assessment des ISMS-Stands", styles["h2"]),
        *_ai_section(styles, report.get("isms_assessment")),
        Paragraph("5. KI-Verbesserungsvorschläge", styles["h2"]),
        *_ai_section(
            styles,
            report.get("improvement_suggestions"),
            candidates=(report.get("improvement_suggestions") or {}).get("candidates"),
        ),
        Paragraph("6. Control-Details", styles["h2"]),
        *_controls_section(styles, report),
        Paragraph("7. AI-Analysen (Agent-Audit-Trail)", styles["h2"]),
        *_agents_section(styles, report),
        Paragraph("8. Berechnungsmethodik", styles["h2"]),
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

    def _decorate(canvas_obj, doc_obj):
        canvas_obj.saveState()
        # Komplett dunkler Seitenhintergrund (Corporate Dark, alle Seiten).
        canvas_obj.setFillColor(_DARK)
        canvas_obj.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        # Akzentlinie am Seitenkopf (ab Seite 2, Seite 1 hat den Header-Block).
        if doc_obj.page > 1:
            canvas_obj.setStrokeColor(_ACCENT)
            canvas_obj.setLineWidth(2)
            canvas_obj.line(18 * mm, A4[1] - 12 * mm, A4[0] - 18 * mm, A4[1] - 12 * mm)
        canvas_obj.setFont("Helvetica", 7.5)
        canvas_obj.setFillColor(_TEXT_MUTED)
        canvas_obj.drawRightString(A4[0] - 18 * mm, 10 * mm, f"Seite {doc_obj.page}")
        canvas_obj.drawString(
            18 * mm, 10 * mm,
            f"V2ISMS-MS Reifegrad-Report – {str(report.get('session_id'))}",
        )
        canvas_obj.restoreState()

    document.build(story, onFirstPage=_decorate, onLaterPages=_decorate)
    return buffer.getvalue()
