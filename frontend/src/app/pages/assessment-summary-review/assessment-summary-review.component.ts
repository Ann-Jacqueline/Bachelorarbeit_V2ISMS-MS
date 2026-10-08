import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentSessionService } from '../../services/assessment-session.service';
import {
  ApiResponse,
  AgentReportLog,
  AssessmentApiService,
  CoverageSummary,
  MaturityDomainControlSummary,
  MaturityDomainSummary,
  MaturityExecutiveSummary,
  MaturityMethodology,
  MaturityOverallSummary,
  MaturityReportData,
  MaturitySummaryData,
  MetricRef
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

type ExportFormat = 'json' | 'markdown' | 'pdf';

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
  report: MaturityReportData | null = null;

  agentProvider: string | null = null;
  agentStates: Record<string, ControlAgentState> = {};
  expandedNotes: Record<string, boolean> = {};

  downloadingFormat: ExportFormat | null = null;
  downloadError: string | null = null;

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

    this.assessmentApiService.getSessionReport(sessionId).subscribe({
      next: (response: ApiResponse<MaturityReportData>) => {
        if (response.status !== 'success' || !response.data) {
          this.summary = null;
          this.report = null;
          this.errorMessage = response.message || 'Der Report konnte nicht geladen werden.';
          this.isLoading = false;
          return;
        }

        this.report = response.data;
        this.summary = {
          session_id: response.data.session_id,
          status: response.data.status,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
          overall: response.data.overall,
          domains: response.data.domains
        };
        this.isLoading = false;
        this.loadExistingAnalyses(sessionId);
      },
      error: () => {
        this.summary = null;
        this.report = null;
        this.errorMessage = 'Fehler beim Laden des Reports.';
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
            reviewStatus: log.status as 'proposed' | 'accepted' | 'rejected' | null,
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

  reviewStatusLabel(status: string | null | undefined): string {
    switch (status) {
      case 'proposed':
        return 'Wartet auf Freigabe';
      case 'accepted':
        return 'Freigegeben';
      case 'rejected':
        return 'Abgelehnt';
      default:
        return 'In Arbeit';
    }
  }

  goToMetricView(): void {
    this.router.navigate(['/']);
  }

  startNewAssessment(): void {
    this.assessmentSessionService.clearSession();
    this.router.navigate(['/']);
  }

  downloadReport(format: ExportFormat): void {
    const sessionId = this.summary?.session_id;
    if (!sessionId || this.downloadingFormat) {
      return;
    }

    this.downloadingFormat = format;
    this.downloadError = null;

    this.assessmentApiService.exportSessionReport(sessionId, format).subscribe({
      next: (httpResponse) => {
        const body = httpResponse.body;
        if (!body) {
          this.downloadError = 'Der Report-Download lieferte keine Daten.';
          this.downloadingFormat = null;
          return;
        }

        const fileName = this.extractFilename(
          httpResponse.headers.get('Content-Disposition'),
          sessionId,
          format
        );

        const blobUrl = URL.createObjectURL(body);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(blobUrl);

        this.downloadingFormat = null;
      },
      error: () => {
        this.downloadingFormat = null;
        this.downloadError =
          `Fehler beim Download des Reports (${format.toUpperCase()}).`;
      }
    });
  }

  isDownloading(format: ExportFormat): boolean {
    return this.downloadingFormat === format;
  }

  private extractFilename(
    disposition: string | null,
    sessionId: string,
    format: ExportFormat
  ): string {
    const match = disposition?.match(/filename="?([^";]+)"?/i);
    const extension = format === 'markdown' ? 'md' : format;
    return match?.[1] ?? `reifegrad-report-${sessionId}.${extension}`;
  }

  formatMil(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return value.toFixed(1);
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

  trackByMetricRef(_: number, item: MetricRef): string {
    return item.metric_id;
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

  get executive(): MaturityExecutiveSummary | null {
    return this.report?.executive ?? null;
  }

  get coverage(): CoverageSummary | null {
    return this.overall?.coverage ?? null;
  }

  get methodology(): MaturityMethodology | null {
    return this.report?.methodology ?? null;
  }

  get agentLogs(): AgentReportLog[] {
    return this.report?.agent_logs ?? [];
  }

  get sessionStatusLabel(): string {
    if (!this.summary) {
      return '–';
    }

    return this.summary.status === 'completed' ? 'Abgeschlossen' : 'Aktiv';
  }

  get averageMilLevel(): string {
    return this.formatMil(this.summary?.overall?.avg_mil_level ?? null);
  }

  get averageMilDisplay(): string {
    return this.executive?.avg_mil_display ?? this.averageMilLevel;
  }

  get totalNoteCount(): number {
    return this.executive?.note_count ?? 0;
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

  get ratedPercentage(): string {
    return this.formatPercentage(this.summary?.overall?.rated_percentage ?? null);
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

  statusLabel(status: 'complete' | 'incomplete' | 'unrated' | null | undefined): string {
    switch (status) {
      case 'complete':
        return 'Vollständig';
      case 'incomplete':
        return 'Unvollständig';
      case 'unrated':
        return 'Nicht bewertet';
      default:
        return 'Unbekannt';
    }
  }

  zeroReasonLabel(
    control: MaturityDomainControlSummary
  ): string {
    if (control.zero_reason === 'not_implemented') {
      return 'MIL 0 (Not Implemented)';
    }
    if (control.zero_reason === 'not_rated') {
      return '0 Punkte (nicht bewertet)';
    }
    return '';
  }

  completenessPercent(control: MaturityDomainControlSummary): number | null {
    const expected = control.expected_answer_count ?? 0;
    const answered = control.answer_count ?? 0;

    if (expected <= 0) {
      return null;
    }

    return Math.min(100, Math.round((answered / expected) * 100));
  }

  formatAnsweredCount(control: MaturityDomainControlSummary): string {
    const answered = control.answer_count ?? 0;
    const expected = control.expected_answer_count ?? 0;

    if (expected <= 0) {
      return '–';
    }

    return `${answered} / ${expected}`;
  }

  controlMilDisplay(control: MaturityDomainControlSummary): string {
    return control.mil_display ?? `MIL ${this.formatMil(control.mil_level)}`;
  }

  controlNameForLog(controlId: string | null): string {
    if (!controlId) {
      return 'Session';
    }

    for (const domain of this.domains) {
      const control = domain.controls.find((item) => item.control_id === controlId);
      if (control) {
        return control.control_name ?? control.control_id;
      }
    }

    return controlId;
  }

  formatAverage(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return value.toFixed(1);
  }
}