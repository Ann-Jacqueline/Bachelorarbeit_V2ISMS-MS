import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricTreeResponse } from '../models/metric-view.model';

@Injectable({
  providedIn: 'root'
})
export class MetricViewService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:5000/api/metric-view';

  getMetricTreeForControl(controlId: string): Observable<MetricTreeResponse> {
    return this.http.get<MetricTreeResponse>(`${this.baseUrl}/control/${controlId}`);
  }
}
