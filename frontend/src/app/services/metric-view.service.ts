import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricTreeResponse, ControlsResponse } from '../models/metric.models';

@Injectable({
  providedIn: 'root'
})
export class MetricViewService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://127.0.0.1:5000/api';

  getMetricViewForControl(controlId: string): Observable<MetricTreeResponse> {
    return this.http.get<MetricTreeResponse>(
      `${this.apiBaseUrl}/metric-view/control/${controlId}`
    );
  }

  getControls(): Observable<ControlsResponse> {
    return this.http.get<ControlsResponse>(
      `${this.apiBaseUrl}/controls`
    );
  }
}
