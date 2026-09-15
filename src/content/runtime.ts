import { currentLocale, type SiteLocale } from '../lib/locale';
import { CONTACT_ORIGIN, GUIDE_ORIGIN, INTENT_COPY, localeHome } from './identity.js';
import type { IntentLevel } from '../lib/intentDecay';
import * as zhHans from './site';
import * as zhHant from './locales/zh-Hant';
import * as en from './locales/en';

export type SiteContent = typeof zhHans;

const bundles: Record<SiteLocale, SiteContent> = {
  'zh-Hans': zhHans,
  'zh-Hant': zhHant as unknown as SiteContent,
  en: en as unknown as SiteContent,
};

export function getContent(locale = currentLocale()): SiteContent {
  return bundles[locale];
}

export function useContent(): SiteContent {
  return getContent();
}

export function intentLabel(level: IntentLevel, locale = currentLocale()): string {
  return INTENT_COPY[locale][level]?.label ?? level;
}

export function localizedGuideUrl(locale = currentLocale()): string {
  return localeHome(GUIDE_ORIGIN, locale);
}

export function localizedContactUrl(locale = currentLocale()): string {
  return localeHome(CONTACT_ORIGIN, locale);
}
