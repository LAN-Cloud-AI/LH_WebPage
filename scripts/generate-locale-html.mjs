import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COMPANY_ORIGIN,
  CONTACT_ORIGIN,
  DEFAULT_LOCALE,
  FAQ,
  GUIDE_ORIGIN,
  HREFLANG,
  HTML_LANG,
  IDENTITY,
  JSON_LD_LANG,
  LOCALES,
  OG_LOCALE,
  SHARE_IMAGE,
  SHARE_IMAGE_HEIGHT,
  SHARE_IMAGE_WIDTH,
  SITE_ORIGIN,
  localeHome,
} from '../src/content/identity.js';
import { writeWelcomeRobots } from './ai-crawler-policy.mjs';
import { upsertAnalytics } from './site-analytics.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const upsertMeta = (html, attr, key, content) => {
  const named = new RegExp(
    `<meta\\s+[^>]*(?:${attr}="${key}"|${attr}='${key}')[^>]*>`,
    'i',
  );
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (named.test(html)) return html.replace(named, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
};

const upsertLink = (html, rel, extra, href) => {
  const pattern = extra
    ? new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*${extra}[^>]*>`, 'i')
    : new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*>`, 'i');
  const tag = extra
    ? `<link rel="${rel}" ${extra} href="${href}" />`
    : `<link rel="${rel}" href="${href}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
};

const escapeAttr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const hreflangTags = () =>
  [
    ...LOCALES.map(
      (locale) =>
        `<link rel="alternate" hreflang="${HREFLANG[locale]}" href="${localeHome(SITE_ORIGIN, locale)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${localeHome(SITE_ORIGIN, DEFAULT_LOCALE)}" />`,
  ].join('\n    ');

const jsonLd = (locale) => {
  const id = IDENTITY[locale];
  const url = localeHome(SITE_ORIGIN, locale);
  const inLanguage = JSON_LD_LANG[locale];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${COMPANY_ORIGIN.replace(/\/$/, '')}/#organization`,
        name: id.company,
        alternateName: ['兰芯云朵', 'LAN Cloud AI'],
        url: `${COMPANY_ORIGIN.replace(/\/$/, '')}/`,
        logo: `${SITE_ORIGIN}/assets/icon/app-512.png?v=20260828`,
        telephone: '+86-17380566771',
        email: 'lance@lancloudtech.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+86-17380566771',
          email: 'lance@lancloudtech.com',
          availableLanguage: ['zh-CN', 'zh-Hant', 'en'],
        },
        sameAs: ['https://github.com/LAN-Cloud-AI', `${SITE_ORIGIN}/`],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: id.siteName,
        alternateName: 'LeadsHunter',
        inLanguage,
        publisher: { '@id': `${COMPANY_ORIGIN.replace(/\/$/, '')}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: id.title,
        description: id.description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${SITE_ORIGIN}/#app` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SHARE_IMAGE,
          width: SHARE_IMAGE_WIDTH,
          height: SHARE_IMAGE_HEIGHT,
        },
        inLanguage,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_ORIGIN}/#app`,
        name: id.siteName,
        alternateName: 'LeadsHunter',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS',
        url: `${SITE_ORIGIN}/`,
        image: SHARE_IMAGE,
        description: id.tagline,
        inLanguage,
        author: { '@id': `${COMPANY_ORIGIN.replace(/\/$/, '')}/#organization` },
        provider: { '@id': `${COMPANY_ORIGIN.replace(/\/$/, '')}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        isPartOf: { '@id': `${url}#webpage` },
        inLanguage,
        mainEntity: FAQ[locale].map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
};

const noscript = (locale) => {
  const id = IDENTITY[locale];
  const guide = localeHome(GUIDE_ORIGIN, locale);
  const contact = localeHome(CONTACT_ORIGIN, locale);
  return `<noscript>
      <h1>${escapeHtml(id.title)}</h1>
      <p>${escapeHtml(id.description)}</p>
      <p>
        <a href="${guide}">${escapeHtml(locale === 'en' ? 'Product guide' : locale === 'zh-Hant' ? '產品介紹' : '产品介绍')}</a>
        ·
        <a href="${contact}">${escapeHtml(locale === 'en' ? 'Contact sales' : locale === 'zh-Hant' ? '聯繫銷售' : '联系销售')}</a>
      </p>
    </noscript>`;
};

const patchHtml = (source, locale) => {
  const id = IDENTITY[locale];
  const url = localeHome(SITE_ORIGIN, locale);
  let html = source;
  html = html.replace(/<html\b([^>]*)>/, (_, attrs) => {
    const cleaned = String(attrs).replace(/\s*lang="[^"]*"/g, '');
    return `<html lang="${HTML_LANG[locale]}"${cleaned}>`;
  });
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(id.title)}</title>`);
  html = upsertMeta(html, 'name', 'description', id.description);
  html = upsertMeta(html, 'name', 'keywords', id.keywords);
  html = upsertMeta(html, 'name', 'author', id.company);
  html = upsertMeta(html, 'name', 'application-name', id.siteName);
  html = upsertMeta(html, 'name', 'apple-mobile-web-app-title', id.siteName);
  html = upsertMeta(html, 'property', 'og:site_name', id.siteName);
  html = upsertMeta(html, 'property', 'og:locale', OG_LOCALE[locale]);
  html = upsertMeta(html, 'property', 'og:url', url);
  html = upsertMeta(html, 'property', 'og:title', id.title);
  html = upsertMeta(html, 'property', 'og:description', id.ogDescription);
  html = upsertMeta(html, 'property', 'og:image:alt', id.imageAlt);
  html = upsertMeta(html, 'name', 'twitter:title', id.title);
  html = upsertMeta(html, 'name', 'twitter:description', id.ogDescription);
  html = upsertMeta(html, 'name', 'twitter:image:alt', id.imageAlt);
  html = upsertMeta(html, 'itemprop', 'name', id.title);
  html = upsertMeta(html, 'itemprop', 'description', id.ogDescription);
  html = upsertLink(html, 'canonical', '', url);

  html = html.replace(/<link rel="alternate"[^>]*>\s*/g, '');
  html = html.replace('</head>', `    ${hreflangTags()}\n  </head>`);

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(jsonLd(locale), null, 2)}\n    </script>`,
  );

  if (html.includes('<noscript>')) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript(locale));
  } else {
    html = html.replace('<div id="root"></div>', `${noscript(locale)}\n    <div id="root"></div>`);
  }
  return upsertAnalytics(html, 'leadshunter');
};

const write404 = (locale) => {
  const id = IDENTITY[locale];
  const home = localeHome('', locale) || '/';
  return `<!doctype html>
<html lang="${HTML_LANG[locale]}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(id.siteName)} · 404</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${localeHome(SITE_ORIGIN, locale)}" />
    ${upsertAnalytics('', 'leadshunter')}
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #080b11; color: #e8edf4; }
      main { max-width: 28rem; padding: 2rem; text-align: center; }
      a { color: #3d8bfd; }
    </style>
  </head>
  <body>
    <main>
      <p>404</p>
      <h1>${escapeHtml(locale === 'en' ? 'This page is not here' : locale === 'zh-Hant' ? '沒有這個頁面' : '没有这个页面')}</h1>
      <p>${escapeHtml(locale === 'en' ? 'The link may be wrong, or the page moved.' : locale === 'zh-Hant' ? '連結可能寫錯了，或頁面已經換了地址。' : '链接可能写错了，或页面已经换了地址。')}</p>
      <p><a href="${home}">${escapeHtml(locale === 'en' ? 'Back to home' : locale === 'zh-Hant' ? '回到首頁' : '回到首页')}</a></p>
    </main>
  </body>
</html>
`;
};

const llmsBody = (locale) => {
  const id = IDENTITY[locale];
  const welcome =
    locale === 'en'
      ? 'AI crawlers and assistants are welcome to fetch, cite, summarize, and train on LeadsHunter public pages. Prefer sitemap.xml and this file. Course ZIP packs on files.lancloudtech.com stay excluded.'
      : locale === 'zh-Hant'
        ? '歡迎 AI 爬蟲與助理抓取、引用、摘要並訓練線索獵手公開頁面。請優先使用 sitemap.xml 與本檔。files.lancloudtech.com 上的課程 ZIP 仍排除。'
        : '欢迎 AI 爬虫与助理抓取、引用、摘要并训练线索猎手公开页面。请优先使用 sitemap.xml 与本文件。files.lancloudtech.com 上的课程 ZIP 仍排除。';
  return [
    `# ${id.siteName} · ${id.latin}`,
    '',
    welcome,
    '',
    id.tagline,
    '',
    `- ${localeHome(SITE_ORIGIN, locale)}`,
    `- ${localeHome(GUIDE_ORIGIN, locale)}`,
    `- ${localeHome(CONTACT_ORIGIN, locale)}`,
    `- ${localeHome(COMPANY_ORIGIN, locale)}`,
    '',
    `- ${id.company}`,
    '',
    `# ${SITE_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');
};

const sitemap = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = LOCALES.map((locale) => {
    const loc = localeHome(SITE_ORIGIN, locale);
    const links = [
      ...LOCALES.map(
        (item) =>
          `      <xhtml:link rel="alternate" hreflang="${HREFLANG[item]}" href="${localeHome(SITE_ORIGIN, item)}"/>`,
      ),
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${localeHome(SITE_ORIGIN, DEFAULT_LOCALE)}"/>`,
    ].join('\n');
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${locale === DEFAULT_LOCALE ? '1.0' : '0.8'}</priority>
${links}
  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
};

const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const locale of LOCALES) {
  const html = patchHtml(source, locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : locale === 'en' ? 'en' : 'zh-Hant';
  const dir = prefix ? path.join(dist, prefix) : dist;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(dir, '404.html'), write404(locale));
  fs.writeFileSync(path.join(dir, 'llms.txt'), llmsBody(locale));
}

const robots = writeWelcomeRobots({ origin: SITE_ORIGIN });
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);
fs.writeFileSync(path.join(root, 'public/robots.txt'), robots);
fs.writeFileSync(path.join(dist, 'llms.txt'), llmsBody(DEFAULT_LOCALE));
fs.writeFileSync(path.join(root, 'public/llms.txt'), llmsBody(DEFAULT_LOCALE));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap());
fs.writeFileSync(
  path.join(root, 'public/sitemap.xml'),
  sitemap(),
);
fs.mkdirSync(path.join(dist, 'functions'), { recursive: true });
fs.copyFileSync(path.join(root, 'functions/_middleware.js'), path.join(dist, 'functions/_middleware.js'));

console.log(
  `PASS: locale HTML written for ${LOCALES.join(', ')}`,
);
