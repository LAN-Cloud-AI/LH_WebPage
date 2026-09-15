import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { sales } from '../sales.mjs';
import {
  CONTACT_ORIGIN,
  DEFAULT_LOCALE,
  GUIDE,
  GUIDE_MD,
  GUIDE_ORIGIN,
  HTML_LANG,
  IDENTITY,
  LOCALES,
  OG_LOCALE,
  guideJsonLd,
  hreflangLinks,
  localeHome,
  localePrefixDir,
  localeSwitcher,
} from '../satellite-i18n.mjs';
import { upsertAnalytics } from '../site-analytics.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../product-guide');
const shareImagePath = 'assets/leadshunter-app-logo.jpg';
const logoVersion = createHash('sha256')
  .update(await fs.readFile(path.join(root, shareImagePath)))
  .digest('hex')
  .slice(0, 12);
const shareImageUrl = new URL(`${shareImagePath}?v=${logoVersion}`, sales.guide).href;
const appIconPath = 'assets/leadshunter-app-icon.png';
const css = await fs.readFile(path.join(here, 'guide.css'), 'utf8');

const renderBody = (md, copy, assetPrefix) => {
  let body = marked.parse(md, { gfm: true });
  body = body.replace(/<h1>[\s\S]*?<\/h1>/, '').replace(/<blockquote>[\s\S]*?<\/blockquote>/, '');
  body = body.replace(new RegExp(`<h2>${copy.tocHeading}<\\/h2>[\\s\\S]*?(?=<a id="what")`), '');
  body = body.replace(/<p>\s*(<a id="[^"]+"><\/a>)\s*<\/p>/g, '$1');
  body = body.replace(/(<a id="[^"]+"><\/a>)<\/p>/g, '$1');
  body = body.replace(
    /(?:<p>)?<img src="([^"]+)" alt="([^"]*)"[^>]*>(?:<\/p>)?\s*<p><em>([\s\S]*?)<\/em><\/p>/g,
    (_, src, alt, caption) => {
      const klass = src.includes('wecom-qr')
        ? 'qr'
        : src.endsWith('.jpg')
          ? 'phone'
          : src.includes('13-appstore')
            ? 'store'
            : src.includes('form')
              ? 'form'
              : src.includes('10-lead-analysis') || src.includes('11-lead-history')
                ? 'detail'
                : 'wide';
      const href = src.startsWith('assets/') ? `${assetPrefix}${src}` : src;
      return `<figure class="${klass}"><button class="image-button" aria-label="${copy.zoom}${alt}" data-image="${href}" data-alt="${alt}"><img src="${href}" alt="${alt}"></button><figcaption>${caption}</figcaption></figure>`;
    },
  );
  body = body.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, '</table></div>');
  body = body.replace(
    new RegExp(`<p><strong>${copy.quick}<\\/strong>[：:]([\\s\\S]*?)<\\/p>`),
    (_, links) =>
      `<div class="quick-links"><p>${copy.quick}</p>${links.replace(/href="#contact"/g, `href="${sales.contact}"`).replace(/\s*·\s*/g, '')}</div>`,
  );
  return body;
};

const renderHtml = (locale, md) => {
  const copy = GUIDE[locale];
  const identity = IDENTITY[locale];
  const canonicalUrl = localeHome(GUIDE_ORIGIN, locale);
  const contactUrl = localeHome(CONTACT_ORIGIN, locale);
  const siteUrl = localeHome(sales.site, locale);
  const assetPrefix = localePrefixDir(locale) ? '../' : '';
  const body = renderBody(md, copy, assetPrefix).replace(
    /src="assets\//g,
    `src="${assetPrefix}assets/`,
  );
  const navItems = copy.nav
    .map(([href, title], index) => {
      const resolved = href === 'contact' ? contactUrl : href;
      return `<a href="${resolved}"><span class="index">${String(index + 1).padStart(2, '0')}</span>${title}</a>`;
    })
    .join('');
  const pdfHref = `${assetPrefix}leadshunter-guide.pdf`;
  const chips = copy.chips.map((chip) => `<span>${chip}</span>`).join('');

  return `<!doctype html>
<html lang="${HTML_LANG[locale]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#12314e">
<title>${copy.title}</title>
<meta name="description" content="${copy.description}">
<meta name="application-name" content="${identity.siteName}">
<link rel="canonical" href="${canonicalUrl}">
${hreflangLinks(GUIDE_ORIGIN)}
<meta property="og:type" content="article">
<meta property="og:site_name" content="${identity.siteName}">
<meta property="og:locale" content="${OG_LOCALE[locale]}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${copy.title}">
<meta property="og:description" content="${copy.description}">
<meta property="og:image" content="${shareImageUrl}">
<meta property="og:image:secure_url" content="${shareImageUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="1024">
<meta property="og:image:alt" content="${identity.siteName}">
<meta itemprop="name" content="${copy.title}">
<meta itemprop="description" content="${copy.description}">
<meta itemprop="image" content="${shareImageUrl}">
<link rel="image_src" href="${shareImageUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${copy.title}">
<meta name="twitter:description" content="${copy.description}">
<meta name="twitter:image" content="${shareImageUrl}">
<meta name="twitter:image:alt" content="${identity.siteName}">
<link rel="icon" type="image/png" sizes="256x256" href="${assetPrefix}${appIconPath}?v=${logoVersion}">
<link rel="apple-touch-icon" sizes="256x256" href="${assetPrefix}${appIconPath}?v=${logoVersion}">
<script type="application/ld+json">${JSON.stringify(guideJsonLd(locale))}</script>
${upsertAnalytics('', 'guide')}
<style>
${css}
</style>
</head>
<body>
<header class="topbar">
  <button class="icon-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="${copy.openMenu}">
    <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
  </button>
  <a class="brand" href="${siteUrl}">
    <img src="${assetPrefix}${appIconPath}" width="28" height="28" alt="">
    <span class="brand-text">
      <span class="brand-name">${identity.siteName}</span>
      <span class="brand-sub">${copy.brandSub}</span>
    </span>
  </a>
  <div class="topbar-actions">
    <nav class="locale-switch" aria-label="Language">${localeSwitcher(GUIDE_ORIGIN, locale)}</nav>
    <a class="btn btn-ghost" href="${pdfHref}" download="线索猎手-产品介绍与使用说明.pdf"><span class="wide-only">${copy.downloadPdf.replace(' PDF', ' ')}</span>${copy.downloadPdfShort}</a>
  </div>
</header>

<div class="backdrop" id="backdrop"></div>
<nav class="drawer" id="menu" aria-label="${copy.drawer}">
  <p class="drawer-kicker">${copy.drawerKicker}</p>
  ${navItems}
  <a class="btn btn-primary download" href="${pdfHref}" download="线索猎手-产品介绍与使用说明.pdf">${copy.downloadPdf}</a>
</nav>

<header class="hero">
  <div class="hero-inner">
    <div class="eyebrow">${copy.eyebrow}</div>
    <h1>${copy.h1}</h1>
    <p class="subtitle">${copy.subtitle}</p>
    <p>${copy.lede}</p>
    <div class="chips">
      ${chips}
    </div>
  </div>
</header>

<main>
  <div class="hint">${copy.hint}</div>
  ${body}
</main>

<footer class="site-footer">
  ${copy.footer}
  <div>
    <a href="${siteUrl}">${copy.site}</a>
    <a href="${sales.console}">${copy.console}</a>
    <a href="${sales.appstore}">${copy.app}</a>
    <a href="${contactUrl}">${copy.contact}</a>
  </div>
</footer>

<aside class="sales-banner" aria-label="${copy.bannerAria}">
  <div class="sales-banner__inner">
    <div class="sales-banner__copy">
      <p class="sales-banner__kicker">${copy.bannerKicker}</p>
      <p class="sales-banner__title">${copy.bannerTitle}</p>
    </div>
    <a class="btn btn-primary sales-banner__cta" href="${contactUrl}">${copy.contact}</a>
  </div>
</aside>

<dialog id="viewer">
  <button type="button">${copy.close}</button>
  <img alt="">
</dialog>

<script>
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const backdrop = document.getElementById('backdrop');
const openMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? ${JSON.stringify(copy.closeMenu)} : ${JSON.stringify(copy.openMenu)});
};
toggle.addEventListener('click', () => openMenu(!document.body.classList.contains('menu-open')));
backdrop.addEventListener('click', () => openMenu(false));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => openMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') openMenu(false);
});
const viewer = document.getElementById('viewer');
document.querySelectorAll('[data-image]').forEach((button) => button.addEventListener('click', () => {
  viewer.querySelector('img').src = button.dataset.image;
  viewer.querySelector('img').alt = button.dataset.alt;
  viewer.showModal();
}));
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
</script>
</body>
</html>
`;
};

const written = [];
for (const locale of LOCALES) {
  const md = await fs.readFile(path.join(root, GUIDE_MD[locale]), 'utf8');
  const html = renderHtml(locale, md);
  const name =
    locale === DEFAULT_LOCALE
      ? '线索猎手-图文阅读版.html'
      : locale === 'en'
        ? 'en.html'
        : 'zh-Hant.html';
  await fs.writeFile(path.join(root, name), html);
  written.push({ locale, bytes: Buffer.byteLength(html), figures: (html.match(/<figure /g) || []).length });
}

console.log(JSON.stringify({ written }));
