import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricViewService } from './services/metric-view.service';
import { ControlListItem, MetricTreeNode } from './models/metric.models';

interface CanvasMetricItem {
  id: string;
  name: string;
  score: number | null;
  details: MetricTreeNode | null;
  evidencesNode: MetricTreeNode | null;
  rawNode: MetricTreeNode;
}

interface CanvasGroup {
  id: string;
  title: string;
  type: 'verification' | 'validation';
  count: number;
  metrics: CanvasMetricItem[];
}

interface EvidenceTypeExplanation {
  code: string;
  label: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  private metricViewService = inject(MetricViewService);

  controls: ControlListItem[] = [];
  selectedControlId: string | null = null;
  metricTree: MetricTreeNode | null = null;

  isLoading = false;
  errorMessage: string | null = null;

  canvasGroups: CanvasGroup[] = [];
  selectedMetric: CanvasMetricItem | null = null;

  isEvidenceInfoExpanded = true;
  isEvidenceListExpanded = true;

  readonly evidenceIntroText =
    'Evidenzen beschreiben, auf welcher Beobachtungs- oder Nachweisbasis eine Maßnahme bewertet wird. ' +
    'Evidenzarten strukturieren dabei die Herkunft des Nachweises, zum Beispiel Logs, Konfigurationen, Beobachtungen, Interviews oder Policy-Dokumente. ' +
    'Beispiel-Assets konkretisieren, an welchem System, Artefakt oder Dokument die Evidenz sichtbar wird, etwa in SIEM-Logs, IAM-Konfigurationen, Richtlinien oder Gesprächsnotizen.';

  readonly evidenceTypeExplanations: EvidenceTypeExplanation[] = [
    {
      code: 'LOGS',
      label: 'Logs',
      text: 'Maschinell erzeugte Ereignis- und Protokolldaten, zum Beispiel aus SIEM-, IAM- oder Systemquellen.'
    },
    {
      code: 'KONFIG',
      label: 'Config',
      text: 'Konfigurationsstände und technische Einstellungen in Anwendungen, Plattformen oder Diensten.'
    },
    {
      code: 'BEOBACHTUNG',
      label: 'Beobachtung',
      text: 'Direkt beobachtbare Umsetzungen in Prozessen, Abläufen oder Bedienhandlungen.'
    },
    {
      code: 'INTERVIEWS',
      label: 'Interview',
      text: 'Aussagen und Einordnungen aus Gesprächen mit verantwortlichen Rollen oder Beteiligten.'
    },
    {
      code: 'POLICY_DOKUMENTE',
      label: 'Policy-Dokumente',
      text: 'Richtlinien, Vorgaben, Arbeitsanweisungen und formale Nachweisdokumente.'
    }
  ];

  ngOnInit(): void {
    this.loadControls();
  }

  loadControls(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.metricViewService.getControls().subscribe({
      next: (response) => {
        this.controls = response.data;

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
    this.isEvidenceInfoExpanded = true;
    this.isEvidenceListExpanded = true;

    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.buildCanvasViewModel();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Metric View.';
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.isLoading = false;
      }
    });
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
    this.isEvidenceListExpanded = true;
  }

  toggleEvidenceInfo(): void {
    this.isEvidenceInfoExpanded = !this.isEvidenceInfoExpanded;
  }

  toggleEvidenceList(): void {
    this.isEvidenceListExpanded = !this.isEvidenceListExpanded;
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
        const metrics = (groupNode.children ?? [])
          .filter((child) => child.node_type === 'metric')
          .map((metricNode) => this.mapMetricNode(metricNode));

        return {
          id: groupNode.id,
          title: groupNode.name,
          type: groupNode.id.includes('verification') ? 'verification' : 'validation',
          count: metrics.length,
          metrics
        } as CanvasGroup;
      });

    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;
  }

  private mapMetricNode(metricNode: MetricTreeNode): CanvasMetricItem {
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
      rawNode: metricNode
    };
  }

  get controlDescription(): string {
    return this.metricTree?.data?.['beschreibung'] ?? '';
  }

  get selectedMetricDescription(): string {
    return this.selectedMetric?.details?.data?.['beschreibung'] ?? 'Keine Beschreibung vorhanden.';
  }

  get selectedMetricFormula(): string {
    return this.selectedMetric?.details?.data?.['formel'] ?? 'Keine Formel vorhanden.';
  }

  get selectedEvidenceItems(): MetricTreeNode[] {
    return this.selectedMetric?.evidencesNode?.children ?? [];
  }

  formatScore(score: number | null): string {
    if (score === null || Number.isNaN(score)) {
      return 'n/a';
    }

    return `${(score * 100).toFixed(1)}%`;
  }

  formatEvidenceType(code: string | undefined): string {
    if (!code) {
      return 'n/a';
    }

    return code.replace(/_/g, ' ');
  }
}
