import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricTreeNode } from '../models/metric-view.model';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  @Input({ required: true }) node!: MetricTreeNode;

  isExpanded(): boolean {
    return this.node.expanded;
  }

  toggle(): void {
    if (this.node.children.length > 0) {
      this.node.expanded = !this.node.expanded;
    }
  }

  hasChildren(): boolean {
    return this.node.children && this.node.children.length > 0;
  }
}
