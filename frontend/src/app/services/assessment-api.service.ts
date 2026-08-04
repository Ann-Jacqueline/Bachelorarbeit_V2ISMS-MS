import { HttpClient } from '@angular/common/http';
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

export interface MaturityControlRating {
  mil_level: number | null;
  mil_label: string | null;
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
  answer_count: number;
}

export interface MaturityDomainControlSummary {
  control_id: string;
  mil_level: number | null;
  mil_label: string | null;
}

export interface MaturityDomainSummary {
  domain: string;
  rated_controls: number;
  avg_mil_level: number | null;
  achieved_points: number;
  max_points: number;
  percentage: number | null;
  controls: MaturityDomainControlSummary[];
}

export interface MaturityOverallSummary {
  rated_controls: number;
  unrated_controls: number;
  avg_mil_level: number | null;
  achieved_points: number;
  max_points: number;
  percentage: number | null;
}

export interface MaturitySummaryData {
  session_id: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
  overall: MaturityOverallSummary;
  domains: MaturityDomainSummary[];
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
