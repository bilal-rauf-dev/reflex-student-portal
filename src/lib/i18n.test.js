import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { interpolate, translate, placeholdersIn, pluralKey } from './i18n.js';

const en = JSON.parse(readFileSync(new URL('../locales/en.json', import.meta.url)));
const ur = JSON.parse(readFileSync(new URL('../locales/ur.json', import.meta.url)));

describe('interpolate', () => {
  test('normal', () => {
    assert.equal(interpolate('You can miss {count} more classes in {course}.', { count: 3, course: 'CS3001' }),
      'You can miss 3 more classes in CS3001.');
  });
  test('a missing value stays visible rather than printing undefined', () => {
    assert.equal(interpolate('Due in {count} days', {}), 'Due in {count} days');
  });
  test('the same placeholder can appear twice', () => {
    assert.equal(interpolate('{a} and {a}', { a: 'x' }), 'x and x');
  });
  test('degenerate', () => {
    assert.equal(interpolate('no placeholders', { a: 1 }), 'no placeholders');
    assert.equal(interpolate(null), null);
  });
});

describe('translate', () => {
  test('missing keys surface as the key, not as empty space', () => {
    assert.equal(translate(en, 'does.not.exist'), 'does.not.exist');
  });
  test('resolves a real key in both locales', () => {
    for (const dict of [en, ur]) {
      const out = translate(dict, 'attendance.headroom.many', { count: 3, course: 'CS3001', threshold: 80 });
      assert.ok(out.includes('3') && out.includes('CS3001') && out.includes('80'));
    }
  });
});

describe('pluralKey', () => {
  test('picks by count', () => {
    assert.equal(pluralKey('attendance.headroom', 3), 'attendance.headroom.many');
    assert.equal(pluralKey('attendance.headroom', 1), 'attendance.headroom.one');
    assert.equal(pluralKey('attendance.headroom', 0), 'attendance.headroom.none');
  });
});

describe('locale parity', () => {
  test('every English key exists in Urdu', () => {
    const missing = Object.keys(en).filter((k) => !(k in ur));
    assert.deepEqual(missing, [], `missing from ur.json: ${missing.join(', ')}`);
  });

  test('no Urdu key is orphaned', () => {
    const extra = Object.keys(ur).filter((k) => !(k in en));
    assert.deepEqual(extra, [], `not in en.json: ${extra.join(', ')}`);
  });

  test('both locales use the same placeholders in every string', () => {
    const mismatched = [];
    for (const key of Object.keys(en)) {
      const a = placeholdersIn(en[key]).sort();
      const b = placeholdersIn(ur[key]).sort();
      if (a.join(',') !== b.join(',')) mismatched.push(`${key}: en(${a}) ur(${b})`);
    }
    assert.deepEqual(mismatched, [], mismatched.join(' | '));
  });

  test('no string is empty in either locale', () => {
    const empty = Object.keys(en).filter((k) => !en[k].trim() || !ur[k].trim());
    assert.deepEqual(empty, []);
  });

  test('every named risk state has a label in both locales', () => {
    for (const state of ['safe', 'at-risk', 'below-threshold', 'unknown']) {
      assert.ok(en[`attendance.risk.${state}`], `en missing ${state}`);
      assert.ok(ur[`attendance.risk.${state}`], `ur missing ${state}`);
    }
  });

  test('every projection status has a message in both locales', () => {
    for (const status of ['ok', 'unreachable', 'nothing-remaining', 'insufficient-data']) {
      assert.ok(en[`marks.projection.${status}`], `en missing ${status}`);
      assert.ok(ur[`marks.projection.${status}`], `ur missing ${status}`);
    }
  });

  test('every request state has a label in both locales', () => {
    for (const state of ['not-open', 'open', 'submitted', 'under-review', 'decided']) {
      assert.ok(en[`requests.state.${state}`], `en missing ${state}`);
      assert.ok(ur[`requests.state.${state}`], `ur missing ${state}`);
    }
  });

  test('every glossary term flagged in the proposal is defined', () => {
    for (const term of ['MCA', 'CLO', 'PLO', 'CrAtt', 'CrErnd', 'ARN', 'Challan']) {
      assert.ok(en[`glossary.${term}`], `en missing glossary.${term}`);
      assert.ok(ur[`glossary.${term}`], `ur missing glossary.${term}`);
    }
  });
});
