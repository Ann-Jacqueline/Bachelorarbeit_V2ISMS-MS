import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-VDFY4THU.js";

// src/app/services/assessment-api.service.ts
var AssessmentApiService = class _AssessmentApiService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:5000/api/maturity";
  createSession() {
    return this.http.post(`${this.baseUrl}/session`, {});
  }
  getSessionSummary(sessionId) {
    return this.http.get(`${this.baseUrl}/session/${sessionId}/summary`);
  }
  submitSession(sessionId, payload) {
    return this.http.post(`${this.baseUrl}/session/${sessionId}/submit`, payload);
  }
  static \u0275fac = function AssessmentApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssessmentApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AssessmentApiService, factory: _AssessmentApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssessmentApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/services/assessment-session.service.ts
var AssessmentSessionService = class _AssessmentSessionService {
  initialState = {
    sessionId: null,
    currentControlId: null,
    currentMetricId: null,
    answersByMetricId: {},
    controlPacketsByControlId: {}
  };
  stateSubject = new BehaviorSubject(this.initialState);
  state$ = this.stateSubject.asObservable();
  get snapshot() {
    return this.stateSubject.value;
  }
  startSession(sessionId) {
    const nextSessionId = sessionId ?? this.generateSessionId();
    this.patchState({
      sessionId: nextSessionId
    });
    return nextSessionId;
  }
  ensureSession() {
    return this.snapshot.sessionId ?? this.startSession();
  }
  getSessionId() {
    return this.snapshot.sessionId;
  }
  setCurrentContext(controlId, metricId) {
    this.patchState({
      currentControlId: controlId,
      currentMetricId: metricId
    });
  }
  upsertDraft(controlId, metricId, assessmentLevel, notes) {
    const sessionId = this.ensureSession();
    const existing = this.snapshot.answersByMetricId[metricId];
    const answer = {
      sessionId,
      controlId,
      metricId,
      assessmentLevel,
      notes,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      saved: existing?.saved ?? false
    };
    this.patchAnswer(answer);
    this.setCurrentContext(controlId, metricId);
    this.refreshControlPacket(controlId);
    return answer;
  }
  saveAnswer(controlId, metricId, assessmentLevel, notes) {
    const sessionId = this.ensureSession();
    const answer = {
      sessionId,
      controlId,
      metricId,
      assessmentLevel,
      notes,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      saved: true
    };
    this.patchAnswer(answer);
    this.setCurrentContext(controlId, metricId);
    this.refreshControlPacket(controlId);
    return answer;
  }
  getAnswer(metricId) {
    return this.snapshot.answersByMetricId[metricId] ?? null;
  }
  hasSavedAnswer(metricId) {
    return !!this.snapshot.answersByMetricId[metricId]?.saved;
  }
  removeAnswer(metricId) {
    const existing = this.snapshot.answersByMetricId[metricId];
    const answersByMetricId = __spreadValues({}, this.snapshot.answersByMetricId);
    delete answersByMetricId[metricId];
    this.patchState({
      answersByMetricId,
      currentMetricId: this.snapshot.currentMetricId === metricId ? null : this.snapshot.currentMetricId
    });
    if (existing) {
      this.refreshControlPacket(existing.controlId);
    }
  }
  getAllControlPackets() {
    return Object.values(this.snapshot.controlPacketsByControlId);
  }
  saveCurrentControlPacket(controlId, completed = true) {
    return this.refreshControlPacket(controlId, completed);
  }
  buildFinalSubmissionPayload() {
    return {
      sessionId: this.snapshot.sessionId,
      controls: this.getAllControlPackets().map((packet) => ({
        control_id: packet.controlId,
        completed: packet.completed,
        updated_at: packet.updatedAt,
        answers: packet.answers.map((answer) => ({
          metric_id: answer.metricId,
          assessment_level: answer.assessmentLevel,
          notes: answer.notes,
          updated_at: answer.updatedAt
        }))
      }))
    };
  }
  clearSession() {
    this.stateSubject.next(__spreadValues({}, this.initialState));
  }
  getAnswersForControl(controlId) {
    return Object.values(this.snapshot.answersByMetricId).filter((answer) => answer.controlId === controlId);
  }
  refreshControlPacket(controlId, completed) {
    const sessionId = this.ensureSession();
    const answers = this.getAnswersForControl(controlId).sort((a, b) => a.metricId.localeCompare(b.metricId));
    const existingPacket = this.snapshot.controlPacketsByControlId[controlId];
    const packet = {
      sessionId,
      controlId,
      completed: completed ?? existingPacket?.completed ?? false,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      answers
    };
    this.patchState({
      controlPacketsByControlId: __spreadProps(__spreadValues({}, this.snapshot.controlPacketsByControlId), {
        [controlId]: packet
      })
    });
    return packet;
  }
  patchAnswer(answer) {
    this.patchState({
      answersByMetricId: __spreadProps(__spreadValues({}, this.snapshot.answersByMetricId), {
        [answer.metricId]: answer
      })
    });
  }
  patchState(patch) {
    this.stateSubject.next(__spreadValues(__spreadValues({}, this.snapshot), patch));
  }
  generateSessionId() {
    const randomPart = Math.random().toString(36).slice(2, 10);
    return `assessment-${Date.now()}-${randomPart}`;
  }
  static \u0275fac = function AssessmentSessionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssessmentSessionService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AssessmentSessionService, factory: _AssessmentSessionService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssessmentSessionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AssessmentApiService,
  AssessmentSessionService
};
//# sourceMappingURL=chunk-7S5MO6DI.js.map
