import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentSessionService } from '../../services/assessment-session.service';
import {
  ApiResponse,
  AssessmentApiService,
  MaturityDomainControlSummary,
  MaturityDomainSummary,
  MaturityOverallSummary,
  MaturitySummaryData
} from '../../services/assessment-api.service';
import {
  AgentApiService,
  AgentLogEntry,
  AgentStatusData,
  NoteAnalysisData
} from '../../services/agent-api.service';

interface ControlAgentState {
  isAnalyzing: boolean;
  isReviewing: boolean;
  error: string | null;
  logId: number | null;
  proposal: string | null;
  reviewStatus: 'proposed' | 'accepted' | 'rejected' | null;
  provider: string | null;
  reviewedBy: string | null;
}

@Component({
  selector: 'app-assessment-summary-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-summary-review.component.html',
  styleUrl: './assessment-summary-review.component.scss'
})
export class AssessmentSummaryReviewComponent implements OnInit {
  private router = inject(Router);
  private assessmentSessionService = inject(AssessmentSessionService);
  private assessmentApiService = inject(AssessmentApiService);
  private agentApiService = inject(AgentApiService);

  isLoading = false;
  errorMessage: string | null = null;
  summary: MaturitySummaryData | null = null;

  agentProvider: string | null = null;
  agentStates: Record<string, ControlAgentState> = {};
  expandedNotes: Record<string, boolean> = {};

  ngOnInit(): void {
    this.loadSummary();
    this.loadAgentStatus();
  }

  loadSummary(): void {
    const sessionId = this.assessmentSessionService.getSessionId();

    if (!sessionId) {
      this.errorMessage = 'Keine aktive Session gefunden.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.assessmentApiService.getSessionSummary(sessionId).subscribe({
      next: (response: ApiResponse<MaturitySummaryData>) => {
        if (response.status !== 'success' || !response.data) {
          this.summary = null;
          this.errorMessage = response.message || 'Die Summary konnte nicht geladen werden.';
          this.isLoading = false;
          return;
        }

        this.summary = response.data;
        this.isLoading = false;
        this.loadExistingAnalyses(sessionId);
      },
      error: () => {
        this.summary = null;
        this.errorMessage = 'Fehler beim Laden der Summary.';
        this.isLoading = false;
      }
    });
  }

  private loadAgentStatus(): void {
    this.agentApiService.getStatus().subscribe({
      next: (response: ApiResponse<AgentStatusData>) => {
        this.agentProvider = response.data?.provider ?? null;
      },
      error: () => {
        this.agentProvider = null;
      }
    });
  }

  /** Lädt bereits vorhandene Notiz-Analysen (Agent-Logs) der Session. */
  private loadExistingAnalyses(sessionId: string): void {
    this.agentApiService.getLogs(sessionId).subscribe({
      next: (response: ApiResponse<AgentLogEntry[]>) => {
        const logs = response.data ?? [];
        for (const log of logs) {
          if (log.agent_name !== 'note_analyzer' || !log.control_id) {
            continue;
          }
          if (log.status === 'error') {
            continue;
          }
          // Logs kommen absteigend nach log_id – nur die neueste Analyse pro Control übernehmen.
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
        // Bestehende Analysen sind optional – Fehler hier nicht blockierend anzeigen.
      }
    });
  }

  analyzeNote(control: MaturityDomainControlSummary): void {
    const sessionId = this.summary?.session_id;
    if (!sessionId || !control.has_note) {
      return;
    }

    const state = this.getAgentState(control.control_id);
    state.isAnalyzing = true;
    state.error = null;

    this.agentApiService.analyzeNote(sessionId, control.control_id).subscribe({
      next: (response: ApiResponse<NoteAnalysisData>) => {
        state.isAnalyzing = false;
        if (response.status !== 'success' || !response.data) {
          state.error = response.message || 'Die Notiz-Analyse ist fehlgeschlagen.';
          return;
        }
        state.logId = response.data.log_id;
        state.proposal = response.data.proposal;
        state.reviewStatus = 'proposed';
        state.provider = response.data.provider;
        state.reviewedBy = null;
      },
      error: (err) => {
        state.isAnalyzing = false;
        state.error = err?.error?.message || 'Fehler beim Aufruf des Agenten.';
      }
    });
  }

  reviewProposal(controlId: string, decision: 'accepted' | 'rejected'): void {
    const state = this.agentStates[controlId];
    if (!state?.logId || state.reviewStatus !== 'proposed') {
      return;
    }

    state.isReviewing = true;
    state.error = null;

    this.agentApiService.reviewProposal(state.logId, decision).subscribe({
      next: (response: ApiResponse<AgentLogEntry>) => {
        state.isReviewing = false;
        if (response.status !== 'success' || !response.data) {
          state.error = response.message || 'Review fehlgeschlagen.';
          return;
        }
        state.reviewStatus = response.data.status as 'accepted' | 'rejected';
        state.reviewedBy = response.data.reviewed_by;
      },
      error: (err) => {
        state.isReviewing = false;
        state.error = err?.error?.message || 'Fehler beim Review des Vorschlags.';
      }
    });
  }

  toggleNote(controlId: string): void {
    this.expandedNotes[controlId] = !this.expandedNotes[controlId];
  }

  isNoteExpanded(controlId: string): boolean {
    return !!this.expandedNotes[controlId];
  }

  getAgentState(controlId: string): ControlAgentState {
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

  agentStateFor(controlId: string): ControlAgentState | null {
    return this.agentStates[controlId] ?? null;
  }

  reviewStatusLabel(status: 'proposed' | 'accepted' | 'rejected' | null): string {
    switch (status) {
      case 'proposed':
        return 'Wartet auf Freigabe';
      case 'accepted':
        return 'Freigegeben';
      case 'rejected':
        return 'Abgelehnt';
      default:
        return '';
    }
  }

  goToMetricView(): void {
    this.router.navigate(['/']);
  }

  startNewAssessment(): void {
    this.assessmentSessionService.clearSession();
    this.router.navigate(['/']);
  }

  formatMil(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return value.toFixed(2);
  }

  formatPercentage(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return `${value.toFixed(1)}%`;
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return '–';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(date);
  }

  trackByDomain(_: number, item: MaturityDomainSummary): string {
    return item.domain;
  }

  trackByControl(_: number, item: MaturityDomainControlSummary): string {
    return item.control_id;
  }

  get overall(): MaturityOverallSummary | null {
    return this.summary?.overall ?? null;
  }

  get domains(): MaturityDomainSummary[] {
    return this.summary?.domains ?? [];
  }

  get hasDomains(): boolean {
    return this.domains.length > 0;
  }

  get sessionStatusLabel(): string {
    if (!this.summary) {
      return '–';
    }

    return this.summary.status === 'completed' ? 'Abgeschlossen' : 'Aktiv';
  }

  get averageMilLevel(): string {
    return this.formatAverage(this.summary?.overall?.avg_mil_level ?? null);
  }

  get totalRatedControls(): number {
    return this.summary?.overall?.rated_controls ?? 0;
  }

  get totalUnratedControls(): number {
    return this.summary?.overall?.unrated_controls ?? 0;
  }

  get overallPercentage(): string {
    return this.formatPercentage(this.summary?.overall?.percentage ?? null);
  }

  get achievedPointsDisplay(): string {
    const achieved = this.summary?.overall?.achieved_points;
    const max = this.summary?.overall?.max_points;

    if (achieved === null || achieved === undefined || max === null || max === undefined) {
      return 'n/a';
    }

    return `${achieved} / ${max}`;
  }

  get totalDomains(): number {
    return this.domains.length;
  }

  formatAverage(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return value.toFixed(2);
  }
}
