import { AssessmentSessionService } from './assessment-session.service';

describe('AssessmentSessionService.buildFinalSubmissionPayload', () => {
  let service: AssessmentSessionService;

  beforeEach(() => {
    service = new AssessmentSessionService();
    service.startSession('sess-test');
  });

  it('excludes unsaved drafts (Maturity Evaluator is the source of truth)', () => {
    service.upsertDraft('5.12', 'm-5-12-1', 2, 'Entwurf ohne Speichern');
    service.saveAnswer('5.12', 'm-5-12-2', 3, 'Gespeicherte Antwort');

    const payload = service.buildFinalSubmissionPayload();
    const answers = payload.controls[0].answers;

    expect(answers.map((answer) => answer.metric_id)).toEqual(['m-5-12-2']);
    expect(answers[0].saved).toBe(true);
    expect(answers[0].assessment_level).toBe(3);
  });

  it('excludes saved answers without a MIL level', () => {
    service.saveAnswer('6.3', 'm-6-3-1', null, 'Level entfernt');

    const payload = service.buildFinalSubmissionPayload();

    expect(payload.controls[0].answers).toEqual([]);
  });

  it('keeps every saved answer and stamps the hardening flag', () => {
    service.saveAnswer('5.12', 'm-5-12-1', 2, 'a');
    service.saveAnswer('5.12', 'm-5-12-2', 1, 'b');

    const payload = service.buildFinalSubmissionPayload();
    const answers = payload.controls[0].answers;

    expect(answers).toHaveLength(2);
    expect(answers.every((answer) => answer.saved === true)).toBe(true);
    expect(payload.fill_missing_with_zero).toBe(false);
  });
});
