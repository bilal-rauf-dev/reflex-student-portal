import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCGPA, cgpaTrend, creditsRemaining } from './progress.js';

const r = (semesterId, code, grade, creditHours) => ({ semesterId, code, grade, creditHours });

describe('calculateCGPA', () => {
  test('normal: weighted by credit hours', () => {
    const records = [r('2024F', 'CS1002', 'B', 3), r('2024F', 'CL1002', 'A', 1)];
    // (3*3 + 4*1) / 4 = 3.25
    assert.equal(calculateCGPA(records), 3.25);
  });

  test('an F counts toward the GPA but earns no credit', () => {
    assert.equal(calculateCGPA([r('2024F', 'X', 'F', 3)]), 0);
  });

  test('status codes with no grade are excluded, not treated as zero', () => {
    const records = [r('2026F', 'MT1004', 'I', 3), r('2026F', 'CS2009', 'A', 3)];
    assert.equal(calculateCGPA(records), 4);
  });

  test('degenerate: first-year student with nothing graded', () => {
    assert.equal(calculateCGPA([]), null);
    assert.equal(calculateCGPA([r('2026F', 'CS2009', '-', 3)]), null);
  });
});

describe('cgpaTrend', () => {
  test('reports sgpa per semester and cgpa running', () => {
    const records = [
      r('2024F', 'A1', 'A', 3),
      r('2025S', 'B1', 'C', 3),
    ];
    const trend = cgpaTrend(records);
    assert.equal(trend.length, 2);
    assert.equal(trend[0].sgpa, 4);
    assert.equal(trend[0].cgpa, 4);
    assert.equal(trend[1].sgpa, 2);
    assert.equal(trend[1].cgpa, 3);
  });

  test('degenerate: no records', () => assert.deepEqual(cgpaTrend([]), []));
});

describe('creditsRemaining', () => {
  test('normal', () => {
    const records = [r('2024F', 'A1', 'A', 3), r('2024F', 'A2', 'B', 3)];
    const c = creditsRemaining(records, 130);
    assert.equal(c.earned, 6);
    assert.equal(c.remaining, 124);
  });

  test('a failed course earns no credit', () => {
    assert.equal(creditsRemaining([r('2024F', 'A1', 'F', 3)], 130).earned, 0);
  });

  test('never reports negative remaining credits', () => {
    assert.equal(creditsRemaining([r('2024F', 'A1', 'A', 140)], 130).remaining, 0);
  });

  test('refuses a nonsense requirement', () => {
    assert.equal(creditsRemaining([], 0), null);
  });
});
