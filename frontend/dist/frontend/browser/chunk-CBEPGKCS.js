import {
  MetricViewService
} from "./chunk-QSDFC4RZ.js";
import {
  CommonModule,
  Component,
  HostListener,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  Router,
  ViewChild,
  ViewChildren,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-VDFY4THU.js";

// src/app/pages/metric-view/metric-view.component.ts
var _c0 = ["canvasScene"];
var _c1 = ["centerNode"];
var _c2 = ["profilePanel"];
var _c3 = ["evidencePanel"];
var _c4 = ["groupPanel"];
var _c5 = (a0, a1) => ({ "verification-group": a0, "validation-group": a1 });
function MetricViewComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, " Controls werden geladen... ");
    \u0275\u0275elementEnd();
  }
}
function MetricViewComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function MetricViewComponent_ul_17_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 28);
    \u0275\u0275listener("click", function MetricViewComponent_ul_17_li_1_Template_button_click_1_listener() {
      const control_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectControl(control_r3.control_id));
    });
    \u0275\u0275elementStart(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const control_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", control_r3.control_id === ctx_r0.selectedControlId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(control_r3.control_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(control_r3.name);
  }
}
function MetricViewComponent_ul_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 26);
    \u0275\u0275template(1, MetricViewComponent_ul_17_li_1_Template, 6, 4, "li", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.controls);
  }
}
function MetricViewComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1, " Metric View wird geladen... ");
    \u0275\u0275elementEnd();
  }
}
function MetricViewComponent_div_30__svg_path_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 49);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", ctx_r0.getConnectorPath("profile"));
  }
}
function MetricViewComponent_div_30__svg_path_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 50);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", ctx_r0.getConnectorPath("evidence"));
  }
}
function MetricViewComponent_div_30__svg_path_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 51);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", ctx_r0.getConnectorPath("verification"));
  }
}
function MetricViewComponent_div_30__svg_path_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 51);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("d", ctx_r0.getConnectorPath("validation"));
  }
}
function MetricViewComponent_div_30_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePanel("profile"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r0.getConnectorPointStyle("profile"));
  }
}
function MetricViewComponent_div_30_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePanel("evidence"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r0.getConnectorPointStyle("evidence"));
  }
}
function MetricViewComponent_div_30_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroup("verification"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r0.getConnectorPointStyle("verification"));
  }
}
function MetricViewComponent_div_30_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroup("validation"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r0.getConnectorPointStyle("validation"));
  }
}
function MetricViewComponent_div_30_aside_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 56, 2)(2, "div", 57)(3, "span", 58);
    \u0275\u0275text(4, "Struktur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 59);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_aside_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePanel("profile"));
    });
    \u0275\u0275text(6, " \u2212 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 60)(8, "p", 61);
    \u0275\u0275text(9, "Control-Profil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 62)(13, "span", 63);
    \u0275\u0275text(14, "Control ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 64);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 65)(18, "h4");
    \u0275\u0275text(19, "Beschreibung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.metricTree.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.metricTree.data["control_id"]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.controlDescription);
  }
}
function MetricViewComponent_div_30_aside_13_div_18_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 80)(1, "span", 81);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.text);
  }
}
function MetricViewComponent_div_30_aside_13_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "p", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 78);
    \u0275\u0275template(4, MetricViewComponent_div_30_aside_13_div_18_li_4_Template, 5, 2, "li", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.evidenceIntroText, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.evidenceTypeExplanations);
  }
}
function MetricViewComponent_div_30_aside_13_ul_25_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 84)(1, "div", 85)(2, "span", 86);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 87);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 88);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const evidence_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", evidence_r12.data["beispiel_asset"] || "Kein Beispiel-Asset", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatEvidenceType(evidence_r12.data["evidenzart_code"]), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", evidence_r12.data["beschreibung"] || "Keine Beschreibung vorhanden.", " ");
  }
}
function MetricViewComponent_div_30_aside_13_ul_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 82);
    \u0275\u0275template(1, MetricViewComponent_div_30_aside_13_ul_25_li_1_Template, 8, 3, "li", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.selectedEvidenceItems);
  }
}
function MetricViewComponent_div_30_aside_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 66, 3)(2, "div", 57)(3, "span", 58);
    \u0275\u0275text(4, "Evidenz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 67);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_aside_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePanel("evidence"));
    });
    \u0275\u0275text(6, " \u2212 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 68)(8, "p", 69);
    \u0275\u0275text(9, "Evidenzen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 70)(13, "button", 71);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_aside_13_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleEvidenceSection("info"));
    });
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Was bedeuten Evidenzarten und Beispiel-Assets?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 72);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, MetricViewComponent_div_30_aside_13_div_18_Template, 5, 2, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 74)(20, "button", 71);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_aside_13_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleEvidenceSection("items"));
    });
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Einzelne Evidenzen anzeigen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 72);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(25, MetricViewComponent_div_30_aside_13_ul_25_Template, 2, 1, "ul", 75);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.name);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r0.isEvidenceSectionOpen("info"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.isEvidenceSectionOpen("info") ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEvidenceSectionOpen("info"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r0.isEvidenceSectionOpen("items"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.isEvidenceSectionOpen("items") ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEvidenceSectionOpen("items"));
  }
}
function MetricViewComponent_div_30_ng_container_25_section_1_article_17_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 110)(2, "span", 111);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 112)(5, "h4");
    \u0275\u0275text(6, "Beschreibung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 112)(10, "h4");
    \u0275\u0275text(11, "Formel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const metric_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Control Umsetzungsscore der Metrik: ", ctx_r0.formatScore(metric_r16.score), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((metric_r16.details == null ? null : metric_r16.details.data == null ? null : metric_r16.details.data["beschreibung"]) || "Keine Beschreibung vorhanden.");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((metric_r16.details == null ? null : metric_r16.details.data == null ? null : metric_r16.details.data["formel"]) || "Keine Formel vorhanden.");
  }
}
function MetricViewComponent_div_30_ng_container_25_section_1_article_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 102)(1, "button", 103);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_ng_container_25_section_1_article_17_Template_button_click_1_listener() {
      const metric_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.selectMetric(metric_r16);
      return \u0275\u0275resetView(ctx_r0.toggleMetricDetails(metric_r16));
    });
    \u0275\u0275elementStart(2, "span", 104);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 105)(5, "span", 106);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 107);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, MetricViewComponent_div_30_ng_container_25_section_1_article_17_div_9_Template, 14, 3, "div", 108);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const metric_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", (ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.id) === metric_r16.id)("expanded", ctx_r0.isMetricExpanded(metric_r16.id));
    \u0275\u0275advance();
    \u0275\u0275classProp("active", (ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.id) === metric_r16.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r16.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatScore(metric_r16.score));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.isMetricExpanded(metric_r16.id) ? "\u2212" : "+", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isMetricExpanded(metric_r16.id));
  }
}
function MetricViewComponent_div_30_ng_container_25_section_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 90, 4)(2, "div", 91)(3, "div", 92)(4, "span", 93);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 94)(7, "button", 95);
    \u0275\u0275text(8, " i ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 96);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 97)(12, "span", 98);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 99);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_ng_container_25_section_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r13);
      const group_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroup(group_r14.type));
    });
    \u0275\u0275text(15, " \u2212 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 100);
    \u0275\u0275template(17, MetricViewComponent_div_30_ng_container_25_section_1_article_17_Template, 10, 10, "article", 101);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c5, group_r14.type === "verification", group_r14.type === "validation"));
    \u0275\u0275attribute("data-group-type", group_r14.type);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(group_r14.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getGroupInfoText(group_r14), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(group_r14.count);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", group_r14.metrics);
  }
}
function MetricViewComponent_div_30_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MetricViewComponent_div_30_ng_container_25_section_1_Template, 18, 9, "section", 89);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const group_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isPanelVisible(group_r14.type));
  }
}
function MetricViewComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32, 0);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 33);
    \u0275\u0275template(3, MetricViewComponent_div_30__svg_path_3_Template, 1, 1, "path", 34)(4, MetricViewComponent_div_30__svg_path_4_Template, 1, 1, "path", 35)(5, MetricViewComponent_div_30__svg_path_5_Template, 1, 1, "path", 36)(6, MetricViewComponent_div_30__svg_path_6_Template, 1, 1, "path", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, MetricViewComponent_div_30_button_7_Template, 1, 1, "button", 37)(8, MetricViewComponent_div_30_button_8_Template, 1, 1, "button", 38)(9, MetricViewComponent_div_30_button_9_Template, 1, 1, "button", 39)(10, MetricViewComponent_div_30_button_10_Template, 1, 1, "button", 40);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 41);
    \u0275\u0275template(12, MetricViewComponent_div_30_aside_12_Template, 22, 3, "aside", 42)(13, MetricViewComponent_div_30_aside_13_Template, 26, 7, "aside", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 44, 1)(16, "button", 45);
    \u0275\u0275listener("click", function MetricViewComponent_div_30_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.resetCanvasView());
    });
    \u0275\u0275text(17, " Reset Komponenten ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 46);
    \u0275\u0275text(19, "\u26E8");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 47)(21, "span", 48);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h2");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, MetricViewComponent_div_30_ng_container_25_Template, 2, 1, "ng-container", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.connectors.profile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.evidence);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.verification);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.validation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.profile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.evidence);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.verification);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectors.validation);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isPanelVisible("profile"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isPanelVisible("evidence") && ctx_r0.selectedEvidenceItems.length > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.metricTree.data["control_id"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.metricTree.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.canvasGroups);
  }
}
function MetricViewComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113);
    \u0275\u0275text(1, " Keine Metric-Daten vorhanden. ");
    \u0275\u0275elementEnd();
  }
}
var MetricViewComponent = class _MetricViewComponent {
  metricViewService = inject(MetricViewService);
  router = inject(Router);
  canvasSceneRef;
  centerNodeRef;
  profilePanelRef;
  evidencePanelRef;
  groupPanelRefs;
  controls = [];
  selectedControlId = null;
  metricTree = null;
  isLoading = false;
  errorMessage = null;
  canvasGroups = [];
  selectedMetric = null;
  evidenceOpenSection = "info";
  expandedMetricIds = /* @__PURE__ */ new Set();
  panelVisibility = {
    profile: true,
    evidence: true,
    verification: true,
    validation: true
  };
  connectors = {
    profile: null,
    evidence: null,
    verification: null,
    validation: null
  };
  evidenceIntroText = "Evidenzen beschreiben, auf welcher Beobachtungs- oder Nachweisbasis eine Ma\xDFnahme bewertet wird. Evidenzarten strukturieren dabei die Herkunft des Nachweises, zum Beispiel Logs, Konfigurationen, Beobachtungen, Interviews oder Policy-Dokumente. Beispiel-Assets konkretisieren, an welchem System, Artefakt oder Dokument die Evidenz sichtbar wird, etwa in SIEM-Logs, IAM-Konfigurationen, Richtlinien oder Gespr\xE4chsnotizen.";
  evidenceTypeExplanations = [
    {
      code: "LOGS",
      label: "Logs",
      text: "Maschinell erzeugte Ereignis- und Protokolldaten, zum Beispiel aus SIEM-, IAM- oder Systemquellen."
    },
    {
      code: "KONFIG",
      label: "Config",
      text: "Konfigurationsst\xE4nde und technische Einstellungen in Anwendungen, Plattformen oder Diensten."
    },
    {
      code: "BEOBACHTUNG",
      label: "Beobachtung",
      text: "Direkt beobachtbare Umsetzungen in Prozessen, Abl\xE4ufen oder Bedienhandlungen."
    },
    {
      code: "INTERVIEWS",
      label: "Interview",
      text: "Aussagen und Einordnungen aus Gespr\xE4chen mit verantwortlichen Rollen oder Beteiligten."
    },
    {
      code: "POLICY_DOKUMENTE",
      label: "Policy-Dokumente",
      text: "Richtlinien, Vorgaben, Arbeitsanweisungen und formale Nachweisdokumente."
    }
  ];
  verificationInfoText = "Verifikationsmetriken messen, ob eine Ma\xDFnahme technisch korrekt und gem\xE4\xDF ihrer vorgesehenen Spezifikation umgesetzt wurde. Sie liefern in der Regel objektivierbare, direkt messbare Ergebnisse und beantworten die Frage, ob die Ma\xDFnahme vorhanden und korrekt konfiguriert ist.";
  validationInfoText = "Validierungsmetriken messen, ob eine Ma\xDFnahme ihren beabsichtigten Schutzzweck unter realen Bedingungen erf\xFCllt. Sie sind h\xE4ufig wirkungsorientiert, kontextabh\xE4ngig und beantworten die Frage, ob die Ma\xDFnahme tats\xE4chlich zur Risikoreduktion oder Schutzwirkung beitr\xE4gt.";
  ngOnInit() {
    this.loadControls();
  }
  ngAfterViewInit() {
    queueMicrotask(() => this.updateConnectors());
    this.groupPanelRefs?.changes.subscribe(() => {
      setTimeout(() => this.updateConnectors());
    });
  }
  onWindowResize() {
    this.updateConnectors();
  }
  goToMaturityEvaluator() {
    this.router.navigate(["/maturity-assessment"]);
  }
  loadControls() {
    this.isLoading = true;
    this.errorMessage = null;
    this.metricViewService.getControls().subscribe({
      next: (response) => {
        this.controls = response.data;
        if (this.controls.length > 0) {
          this.selectedControlId = this.controls[0].control_id;
          this.loadMetricView(this.selectedControlId);
        } else {
          this.isLoading = false;
        }
      },
      error: () => {
        this.errorMessage = "Fehler beim Laden der Controls.";
        this.isLoading = false;
      }
    });
  }
  loadMetricView(controlId) {
    this.isLoading = true;
    this.errorMessage = null;
    this.metricTree = null;
    this.canvasGroups = [];
    this.selectedMetric = null;
    this.evidenceOpenSection = "info";
    this.expandedMetricIds.clear();
    this.panelVisibility = {
      profile: true,
      evidence: true,
      verification: true,
      validation: true
    };
    this.resetConnectors();
    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.buildCanvasViewModel();
        this.isLoading = false;
        setTimeout(() => this.updateConnectors());
      },
      error: () => {
        this.errorMessage = "Fehler beim Laden der Metric View.";
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.evidenceOpenSection = "info";
        this.expandedMetricIds.clear();
        this.resetConnectors();
        this.isLoading = false;
      }
    });
  }
  selectControl(controlId) {
    if (this.selectedControlId === controlId) {
      return;
    }
    this.selectedControlId = controlId;
    this.loadMetricView(controlId);
  }
  selectMetric(metric) {
    this.selectedMetric = metric;
    this.evidenceOpenSection = "info";
    setTimeout(() => this.updateConnectors());
  }
  toggleEvidenceSection(section) {
    this.evidenceOpenSection = this.evidenceOpenSection === section ? null : section;
    setTimeout(() => this.updateConnectors());
  }
  isEvidenceSectionOpen(section) {
    return this.evidenceOpenSection === section;
  }
  toggleMetricDetails(metric) {
    const idsInSameGroup = this.canvasGroups.find((group) => group.type === metric.groupType)?.metrics.map((item) => item.id) ?? [];
    idsInSameGroup.forEach((id) => {
      if (id !== metric.id) {
        this.expandedMetricIds.delete(id);
      }
    });
    if (this.expandedMetricIds.has(metric.id)) {
      this.expandedMetricIds.delete(metric.id);
    } else {
      this.expandedMetricIds.add(metric.id);
      this.selectedMetric = metric;
    }
    setTimeout(() => this.updateConnectors());
  }
  isMetricExpanded(metricId) {
    return this.expandedMetricIds.has(metricId);
  }
  getGroupInfoText(group) {
    return group.type === "verification" ? this.verificationInfoText : this.validationInfoText;
  }
  togglePanel(panel) {
    this.panelVisibility[panel] = !this.panelVisibility[panel];
    setTimeout(() => this.updateConnectors());
  }
  isPanelVisible(panel) {
    return this.panelVisibility[panel];
  }
  toggleGroup(groupType) {
    this.panelVisibility[groupType] = !this.panelVisibility[groupType];
    if (!this.panelVisibility[groupType]) {
      const ids = this.canvasGroups.find((group) => group.type === groupType)?.metrics.map((metric) => metric.id) ?? [];
      ids.forEach((id) => this.expandedMetricIds.delete(id));
      if (this.selectedMetric?.groupType === groupType) {
        this.selectedMetric = null;
      }
    }
    setTimeout(() => this.updateConnectors());
  }
  getConnectorPath(key) {
    const connector = this.connectors[key];
    if (!connector) {
      return "";
    }
    const { start, end, control } = connector;
    return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
  }
  getConnectorPointStyle(key) {
    const connector = this.connectors[key];
    if (!connector) {
      return { display: "none" };
    }
    return {
      left: `${connector.end.x}px`,
      top: `${connector.end.y}px`
    };
  }
  buildCanvasViewModel() {
    if (!this.metricTree?.children) {
      this.canvasGroups = [];
      this.selectedMetric = null;
      return;
    }
    this.canvasGroups = this.metricTree.children.filter((child) => child.node_type === "metric_group").map((groupNode) => {
      const groupType = groupNode.id.includes("verification") ? "verification" : "validation";
      const metrics = (groupNode.children ?? []).filter((child) => child.node_type === "metric").map((metricNode) => this.mapMetricNode(metricNode, groupType));
      return {
        id: groupNode.id,
        title: groupNode.name,
        type: groupType,
        count: metrics.length,
        metrics
      };
    });
    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;
  }
  mapMetricNode(metricNode, groupType) {
    const scoreNode = metricNode.children?.find((child) => child.node_type === "score") ?? null;
    const detailsNode = metricNode.children?.find((child) => child.node_type === "metric_details") ?? null;
    const evidencesNode = metricNode.children?.find((child) => child.node_type === "evidenzen") ?? null;
    const score = typeof scoreNode?.data?.["total_score"] === "number" ? scoreNode.data["total_score"] : typeof metricNode.data?.["total_score"] === "number" ? metricNode.data["total_score"] : null;
    return {
      id: metricNode.id,
      name: metricNode.name,
      score,
      details: detailsNode,
      evidencesNode,
      rawNode: metricNode,
      groupType
    };
  }
  updateConnectors() {
    const sceneEl = this.canvasSceneRef?.nativeElement;
    const centerEl = this.centerNodeRef?.nativeElement;
    if (!sceneEl || !centerEl) {
      this.resetConnectors();
      return;
    }
    const isMobileLayout = window.innerWidth <= 1450;
    if (isMobileLayout) {
      this.resetConnectors();
      return;
    }
    const sceneRect = sceneEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();
    const profileEl = this.panelVisibility.profile ? this.profilePanelRef?.nativeElement : void 0;
    const evidenceEl = this.panelVisibility.evidence ? this.evidencePanelRef?.nativeElement : void 0;
    const groupElements = this.groupPanelRefs?.toArray().map((ref) => ref.nativeElement) ?? [];
    const verificationEl = this.panelVisibility.verification ? groupElements.find((el) => el.dataset["groupType"] === "verification") : void 0;
    const validationEl = this.panelVisibility.validation ? groupElements.find((el) => el.dataset["groupType"] === "validation") : void 0;
    this.connectors.profile = profileEl ? this.buildConnector(sceneRect, centerRect, profileEl.getBoundingClientRect(), "left", 26) : null;
    this.connectors.evidence = evidenceEl ? this.buildConnector(sceneRect, centerRect, evidenceEl.getBoundingClientRect(), "left", 26) : null;
    this.connectors.verification = verificationEl ? this.buildConnector(sceneRect, centerRect, verificationEl.getBoundingClientRect(), "right", 26) : null;
    this.connectors.validation = validationEl ? this.buildConnector(sceneRect, centerRect, validationEl.getBoundingClientRect(), "right", 26) : null;
  }
  buildConnector(sceneRect, centerRect, targetRect, side, gap) {
    const center = {
      x: centerRect.left - sceneRect.left + centerRect.width / 2,
      y: centerRect.top - sceneRect.top + centerRect.height / 2
    };
    const radius = Math.min(centerRect.width, centerRect.height) / 2 + 12;
    const target = {
      x: side === "left" ? targetRect.right - sceneRect.left + gap : targetRect.left - sceneRect.left - gap,
      y: targetRect.top - sceneRect.top + targetRect.height / 2
    };
    const dx = target.x - center.x;
    const dy = target.y - center.y;
    const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
    const start = {
      x: center.x + dx / distance * radius,
      y: center.y + dy / distance * radius
    };
    const curveOffset = Math.min(120, Math.max(70, Math.abs(dx) * 0.18));
    const control = {
      x: center.x + dx * 0.5,
      y: center.y + dy * 0.5 + (side === "left" ? -curveOffset * 0.22 : curveOffset * 0.12)
    };
    return {
      start,
      end: target,
      control
    };
  }
  resetConnectors() {
    this.connectors = {
      profile: null,
      evidence: null,
      verification: null,
      validation: null
    };
  }
  get controlDescription() {
    return this.metricTree?.data?.["beschreibung"] ?? "";
  }
  get selectedEvidenceItems() {
    return this.selectedMetric?.evidencesNode?.children ?? [];
  }
  formatScore(score) {
    if (score === null || Number.isNaN(score)) {
      return "n/a";
    }
    return `${(score * 100).toFixed(1)}%`;
  }
  formatEvidenceType(code) {
    if (!code) {
      return "n/a";
    }
    return code.replace(/_/g, " ");
  }
  resetCanvasView() {
    this.panelVisibility = {
      profile: true,
      evidence: true,
      verification: true,
      validation: true
    };
    this.evidenceOpenSection = "info";
    this.expandedMetricIds.clear();
    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;
    setTimeout(() => this.updateConnectors());
  }
  static \u0275fac = function MetricViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MetricViewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MetricViewComponent, selectors: [["app-metric-view"]], viewQuery: function MetricViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5)(_c4, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasSceneRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.centerNodeRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.profilePanelRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.evidencePanelRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.groupPanelRefs = _t);
    }
  }, hostBindings: function MetricViewComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function MetricViewComponent_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 32, vars: 6, consts: [["canvasScene", ""], ["centerNode", ""], ["profilePanel", ""], ["evidencePanel", ""], ["groupPanel", ""], [1, "metric-view-page"], [1, "metric-view-header"], [1, "metric-view-header-copy"], [1, "layer-label"], [1, "subtitle"], ["type", "button", 1, "maturity-evaluator-button", "floating", 3, "click"], [1, "metric-view-layout"], [1, "controls-panel"], [4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["class", "controls-list", 4, "ngIf"], [1, "side-legend"], [1, "legend-items"], [1, "legend-chip", "structure"], [1, "legend-chip", "metric"], [1, "legend-chip", "evidence"], [1, "metric-canvas"], ["class", "loading-state", 4, "ngIf"], ["class", "canvas-scene", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "error-message"], [1, "controls-list"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "control-button", 3, "click"], [1, "control-id"], [1, "control-name"], [1, "loading-state"], [1, "canvas-scene"], ["preserveAspectRatio", "none", "aria-hidden", "true", 1, "scene-connections"], ["class", "connection-line profile-line", 4, "ngIf"], ["class", "connection-line evidence-line", 4, "ngIf"], ["class", "connection-line metric-line", 4, "ngIf"], ["type", "button", "class", "connection-hotspot structure active", "aria-label", "Control-Profil ein- oder ausblenden", 3, "ngStyle", "click", 4, "ngIf"], ["type", "button", "class", "connection-hotspot evidence active", "aria-label", "Evidenzen ein- oder ausblenden", 3, "ngStyle", "click", 4, "ngIf"], ["type", "button", "class", "connection-hotspot metric active", "aria-label", "Verifikationsmetriken ein- oder ausblenden", 3, "ngStyle", "click", 4, "ngIf"], ["type", "button", "class", "connection-hotspot metric active", "aria-label", "Validierungsmetriken ein- oder ausblenden", 3, "ngStyle", "click", 4, "ngIf"], [1, "left-column"], ["class", "control-profile-panel", 4, "ngIf"], ["class", "evidence-panel", 4, "ngIf"], [1, "canvas-center-node"], ["type", "button", "aria-label", "Strukturen und Komponenten zur\xFCcksetzen", 1, "center-reset-button", 3, "click"], [1, "center-node-icon"], [1, "center-node-content"], [1, "center-node-id"], [1, "connection-line", "profile-line"], [1, "connection-line", "evidence-line"], [1, "connection-line", "metric-line"], ["type", "button", "aria-label", "Control-Profil ein- oder ausblenden", 1, "connection-hotspot", "structure", "active", 3, "click", "ngStyle"], ["type", "button", "aria-label", "Evidenzen ein- oder ausblenden", 1, "connection-hotspot", "evidence", "active", 3, "click", "ngStyle"], ["type", "button", "aria-label", "Verifikationsmetriken ein- oder ausblenden", 1, "connection-hotspot", "metric", "active", 3, "click", "ngStyle"], ["type", "button", "aria-label", "Validierungsmetriken ein- oder ausblenden", 1, "connection-hotspot", "metric", "active", 3, "click", "ngStyle"], [1, "control-profile-panel"], [1, "panel-frame-toggle"], [1, "panel-frame-label"], ["type", "button", "aria-label", "Control-Profil schlie\xDFen", 1, "panel-ghost-toggle", 3, "click"], [1, "profile-header"], [1, "profile-kicker"], [1, "profile-row"], [1, "profile-label"], [1, "profile-value"], [1, "profile-section"], [1, "evidence-panel"], ["type", "button", "aria-label", "Evidenzen schlie\xDFen", 1, "panel-ghost-toggle", 3, "click"], [1, "evidence-panel-header"], [1, "evidence-panel-kicker"], [1, "evidence-explainer"], ["type", "button", 1, "accordion-toggle", 3, "click"], [1, "accordion-icon"], ["class", "accordion-body", 4, "ngIf"], [1, "evidence-items-section"], ["class", "evidence-card-list", 4, "ngIf"], [1, "accordion-body"], [1, "evidence-intro-text"], [1, "evidence-type-info-list"], ["class", "evidence-type-info-item", 4, "ngFor", "ngForOf"], [1, "evidence-type-info-item"], [1, "evidence-type-info-label"], [1, "evidence-card-list"], ["class", "evidence-card", 4, "ngFor", "ngForOf"], [1, "evidence-card"], [1, "evidence-card-topline"], [1, "evidence-asset"], [1, "evidence-type-chip"], [1, "evidence-description"], ["class", "canvas-group", 3, "ngClass", 4, "ngIf"], [1, "canvas-group", 3, "ngClass"], [1, "group-node"], [1, "group-node-main"], [1, "group-node-title"], [1, "group-info-wrapper"], ["type", "button", "aria-label", "Gruppenbeschreibung anzeigen", 1, "info-dot"], [1, "group-info-tooltip"], [1, "group-node-actions"], [1, "group-node-count"], ["type", "button", "aria-label", "Metrikgruppe schlie\xDFen", 1, "panel-ghost-toggle", 3, "click"], [1, "metric-list"], ["class", "metric-accordion", 3, "active", "expanded", 4, "ngFor", "ngForOf"], [1, "metric-accordion"], ["type", "button", 1, "metric-pill", 3, "click"], [1, "metric-pill-name"], [1, "metric-pill-meta"], [1, "metric-pill-score"], [1, "metric-expand-icon"], ["class", "metric-detail-inline", 4, "ngIf"], [1, "metric-detail-inline"], [1, "metric-detail-topline"], [1, "detail-score-chip"], [1, "detail-section"], [1, "empty-state"]], template: function MetricViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 5)(1, "header", 6)(2, "div", 7)(3, "p", 8);
      \u0275\u0275text(4, "SCHICHT 3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6, "Metric View");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 9);
      \u0275\u0275text(8, "Transparenzsicht konzeptionell");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "button", 10);
      \u0275\u0275listener("click", function MetricViewComponent_Template_button_click_9_listener() {
        return ctx.goToMaturityEvaluator();
      });
      \u0275\u0275text(10, " Zum Maturity Evaluator ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "main", 11)(12, "aside", 12)(13, "h2");
      \u0275\u0275text(14, "Controls");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, MetricViewComponent_div_15_Template, 2, 0, "div", 13)(16, MetricViewComponent_div_16_Template, 2, 1, "div", 14)(17, MetricViewComponent_ul_17_Template, 2, 1, "ul", 15);
      \u0275\u0275elementStart(18, "div", 16)(19, "h3");
      \u0275\u0275text(20, "Legende");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 17)(22, "span", 18);
      \u0275\u0275text(23, "Struktur");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 19);
      \u0275\u0275text(25, "Metriken");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 20);
      \u0275\u0275text(27, "Evidenz");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(28, "section", 21);
      \u0275\u0275template(29, MetricViewComponent_div_29_Template, 2, 0, "div", 22)(30, MetricViewComponent_div_30_Template, 26, 13, "div", 23)(31, MetricViewComponent_div_31_Template, 2, 0, "div", 24);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275property("ngIf", ctx.isLoading && ctx.controls.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.controls.length > 0);
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ctx.isLoading && ctx.selectedControlId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.metricTree);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.metricTree && !ctx.errorMessage);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgStyle], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding-top: 0.2rem;\n  background:\n    radial-gradient(\n      circle at top,\n      rgba(59, 130, 246, 0.12),\n      transparent 35%),\n    linear-gradient(\n      180deg,\n      #020617 0%,\n      #0f172a 100%);\n  color: #e2e8f0;\n  font-family: Arial, sans-serif;\n}\n[_nghost-%COMP%], \n.metric-view-page[_ngcontent-%COMP%] {\n  background-color: #020617;\n}\n.metric-view-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  width: 100%;\n  padding: 0.75rem 1rem 1rem;\n  margin: 0;\n  box-sizing: border-box;\n}\n.metric-view-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  gap: 1rem;\n  margin-bottom: 0.55rem;\n  padding-right: 260px;\n}\n.metric-view-header-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.maturity-evaluator-button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 44px;\n  padding: 0.8rem 1.05rem;\n  border-radius: 14px;\n  border: 1px solid rgba(96, 165, 250, 0.32);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.9),\n      rgba(29, 78, 216, 0.9));\n  color: #eff6ff;\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 28px rgba(37, 99, 235, 0.22);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    border-color 0.18s ease;\n}\n.maturity-evaluator-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  border-color: rgba(147, 197, 253, 0.55);\n  box-shadow: 0 14px 34px rgba(37, 99, 235, 0.28);\n}\n.maturity-evaluator-button[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.maturity-evaluator-button.floating[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 1.5rem;\n  bottom: 1.5rem;\n  z-index: 4500;\n}\n.layer-label[_ngcontent-%COMP%] {\n  margin: 0 0 0.2rem 0;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #60a5fa;\n}\n.metric-view-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 2.35rem;\n  color: #f8fafc;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0 0;\n  color: #94a3b8;\n  font-size: 0.98rem;\n}\n.metric-view-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 340px 1fr;\n  gap: 0.8rem;\n  align-items: start;\n}\n.controls-panel[_ngcontent-%COMP%], \n.metric-canvas[_ngcontent-%COMP%] {\n  background: rgba(15, 23, 42, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 20px;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);\n}\n.controls-panel[_ngcontent-%COMP%] {\n  padding: 1.15rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  min-height: calc(100vh - 88px);\n}\n.controls-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.02rem;\n  color: #f8fafc;\n}\n.controls-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n.controls-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.control-button[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.32rem;\n  padding: 1rem 1rem;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: 15px;\n  background: rgba(30, 41, 59, 0.65);\n  color: #e2e8f0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n  min-width: 0;\n  overflow: hidden;\n}\n.control-button[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96, 165, 250, 0.45);\n  background: rgba(37, 99, 235, 0.12);\n}\n.control-button.active[_ngcontent-%COMP%] {\n  border-color: #dbeafe;\n  background: rgba(59, 130, 246, 0.22);\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.26);\n}\n.control-id[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.control-name[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  font-size: 0.98rem;\n  line-height: 1.34;\n  color: #e2e8f0;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.side-legend[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding: 1rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.52);\n  border: 1px solid rgba(148, 163, 184, 0.14);\n}\n.side-legend[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem 0;\n  font-size: 0.9rem;\n  color: #f8fafc;\n}\n.legend-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.legend-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  width: fit-content;\n  padding: 0.42rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(30, 41, 59, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  color: #cbd5e1;\n  font-size: 0.8rem;\n}\n.legend-chip[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 999px;\n  display: inline-block;\n}\n.legend-chip.structure[_ngcontent-%COMP%]::before {\n  background: #60a5fa;\n  box-shadow: 0 0 10px rgba(96, 165, 250, 0.55);\n}\n.legend-chip.metric[_ngcontent-%COMP%]::before {\n  background: #5eead4;\n  box-shadow: 0 0 10px rgba(94, 234, 212, 0.5);\n}\n.legend-chip.evidence[_ngcontent-%COMP%]::before {\n  background: #c084fc;\n  box-shadow: 0 0 10px rgba(192, 132, 252, 0.5);\n}\n.metric-canvas[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 88px);\n  padding: 0.65rem;\n  overflow: visible;\n}\n.canvas-scene[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: calc(100vh - 120px);\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  border-radius: 24px;\n  background:\n    radial-gradient(\n      circle at 50% 50%,\n      rgba(37, 99, 235, 0.12),\n      transparent 36%),\n    radial-gradient(\n      circle at 68% 28%,\n      rgba(94, 234, 212, 0.06),\n      transparent 20%),\n    radial-gradient(\n      circle at 26% 72%,\n      rgba(192, 132, 252, 0.05),\n      transparent 16%),\n    rgba(8, 15, 30, 0.82);\n  overflow: visible;\n}\n.canvas-scene[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(rgba(59, 130, 246, 0.035) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(59, 130, 246, 0.035) 1px,\n      transparent 1px);\n  background-size: 42px 42px;\n  opacity: 0.12;\n  pointer-events: none;\n}\n.scene-connections[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  pointer-events: none;\n  overflow: visible;\n}\n.connection-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.28);\n  stroke-width: 2.2;\n  stroke-dasharray: 7 8;\n  stroke-linecap: round;\n  opacity: 0.95;\n}\n.connection-line.profile-line[_ngcontent-%COMP%] {\n  stroke: rgba(96, 165, 250, 0.34);\n}\n.connection-line.evidence-line[_ngcontent-%COMP%] {\n  stroke: rgba(192, 132, 252, 0.42);\n}\n.connection-line.metric-line[_ngcontent-%COMP%] {\n  stroke: rgba(94, 234, 212, 0.3);\n}\n.connection-hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  border-radius: 999px;\n  border: 2px solid rgba(15, 23, 42, 0.96);\n  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.04), 0 8px 18px rgba(2, 6, 23, 0.3);\n  cursor: pointer;\n  z-index: 6;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    opacity 0.18s ease,\n    border-color 0.18s ease;\n  transform: translate(-50%, -50%);\n}\n.connection-hotspot[_ngcontent-%COMP%]:hover {\n  transform: translate(-50%, -50%) scale(1.16);\n  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.06), 0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 3px rgba(191, 219, 254, 0.45),\n    0 0 0 9px rgba(255, 255, 255, 0.06),\n    0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot.active[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.06), 0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot.structure[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #b9d2ff 0%,\n      #7fb0ff 58%,\n      #5f8fff 100%);\n  border-color: rgba(191, 219, 254, 0.55);\n}\n.connection-hotspot.metric[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #c8fff7 0%,\n      #8ef1e2 58%,\n      #58d2c2 100%);\n}\n.connection-hotspot.evidence[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #f0cfff 0%,\n      #d39cff 58%,\n      #b46bf4 100%);\n}\n.left-column[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1.8rem;\n  left: 1.8rem;\n  width: 420px;\n  height: calc(100% - 3.6rem);\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n  z-index: 3;\n}\n.control-profile-panel[_ngcontent-%COMP%], \n.evidence-panel[_ngcontent-%COMP%] {\n  border-radius: 22px;\n  background: rgba(8, 15, 30, 0.96);\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);\n}\n.panel-frame-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.85rem;\n}\n.panel-frame-label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #94a3b8;\n}\n.panel-ghost-toggle[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  background: rgba(30, 41, 59, 0.78);\n  color: #e2e8f0;\n  cursor: pointer;\n}\n.control-profile-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.25rem 1.3rem;\n  border: 1px solid rgba(96, 165, 250, 0.28);\n}\n.profile-header[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.profile-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.35rem 0;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #93c5fd;\n}\n.profile-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.18rem;\n  color: #f8fafc;\n  line-height: 1.3;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.profile-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.24rem;\n  margin-bottom: 1rem;\n  padding: 0.8rem 0.9rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.14);\n}\n.profile-label[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #94a3b8;\n}\n.profile-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #e2e8f0;\n}\n.profile-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 0.95rem;\n  color: #f8fafc;\n}\n.profile-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.94rem;\n  line-height: 1.58;\n  color: #cbd5e1;\n}\n.evidence-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: 1 1 auto;\n  min-height: 0;\n  padding: 1.2rem 1.2rem;\n  border: 1px solid rgba(168, 85, 247, 0.28);\n  display: flex;\n  flex-direction: column;\n  gap: 0.95rem;\n  overflow: hidden;\n  min-width: 0;\n}\n.evidence-panel-header[_ngcontent-%COMP%] {\n  margin-bottom: 0.1rem;\n  flex-shrink: 0;\n}\n.evidence-panel-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.3rem 0;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #c084fc;\n}\n.evidence-panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  line-height: 1.34;\n  color: #f8fafc;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.evidence-explainer[_ngcontent-%COMP%], \n.evidence-items-section[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  border: 1px solid rgba(168, 85, 247, 0.16);\n  background: rgba(15, 23, 42, 0.45);\n  overflow: hidden;\n  min-width: 0;\n  flex-shrink: 0;\n}\n.evidence-items-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1 1 auto;\n}\n.accordion-toggle[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.95rem 1rem;\n  background: rgba(30, 41, 59, 0.58);\n  border: none;\n  color: #f8fafc;\n  text-align: left;\n  cursor: pointer;\n  font-size: 0.92rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.accordion-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(45, 55, 72, 0.78);\n}\n.accordion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1.1rem;\n  color: #d8b4fe;\n}\n.accordion-body[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem 1rem;\n  max-height: none;\n  overflow-y: auto;\n  min-height: 0;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(168, 85, 247, 0.48) rgba(15, 23, 42, 0.35);\n}\n.evidence-intro-text[_ngcontent-%COMP%] {\n  margin: 0 0 0.9rem 0;\n  font-size: 0.88rem;\n  line-height: 1.55;\n  color: #cbd5e1;\n}\n.evidence-type-info-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.evidence-type-info-item[_ngcontent-%COMP%] {\n  padding: 0.78rem 0.86rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.72);\n  border: 1px solid rgba(168, 85, 247, 0.12);\n}\n.evidence-type-info-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #e9d5ff;\n}\n.evidence-type-info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  line-height: 1.45;\n  color: #cbd5e1;\n}\n.evidence-card-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  overflow-y: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(168, 85, 247, 0.48) rgba(15, 23, 42, 0.35);\n}\n.evidence-card[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.82);\n  border: 1px solid rgba(168, 85, 247, 0.16);\n  min-width: 0;\n}\n.evidence-card-topline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.48rem;\n  margin-bottom: 0.6rem;\n  min-width: 0;\n}\n.evidence-asset[_ngcontent-%COMP%] {\n  display: block;\n  min-width: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n  line-height: 1.34;\n  color: #e9d5ff;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.evidence-type-chip[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  padding: 0.28rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(168, 85, 247, 0.14);\n  border: 1px solid rgba(168, 85, 247, 0.22);\n  color: #d8b4fe;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.evidence-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.86rem;\n  line-height: 1.48;\n  color: #cbd5e1;\n}\n.canvas-center-node[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 390px;\n  min-height: 390px;\n  border-radius: 999px;\n  padding: 2.35rem 2rem;\n  background:\n    radial-gradient(\n      circle at top,\n      rgba(59, 130, 246, 0.3),\n      rgba(30, 41, 59, 0.97));\n  border: 2px solid rgba(160, 188, 255, 0.88);\n  box-shadow:\n    0 0 0 14px rgba(59, 130, 246, 0.08),\n    0 0 0 26px rgba(59, 130, 246, 0.03),\n    0 28px 72px rgba(2, 6, 23, 0.48);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  z-index: 10;\n}\n.canvas-center-node[_ngcontent-%COMP%]::before, \n.canvas-center-node[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  border-radius: 999px;\n  pointer-events: none;\n}\n.canvas-center-node[_ngcontent-%COMP%]::before {\n  inset: -14px;\n  border: 1px dashed rgba(96, 165, 250, 0.18);\n}\n.canvas-center-node[_ngcontent-%COMP%]::after {\n  inset: -30px;\n  border: 1px solid rgba(96, 165, 250, 0.08);\n}\n.center-reset-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1.15rem;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 0.5rem 0.9rem;\n  border-radius: 999px;\n  border: 1px solid rgba(191, 219, 254, 0.28);\n  background: rgba(15, 23, 42, 0.72);\n  color: #dbeafe;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.08), 0 10px 24px rgba(2, 6, 23, 0.22);\n  cursor: pointer;\n  z-index: 6;\n  white-space: nowrap;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    background 0.18s ease,\n    border-color 0.18s ease;\n}\n.center-reset-button[_ngcontent-%COMP%]:hover {\n  transform: translateX(-50%) translateY(-1px);\n  background: rgba(30, 41, 59, 0.88);\n  border-color: rgba(191, 219, 254, 0.42);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.14), 0 14px 28px rgba(2, 6, 23, 0.28);\n}\n.center-node-icon[_ngcontent-%COMP%] {\n  font-size: 2.55rem;\n  margin-bottom: 1rem;\n  color: #dbeafe;\n}\n.center-node-id[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.85rem;\n  font-size: 1.55rem;\n  font-weight: 800;\n  color: #e0f2fe;\n  letter-spacing: 0.02em;\n}\n.center-node-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.48rem;\n  line-height: 1.25;\n  font-weight: 700;\n  color: #f8fafc;\n  max-width: 250px;\n  word-break: break-word;\n  overflow-wrap: anywhere;\n}\n.canvas-group[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 430px;\n  z-index: 20;\n  overflow: visible;\n}\n.verification-group[_ngcontent-%COMP%] {\n  top: 2.2rem;\n  right: 2.2rem;\n}\n.validation-group[_ngcontent-%COMP%] {\n  top: 51.5%;\n  right: 2.2rem;\n  transform: translateY(0);\n}\n.group-node[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n  padding: 1.1rem 1.2rem;\n  border-radius: 18px;\n  border: 1px solid rgba(45, 212, 191, 0.35);\n  background: rgba(15, 23, 42, 0.92);\n  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.28);\n  position: relative;\n  z-index: 30;\n  overflow: visible;\n}\n.validation-group[_ngcontent-%COMP%]   .group-node[_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, 0.35);\n}\n.group-node-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-width: 0;\n  position: relative;\n  overflow: visible;\n}\n.group-node-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-shrink: 0;\n}\n.group-node-title[_ngcontent-%COMP%] {\n  font-size: 1.08rem;\n  font-weight: 700;\n  color: #ecfeff;\n}\n.group-info-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  overflow: visible;\n  z-index: 200;\n}\n.info-dot[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(30, 41, 59, 0.9);\n  color: #bae6fd;\n  font-size: 0.76rem;\n  font-weight: 700;\n  cursor: default;\n  position: relative;\n  z-index: 210;\n}\n.group-info-tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 0.55rem);\n  right: 0;\n  left: auto;\n  width: 320px;\n  max-width: min(320px, 100vw - 3rem);\n  padding: 0.95rem 1rem;\n  border-radius: 14px;\n  background: rgba(8, 15, 30, 0.98);\n  border: 1px solid rgba(56, 189, 248, 0.2);\n  color: #cbd5e1;\n  font-size: 0.84rem;\n  line-height: 1.5;\n  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.34);\n  opacity: 0;\n  pointer-events: none;\n  transform: translateY(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n  z-index: 9999;\n}\n.group-info-wrapper[_ngcontent-%COMP%]:hover   .group-info-tooltip[_ngcontent-%COMP%], \n.group-info-wrapper[_ngcontent-%COMP%]:focus-within   .group-info-tooltip[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n}\n.group-node-count[_ngcontent-%COMP%] {\n  min-width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(45, 212, 191, 0.14);\n  color: #99f6e4;\n  font-size: 0.94rem;\n  font-weight: 700;\n}\n.validation-group[_ngcontent-%COMP%]   .group-node-count[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.14);\n  color: #bbf7d0;\n}\n.metric-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.95rem;\n  margin-top: 1rem;\n  position: relative;\n  overflow: visible;\n}\n.metric-accordion[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 16px;\n  overflow: visible;\n  width: 100%;\n}\n.metric-accordion.expanded[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.28rem;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(30, 41, 79, 0.34) 0%,\n      rgba(10, 18, 37, 0.42) 100%);\n  border: 1px solid rgba(96, 165, 250, 0.16);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.12), 0 14px 34px rgba(2, 6, 23, 0.22);\n}\n.metric-pill[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 1rem;\n  text-align: left;\n  padding: 1.15rem 1.2rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.88);\n  color: #e2e8f0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  z-index: 2;\n  min-height: 64px;\n  overflow: visible;\n}\n.metric-pill[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n  border-color: rgba(96, 165, 250, 0.38);\n  background: rgba(30, 41, 59, 0.95);\n}\n.metric-pill.active[_ngcontent-%COMP%] {\n  border-color: rgba(96, 165, 250, 0.8);\n  background: rgba(30, 64, 175, 0.25);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.24);\n}\n.metric-pill-name[_ngcontent-%COMP%] {\n  min-width: 0;\n  font-size: 1rem;\n  line-height: 1.36;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-pill-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.metric-pill-score[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: #93c5fd;\n  white-space: nowrap;\n}\n.metric-expand-icon[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  background: rgba(59, 130, 246, 0.12);\n  color: #dbeafe;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.metric-detail-inline[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  margin-top: 0.72rem;\n  padding: 1rem 1.05rem 1.05rem;\n  border-radius: 18px;\n  border: 1px solid rgba(125, 177, 255, 0.3);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(20, 31, 62, 0.97) 0%,\n      rgba(9, 16, 34, 0.99) 100%);\n  box-shadow:\n    0 0 0 1px rgba(96, 165, 250, 0.08),\n    0 16px 36px rgba(2, 6, 23, 0.3),\n    inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: visible;\n  box-sizing: border-box;\n}\n.metric-detail-inline[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  pointer-events: none;\n  box-shadow: inset 0 0 0 1px rgba(191, 219, 254, 0.08);\n}\n.metric-detail-topline[_ngcontent-%COMP%] {\n  margin-bottom: 0.95rem;\n  padding-bottom: 0.7rem;\n  border-bottom: 1px solid rgba(96, 165, 250, 0.14);\n}\n.detail-score-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.45rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(56, 189, 248, 0.12);\n  border: 1px solid rgba(56, 189, 248, 0.22);\n  color: #bae6fd;\n  font-size: 0.84rem;\n  font-weight: 700;\n}\n.detail-section[_ngcontent-%COMP%]    + .detail-section[_ngcontent-%COMP%] {\n  margin-top: 0.95rem;\n}\n.detail-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.42rem 0;\n  font-size: 0.88rem;\n  color: #f8fafc;\n}\n.detail-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.86rem;\n  line-height: 1.52;\n  color: #cbd5e1;\n}\n.loading-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%], \n.error-message[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.45);\n  font-size: 0.95rem;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  border: 1px solid rgba(248, 113, 113, 0.25);\n}\n@media (max-width: 1700px) {\n  .left-column[_ngcontent-%COMP%] {\n    width: 380px;\n  }\n  .canvas-center-node[_ngcontent-%COMP%] {\n    width: 350px;\n    min-height: 350px;\n  }\n  .canvas-group[_ngcontent-%COMP%] {\n    width: 390px;\n  }\n}\n@media (max-width: 1450px) {\n  .metric-view-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .controls-panel[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n  .side-legend[_ngcontent-%COMP%] {\n    margin-top: 0;\n  }\n  .metric-canvas[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n  .canvas-scene[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    min-height: auto;\n    padding: 1.25rem;\n  }\n  .canvas-scene[_ngcontent-%COMP%]::before, \n   .scene-connections[_ngcontent-%COMP%], \n   .connection-hotspot[_ngcontent-%COMP%], \n   .center-reset-button[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .left-column[_ngcontent-%COMP%], \n   .canvas-center-node[_ngcontent-%COMP%], \n   .canvas-group[_ngcontent-%COMP%] {\n    position: static;\n    transform: none;\n    width: 100%;\n  }\n  .canvas-center-node[_ngcontent-%COMP%]::before, \n   .canvas-center-node[_ngcontent-%COMP%]::after {\n    display: none;\n  }\n  .left-column[_ngcontent-%COMP%] {\n    height: auto;\n    gap: 1rem;\n  }\n  .evidence-panel[_ngcontent-%COMP%] {\n    max-height: 520px;\n  }\n  .canvas-center-node[_ngcontent-%COMP%] {\n    min-height: auto;\n    border-radius: 28px;\n    padding: 1.75rem;\n  }\n  .center-node-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .group-info-tooltip[_ngcontent-%COMP%] {\n    width: 260px;\n  }\n  .metric-detail-inline[_ngcontent-%COMP%] {\n    margin-top: 0.65rem;\n  }\n}\n@media (max-width: 900px) {\n  [_nghost-%COMP%] {\n    padding-top: 2.75rem;\n  }\n  .metric-view-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding-right: 0;\n  }\n  .maturity-evaluator-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .maturity-evaluator-button.floating[_ngcontent-%COMP%] {\n    right: 1rem;\n    bottom: 1rem;\n    width: auto;\n    max-width: calc(100vw - 2rem);\n  }\n}\n/*# sourceMappingURL=metric-view.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MetricViewComponent, [{
    type: Component,
    args: [{ selector: "app-metric-view", standalone: true, imports: [CommonModule], template: `<div class="metric-view-page">
  <header class="metric-view-header">
    <div class="metric-view-header-copy">
      <p class="layer-label">SCHICHT 3</p>
      <h1>Metric View</h1>
      <p class="subtitle">Transparenzsicht konzeptionell</p>
    </div>
  </header>

  <button
    type="button"
    class="maturity-evaluator-button floating"
    (click)="goToMaturityEvaluator()"
  >
    Zum Maturity Evaluator
  </button>

  <main class="metric-view-layout">
    <aside class="controls-panel">
      <h2>Controls</h2>

      <div *ngIf="isLoading && controls.length === 0">
        Controls werden geladen...
      </div>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <ul *ngIf="controls.length > 0" class="controls-list">
        <li *ngFor="let control of controls">
          <button
            type="button"
            class="control-button"
            [class.active]="control.control_id === selectedControlId"
            (click)="selectControl(control.control_id)"
          >
            <span class="control-id">{{ control.control_id }}</span>
            <span class="control-name">{{ control.name }}</span>
          </button>
        </li>
      </ul>

      <div class="side-legend">
        <h3>Legende</h3>
        <div class="legend-items">
          <span class="legend-chip structure">Struktur</span>
          <span class="legend-chip metric">Metriken</span>
          <span class="legend-chip evidence">Evidenz</span>
        </div>
      </div>
    </aside>

    <section class="metric-canvas">
      <div *ngIf="isLoading && selectedControlId" class="loading-state">
        Metric View wird geladen...
      </div>

      <div *ngIf="!isLoading && metricTree" class="canvas-scene" #canvasScene>
        <svg class="scene-connections" preserveAspectRatio="none" aria-hidden="true">
          <path
            *ngIf="connectors.profile"
            class="connection-line profile-line"
            [attr.d]="getConnectorPath('profile')"
          />
          <path
            *ngIf="connectors.evidence"
            class="connection-line evidence-line"
            [attr.d]="getConnectorPath('evidence')"
          />
          <path
            *ngIf="connectors.verification"
            class="connection-line metric-line"
            [attr.d]="getConnectorPath('verification')"
          />
          <path
            *ngIf="connectors.validation"
            class="connection-line metric-line"
            [attr.d]="getConnectorPath('validation')"
          />
        </svg>
        <button
          *ngIf="connectors.profile"
          type="button"
          class="connection-hotspot structure active"
          [ngStyle]="getConnectorPointStyle('profile')"
          (click)="togglePanel('profile')"
          aria-label="Control-Profil ein- oder ausblenden"
        ></button>

        <button
          *ngIf="connectors.evidence"
          type="button"
          class="connection-hotspot evidence active"
          [ngStyle]="getConnectorPointStyle('evidence')"
          (click)="togglePanel('evidence')"
          aria-label="Evidenzen ein- oder ausblenden"
        ></button>

        <button
          *ngIf="connectors.verification"
          type="button"
          class="connection-hotspot metric active"
          [ngStyle]="getConnectorPointStyle('verification')"
          (click)="toggleGroup('verification')"
          aria-label="Verifikationsmetriken ein- oder ausblenden"
        ></button>

        <button
          *ngIf="connectors.validation"
          type="button"
          class="connection-hotspot metric active"
          [ngStyle]="getConnectorPointStyle('validation')"
          (click)="toggleGroup('validation')"
          aria-label="Validierungsmetriken ein- oder ausblenden"
        ></button>

        <div class="left-column">
          <aside class="control-profile-panel" *ngIf="isPanelVisible('profile')" #profilePanel>
            <div class="panel-frame-toggle">
              <span class="panel-frame-label">Struktur</span>
              <button
                type="button"
                class="panel-ghost-toggle"
                (click)="togglePanel('profile')"
                aria-label="Control-Profil schlie\xDFen"
              >
                \u2212
              </button>
            </div>

            <div class="profile-header">
              <p class="profile-kicker">Control-Profil</p>
              <h3>{{ metricTree.name }}</h3>
            </div>

            <div class="profile-row">
              <span class="profile-label">Control ID</span>
              <span class="profile-value">{{ metricTree.data['control_id'] }}</span>
            </div>

            <div class="profile-section">
              <h4>Beschreibung</h4>
              <p>{{ controlDescription }}</p>
            </div>
          </aside>

          <aside
            class="evidence-panel"
            *ngIf="isPanelVisible('evidence') && selectedEvidenceItems.length > 0"
            #evidencePanel
          >
            <div class="panel-frame-toggle">
              <span class="panel-frame-label">Evidenz</span>
              <button
                type="button"
                class="panel-ghost-toggle"
                (click)="togglePanel('evidence')"
                aria-label="Evidenzen schlie\xDFen"
              >
                \u2212
              </button>
            </div>

            <div class="evidence-panel-header">
              <p class="evidence-panel-kicker">Evidenzen</p>
              <h3>{{ selectedMetric?.name }}</h3>
            </div>

            <div class="evidence-explainer">
              <button
                type="button"
                class="accordion-toggle"
                (click)="toggleEvidenceSection('info')"
                [attr.aria-expanded]="isEvidenceSectionOpen('info')"
              >
                <span>Was bedeuten Evidenzarten und Beispiel-Assets?</span>
                <span class="accordion-icon">{{ isEvidenceSectionOpen('info') ? '\u2212' : '+' }}</span>
              </button>

              <div class="accordion-body" *ngIf="isEvidenceSectionOpen('info')">
                <p class="evidence-intro-text">
                  {{ evidenceIntroText }}
                </p>

                <ul class="evidence-type-info-list">
                  <li *ngFor="let item of evidenceTypeExplanations" class="evidence-type-info-item">
                    <span class="evidence-type-info-label">{{ item.label }}</span>
                    <p>{{ item.text }}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="evidence-items-section">
              <button
                type="button"
                class="accordion-toggle"
                (click)="toggleEvidenceSection('items')"
                [attr.aria-expanded]="isEvidenceSectionOpen('items')"
              >
                <span>Einzelne Evidenzen anzeigen</span>
                <span class="accordion-icon">{{ isEvidenceSectionOpen('items') ? '\u2212' : '+' }}</span>
              </button>

              <ul class="evidence-card-list" *ngIf="isEvidenceSectionOpen('items')">
                <li *ngFor="let evidence of selectedEvidenceItems" class="evidence-card">
                  <div class="evidence-card-topline">
                    <span class="evidence-asset">
                      {{ evidence.data['beispiel_asset'] || 'Kein Beispiel-Asset' }}
                    </span>
                    <span class="evidence-type-chip">
                      {{ formatEvidenceType(evidence.data['evidenzart_code']) }}
                    </span>
                  </div>

                  <p class="evidence-description">
                    {{ evidence.data['beschreibung'] || 'Keine Beschreibung vorhanden.' }}
                  </p>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div class="canvas-center-node" #centerNode>
          <button
            type="button"
            class="center-reset-button"
            (click)="resetCanvasView()"
            aria-label="Strukturen und Komponenten zur\xFCcksetzen"
          >
            Reset Komponenten
          </button>

          <div class="center-node-icon">\u26E8</div>

          <div class="center-node-content">
            <span class="center-node-id">{{ metricTree.data['control_id'] }}</span>
            <h2>{{ metricTree.name }}</h2>
          </div>
        </div>

        <ng-container *ngFor="let group of canvasGroups">
          <section
            class="canvas-group"
            *ngIf="isPanelVisible(group.type)"
            [attr.data-group-type]="group.type"
            #groupPanel
            [ngClass]="{
              'verification-group': group.type === 'verification',
              'validation-group': group.type === 'validation'
            }"
          >
            <div class="group-node">
              <div class="group-node-main">
                <span class="group-node-title">{{ group.title }}</span>

                <div class="group-info-wrapper">
                  <button
                    type="button"
                    class="info-dot"
                    aria-label="Gruppenbeschreibung anzeigen"
                  >
                    i
                  </button>
                  <div class="group-info-tooltip">
                    {{ getGroupInfoText(group) }}
                  </div>
                </div>
              </div>

              <div class="group-node-actions">
                <span class="group-node-count">{{ group.count }}</span>
                <button
                  type="button"
                  class="panel-ghost-toggle"
                  (click)="toggleGroup(group.type)"
                  aria-label="Metrikgruppe schlie\xDFen"
                >
                  \u2212
                </button>
              </div>
            </div>

            <div class="metric-list">
              <article
                *ngFor="let metric of group.metrics"
                class="metric-accordion"
                [class.active]="selectedMetric?.id === metric.id"
                [class.expanded]="isMetricExpanded(metric.id)"
              >
                <button
                  type="button"
                  class="metric-pill"
                  [class.active]="selectedMetric?.id === metric.id"
                  (click)="selectMetric(metric); toggleMetricDetails(metric)"
                >
                  <span class="metric-pill-name">{{ metric.name }}</span>

                  <span class="metric-pill-meta">
                    <span class="metric-pill-score">{{ formatScore(metric.score) }}</span>
                    <span class="metric-expand-icon">
                      {{ isMetricExpanded(metric.id) ? '\u2212' : '+' }}
                    </span>
                  </span>
                </button>

                <div
                  class="metric-detail-inline"
                  *ngIf="isMetricExpanded(metric.id)"
                >
                  <div class="metric-detail-topline">
                    <span class="detail-score-chip">
                    Control Umsetzungsscore der Metrik: {{ formatScore(metric.score) }}
                  </span>
                  </div>

                  <div class="detail-section">
                    <h4>Beschreibung</h4>
                    <p>{{ metric.details?.data?.['beschreibung'] || 'Keine Beschreibung vorhanden.' }}</p>
                  </div>

                  <div class="detail-section">
                    <h4>Formel</h4>
                    <p>{{ metric.details?.data?.['formel'] || 'Keine Formel vorhanden.' }}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </ng-container>
      </div>

      <div *ngIf="!isLoading && !metricTree && !errorMessage" class="empty-state">
        Keine Metric-Daten vorhanden.
      </div>
    </section>
  </main>
</div>
`, styles: ['/* src/app/pages/metric-view/metric-view.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding-top: 0.2rem;\n  background:\n    radial-gradient(\n      circle at top,\n      rgba(59, 130, 246, 0.12),\n      transparent 35%),\n    linear-gradient(\n      180deg,\n      #020617 0%,\n      #0f172a 100%);\n  color: #e2e8f0;\n  font-family: Arial, sans-serif;\n}\n:host,\n.metric-view-page {\n  background-color: #020617;\n}\n.metric-view-page {\n  min-height: 100vh;\n  width: 100%;\n  padding: 0.75rem 1rem 1rem;\n  margin: 0;\n  box-sizing: border-box;\n}\n.metric-view-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  gap: 1rem;\n  margin-bottom: 0.55rem;\n  padding-right: 260px;\n}\n.metric-view-header-copy {\n  min-width: 0;\n}\n.maturity-evaluator-button {\n  flex-shrink: 0;\n  min-height: 44px;\n  padding: 0.8rem 1.05rem;\n  border-radius: 14px;\n  border: 1px solid rgba(96, 165, 250, 0.32);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.9),\n      rgba(29, 78, 216, 0.9));\n  color: #eff6ff;\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 28px rgba(37, 99, 235, 0.22);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    border-color 0.18s ease;\n}\n.maturity-evaluator-button:hover {\n  transform: translateY(-1px);\n  border-color: rgba(147, 197, 253, 0.55);\n  box-shadow: 0 14px 34px rgba(37, 99, 235, 0.28);\n}\n.maturity-evaluator-button:active {\n  transform: translateY(0);\n}\n.maturity-evaluator-button.floating {\n  position: fixed;\n  right: 1.5rem;\n  bottom: 1.5rem;\n  z-index: 4500;\n}\n.layer-label {\n  margin: 0 0 0.2rem 0;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #60a5fa;\n}\n.metric-view-header h1 {\n  margin: 0;\n  font-size: 2.35rem;\n  color: #f8fafc;\n}\n.subtitle {\n  margin: 0.2rem 0 0 0;\n  color: #94a3b8;\n  font-size: 0.98rem;\n}\n.metric-view-layout {\n  display: grid;\n  grid-template-columns: 340px 1fr;\n  gap: 0.8rem;\n  align-items: start;\n}\n.controls-panel,\n.metric-canvas {\n  background: rgba(15, 23, 42, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 20px;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);\n}\n.controls-panel {\n  padding: 1.15rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  min-height: calc(100vh - 88px);\n}\n.controls-panel h2 {\n  margin: 0;\n  font-size: 1.02rem;\n  color: #f8fafc;\n}\n.controls-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n.controls-list li {\n  min-width: 0;\n}\n.control-button {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.32rem;\n  padding: 1rem 1rem;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: 15px;\n  background: rgba(30, 41, 59, 0.65);\n  color: #e2e8f0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n  min-width: 0;\n  overflow: hidden;\n}\n.control-button:hover {\n  border-color: rgba(96, 165, 250, 0.45);\n  background: rgba(37, 99, 235, 0.12);\n}\n.control-button.active {\n  border-color: #dbeafe;\n  background: rgba(59, 130, 246, 0.22);\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.26);\n}\n.control-id {\n  font-size: 0.86rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.control-name {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  font-size: 0.98rem;\n  line-height: 1.34;\n  color: #e2e8f0;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.side-legend {\n  margin-top: auto;\n  padding: 1rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.52);\n  border: 1px solid rgba(148, 163, 184, 0.14);\n}\n.side-legend h3 {\n  margin: 0 0 0.7rem 0;\n  font-size: 0.9rem;\n  color: #f8fafc;\n}\n.legend-items {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.legend-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  width: fit-content;\n  padding: 0.42rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(30, 41, 59, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  color: #cbd5e1;\n  font-size: 0.8rem;\n}\n.legend-chip::before {\n  content: "";\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 999px;\n  display: inline-block;\n}\n.legend-chip.structure::before {\n  background: #60a5fa;\n  box-shadow: 0 0 10px rgba(96, 165, 250, 0.55);\n}\n.legend-chip.metric::before {\n  background: #5eead4;\n  box-shadow: 0 0 10px rgba(94, 234, 212, 0.5);\n}\n.legend-chip.evidence::before {\n  background: #c084fc;\n  box-shadow: 0 0 10px rgba(192, 132, 252, 0.5);\n}\n.metric-canvas {\n  min-height: calc(100vh - 88px);\n  padding: 0.65rem;\n  overflow: visible;\n}\n.canvas-scene {\n  position: relative;\n  min-height: calc(100vh - 120px);\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  border-radius: 24px;\n  background:\n    radial-gradient(\n      circle at 50% 50%,\n      rgba(37, 99, 235, 0.12),\n      transparent 36%),\n    radial-gradient(\n      circle at 68% 28%,\n      rgba(94, 234, 212, 0.06),\n      transparent 20%),\n    radial-gradient(\n      circle at 26% 72%,\n      rgba(192, 132, 252, 0.05),\n      transparent 16%),\n    rgba(8, 15, 30, 0.82);\n  overflow: visible;\n}\n.canvas-scene::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(rgba(59, 130, 246, 0.035) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(59, 130, 246, 0.035) 1px,\n      transparent 1px);\n  background-size: 42px 42px;\n  opacity: 0.12;\n  pointer-events: none;\n}\n.scene-connections {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  pointer-events: none;\n  overflow: visible;\n}\n.connection-line {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.28);\n  stroke-width: 2.2;\n  stroke-dasharray: 7 8;\n  stroke-linecap: round;\n  opacity: 0.95;\n}\n.connection-line.profile-line {\n  stroke: rgba(96, 165, 250, 0.34);\n}\n.connection-line.evidence-line {\n  stroke: rgba(192, 132, 252, 0.42);\n}\n.connection-line.metric-line {\n  stroke: rgba(94, 234, 212, 0.3);\n}\n.connection-hotspot {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  border-radius: 999px;\n  border: 2px solid rgba(15, 23, 42, 0.96);\n  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.04), 0 8px 18px rgba(2, 6, 23, 0.3);\n  cursor: pointer;\n  z-index: 6;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    opacity 0.18s ease,\n    border-color 0.18s ease;\n  transform: translate(-50%, -50%);\n}\n.connection-hotspot:hover {\n  transform: translate(-50%, -50%) scale(1.16);\n  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.06), 0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 3px rgba(191, 219, 254, 0.45),\n    0 0 0 9px rgba(255, 255, 255, 0.06),\n    0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot.active {\n  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.06), 0 10px 22px rgba(2, 6, 23, 0.36);\n}\n.connection-hotspot.structure {\n  width: 22px;\n  height: 22px;\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #b9d2ff 0%,\n      #7fb0ff 58%,\n      #5f8fff 100%);\n  border-color: rgba(191, 219, 254, 0.55);\n}\n.connection-hotspot.metric {\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #c8fff7 0%,\n      #8ef1e2 58%,\n      #58d2c2 100%);\n}\n.connection-hotspot.evidence {\n  background:\n    radial-gradient(\n      circle at 35% 35%,\n      #f0cfff 0%,\n      #d39cff 58%,\n      #b46bf4 100%);\n}\n.left-column {\n  position: absolute;\n  top: 1.8rem;\n  left: 1.8rem;\n  width: 420px;\n  height: calc(100% - 3.6rem);\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n  z-index: 3;\n}\n.control-profile-panel,\n.evidence-panel {\n  border-radius: 22px;\n  background: rgba(8, 15, 30, 0.96);\n  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);\n}\n.panel-frame-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.85rem;\n}\n.panel-frame-label {\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #94a3b8;\n}\n.panel-ghost-toggle {\n  width: 28px;\n  height: 28px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  background: rgba(30, 41, 59, 0.78);\n  color: #e2e8f0;\n  cursor: pointer;\n}\n.control-profile-panel {\n  width: 100%;\n  padding: 1.25rem 1.3rem;\n  border: 1px solid rgba(96, 165, 250, 0.28);\n}\n.profile-header {\n  margin-bottom: 1rem;\n}\n.profile-kicker {\n  margin: 0 0 0.35rem 0;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #93c5fd;\n}\n.profile-header h3 {\n  margin: 0;\n  font-size: 1.18rem;\n  color: #f8fafc;\n  line-height: 1.3;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.profile-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.24rem;\n  margin-bottom: 1rem;\n  padding: 0.8rem 0.9rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.14);\n}\n.profile-label {\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #94a3b8;\n}\n.profile-value {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #e2e8f0;\n}\n.profile-section h4 {\n  margin: 0 0 0.5rem 0;\n  font-size: 0.95rem;\n  color: #f8fafc;\n}\n.profile-section p {\n  margin: 0;\n  font-size: 0.94rem;\n  line-height: 1.58;\n  color: #cbd5e1;\n}\n.evidence-panel {\n  width: 100%;\n  flex: 1 1 auto;\n  min-height: 0;\n  padding: 1.2rem 1.2rem;\n  border: 1px solid rgba(168, 85, 247, 0.28);\n  display: flex;\n  flex-direction: column;\n  gap: 0.95rem;\n  overflow: hidden;\n  min-width: 0;\n}\n.evidence-panel-header {\n  margin-bottom: 0.1rem;\n  flex-shrink: 0;\n}\n.evidence-panel-kicker {\n  margin: 0 0 0.3rem 0;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #c084fc;\n}\n.evidence-panel-header h3 {\n  margin: 0;\n  font-size: 1rem;\n  line-height: 1.34;\n  color: #f8fafc;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.evidence-explainer,\n.evidence-items-section {\n  border-radius: 16px;\n  border: 1px solid rgba(168, 85, 247, 0.16);\n  background: rgba(15, 23, 42, 0.45);\n  overflow: hidden;\n  min-width: 0;\n  flex-shrink: 0;\n}\n.evidence-items-section {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1 1 auto;\n}\n.accordion-toggle {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.95rem 1rem;\n  background: rgba(30, 41, 59, 0.58);\n  border: none;\n  color: #f8fafc;\n  text-align: left;\n  cursor: pointer;\n  font-size: 0.92rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.accordion-toggle:hover {\n  background: rgba(45, 55, 72, 0.78);\n}\n.accordion-icon {\n  flex-shrink: 0;\n  font-size: 1.1rem;\n  color: #d8b4fe;\n}\n.accordion-body {\n  padding: 0.95rem 1rem 1rem;\n  max-height: none;\n  overflow-y: auto;\n  min-height: 0;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(168, 85, 247, 0.48) rgba(15, 23, 42, 0.35);\n}\n.evidence-intro-text {\n  margin: 0 0 0.9rem 0;\n  font-size: 0.88rem;\n  line-height: 1.55;\n  color: #cbd5e1;\n}\n.evidence-type-info-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.evidence-type-info-item {\n  padding: 0.78rem 0.86rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.72);\n  border: 1px solid rgba(168, 85, 247, 0.12);\n}\n.evidence-type-info-label {\n  display: inline-block;\n  margin-bottom: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #e9d5ff;\n}\n.evidence-type-info-item p {\n  margin: 0;\n  font-size: 0.85rem;\n  line-height: 1.45;\n  color: #cbd5e1;\n}\n.evidence-card-list {\n  list-style: none;\n  margin: 0;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  overflow-y: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(168, 85, 247, 0.48) rgba(15, 23, 42, 0.35);\n}\n.evidence-card {\n  padding: 0.95rem 1rem;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.82);\n  border: 1px solid rgba(168, 85, 247, 0.16);\n  min-width: 0;\n}\n.evidence-card-topline {\n  display: flex;\n  flex-direction: column;\n  gap: 0.48rem;\n  margin-bottom: 0.6rem;\n  min-width: 0;\n}\n.evidence-asset {\n  display: block;\n  min-width: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n  line-height: 1.34;\n  color: #e9d5ff;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.evidence-type-chip {\n  align-self: flex-start;\n  padding: 0.28rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(168, 85, 247, 0.14);\n  border: 1px solid rgba(168, 85, 247, 0.22);\n  color: #d8b4fe;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.evidence-description {\n  margin: 0;\n  font-size: 0.86rem;\n  line-height: 1.48;\n  color: #cbd5e1;\n}\n.canvas-center-node {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 390px;\n  min-height: 390px;\n  border-radius: 999px;\n  padding: 2.35rem 2rem;\n  background:\n    radial-gradient(\n      circle at top,\n      rgba(59, 130, 246, 0.3),\n      rgba(30, 41, 59, 0.97));\n  border: 2px solid rgba(160, 188, 255, 0.88);\n  box-shadow:\n    0 0 0 14px rgba(59, 130, 246, 0.08),\n    0 0 0 26px rgba(59, 130, 246, 0.03),\n    0 28px 72px rgba(2, 6, 23, 0.48);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  z-index: 10;\n}\n.canvas-center-node::before,\n.canvas-center-node::after {\n  content: "";\n  position: absolute;\n  border-radius: 999px;\n  pointer-events: none;\n}\n.canvas-center-node::before {\n  inset: -14px;\n  border: 1px dashed rgba(96, 165, 250, 0.18);\n}\n.canvas-center-node::after {\n  inset: -30px;\n  border: 1px solid rgba(96, 165, 250, 0.08);\n}\n.center-reset-button {\n  position: absolute;\n  top: 1.15rem;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 0.5rem 0.9rem;\n  border-radius: 999px;\n  border: 1px solid rgba(191, 219, 254, 0.28);\n  background: rgba(15, 23, 42, 0.72);\n  color: #dbeafe;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.08), 0 10px 24px rgba(2, 6, 23, 0.22);\n  cursor: pointer;\n  z-index: 6;\n  white-space: nowrap;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    background 0.18s ease,\n    border-color 0.18s ease;\n}\n.center-reset-button:hover {\n  transform: translateX(-50%) translateY(-1px);\n  background: rgba(30, 41, 59, 0.88);\n  border-color: rgba(191, 219, 254, 0.42);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.14), 0 14px 28px rgba(2, 6, 23, 0.28);\n}\n.center-node-icon {\n  font-size: 2.55rem;\n  margin-bottom: 1rem;\n  color: #dbeafe;\n}\n.center-node-id {\n  display: inline-block;\n  margin-bottom: 0.85rem;\n  font-size: 1.55rem;\n  font-weight: 800;\n  color: #e0f2fe;\n  letter-spacing: 0.02em;\n}\n.center-node-content h2 {\n  margin: 0;\n  font-size: 1.48rem;\n  line-height: 1.25;\n  font-weight: 700;\n  color: #f8fafc;\n  max-width: 250px;\n  word-break: break-word;\n  overflow-wrap: anywhere;\n}\n.canvas-group {\n  position: absolute;\n  width: 430px;\n  z-index: 20;\n  overflow: visible;\n}\n.verification-group {\n  top: 2.2rem;\n  right: 2.2rem;\n}\n.validation-group {\n  top: 51.5%;\n  right: 2.2rem;\n  transform: translateY(0);\n}\n.group-node {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n  padding: 1.1rem 1.2rem;\n  border-radius: 18px;\n  border: 1px solid rgba(45, 212, 191, 0.35);\n  background: rgba(15, 23, 42, 0.92);\n  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.28);\n  position: relative;\n  z-index: 30;\n  overflow: visible;\n}\n.validation-group .group-node {\n  border-color: rgba(34, 197, 94, 0.35);\n}\n.group-node-main {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-width: 0;\n  position: relative;\n  overflow: visible;\n}\n.group-node-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-shrink: 0;\n}\n.group-node-title {\n  font-size: 1.08rem;\n  font-weight: 700;\n  color: #ecfeff;\n}\n.group-info-wrapper {\n  position: relative;\n  flex-shrink: 0;\n  overflow: visible;\n  z-index: 200;\n}\n.info-dot {\n  width: 22px;\n  height: 22px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(30, 41, 59, 0.9);\n  color: #bae6fd;\n  font-size: 0.76rem;\n  font-weight: 700;\n  cursor: default;\n  position: relative;\n  z-index: 210;\n}\n.group-info-tooltip {\n  position: absolute;\n  top: calc(100% + 0.55rem);\n  right: 0;\n  left: auto;\n  width: 320px;\n  max-width: min(320px, 100vw - 3rem);\n  padding: 0.95rem 1rem;\n  border-radius: 14px;\n  background: rgba(8, 15, 30, 0.98);\n  border: 1px solid rgba(56, 189, 248, 0.2);\n  color: #cbd5e1;\n  font-size: 0.84rem;\n  line-height: 1.5;\n  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.34);\n  opacity: 0;\n  pointer-events: none;\n  transform: translateY(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n  z-index: 9999;\n}\n.group-info-wrapper:hover .group-info-tooltip,\n.group-info-wrapper:focus-within .group-info-tooltip {\n  opacity: 1;\n  transform: translateY(0);\n}\n.group-node-count {\n  min-width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(45, 212, 191, 0.14);\n  color: #99f6e4;\n  font-size: 0.94rem;\n  font-weight: 700;\n}\n.validation-group .group-node-count {\n  background: rgba(34, 197, 94, 0.14);\n  color: #bbf7d0;\n}\n.metric-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.95rem;\n  margin-top: 1rem;\n  position: relative;\n  overflow: visible;\n}\n.metric-accordion {\n  position: relative;\n  border-radius: 16px;\n  overflow: visible;\n  width: 100%;\n}\n.metric-accordion.expanded {\n  width: 100%;\n  padding: 0.28rem;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(30, 41, 79, 0.34) 0%,\n      rgba(10, 18, 37, 0.42) 100%);\n  border: 1px solid rgba(96, 165, 250, 0.16);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.12), 0 14px 34px rgba(2, 6, 23, 0.22);\n}\n.metric-pill {\n  width: 100%;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 1rem;\n  text-align: left;\n  padding: 1.15rem 1.2rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.88);\n  color: #e2e8f0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  z-index: 2;\n  min-height: 64px;\n  overflow: visible;\n}\n.metric-pill:hover {\n  transform: translateX(4px);\n  border-color: rgba(96, 165, 250, 0.38);\n  background: rgba(30, 41, 59, 0.95);\n}\n.metric-pill.active {\n  border-color: rgba(96, 165, 250, 0.8);\n  background: rgba(30, 64, 175, 0.25);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.24);\n}\n.metric-pill-name {\n  min-width: 0;\n  font-size: 1rem;\n  line-height: 1.36;\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-pill-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.metric-pill-score {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: #93c5fd;\n  white-space: nowrap;\n}\n.metric-expand-icon {\n  width: 26px;\n  height: 26px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  background: rgba(59, 130, 246, 0.12);\n  color: #dbeafe;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.metric-detail-inline {\n  width: 100%;\n  max-width: 100%;\n  margin-top: 0.72rem;\n  padding: 1rem 1.05rem 1.05rem;\n  border-radius: 18px;\n  border: 1px solid rgba(125, 177, 255, 0.3);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(20, 31, 62, 0.97) 0%,\n      rgba(9, 16, 34, 0.99) 100%);\n  box-shadow:\n    0 0 0 1px rgba(96, 165, 250, 0.08),\n    0 16px 36px rgba(2, 6, 23, 0.3),\n    inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: visible;\n  box-sizing: border-box;\n}\n.metric-detail-inline::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  pointer-events: none;\n  box-shadow: inset 0 0 0 1px rgba(191, 219, 254, 0.08);\n}\n.metric-detail-topline {\n  margin-bottom: 0.95rem;\n  padding-bottom: 0.7rem;\n  border-bottom: 1px solid rgba(96, 165, 250, 0.14);\n}\n.detail-score-chip {\n  display: inline-flex;\n  padding: 0.45rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(56, 189, 248, 0.12);\n  border: 1px solid rgba(56, 189, 248, 0.22);\n  color: #bae6fd;\n  font-size: 0.84rem;\n  font-weight: 700;\n}\n.detail-section + .detail-section {\n  margin-top: 0.95rem;\n}\n.detail-section h4 {\n  margin: 0 0 0.42rem 0;\n  font-size: 0.88rem;\n  color: #f8fafc;\n}\n.detail-section p {\n  margin: 0;\n  font-size: 0.86rem;\n  line-height: 1.52;\n  color: #cbd5e1;\n}\n.loading-state,\n.empty-state,\n.error-message {\n  padding: 1rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.45);\n  font-size: 0.95rem;\n}\n.error-message {\n  color: #fca5a5;\n  border: 1px solid rgba(248, 113, 113, 0.25);\n}\n@media (max-width: 1700px) {\n  .left-column {\n    width: 380px;\n  }\n  .canvas-center-node {\n    width: 350px;\n    min-height: 350px;\n  }\n  .canvas-group {\n    width: 390px;\n  }\n}\n@media (max-width: 1450px) {\n  .metric-view-layout {\n    grid-template-columns: 1fr;\n  }\n  .controls-panel {\n    min-height: auto;\n  }\n  .side-legend {\n    margin-top: 0;\n  }\n  .metric-canvas {\n    min-height: auto;\n  }\n  .canvas-scene {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    min-height: auto;\n    padding: 1.25rem;\n  }\n  .canvas-scene::before,\n  .scene-connections,\n  .connection-hotspot,\n  .center-reset-button {\n    display: none;\n  }\n  .left-column,\n  .canvas-center-node,\n  .canvas-group {\n    position: static;\n    transform: none;\n    width: 100%;\n  }\n  .canvas-center-node::before,\n  .canvas-center-node::after {\n    display: none;\n  }\n  .left-column {\n    height: auto;\n    gap: 1rem;\n  }\n  .evidence-panel {\n    max-height: 520px;\n  }\n  .canvas-center-node {\n    min-height: auto;\n    border-radius: 28px;\n    padding: 1.75rem;\n  }\n  .center-node-content h2 {\n    max-width: 100%;\n  }\n  .group-info-tooltip {\n    width: 260px;\n  }\n  .metric-detail-inline {\n    margin-top: 0.65rem;\n  }\n}\n@media (max-width: 900px) {\n  :host {\n    padding-top: 2.75rem;\n  }\n  .metric-view-header {\n    flex-direction: column;\n    align-items: stretch;\n    padding-right: 0;\n  }\n  .maturity-evaluator-button {\n    width: 100%;\n  }\n  .maturity-evaluator-button.floating {\n    right: 1rem;\n    bottom: 1rem;\n    width: auto;\n    max-width: calc(100vw - 2rem);\n  }\n}\n/*# sourceMappingURL=metric-view.component.css.map */\n'] }]
  }], null, { canvasSceneRef: [{
    type: ViewChild,
    args: ["canvasScene"]
  }], centerNodeRef: [{
    type: ViewChild,
    args: ["centerNode"]
  }], profilePanelRef: [{
    type: ViewChild,
    args: ["profilePanel"]
  }], evidencePanelRef: [{
    type: ViewChild,
    args: ["evidencePanel"]
  }], groupPanelRefs: [{
    type: ViewChildren,
    args: ["groupPanel"]
  }], onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MetricViewComponent, { className: "MetricViewComponent", filePath: "src/app/pages/metric-view/metric-view.component.ts", lineNumber: 63 });
})();
export {
  MetricViewComponent
};
//# sourceMappingURL=chunk-CBEPGKCS.js.map
