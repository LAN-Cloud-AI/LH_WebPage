export type SiteLocale = 'zh-Hans' | 'zh-Hant' | 'en';

export const SITE_ORIGIN: string;
export const GUIDE_ORIGIN: string;
export const CONTACT_ORIGIN: string;
export const COMPANY_ORIGIN: string;
export const LOCALES: readonly SiteLocale[];
export const DEFAULT_LOCALE: SiteLocale;
export const LOCALE_PREFIX: Record<SiteLocale, string>;
export const HTML_LANG: Record<SiteLocale, string>;
export const HREFLANG: Record<SiteLocale, string>;
export const OG_LOCALE: Record<SiteLocale, string>;
export const JSON_LD_LANG: Record<SiteLocale, string>;
export const IDENTITY: Record<
  SiteLocale,
  {
    siteName: string;
    latin: string;
    tagline: string;
    title: string;
    description: string;
    ogDescription: string;
    imageAlt: string;
    company: string;
    keywords: string;
  }
>;
export const FAQ: Record<SiteLocale, { q: string; a: string }[]>;
export const INTENT_COPY: Record<SiteLocale, Record<string, { label: string; blurb: string }>>;
export const SHARE_IMAGE: string;
export const SHARE_IMAGE_WIDTH: number;
export const SHARE_IMAGE_HEIGHT: number;
export function localeHome(origin: string, locale: SiteLocale): string;
export function hreflangLinks(
  localeHomeFn?: (origin: string, locale: SiteLocale) => string,
): { hreflang: string; href: string }[];
