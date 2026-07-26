import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricViewService } from './services/metric-view.service';
import { MetricTreeNode, MetricTreeResponse } from './models/metric-view.model';
import { TreeNodeComponent } from './components/tree-node.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private metricViewService = inject(MetricViewService);

  response: MetricTreeResponse | null = null;
  tree: MetricTreeNode | null = null;
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadMetricTree('8.3');
  }

  loadMetricTree(controlId: string): void {
    this.loading = true;
    this.errorMessage = null;

    this.metricViewService.getMetricTreeForControl(controlId).subscribe({
      next: (response) => {
        this.response = response;

        if (response.status === 'success') {
          this.tree = response.data;
        } else {
          this.tree = null;
          this.errorMessage = response.message;
        }

        this.loading = false;
      },
      error: () => {
        this.tree = null;
        this.loading = false;
        this.errorMessage = 'Backend nicht erreichbar oder CORS blockiert den Request.';
      }
    });
  }
}
