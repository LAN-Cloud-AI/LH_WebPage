import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { sales } from '../sales.mjs';
import {
  CONTACT,
  CONTACT_ORIGIN,
  DEFAULT_LOCALE,
  GUIDE_ORIGIN,
  HTML_LANG,
  IDENTITY,
  LOCALES,
  OG_LOCALE,
  SITE_ORIGIN,
  contactJsonLd,
  hreflangLinks,
  localeHome,
  localePrefixDir,
  localeSwitcher,
  satelliteRedirects,
  write404,
  writeHostLlms,
  writeHostRobots,
  writeHostSitemap,
} from '../satellite-i18n.mjs';
import { upsertAnalytics } from '../site-analytics.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const output = path.join(root, 'dist-contact');
const guideAssets = path.join(root, 'product-guide/assets');
const css = await fs.readFile(path.join(here, 'contact.css'), 'utf8');

const iconSrc = path.join(guideAssets, 'leadshunter-app-icon.png');
const logoSrc = path.join(guideAssets, 'leadshunter-app-logo.jpg');
const qrSrc = path.join(guideAssets, '29-wecom-qr.png');
const logoVersion = createHash('sha256').update(await fs.readFile(logoSrc)).digest('hex').slice(0, 12);
const shareImageUrl = new URL(`assets/leadshunter-app-logo.jpg?v=${logoVersion}`, sales.contact).href;

const icons = {
  phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.2 3.8c.4-.5 1.1-.6 1.6-.3l2.1 1.3c.5.3.7.9.5 1.5l-.8 2.3a1.2 1.2 0 0 1-.7.7 8.8 8.8 0 0 0 4.8 4.8c.3.1.6 0 .7-.3l2.3-.8c.6-.2 1.2 0 1.5.5l1.3 2.1c.3.5.2 1.2-.3 1.6l-1.5 1.2c-.5.4-1.2.6-1.8.4C11.4 18 6 12.6 4.8 6.1c-.2-.6 0-1.3.4-1.8Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2.2"/><path d="m4.2 7.2 7.1 5.2c.4.3 1 .3 1.4 0l7.1-5.2"/></svg>',
};

const render = (locale) => {
  const copy = CONTACT[locale];
  const identity = IDENTITY[locale];
  const canonical = localeHome(CONTACT_ORIGIN, locale);
  const siteUrl = localeHome(SITE_ORIGIN, locale);
  const guideUrl = localeHome(GUIDE_ORIGIN, locale);
  const assetPrefix = localePrefixDir(locale) ? '../' : '';
  const title = `${copy.title}｜${identity.siteName}`;
  return `<!doctype html>
<html lang="${HTML_LANG[locale]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f3f5f8">
<meta name="color-scheme" content="light">
<title>${title}</title>
<meta name="description" content="${copy.description}">
<meta name="application-name" content="${identity.siteName}">
<link rel="canonical" href="${canonical}">
${hreflangLinks(CONTACT_ORIGIN)}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${identity.siteName}">
<meta property="og:locale" content="${OG_LOCALE[locale]}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${copy.description}">
<meta property="og:image" content="${shareImageUrl}">
<meta property="og:image:secure_url" content="${shareImageUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="1024">
<meta property="og:image:alt" content="${identity.siteName}">
<meta itemprop="name" content="${title}">
<meta itemprop="description" content="${copy.description}">
<meta itemprop="image" content="${shareImageUrl}">
<link rel="image_src" href="${shareImageUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${copy.description}">
<meta name="twitter:image" content="${shareImageUrl}">
<meta name="twitter:image:alt" content="${identity.siteName}">
<link rel="icon" type="image/png" href="${assetPrefix}assets/leadshunter-app-icon.png?v=${logoVersion}">
<link rel="apple-touch-icon" href="${assetPrefix}assets/leadshunter-app-icon.png?v=${logoVersion}">
<script type="application/ld+json">${JSON.stringify(contactJsonLd(locale))}</script>
${upsertAnalytics('', 'contact')}
<style>
${css}
</style>
</head>
<body>
  <div class="page">
    <header class="top">
      <a class="brand" href="${siteUrl}">
        <img src="${assetPrefix}assets/leadshunter-app-icon.png" width="32" height="32" alt="">
        <span>
          <span class="brand-name">${identity.siteName}</span>
          <span class="brand-sub">${identity.latin}</span>
        </span>
      </a>
      <nav class="locale-switch" aria-label="Language">${localeSwitcher(CONTACT_ORIGIN, locale)}</nav>
      <a class="top-link" href="${guideUrl}">${copy.guide}</a>
    </header>

    <p class="kicker">SALES</p>
    <h1>${copy.h1}</h1>
    <p class="lede">${copy.lede}</p>

    <section class="panel" aria-label="${copy.channelsAria}">
      <div class="qr">
        <img src="${assetPrefix}assets/wecom-qr.png" width="220" height="220" alt="${copy.qrAlt}">
      </div>
      <p class="qr-title">${copy.qrTitle}</p>
      <p class="qr-hint">${copy.qrHint}</p>

      <div class="channels">
        <a class="channel" href="${sales.phoneHref}" aria-label="${copy.phone} ${sales.phone}">
          <span class="channel-logo">${icons.phone}</span>
          <span class="channel-text">
            <span class="channel-label">${copy.phone}</span>
            <span class="channel-value channel-value--phone">${sales.phone}</span>
          </span>
        </a>
        <a class="channel" href="${sales.mailHref}" aria-label="${copy.mail} ${sales.email}">
          <span class="channel-logo">${icons.mail}</span>
          <span class="channel-text">
            <span class="channel-label">${copy.mail}</span>
            <span class="channel-value">lance@<wbr>lancloudtech.com</span>
          </span>
        </a>
      </div>
    </section>

    <nav class="more" aria-label="${copy.moreAria}">
      <a href="${siteUrl}">${copy.site}</a>
      <a href="${guideUrl}">${copy.handbook}</a>
      <a href="${sales.appstore}">${copy.app}</a>
    </nav>

    <p class="legal">
      <span>${identity.company}</span>
      <a href="${sales.beianHref}" target="_blank" rel="noreferrer noopener">${sales.beian}</a>
    </p>
  </div>
</body>
</html>
`;
};

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(path.join(output, 'assets'), { recursive: true });
for (const locale of LOCALES) {
  const html = render(locale);
  const dir = path.join(output, localePrefixDir(locale));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html);
  await fs.writeFile(path.join(dir, '404.html'), write404(CONTACT_ORIGIN, locale));
  await fs.writeFile(path.join(dir, 'llms.txt'), writeHostLlms(CONTACT_ORIGIN, locale));
  if (!html.includes(sales.phone) || !html.includes('wecom-qr.png') || !html.includes('channel-logo')) {
    throw new Error(`Contact page ${locale} is missing sales details`);
  }
  if (!html.includes('"@type":"ContactPage"') && !html.includes('"@type": "ContactPage"')) {
    throw new Error(`Contact page ${locale} needs ContactPage JSON-LD`);
  }
}
await fs.copyFile(iconSrc, path.join(output, 'assets/leadshunter-app-icon.png'));
await fs.copyFile(logoSrc, path.join(output, 'assets/leadshunter-app-logo.jpg'));
await fs.copyFile(qrSrc, path.join(output, 'assets/wecom-qr.png'));
await fs.writeFile(path.join(output, 'robots.txt'), writeHostRobots(CONTACT_ORIGIN));
await fs.writeFile(path.join(output, 'llms.txt'), writeHostLlms(CONTACT_ORIGIN, DEFAULT_LOCALE));
await fs.writeFile(path.join(output, 'sitemap.xml'), writeHostSitemap(CONTACT_ORIGIN));
await fs.writeFile(path.join(output, '_redirects'), satelliteRedirects(CONTACT_ORIGIN));
await fs.mkdir(path.join(output, 'functions'), { recursive: true });
await fs.copyFile(path.join(root, 'functions/_middleware.js'), path.join(output, 'functions/_middleware.js'));
await fs.writeFile(
  path.join(output, '_headers'),
  [
    '/*',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '  X-Frame-Options: SAMEORIGIN',
    '',
    '/index.html',
    '  Cache-Control: public, max-age=0, must-revalidate',
    '',
    '/en/index.html',
    '  Cache-Control: public, max-age=0, must-revalidate',
    '',
    '/zh-Hant/index.html',
    '  Cache-Control: public, max-age=0, must-revalidate',
    '',
    '/assets/leadshunter-app-logo.jpg',
    '  Cache-Control: public, max-age=604800',
    '  Access-Control-Allow-Origin: *',
    '',
  ].join('\n'),
);

console.log(JSON.stringify({ output, locales: LOCALES }));
