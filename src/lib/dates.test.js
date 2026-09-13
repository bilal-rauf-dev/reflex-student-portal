import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, daysUntil, syncAgeInDays } from './dates.js';

describe('formatDate', () => {
  test('one format everywhere: DD MMM YYYY', () => {
    assert.equal(formatDate('2026-09-04'), '04 Sep 2026');
    assert.equal(formatDate('2026-12-11'), '11 Dec 2026');
  });
  test('pads the day so columns line up', () => {
    assert.equal(formatDate('2026-08-07'), '07 Aug 2026');
  });
  test('refuses junk rather than printing "Invalid Date"', () => {
    assert.equal(formatDate('not a date'), null);
    assert.equal(formatDate(null), null);
  });
});

describe('daysUntil', () => {
  test('normal: a fee due in four days', () => {
    assert.equal(daysUntil('2026-09-04', '2026-08-31'), 4);
  });
  test('boundary: due today is zero, not one', () => {
    assert.equal(daysUntil('2026-09-04', '2026-09-04'), 0);
  });
  test('a passed date is negative', () => {
    assert.equal(daysUntil('2026-09-04', '2026-09-06'), -2);
  });
  test('never reads the clock itself, so the result is stable', () => {
    assert.equal(daysUntil('2026-09-04', '2026-08-31'), daysUntil('2026-09-04', '2026-08-31'));
  });
  test('crosses a month boundary correctly', () => {
    assert.equal(daysUntil('2026-10-01', '2026-09-30'), 1);
  });
});

describe('syncAgeInDays', () => {
  test('reports how stale a cached read is', () => {
    assert.equal(syncAgeInDays('2026-09-01', '2026-09-04'), 3);
  });
  test('synced today is zero', () => {
    assert.equal(syncAgeInDays('2026-09-04', '2026-09-04'), 0);
  });
});
