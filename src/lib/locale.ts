export const LOCALES = ['zh-Hans', 'zh-Hant', 'en'] as const;
export type SiteLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = 'zh-Hans';

export const LOCALE_PREFIX: Record<SiteLocale, string> = {
  'zh-Hans': '',
  'zh-Hant': '/zh-Hant',
  en: '/en',
};

export const HTML_LANG: Record<SiteLocale, string> = {
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-Hant',
  en: 'en',
};

export const HREFLANG: Record<SiteLocale, string> = {
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-Hant',
  en: 'en',
};

export const OG_LOCALE: Record<SiteLocale, string> = {
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
  en: 'en_US',
};

export function localeFromPathname(pathname: string): SiteLocale {
  const path = pathname.split(/[?#]/)[0] || '/';
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (path === '/zh-Hant' || path.startsWith('/zh-Hant/')) return 'zh-Hant';
  return DEFAULT_LOCALE;
}

export function localeHomePath(locale: SiteLocale): string {
  const prefix = LOCALE_PREFIX[locale];
  return prefix ? `${prefix}/` : '/';
}

export function localeHref(locale: SiteLocale, hash = ''): string {
  const home = localeHomePath(locale);
  if (!hash) return home;
  return `${home}${hash.startsWith('#') ? hash : `#${hash}`}`;
}

export function currentLocale(): SiteLocale {
  if (typeof location === 'undefined') return DEFAULT_LOCALE;
  return localeFromPathname(location.pathname);
}
