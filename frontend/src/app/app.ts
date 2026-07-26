import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricViewService } from './services/metric-view.service';
import { ControlListItem, MetricTreeNode } from './models/metric.models';
import { TreeNodeComponent } from './components/tree-node.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
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

    this.metricViewService.getMetricViewForControl(controlId).subscribe({
      next: (response) => {
        this.metricTree = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Metric View.';
        this.metricTree = null;
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
}
