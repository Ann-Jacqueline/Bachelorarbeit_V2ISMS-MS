import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MetricViewService } from '../../services/metric-view.service';
import { ControlListItem, MetricTreeNode } from '../../models/metric.models';
import { AssessmentApiService } from '../../services/assessment-api.service';
import {
  AssessmentLevel,
  AssessmentSessionService
} from '../../services/assessment-session.service';

type MetricGroupType = 'verification' | 'validation';

interface AssessmentOption {
  value: AssessmentLevel;
  key: string;
  label: string;
  shortLabel: string;
  description: string;
}

interface CanvasMetricItem {
  id: string;
  name: string;
  score: number | null;
  details: MetricTreeNode | null;
  evidencesNode: MetricTreeNode | null;
  rawNode: MetricTreeNode;
  groupType: MetricGroupType;
}

interface CanvasGroup {
  id: string;
  title: string;
  type: MetricGroupType;
  count: number;
  metrics: CanvasMetricItem[];
}

@Component({
  selector: 'app-maturity-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maturity-assessment.component.html',
  styleUrl: './maturity-assessment.component.scss'
})
export class MaturityAssessmentComponent implements OnInit {
  private metricViewService = inject(MetricViewService);
  private router = inject(Router);
  private assessmentSessionService = inject(AssessmentSessionService);
  private assessmentApiService = inject(AssessmentApiService);

  controls: ControlListItem[] = [];
  selectedControlId: string | null = null;
  metricTree: MetricTreeNode | null = null;

  isLoading = false;
  isSaving = false;
  isSubmitting = false;
  errorMessage: string | null = null;
  saveMessage: string | null = null;

  canvasGroups: CanvasGroup[] = [];
  selectedMetric: CanvasMetricItem | null = null;
  metricDetailOpen = false;

  expandedGroups: Record<MetricGroupType, boolean> = {
    verification: false,
    validation: false
  };

  assessmentOptions: AssessmentOption[] = [
    {
      value: 0,
      key: 'not-implemented',
      label: 'Not Implemented',
      shortLabel: 'Not Implemented',
      description: 'Die Anforderungen sind nicht oder nur unwesentlich umgesetzt.'
    },
    {
      value: 1,
      key: 'partially-implemented',
      label: 'Partially Implemented',
      shortLabel: 'Partially Implemented',
      description: 'Die Anforderungen sind teilweise umgesetzt, jedoch nicht konsistent.'
    },
    {
      value: 2,
      key: 'largely-implemented',
      label: 'Largely Implemented',
      shortLabel: 'Largely Implemented',
      description: 'Die Anforderungen sind weitgehend umgesetzt und nachvollziehbar etabliert.'
    },
    {
      value: 3,
      key: 'fully-implemented',
      label: 'Fully Implemented',
      shortLabel: 'Fully Implemented',
      description: 'Die Anforderungen sind vollständig, systematisch und wirksam umgesetzt.'
    }
  ];

  selectedAssessment: AssessmentLevel | null = 2;
  notes = '';

  ngOnInit(): void {
    this.initializeSession();
  }

  loadControls(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.metricViewService.getControls().subscribe({
      next: (response) => {
        this.controls = response.data ?? [];

        if (this.controls.length > 0) {
          const currentControlId =
            this.assessmentSessionService.snapshot.currentControlId ??
            this.controls[0].control_id;

          this.selectedControlId = currentControlId;
          this.loadMetricView(currentControlId);
        } else {
          this.isLoading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Controls.';
        this.isLoading = false;
      }
    });
  }

  loadMetricView(controlId: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.metricTree = null;
    this.canvasGroups = [];
    this.selectedMetric = null;
    this.metricDetailOpen = false;
    this.saveMessage = null;
    this.expandedGroups = {
      verification: false,
      validation: false
    };

    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.buildCanvasViewModel();

        if (this.selectedMetric) {
          this.expandedGroups[this.selectedMetric.groupType] = true;
          this.hydrateFormFromSelectedMetric();
        } else {
          this.resetEditorState();
        }

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Metric View.';
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.metricDetailOpen = false;
        this.resetEditorState();
        this.isLoading = false;
      }
    });
  }

  openMetricDetail(metric: CanvasMetricItem): void {
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
  }

  closeMetricDetail(): void {
    this.metricDetailOpen = false;
    this.saveMessage = null;
  }

  selectControl(controlId: string): void {
    if (this.selectedControlId === controlId) {
      return;
    }

    this.persistDraftToSession();
    this.finalizeCurrentControlPacket(false);
    this.selectedControlId = controlId;
    this.loadMetricView(controlId);
  }

  selectMetric(metric: CanvasMetricItem): void {
    this.persistDraftToSession();
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
  }

  toggleGroupMetrics(groupType: MetricGroupType): void {
    const nextState = !this.expandedGroups[groupType];
    this.expandedGroups[groupType] = nextState;

    if (nextState) {
      const firstMetric =
        this.canvasGroups.find((group) => group.type === groupType)?.metrics[0] ?? null;

      if (firstMetric) {
        this.persistDraftToSession();
        this.selectedMetric = firstMetric;
        this.hydrateFormFromSelectedMetric();
      }
    }
  }

  isGroupExpanded(groupType: MetricGroupType): boolean {
    return this.expandedGroups[groupType];
  }

  selectAssessment(level: AssessmentLevel): void {
    this.selectedAssessment = level;
    this.persistDraftToSession();
    this.saveMessage = null;
  }

  updateNotes(value: string): void {
    this.notes = value;
    this.persistDraftToSession();
    this.saveMessage = null;
  }

  saveAssessment(): void {
    if (!this.selectedMetric || !this.selectedControlId) {
      this.saveMessage = null;
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;
    this.saveMessage = null;

    this.assessmentSessionService.saveAnswer(
      this.selectedControlId,
      this.selectedMetric.id,
      this.selectedAssessment,
      this.notes.trim()
    );

    this.finalizeCurrentControlPacket(false);

    this.isSaving = false;
    this.saveMessage = 'Bewertung lokal gespeichert.';
  }

  cancelAssessmentChanges(): void {
    if (!this.selectedMetric) {
      this.resetEditorState();
      return;
    }

    const currentAnswer = this.assessmentSessionService.getAnswer(this.selectedMetric.id);

    if (currentAnswer?.saved) {
      this.selectedAssessment = currentAnswer.assessmentLevel;
      this.notes = currentAnswer.notes;
      this.saveMessage = 'Änderungen verworfen.';
      return;
    }

    this.assessmentSessionService.removeAnswer(this.selectedMetric.id);
    this.selectedAssessment = 2;
    this.notes = '';
    this.saveMessage = 'Änderungen verworfen.';
  }

  goToNextControl(): void {
    this.persistDraftToSession();

    if (!this.controls.length || !this.selectedControlId) {
      return;
    }

    this.finalizeCurrentControlPacket(true);

    const currentIndex = this.controls.findIndex(
      (control) => control.control_id === this.selectedControlId
    );

    if (currentIndex === -1) {
      return;
    }

    const nextControl = this.controls[currentIndex + 1];

    if (nextControl) {
      this.selectedControlId = nextControl.control_id;
      this.loadMetricView(nextControl.control_id);
    }
  }

  confirmSubmitAssessment(): void {
    this.persistDraftToSession();

    const missingCount = this.totalMissingMetricCount;
    const message =
      missingCount > 0
        ? `Es fehlen noch ${missingCount} Antworten im aktuellen Control. Diese werden automatisch mit 0 bewertet. Nach dem Absenden können die Antworten nicht mehr geändert werden. Assessment jetzt abschließen?`
        : 'Nach dem Absenden können die Antworten nicht mehr geändert werden. Assessment jetzt abschließen?';

    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    this.fillMissingAnswersWithZeroInCurrentControl();
    this.submitAssessment();
  }

  submitAssessment(): void {
    const sessionId = this.assessmentSessionService.ensureSession();

    if (this.selectedControlId) {
      this.finalizeCurrentControlPacket(true);
    }

    const payload = this.assessmentSessionService.buildFinalSubmissionPayload();

    this.isSubmitting = true;
    this.errorMessage = null;
    this.saveMessage = null;

   this.assessmentApiService.submitSession(sessionId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/assessment-summary']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Fehler beim Abschließen des Assessments.';
      }
    });
  }

  goToMetricView(): void {
    this.persistDraftToSession();
    this.router.navigate(['/']);
  }

  goToProgressStep(stepId: string): void {
    this.persistDraftToSession();

    const metric = this.allMetrics.find((item) => item.id === stepId);
    if (!metric) {
      return;
    }

    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
    this.saveMessage = null;
    this.hydrateFormFromSelectedMetric();
  }

  private buildCanvasViewModel(): void {
    if (!this.metricTree?.children) {
      this.canvasGroups = [];
      this.selectedMetric = null;
      return;
    }

    this.canvasGroups = this.metricTree.children
      .filter((child) => child.node_type === 'metric_group')
      .map((groupNode) => {
        const groupType: MetricGroupType =
          groupNode.id.includes('verification') ? 'verification' : 'validation';

        const metrics = (groupNode.children ?? [])
          .filter((child) => child.node_type === 'metric')
          .map((metricNode) => this.mapMetricNode(metricNode, groupType));

        return {
          id: groupNode.id,
          title: groupNode.name,
          type: groupType,
          count: metrics.length,
          metrics
        };
      });

    const allMetrics = this.canvasGroups.flatMap((group) => group.metrics);
    const firstMetric = allMetrics[0] ?? null;

    if (!firstMetric) {
      this.selectedMetric = null;
      return;
    }

    const currentMetricId = this.assessmentSessionService.snapshot.currentMetricId;
    this.selectedMetric =
      allMetrics.find((metric) => metric.id === currentMetricId) ?? firstMetric;
  }

  private mapMetricNode(
    metricNode: MetricTreeNode,
    groupType: MetricGroupType
  ): CanvasMetricItem {
    const scoreNode =
      metricNode.children?.find((child) => child.node_type === 'score') ?? null;

    const detailsNode =
      metricNode.children?.find((child) => child.node_type === 'metric_details') ?? null;

    const evidencesNode =
      metricNode.children?.find((child) => child.node_type === 'evidenzen') ?? null;

    const score =
      typeof scoreNode?.data?.['total_score'] === 'number'
        ? scoreNode.data['total_score']
        : typeof metricNode.data?.['total_score'] === 'number'
          ? metricNode.data['total_score']
          : null;

    return {
      id: metricNode.id,
      name: metricNode.name,
      score,
      details: detailsNode,
      evidencesNode,
      rawNode: metricNode,
      groupType
    };
  }

  private persistDraftToSession(): void {
    if (!this.selectedMetric || !this.selectedControlId) {
      return;
    }

    this.assessmentSessionService.upsertDraft(
      this.selectedControlId,
      this.selectedMetric.id,
      this.selectedAssessment,
      this.notes
    );
  }

  private hydrateFormFromSelectedMetric(): void {
    if (!this.selectedMetric || !this.selectedControlId) {
      this.resetEditorState();
      return;
    }

    const source = this.assessmentSessionService.getAnswer(this.selectedMetric.id);

    if (source) {
      this.selectedAssessment = source.assessmentLevel;
      this.notes = source.notes;
      this.assessmentSessionService.setCurrentContext(source.controlId, source.metricId);
      return;
    }

    this.selectedAssessment = 2;
    this.notes = '';
    this.assessmentSessionService.setCurrentContext(this.selectedControlId, this.selectedMetric.id);
  }

  private resetEditorState(): void {
    this.selectedAssessment = 2;
    this.notes = '';
    this.saveMessage = null;
  }

  private initializeSession(): void {
    const existingSessionId = this.assessmentSessionService.getSessionId();

    if (existingSessionId) {
      this.loadControls();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.assessmentApiService.createSession().subscribe({
      next: (response) => {
        const sessionId = response.data?.session_id;

        if (!sessionId) {
          this.errorMessage = 'Keine Session-ID vom Backend erhalten.';
          this.isLoading = false;
          return;
        }

        this.assessmentSessionService.startSession(sessionId);
        this.loadControls();
      },
      error: () => {
        this.errorMessage = 'Fehler beim Erstellen der Maturity-Session.';
        this.isLoading = false;
      }
    });
  }

  private finalizeCurrentControlPacket(completed: boolean): void {
    if (!this.selectedControlId) {
      return;
    }

    this.assessmentSessionService.saveCurrentControlPacket(this.selectedControlId, completed);
  }

  private fillMissingAnswersWithZeroInCurrentControl(): void {
    if (!this.selectedControlId) {
      return;
    }

    for (const metric of this.allMetrics) {
      const existing = this.assessmentSessionService.getAnswer(metric.id);

      if (!existing || existing.assessmentLevel === null) {
        this.assessmentSessionService.saveAnswer(
          this.selectedControlId,
          metric.id,
          0,
          existing?.notes ?? ''
        );
      }
    }

    this.assessmentSessionService.saveCurrentControlPacket(this.selectedControlId, true);
  }

  formatScore(score: number | null): string {
    if (score === null || Number.isNaN(score)) {
      return 'n/a';
    }

    return `${(score * 100).toFixed(1)}%`;
  }

  get controlName(): string {
    return this.metricTree?.name ?? 'Maturity Assessment';
  }

  get controlDescription(): string {
    return this.metricTree?.data?.['beschreibung'] ?? '';
  }

  get selectedEvidenceItems(): MetricTreeNode[] {
    return this.selectedMetric?.evidencesNode?.children ?? [];
  }

  get selectedMetricDescriptionText(): string {
    return (
      this.selectedMetric?.details?.data?.['beschreibung'] ||
      this.selectedMetric?.rawNode.data?.['beschreibung'] ||
      this.controlDescription ||
      'Keine Beschreibung vorhanden.'
    );
  }

  get selectedMetricFormulaText(): string {
    return (
      this.selectedMetric?.details?.data?.['formel'] ||
      this.selectedMetric?.rawNode.data?.['formel'] ||
      'Keine Formel vorhanden.'
    );
  }

  get verificationMetrics(): CanvasMetricItem[] {
    return this.canvasGroups.find((group) => group.type === 'verification')?.metrics ?? [];
  }

  get validationMetrics(): CanvasMetricItem[] {
    return this.canvasGroups.find((group) => group.type === 'validation')?.metrics ?? [];
  }

  get allMetrics(): CanvasMetricItem[] {
    return [...this.verificationMetrics, ...this.validationMetrics];
  }

  get progressSteps(): string[] {
    const metricIds = this.allMetrics.map((metric) => metric.id);
    return metricIds.length ? metricIds : [this.selectedControlId ?? 'control'];
  }

  get activeProgressIndex(): number {
    const selectedMetric = this.selectedMetric;

    if (!selectedMetric) {
      return 0;
    }

    const index = this.progressSteps.findIndex((step) => step === selectedMetric.id);
    return index >= 0 ? index : 0;
  }

  get currentMilLabel(): string {
    return this.selectedAssessment === null ? '–' : `MIL ${this.selectedAssessment}`;
  }

  get notesLength(): number {
    return this.notes.length;
  }

  get hasSavedAnswerForSelectedMetric(): boolean {
    if (!this.selectedMetric) {
      return false;
    }

    return this.assessmentSessionService.hasSavedAnswer(this.selectedMetric.id);
  }

  get isLastControl(): boolean {
    if (!this.controls.length || !this.selectedControlId) {
      return false;
    }

    const currentIndex = this.controls.findIndex(
      (control) => control.control_id === this.selectedControlId
    );

    return currentIndex === this.controls.length - 1;
  }

  get missingMetricsInCurrentControl(): CanvasMetricItem[] {
    return this.allMetrics.filter((metric) => {
      const answer = this.assessmentSessionService.getAnswer(metric.id);
      return !answer || answer.assessmentLevel === null;
    });
  }

  get totalMissingMetricCount(): number {
    return this.missingMetricsInCurrentControl.length;
  }
}
