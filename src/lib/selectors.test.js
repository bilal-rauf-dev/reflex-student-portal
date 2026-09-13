import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  buildCourseAttendance, buildAttendanceList, buildCourseMarks,
  buildFinanceTimeline, buildRequestsInbox, buildProgress, buildDashboard, buildSyncLabel,
} from './selectors.js';
import { RISK, PROJECTION } from './constants.js';
import { placeholdersIn } from './i18n.js';

const load = (n) => JSON.parse(readFileSync(new URL(`../data/${n}.json`, import.meta.url)));
const en = JSON.parse(readFileSync(new URL('../locales/en.json', import.meta.url)));
const data = {
  meta: load('meta'), student: load('student'), courses: load('courses'),
  lectures: load('lectures'), enrolments: load('enrolments'), assessments: load('assessments'),
  challans: load('challans'), requests: load('requests'), semesters: load('semesters'),
  notifications: load('notifications'), gradeRecords: load('gradeRecords'),
};
const NOW = data.meta.seededNow;
const course = (code) => data.courses.find((c) => c.code === code);
const enrol = (code) => data.enrolments.find((e) => e.courseId === code);

/** Every message a selector emits must exist in en.json and supply all its placeholders. */
const assertRenderable = (m, where) => {
  if (m === null || m === undefined) return;
  assert.ok(typeof m.key === 'string', `${where}: not a message object`);
  assert.ok(en[m.key] !== undefined, `${where}: key missing from en.json -> ${m.key}`);
  for (const p of placeholdersIn(en[m.key])) {
    assert.ok(Object.prototype.hasOwnProperty.call(m.values ?? {}, p),
      `${where}: ${m.key} needs {${p}} but the selector did not supply it`);
  }
};

describe('buildCourseAttendance', () => {
  test('a safe course leads with the headroom sentence', () => {
    const v = buildCourseAttendance(course('CS2009'), data.lectures, enrol('CS2009'));
    assert.equal(v.risk, RISK.SAFE);
    assert.equal(v.headline.key, 'attendance.headroom.many');
    assert.equal(v.headline.values.count, v.headroom);
    assert.equal(v.nextStep, null);
  });

  test('a below-threshold course offers a next step', () => {
    const v = buildCourseAttendance(course('EE3009'), data.lectures, enrol('EE3009'));
    assert.equal(v.risk, RISK.BELOW);
    assert.equal(v.headline.key, 'attendance.headroom.below.many');
    assert.equal(v.nextStep.key, 'attendance.belowThreshold.nextStep');
  });

  test('singular and zero cases use their own sentences', () => {
    // 30 scheduled, all held, 80% needs 24 present.
    const log = (present, total = 30) => Array.from({ length: total }, (_, i) => (
      { courseId: 'X', present: i < present ? 'P' : 'A' }));

    const one = buildCourseAttendance({ code: 'X', title: 'X' }, log(25), { totalScheduledLectures: 30 });
    assert.equal(one.headroom, 1);
    assert.equal(one.headline.key, 'attendance.headroom.one');

    const none = buildCourseAttendance({ code: 'X', title: 'X' }, log(24), { totalScheduledLectures: 30 });
    assert.equal(none.headroom, 0);
    assert.equal(none.headline.key, 'attendance.headroom.none');

    const short = buildCourseAttendance({ code: 'X', title: 'X' }, log(23), { totalScheduledLectures: 30 });
    assert.equal(short.headroom, -1);
    assert.equal(short.headline.key, 'attendance.headroom.below.one');
  });

  test('degenerate: no classes held yet is an empty state, not a zero', () => {
    const v = buildCourseAttendance({ code: 'X', title: 'X' }, [], { totalScheduledLectures: 30 });
    assert.equal(v.isEmpty, true);
    assert.equal(v.headline.key, 'attendance.empty.course');
  });
});

describe('buildAttendanceList', () => {
  test('sorts the courses that need attention to the top', () => {
    const list = buildAttendanceList(data.courses, data.lectures, data.enrolments);
    assert.equal(list[0].code, 'EE3009');
    const risks = list.map((c) => c.risk);
    assert.ok(risks.indexOf(RISK.SAFE) > risks.lastIndexOf(RISK.AT_RISK));
  });
});

describe('buildCourseMarks', () => {
  test('a course with nothing published says so instead of showing 0%', () => {
    const v = buildCourseMarks(course('MT1004'), data.assessments, 80);
    assert.equal(v.isEmpty, true);
    assert.equal(v.headline.key, 'marks.empty.course');
  });

  test('an unreachable target produces no number and a next step', () => {
    const v = buildCourseMarks(course('EE3009'), data.assessments, 80);
    assert.equal(v.projection.status, PROJECTION.UNREACHABLE);
    assert.equal(v.projection.requiredPercent, null);
    assert.equal(v.projection.nextStep.key, 'marks.projection.unreachable.nextStep');
  });

  test('no target selected means no projection at all', () => {
    assert.equal(buildCourseMarks(course('CS2009'), data.assessments).projection, null);
  });
});

describe('buildFinanceTimeline', () => {
  test('separates outstanding from paid and flags the overdue one', () => {
    const f = buildFinanceTimeline(data.challans, NOW);
    assert.equal(f.outstanding.length, 2);
    assert.ok(f.outstanding.some((c) => c.isOverdue));
  });

  test('degenerate: nothing at all', () => {
    const f = buildFinanceTimeline([], NOW);
    assert.equal(f.isEmpty, true);
    assert.equal(f.emptyMessage.key, 'fees.empty.noHistory');
  });

  test('a settled account gets a positive empty state, not a blank screen', () => {
    const paid = data.challans.filter((c) => c.status === 'paid');
    assert.equal(buildFinanceTimeline(paid, NOW).emptyMessage.key, 'fees.empty.nothingDue');
  });
});

describe('buildRequestsInbox', () => {
  test('every row carries an explicit state', () => {
    const inbox = buildRequestsInbox(data.requests);
    assert.equal(inbox.rows.length, 5);
    for (const r of inbox.rows) assert.ok(r.stateLabel.key.startsWith('requests.state.'));
  });
  test('a not-open request says when it opens', () => {
    const row = buildRequestsInbox(data.requests).rows.find((r) => r.state === 'not-open');
    assert.equal(row.detail.key, 'requests.state.not-open.detail');
  });
});

describe('buildProgress', () => {
  test('normal', () => {
    const p = buildProgress(data.gradeRecords, data.student.creditsRequired);
    assert.equal(p.isEmpty, false);
    assert.ok(p.cgpa > 0 && p.cgpa <= 4);
    assert.equal(p.trendMessage, null);
  });
  test('degenerate: a first-year student sees an explanation, not an empty table', () => {
    const p = buildProgress([], 130);
    assert.equal(p.isEmpty, true);
    assert.equal(p.headline.key, 'progress.empty.noSemesters');
  });
});

describe('buildDashboard', () => {
  test('surfaces at-risk courses, the next fee and the registration state', () => {
    const d = buildDashboard(data, NOW);
    assert.ok(d.atRisk.length >= 1);
    assert.ok(d.nextDue !== null);
    assert.ok(d.registration.key.startsWith('registration.window.'));
    assert.equal(d.nothingNeedsAttention, false);
  });

  test('a quiet day gets a positive empty state', () => {
    const quiet = {
      ...data,
      lectures: [], enrolments: [], challans: [], notifications: [],
      semesters: [{ id: '2027S', isCurrent: true, registrationWindow: null }],
    };
    const d = buildDashboard(quiet, NOW);
    assert.equal(d.nothingNeedsAttention, true);
    assert.equal(d.nothingMessage.key, 'home.nothingNeedsAttention');
  });
});

describe('buildSyncLabel', () => {
  test('picks today, yesterday or a count', () => {
    assert.equal(buildSyncLabel('2026-10-26', NOW).key, 'common.lastSynced.today');
    assert.equal(buildSyncLabel('2026-10-25', NOW).key, 'common.lastSynced.yesterday');
    assert.equal(buildSyncLabel('2026-10-20', NOW).key, 'common.lastSynced.days');
  });
});

describe('every selector message is renderable', () => {
  test('no missing key and no missing placeholder anywhere', () => {
    const d = buildDashboard(data, NOW);
    assertRenderable(d.greeting, 'dashboard.greeting');
    assertRenderable(d.registration, 'dashboard.registration');
    assertRenderable(d.nothingMessage, 'dashboard.nothing');
    assertRenderable(d.nextDue?.message, 'dashboard.nextDue');

    for (const c of buildAttendanceList(data.courses, data.lectures, data.enrolments)) {
      assertRenderable(c.headline, `attendance.${c.code}.headline`);
      assertRenderable(c.secondary, `attendance.${c.code}.secondary`);
      assertRenderable(c.projection, `attendance.${c.code}.projection`);
      assertRenderable(c.nextStep, `attendance.${c.code}.nextStep`);
    }

    for (const e of data.enrolments) {
      const m = buildCourseMarks(data.courses.find((c) => c.code === e.courseId), data.assessments, 80);
      assertRenderable(m.headline, `marks.${m.code}.headline`);
      assertRenderable(m.pendingMessage, `marks.${m.code}.pending`);
      assertRenderable(m.projection?.message, `marks.${m.code}.projection`);
      assertRenderable(m.projection?.nextStep, `marks.${m.code}.nextStep`);
    }

    for (const row of buildFinanceTimeline(data.challans, NOW).rows) assertRenderable(row.message, 'fees');
    for (const row of buildRequestsInbox(data.requests).rows) {
      assertRenderable(row.typeLabel, 'requests.type');
      assertRenderable(row.stateLabel, 'requests.state');
      assertRenderable(row.detail, 'requests.detail');
    }

    const p = buildProgress(data.gradeRecords, data.student.creditsRequired);
    assertRenderable(p.headline, 'progress.headline');
    assertRenderable(p.creditsMessage, 'progress.credits');
    assertRenderable(p.remainingMessage, 'progress.remaining');
  });
});
