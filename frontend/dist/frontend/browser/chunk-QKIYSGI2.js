import {
  MetricViewService
} from "./chunk-QSDFC4RZ.js";
import {
  AssessmentApiService,
  AssessmentSessionService
} from "./chunk-7S5MO6DI.js";
import {
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  Router,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VDFY4THU.js";

// src/app/pages/maturity-assessment/maturity-assessment.component.ts
function MaturityAssessmentComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1, "Lade Controls ...");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function MaturityAssessmentComponent_ul_16_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 42);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_ul_16_li_1_Template_button_click_1_listener() {
      const control_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectControl(control_r3.control_id));
    });
    \u0275\u0275elementStart(2, "span", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const control_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.selectedControlId === control_r3.control_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(control_r3.control_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(control_r3.name);
  }
}
function MaturityAssessmentComponent_ul_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 40);
    \u0275\u0275template(1, MaturityAssessmentComponent_ul_16_li_1_Template, 6, 4, "li", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.controls);
  }
}
function MaturityAssessmentComponent_section_45_div_7_div_12_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_45_div_7_div_12_button_1_Template_button_click_0_listener() {
      const metric_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openMetricDetail(metric_r6));
    });
    \u0275\u0275elementStart(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 63);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const metric_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", (ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.id) === metric_r6.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatScore(metric_r6.score), " ");
  }
}
function MaturityAssessmentComponent_section_45_div_7_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275template(1, MaturityAssessmentComponent_section_45_div_7_div_12_button_1_Template, 5, 4, "button", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.verificationMetrics);
  }
}
function MaturityAssessmentComponent_section_45_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "button", 51);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_45_div_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupMetrics("verification"));
    });
    \u0275\u0275elementStart(2, "div", 52)(3, "span", 53);
    \u0275\u0275text(4, "Verifikationsmetriken");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55)(8, "span", 56);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 57);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(12, MaturityAssessmentComponent_section_45_div_7_div_12_Template, 2, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("expanded", ctx_r0.isGroupExpanded("verification"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.verificationMetrics.length, " Metriken ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.verificationMetrics.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.isGroupExpanded("verification") ? "\u2212" : "+", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isGroupExpanded("verification"));
  }
}
function MaturityAssessmentComponent_section_45_div_8_div_12_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_45_div_8_div_12_button_1_Template_button_click_0_listener() {
      const metric_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openMetricDetail(metric_r9));
    });
    \u0275\u0275elementStart(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 63);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const metric_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", (ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.id) === metric_r9.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatScore(metric_r9.score), " ");
  }
}
function MaturityAssessmentComponent_section_45_div_8_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275template(1, MaturityAssessmentComponent_section_45_div_8_div_12_button_1_Template, 5, 4, "button", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.validationMetrics);
  }
}
function MaturityAssessmentComponent_section_45_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "button", 64);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_45_div_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupMetrics("validation"));
    });
    \u0275\u0275elementStart(2, "div", 52)(3, "span", 53);
    \u0275\u0275text(4, "Validierungsmetriken");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55)(8, "span", 56);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 57);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(12, MaturityAssessmentComponent_section_45_div_8_div_12_Template, 2, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("expanded", ctx_r0.isGroupExpanded("validation"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.validationMetrics.length, " Metriken ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.validationMetrics.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.isGroupExpanded("validation") ? "\u2212" : "+", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isGroupExpanded("validation"));
  }
}
function MaturityAssessmentComponent_section_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 45)(1, "div", 46)(2, "span", 47);
    \u0275\u0275text(3, "\u2302");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 48);
    \u0275\u0275template(7, MaturityAssessmentComponent_section_45_div_7_Template, 13, 6, "div", 49)(8, MaturityAssessmentComponent_section_45_div_8_Template, 13, 6, "div", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Control ", ctx_r0.selectedControlId ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.verificationMetrics.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.validationMetrics.length);
  }
}
function MaturityAssessmentComponent_section_46_ng_container_23_li_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidence_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evidence_r11.data["evidenz_art"], " ");
  }
}
function MaturityAssessmentComponent_section_46_ng_container_23_li_2_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidence_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evidence_r11.data["beschreibung"], " ");
  }
}
function MaturityAssessmentComponent_section_46_ng_container_23_li_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 78)(1, "span", 79);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, MaturityAssessmentComponent_section_46_ng_container_23_li_2_span_3_Template, 2, 1, "span", 80)(4, MaturityAssessmentComponent_section_46_ng_container_23_li_2_p_4_Template, 2, 1, "p", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidence_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", evidence_r11.name || evidence_r11.data["asset"] || "Unbenanntes Asset", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", evidence_r11.data["evidenz_art"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", evidence_r11.data["beschreibung"]);
  }
}
function MaturityAssessmentComponent_section_46_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "ul", 76);
    \u0275\u0275template(2, MaturityAssessmentComponent_section_46_ng_container_23_li_2_Template, 5, 3, "li", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.selectedEvidenceItems);
  }
}
function MaturityAssessmentComponent_section_46_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Keine Beispiel-Assets vorhanden.");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 65)(1, "div", 66)(2, "div", 67)(3, "p", 68);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 69);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_46_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeMetricDetail());
    });
    \u0275\u0275text(8, " \u2190 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 70)(10, "span", 71);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 72);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 73)(15, "div", 74)(16, "h4");
    \u0275\u0275text(17, "Beschreibung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 74)(21, "h4");
    \u0275\u0275text(22, "Beispiels-Assets");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, MaturityAssessmentComponent_section_46_ng_container_23_Template, 3, 1, "ng-container", 75)(24, MaturityAssessmentComponent_section_46_ng_template_24_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 74)(27, "h4");
    \u0275\u0275text(28, "Formel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const noEvidenceAssets_r12 = \u0275\u0275reference(25);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedMetric.groupType === "verification" ? "Verifikationsmetrik" : "Validierungsmetrik", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetric.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Score: ", ctx_r0.formatScore(ctx_r0.selectedMetric.score), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetric.id);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetricDescriptionText);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.selectedEvidenceItems.length)("ngIfElse", noEvidenceAssets_r12);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetricFormulaText);
  }
}
function MaturityAssessmentComponent_section_47_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_47_button_2_Template_button_click_0_listener() {
      const step_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToProgressStep(step_r14));
    });
    \u0275\u0275element(1, "span", 91);
    \u0275\u0275elementStart(2, "span", 92);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r15 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", i_r15 <= ctx_r0.activeProgressIndex)("current", i_r15 === ctx_r0.activeProgressIndex);
    \u0275\u0275attribute("aria-label", "Zu Metrik " + (i_r15 + 1) + " wechseln");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r15 + 1);
  }
}
function MaturityAssessmentComponent_section_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 84)(1, "div", 85);
    \u0275\u0275template(2, MaturityAssessmentComponent_section_47_button_2_Template, 4, 6, "button", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 87)(4, "p", 88);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 89);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.progressSteps);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.id) || ctx_r0.selectedControlId || "Assessment", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r0.selectedMetric == null ? null : ctx_r0.selectedMetric.name) || ctx_r0.controlName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedMetric ? ctx_r0.selectedMetricDescriptionText : ctx_r0.controlDescription, " ");
  }
}
function MaturityAssessmentComponent_section_48_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_section_48_button_1_Template_button_click_0_listener() {
      const option_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectAssessment(option_r17.value));
    });
    \u0275\u0275elementStart(1, "div", 96);
    \u0275\u0275element(2, "span", 97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 98)(4, "h4");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 99);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedAssessment === option_r17.value)("level-0", option_r17.value === 0)("level-1", option_r17.value === 1)("level-2", option_r17.value === 2)("level-3", option_r17.value === 3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(option_r17.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r17.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", option_r17.value, " ");
  }
}
function MaturityAssessmentComponent_section_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 93);
    \u0275\u0275template(1, MaturityAssessmentComponent_section_48_button_1_Template, 10, 13, "button", 94);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.assessmentOptions);
  }
}
function MaturityAssessmentComponent_section_49_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Noch nicht beantwortete Metriken im aktuellen Control werden automatisch mit 0 bewertet. ");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_49_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Alle Metriken im aktuellen Control sind beantwortet und bereit zur \xDCbermittlung. ");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 100)(1, "div", 101)(2, "h3");
    \u0275\u0275text(3, "Assessment abschlie\xDFen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 102);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, " Mit dem finalen Absenden wird das Assessment abgeschlossen und kann danach nicht mehr ver\xE4ndert werden. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, MaturityAssessmentComponent_section_49_p_8_Template, 2, 0, "p", 103)(9, MaturityAssessmentComponent_section_49_p_9_Template, 2, 0, "p", 103);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.totalMissingMetricCount, " offen ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.totalMissingMetricCount > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.totalMissingMetricCount === 0);
  }
}
function MaturityAssessmentComponent_footer_50_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saveMessage, " ");
  }
}
function MaturityAssessmentComponent_footer_50_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 112);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_footer_50_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToNextControl());
    });
    \u0275\u0275text(1, " N\xE4chstes Control ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
  }
}
function MaturityAssessmentComponent_footer_50_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 113);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_footer_50_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmSubmitAssessment());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting ? "Assessment wird \xFCbermittelt ..." : "Assessment abschlie\xDFen", " ");
  }
}
function MaturityAssessmentComponent_footer_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "footer", 104)(1, "button", 105);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_footer_50_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelAssessmentChanges());
    });
    \u0275\u0275text(2, " Abbrechen ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 106)(4, "button", 107);
    \u0275\u0275listener("click", function MaturityAssessmentComponent_footer_50_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveAssessment());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MaturityAssessmentComponent_footer_50_div_6_Template, 2, 1, "div", 108)(7, MaturityAssessmentComponent_footer_50_button_7_Template, 2, 1, "button", 109)(8, MaturityAssessmentComponent_footer_50_button_8_Template, 2, 2, "button", 110);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.isSaving || ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSaving ? "Speichert ..." : "Lokal speichern", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saveMessage && !ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isLastControl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLastControl);
  }
}
function MaturityAssessmentComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 116);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r21 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.selectedAssessment === option_r21.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r21.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r21.shortLabel);
  }
}
function MaturityAssessmentComponent_section_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 35)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Notizen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 117);
    \u0275\u0275text(5, "optional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "textarea", 118);
    \u0275\u0275listener("input", function MaturityAssessmentComponent_section_66_Template_textarea_input_6_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateNotes($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 119)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.notesLength, "/1000");
  }
}
function MaturityAssessmentComponent_section_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 120)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Ausgew\xE4hlte Metrik");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 121);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 122)(7, "p", 123);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 124);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatScore(ctx_r0.selectedMetric.score), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.selectedMetric.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedMetric.groupType === "verification" ? "Verifikation" : "Validierung", " ");
  }
}
function MaturityAssessmentComponent_section_68_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Diese Bewertung wurde in der aktuellen Assessment-Session gespeichert und wird erst beim Abschluss an das Backend \xFCbermittelt. ");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_68_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Diese Bewertung liegt aktuell nur als Entwurf in der Session vor. ");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 35)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Status");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, MaturityAssessmentComponent_section_68_p_4_Template, 2, 0, "p", 75)(5, MaturityAssessmentComponent_section_68_ng_template_5_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const draftState_r23 = \u0275\u0275reference(6);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.hasSavedAnswerForSelectedMetric)("ngIfElse", draftState_r23);
  }
}
function MaturityAssessmentComponent_section_69_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Es fehlen noch ", ctx_r0.totalMissingMetricCount, " Antworten im aktuellen Control. ");
  }
}
function MaturityAssessmentComponent_section_69_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Im aktuellen Control fehlen keine Antworten mehr. ");
    \u0275\u0275elementEnd();
  }
}
function MaturityAssessmentComponent_section_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 35)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Finalisierung");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, MaturityAssessmentComponent_section_69_p_4_Template, 2, 1, "p", 103)(5, MaturityAssessmentComponent_section_69_p_5_Template, 2, 0, "p", 103);
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, " Nach dem Absenden sind keine \xC4nderungen an diesem Assessment mehr m\xF6glich. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.totalMissingMetricCount > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.totalMissingMetricCount === 0);
  }
}
var MaturityAssessmentComponent = class _MaturityAssessmentComponent {
  metricViewService = inject(MetricViewService);
  router = inject(Router);
  assessmentSessionService = inject(AssessmentSessionService);
  assessmentApiService = inject(AssessmentApiService);
  controls = [];
  selectedControlId = null;
  metricTree = null;
  isLoading = false;
  isSaving = false;
  isSubmitting = false;
  errorMessage = null;
  saveMessage = null;
  canvasGroups = [];
  selectedMetric = null;
  metricDetailOpen = false;
  expandedGroups = {
    verification: false,
    validation: false
  };
  assessmentOptions = [
    {
      value: 0,
      key: "not-implemented",
      label: "Not Implemented",
      shortLabel: "Not Implemented",
      description: "Die Anforderungen sind nicht oder nur unwesentlich umgesetzt."
    },
    {
      value: 1,
      key: "partially-implemented",
      label: "Partially Implemented",
      shortLabel: "Partially Implemented",
      description: "Die Anforderungen sind teilweise umgesetzt, jedoch nicht konsistent."
    },
    {
      value: 2,
      key: "largely-implemented",
      label: "Largely Implemented",
      shortLabel: "Largely Implemented",
      description: "Die Anforderungen sind weitgehend umgesetzt und nachvollziehbar etabliert."
    },
    {
      value: 3,
      key: "fully-implemented",
      label: "Fully Implemented",
      shortLabel: "Fully Implemented",
      description: "Die Anforderungen sind vollst\xE4ndig, systematisch und wirksam umgesetzt."
    }
  ];
  selectedAssessment = 2;
  notes = "";
  ngOnInit() {
    this.initializeSession();
  }
  loadControls() {
    this.isLoading = true;
    this.errorMessage = null;
    this.metricViewService.getControls().subscribe({
      next: (response) => {
        this.controls = response.data ?? [];
        if (this.controls.length > 0) {
          const currentControlId = this.assessmentSessionService.snapshot.currentControlId ?? this.controls[0].control_id;
          this.selectedControlId = currentControlId;
          this.loadMetricView(currentControlId);
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
    this.metricDetailOpen = false;
    this.saveMessage = null;
    this.expandedGroups = {
      verification: false,
      validation: false
    };
    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.buildCanvasViewModel();
        if (this.selectedMetric) {
          this.expandedGroups[this.selectedMetric.groupType] = true;
          this.hydrateFormFromSelectedMetric();
        } else {
          this.resetEditorState();
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Fehler beim Laden der Metric View.";
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.metricDetailOpen = false;
        this.resetEditorState();
        this.isLoading = false;
      }
    });
  }
  openMetricDetail(metric) {
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
  }
  closeMetricDetail() {
    this.metricDetailOpen = false;
    this.saveMessage = null;
  }
  selectControl(controlId) {
    if (this.selectedControlId === controlId) {
      return;
    }
    this.persistDraftToSession();
    this.finalizeCurrentControlPacket(false);
    this.selectedControlId = controlId;
    this.loadMetricView(controlId);
  }
  selectMetric(metric) {
    this.persistDraftToSession();
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
  }
  toggleGroupMetrics(groupType) {
    const nextState = !this.expandedGroups[groupType];
    this.expandedGroups[groupType] = nextState;
    if (nextState) {
      const firstMetric = this.canvasGroups.find((group) => group.type === groupType)?.metrics[0] ?? null;
      if (firstMetric) {
        this.persistDraftToSession();
        this.selectedMetric = firstMetric;
        this.hydrateFormFromSelectedMetric();
      }
    }
  }
  isGroupExpanded(groupType) {
    return this.expandedGroups[groupType];
  }
  selectAssessment(level) {
    this.selectedAssessment = level;
    this.persistDraftToSession();
    this.saveMessage = null;
  }
  updateNotes(value) {
    this.notes = value;
    this.persistDraftToSession();
    this.saveMessage = null;
  }
  saveAssessment() {
    if (!this.selectedMetric || !this.selectedControlId) {
      this.saveMessage = null;
      return;
    }
    this.isSaving = true;
    this.errorMessage = null;
    this.saveMessage = null;
    this.assessmentSessionService.saveAnswer(this.selectedControlId, this.selectedMetric.id, this.selectedAssessment, this.notes.trim());
    this.finalizeCurrentControlPacket(false);
    this.isSaving = false;
    this.saveMessage = "Bewertung lokal gespeichert.";
  }
  cancelAssessmentChanges() {
    if (!this.selectedMetric) {
      this.resetEditorState();
      return;
    }
    const currentAnswer = this.assessmentSessionService.getAnswer(this.selectedMetric.id);
    if (currentAnswer?.saved) {
      this.selectedAssessment = currentAnswer.assessmentLevel;
      this.notes = currentAnswer.notes;
      this.saveMessage = "\xC4nderungen verworfen.";
      return;
    }
    this.assessmentSessionService.removeAnswer(this.selectedMetric.id);
    this.selectedAssessment = 2;
    this.notes = "";
    this.saveMessage = "\xC4nderungen verworfen.";
  }
  goToNextControl() {
    this.persistDraftToSession();
    if (!this.controls.length || !this.selectedControlId) {
      return;
    }
    this.finalizeCurrentControlPacket(true);
    const currentIndex = this.controls.findIndex((control) => control.control_id === this.selectedControlId);
    if (currentIndex === -1) {
      return;
    }
    const nextControl = this.controls[currentIndex + 1];
    if (nextControl) {
      this.selectedControlId = nextControl.control_id;
      this.loadMetricView(nextControl.control_id);
    }
  }
  confirmSubmitAssessment() {
    this.persistDraftToSession();
    const missingCount = this.totalMissingMetricCount;
    const message = missingCount > 0 ? `Es fehlen noch ${missingCount} Antworten im aktuellen Control. Diese werden automatisch mit 0 bewertet. Nach dem Absenden k\xF6nnen die Antworten nicht mehr ge\xE4ndert werden. Assessment jetzt abschlie\xDFen?` : "Nach dem Absenden k\xF6nnen die Antworten nicht mehr ge\xE4ndert werden. Assessment jetzt abschlie\xDFen?";
    const confirmed = window.confirm(message);
    if (!confirmed) {
      return;
    }
    this.fillMissingAnswersWithZeroInCurrentControl();
    this.submitAssessment();
  }
  submitAssessment() {
    const sessionId = this.assessmentSessionService.ensureSession();
    if (this.selectedControlId) {
      this.finalizeCurrentControlPacket(true);
    }
    const payload = this.assessmentSessionService.buildFinalSubmissionPayload();
    this.isSubmitting = true;
    this.errorMessage = null;
    this.saveMessage = null;
    this.assessmentApiService.submitSession(sessionId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(["/assessment-summary"]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = "Fehler beim Abschlie\xDFen des Assessments.";
      }
    });
  }
  goToMetricView() {
    this.persistDraftToSession();
    this.router.navigate(["/"]);
  }
  goToProgressStep(stepId) {
    this.persistDraftToSession();
    const metric = this.allMetrics.find((item) => item.id === stepId);
    if (!metric) {
      return;
    }
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
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
    const allMetrics = this.canvasGroups.flatMap((group) => group.metrics);
    const firstMetric = allMetrics[0] ?? null;
    if (!firstMetric) {
      this.selectedMetric = null;
      return;
    }
    const currentMetricId = this.assessmentSessionService.snapshot.currentMetricId;
    this.selectedMetric = allMetrics.find((metric) => metric.id === currentMetricId) ?? firstMetric;
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
  persistDraftToSession() {
    if (!this.selectedMetric || !this.selectedControlId) {
      return;
    }
    this.assessmentSessionService.upsertDraft(this.selectedControlId, this.selectedMetric.id, this.selectedAssessment, this.notes);
  }
  hydrateFormFromSelectedMetric() {
    if (!this.selectedMetric || !this.selectedControlId) {
      this.resetEditorState();
      return;
    }
    const source = this.assessmentSessionService.getAnswer(this.selectedMetric.id);
    if (source) {
      this.selectedAssessment = source.assessmentLevel;
      this.notes = source.notes;
      this.assessmentSessionService.setCurrentContext(source.controlId, source.metricId);
      return;
    }
    this.selectedAssessment = 2;
    this.notes = "";
    this.assessmentSessionService.setCurrentContext(this.selectedControlId, this.selectedMetric.id);
  }
  resetEditorState() {
    this.selectedAssessment = 2;
    this.notes = "";
    this.saveMessage = null;
  }
  initializeSession() {
    const existingSessionId = this.assessmentSessionService.getSessionId();
    if (existingSessionId) {
      this.loadControls();
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.assessmentApiService.createSession().subscribe({
      next: (response) => {
        const sessionId = response.data?.session_id;
        if (!sessionId) {
          this.errorMessage = "Keine Session-ID vom Backend erhalten.";
          this.isLoading = false;
          return;
        }
        this.assessmentSessionService.startSession(sessionId);
        this.loadControls();
      },
      error: () => {
        this.errorMessage = "Fehler beim Erstellen der Maturity-Session.";
        this.isLoading = false;
      }
    });
  }
  finalizeCurrentControlPacket(completed) {
    if (!this.selectedControlId) {
      return;
    }
    this.assessmentSessionService.saveCurrentControlPacket(this.selectedControlId, completed);
  }
  fillMissingAnswersWithZeroInCurrentControl() {
    if (!this.selectedControlId) {
      return;
    }
    for (const metric of this.allMetrics) {
      const existing = this.assessmentSessionService.getAnswer(metric.id);
      if (!existing || existing.assessmentLevel === null) {
        this.assessmentSessionService.saveAnswer(this.selectedControlId, metric.id, 0, existing?.notes ?? "");
      }
    }
    this.assessmentSessionService.saveCurrentControlPacket(this.selectedControlId, true);
  }
  formatScore(score) {
    if (score === null || Number.isNaN(score)) {
      return "n/a";
    }
    return `${(score * 100).toFixed(1)}%`;
  }
  get controlName() {
    return this.metricTree?.name ?? "Maturity Assessment";
  }
  get controlDescription() {
    return this.metricTree?.data?.["beschreibung"] ?? "";
  }
  get selectedEvidenceItems() {
    return this.selectedMetric?.evidencesNode?.children ?? [];
  }
  get selectedMetricDescriptionText() {
    return this.selectedMetric?.details?.data?.["beschreibung"] || this.selectedMetric?.rawNode.data?.["beschreibung"] || this.controlDescription || "Keine Beschreibung vorhanden.";
  }
  get selectedMetricFormulaText() {
    return this.selectedMetric?.details?.data?.["formel"] || this.selectedMetric?.rawNode.data?.["formel"] || "Keine Formel vorhanden.";
  }
  get verificationMetrics() {
    return this.canvasGroups.find((group) => group.type === "verification")?.metrics ?? [];
  }
  get validationMetrics() {
    return this.canvasGroups.find((group) => group.type === "validation")?.metrics ?? [];
  }
  get allMetrics() {
    return [...this.verificationMetrics, ...this.validationMetrics];
  }
  get progressSteps() {
    const metricIds = this.allMetrics.map((metric) => metric.id);
    return metricIds.length ? metricIds : [this.selectedControlId ?? "control"];
  }
  get activeProgressIndex() {
    const selectedMetric = this.selectedMetric;
    if (!selectedMetric) {
      return 0;
    }
    const index = this.progressSteps.findIndex((step) => step === selectedMetric.id);
    return index >= 0 ? index : 0;
  }
  get currentMilLabel() {
    return this.selectedAssessment === null ? "\u2013" : `MIL ${this.selectedAssessment}`;
  }
  get notesLength() {
    return this.notes.length;
  }
  get hasSavedAnswerForSelectedMetric() {
    if (!this.selectedMetric) {
      return false;
    }
    return this.assessmentSessionService.hasSavedAnswer(this.selectedMetric.id);
  }
  get isLastControl() {
    if (!this.controls.length || !this.selectedControlId) {
      return false;
    }
    const currentIndex = this.controls.findIndex((control) => control.control_id === this.selectedControlId);
    return currentIndex === this.controls.length - 1;
  }
  get missingMetricsInCurrentControl() {
    return this.allMetrics.filter((metric) => {
      const answer = this.assessmentSessionService.getAnswer(metric.id);
      return !answer || answer.assessmentLevel === null;
    });
  }
  get totalMissingMetricCount() {
    return this.missingMetricsInCurrentControl.length;
  }
  static \u0275fac = function MaturityAssessmentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaturityAssessmentComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaturityAssessmentComponent, selectors: [["app-maturity-assessment"]], decls: 70, vars: 17, consts: [["noEvidenceAssets", ""], ["draftState", ""], [1, "assessment-shell", "assessment-shell--maturity"], [1, "assessment-sidebar", "assessment-sidebar--maturity"], [1, "brand-block"], [1, "brand-mark"], [1, "brand-eyebrow"], [1, "sidebar-section"], [1, "sidebar-section-head"], ["class", "sidebar-state", 4, "ngIf"], ["class", "sidebar-state error", 4, "ngIf"], ["class", "control-nav", 4, "ngIf"], [1, "sidebar-legend"], [1, "legend-stack"], [1, "legend-row"], [1, "legend-dot", "control"], [1, "legend-dot", "verification"], [1, "legend-dot", "validation"], [1, "assessment-main", "assessment-main--maturity"], [1, "assessment-workspace"], [1, "workspace-header"], [1, "workspace-kicker"], ["type", "button", 1, "metric-view-trigger", 3, "click"], ["class", "metric-summary-card", 4, "ngIf"], ["class", "metric-summary-card metric-detail-card", 4, "ngIf"], ["class", "question-panel", 4, "ngIf"], ["class", "rating-grid", 4, "ngIf"], ["class", "submit-warning-card", 4, "ngIf"], ["class", "workspace-actions", 4, "ngIf"], [1, "assessment-sidepanel", "assessment-sidepanel--maturity"], [1, "info-card", "mil-card"], [1, "info-card-head"], [1, "info-badge"], [1, "mil-scale"], ["class", "mil-node", 3, "active", 4, "ngFor", "ngForOf"], [1, "info-card"], ["class", "info-card", 4, "ngIf"], ["class", "info-card metrics-card", 4, "ngIf"], [1, "sidebar-state"], [1, "sidebar-state", "error"], [1, "control-nav"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "control-nav-item", 3, "click"], [1, "control-code"], [1, "control-title"], [1, "metric-summary-card"], [1, "metric-control-pill"], [1, "metric-pill-icon"], [1, "metric-groups"], ["class", "metric-group-block", 4, "ngIf"], [1, "metric-group-block"], ["type", "button", 1, "metric-group-card", "verification", 3, "click"], [1, "metric-group-card-main"], [1, "metric-group-title"], [1, "metric-group-subtitle"], [1, "metric-group-card-meta"], [1, "metric-group-count"], [1, "metric-group-toggle"], ["class", "metric-group-list", 4, "ngIf"], [1, "metric-group-list"], ["type", "button", "class", "metric-list-item", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "metric-list-item", 3, "click"], [1, "metric-list-item-name"], [1, "metric-list-item-score"], ["type", "button", 1, "metric-group-card", "validation", 3, "click"], [1, "metric-summary-card", "metric-detail-card"], [1, "metric-detail-card-head"], [1, "metric-detail-card-titleblock"], [1, "metric-detail-kicker"], ["type", "button", "aria-label", "Zur\xFCck zu den Metriken", "title", "Zur\xFCck zu den Metriken", 1, "metric-detail-back", 3, "click"], [1, "metric-detail-card-meta"], [1, "metric-detail-score"], [1, "metric-detail-id"], [1, "metric-detail-sections"], [1, "metric-detail-section"], [4, "ngIf", "ngIfElse"], [1, "metric-evidence-list"], ["class", "metric-evidence-item", 4, "ngFor", "ngForOf"], [1, "metric-evidence-item"], [1, "metric-evidence-asset"], ["class", "metric-evidence-type", 4, "ngIf"], ["class", "metric-evidence-description", 4, "ngIf"], [1, "metric-evidence-type"], [1, "metric-evidence-description"], [1, "question-panel"], [1, "progress-rail"], ["type", "button", "class", "progress-step", 3, "active", "current", "click", 4, "ngFor", "ngForOf"], [1, "question-copy"], [1, "question-kicker"], [1, "question-description"], ["type", "button", 1, "progress-step", 3, "click"], [1, "progress-dot"], [1, "progress-label"], [1, "rating-grid"], ["type", "button", "class", "rating-card", 3, "selected", "level-0", "level-1", "level-2", "level-3", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "rating-card", 3, "click"], [1, "rating-icon-ring"], [1, "rating-icon-core"], [1, "rating-copy"], [1, "rating-index"], [1, "submit-warning-card"], [1, "submit-warning-head"], [1, "submit-warning-badge"], [4, "ngIf"], [1, "workspace-actions"], ["type", "button", 1, "ghost-action", 3, "click"], [1, "workspace-actions-right"], ["type", "button", 1, "secondary-action", 3, "click", "disabled"], ["class", "save-hint", 4, "ngIf"], ["type", "button", "class", "primary-action", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "primary-action danger-submit", 3, "disabled", "click", 4, "ngIf"], [1, "save-hint"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], ["type", "button", 1, "primary-action", "danger-submit", 3, "click", "disabled"], [1, "mil-node"], [1, "mil-node-index"], [1, "mil-node-label"], [1, "optional-label"], ["rows", "10", "maxlength", "1000", "placeholder", "Hier k\xF6nnen Begr\xFCndungen, Beobachtungen oder Verweise auf Evidenzen dokumentiert werden ...", 1, "notes-field", 3, "input", "value"], [1, "notes-meta"], [1, "info-card", "metrics-card"], [1, "metric-score"], [1, "selected-metric-block"], [1, "selected-metric-name"], [1, "selected-metric-type"]], template: function MaturityAssessmentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "aside", 3)(2, "div", 4)(3, "div", 5);
      \u0275\u0275text(4, "\u2B21");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "p", 6);
      \u0275\u0275text(7, "Maturity Evaluator");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h1");
      \u0275\u0275text(9, "Schicht 4");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "span");
      \u0275\u0275text(13, "Controls");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, MaturityAssessmentComponent_div_14_Template, 2, 0, "div", 9)(15, MaturityAssessmentComponent_div_15_Template, 2, 1, "div", 10)(16, MaturityAssessmentComponent_ul_16_Template, 2, 1, "ul", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12)(18, "h2");
      \u0275\u0275text(19, "Legende");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 14);
      \u0275\u0275element(22, "span", 15);
      \u0275\u0275elementStart(23, "span");
      \u0275\u0275text(24, "Control");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 14);
      \u0275\u0275element(26, "span", 16);
      \u0275\u0275elementStart(27, "span");
      \u0275\u0275text(28, "Verifikation");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 14);
      \u0275\u0275element(30, "span", 17);
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32, "Validierung");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(33, "main", 18)(34, "section", 19)(35, "header", 20)(36, "div")(37, "p", 21);
      \u0275\u0275text(38, "Maturity Assessment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "h2");
      \u0275\u0275text(40);
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "button", 22);
      \u0275\u0275listener("click", function MaturityAssessmentComponent_Template_button_click_43_listener() {
        return ctx.goToMetricView();
      });
      \u0275\u0275text(44, " Metric View \xF6ffnen ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, MaturityAssessmentComponent_section_45_Template, 9, 3, "section", 23)(46, MaturityAssessmentComponent_section_46_Template, 31, 8, "section", 24)(47, MaturityAssessmentComponent_section_47_Template, 10, 4, "section", 25)(48, MaturityAssessmentComponent_section_48_Template, 2, 1, "section", 26)(49, MaturityAssessmentComponent_section_49_Template, 10, 3, "section", 27)(50, MaturityAssessmentComponent_footer_50_Template, 9, 5, "footer", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "aside", 29)(52, "section", 30)(53, "div", 31)(54, "h3");
      \u0275\u0275text(55, "Maturity Indicator Level");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "span", 32);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 33);
      \u0275\u0275template(59, MaturityAssessmentComponent_div_59_Template, 5, 4, "div", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "section", 35)(61, "div", 31)(62, "h3");
      \u0275\u0275text(63, "Bewertungshinweis");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "p");
      \u0275\u0275text(65, " W\xE4hlen Sie den Reifegrad, der den aktuellen Implementierungsstand dieses Controls in Ihrer Organisation am besten widerspiegelt. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(66, MaturityAssessmentComponent_section_66_Template, 10, 2, "section", 36)(67, MaturityAssessmentComponent_section_67_Template, 11, 3, "section", 37)(68, MaturityAssessmentComponent_section_68_Template, 7, 2, "section", 36)(69, MaturityAssessmentComponent_section_69_Template, 8, 2, "section", 36);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.controls.length);
      \u0275\u0275advance(24);
      \u0275\u0275textInterpolate1(" Control ", ctx.selectedControlId ?? "\u2014", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.controlName);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", !ctx.metricDetailOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.metricDetailOpen && ctx.selectedMetric);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.metricTree);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.metricTree && ctx.selectedMetric);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.metricTree && ctx.selectedMetric && ctx.isLastControl);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.metricTree && ctx.selectedMetric);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.currentMilLabel);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.assessmentOptions);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.selectedMetric);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedMetric);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedMetric);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLastControl);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding-top: 2.5rem;\n  background:\n    radial-gradient(\n      circle at top left,\n      rgba(59, 130, 246, 0.1),\n      transparent 28%),\n    linear-gradient(\n      180deg,\n      #0a0f1c 0%,\n      #0b1120 100%);\n  color: #e5edf8;\n  font-family: Arial, sans-serif;\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.assessment-shell[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 4.5rem);\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  background: transparent;\n}\n.assessment-sidebar[_ngcontent-%COMP%] {\n  padding: 1.1rem 1rem;\n  border-right: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(7, 12, 24, 0.9);\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.assessment-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 320px;\n  gap: 1rem;\n}\n.assessment-workspace[_ngcontent-%COMP%], \n.assessment-sidepanel[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.assessment-shell--maturity[_ngcontent-%COMP%] {\n  margin-top: -1rem;\n}\n.assessment-sidebar--maturity[_ngcontent-%COMP%] {\n  padding-top: 0.2rem;\n}\n.assessment-main--maturity[_ngcontent-%COMP%] {\n  margin-top: -0.5rem;\n}\n.assessment-sidepanel--maturity[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.brand-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.6rem 0.4rem 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n.brand-mark[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: rgba(30, 64, 175, 0.18);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #93c5fd;\n  font-size: 1rem;\n}\n.brand-eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 0.2rem;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7dd3fc;\n}\n.brand-block[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.96rem;\n  font-weight: 600;\n  color: #f8fafc;\n}\n.sidebar-section[_ngcontent-%COMP%] {\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n.sidebar-section-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #94a3b8;\n  padding: 0 0.35rem;\n}\n.control-nav[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.control-nav-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid rgba(148, 163, 184, 0.1);\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.74);\n  color: #dbe7f5;\n  text-align: left;\n  padding: 0.82rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.28rem;\n  cursor: pointer;\n  transition:\n    border-color 0.2s ease,\n    background 0.2s ease,\n    transform 0.2s ease;\n}\n.control-nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(20, 35, 64, 0.9);\n  border-color: rgba(96, 165, 250, 0.35);\n  transform: translateX(2px);\n}\n.control-nav-item.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(30, 64, 175, 0.34),\n      rgba(30, 41, 59, 0.92));\n  border-color: rgba(147, 197, 253, 0.85);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.24);\n}\n.control-code[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.control-title[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  line-height: 1.35;\n  color: #e2e8f0;\n}\n.sidebar-state[_ngcontent-%COMP%] {\n  padding: 0.9rem 0.95rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.6);\n  color: #cbd5e1;\n  font-size: 0.9rem;\n}\n.sidebar-state.error[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  border: 1px solid rgba(248, 113, 113, 0.24);\n}\n.sidebar-legend[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding: 0.95rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(15, 23, 42, 0.62);\n}\n.sidebar-legend[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.8rem;\n  font-size: 0.88rem;\n  color: #f8fafc;\n}\n.legend-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.legend-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #cbd5e1;\n  font-size: 0.82rem;\n}\n.legend-dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 999px;\n  display: inline-block;\n}\n.legend-dot.control[_ngcontent-%COMP%] {\n  background: #93c5fd;\n}\n.legend-dot.verification[_ngcontent-%COMP%] {\n  background: #5eead4;\n}\n.legend-dot.validation[_ngcontent-%COMP%] {\n  background: #c084fc;\n}\n.assessment-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 320px;\n  gap: 1rem;\n}\n.assessment-workspace[_ngcontent-%COMP%], \n.assessment-sidepanel[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.assessment-workspace[_ngcontent-%COMP%] {\n  padding: 1.15rem;\n  border-radius: 24px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  background: rgba(8, 13, 25, 0.88);\n  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.34);\n}\n.workspace-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.workspace-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.35rem;\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #60a5fa;\n}\n.workspace-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.9rem;\n  line-height: 1.2;\n  color: #f8fafc;\n}\n.workspace-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline;\n  margin-left: 0.35rem;\n  color: #dbeafe;\n  font-weight: 500;\n}\n.metric-view-trigger[_ngcontent-%COMP%] {\n  padding: 0.78rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.78);\n  color: #e2e8f0;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    transform 0.18s ease;\n}\n.metric-view-trigger[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96, 165, 250, 0.36);\n  background: rgba(30, 41, 59, 0.92);\n  transform: translateY(-1px);\n}\n.metric-summary-card[_ngcontent-%COMP%], \n.question-panel[_ngcontent-%COMP%], \n.info-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(11, 18, 32, 0.92);\n  box-shadow: 0 16px 40px rgba(2, 6, 23, 0.22);\n}\n.metric-summary-card[_ngcontent-%COMP%] {\n  padding: 1rem 1.05rem;\n  display: grid;\n  grid-template-columns: 240px minmax(0, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.metric-control-pill[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-radius: 18px;\n  background: rgba(15, 23, 42, 0.78);\n  border: 1px solid rgba(96, 165, 250, 0.18);\n  color: #e2e8f0;\n  font-weight: 600;\n}\n.metric-pill-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(30, 64, 175, 0.26);\n  border: 1px solid rgba(147, 197, 253, 0.28);\n  color: #bfdbfe;\n}\n.metric-groups[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.85rem;\n}\n.metric-group-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.metric-group-card[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(15, 23, 42, 0.82);\n  color: #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.9rem;\n  cursor: pointer;\n  text-align: left;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease;\n}\n.metric-group-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.metric-group-card.verification[_ngcontent-%COMP%] {\n  border-color: rgba(45, 212, 191, 0.24);\n}\n.metric-group-card.validation[_ngcontent-%COMP%] {\n  border-color: rgba(192, 132, 252, 0.24);\n}\n.metric-group-card.expanded.verification[_ngcontent-%COMP%] {\n  background: rgba(18, 49, 53, 0.74);\n  border-color: rgba(94, 234, 212, 0.4);\n}\n.metric-group-card.expanded.validation[_ngcontent-%COMP%] {\n  background: rgba(51, 32, 78, 0.72);\n  border-color: rgba(216, 180, 254, 0.42);\n}\n.metric-group-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  min-width: 0;\n}\n.metric-group-title[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n.metric-group-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #94a3b8;\n}\n.metric-group-card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.metric-group-count[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.metric-group-card.verification[_ngcontent-%COMP%]   .metric-group-count[_ngcontent-%COMP%] {\n  background: rgba(45, 212, 191, 0.15);\n  color: #99f6e4;\n}\n.metric-group-card.validation[_ngcontent-%COMP%]   .metric-group-count[_ngcontent-%COMP%] {\n  background: rgba(192, 132, 252, 0.15);\n  color: #e9d5ff;\n}\n.metric-group-toggle[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.06);\n  color: #e2e8f0;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.metric-group-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n  padding: 0.25rem 0 0;\n}\n.metric-list-item[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  background: rgba(15, 23, 42, 0.72);\n  color: #e2e8f0;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.metric-list-item[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96, 165, 250, 0.3);\n  background: rgba(30, 41, 59, 0.92);\n}\n.metric-list-item.active[_ngcontent-%COMP%] {\n  border-color: rgba(96, 165, 250, 0.7);\n  background: rgba(37, 99, 235, 0.18);\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);\n}\n.metric-list-item-name[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-list-item-score[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #93c5fd;\n  font-weight: 700;\n}\n.metric-detail-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n  padding: 1.25rem 1.35rem;\n}\n.metric-detail-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem 0;\n  font-size: 0.82rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #b6c2d9;\n}\n.metric-detail-card-titleblock[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.metric-detail-card-titleblock[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.4rem;\n  line-height: 1.35;\n  color: #f8fafc;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-detail-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.metric-detail-back[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 12px;\n  background: rgba(30, 41, 59, 0.78);\n  color: #e2e8f0;\n  font-size: 1.2rem;\n  line-height: 1;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    background 0.18s ease,\n    border-color 0.18s ease;\n}\n.metric-detail-back[_ngcontent-%COMP%]:hover {\n  transform: translateX(-2px);\n  background: rgba(51, 65, 85, 0.92);\n  border-color: rgba(96, 165, 250, 0.35);\n}\n.metric-detail-back[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid rgba(96, 165, 250, 0.7);\n  outline-offset: 2px;\n}\n.metric-detail-back[_ngcontent-%COMP%]:active {\n  transform: translateX(-1px) scale(0.98);\n}\n.metric-detail-card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n}\n.metric-detail-score[_ngcontent-%COMP%], \n.metric-detail-id[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.42rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(42, 56, 92, 0.6);\n  border: 1px solid rgba(163, 184, 255, 0.22);\n  color: #e2e8f0;\n  font-size: 0.88rem;\n  font-weight: 700;\n}\n.metric-detail-sections[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.metric-detail-section[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.15rem;\n  border-radius: 16px;\n  background: rgba(29, 37, 68, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n.metric-detail-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.55rem 0;\n  font-size: 0.98rem;\n  color: #f8fafc;\n}\n.metric-detail-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  line-height: 1.65;\n  color: #e5edf9;\n}\n.metric-evidence-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.metric-evidence-item[_ngcontent-%COMP%] {\n  padding: 0.9rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.42);\n}\n.metric-evidence-asset[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: #f8fafc;\n  font-weight: 700;\n}\n.metric-evidence-type[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 0.55rem;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(59, 130, 246, 0.16);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #bfdbfe;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.metric-evidence-description[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #cbd5e1;\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.question-panel[_ngcontent-%COMP%] {\n  padding: 1.2rem 1.2rem 1.1rem;\n  margin-bottom: 1rem;\n}\n.progress-rail[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(66px, 1fr));\n  gap: 0.4rem;\n  margin-bottom: 1.2rem;\n}\n.progress-step[_ngcontent-%COMP%] {\n  appearance: none;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.45rem;\n  border: none;\n  background: transparent;\n  padding: 0;\n  cursor: pointer;\n}\n.progress-step[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 12px;\n  left: calc(-50% + 12px);\n  width: calc(100% - 24px);\n  height: 2px;\n  background: rgba(148, 163, 184, 0.2);\n}\n.progress-step[_ngcontent-%COMP%]:first-child::before {\n  display: none;\n}\n.progress-step[_ngcontent-%COMP%]:hover   .progress-dot[_ngcontent-%COMP%] {\n  transform: scale(1.08);\n  border-color: rgba(147, 197, 253, 0.8);\n}\n.progress-dot[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 2px solid rgba(148, 163, 184, 0.38);\n  background: #1e293b;\n  z-index: 1;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease;\n}\n.progress-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.progress-step.active[_ngcontent-%COMP%]   .progress-dot[_ngcontent-%COMP%] {\n  border-color: rgba(125, 211, 252, 0.9);\n  background: rgba(56, 189, 248, 0.18);\n}\n.progress-step.current[_ngcontent-%COMP%]   .progress-dot[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.08);\n}\n.progress-step.active[_ngcontent-%COMP%]::before {\n  background: rgba(125, 211, 252, 0.42);\n}\n.question-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.45rem;\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #93c5fd;\n}\n.question-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  font-size: 1.55rem;\n  line-height: 1.35;\n  color: #f8fafc;\n  max-width: 48rem;\n}\n.question-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.98rem;\n  line-height: 1.65;\n  color: #cbd5e1;\n  max-width: 58rem;\n}\n.rating-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.rating-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  min-height: 260px;\n  padding: 1rem 1rem 0.95rem;\n  border-radius: 20px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(17, 24, 39, 0.96),\n      rgba(10, 17, 30, 0.98));\n  color: #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 1rem;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.rating-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.rating-card.selected[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.28), 0 18px 40px rgba(2, 6, 23, 0.26);\n}\n.rating-card.level-0.selected[_ngcontent-%COMP%] {\n  border-color: rgba(248, 113, 113, 0.7);\n}\n.rating-card.level-1.selected[_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.7);\n}\n.rating-card.level-2.selected[_ngcontent-%COMP%] {\n  border-color: rgba(34, 211, 238, 0.8);\n}\n.rating-card.level-3.selected[_ngcontent-%COMP%] {\n  border-color: rgba(74, 222, 128, 0.8);\n}\n.rating-icon-ring[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  margin-top: 0.15rem;\n  border-radius: 999px;\n  border: 5px solid rgba(148, 163, 184, 0.25);\n  display: grid;\n  place-items: center;\n}\n.rating-icon-core[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 999px;\n  background: rgba(148, 163, 184, 0.18);\n}\n.rating-card.level-0[_ngcontent-%COMP%]   .rating-icon-ring[_ngcontent-%COMP%] {\n  border-color: rgba(248, 113, 113, 0.55);\n}\n.rating-card.level-1[_ngcontent-%COMP%]   .rating-icon-ring[_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.52);\n}\n.rating-card.level-2[_ngcontent-%COMP%]   .rating-icon-ring[_ngcontent-%COMP%] {\n  border-color: rgba(34, 211, 238, 0.6);\n}\n.rating-card.level-3[_ngcontent-%COMP%]   .rating-icon-ring[_ngcontent-%COMP%] {\n  border-color: rgba(74, 222, 128, 0.58);\n}\n.rating-card.selected.level-0[_ngcontent-%COMP%]   .rating-icon-core[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.7);\n}\n.rating-card.selected.level-1[_ngcontent-%COMP%]   .rating-icon-core[_ngcontent-%COMP%] {\n  background: rgba(250, 204, 21, 0.7);\n}\n.rating-card.selected.level-2[_ngcontent-%COMP%]   .rating-icon-core[_ngcontent-%COMP%] {\n  background: rgba(34, 211, 238, 0.78);\n}\n.rating-card.selected.level-3[_ngcontent-%COMP%]   .rating-icon-core[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.78);\n}\n.rating-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.rating-copy[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.08rem;\n  color: #f8fafc;\n}\n.rating-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.92rem;\n  line-height: 1.55;\n  color: #cbd5e1;\n}\n.rating-index[_ngcontent-%COMP%] {\n  margin-top: auto;\n  width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(15, 23, 42, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  color: #cbd5e1;\n  font-size: 0.92rem;\n  font-weight: 700;\n}\n.workspace-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n.workspace-actions-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n.save-hint[_ngcontent-%COMP%] {\n  font-size: 0.84rem;\n  color: #93c5fd;\n  white-space: nowrap;\n}\n.ghost-action[_ngcontent-%COMP%], \n.secondary-action[_ngcontent-%COMP%], \n.primary-action[_ngcontent-%COMP%] {\n  min-height: 46px;\n  padding: 0.85rem 1.15rem;\n  border-radius: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease,\n    opacity 0.18s ease;\n}\n.ghost-action[_ngcontent-%COMP%]:hover, \n.secondary-action[_ngcontent-%COMP%]:hover, \n.primary-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.ghost-action[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.55);\n  color: #dbe7f5;\n}\n.secondary-action[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.9);\n  color: #e5edf8;\n}\n.primary-action[_ngcontent-%COMP%] {\n  border: 1px solid rgba(96, 165, 250, 0.4);\n  background:\n    linear-gradient(\n      180deg,\n      #2563eb 0%,\n      #1d4ed8 100%);\n  color: #eff6ff;\n}\n.ghost-action[_ngcontent-%COMP%]:hover {\n  border-color: rgba(148, 163, 184, 0.3);\n  background: rgba(30, 41, 59, 0.82);\n}\n.secondary-action[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96, 165, 250, 0.34);\n  background: rgba(30, 41, 59, 0.96);\n}\n.primary-action[_ngcontent-%COMP%]:hover {\n  border-color: rgba(147, 197, 253, 0.56);\n  background:\n    linear-gradient(\n      180deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n}\n.ghost-action[_ngcontent-%COMP%]:disabled, \n.secondary-action[_ngcontent-%COMP%]:disabled, \n.primary-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n  transform: none;\n}\n.assessment-sidepanel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 5rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.info-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.8rem;\n}\n.info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.96rem;\n  color: #f8fafc;\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  line-height: 1.6;\n  color: #cbd5e1;\n}\n.info-badge[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(30, 64, 175, 0.22);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #bfdbfe;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.mil-scale[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.55rem;\n}\n.mil-node[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.42rem;\n  text-align: center;\n}\n.mil-node-index[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  border: 2px solid rgba(148, 163, 184, 0.28);\n  color: #cbd5e1;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.mil-node.active[_ngcontent-%COMP%]   .mil-node-index[_ngcontent-%COMP%] {\n  border-color: #67e8f9;\n  background: rgba(34, 211, 238, 0.16);\n  color: #cffafe;\n}\n.mil-node-label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  line-height: 1.3;\n  color: #94a3b8;\n}\n.optional-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.notes-field[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n  min-height: 180px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: 14px;\n  padding: 0.9rem;\n  background: rgba(15, 23, 42, 0.82);\n  color: #e2e8f0;\n  outline: none;\n}\n.notes-field[_ngcontent-%COMP%]:focus {\n  border-color: rgba(96, 165, 250, 0.5);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n.notes-meta[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  display: flex;\n  justify-content: flex-end;\n  color: #64748b;\n  font-size: 0.75rem;\n}\n.metric-score[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.selected-metric-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.selected-metric-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.92rem;\n  color: #f8fafc;\n}\n.selected-metric-type[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #94a3b8;\n  text-transform: capitalize;\n}\n@media (max-width: 1500px) {\n  .assessment-main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .assessment-sidepanel[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    align-items: start;\n  }\n  .metrics-card[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n}\n@media (max-width: 1180px) {\n  .assessment-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .assessment-sidebar[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  }\n  .metric-summary-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .metric-groups[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .rating-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .workspace-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .workspace-actions-right[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n  .workspace-actions-right[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n   .ghost-action[_ngcontent-%COMP%] {\n    flex: 1 1 220px;\n  }\n}\n@media (max-width: 760px) {\n  .assessment-main[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n  .assessment-workspace[_ngcontent-%COMP%] {\n    padding: 1rem;\n    border-radius: 20px;\n  }\n  .workspace-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .workspace-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.45rem;\n  }\n  .question-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.18rem;\n  }\n  .rating-grid[_ngcontent-%COMP%], \n   .assessment-sidepanel[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mil-scale[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .metric-detail-card-head[_ngcontent-%COMP%], \n   .metric-detail-card-meta[_ngcontent-%COMP%] {\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=maturity-assessment.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaturityAssessmentComponent, [{
    type: Component,
    args: [{ selector: "app-maturity-assessment", standalone: true, imports: [CommonModule], template: `<div class="assessment-shell assessment-shell--maturity">
  <aside class="assessment-sidebar assessment-sidebar--maturity">
    <div class="brand-block">
      <div class="brand-mark">\u2B21</div>
      <div>
        <p class="brand-eyebrow">Maturity Evaluator</p>
        <h1>Schicht 4</h1>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-head">
        <span>Controls</span>
      </div>

      <div *ngIf="isLoading" class="sidebar-state">Lade Controls ...</div>
      <div *ngIf="errorMessage" class="sidebar-state error">
        {{ errorMessage }}
      </div>

      <ul *ngIf="!isLoading && controls.length" class="control-nav">
        <li *ngFor="let control of controls">
          <button
            type="button"
            class="control-nav-item"
            [class.active]="selectedControlId === control.control_id"
            (click)="selectControl(control.control_id)"
          >
            <span class="control-code">{{ control.control_id }}</span>
            <span class="control-title">{{ control.name }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="sidebar-legend">
      <h2>Legende</h2>
      <div class="legend-stack">
        <div class="legend-row">
          <span class="legend-dot control"></span>
          <span>Control</span>
        </div>
        <div class="legend-row">
          <span class="legend-dot verification"></span>
          <span>Verifikation</span>
        </div>
        <div class="legend-row">
          <span class="legend-dot validation"></span>
          <span>Validierung</span>
        </div>
      </div>
    </div>
  </aside>

  <main class="assessment-main assessment-main--maturity">
    <section class="assessment-workspace">
      <header class="workspace-header">
        <div>
          <p class="workspace-kicker">Maturity Assessment</p>
          <h2>
            Control {{ selectedControlId ?? '\u2014' }}
            <span>{{ controlName }}</span>
          </h2>
        </div>

        <button
          type="button"
          class="metric-view-trigger"
          (click)="goToMetricView()"
        >
          Metric View \xF6ffnen
        </button>
      </header>

      <section class="metric-summary-card" *ngIf="!metricDetailOpen">
        <div class="metric-control-pill">
          <span class="metric-pill-icon">\u2302</span>
          <span>Control {{ selectedControlId ?? '\u2014' }}</span>
        </div>

        <div class="metric-groups">
          <div class="metric-group-block" *ngIf="verificationMetrics.length">
            <button
              type="button"
              class="metric-group-card verification"
              [class.expanded]="isGroupExpanded('verification')"
              (click)="toggleGroupMetrics('verification')"
            >
              <div class="metric-group-card-main">
                <span class="metric-group-title">Verifikationsmetriken</span>
                <span class="metric-group-subtitle">
                  {{ verificationMetrics.length }} Metriken
                </span>
              </div>

              <div class="metric-group-card-meta">
                <span class="metric-group-count">
                  {{ verificationMetrics.length }}
                </span>
                <span class="metric-group-toggle">
                  {{ isGroupExpanded('verification') ? '\u2212' : '+' }}
                </span>
              </div>
            </button>

            <div class="metric-group-list" *ngIf="isGroupExpanded('verification')">
              <button
                *ngFor="let metric of verificationMetrics"
                type="button"
                class="metric-list-item"
                [class.active]="selectedMetric?.id === metric.id"
                (click)="openMetricDetail(metric)"
              >
                <span class="metric-list-item-name">{{ metric.name }}</span>
                <span class="metric-list-item-score">
                  {{ formatScore(metric.score) }}
                </span>
              </button>
            </div>
          </div>

          <div class="metric-group-block" *ngIf="validationMetrics.length">
            <button
              type="button"
              class="metric-group-card validation"
              [class.expanded]="isGroupExpanded('validation')"
              (click)="toggleGroupMetrics('validation')"
            >
              <div class="metric-group-card-main">
                <span class="metric-group-title">Validierungsmetriken</span>
                <span class="metric-group-subtitle">
                  {{ validationMetrics.length }} Metriken
                </span>
              </div>

              <div class="metric-group-card-meta">
                <span class="metric-group-count">
                  {{ validationMetrics.length }}
                </span>
                <span class="metric-group-toggle">
                  {{ isGroupExpanded('validation') ? '\u2212' : '+' }}
                </span>
              </div>
            </button>

            <div class="metric-group-list" *ngIf="isGroupExpanded('validation')">
              <button
                *ngFor="let metric of validationMetrics"
                type="button"
                class="metric-list-item"
                [class.active]="selectedMetric?.id === metric.id"
                (click)="openMetricDetail(metric)"
              >
                <span class="metric-list-item-name">{{ metric.name }}</span>
                <span class="metric-list-item-score">
                  {{ formatScore(metric.score) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        class="metric-summary-card metric-detail-card"
        *ngIf="metricDetailOpen && selectedMetric"
      >
        <div class="metric-detail-card-head">
          <div class="metric-detail-card-titleblock">
            <p class="metric-detail-kicker">
              {{
                selectedMetric.groupType === 'verification'
                  ? 'Verifikationsmetrik'
                  : 'Validierungsmetrik'
              }}
            </p>
            <h3>{{ selectedMetric.name }}</h3>
          </div>

          <button
            type="button"
            class="metric-detail-back"
            (click)="closeMetricDetail()"
            aria-label="Zur\xFCck zu den Metriken"
            title="Zur\xFCck zu den Metriken"
          >
            \u2190
          </button>
        </div>

        <div class="metric-detail-card-meta">
          <span class="metric-detail-score">
            Score: {{ formatScore(selectedMetric.score) }}
          </span>
          <span class="metric-detail-id">{{ selectedMetric.id }}</span>
        </div>

        <div class="metric-detail-sections">
          <div class="metric-detail-section">
            <h4>Beschreibung</h4>
            <p>{{ selectedMetricDescriptionText }}</p>
          </div>

          <div class="metric-detail-section">
            <h4>Beispiels-Assets</h4>

            <ng-container
              *ngIf="selectedEvidenceItems.length; else noEvidenceAssets"
            >
              <ul class="metric-evidence-list">
                <li
                  *ngFor="let evidence of selectedEvidenceItems"
                  class="metric-evidence-item"
                >
                  <span class="metric-evidence-asset">
                    {{
                      evidence.name ||
                      evidence.data['asset'] ||
                      'Unbenanntes Asset'
                    }}
                  </span>

                  <span
                    class="metric-evidence-type"
                    *ngIf="evidence.data['evidenz_art']"
                  >
                    {{ evidence.data['evidenz_art'] }}
                  </span>

                  <p
                    class="metric-evidence-description"
                    *ngIf="evidence.data['beschreibung']"
                  >
                    {{ evidence.data['beschreibung'] }}
                  </p>
                </li>
              </ul>
            </ng-container>

            <ng-template #noEvidenceAssets>
              <p>Keine Beispiel-Assets vorhanden.</p>
            </ng-template>
          </div>

          <div class="metric-detail-section">
            <h4>Formel</h4>
            <p>{{ selectedMetricFormulaText }}</p>
          </div>
        </div>
      </section>

      <section class="question-panel" *ngIf="metricTree">
        <div class="progress-rail">
          <button
            type="button"
            class="progress-step"
            *ngFor="let step of progressSteps; let i = index"
            [class.active]="i <= activeProgressIndex"
            [class.current]="i === activeProgressIndex"
            (click)="goToProgressStep(step)"
            [attr.aria-label]="'Zu Metrik ' + (i + 1) + ' wechseln'"
          >
            <span class="progress-dot"></span>
            <span class="progress-label">{{ i + 1 }}</span>
          </button>
        </div>

        <div class="question-copy">
          <p class="question-kicker">
            {{ selectedMetric?.id || selectedControlId || 'Assessment' }}
          </p>

          <h3>{{ selectedMetric?.name || controlName }}</h3>

          <p class="question-description">
            {{
              selectedMetric
                ? selectedMetricDescriptionText
                : controlDescription
            }}
          </p>
        </div>
      </section>

      <section class="rating-grid" *ngIf="metricTree && selectedMetric">
        <button
          *ngFor="let option of assessmentOptions"
          type="button"
          class="rating-card"
          [class.selected]="selectedAssessment === option.value"
          [class.level-0]="option.value === 0"
          [class.level-1]="option.value === 1"
          [class.level-2]="option.value === 2"
          [class.level-3]="option.value === 3"
          (click)="selectAssessment(option.value)"
        >
          <div class="rating-icon-ring">
            <span class="rating-icon-core"></span>
          </div>

          <div class="rating-copy">
            <h4>{{ option.label }}</h4>
            <p>{{ option.description }}</p>
          </div>

          <div class="rating-index">
            {{ option.value }}
          </div>
        </button>
      </section>

      <section
        class="submit-warning-card"
        *ngIf="metricTree && selectedMetric && isLastControl"
      >
        <div class="submit-warning-head">
          <h3>Assessment abschlie\xDFen</h3>
          <span class="submit-warning-badge">
            {{ totalMissingMetricCount }} offen
          </span>
        </div>

        <p>
          Mit dem finalen Absenden wird das Assessment abgeschlossen und kann danach
          nicht mehr ver\xE4ndert werden.
        </p>

        <p *ngIf="totalMissingMetricCount > 0">
          Noch nicht beantwortete Metriken im aktuellen Control werden
          automatisch mit 0 bewertet.
        </p>

        <p *ngIf="totalMissingMetricCount === 0">
          Alle Metriken im aktuellen Control sind beantwortet und bereit zur
          \xDCbermittlung.
        </p>
      </section>

      <footer class="workspace-actions" *ngIf="metricTree && selectedMetric">
        <button
          type="button"
          class="ghost-action"
          (click)="cancelAssessmentChanges()"
        >
          Abbrechen
        </button>

        <div class="workspace-actions-right">
          <button
            type="button"
            class="secondary-action"
            (click)="saveAssessment()"
            [disabled]="isSaving || isSubmitting"
          >
            {{ isSaving ? 'Speichert ...' : 'Lokal speichern' }}
          </button>

          <div class="save-hint" *ngIf="saveMessage && !isSubmitting">
            {{ saveMessage }}
          </div>

          <button
            *ngIf="!isLastControl"
            type="button"
            class="primary-action"
            (click)="goToNextControl()"
            [disabled]="isSubmitting"
          >
            N\xE4chstes Control
          </button>

          <button
            *ngIf="isLastControl"
            type="button"
            class="primary-action danger-submit"
            (click)="confirmSubmitAssessment()"
            [disabled]="isSubmitting"
          >
            {{
              isSubmitting
                ? 'Assessment wird \xFCbermittelt ...'
                : 'Assessment abschlie\xDFen'
            }}
          </button>
        </div>
      </footer>
    </section>

    <aside class="assessment-sidepanel assessment-sidepanel--maturity">
      <section class="info-card mil-card">
        <div class="info-card-head">
          <h3>Maturity Indicator Level</h3>
          <span class="info-badge">{{ currentMilLabel }}</span>
        </div>

        <div class="mil-scale">
          <div
            class="mil-node"
            *ngFor="let option of assessmentOptions"
            [class.active]="selectedAssessment === option.value"
          >
            <span class="mil-node-index">{{ option.value }}</span>
            <span class="mil-node-label">{{ option.shortLabel }}</span>
          </div>
        </div>
      </section>

      <section class="info-card">
        <div class="info-card-head">
          <h3>Bewertungshinweis</h3>
        </div>
        <p>
          W\xE4hlen Sie den Reifegrad, der den aktuellen Implementierungsstand dieses
          Controls in Ihrer Organisation am besten widerspiegelt.
        </p>
      </section>

      <section class="info-card" *ngIf="selectedMetric">
        <div class="info-card-head">
          <h3>Notizen</h3>
          <span class="optional-label">optional</span>
        </div>

        <textarea
          class="notes-field"
          rows="10"
          maxlength="1000"
          [value]="notes"
          (input)="updateNotes(($any($event.target).value))"
          placeholder="Hier k\xF6nnen Begr\xFCndungen, Beobachtungen oder Verweise auf Evidenzen dokumentiert werden ..."
        ></textarea>

        <div class="notes-meta">
          <span>{{ notesLength }}/1000</span>
        </div>
      </section>

      <section class="info-card metrics-card" *ngIf="selectedMetric">
        <div class="info-card-head">
          <h3>Ausgew\xE4hlte Metrik</h3>
          <span class="metric-score">
            {{ formatScore(selectedMetric.score) }}
          </span>
        </div>

        <div class="selected-metric-block">
          <p class="selected-metric-name">{{ selectedMetric.name }}</p>
          <p class="selected-metric-type">
            {{
              selectedMetric.groupType === 'verification'
                ? 'Verifikation'
                : 'Validierung'
            }}
          </p>
        </div>
      </section>

      <section class="info-card" *ngIf="selectedMetric">
        <div class="info-card-head">
          <h3>Status</h3>
        </div>

        <p *ngIf="hasSavedAnswerForSelectedMetric; else draftState">
          Diese Bewertung wurde in der aktuellen Assessment-Session gespeichert und
          wird erst beim Abschluss an das Backend \xFCbermittelt.
        </p>

        <ng-template #draftState>
          <p>
            Diese Bewertung liegt aktuell nur als Entwurf in der Session vor.
          </p>
        </ng-template>
      </section>

      <section class="info-card" *ngIf="isLastControl">
        <div class="info-card-head">
          <h3>Finalisierung</h3>
        </div>

        <p *ngIf="totalMissingMetricCount > 0">
          Es fehlen noch {{ totalMissingMetricCount }} Antworten im aktuellen
          Control.
        </p>

        <p *ngIf="totalMissingMetricCount === 0">
          Im aktuellen Control fehlen keine Antworten mehr.
        </p>

        <p>
          Nach dem Absenden sind keine \xC4nderungen an diesem Assessment mehr
          m\xF6glich.
        </p>
      </section>
    </aside>
  </main>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/maturity-assessment/maturity-assessment.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding-top: 2.5rem;\n  background:\n    radial-gradient(\n      circle at top left,\n      rgba(59, 130, 246, 0.1),\n      transparent 28%),\n    linear-gradient(\n      180deg,\n      #0a0f1c 0%,\n      #0b1120 100%);\n  color: #e5edf8;\n  font-family: Arial, sans-serif;\n}\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.assessment-shell {\n  min-height: calc(100vh - 4.5rem);\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  background: transparent;\n}\n.assessment-sidebar {\n  padding: 1.1rem 1rem;\n  border-right: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(7, 12, 24, 0.9);\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.assessment-main {\n  min-width: 0;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 320px;\n  gap: 1rem;\n}\n.assessment-workspace,\n.assessment-sidepanel {\n  min-width: 0;\n}\n.assessment-shell--maturity {\n  margin-top: -1rem;\n}\n.assessment-sidebar--maturity {\n  padding-top: 0.2rem;\n}\n.assessment-main--maturity {\n  margin-top: -0.5rem;\n}\n.assessment-sidepanel--maturity {\n  margin-top: 0.5rem;\n}\n.brand-block {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.6rem 0.4rem 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n.brand-mark {\n  width: 38px;\n  height: 38px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: rgba(30, 64, 175, 0.18);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #93c5fd;\n  font-size: 1rem;\n}\n.brand-eyebrow {\n  margin: 0 0 0.2rem;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7dd3fc;\n}\n.brand-block h1 {\n  margin: 0;\n  font-size: 0.96rem;\n  font-weight: 600;\n  color: #f8fafc;\n}\n.sidebar-section {\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n.sidebar-section-head span {\n  display: block;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #94a3b8;\n  padding: 0 0.35rem;\n}\n.control-nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.control-nav-item {\n  width: 100%;\n  border: 1px solid rgba(148, 163, 184, 0.1);\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.74);\n  color: #dbe7f5;\n  text-align: left;\n  padding: 0.82rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.28rem;\n  cursor: pointer;\n  transition:\n    border-color 0.2s ease,\n    background 0.2s ease,\n    transform 0.2s ease;\n}\n.control-nav-item:hover {\n  background: rgba(20, 35, 64, 0.9);\n  border-color: rgba(96, 165, 250, 0.35);\n  transform: translateX(2px);\n}\n.control-nav-item.active {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(30, 64, 175, 0.34),\n      rgba(30, 41, 59, 0.92));\n  border-color: rgba(147, 197, 253, 0.85);\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.24);\n}\n.control-code {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.control-title {\n  font-size: 0.88rem;\n  line-height: 1.35;\n  color: #e2e8f0;\n}\n.sidebar-state {\n  padding: 0.9rem 0.95rem;\n  border-radius: 12px;\n  background: rgba(15, 23, 42, 0.6);\n  color: #cbd5e1;\n  font-size: 0.9rem;\n}\n.sidebar-state.error {\n  color: #fca5a5;\n  border: 1px solid rgba(248, 113, 113, 0.24);\n}\n.sidebar-legend {\n  margin-top: auto;\n  padding: 0.95rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(15, 23, 42, 0.62);\n}\n.sidebar-legend h2 {\n  margin: 0 0 0.8rem;\n  font-size: 0.88rem;\n  color: #f8fafc;\n}\n.legend-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.legend-row {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #cbd5e1;\n  font-size: 0.82rem;\n}\n.legend-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 999px;\n  display: inline-block;\n}\n.legend-dot.control {\n  background: #93c5fd;\n}\n.legend-dot.verification {\n  background: #5eead4;\n}\n.legend-dot.validation {\n  background: #c084fc;\n}\n.assessment-main {\n  min-width: 0;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 320px;\n  gap: 1rem;\n}\n.assessment-workspace,\n.assessment-sidepanel {\n  min-width: 0;\n}\n.assessment-workspace {\n  padding: 1.15rem;\n  border-radius: 24px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  background: rgba(8, 13, 25, 0.88);\n  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.34);\n}\n.workspace-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.workspace-kicker {\n  margin: 0 0 0.35rem;\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #60a5fa;\n}\n.workspace-header h2 {\n  margin: 0;\n  font-size: 1.9rem;\n  line-height: 1.2;\n  color: #f8fafc;\n}\n.workspace-header h2 span {\n  display: inline;\n  margin-left: 0.35rem;\n  color: #dbeafe;\n  font-weight: 500;\n}\n.metric-view-trigger {\n  padding: 0.78rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.78);\n  color: #e2e8f0;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    transform 0.18s ease;\n}\n.metric-view-trigger:hover {\n  border-color: rgba(96, 165, 250, 0.36);\n  background: rgba(30, 41, 59, 0.92);\n  transform: translateY(-1px);\n}\n.metric-summary-card,\n.question-panel,\n.info-card {\n  border-radius: 20px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(11, 18, 32, 0.92);\n  box-shadow: 0 16px 40px rgba(2, 6, 23, 0.22);\n}\n.metric-summary-card {\n  padding: 1rem 1.05rem;\n  display: grid;\n  grid-template-columns: 240px minmax(0, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.metric-control-pill {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-radius: 18px;\n  background: rgba(15, 23, 42, 0.78);\n  border: 1px solid rgba(96, 165, 250, 0.18);\n  color: #e2e8f0;\n  font-weight: 600;\n}\n.metric-pill-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(30, 64, 175, 0.26);\n  border: 1px solid rgba(147, 197, 253, 0.28);\n  color: #bfdbfe;\n}\n.metric-groups {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.85rem;\n}\n.metric-group-block {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.metric-group-card {\n  padding: 0.95rem 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background: rgba(15, 23, 42, 0.82);\n  color: #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.9rem;\n  cursor: pointer;\n  text-align: left;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease;\n}\n.metric-group-card:hover {\n  transform: translateY(-1px);\n}\n.metric-group-card.verification {\n  border-color: rgba(45, 212, 191, 0.24);\n}\n.metric-group-card.validation {\n  border-color: rgba(192, 132, 252, 0.24);\n}\n.metric-group-card.expanded.verification {\n  background: rgba(18, 49, 53, 0.74);\n  border-color: rgba(94, 234, 212, 0.4);\n}\n.metric-group-card.expanded.validation {\n  background: rgba(51, 32, 78, 0.72);\n  border-color: rgba(216, 180, 254, 0.42);\n}\n.metric-group-card-main {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  min-width: 0;\n}\n.metric-group-title {\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n.metric-group-subtitle {\n  font-size: 0.8rem;\n  color: #94a3b8;\n}\n.metric-group-card-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.metric-group-count {\n  width: 36px;\n  height: 36px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.metric-group-card.verification .metric-group-count {\n  background: rgba(45, 212, 191, 0.15);\n  color: #99f6e4;\n}\n.metric-group-card.validation .metric-group-count {\n  background: rgba(192, 132, 252, 0.15);\n  color: #e9d5ff;\n}\n.metric-group-toggle {\n  width: 28px;\n  height: 28px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.06);\n  color: #e2e8f0;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.metric-group-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n  padding: 0.25rem 0 0;\n}\n.metric-list-item {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  background: rgba(15, 23, 42, 0.72);\n  color: #e2e8f0;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.metric-list-item:hover {\n  border-color: rgba(96, 165, 250, 0.3);\n  background: rgba(30, 41, 59, 0.92);\n}\n.metric-list-item.active {\n  border-color: rgba(96, 165, 250, 0.7);\n  background: rgba(37, 99, 235, 0.18);\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);\n}\n.metric-list-item-name {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-list-item-score {\n  flex-shrink: 0;\n  color: #93c5fd;\n  font-weight: 700;\n}\n.metric-detail-card {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n  padding: 1.25rem 1.35rem;\n}\n.metric-detail-kicker {\n  margin: 0 0 0.4rem 0;\n  font-size: 0.82rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #b6c2d9;\n}\n.metric-detail-card-titleblock {\n  min-width: 0;\n}\n.metric-detail-card-titleblock h3 {\n  margin: 0;\n  font-size: 1.4rem;\n  line-height: 1.35;\n  color: #f8fafc;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n.metric-detail-card-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.metric-detail-back {\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 12px;\n  background: rgba(30, 41, 59, 0.78);\n  color: #e2e8f0;\n  font-size: 1.2rem;\n  line-height: 1;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    background 0.18s ease,\n    border-color 0.18s ease;\n}\n.metric-detail-back:hover {\n  transform: translateX(-2px);\n  background: rgba(51, 65, 85, 0.92);\n  border-color: rgba(96, 165, 250, 0.35);\n}\n.metric-detail-back:focus-visible {\n  outline: 2px solid rgba(96, 165, 250, 0.7);\n  outline-offset: 2px;\n}\n.metric-detail-back:active {\n  transform: translateX(-1px) scale(0.98);\n}\n.metric-detail-card-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n}\n.metric-detail-score,\n.metric-detail-id {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.42rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(42, 56, 92, 0.6);\n  border: 1px solid rgba(163, 184, 255, 0.22);\n  color: #e2e8f0;\n  font-size: 0.88rem;\n  font-weight: 700;\n}\n.metric-detail-sections {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.metric-detail-section {\n  padding: 1.1rem 1.15rem;\n  border-radius: 16px;\n  background: rgba(29, 37, 68, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n.metric-detail-section h4 {\n  margin: 0 0 0.55rem 0;\n  font-size: 0.98rem;\n  color: #f8fafc;\n}\n.metric-detail-section p {\n  margin: 0;\n  font-size: 1rem;\n  line-height: 1.65;\n  color: #e5edf9;\n}\n.metric-evidence-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.metric-evidence-item {\n  padding: 0.9rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.42);\n}\n.metric-evidence-asset {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: #f8fafc;\n  font-weight: 700;\n}\n.metric-evidence-type {\n  display: inline-flex;\n  margin-bottom: 0.55rem;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(59, 130, 246, 0.16);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #bfdbfe;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.metric-evidence-description {\n  margin: 0;\n  color: #cbd5e1;\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.question-panel {\n  padding: 1.2rem 1.2rem 1.1rem;\n  margin-bottom: 1rem;\n}\n.progress-rail {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(66px, 1fr));\n  gap: 0.4rem;\n  margin-bottom: 1.2rem;\n}\n.progress-step {\n  appearance: none;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.45rem;\n  border: none;\n  background: transparent;\n  padding: 0;\n  cursor: pointer;\n}\n.progress-step::before {\n  content: "";\n  position: absolute;\n  top: 12px;\n  left: calc(-50% + 12px);\n  width: calc(100% - 24px);\n  height: 2px;\n  background: rgba(148, 163, 184, 0.2);\n}\n.progress-step:first-child::before {\n  display: none;\n}\n.progress-step:hover .progress-dot {\n  transform: scale(1.08);\n  border-color: rgba(147, 197, 253, 0.8);\n}\n.progress-dot {\n  width: 24px;\n  height: 24px;\n  border-radius: 999px;\n  border: 2px solid rgba(148, 163, 184, 0.38);\n  background: #1e293b;\n  z-index: 1;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease;\n}\n.progress-label {\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.progress-step.active .progress-dot {\n  border-color: rgba(125, 211, 252, 0.9);\n  background: rgba(56, 189, 248, 0.18);\n}\n.progress-step.current .progress-dot {\n  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.08);\n}\n.progress-step.active::before {\n  background: rgba(125, 211, 252, 0.42);\n}\n.question-kicker {\n  margin: 0 0 0.45rem;\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #93c5fd;\n}\n.question-copy h3 {\n  margin: 0 0 0.7rem;\n  font-size: 1.55rem;\n  line-height: 1.35;\n  color: #f8fafc;\n  max-width: 48rem;\n}\n.question-description {\n  margin: 0;\n  font-size: 0.98rem;\n  line-height: 1.65;\n  color: #cbd5e1;\n  max-width: 58rem;\n}\n.rating-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.rating-card {\n  min-width: 0;\n  min-height: 260px;\n  padding: 1rem 1rem 0.95rem;\n  border-radius: 20px;\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(17, 24, 39, 0.96),\n      rgba(10, 17, 30, 0.98));\n  color: #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 1rem;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.rating-card:hover {\n  transform: translateY(-2px);\n}\n.rating-card.selected {\n  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.28), 0 18px 40px rgba(2, 6, 23, 0.26);\n}\n.rating-card.level-0.selected {\n  border-color: rgba(248, 113, 113, 0.7);\n}\n.rating-card.level-1.selected {\n  border-color: rgba(250, 204, 21, 0.7);\n}\n.rating-card.level-2.selected {\n  border-color: rgba(34, 211, 238, 0.8);\n}\n.rating-card.level-3.selected {\n  border-color: rgba(74, 222, 128, 0.8);\n}\n.rating-icon-ring {\n  width: 72px;\n  height: 72px;\n  margin-top: 0.15rem;\n  border-radius: 999px;\n  border: 5px solid rgba(148, 163, 184, 0.25);\n  display: grid;\n  place-items: center;\n}\n.rating-icon-core {\n  width: 34px;\n  height: 34px;\n  border-radius: 999px;\n  background: rgba(148, 163, 184, 0.18);\n}\n.rating-card.level-0 .rating-icon-ring {\n  border-color: rgba(248, 113, 113, 0.55);\n}\n.rating-card.level-1 .rating-icon-ring {\n  border-color: rgba(250, 204, 21, 0.52);\n}\n.rating-card.level-2 .rating-icon-ring {\n  border-color: rgba(34, 211, 238, 0.6);\n}\n.rating-card.level-3 .rating-icon-ring {\n  border-color: rgba(74, 222, 128, 0.58);\n}\n.rating-card.selected.level-0 .rating-icon-core {\n  background: rgba(248, 113, 113, 0.7);\n}\n.rating-card.selected.level-1 .rating-icon-core {\n  background: rgba(250, 204, 21, 0.7);\n}\n.rating-card.selected.level-2 .rating-icon-core {\n  background: rgba(34, 211, 238, 0.78);\n}\n.rating-card.selected.level-3 .rating-icon-core {\n  background: rgba(74, 222, 128, 0.78);\n}\n.rating-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.rating-copy h4 {\n  margin: 0;\n  font-size: 1.08rem;\n  color: #f8fafc;\n}\n.rating-copy p {\n  margin: 0;\n  font-size: 0.92rem;\n  line-height: 1.55;\n  color: #cbd5e1;\n}\n.rating-index {\n  margin-top: auto;\n  width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  background: rgba(15, 23, 42, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  color: #cbd5e1;\n  font-size: 0.92rem;\n  font-weight: 700;\n}\n.workspace-actions {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n.workspace-actions-right {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n.save-hint {\n  font-size: 0.84rem;\n  color: #93c5fd;\n  white-space: nowrap;\n}\n.ghost-action,\n.secondary-action,\n.primary-action {\n  min-height: 46px;\n  padding: 0.85rem 1.15rem;\n  border-radius: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease,\n    opacity 0.18s ease;\n}\n.ghost-action:hover,\n.secondary-action:hover,\n.primary-action:hover {\n  transform: translateY(-1px);\n}\n.ghost-action {\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.55);\n  color: #dbe7f5;\n}\n.secondary-action {\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(15, 23, 42, 0.9);\n  color: #e5edf8;\n}\n.primary-action {\n  border: 1px solid rgba(96, 165, 250, 0.4);\n  background:\n    linear-gradient(\n      180deg,\n      #2563eb 0%,\n      #1d4ed8 100%);\n  color: #eff6ff;\n}\n.ghost-action:hover {\n  border-color: rgba(148, 163, 184, 0.3);\n  background: rgba(30, 41, 59, 0.82);\n}\n.secondary-action:hover {\n  border-color: rgba(96, 165, 250, 0.34);\n  background: rgba(30, 41, 59, 0.96);\n}\n.primary-action:hover {\n  border-color: rgba(147, 197, 253, 0.56);\n  background:\n    linear-gradient(\n      180deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n}\n.ghost-action:disabled,\n.secondary-action:disabled,\n.primary-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n  transform: none;\n}\n.assessment-sidepanel {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 5rem;\n}\n.info-card {\n  padding: 1rem;\n}\n.info-card-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.8rem;\n}\n.info-card h3 {\n  margin: 0;\n  font-size: 0.96rem;\n  color: #f8fafc;\n}\n.info-card p {\n  margin: 0;\n  font-size: 0.9rem;\n  line-height: 1.6;\n  color: #cbd5e1;\n}\n.info-badge {\n  padding: 0.3rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(30, 64, 175, 0.22);\n  border: 1px solid rgba(96, 165, 250, 0.22);\n  color: #bfdbfe;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.mil-scale {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.55rem;\n}\n.mil-node {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.42rem;\n  text-align: center;\n}\n.mil-node-index {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  border: 2px solid rgba(148, 163, 184, 0.28);\n  color: #cbd5e1;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.mil-node.active .mil-node-index {\n  border-color: #67e8f9;\n  background: rgba(34, 211, 238, 0.16);\n  color: #cffafe;\n}\n.mil-node-label {\n  font-size: 0.68rem;\n  line-height: 1.3;\n  color: #94a3b8;\n}\n.optional-label {\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.notes-field {\n  width: 100%;\n  resize: vertical;\n  min-height: 180px;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: 14px;\n  padding: 0.9rem;\n  background: rgba(15, 23, 42, 0.82);\n  color: #e2e8f0;\n  outline: none;\n}\n.notes-field:focus {\n  border-color: rgba(96, 165, 250, 0.5);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n.notes-meta {\n  margin-top: 0.55rem;\n  display: flex;\n  justify-content: flex-end;\n  color: #64748b;\n  font-size: 0.75rem;\n}\n.metric-score {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: #93c5fd;\n}\n.selected-metric-block {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.selected-metric-name {\n  margin: 0;\n  font-size: 0.92rem;\n  color: #f8fafc;\n}\n.selected-metric-type {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #94a3b8;\n  text-transform: capitalize;\n}\n@media (max-width: 1500px) {\n  .assessment-main {\n    grid-template-columns: 1fr;\n  }\n  .assessment-sidepanel {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    align-items: start;\n  }\n  .metrics-card {\n    grid-column: auto;\n  }\n}\n@media (max-width: 1180px) {\n  .assessment-shell {\n    grid-template-columns: 1fr;\n  }\n  .assessment-sidebar {\n    border-right: none;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  }\n  .metric-summary-card {\n    grid-template-columns: 1fr;\n  }\n  .metric-groups {\n    grid-template-columns: 1fr;\n  }\n  .rating-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .workspace-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .workspace-actions-right {\n    justify-content: stretch;\n  }\n  .workspace-actions-right > button,\n  .ghost-action {\n    flex: 1 1 220px;\n  }\n}\n@media (max-width: 760px) {\n  .assessment-main {\n    padding-top: 0;\n  }\n  .assessment-workspace {\n    padding: 1rem;\n    border-radius: 20px;\n  }\n  .workspace-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .workspace-header h2 {\n    font-size: 1.45rem;\n  }\n  .question-copy h3 {\n    font-size: 1.18rem;\n  }\n  .rating-grid,\n  .assessment-sidepanel {\n    grid-template-columns: 1fr;\n  }\n  .mil-scale {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .metric-detail-card-head,\n  .metric-detail-card-meta {\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=maturity-assessment.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaturityAssessmentComponent, { className: "MaturityAssessmentComponent", filePath: "src/app/pages/maturity-assessment/maturity-assessment.component.ts", lineNumber: 47 });
})();
export {
  MaturityAssessmentComponent
};
//# sourceMappingURL=chunk-QKIYSGI2.js.map
