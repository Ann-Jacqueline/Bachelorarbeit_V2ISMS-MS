import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  status: 'success' | 'error' | 'not_found';
  message: string;
  data: T | null;
}

export type AssessmentLevel = 0 | 1 | 2 | 3;

export interface ControlAnswerPayload {
  assessment_level: AssessmentLevel | null;
  notes?: string | null;
}

export interface ControlSubmitPayload {
  control_id: string;
  answers: ControlAnswerPayload[];
}

export interface SubmitSessionPayload {
  controls: ControlSubmitPayload[];
  fill_missing_with_zero: boolean;
}

export interface MaturitySessionData {
  session_id: string;
  status: 'active' | 'completed';
}

export interface MaturityControlQuestion {
  question_no: number;
  question: string;
  help_text: string | null;
}

export type ControlRatingStatus = 'complete' | 'incomplete' | 'unrated';
export type ZeroReason = 'not_implemented' | 'not_rated' | null;

export interface MaturityControlRating {
  mil_level: number | null;
  mil_label: string | null;
  mil_display: string | null;
  mil_labels: string[] | null;
  mil_band: string | null;
  status: ControlRatingStatus;
  zero_reason: ZeroReason;
  answer_count: number | null;
  expected_answer_count: number | null;
  note: string | null;
}

export interface MaturityControlDetails {
  control_id: string;
  name: string;
  domain: string;
  kritikalitaet: string | null;
  pruefbarkeit: string | null;
  org_anteil: number | null;
  tech_anteil: number | null;
  aenderungsfrequenz: string | null;
  requires_logs: boolean;
  requires_konfig: boolean;
  requires_policy_dokumente: boolean;
  requires_interviews: boolean;
  requires_beobachtung: boolean;
}

export interface MaturityControlViewData {
  session_id: string;
  session_status: 'active' | 'completed';
  question_count: number;
  control: MaturityControlDetails;
  questions: MaturityControlQuestion[];
  rating: MaturityControlRating;
}

export interface SubmittedControlSummary {
  control_id: string;
  control_name: string;
  domain: string;
  mil_level: number | null;
  mil_label: string | null;
  mil_display: string | null;
  status: ControlRatingStatus;
  zero_reason: ZeroReason;
  answer_count: number;
  expected_answer_count: number;
}

export interface CoverageSummary {
  total_controls: number;
  rated_controls: number;
  complete_controls: number;
  incomplete_controls: number;
  unrated_controls: number;
  coverage_percentage: number | null;
  zero_not_implemented: number;
  zero_not_rated: number;
  unanswered_questions?: number;
}

export interface MetricRef {
  metric_id: string;
  metric_name: string | null;
}

export interface MetricNote {
  metric_id: string | null;
  metric_name: string | null;
  note: string;
}

export interface MaturityDomainControlSummary {
  control_id: string;
  control_name: string;
  domain: string;
  mil_level: number | null;
  mil_value_display: string | null;
  mil_display: string | null;
  mil_label: string | null;
  mil_labels: string[] | null;
  mil_band: MaturityMilBandRange | null;
  status: ControlRatingStatus;
  zero_reason: ZeroReason;
  note: string | null;
  has_note: boolean;
  metric_notes: MetricNote[];
  missing_metrics: MetricRef[];
  answer_count: number | null;
  expected_answer_count: number | null;
}

export interface MaturityDomainSummary {
  domain: string;
  total_controls: number;
  rated_controls: number;
  unrated_controls: number;
  complete_controls: number;
  incomplete_controls: number;
  avg_mil_level: number | null;
  achieved_points: number;
  max_points: number;
  percentage: number | null;
  rated_percentage: number | null;
  coverage: CoverageSummary;
  controls: MaturityDomainControlSummary[];
}

export interface MaturityOverallSummary {
  total_controls: number;
  rated_controls: number;
  unrated_controls: number;
  complete_controls: number;
  incomplete_controls: number;
  avg_mil_level: number | null;
  achieved_points: number;
  max_points: number;
  percentage: number | null;
  rated_percentage: number | null;
  coverage: CoverageSummary;
}

export interface MaturitySummaryData {
  session_id: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
  overall: MaturityOverallSummary;
  domains: MaturityDomainSummary[];
}

export interface MaturityExecutiveSummary {
  percentage: number | null;
  rated_percentage: number | null;
  avg_mil_level: number | null;
  avg_mil_display: string | null;
  achieved_points: number;
  max_points: number;
  coverage: CoverageSummary;
  note_count?: number;
  statement: string;
}

export interface MaturityMilBandRange {
  floor: number;
  ceiling: number;
}

export interface MaturityBandInfo {
  mil: number;
  label: string;
}

export interface MaturityMethodology {
  reifegrad: string;
  abdeckung: string;
  mil_level: string;
  zero_differenzierung: string;
  maturity_bands: MaturityBandInfo[];
}

export interface AgentReportLog {
  log_id: number;
  agent_name: string;
  action: string;
  output_text: string | null;
  control_id: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  provider: string | null;
  model: string | null;
}

export interface MaturityReportData {
  session_id: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
  generated_at: string;
  executive: MaturityExecutiveSummary;
  overall: MaturityOverallSummary;
  domains: MaturityDomainSummary[];
  agent_logs: AgentReportLog[];
  methodology: MaturityMethodology;
  generated_with: string;
}

export interface SubmitSessionResponseData {
  session_id: string;
  status: 'completed';
  submitted_controls: SubmittedControlSummary[];
  processed_control_count: number;
  processed_answer_count: number;
  overall: MaturityOverallSummary;
  domains: MaturityDomainSummary[];
}

@Injectable({
  providedIn: 'root'
})
export class AssessmentApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/maturity';

  createSession(): Observable<ApiResponse<MaturitySessionData>> {
    return this.http.post<ApiResponse<MaturitySessionData>>(
      `${this.baseUrl}/session`,
      {}
    );
  }


  getSessionSummary(
    sessionId: string
  ): Observable<ApiResponse<MaturitySummaryData>> {
    return this.http.get<ApiResponse<MaturitySummaryData>>(
      `${this.baseUrl}/session/${sessionId}/summary`
    );
  }

  getSessionReport(
    sessionId: string
  ): Observable<ApiResponse<MaturityReportData>> {
    return this.http.get<ApiResponse<MaturityReportData>>(
      `${this.baseUrl}/session/${sessionId}/report`
    );
  }

  exportSessionReport(
    sessionId: string,
    format: 'json' | 'markdown' | 'pdf'
  ): Observable<HttpResponse<Blob>> {
    const params = new HttpParams().set('format', format);
    return this.http.get(
      `${this.baseUrl}/session/${sessionId}/export`,
      {
        params,
        responseType: 'blob',
        observe: 'response'
      }
    );
  }

  submitSession(
    sessionId: string,
    payload: SubmitSessionPayload
  ): Observable<ApiResponse<SubmitSessionResponseData>> {
    return this.http.post<ApiResponse<SubmitSessionResponseData>>(
      `${this.baseUrl}/session/${sessionId}/submit`,
      payload
    );
  }
}
