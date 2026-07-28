import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MetricViewService } from '../../services/metric-view.service';
import { ControlListItem, MetricTreeNode } from '../../models/metric.models';

type AssessmentLevel = 0 | 1 | 2 | 3;
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

  controls: ControlListItem[] = [];
  selectedControlId: string | null = null;
  metricTree: MetricTreeNode | null = null;

  isLoading = false;
  errorMessage: string | null = null;

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
    this.loadControls();
  }

  loadControls(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.metricViewService.getControls().subscribe({
      next: (response) => {
        this.controls = response.data ?? [];

        if (this.controls.length > 0) {
          this.selectedControlId = this.controls[0].control_id;
          this.loadMetricView(this.selectedControlId);
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
    this.selectedAssessment = 2;
    this.notes = '';
    this.metricDetailOpen = false;
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
        }

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Metric View.';
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.metricDetailOpen = false;
        this.isLoading = false;
      }
    });
  }

  openMetricDetail(metric: CanvasMetricItem): void {
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
  }

  closeMetricDetail(): void {
    this.metricDetailOpen = false;
  }

  selectControl(controlId: string): void {
    if (this.selectedControlId === controlId) {
      return;
    }

    this.selectedControlId = controlId;
    this.loadMetricView(controlId);
  }

  selectMetric(metric: CanvasMetricItem): void {
    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
  }

  toggleGroupMetrics(groupType: MetricGroupType): void {
    const nextState = !this.expandedGroups[groupType];
    this.expandedGroups[groupType] = nextState;

    if (nextState) {
      const firstMetric =
        this.canvasGroups.find((group) => group.type === groupType)?.metrics[0] ?? null;

      if (firstMetric) {
        this.selectedMetric = firstMetric;
      }
    }
  }

  isGroupExpanded(groupType: MetricGroupType): boolean {
    return this.expandedGroups[groupType];
  }

  selectAssessment(level: AssessmentLevel): void {
    this.selectedAssessment = level;
  }

  updateNotes(value: string): void {
    this.notes = value;
  }

  saveAssessment(): void {
    console.log('saveAssessment', {
      controlId: this.selectedControlId,
      metricId: this.selectedMetric?.id ?? null,
      level: this.selectedAssessment,
      notes: this.notes
    });
  }

  goToNextControl(): void {
    if (!this.controls.length || !this.selectedControlId) {
      return;
    }

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

  goToMetricView(): void {
    this.router.navigate(['/']);
  }

  goToProgressStep(stepId: string): void {
    const metric = this.allMetrics.find((item) => item.id === stepId);
    if (!metric) {
      return;
    }

    this.selectedMetric = metric;
    this.expandedGroups[metric.groupType] = true;
    this.metricDetailOpen = true;
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

    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;
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

  get selectedMetricEvidenceText(): string {
    return (
      this.selectedMetric?.evidencesNode?.name ||
      this.selectedMetric?.details?.data?.['evidenzen'] ||
      this.selectedMetric?.rawNode.data?.['evidenzen'] ||
      'Keine Evidenzen vorhanden.'
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
}
