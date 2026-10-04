import {
  AssessmentApiService,
  AssessmentSessionService
} from "./chunk-7S5MO6DI.js";
import {
  CommonModule,
  Component,
  HttpClient,
  HttpParams,
  Injectable,
  NgForOf,
  NgIf,
  Router,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VDFY4THU.js";

// src/app/services/agent-api.service.ts
var AgentApiService = class _AgentApiService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:5000/api/agents";
  getStatus() {
    return this.http.get(`${this.baseUrl}/status`);
  }
  analyzeNote(sessionId, controlId) {
    return this.http.post(`${this.baseUrl}/session/${sessionId}/controls/${controlId}/analyze-note`, {});
  }
  getLogs(sessionId, status) {
    let params = new HttpParams();
    if (sessionId) {
      params = params.set("session_id", sessionId);
    }
    if (status) {
      params = params.set("status", status);
    }
    return this.http.get(`${this.baseUrl}/logs`, { params });
  }
  reviewProposal(logId, decision, reviewedBy) {
    return this.http.post(`${this.baseUrl}/logs/${logId}/review`, { decision, reviewed_by: reviewedBy ?? "auditor" });
  }
  static \u0275fac = function AgentApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgentApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AgentApiService, factory: _AgentApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgentApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/assessment-summary-review/assessment-summary-review.component.ts
function AssessmentSummaryReviewComponent_section_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "p");
    \u0275\u0275text(2, "Lade Zusammenfassung ...");
    \u0275\u0275elementEnd()();
  }
}
function AssessmentSummaryReviewComponent_section_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Aktualisiert: ", ctx_r0.formatDate(ctx_r0.summary.updated_at), " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_span_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Agent-Provider: ", ctx_r0.agentProvider, " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const control_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.toggleNote(control_r3.control_id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isNoteExpanded(control_r3.control_id) ? "Notiz ausblenden" : "Notiz anzeigen", " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const control_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.analyzeNote(control_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    const control_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r0.getAgentState(control_r3.control_id).isAnalyzing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getAgentState(control_r3.control_id).isAnalyzing ? "Analysiere ..." : ((tmp_10_0 = ctx_r0.agentStateFor(control_r3.control_id)) == null ? null : tmp_10_0.proposal) ? "Notiz erneut analysieren" : "Notiz mit Agent analysieren", " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "p", 46);
    \u0275\u0275text(2, "Audit-Notiz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const control_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(control_r3.note);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agentState_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", agentState_r5.error, " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const agentState_r5 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 Review durch: ", agentState_r5.reviewedBy, " ");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1);
    \u0275\u0275template(2, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_8_ng_container_2_Template, 2, 1, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agentState_r5 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Provider: ", agentState_r5.provider, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", agentState_r5.reviewedBy);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "button", 60);
    \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const control_r3 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.reviewProposal(control_r3.control_id, "accepted"));
    });
    \u0275\u0275text(2, " Freigeben ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 61);
    \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_9_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const control_r3 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.reviewProposal(control_r3.control_id, "rejected"));
    });
    \u0275\u0275text(4, " Ablehnen ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const agentState_r5 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("disabled", agentState_r5.isReviewing);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", agentState_r5.isReviewing);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52)(2, "span", 53);
    \u0275\u0275text(3, "Agent-Analyse (Vorschlag)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "pre", 55);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_8_Template, 3, 2, "div", 56)(9, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_div_9_Template, 5, 2, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agentState_r5 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("review-proposed", agentState_r5.reviewStatus === "proposed")("review-accepted", agentState_r5.reviewStatus === "accepted")("review-rejected", agentState_r5.reviewStatus === "rejected");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.reviewStatusLabel(agentState_r5.reviewStatus), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(agentState_r5.proposal);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", agentState_r5.provider);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", agentState_r5.reviewStatus === "proposed");
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_1_Template, 2, 1, "div", 48)(2, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_div_2_Template, 10, 10, "div", 49);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const agentState_r5 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", agentState_r5.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", agentState_r5.proposal);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 38);
    \u0275\u0275template(5, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_5_Template, 2, 1, "button", 39)(6, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_button_6_Template, 2, 2, "button", 40);
    \u0275\u0275elementStart(7, "span", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_div_9_Template, 5, 1, "div", 42)(10, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_ng_container_10_Template, 3, 2, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(control_r3.control_id);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", control_r3.has_note);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r3.has_note);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", control_r3.mil_label || ctx_r0.formatMil(control_r3.mil_level), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r3.has_note && ctx_r0.isNoteExpanded(control_r3.control_id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.agentStateFor(control_r3.control_id));
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275template(1, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_div_1_Template, 11, 6, "div", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const domain_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", domain_r7.controls)("ngForTrackBy", ctx_r0.trackByControl);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 26)(1, "div", 27)(2, "div")(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 29)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 30);
    \u0275\u0275element(15, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_div_16_Template, 2, 2, "div", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const domain_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(domain_r7.domain);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", domain_r7.rated_controls, " bewertete Controls");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatAverage(domain_r7.avg_mil_level), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatPercentage(domain_r7.percentage));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", domain_r7.achieved_points, " / ", domain_r7.max_points, " Punkte");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", domain_r7.percentage !== null ? domain_r7.percentage + "%" : "0%");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", domain_r7.controls.length);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, AssessmentSummaryReviewComponent_ng_container_16_div_54_article_1_Template, 17, 9, "article", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.domains)("ngForTrackBy", ctx_r0.trackByDomain);
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_ng_template_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Keine Dom\xE4nendaten vorhanden.");
    \u0275\u0275elementEnd();
  }
}
function AssessmentSummaryReviewComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "section", 13)(2, "article", 14)(3, "p", 15);
    \u0275\u0275text(4, "Session");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16)(8, "span", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AssessmentSummaryReviewComponent_ng_container_16_span_10_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "article", 18)(12, "p", 15);
    \u0275\u0275text(13, "Durchschnitt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "h2");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "Durchschnittlicher Reifegrad \xFCber alle bewerteten Controls.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "article", 18)(19, "p", 15);
    \u0275\u0275text(20, "Reifegrad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "h2");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Relativer Anteil der erreichten Punkte bezogen auf das Maximum.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "article", 18)(26, "p", 15);
    \u0275\u0275text(27, "Bewertet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "h2");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31, "Controls mit gespeicherter Bewertung in dieser Session.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "article", 18)(33, "p", 15);
    \u0275\u0275text(34, "Nicht bewertet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "h2");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p");
    \u0275\u0275text(38, "Controls ohne finale Bewertung in dieser Session.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "article", 18)(40, "p", 15);
    \u0275\u0275text(41, "Punktestand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "h2");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "p");
    \u0275\u0275text(45, "Erreichte Punkte im Verh\xE4ltnis zur maximalen Punktzahl.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "section", 19)(47, "div", 20)(48, "div")(49, "p", 15);
    \u0275\u0275text(50, "Dom\xE4nen\xFCbersicht");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "h2");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, AssessmentSummaryReviewComponent_ng_container_16_span_53_Template, 2, 1, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(54, AssessmentSummaryReviewComponent_ng_container_16_div_54_Template, 2, 2, "div", 22)(55, AssessmentSummaryReviewComponent_ng_container_16_ng_template_55_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const noDomains_r8 = \u0275\u0275reference(56);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.summary.session_id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.sessionStatusLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.summary.updated_at);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.averageMilLevel);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.overallPercentage);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.totalRatedControls);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.totalUnratedControls);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.achievedPointsDisplay);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r0.totalDomains, " Dom\xE4nen ausgewertet");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.agentProvider);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.domains.length)("ngIfElse", noDomains_r8);
  }
}
var AssessmentSummaryReviewComponent = class _AssessmentSummaryReviewComponent {
  router = inject(Router);
  assessmentSessionService = inject(AssessmentSessionService);
  assessmentApiService = inject(AssessmentApiService);
  agentApiService = inject(AgentApiService);
  isLoading = false;
  errorMessage = null;
  summary = null;
  agentProvider = null;
  agentStates = {};
  expandedNotes = {};
  ngOnInit() {
    this.loadSummary();
    this.loadAgentStatus();
  }
  loadSummary() {
    const sessionId = this.assessmentSessionService.getSessionId();
    if (!sessionId) {
      this.errorMessage = "Keine aktive Session gefunden.";
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.assessmentApiService.getSessionSummary(sessionId).subscribe({
      next: (response) => {
        if (response.status !== "success" || !response.data) {
          this.summary = null;
          this.errorMessage = response.message || "Die Summary konnte nicht geladen werden.";
          this.isLoading = false;
          return;
        }
        this.summary = response.data;
        this.isLoading = false;
        this.loadExistingAnalyses(sessionId);
      },
      error: () => {
        this.summary = null;
        this.errorMessage = "Fehler beim Laden der Summary.";
        this.isLoading = false;
      }
    });
  }
  loadAgentStatus() {
    this.agentApiService.getStatus().subscribe({
      next: (response) => {
        this.agentProvider = response.data?.provider ?? null;
      },
      error: () => {
        this.agentProvider = null;
      }
    });
  }
  /** Lädt bereits vorhandene Notiz-Analysen (Agent-Logs) der Session. */
  loadExistingAnalyses(sessionId) {
    this.agentApiService.getLogs(sessionId).subscribe({
      next: (response) => {
        const logs = response.data ?? [];
        for (const log of logs) {
          if (log.agent_name !== "note_analyzer" || !log.control_id) {
            continue;
          }
          if (log.status === "error") {
            continue;
          }
          if (this.agentStates[log.control_id]) {
            continue;
          }
          this.agentStates[log.control_id] = {
            isAnalyzing: false,
            isReviewing: false,
            error: null,
            logId: log.log_id,
            proposal: log.output_text,
            reviewStatus: log.status,
            provider: log.provider,
            reviewedBy: log.reviewed_by
          };
        }
      },
      error: () => {
      }
    });
  }
  analyzeNote(control) {
    const sessionId = this.summary?.session_id;
    if (!sessionId || !control.has_note) {
      return;
    }
    const state = this.getAgentState(control.control_id);
    state.isAnalyzing = true;
    state.error = null;
    this.agentApiService.analyzeNote(sessionId, control.control_id).subscribe({
      next: (response) => {
        state.isAnalyzing = false;
        if (response.status !== "success" || !response.data) {
          state.error = response.message || "Die Notiz-Analyse ist fehlgeschlagen.";
          return;
        }
        state.logId = response.data.log_id;
        state.proposal = response.data.proposal;
        state.reviewStatus = "proposed";
        state.provider = response.data.provider;
        state.reviewedBy = null;
      },
      error: (err) => {
        state.isAnalyzing = false;
        state.error = err?.error?.message || "Fehler beim Aufruf des Agenten.";
      }
    });
  }
  reviewProposal(controlId, decision) {
    const state = this.agentStates[controlId];
    if (!state?.logId || state.reviewStatus !== "proposed") {
      return;
    }
    state.isReviewing = true;
    state.error = null;
    this.agentApiService.reviewProposal(state.logId, decision).subscribe({
      next: (response) => {
        state.isReviewing = false;
        if (response.status !== "success" || !response.data) {
          state.error = response.message || "Review fehlgeschlagen.";
          return;
        }
        state.reviewStatus = response.data.status;
        state.reviewedBy = response.data.reviewed_by;
      },
      error: (err) => {
        state.isReviewing = false;
        state.error = err?.error?.message || "Fehler beim Review des Vorschlags.";
      }
    });
  }
  toggleNote(controlId) {
    this.expandedNotes[controlId] = !this.expandedNotes[controlId];
  }
  isNoteExpanded(controlId) {
    return !!this.expandedNotes[controlId];
  }
  getAgentState(controlId) {
    if (!this.agentStates[controlId]) {
      this.agentStates[controlId] = {
        isAnalyzing: false,
        isReviewing: false,
        error: null,
        logId: null,
        proposal: null,
        reviewStatus: null,
        provider: null,
        reviewedBy: null
      };
    }
    return this.agentStates[controlId];
  }
  agentStateFor(controlId) {
    return this.agentStates[controlId] ?? null;
  }
  reviewStatusLabel(status) {
    switch (status) {
      case "proposed":
        return "Wartet auf Freigabe";
      case "accepted":
        return "Freigegeben";
      case "rejected":
        return "Abgelehnt";
      default:
        return "";
    }
  }
  goToMetricView() {
    this.router.navigate(["/"]);
  }
  startNewAssessment() {
    this.assessmentSessionService.clearSession();
    this.router.navigate(["/"]);
  }
  formatMil(value) {
    if (value === null || value === void 0 || Number.isNaN(value)) {
      return "n/a";
    }
    return value.toFixed(2);
  }
  formatPercentage(value) {
    if (value === null || value === void 0 || Number.isNaN(value)) {
      return "n/a";
    }
    return `${value.toFixed(1)}%`;
  }
  formatDate(value) {
    if (!value) {
      return "\u2013";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "short",
      timeStyle: "medium"
    }).format(date);
  }
  trackByDomain(_, item) {
    return item.domain;
  }
  trackByControl(_, item) {
    return item.control_id;
  }
  get overall() {
    return this.summary?.overall ?? null;
  }
  get domains() {
    return this.summary?.domains ?? [];
  }
  get hasDomains() {
    return this.domains.length > 0;
  }
  get sessionStatusLabel() {
    if (!this.summary) {
      return "\u2013";
    }
    return this.summary.status === "completed" ? "Abgeschlossen" : "Aktiv";
  }
  get averageMilLevel() {
    return this.formatAverage(this.summary?.overall?.avg_mil_level ?? null);
  }
  get totalRatedControls() {
    return this.summary?.overall?.rated_controls ?? 0;
  }
  get totalUnratedControls() {
    return this.summary?.overall?.unrated_controls ?? 0;
  }
  get overallPercentage() {
    return this.formatPercentage(this.summary?.overall?.percentage ?? null);
  }
  get achievedPointsDisplay() {
    const achieved = this.summary?.overall?.achieved_points;
    const max = this.summary?.overall?.max_points;
    if (achieved === null || achieved === void 0 || max === null || max === void 0) {
      return "n/a";
    }
    return `${achieved} / ${max}`;
  }
  get totalDomains() {
    return this.domains.length;
  }
  formatAverage(value) {
    if (value === null || value === void 0 || Number.isNaN(value)) {
      return "n/a";
    }
    return value.toFixed(2);
  }
  static \u0275fac = function AssessmentSummaryReviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssessmentSummaryReviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssessmentSummaryReviewComponent, selectors: [["app-assessment-summary-review"]], decls: 17, vars: 3, consts: [["noDomains", ""], [1, "summary-shell"], [1, "summary-header"], [1, "summary-kicker"], [1, "summary-subtitle"], [1, "summary-header-actions"], ["type", "button", 1, "secondary-action", 3, "click"], ["type", "button", 1, "primary-action", 3, "click"], ["class", "summary-state-card", 4, "ngIf"], ["class", "summary-state-card error", 4, "ngIf"], [4, "ngIf"], [1, "summary-state-card"], [1, "summary-state-card", "error"], [1, "summary-grid", "hero-grid"], [1, "summary-card", "session-card"], [1, "card-kicker"], [1, "session-meta"], [1, "status-badge"], [1, "summary-card", "stat-card"], [1, "summary-card", "section-card"], [1, "section-head"], ["class", "agent-provider-badge", 4, "ngIf"], ["class", "domain-list", 4, "ngIf", "ngIfElse"], [1, "agent-provider-badge"], [1, "domain-list"], ["class", "domain-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "domain-card"], [1, "domain-card-head"], [1, "domain-badge"], [1, "domain-stats"], [1, "domain-progress"], [1, "domain-progress-bar"], ["class", "domain-controls", 4, "ngIf"], [1, "domain-controls"], ["class", "domain-control-block", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "domain-control-block"], [1, "domain-control-row"], [1, "control-id"], [1, "control-actions"], ["type", "button", "class", "note-toggle", 3, "click", 4, "ngIf"], ["type", "button", "class", "agent-action", 3, "disabled", "click", 4, "ngIf"], [1, "control-mil"], ["class", "control-note", 4, "ngIf"], ["type", "button", 1, "note-toggle", 3, "click"], ["type", "button", 1, "agent-action", 3, "click", "disabled"], [1, "control-note"], [1, "note-label"], [1, "note-text"], ["class", "agent-error", 4, "ngIf"], ["class", "agent-proposal", 4, "ngIf"], [1, "agent-error"], [1, "agent-proposal"], [1, "agent-proposal-head"], [1, "agent-badge"], [1, "review-badge"], [1, "agent-proposal-text"], ["class", "agent-proposal-meta", 4, "ngIf"], ["class", "agent-review-actions", 4, "ngIf"], [1, "agent-proposal-meta"], [1, "agent-review-actions"], ["type", "button", 1, "review-accept", 3, "click", "disabled"], ["type", "button", 1, "review-reject", 3, "click", "disabled"]], template: function AssessmentSummaryReviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "p", 3);
      \u0275\u0275text(4, "Assessment Summary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6, "Review der Ergebnisse");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, " Die Maturity-Bewertung wurde abgeschlossen und serverseitig zusammengefasst. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5)(10, "button", 6);
      \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_Template_button_click_10_listener() {
        return ctx.goToMetricView();
      });
      \u0275\u0275text(11, " Zur Metric View ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function AssessmentSummaryReviewComponent_Template_button_click_12_listener() {
        return ctx.startNewAssessment();
      });
      \u0275\u0275text(13, " Neues Assessment starten ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(14, AssessmentSummaryReviewComponent_section_14_Template, 3, 0, "section", 8)(15, AssessmentSummaryReviewComponent_section_15_Template, 3, 1, "section", 9)(16, AssessmentSummaryReviewComponent_ng_container_16_Template, 57, 12, "ng-container", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.summary);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top left,\n      rgba(92, 102, 255, 0.12),\n      transparent 28%),\n    radial-gradient(\n      circle at top right,\n      rgba(0, 212, 170, 0.08),\n      transparent 24%),\n    #090b16;\n  color: #f3f5ff;\n}\n.summary-shell[_ngcontent-%COMP%] {\n  max-width: 1360px;\n  margin: 0 auto;\n  padding: 40px 24px 56px;\n}\n.summary-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.summary-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 0.8rem;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #8fa7ff;\n}\n.summary-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 3vw, 3rem);\n  line-height: 1.05;\n}\n.summary-subtitle[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  max-width: 720px;\n  color: #aab3d3;\n  line-height: 1.6;\n}\n.summary-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.primary-action[_ngcontent-%COMP%], \n.secondary-action[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid transparent;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 180ms ease;\n}\n.primary-action[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7d8cff,\n      #5f6fff);\n  color: white;\n  box-shadow: 0 14px 30px rgba(95, 111, 255, 0.28);\n}\n.primary-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 18px 36px rgba(95, 111, 255, 0.34);\n}\n.secondary-action[_ngcontent-%COMP%] {\n  background: rgba(17, 23, 44, 0.88);\n  border-color: rgba(143, 167, 255, 0.24);\n  color: #dbe2ff;\n}\n.secondary-action[_ngcontent-%COMP%]:hover {\n  background: rgba(26, 33, 60, 0.96);\n}\n.summary-state-card[_ngcontent-%COMP%], \n.summary-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(126, 142, 255, 0.16);\n  background: rgba(13, 17, 32, 0.86);\n  -webkit-backdrop-filter: blur(18px);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);\n}\n.summary-state-card[_ngcontent-%COMP%] {\n  padding: 20px 22px;\n  border-radius: 18px;\n}\n.summary-state-card.error[_ngcontent-%COMP%] {\n  border-color: rgba(255, 126, 158, 0.24);\n  color: #ffb6c8;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  margin-bottom: 24px;\n}\n.hero-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n.summary-card[_ngcontent-%COMP%] {\n  border-radius: 24px;\n  padding: 24px;\n}\n.session-card[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.stat-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.session-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 8px 0 10px;\n  font-size: clamp(1.8rem, 2.4vw, 2.6rem);\n  line-height: 1.05;\n}\n.card-kicker[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.78rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #91a4ff;\n}\n.stat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child, \n.session-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n  color: #aeb8dc;\n}\n.session-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n  color: #aeb8dc;\n}\n.status-badge[_ngcontent-%COMP%], \n.domain-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 12px;\n  border-radius: 999px;\n  background: rgba(110, 125, 255, 0.16);\n  border: 1px solid rgba(143, 167, 255, 0.26);\n  color: #e7ebff;\n  font-weight: 600;\n}\n.section-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.section-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 1.35rem;\n}\n.section-meta[_ngcontent-%COMP%] {\n  color: #aeb8dc;\n}\n.domain-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.domain-card[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  padding: 18px;\n  background: rgba(19, 25, 46, 0.88);\n  border: 1px solid rgba(126, 142, 255, 0.12);\n}\n.domain-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.domain-card-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 1.1rem;\n}\n.domain-card-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #aeb8dc;\n}\n.domain-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n.domain-control-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(9, 12, 24, 0.72);\n  border: 1px solid rgba(126, 142, 255, 0.08);\n}\n.control-id[_ngcontent-%COMP%] {\n  color: #f3f5ff;\n}\n.control-mil[_ngcontent-%COMP%] {\n  color: #9fb3ff;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.domain-control-block[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n.control-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.note-toggle[_ngcontent-%COMP%], \n.agent-action[_ngcontent-%COMP%] {\n  min-height: 32px;\n  padding: 0 12px;\n  border-radius: 10px;\n  font: inherit;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 160ms ease;\n}\n.note-toggle[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(143, 167, 255, 0.24);\n  color: #aab8ff;\n}\n.note-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(26, 33, 60, 0.7);\n}\n.agent-action[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 170, 0.12);\n  border: 1px solid rgba(0, 212, 170, 0.32);\n  color: #6ff0d4;\n}\n.agent-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(0, 212, 170, 0.2);\n}\n.agent-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.control-note[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: rgba(9, 12, 24, 0.72);\n  border: 1px dashed rgba(143, 167, 255, 0.2);\n}\n.note-label[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 0.72rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #91a4ff;\n}\n.note-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #cdd6f5;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.agent-error[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 126, 158, 0.28);\n  background: rgba(255, 126, 158, 0.08);\n  color: #ffb6c8;\n  font-size: 0.88rem;\n}\n.agent-proposal[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: rgba(0, 212, 170, 0.05);\n  border: 1px solid rgba(0, 212, 170, 0.2);\n}\n.agent-proposal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.agent-badge[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #6ff0d4;\n  font-weight: 700;\n}\n.review-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 26px;\n  padding: 0 10px;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  border: 1px solid transparent;\n}\n.review-proposed[_ngcontent-%COMP%] {\n  background: rgba(255, 199, 92, 0.12);\n  border-color: rgba(255, 199, 92, 0.34);\n  color: #ffd88f;\n}\n.review-accepted[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 170, 0.14);\n  border-color: rgba(0, 212, 170, 0.36);\n  color: #6ff0d4;\n}\n.review-rejected[_ngcontent-%COMP%] {\n  background: rgba(255, 126, 158, 0.12);\n  border-color: rgba(255, 126, 158, 0.32);\n  color: #ffb6c8;\n}\n.agent-proposal-text[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  padding: 0;\n  background: transparent;\n  border: none;\n  font: inherit;\n  color: #dfe6ff;\n  line-height: 1.6;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.agent-proposal-meta[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  font-size: 0.78rem;\n  color: #8fa0c8;\n}\n.agent-review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.review-accept[_ngcontent-%COMP%], \n.review-reject[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 0 16px;\n  border-radius: 12px;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 160ms ease;\n}\n.review-accept[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #16c79a,\n      #0fa884);\n  border: none;\n  color: #04140f;\n}\n.review-accept[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.review-reject[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(255, 126, 158, 0.36);\n  color: #ffb6c8;\n}\n.review-reject[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 126, 158, 0.1);\n}\n.review-accept[_ngcontent-%COMP%]:disabled, \n.review-reject[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.agent-provider-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 32px;\n  padding: 0 12px;\n  border-radius: 999px;\n  background: rgba(0, 212, 170, 0.1);\n  border: 1px solid rgba(0, 212, 170, 0.28);\n  color: #6ff0d4;\n  font-size: 0.82rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.submitted-table[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n.submitted-table-head[_ngcontent-%COMP%], \n.submitted-table-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2.2fr 1.2fr 0.8fr 0.8fr;\n  gap: 14px;\n  align-items: center;\n}\n.submitted-table-head[_ngcontent-%COMP%] {\n  padding: 0 4px 8px;\n  color: #91a4ff;\n  font-size: 0.8rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.submitted-table-row[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 16px;\n  background: rgba(19, 25, 46, 0.88);\n  border: 1px solid rgba(126, 142, 255, 0.12);\n  color: #e9edff;\n}\n@media (max-width: 1100px) {\n  .hero-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .session-card[_ngcontent-%COMP%] {\n    grid-column: span 2;\n  }\n  .domain-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 760px) {\n  .summary-shell[_ngcontent-%COMP%] {\n    padding: 24px 16px 40px;\n  }\n  .summary-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .summary-header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .primary-action[_ngcontent-%COMP%], \n   .secondary-action[_ngcontent-%COMP%] {\n    flex: 1 1 100%;\n  }\n  .hero-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .session-card[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n  .submitted-table-head[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .submitted-table-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .domain-control-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=assessment-summary-review.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssessmentSummaryReviewComponent, [{
    type: Component,
    args: [{ selector: "app-assessment-summary-review", standalone: true, imports: [CommonModule], template: `<div class="summary-shell">
  <header class="summary-header">
    <div>
      <p class="summary-kicker">Assessment Summary</p>
      <h1>Review der Ergebnisse</h1>
      <p class="summary-subtitle">
        Die Maturity-Bewertung wurde abgeschlossen und serverseitig zusammengefasst.
      </p>
    </div>

    <div class="summary-header-actions">
      <button
        type="button"
        class="secondary-action"
        (click)="goToMetricView()"
      >
        Zur Metric View
      </button>

      <button
        type="button"
        class="primary-action"
        (click)="startNewAssessment()"
      >
        Neues Assessment starten
      </button>
    </div>
  </header>

  <section class="summary-state-card" *ngIf="isLoading">
    <p>Lade Zusammenfassung ...</p>
  </section>

  <section class="summary-state-card error" *ngIf="!isLoading && errorMessage">
    <p>{{ errorMessage }}</p>
  </section>

  <ng-container *ngIf="!isLoading && !errorMessage && summary">
    <section class="summary-grid hero-grid">
      <article class="summary-card session-card">
        <p class="card-kicker">Session</p>
        <h2>{{ summary.session_id }}</h2>
        <div class="session-meta">
          <span class="status-badge">{{ sessionStatusLabel }}</span>
          <span *ngIf="summary.updated_at">
            Aktualisiert: {{ formatDate(summary.updated_at) }}
          </span>
        </div>
      </article>

      <article class="summary-card stat-card">
        <p class="card-kicker">Durchschnitt</p>
        <h2>{{ averageMilLevel }}</h2>
        <p>Durchschnittlicher Reifegrad \xFCber alle bewerteten Controls.</p>
      </article>

      <article class="summary-card stat-card">
        <p class="card-kicker">Reifegrad</p>
        <h2>{{ overallPercentage }}</h2>
        <p>Relativer Anteil der erreichten Punkte bezogen auf das Maximum.</p>
      </article>

      <article class="summary-card stat-card">
        <p class="card-kicker">Bewertet</p>
        <h2>{{ totalRatedControls }}</h2>
        <p>Controls mit gespeicherter Bewertung in dieser Session.</p>
      </article>

      <article class="summary-card stat-card">
        <p class="card-kicker">Nicht bewertet</p>
        <h2>{{ totalUnratedControls }}</h2>
        <p>Controls ohne finale Bewertung in dieser Session.</p>
      </article>

      <article class="summary-card stat-card">
        <p class="card-kicker">Punktestand</p>
        <h2>{{ achievedPointsDisplay }}</h2>
        <p>Erreichte Punkte im Verh\xE4ltnis zur maximalen Punktzahl.</p>
      </article>
    </section>

    <section class="summary-card section-card">
      <div class="section-head">
        <div>
          <p class="card-kicker">Dom\xE4nen\xFCbersicht</p>
          <h2>{{ totalDomains }} Dom\xE4nen ausgewertet</h2>
        </div>

        <span class="agent-provider-badge" *ngIf="agentProvider">
          Agent-Provider: {{ agentProvider }}
        </span>
      </div>

      <div class="domain-list" *ngIf="domains.length; else noDomains">
        <article class="domain-card" *ngFor="let domain of domains; trackBy: trackByDomain">
          <div class="domain-card-head">
            <div>
              <h3>{{ domain.domain }}</h3>
              <p>{{ domain.rated_controls }} bewertete Controls</p>
            </div>

            <span class="domain-badge">
              {{ formatAverage(domain.avg_mil_level) }}
            </span>
          </div>

          <div class="domain-stats">
            <span>{{ formatPercentage(domain.percentage) }}</span>
            <span>{{ domain.achieved_points }} / {{ domain.max_points }} Punkte</span>
          </div>

          <div class="domain-progress">
            <div
              class="domain-progress-bar"
              [style.width]="domain.percentage !== null ? domain.percentage + '%' : '0%'"
            ></div>
          </div>

          <div class="domain-controls" *ngIf="domain.controls.length">
            <div
              class="domain-control-block"
              *ngFor="let control of domain.controls; trackBy: trackByControl"
            >
              <div class="domain-control-row">
                <span class="control-id">{{ control.control_id }}</span>

                <div class="control-actions">
                  <button
                    type="button"
                    class="note-toggle"
                    *ngIf="control.has_note"
                    (click)="toggleNote(control.control_id)"
                  >
                    {{ isNoteExpanded(control.control_id) ? 'Notiz ausblenden' : 'Notiz anzeigen' }}
                  </button>

                  <button
                    type="button"
                    class="agent-action"
                    *ngIf="control.has_note"
                    [disabled]="getAgentState(control.control_id).isAnalyzing"
                    (click)="analyzeNote(control)"
                  >
                    {{
                      getAgentState(control.control_id).isAnalyzing
                        ? 'Analysiere ...'
                        : (agentStateFor(control.control_id)?.proposal
                            ? 'Notiz erneut analysieren'
                            : 'Notiz mit Agent analysieren')
                    }}
                  </button>

                  <span class="control-mil">
                    {{ control.mil_label || formatMil(control.mil_level) }}
                  </span>
                </div>
              </div>

              <div
                class="control-note"
                *ngIf="control.has_note && isNoteExpanded(control.control_id)"
              >
                <p class="note-label">Audit-Notiz</p>
                <p class="note-text">{{ control.note }}</p>
              </div>

              <ng-container *ngIf="agentStateFor(control.control_id) as agentState">
                <div class="agent-error" *ngIf="agentState.error">
                  {{ agentState.error }}
                </div>

                <div class="agent-proposal" *ngIf="agentState.proposal">
                  <div class="agent-proposal-head">
                    <span class="agent-badge">Agent-Analyse (Vorschlag)</span>
                    <span
                      class="review-badge"
                      [class.review-proposed]="agentState.reviewStatus === 'proposed'"
                      [class.review-accepted]="agentState.reviewStatus === 'accepted'"
                      [class.review-rejected]="agentState.reviewStatus === 'rejected'"
                    >
                      {{ reviewStatusLabel(agentState.reviewStatus) }}
                    </span>
                  </div>

                  <pre class="agent-proposal-text">{{ agentState.proposal }}</pre>

                  <div class="agent-proposal-meta" *ngIf="agentState.provider">
                    Provider: {{ agentState.provider }}
                    <ng-container *ngIf="agentState.reviewedBy">
                      \xB7 Review durch: {{ agentState.reviewedBy }}
                    </ng-container>
                  </div>

                  <div
                    class="agent-review-actions"
                    *ngIf="agentState.reviewStatus === 'proposed'"
                  >
                    <button
                      type="button"
                      class="review-accept"
                      [disabled]="agentState.isReviewing"
                      (click)="reviewProposal(control.control_id, 'accepted')"
                    >
                      Freigeben
                    </button>
                    <button
                      type="button"
                      class="review-reject"
                      [disabled]="agentState.isReviewing"
                      (click)="reviewProposal(control.control_id, 'rejected')"
                    >
                      Ablehnen
                    </button>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </article>
      </div>

      <ng-template #noDomains>
        <p>Keine Dom\xE4nendaten vorhanden.</p>
      </ng-template>
    </section>
  </ng-container>
</div>
`, styles: ["/* src/app/pages/assessment-summary-review/assessment-summary-review.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top left,\n      rgba(92, 102, 255, 0.12),\n      transparent 28%),\n    radial-gradient(\n      circle at top right,\n      rgba(0, 212, 170, 0.08),\n      transparent 24%),\n    #090b16;\n  color: #f3f5ff;\n}\n.summary-shell {\n  max-width: 1360px;\n  margin: 0 auto;\n  padding: 40px 24px 56px;\n}\n.summary-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.summary-kicker {\n  margin: 0 0 8px;\n  font-size: 0.8rem;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #8fa7ff;\n}\n.summary-header h1 {\n  margin: 0;\n  font-size: clamp(2rem, 3vw, 3rem);\n  line-height: 1.05;\n}\n.summary-subtitle {\n  margin: 12px 0 0;\n  max-width: 720px;\n  color: #aab3d3;\n  line-height: 1.6;\n}\n.summary-header-actions {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.primary-action,\n.secondary-action {\n  min-height: 44px;\n  padding: 0 18px;\n  border-radius: 14px;\n  border: 1px solid transparent;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 180ms ease;\n}\n.primary-action {\n  background:\n    linear-gradient(\n      135deg,\n      #7d8cff,\n      #5f6fff);\n  color: white;\n  box-shadow: 0 14px 30px rgba(95, 111, 255, 0.28);\n}\n.primary-action:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 18px 36px rgba(95, 111, 255, 0.34);\n}\n.secondary-action {\n  background: rgba(17, 23, 44, 0.88);\n  border-color: rgba(143, 167, 255, 0.24);\n  color: #dbe2ff;\n}\n.secondary-action:hover {\n  background: rgba(26, 33, 60, 0.96);\n}\n.summary-state-card,\n.summary-card {\n  border: 1px solid rgba(126, 142, 255, 0.16);\n  background: rgba(13, 17, 32, 0.86);\n  -webkit-backdrop-filter: blur(18px);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);\n}\n.summary-state-card {\n  padding: 20px 22px;\n  border-radius: 18px;\n}\n.summary-state-card.error {\n  border-color: rgba(255, 126, 158, 0.24);\n  color: #ffb6c8;\n}\n.summary-grid {\n  display: grid;\n  gap: 18px;\n  margin-bottom: 24px;\n}\n.hero-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n.summary-card {\n  border-radius: 24px;\n  padding: 24px;\n}\n.session-card {\n  grid-column: span 2;\n}\n.stat-card h2,\n.session-card h2 {\n  margin: 8px 0 10px;\n  font-size: clamp(1.8rem, 2.4vw, 2.6rem);\n  line-height: 1.05;\n}\n.card-kicker {\n  margin: 0;\n  font-size: 0.78rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #91a4ff;\n}\n.stat-card p:last-child,\n.session-card p:last-child {\n  margin-bottom: 0;\n  color: #aeb8dc;\n}\n.session-meta {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n  color: #aeb8dc;\n}\n.status-badge,\n.domain-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 34px;\n  padding: 0 12px;\n  border-radius: 999px;\n  background: rgba(110, 125, 255, 0.16);\n  border: 1px solid rgba(143, 167, 255, 0.26);\n  color: #e7ebff;\n  font-weight: 600;\n}\n.section-card {\n  margin-bottom: 24px;\n}\n.section-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.section-head h2 {\n  margin: 8px 0 0;\n  font-size: 1.35rem;\n}\n.section-meta {\n  color: #aeb8dc;\n}\n.domain-list {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.domain-card {\n  border-radius: 18px;\n  padding: 18px;\n  background: rgba(19, 25, 46, 0.88);\n  border: 1px solid rgba(126, 142, 255, 0.12);\n}\n.domain-card-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.domain-card-head h3 {\n  margin: 0 0 6px;\n  font-size: 1.1rem;\n}\n.domain-card-head p {\n  margin: 0;\n  color: #aeb8dc;\n}\n.domain-controls {\n  display: grid;\n  gap: 10px;\n}\n.domain-control-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(9, 12, 24, 0.72);\n  border: 1px solid rgba(126, 142, 255, 0.08);\n}\n.control-id {\n  color: #f3f5ff;\n}\n.control-mil {\n  color: #9fb3ff;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.domain-control-block {\n  display: grid;\n  gap: 8px;\n}\n.control-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.note-toggle,\n.agent-action {\n  min-height: 32px;\n  padding: 0 12px;\n  border-radius: 10px;\n  font: inherit;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 160ms ease;\n}\n.note-toggle {\n  background: transparent;\n  border: 1px solid rgba(143, 167, 255, 0.24);\n  color: #aab8ff;\n}\n.note-toggle:hover {\n  background: rgba(26, 33, 60, 0.7);\n}\n.agent-action {\n  background: rgba(0, 212, 170, 0.12);\n  border: 1px solid rgba(0, 212, 170, 0.32);\n  color: #6ff0d4;\n}\n.agent-action:hover:not(:disabled) {\n  background: rgba(0, 212, 170, 0.2);\n}\n.agent-action:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.control-note {\n  margin: 0 0 4px;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: rgba(9, 12, 24, 0.72);\n  border: 1px dashed rgba(143, 167, 255, 0.2);\n}\n.note-label {\n  margin: 0 0 6px;\n  font-size: 0.72rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #91a4ff;\n}\n.note-text {\n  margin: 0;\n  color: #cdd6f5;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.agent-error {\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 126, 158, 0.28);\n  background: rgba(255, 126, 158, 0.08);\n  color: #ffb6c8;\n  font-size: 0.88rem;\n}\n.agent-proposal {\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: rgba(0, 212, 170, 0.05);\n  border: 1px solid rgba(0, 212, 170, 0.2);\n}\n.agent-proposal-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.agent-badge {\n  font-size: 0.74rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #6ff0d4;\n  font-weight: 700;\n}\n.review-badge {\n  display: inline-flex;\n  align-items: center;\n  min-height: 26px;\n  padding: 0 10px;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  border: 1px solid transparent;\n}\n.review-proposed {\n  background: rgba(255, 199, 92, 0.12);\n  border-color: rgba(255, 199, 92, 0.34);\n  color: #ffd88f;\n}\n.review-accepted {\n  background: rgba(0, 212, 170, 0.14);\n  border-color: rgba(0, 212, 170, 0.36);\n  color: #6ff0d4;\n}\n.review-rejected {\n  background: rgba(255, 126, 158, 0.12);\n  border-color: rgba(255, 126, 158, 0.32);\n  color: #ffb6c8;\n}\n.agent-proposal-text {\n  margin: 0 0 10px;\n  padding: 0;\n  background: transparent;\n  border: none;\n  font: inherit;\n  color: #dfe6ff;\n  line-height: 1.6;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.agent-proposal-meta {\n  margin-bottom: 10px;\n  font-size: 0.78rem;\n  color: #8fa0c8;\n}\n.agent-review-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.review-accept,\n.review-reject {\n  min-height: 36px;\n  padding: 0 16px;\n  border-radius: 12px;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 160ms ease;\n}\n.review-accept {\n  background:\n    linear-gradient(\n      135deg,\n      #16c79a,\n      #0fa884);\n  border: none;\n  color: #04140f;\n}\n.review-accept:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.review-reject {\n  background: transparent;\n  border: 1px solid rgba(255, 126, 158, 0.36);\n  color: #ffb6c8;\n}\n.review-reject:hover:not(:disabled) {\n  background: rgba(255, 126, 158, 0.1);\n}\n.review-accept:disabled,\n.review-reject:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.agent-provider-badge {\n  display: inline-flex;\n  align-items: center;\n  min-height: 32px;\n  padding: 0 12px;\n  border-radius: 999px;\n  background: rgba(0, 212, 170, 0.1);\n  border: 1px solid rgba(0, 212, 170, 0.28);\n  color: #6ff0d4;\n  font-size: 0.82rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.submitted-table {\n  display: grid;\n  gap: 10px;\n}\n.submitted-table-head,\n.submitted-table-row {\n  display: grid;\n  grid-template-columns: 2.2fr 1.2fr 0.8fr 0.8fr;\n  gap: 14px;\n  align-items: center;\n}\n.submitted-table-head {\n  padding: 0 4px 8px;\n  color: #91a4ff;\n  font-size: 0.8rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.submitted-table-row {\n  padding: 14px 16px;\n  border-radius: 16px;\n  background: rgba(19, 25, 46, 0.88);\n  border: 1px solid rgba(126, 142, 255, 0.12);\n  color: #e9edff;\n}\n@media (max-width: 1100px) {\n  .hero-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .session-card {\n    grid-column: span 2;\n  }\n  .domain-list {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 760px) {\n  .summary-shell {\n    padding: 24px 16px 40px;\n  }\n  .summary-header {\n    flex-direction: column;\n  }\n  .summary-header-actions {\n    width: 100%;\n  }\n  .primary-action,\n  .secondary-action {\n    flex: 1 1 100%;\n  }\n  .hero-grid {\n    grid-template-columns: 1fr;\n  }\n  .session-card {\n    grid-column: span 1;\n  }\n  .submitted-table-head {\n    display: none;\n  }\n  .submitted-table-row {\n    grid-template-columns: 1fr;\n  }\n  .domain-control-row {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=assessment-summary-review.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssessmentSummaryReviewComponent, { className: "AssessmentSummaryReviewComponent", filePath: "src/app/pages/assessment-summary-review/assessment-summary-review.component.ts", lineNumber: 38 });
})();
export {
  AssessmentSummaryReviewComponent
};
//# sourceMappingURL=chunk-5JLWABZT.js.map
