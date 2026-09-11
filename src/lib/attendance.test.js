import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHeadroom, attendancePercentage, projectIfAllRemainingAttended,
  projectAtCurrentRate, classifyRisk, summariseLectures,
} from './attendance.js';
import { RISK } from './constants.js';

describe('calculateHeadroom', () => {
  test('normal: partway through the semester', () => {
    // 30 scheduled, 80% needs 24 present. 18 attended of 20 held, 10 remain.
    assert.equal(calculateHeadroom(18, 20, 30), 4);
  });

  test('boundary: exactly at the threshold leaves no headroom', () => {
    // 30 scheduled, 24 required. 24 attended of 30 held.
    assert.equal(calculateHeadroom(24, 30, 30), 0);
  });

  test('boundary: threshold rounds up, never down', () => {
    // 33 scheduled, 80% = 26.4, so 27 must be attended.
    assert.equal(calculateHeadroom(27, 33, 33), 0);
    assert.equal(calculateHeadroom(26, 33, 33), -1);
  });

  test('negative result means the threshold can no longer be reached', () => {
    // 30 scheduled, 24 required, only 20 attended with every lecture held.
    assert.equal(calculateHeadroom(20, 30, 30), -4);
  });

  test('degenerate: no lectures held yet gives full headroom', () => {
    assert.equal(calculateHeadroom(0, 0, 30), 6);
  });

  test('degenerate: nothing scheduled cannot be computed', () => {
    assert.equal(calculateHeadroom(0, 0, 0), null);
  });

  test('rejects impossible inputs rather than guessing', () => {
    assert.equal(calculateHeadroom(21, 20, 30), null);  // attended more than held
    assert.equal(calculateHeadroom(5, 31, 30), null);   // held more than scheduled
    assert.equal(calculateHeadroom(-1, 20, 30), null);
    assert.equal(calculateHeadroom(1.5, 20, 30), null);
    assert.equal(calculateHeadroom(null, 20, 30), null);
  });

  test('honours a threshold the student has changed', () => {
    // 75% of 30 rounds up to 23 required; 18 attended plus 10 remaining leaves 5.
    assert.equal(calculateHeadroom(18, 20, 30, 75), 5);
  });
});

describe('attendancePercentage', () => {
  test('normal', () => assert.equal(attendancePercentage(18, 20), 90));
  test('degenerate: nothing held yet is not zero per cent', () => {
    assert.equal(attendancePercentage(0, 0), null);
  });
  test('perfect record', () => assert.equal(attendancePercentage(6, 6), 100));
});

describe('projections', () => {
  test('best case attends every remaining lecture', () => {
    assert.equal(projectIfAllRemainingAttended(18, 20, 30), (28 / 30) * 100);
  });
  test('current rate carries forward', () => {
    assert.equal(projectAtCurrentRate(18, 20, 30), 90);
  });
  test('current rate needs at least one lecture held', () => {
    assert.equal(projectAtCurrentRate(0, 0, 30), null);
  });
});

describe('classifyRisk', () => {
  test('returns a named state, never a colour', () => {
    assert.equal(classifyRisk(6), RISK.SAFE);
    assert.equal(classifyRisk(2), RISK.AT_RISK);
    assert.equal(classifyRisk(0), RISK.AT_RISK);
    assert.equal(classifyRisk(-1), RISK.BELOW);
    assert.equal(classifyRisk(null), RISK.UNKNOWN);
  });
});

describe('summariseLectures', () => {
  test('counts P as present', () => {
    const lectures = [
      { date: '2026-08-17', present: 'P' },
      { date: '2026-08-18', present: 'P' },
      { date: '2026-08-25', present: 'A' },
    ];
    assert.deepEqual(summariseLectures(lectures), { attended: 2, held: 3 });
  });
  test('degenerate: empty list', () => {
    assert.deepEqual(summariseLectures([]), { attended: 0, held: 0 });
  });
});
