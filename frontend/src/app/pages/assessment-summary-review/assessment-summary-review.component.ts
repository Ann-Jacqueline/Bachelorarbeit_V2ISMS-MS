import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentSessionService } from '../../services/assessment-session.service';
import {
  ApiResponse,
  AssessmentApiService,
  MaturityDomainSummary,
  MaturityOverallSummary,
  MaturitySummaryData
} from '../../services/assessment-api.service';

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

  isLoading = false;
  errorMessage: string | null = null;
  summary: MaturitySummaryData | null = null;

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    const sessionId = this.assessmentSessionService.getSessionId();

    if (!sessionId) {
      this.errorMessage = 'Keine aktive Session gefunden.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.assessmentApiService.getSessionSummary(sessionId).subscribe({
      next: (response: ApiResponse<MaturitySummaryData>) => {
        if (response.status !== 'success' || !response.data) {
          this.summary = null;
          this.errorMessage = response.message || 'Die Summary konnte nicht geladen werden.';
          this.isLoading = false;
          return;
        }

        this.summary = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.summary = null;
        this.errorMessage = 'Fehler beim Laden der Summary.';
        this.isLoading = false;
      }
    });
  }

  goToMetricView(): void {
    this.router.navigate(['/']);
  }

 startNewAssessment(): void {
  this.assessmentSessionService.clearSession();
  this.router.navigate(['/']);
}
  formatMil(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'n/a';
    }

    return value.toFixed(2);
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

  get overall(): MaturityOverallSummary | null {
    return this.summary?.overall ?? null;
  }

  get domains(): MaturityDomainSummary[] {
    return this.summary?.domains ?? [];
  }

  get hasDomains(): boolean {
    return this.domains.length > 0;
  }
  get sessionStatusLabel(): string {
  if (!this.summary) {
    return '–';
  }

  return this.summary.status === 'completed' ? 'Abgeschlossen' : 'Aktiv';
}

get averageMilLevel(): string {
  return this.formatAverage(this.summary?.overall?.avg_mil_level ?? null);
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

formatAverage(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'n/a';
  }

  return value.toFixed(2);
}
}
