import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/metric-view/metric-view.component').then(
        (m) => m.MetricViewComponent
      )
  },
  {
    path: 'maturity-assessment',
    loadComponent: () =>
      import('./pages/maturity-assessment/maturity-assessment.component').then(
        (m) => m.MaturityAssessmentComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
