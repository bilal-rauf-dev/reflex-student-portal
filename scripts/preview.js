/**
 * Prints what ReFlex would say, using the real calculations, the real seeded data and
 * the real locale strings. No interface, no framework.
 *
 *   npm run preview
 *   npm run preview -- ur
 *
 * This exists so the product's central claim, that the derived answer leads, can be
 * checked before a single component is written.
 */
import { readFileSync } from 'node:fs';
import {
  summariseLectures, calculateHeadroom, classifyRisk, attendancePercentage,
  weightedTotal, requiredScore, unpublishedAssessments,
  calculateCGPA, creditsRemaining, daysUntil, formatDate,
  translate, pluralKey, ATTENDANCE_THRESHOLD, PROJECTION,
} from '../src/lib/index.js';

const load = (n) => JSON.parse(readFileSync(new URL(`../src/data/${n}.json`, import.meta.url)));
const locale = process.argv[2] === 'ur' ? 'ur' : 'en';
const dict = JSON.parse(readFileSync(new URL(`../src/locales/${locale}.json`, import.meta.url)));
const t = (key, values) => translate(dict, key, values);

const meta = load('meta');
const NOW = meta.seededNow;
const student = load('student');
const courses = load('courses');
const lectures = load('lectures');
const enrolments = load('enrolments');
const assessments = load('assessments');
const challans = load('challans');
const requests = load('requests');
const grades = load('gradeRecords');

const round = (n) => Math.round(n * 10) / 10;
const rule = (label) => console.log(`\n${'─'.repeat(74)}\n${label}\n${'─'.repeat(74)}`);

console.log(`\n${t('common.appName')} · ${t('home.title')} · ${formatDate(NOW)} · [${locale}]`);
console.log(t('home.greeting', { name: student.name }));

rule(t('attendance.title'));
for (const e of enrolments) {
  const course = courses.find((c) => c.code === e.courseId);
  const { attended, held } = summariseLectures(lectures.filter((l) => l.courseId === e.courseId));
  const headroom = calculateHeadroom(attended, held, e.totalScheduledLectures);
  const risk = classifyRisk(headroom);

  let sentence;
  if (headroom < 0) {
    const n = Math.abs(headroom);
    sentence = t(n === 1 ? 'attendance.headroom.below.one' : 'attendance.headroom.below.many',
      { count: n, course: course.code, threshold: ATTENDANCE_THRESHOLD });
  } else {
    sentence = t(pluralKey('attendance.headroom', headroom),
      { count: headroom, course: course.code, threshold: ATTENDANCE_THRESHOLD });
  }

  console.log(`\n[${t(`attendance.risk.${risk}`)}]  ${course.code} ${course.title}`);
  console.log(`  ${sentence}`);
  console.log(`  ${t('attendance.percentage', { percent: round(attendancePercentage(attended, held) ?? 0), held })}`);
  if (risk === 'below-threshold') console.log(`  ${t('attendance.belowThreshold.nextStep')}`);
}

rule(t('marks.title'));
for (const e of enrolments) {
  const course = courses.find((c) => c.code === e.courseId);
  const mine = assessments.filter((a) => a.courseId === e.courseId);
  const totals = weightedTotal(mine);
  console.log(`\n${course.code} ${course.title}`);

  if (totals.percentOfPublished === null) {
    console.log(`  ${t('marks.empty.course', { course: course.code })}`);
  } else {
    console.log(`  ${t('marks.runningTotal', { score: round(totals.percentOfPublished), weight: totals.publishedWeight })}`);
    const pending = unpublishedAssessments(mine);
    if (pending.length) {
      console.log(`  ${t(pending.length === 1 ? 'marks.unpublished.one' : 'marks.unpublished.count', { count: pending.length })}`);
    }
  }

  const target = 80;
  const p = requiredScore(mine, target);
  if (p.status === PROJECTION.OK) {
    console.log(`  ${p.requiredPercent === 0
      ? t('marks.projection.ok.secured', { target })
      : t('marks.projection.ok', { required: round(p.requiredPercent), target })}`);
  } else {
    console.log(`  ${t(`marks.projection.${p.status}`, { target, course: course.code })}`);
    if (p.status === PROJECTION.UNREACHABLE) console.log(`  ${t('marks.projection.unreachable.nextStep')}`);
  }
  console.log(`  ${t('common.estimateBasis', { basis: t('marks.projection.basis') })}`);
}

rule(t('fees.title'));
const outstanding = challans.filter((c) => c.status !== 'paid');
if (outstanding.length === 0) {
  console.log(t('fees.empty.nothingDue'));
} else {
  for (const c of outstanding) {
    const days = daysUntil(c.dueDate, NOW);
    const amount = c.amount.toLocaleString('en-PK');
    if (days < 0) console.log(t('fees.overdue', { amount, date: formatDate(c.dueDate), count: Math.abs(days) }));
    else if (days === 0) console.log(t('fees.due.today', { amount }));
    else if (days === 1) console.log(t('fees.due.tomorrow', { amount, date: formatDate(c.dueDate) }));
    else console.log(t('fees.due.days', { amount, count: days, date: formatDate(c.dueDate) }));
  }
}

rule(t('progress.title'));
const credits = creditsRemaining(grades, student.creditsRequired);
console.log(t('progress.cgpa', { cgpa: calculateCGPA(grades).toFixed(2) }));
console.log(t('progress.credits', { earned: credits.earned, required: credits.required }));
console.log(t('progress.creditsRemaining', { remaining: credits.remaining }));

rule(t('requests.title'));
for (const r of requests) {
  const date = r.decidedAt ?? r.submittedAt ?? r.openUntil ?? r.openFrom;
  console.log(`${t(`requests.type.${r.type}`).padEnd(26)} ${t(`requests.state.${r.state}`, { date: formatDate(date) })}`);
  if (r.state === 'not-open') {
    console.log(`${' '.repeat(27)}${t('requests.state.not-open.detail', { date: formatDate(r.openFrom) })}`);
  }
}

const age = -daysUntil(meta.lastSyncedAt, NOW);
const syncKey = age === 0 ? 'common.lastSynced.today'
  : age === 1 ? 'common.lastSynced.yesterday'
  : 'common.lastSynced.days';
console.log(`\n${t(syncKey, { count: age })}\n`);
