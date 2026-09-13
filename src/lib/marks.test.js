import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { weightedTotal, requiredScore, unpublishedAssessments } from './marks.js';
import { PROJECTION } from './constants.js';

const published = (name, weight, obtained, max) =>
  ({ name, weight, obtainedScore: obtained, maxScore: max, publishedAt: '2026-09-01' });
const pending = (name, weight, max) =>
  ({ name, weight, obtainedScore: null, maxScore: max, publishedAt: null });

describe('weightedTotal', () => {
  test('normal: some published, some not', () => {
    const a = [published('Quiz 1', 10, 8, 10), published('Mid', 30, 21, 30), pending('Final', 60, 100)];
    const t = weightedTotal(a);
    assert.equal(t.publishedWeight, 40);
    assert.equal(t.totalWeight, 100);
    assert.equal(t.earnedWeight, 8 + 21);   // 80% of 10, then 70% of 30
    assert.equal(t.percentOfPublished, 72.5);
    assert.equal(t.hasUnpublished, true);
  });

  test('an unpublished assessment is NOT a zero', () => {
    const withPending = weightedTotal([published('Quiz 1', 10, 10, 10), pending('Final', 90, 100)]);
    const alone      = weightedTotal([published('Quiz 1', 10, 10, 10)]);
    assert.equal(withPending.percentOfPublished, alone.percentOfPublished);
    assert.equal(withPending.percentOfPublished, 100);
  });

  test('degenerate: nothing published yet', () => {
    const t = weightedTotal([pending('Quiz 1', 10, 10)]);
    assert.equal(t.percentOfPublished, null);
    assert.equal(t.publishedWeight, 0);
  });

  test('rejects a zero maximum rather than dividing by it', () => {
    assert.equal(weightedTotal([published('Broken', 10, 0, 0)]), null);
  });
});

describe('requiredScore', () => {
  test('normal: says what is needed in the final', () => {
    const a = [published('Quiz 1', 10, 8, 10), published('Mid', 30, 21, 30), pending('Final', 60, 100)];
    const r = requiredScore(a, 85);
    assert.equal(r.status, PROJECTION.OK);
    // needs 85 - 29 = 56 of the remaining 60 weight
    assert.equal(Math.round(r.requiredPercent * 100) / 100, 93.33);
  });

  test('boundary: exactly 100 per cent is still reachable', () => {
    const a = [published('Mid', 50, 25, 50), pending('Final', 50, 100)];
    const r = requiredScore(a, 75);
    assert.equal(r.status, PROJECTION.OK);
    assert.equal(r.requiredPercent, 100);
  });

  test('unreachable targets return no number at all', () => {
    const a = [published('Mid', 50, 25, 50), pending('Final', 50, 100)];
    const r = requiredScore(a, 90);
    assert.equal(r.status, PROJECTION.UNREACHABLE);
    assert.equal(r.requiredPercent, null);
  });

  test('already secured targets ask for nothing, not a negative number', () => {
    const a = [published('Mid', 50, 50, 50), pending('Final', 50, 100)];
    const r = requiredScore(a, 40);
    assert.equal(r.status, PROJECTION.OK);
    assert.equal(r.requiredPercent, 0);
  });

  test('degenerate: nothing left to sit', () => {
    const a = [published('Mid', 50, 25, 50), published('Final', 50, 40, 50)];
    assert.equal(requiredScore(a, 90).status, PROJECTION.NOTHING_REMAINING);
  });

  test('a nonsense target is refused, not clamped', () => {
    assert.equal(requiredScore([pending('Final', 100, 100)], 150).status, PROJECTION.INSUFFICIENT_DATA);
  });
});

describe('unpublishedAssessments', () => {
  test('names what is missing so the UI can say who publishes it', () => {
    const a = [published('Quiz 1', 10, 8, 10), pending('Quiz 2', 10, 10)];
    assert.deepEqual(unpublishedAssessments(a).map((x) => x.name), ['Quiz 2']);
  });
});
