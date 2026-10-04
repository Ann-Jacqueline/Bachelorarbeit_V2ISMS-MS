import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './assessment-api.service';

export type AgentReviewStatus = 'proposed' | 'accepted' | 'rejected' | 'error';

export interface AgentStatusData {
  provider: string;
  note: string;
}

export interface NoteAnalysisData {
  log_id: number;
  proposal: string;
  provider: string;
  model: string;
  review_status: AgentReviewStatus;
  analyzed_note: string;
  control_id: string;
  session_id: string;
}

export interface AgentLogEntry {
  log_id: number;
  agent_name: string;
  action: string;
  input_text: string;
  output_text: string | null;
  provider: string;
  model: string;
  status: AgentReviewStatus;
  session_id: string | null;
  control_id: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AgentApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/agents';

  getStatus(): Observable<ApiResponse<AgentStatusData>> {
    return this.http.get<ApiResponse<AgentStatusData>>(`${this.baseUrl}/status`);
  }

  analyzeNote(
    sessionId: string,
    controlId: string
  ): Observable<ApiResponse<NoteAnalysisData>> {
    return this.http.post<ApiResponse<NoteAnalysisData>>(
      `${this.baseUrl}/session/${sessionId}/controls/${controlId}/analyze-note`,
      {}
    );
  }

  getLogs(
    sessionId?: string,
    status?: AgentReviewStatus
  ): Observable<ApiResponse<AgentLogEntry[]>> {
    let params = new HttpParams();
    if (sessionId) {
      params = params.set('session_id', sessionId);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<ApiResponse<AgentLogEntry[]>>(`${this.baseUrl}/logs`, { params });
  }

  reviewProposal(
    logId: number,
    decision: 'accepted' | 'rejected',
    reviewedBy?: string
  ): Observable<ApiResponse<AgentLogEntry>> {
    return this.http.post<ApiResponse<AgentLogEntry>>(
      `${this.baseUrl}/logs/${logId}/review`,
      { decision, reviewed_by: reviewedBy ?? 'auditor' }
    );
  }
}
