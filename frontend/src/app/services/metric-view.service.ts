import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricViewResponse, ControlsResponse } from '../models/metric.models';

@Injectable({
  providedIn: 'root'
})
export class MetricViewService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:5000/api';

  getControls(): Observable<ControlsResponse> {
    return this.http.get<ControlsResponse>(`${this.apiUrl}/controls`);
  }

  getMetricViewForControl(controlId: string): Observable<MetricViewResponse> {
    return this.http.get<MetricViewResponse>(`${this.apiUrl}/metric-view/control/${controlId}`);
  }
}
