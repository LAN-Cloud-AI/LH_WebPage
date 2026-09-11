import { localizedContactUrl, localizedGuideUrl, useContent } from '../../content/runtime';
import { MailIcon, PhoneIcon } from '../primitives/Icons';
import { LanguageSwitch } from './LanguageSwitch';

const YEAR = new Date().getFullYear();

export function Footer() {
  const { site, ui } = useContent();

  return (
    <footer className="border-t border-line bg-bg-elev/60">
      <div className="shell py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-2" aria-label={`${site.brand.name}首页`}>
              <img src={site.brand.icon} width={28} height={28} alt="" className="lh-icon" />
              <span className="flex flex-col leading-none">
                <span className="text-[0.9rem] font-semibold">{site.brand.name}</span>
                <span className="mt-0.5 text-[0.55rem] tracking-[0.18em] text-ink-faint">
                  {site.brand.latin}
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[0.78rem] leading-relaxed text-ink-faint">
              {ui.footerBlurb}
            </p>
            <LanguageSwitch className="mt-4" />
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label={ui.navAria}>
            <a
              href={site.links.company}
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer noopener"
            >
              {ui.footerCompany}
            </a>
            <a
              href={site.links.companyProduct}
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer noopener"
            >
              {ui.footerIndex}
            </a>
            <a
              href={site.links.appstore}
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer noopener"
            >
              {ui.footerApp}
            </a>
            <a
              href={localizedGuideUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
            >
              {ui.guide}
            </a>
            <a
              href={localizedContactUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
            >
              {ui.contact}
            </a>
            <a
              href={site.links.demoForm}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
            >
              {ui.bookDemo}
            </a>
            <a
              href={site.contact.phoneHref}
              aria-label={`${ui.footerPhone} ${site.contact.phone}`}
              className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
            >
              <PhoneIcon className="size-3.5" />
              {ui.footerPhone}
            </a>
            <a
              href={site.links.demoMail}
              aria-label={`${ui.footerMail} ${site.contact.email}`}
              className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
            >
              <MailIcon className="size-3.5" />
              {ui.footerMail}
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[0.72rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {YEAR} {site.brand.company}
            </span>
            <a
              href={site.links.beian}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink-muted"
            >
              {site.brand.beian}
            </a>
          </p>
          <p>{ui.footerLegal}</p>
        </div>
      </div>
    </footer>
  );
}
