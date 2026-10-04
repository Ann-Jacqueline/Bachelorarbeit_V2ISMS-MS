import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-VDFY4THU.js";

// src/app/services/metric-view.service.ts
var MetricViewService = class _MetricViewService {
  http = inject(HttpClient);
  apiUrl = "http://127.0.0.1:5000/api";
  getControls() {
    return this.http.get(`${this.apiUrl}/controls`);
  }
  getMetricViewForControl(controlId) {
    return this.http.get(`${this.apiUrl}/metric-view/control/${controlId}`);
  }
  static \u0275fac = function MetricViewService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MetricViewService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MetricViewService, factory: _MetricViewService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MetricViewService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  MetricViewService
};
//# sourceMappingURL=chunk-QSDFC4RZ.js.map
