import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetricViewService } from '../../services/metric-view.service';
import { ControlListItem, MetricTreeNode } from '../../models/metric.models';

interface CanvasMetricItem {
  id: string;
  name: string;
  score: number | null;
  details: MetricTreeNode | null;
  evidencesNode: MetricTreeNode | null;
  rawNode: MetricTreeNode;
  groupType: 'verification' | 'validation';
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

type PanelKey = 'profile' | 'evidence' | 'verification' | 'validation';
type EvidenceSectionKey = 'info' | 'items' | null;
type ConnectorKey = 'profile' | 'evidence' | 'verification' | 'validation';

interface ConnectorPoint {
  x: number;
  y: number;
}

interface ConnectorModel {
  start: ConnectorPoint;
  end: ConnectorPoint;
  control: ConnectorPoint;
}

@Component({
  selector: 'app-metric-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-view.component.html',
  styleUrl: './metric-view.component.scss'
})
export class MetricViewComponent implements OnInit, AfterViewInit {
  private metricViewService = inject(MetricViewService);
  private router = inject(Router);

  @ViewChild('canvasScene') canvasSceneRef?: ElementRef<HTMLElement>;
  @ViewChild('centerNode') centerNodeRef?: ElementRef<HTMLElement>;
  @ViewChild('profilePanel') profilePanelRef?: ElementRef<HTMLElement>;
  @ViewChild('evidencePanel') evidencePanelRef?: ElementRef<HTMLElement>;
  @ViewChildren('groupPanel') groupPanelRefs?: QueryList<ElementRef<HTMLElement>>;

  controls: ControlListItem[] = [];
  selectedControlId: string | null = null;
  metricTree: MetricTreeNode | null = null;

  isLoading = false;
  errorMessage: string | null = null;

  canvasGroups: CanvasGroup[] = [];
  selectedMetric: CanvasMetricItem | null = null;

  evidenceOpenSection: EvidenceSectionKey = 'info';

  expandedMetricIds = new Set<string>();

  panelVisibility: Record<PanelKey, boolean> = {
    profile: true,
    evidence: true,
    verification: true,
    validation: true
  };

  connectors: Record<ConnectorKey, ConnectorModel | null> = {
    profile: null,
    evidence: null,
    verification: null,
    validation: null
  };

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

  readonly verificationInfoText =
    'Verifikationsmetriken messen, ob eine Maßnahme technisch korrekt und gemäß ihrer vorgesehenen Spezifikation umgesetzt wurde. Sie liefern in der Regel objektivierbare, direkt messbare Ergebnisse und beantworten die Frage, ob die Maßnahme vorhanden und korrekt konfiguriert ist.';

  readonly validationInfoText =
    'Validierungsmetriken messen, ob eine Maßnahme ihren beabsichtigten Schutzzweck unter realen Bedingungen erfüllt. Sie sind häufig wirkungsorientiert, kontextabhängig und beantworten die Frage, ob die Maßnahme tatsächlich zur Risikoreduktion oder Schutzwirkung beiträgt.';

  ngOnInit(): void {
    this.loadControls();
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.updateConnectors());

    this.groupPanelRefs?.changes.subscribe(() => {
      setTimeout(() => this.updateConnectors());
    });
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateConnectors();
  }

  goToMaturityEvaluator(): void {
    this.router.navigate(['/maturity-assessment']);
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
    this.evidenceOpenSection = 'info';
    this.expandedMetricIds.clear();
    this.panelVisibility = {
      profile: true,
      evidence: true,
      verification: true,
      validation: true
    };
    this.resetConnectors();

    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.buildCanvasViewModel();
        this.isLoading = false;
        setTimeout(() => this.updateConnectors());
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Metric View.';
        this.metricTree = null;
        this.canvasGroups = [];
        this.selectedMetric = null;
        this.evidenceOpenSection = 'info';
        this.expandedMetricIds.clear();
        this.resetConnectors();
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
    this.evidenceOpenSection = 'info';
    setTimeout(() => this.updateConnectors());
  }

  toggleEvidenceSection(section: 'info' | 'items'): void {
    this.evidenceOpenSection = this.evidenceOpenSection === section ? null : section;
    setTimeout(() => this.updateConnectors());
  }

  isEvidenceSectionOpen(section: 'info' | 'items'): boolean {
    return this.evidenceOpenSection === section;
  }

  toggleMetricDetails(metric: CanvasMetricItem): void {
    const idsInSameGroup = this.canvasGroups
      .find((group) => group.type === metric.groupType)
      ?.metrics.map((item) => item.id) ?? [];

    idsInSameGroup.forEach((id) => {
      if (id !== metric.id) {
        this.expandedMetricIds.delete(id);
      }
    });

    if (this.expandedMetricIds.has(metric.id)) {
      this.expandedMetricIds.delete(metric.id);
    } else {
      this.expandedMetricIds.add(metric.id);
      this.selectedMetric = metric;
    }

    setTimeout(() => this.updateConnectors());
  }

  isMetricExpanded(metricId: string): boolean {
    return this.expandedMetricIds.has(metricId);
  }

  getGroupInfoText(group: CanvasGroup): string {
    return group.type === 'verification'
      ? this.verificationInfoText
      : this.validationInfoText;
  }

  togglePanel(panel: PanelKey): void {
    this.panelVisibility[panel] = !this.panelVisibility[panel];
    setTimeout(() => this.updateConnectors());
  }

  isPanelVisible(panel: PanelKey): boolean {
    return this.panelVisibility[panel];
  }

  toggleGroup(groupType: 'verification' | 'validation'): void {
    this.panelVisibility[groupType] = !this.panelVisibility[groupType];

    if (!this.panelVisibility[groupType]) {
      const ids = this.canvasGroups
        .find((group) => group.type === groupType)
        ?.metrics.map((metric) => metric.id) ?? [];

      ids.forEach((id) => this.expandedMetricIds.delete(id));

      if (this.selectedMetric?.groupType === groupType) {
        this.selectedMetric = null;
      }
    }

    setTimeout(() => this.updateConnectors());
  }

  getConnectorPath(key: ConnectorKey): string {
    const connector = this.connectors[key];

    if (!connector) {
      return '';
    }

    const { start, end, control } = connector;
    return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
  }

  getConnectorPointStyle(key: ConnectorKey): Record<string, string> {
    const connector = this.connectors[key];

    if (!connector) {
      return { display: 'none' };
    }

    return {
      left: `${connector.end.x}px`,
      top: `${connector.end.y}px`
    };
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
        const groupType: 'verification' | 'validation' =
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
        } as CanvasGroup;
      });

    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;
  }

  private mapMetricNode(
    metricNode: MetricTreeNode,
    groupType: 'verification' | 'validation'
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

  private updateConnectors(): void {
    const sceneEl = this.canvasSceneRef?.nativeElement;
    const centerEl = this.centerNodeRef?.nativeElement;

    if (!sceneEl || !centerEl) {
      this.resetConnectors();
      return;
    }

    const isMobileLayout = window.innerWidth <= 1450;
    if (isMobileLayout) {
      this.resetConnectors();
      return;
    }

    const sceneRect = sceneEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();

    const profileEl = this.panelVisibility.profile ? this.profilePanelRef?.nativeElement : undefined;
    const evidenceEl = this.panelVisibility.evidence ? this.evidencePanelRef?.nativeElement : undefined;

    const groupElements = this.groupPanelRefs?.toArray().map((ref) => ref.nativeElement) ?? [];
    const verificationEl = this.panelVisibility.verification
      ? groupElements.find((el) => el.dataset['groupType'] === 'verification')
      : undefined;
    const validationEl = this.panelVisibility.validation
      ? groupElements.find((el) => el.dataset['groupType'] === 'validation')
      : undefined;

    this.connectors.profile = profileEl
      ? this.buildConnector(sceneRect, centerRect, profileEl.getBoundingClientRect(), 'left', 26)
      : null;

    this.connectors.evidence = evidenceEl
      ? this.buildConnector(sceneRect, centerRect, evidenceEl.getBoundingClientRect(), 'left', 26)
      : null;

    this.connectors.verification = verificationEl
      ? this.buildConnector(sceneRect, centerRect, verificationEl.getBoundingClientRect(), 'right', 26)
      : null;

    this.connectors.validation = validationEl
      ? this.buildConnector(sceneRect, centerRect, validationEl.getBoundingClientRect(), 'right', 26)
      : null;
  }

  private buildConnector(
    sceneRect: DOMRect,
    centerRect: DOMRect,
    targetRect: DOMRect,
    side: 'left' | 'right',
    gap: number
  ): ConnectorModel {
    const center = {
      x: centerRect.left - sceneRect.left + centerRect.width / 2,
      y: centerRect.top - sceneRect.top + centerRect.height / 2
    };

    const radius = Math.min(centerRect.width, centerRect.height) / 2 + 12;

    const target = {
      x:
        side === 'left'
          ? targetRect.right - sceneRect.left + gap
          : targetRect.left - sceneRect.left - gap,
      y: targetRect.top - sceneRect.top + targetRect.height / 2
    };

    const dx = target.x - center.x;
    const dy = target.y - center.y;
    const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

    const start = {
      x: center.x + (dx / distance) * radius,
      y: center.y + (dy / distance) * radius
    };

    const curveOffset = Math.min(120, Math.max(70, Math.abs(dx) * 0.18));

    const control = {
      x: center.x + dx * 0.5,
      y: center.y + dy * 0.5 + (side === 'left' ? -curveOffset * 0.22 : curveOffset * 0.12)
    };

    return {
      start,
      end: target,
      control
    };
  }

  private resetConnectors(): void {
    this.connectors = {
      profile: null,
      evidence: null,
      verification: null,
      validation: null
    };
  }

  get controlDescription(): string {
    return this.metricTree?.data?.['beschreibung'] ?? '';
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

  resetCanvasView(): void {
    this.panelVisibility = {
      profile: true,
      evidence: true,
      verification: true,
      validation: true
    };

    this.evidenceOpenSection = 'info';
    this.expandedMetricIds.clear();

    this.selectedMetric = this.canvasGroups.flatMap((group) => group.metrics)[0] ?? null;

    setTimeout(() => this.updateConnectors());
  }
}
