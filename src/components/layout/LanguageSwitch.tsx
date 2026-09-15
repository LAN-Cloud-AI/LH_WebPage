import { LOCALES, currentLocale, localeHref, type SiteLocale } from '../../lib/locale';
import { useContent } from '../../content/runtime';

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { ui } = useContent();
  const active = currentLocale();

  return (
    <nav className={`flex items-center gap-0.5 ${className}`} aria-label={ui.localeAria}>
      {LOCALES.map((locale) => (
        <a
          key={locale}
          href={localeHref(locale)}
          hrefLang={locale === 'zh-Hans' ? 'zh-CN' : locale}
          aria-current={active === locale ? 'page' : undefined}
          className={`rounded-md px-1.5 py-1 text-[0.68rem] tracking-wide transition-colors ${
            active === locale ? 'bg-surface-2 text-ink' : 'text-ink-faint hover:text-ink-muted'
          }`}
        >
          {ui.locales[locale as SiteLocale]}
        </a>
      ))}
    </nav>
  );
}
