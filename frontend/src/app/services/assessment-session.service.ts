import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AssessmentLevel = 0 | 1 | 2 | 3;

export interface ControlAnswerPayload {
  assessment_level: AssessmentLevel | null;
  notes?: string | null;
}

export interface ControlSubmitPayload {
  control_id: string;
  answers: ControlAnswerPayload[];
}

export interface SubmitSessionPayload {
  controls: ControlSubmitPayload[];
}

export interface AssessmentAnswer {
  sessionId: string;
  controlId: string;
  metricId: string;
  assessmentLevel: AssessmentLevel | null;
  notes: string;
  updatedAt: string;
  saved: boolean;
}

export interface AssessmentControlPacket {
  sessionId: string;
  controlId: string;
  completed: boolean;
  updatedAt: string;
  answers: AssessmentAnswer[];
}

export interface AssessmentSessionState {
  sessionId: string | null;
  currentControlId: string | null;
  currentMetricId: string | null;
  answersByMetricId: Record<string, AssessmentAnswer>;
  controlPacketsByControlId: Record<string, AssessmentControlPacket>;
}

@Injectable({
  providedIn: 'root'
})
export class AssessmentSessionService {
  private readonly initialState: AssessmentSessionState = {
    sessionId: null,
    currentControlId: null,
    currentMetricId: null,
    answersByMetricId: {},
    controlPacketsByControlId: {}
  };

  private readonly stateSubject = new BehaviorSubject<AssessmentSessionState>(
    this.initialState
  );

  readonly state$: Observable<AssessmentSessionState> = this.stateSubject.asObservable();

  get snapshot(): AssessmentSessionState {
    return this.stateSubject.value;
  }

  startSession(sessionId?: string): string {
    const nextSessionId = sessionId ?? this.generateSessionId();

    this.patchState({
      sessionId: nextSessionId
    });

    return nextSessionId;
  }

  ensureSession(): string {
    return this.snapshot.sessionId ?? this.startSession();
  }

  getSessionId(): string | null {
    return this.snapshot.sessionId;
  }

  setCurrentContext(controlId: string | null, metricId: string | null): void {
    this.patchState({
      currentControlId: controlId,
      currentMetricId: metricId
    });
  }

  upsertDraft(
    controlId: string,
    metricId: string,
    assessmentLevel: AssessmentLevel | null,
    notes: string
  ): AssessmentAnswer {
    const sessionId = this.ensureSession();
    const existing = this.snapshot.answersByMetricId[metricId];

    const answer: AssessmentAnswer = {
      sessionId,
      controlId,
      metricId,
      assessmentLevel,
      notes,
      updatedAt: new Date().toISOString(),
      saved: existing?.saved ?? false
    };

    this.patchAnswer(answer);
    this.setCurrentContext(controlId, metricId);
    this.refreshControlPacket(controlId);

    return answer;
  }

  saveAnswer(
    controlId: string,
    metricId: string,
    assessmentLevel: AssessmentLevel | null,
    notes: string
  ): AssessmentAnswer {
    const sessionId = this.ensureSession();

    const answer: AssessmentAnswer = {
      sessionId,
      controlId,
      metricId,
      assessmentLevel,
      notes,
      updatedAt: new Date().toISOString(),
      saved: true
    };

    this.patchAnswer(answer);
    this.setCurrentContext(controlId, metricId);
    this.refreshControlPacket(controlId);

    return answer;
  }

  getAnswer(metricId: string): AssessmentAnswer | null {
    return this.snapshot.answersByMetricId[metricId] ?? null;
  }

  hasSavedAnswer(metricId: string): boolean {
    return !!this.snapshot.answersByMetricId[metricId]?.saved;
  }

  removeAnswer(metricId: string): void {
    const existing = this.snapshot.answersByMetricId[metricId];
    const answersByMetricId = { ...this.snapshot.answersByMetricId };
    delete answersByMetricId[metricId];

    this.patchState({
      answersByMetricId,
      currentMetricId:
        this.snapshot.currentMetricId === metricId ? null : this.snapshot.currentMetricId
    });

    if (existing) {
      this.refreshControlPacket(existing.controlId);
    }
  }

  getAllControlPackets(): AssessmentControlPacket[] {
    return Object.values(this.snapshot.controlPacketsByControlId);
  }

  saveCurrentControlPacket(controlId: string, completed = true): AssessmentControlPacket {
    return this.refreshControlPacket(controlId, completed);
  }

  buildFinalSubmissionPayload(): {
    sessionId: string | null;
    controls: Array<{
      control_id: string;
      completed: boolean;
      updated_at: string;
      answers: Array<{
        metric_id: string;
        assessment_level: AssessmentLevel | null;
        notes: string;
        updated_at: string;
      }>;
    }>;
  } {
    return {
      sessionId: this.snapshot.sessionId,
      controls: this.getAllControlPackets().map((packet) => ({
        control_id: packet.controlId,
        completed: packet.completed,
        updated_at: packet.updatedAt,
        answers: packet.answers.map((answer) => ({
          metric_id: answer.metricId,
          assessment_level: answer.assessmentLevel,
          notes: answer.notes,
          updated_at: answer.updatedAt
        }))
      }))
    };
  }

  clearSession(): void {
    this.stateSubject.next({ ...this.initialState });
  }

  private getAnswersForControl(controlId: string): AssessmentAnswer[] {
    return Object.values(this.snapshot.answersByMetricId).filter(
      (answer) => answer.controlId === controlId
    );
  }

  private refreshControlPacket(
    controlId: string,
    completed?: boolean
  ): AssessmentControlPacket {
    const sessionId = this.ensureSession();
    const answers = this.getAnswersForControl(controlId).sort((a, b) =>
      a.metricId.localeCompare(b.metricId)
    );

    const existingPacket = this.snapshot.controlPacketsByControlId[controlId];

    const packet: AssessmentControlPacket = {
      sessionId,
      controlId,
      completed: completed ?? existingPacket?.completed ?? false,
      updatedAt: new Date().toISOString(),
      answers
    };

    this.patchState({
      controlPacketsByControlId: {
        ...this.snapshot.controlPacketsByControlId,
        [controlId]: packet
      }
    });

    return packet;
  }

  private patchAnswer(answer: AssessmentAnswer): void {
    this.patchState({
      answersByMetricId: {
        ...this.snapshot.answersByMetricId,
        [answer.metricId]: answer
      }
    });
  }

  private patchState(patch: Partial<AssessmentSessionState>): void {
    this.stateSubject.next({
      ...this.snapshot,
      ...patch
    });
  }

  private generateSessionId(): string {
    const randomPart = Math.random().toString(36).slice(2, 10);
    return `assessment-${Date.now()}-${randomPart}`;
  }
}
