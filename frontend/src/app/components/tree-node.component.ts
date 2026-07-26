import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MetricTreeNode } from '../models/metric.models';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  @Input() node!: MetricTreeNode;
}
