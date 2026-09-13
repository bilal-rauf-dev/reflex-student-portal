import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { checkPrerequisites, detectClashes } from './registration.js';

describe('checkPrerequisites', () => {
  test('normal: names the missing course', () => {
    const course = { code: 'CS3001', prerequisites: ['CS2001', 'CS1002'] };
    assert.deepEqual(checkPrerequisites(course, ['CS1002']), ['CS2001']);
  });
  test('all met returns an empty list, not null', () => {
    const course = { code: 'CS3001', prerequisites: ['CS2001'] };
    assert.deepEqual(checkPrerequisites(course, ['CS2001']), []);
  });
  test('degenerate: a course with no prerequisites', () => {
    assert.deepEqual(checkPrerequisites({ code: 'CS1002' }, []), []);
  });
});

describe('detectClashes', () => {
  const slot = (day, start, end) => ({ day, start, end });

  test('normal: two courses overlapping on the same day', () => {
    const draft = [
      { code: 'CS2009', slots: [slot('Mon', '08:30', '10:00')] },
      { code: 'CS3001', slots: [slot('Mon', '09:30', '11:00')] },
    ];
    assert.deepEqual(detectClashes(draft), [{ a: 'CS2009', b: 'CS3001' }]);
  });

  test('boundary: back to back is not a clash', () => {
    const draft = [
      { code: 'CS2009', slots: [slot('Mon', '08:30', '10:00')] },
      { code: 'CS3001', slots: [slot('Mon', '10:00', '11:30')] },
    ];
    assert.deepEqual(detectClashes(draft), []);
  });

  test('same times on different days do not clash', () => {
    const draft = [
      { code: 'CS2009', slots: [slot('Mon', '08:30', '10:00')] },
      { code: 'CS3001', slots: [slot('Tue', '08:30', '10:00')] },
    ];
    assert.deepEqual(detectClashes(draft), []);
  });

  test('degenerate: a single course cannot clash with itself', () => {
    assert.deepEqual(detectClashes([{ code: 'CS2009', slots: [slot('Mon', '08:30', '10:00')] }]), []);
    assert.deepEqual(detectClashes([]), []);
  });
});
