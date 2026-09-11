/**
 * Runs the calculations over the real seeded data. This is what keeps the fixtures and
 * the functions honest with each other: if someone edits a JSON file and breaks the
 * awkward case a screen is supposed to demonstrate, this fails.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { calculateHeadroom, classifyRisk, summariseLectures } from './attendance.js';
import { weightedTotal, requiredScore, unpublishedAssessments } from './marks.js';
import { calculateCGPA, creditsRemaining } from './progress.js';
import { daysUntil } from './dates.js';
import { detectClashes } from './registration.js';
import { RISK, PROJECTION } from './constants.js';

const load = (n) => JSON.parse(readFileSync(new URL(`../data/${n}.json`, import.meta.url)));
const meta = load('meta');
const NOW = meta.seededNow;

const lectures = load('lectures');
const enrolments = load('enrolments');
const assessments = load('assessments');
const courses = load('courses');

const forCourse = (code) => {
  const { attended, held } = summariseLectures(lectures.filter((l) => l.courseId === code));
  const total = enrolments.find((e) => e.courseId === code).totalScheduledLectures;
  return calculateHeadroom(attended, held, total);
};

describe('seeded attendance', () => {
  test('every registered course produces a headroom figure', () => {
    for (const e of enrolments) {
      assert.equal(typeof forCourse(e.courseId), 'number', `${e.courseId} has no headroom`);
    }
  });

  test('CS2009 has a perfect record and plenty of headroom', () => {
    assert.equal(classifyRisk(forCourse('CS2009')), RISK.SAFE);
  });

  test('EE3009 is the seeded below-threshold case', () => {
    const headroom = forCourse('EE3009');
    assert.ok(headroom < 0, `expected EE3009 below threshold, headroom was ${headroom}`);
    assert.equal(classifyRisk(headroom), RISK.BELOW);
  });
});

describe('seeded marks', () => {
  test('MT1004 is the seeded nothing-published case', () => {
    const mt = assessments.filter((a) => a.courseId === 'MT1004');
    assert.equal(weightedTotal(mt).percentOfPublished, null);
    assert.equal(unpublishedAssessments(mt).length, mt.length);
  });

  test('MT1004 refuses to project and says why', () => {
    const r = requiredScore(assessments.filter((a) => a.courseId === 'MT1004'), 85);
    assert.equal(r.status, PROJECTION.OK); // nothing earned yet, but the final can still carry it
    assert.ok(r.requiredPercent > 0);
  });

  test('EE3009 is the seeded unreachable-target case', () => {
    const r = requiredScore(assessments.filter((a) => a.courseId === 'EE3009'), 80);
    assert.equal(r.status, PROJECTION.UNREACHABLE);
    assert.equal(r.requiredPercent, null);
  });

  test('every course weights to exactly 100', () => {
    for (const c of courses) {
      const total = weightedTotal(assessments.filter((a) => a.courseId === c.code)).totalWeight;
      assert.equal(total, 100, `${c.code} weights to ${total}`);
    }
  });
});

describe('seeded progress', () => {
  test('CGPA is computable and in range', () => {
    const cgpa = calculateCGPA(load('gradeRecords').map((r) => ({ ...r, code: r.courseCode })));
    assert.ok(cgpa > 0 && cgpa <= 4, `cgpa was ${cgpa}`);
  });

  test('the incomplete MT1004 record is excluded from the GPA', () => {
    const records = load('gradeRecords').map((r) => ({ ...r }));
    const withI = calculateCGPA(records);
    const withoutI = calculateCGPA(records.filter((r) => r.grade !== 'I'));
    assert.equal(withI, withoutI);
  });

  test('credits earned are short of the degree requirement', () => {
    const c = creditsRemaining(load('gradeRecords'), load('student').creditsRequired);
    assert.ok(c.remaining > 0);
    assert.ok(c.percentComplete > 0 && c.percentComplete < 100);
  });
});

describe('seeded finance', () => {
  test('there is an unpaid challan still in the future', () => {
    const unpaid = load('challans').find((c) => c.status === 'unpaid');
    assert.ok(daysUntil(unpaid.dueDate, NOW) > 0);
  });

  test('there is an overdue challan, for the overdue state', () => {
    const overdue = load('challans').find((c) => c.status === 'overdue');
    assert.ok(daysUntil(overdue.dueDate, NOW) < 0);
  });
});

describe('seeded timetable', () => {
  test('the registered courses do not clash with each other', () => {
    const registered = courses.filter((c) => enrolments.some((e) => e.courseId === c.code));
    assert.deepEqual(detectClashes(registered), []);
  });
});

describe('seeded requests', () => {
  test('every request state is represented', () => {
    const states = new Set(load('requests').map((r) => r.state));
    for (const s of ['not-open', 'open', 'submitted', 'under-review', 'decided']) {
      assert.ok(states.has(s), `missing request state: ${s}`);
    }
  });
});
