/**
 * View models. Pure functions that turn raw records into everything a screen needs.
 *
 * A selector NEVER returns a rendered string. It returns `{ key, values }` for the
 * component to translate, so the logic stays locale-free and testable, and a copy
 * change never means touching a calculation.
 */
import {
  summariseLectures, calculateHeadroom, classifyRisk, attendancePercentage,
  projectIfAllRemainingAttended,
} from './attendance.js';
import { weightedTotal, requiredScore, unpublishedAssessments } from './marks.js';
import { calculateCGPA, cgpaTrend, creditsRemaining } from './progress.js';
import { daysUntil } from './dates.js';
import { ATTENDANCE_THRESHOLD, RISK, PROJECTION, AT_RISK_HEADROOM } from './constants.js';

const msg = (key, values = {}) => ({ key, values });
const round1 = (n) => (n === null || n === undefined ? null : Math.round(n * 10) / 10);

/* ------------------------------------------------------------------ attendance */

export function buildCourseAttendance(course, lectures, enrolment, threshold = ATTENDANCE_THRESHOLD) {
  if (!course || !enrolment) return null;
  const mine = (lectures ?? []).filter((l) => l.courseId === course.code);
  const { attended, held } = summariseLectures(mine) ?? { attended: 0, held: 0 };
  const total = enrolment.totalScheduledLectures;
  const headroom = calculateHeadroom(attended, held, total, threshold);
  const risk = classifyRisk(headroom);
  const percent = attendancePercentage(attended, held);

  const base = { code: course.code, title: course.title, attended, held, totalScheduled: total,
                 percent: round1(percent), headroom, risk, lectures: mine };

  if (held === 0) {
    return { ...base, headline: msg('attendance.empty.course', { course: course.code }),
             secondary: msg('attendance.scheduled', { total }), nextStep: null, isEmpty: true };
  }

  const headline = headroom < 0
    ? msg(Math.abs(headroom) === 1 ? 'attendance.headroom.below.one' : 'attendance.headroom.below.many',
          { count: Math.abs(headroom), course: course.code, threshold })
    : headroom === 0
      ? msg('attendance.headroom.none', { course: course.code, threshold })
      : msg(headroom === 1 ? 'attendance.headroom.one' : 'attendance.headroom.many',
            { count: headroom, course: course.code, threshold });

  return {
    ...base,
    headline,
    secondary: msg('attendance.percentage', { percent: round1(percent), held }),
    projection: msg('attendance.projection.bestCase',
      { percent: round1(projectIfAllRemainingAttended(attended, held, total)) }),
    nextStep: risk === RISK.BELOW ? msg('attendance.belowThreshold.nextStep') : null,
    isEmpty: false,
  };
}

export function buildAttendanceList(courses, lectures, enrolments, threshold = ATTENDANCE_THRESHOLD) {
  const order = { [RISK.BELOW]: 0, [RISK.AT_RISK]: 1, [RISK.UNKNOWN]: 2, [RISK.SAFE]: 3 };
  return (enrolments ?? [])
    .map((e) => buildCourseAttendance(courses.find((c) => c.code === e.courseId), lectures, e, threshold))
    .filter(Boolean)
    .sort((a, b) => order[a.risk] - order[b.risk] || a.code.localeCompare(b.code));
}

/* ----------------------------------------------------------------------- marks */

export function buildCourseMarks(course, assessments, targetPercent = null) {
  if (!course) return null;
  const mine = (assessments ?? []).filter((a) => a.courseId === course.code);
  const totals = weightedTotal(mine);
  if (totals === null) {
    return { code: course.code, title: course.title, isEmpty: true,
             headline: msg('marks.projection.insufficient-data', { course: course.code }),
             pending: [], projection: null };
  }

  const pending = unpublishedAssessments(mine);
  const nothingPublished = totals.percentOfPublished === null;

  const headline = nothingPublished
    ? msg('marks.empty.course', { course: course.code })
    : msg('marks.runningTotal', { score: round1(totals.percentOfPublished), weight: totals.publishedWeight });

  let projection = null;
  if (targetPercent !== null) {
    const r = requiredScore(mine, targetPercent);
    if (r.status === PROJECTION.OK) {
      projection = {
        status: r.status,
        requiredPercent: round1(r.requiredPercent),
        message: r.requiredPercent === 0
          ? msg('marks.projection.ok.secured', { target: targetPercent })
          : msg('marks.projection.ok', { required: round1(r.requiredPercent), target: targetPercent }),
        nextStep: null,
      };
    } else {
      projection = {
        status: r.status,
        requiredPercent: null,
        message: msg(`marks.projection.${r.status}`, { target: targetPercent, course: course.code }),
        nextStep: r.status === PROJECTION.UNREACHABLE ? msg('marks.projection.unreachable.nextStep') : null,
      };
    }
  }

  return {
    code: course.code, title: course.title, isEmpty: nothingPublished,
    totals, pending,
    pendingMessage: pending.length
      ? msg(pending.length === 1 ? 'marks.unpublished.one' : 'marks.unpublished.count', { count: pending.length })
      : null,
    headline,
    projection,
    estimateNote: msg('common.estimateBasis', { basis: 'marks.projection.basis' }),
  };
}

export function buildMarksList(courses, assessments, enrolments) {
  return (enrolments ?? [])
    .map((e) => buildCourseMarks(courses.find((c) => c.code === e.courseId), assessments))
    .filter(Boolean);
}

/* --------------------------------------------------------------------- finance */

export function buildChallan(challan, now) {
  if (!challan) return null;
  const days = daysUntil(challan.dueDate, now);
  const amount = challan.amount;
  let message;
  if (challan.status === 'paid') message = msg('fees.paid', { amount, date: challan.paidOn });
  else if (days === null) message = msg('fees.empty.noHistory');
  else if (days < 0) message = msg('fees.overdue', { amount, date: challan.dueDate, count: Math.abs(days) });
  else if (days === 0) message = msg('fees.due.today', { amount });
  else if (days === 1) message = msg('fees.due.tomorrow', { amount, date: challan.dueDate });
  else message = msg('fees.due.days', { amount, count: days, date: challan.dueDate });

  return { id: challan.id, amount, dueDate: challan.dueDate, status: challan.status,
           daysRemaining: days, isOverdue: challan.status !== 'paid' && days !== null && days < 0, message };
}

export function buildFinanceTimeline(challans, now) {
  const rows = (challans ?? []).map((c) => buildChallan(c, now)).filter(Boolean)
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  const outstanding = rows.filter((r) => r.status !== 'paid');
  return {
    rows,
    outstanding,
    isEmpty: rows.length === 0,
    emptyMessage: rows.length === 0
      ? msg('fees.empty.noHistory')
      : outstanding.length === 0 ? msg('fees.empty.nothingDue') : null,
  };
}

/* -------------------------------------------------------------------- requests */

export function buildRequestsInbox(requests) {
  const rows = (requests ?? []).map((r) => {
    const date = r.decidedAt ?? r.submittedAt ?? r.openUntil ?? r.openFrom;
    return {
      id: r.id, type: r.type, state: r.state,
      typeLabel: msg(`requests.type.${r.type}`),
      stateLabel: msg(`requests.state.${r.state}`, { date }),
      detail: r.state === 'not-open' ? msg('requests.state.not-open.detail', { date: r.openFrom }) : null,
      isActionable: r.state === 'open',
    };
  });
  return { rows, isEmpty: rows.length === 0, emptyMessage: rows.length === 0 ? msg('requests.empty') : null };
}

/* -------------------------------------------------------------------- progress */

export function buildProgress(gradeRecords, creditsRequired) {
  const cgpa = calculateCGPA(gradeRecords);
  const trend = cgpaTrend(gradeRecords);
  const credits = creditsRemaining(gradeRecords, creditsRequired);
  if (cgpa === null) {
    return { isEmpty: true, headline: msg('progress.empty.noSemesters'), trend: [], credits };
  }
  return {
    isEmpty: false,
    cgpa: Math.round(cgpa * 100) / 100,
    headline: msg('progress.cgpa', { cgpa: (Math.round(cgpa * 100) / 100).toFixed(2) }),
    creditsMessage: credits ? msg('progress.credits', { earned: credits.earned, required: credits.required }) : null,
    remainingMessage: credits ? msg('progress.creditsRemaining', { remaining: credits.remaining }) : null,
    trend,
    trendMessage: trend.length < 2 ? msg('progress.empty.noTrend') : null,
    credits,
  };
}

/* ------------------------------------------------------------------- dashboard */

export function buildDashboard(data, now, threshold = ATTENDANCE_THRESHOLD) {
  const { student, courses, lectures, enrolments, challans, semesters, notifications } = data;

  const attendance = buildAttendanceList(courses, lectures, enrolments, threshold);
  const atRisk = attendance.filter((a) => a.risk === RISK.BELOW || a.risk === RISK.AT_RISK);

  const finance = buildFinanceTimeline(challans, now);
  const nextDue = finance.outstanding[finance.outstanding.length - 1] ?? null;

  const current = (semesters ?? []).find((s) => s.isCurrent);
  const window = current?.registrationWindow ?? null;
  let registration = null;
  if (window) {
    const opensIn = daysUntil(window.opens, now);
    const closesIn = daysUntil(window.closes, now);
    if (opensIn > 1) registration = msg('registration.window.opensIn', { count: opensIn, date: window.opens });
    else if (opensIn === 1) registration = msg('registration.window.opensTomorrow', { date: window.opens });
    else if (opensIn === 0) registration = msg('registration.window.opensToday');
    else if (closesIn >= 0) registration = msg('registration.window.open', { date: window.closes, count: closesIn });
    else registration = msg('registration.window.closed', { date: window.closes });
  } else {
    registration = msg('registration.window.notAnnounced');
  }
  const registrationIsLive = window ? daysUntil(window.closes, now) >= 0 : false;

  const newMarks = (notifications ?? []).filter((n) => n.category === 'marks-published' && n.readAt === null);

  const nothingNeedsAttention =
    atRisk.length === 0 && nextDue === null && newMarks.length === 0 && !registrationIsLive;

  return {
    greeting: msg('home.greeting', { name: student?.name ?? '' }),
    atRisk,
    atRiskLabel: atRisk.length ? msg('home.atRiskCourses') : null,
    nextDue,
    registration,
    registrationIsLive,
    newMarks,
    newMarksLabel: newMarks.length ? msg('home.newMarks') : null,
    nothingNeedsAttention,
    nothingMessage: nothingNeedsAttention ? msg('home.nothingNeedsAttention') : null,
    nothingDetail: nothingNeedsAttention ? msg('home.nothingNeedsAttention.detail') : null,
  };
}

/* ------------------------------------------------------------------ sync label */

export function buildSyncLabel(lastSyncedAt, now) {
  const age = daysUntil(lastSyncedAt, now);
  if (age === null) return null;
  const days = -age;
  if (days <= 0) return msg('common.lastSynced.today');
  if (days === 1) return msg('common.lastSynced.yesterday');
  return msg('common.lastSynced.days', { count: days });
}

export { ATTENDANCE_THRESHOLD, AT_RISK_HEADROOM, RISK, PROJECTION };
