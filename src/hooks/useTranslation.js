import { useCallback, useMemo } from 'react';
import { translate } from '../lib/i18n.js';
import { usePreferences } from './usePreferences.js';
import en from '../locales/en.json' with { type: 'json' };
import ur from '../locales/ur.json' with { type: 'json' };

const DICTIONARIES = { en, ur };

/**
 * Translation for components.
 *
 * `t` takes a key, `tm` takes a `{ key, values }` message object straight from a
 * selector, which is the usual case: selectors never render strings, so a component
 * passes what it was given without unpacking it.
 */
export function useTranslation() {
  const { preferences } = usePreferences();
  const locale = DICTIONARIES[preferences.locale] ? preferences.locale : 'en';
  const dictionary = DICTIONARIES[locale];

  const t = useCallback((key, values) => translate(dictionary, key, values), [dictionary]);
  const tm = useCallback((message) => (message ? translate(dictionary, message.key, message.values) : null), [dictionary]);

  return useMemo(() => ({
    t,
    tm,
    locale,
    dir: locale === 'ur' ? 'rtl' : 'ltr',
  }), [t, tm, locale]);
}
