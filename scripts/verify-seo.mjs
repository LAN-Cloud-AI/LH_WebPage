import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FAQ,
  HREFLANG,
  HTML_LANG,
  IDENTITY,
  LOCALES,
  SITE_ORIGIN,
  localeHome,
} from '../src/content/identity.js';
import { UMAMI_ORIGIN, UMAMI_SCRIPT_PATH, UMAMI_WEBSITE_IDS } from './site-analytics.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const required = (condition, message) => {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
};

required(exists('src/content/identity.js'), 'identity.js is the SEO source of truth.');
required(exists('src/content/locales/en.tsx'), 'English locale bundle must exist.');
required(exists('src/content/locales/zh-Hant.tsx'), 'Traditional Chinese locale bundle must exist.');
required(exists('public/404.html'), 'Root 404.html must exist.');
required(exists('public/_redirects'), '_redirects must exist.');
required(exists('public/robots.txt'), 'robots.txt must exist.');
required(exists('scripts/site-analytics.mjs'), 'Umami helper must exist.');
required(UMAMI_WEBSITE_IDS.leadshunter && UMAMI_WEBSITE_IDS.guide && UMAMI_WEBSITE_IDS.contact, 'Umami website ids must be provisioned.');
required(exists('public/sitemap.xml'), 'sitemap.xml must exist.');
required(exists('scripts/generate-locale-html.mjs'), 'Locale HTML generator must exist.');

const redirects = read('public/_redirects');
required(!/\/\*\s+\/index\.html\s+200/.test(redirects), 'Must not keep SPA catch-all 200.');
required(redirects.includes('/guide'), '_redirects must 301 /guide.');
required(redirects.includes('/contact'), '_redirects must 301 /contact.');
required(redirects.includes('/en'), '_redirects must canonicalize /en.');
required(redirects.includes('/zh-Hant'), '_redirects must canonicalize /zh-Hant.');

const robots = read('public/robots.txt');
required(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`), 'robots.txt must declare this host sitemap.');
required(robots.includes('User-agent: GPTBot'), 'robots.txt must welcome GPTBot.');
required(robots.includes('ai-train=yes'), 'robots.txt must allow AI training.');
required(!robots.includes('leadshunter-guide.lancloudtech.com'), 'Main sitemap robots must not list satellite hosts.');
required(exists('public/llms.txt'), 'llms.txt must exist for AI crawlers.');
required(read('public/llms.txt').includes('欢迎 AI 爬虫'), 'llms.txt must invite AI crawlers.');

const sitemap = read('public/sitemap.xml');
required(sitemap.includes('xmlns:xhtml'), 'sitemap.xml must declare xhtml for hreflang.');
required(!sitemap.includes('leadshunter-guide.lancloudtech.com'), 'Main sitemap must not list the guide host.');
required(!sitemap.includes('leadshunter-contact.lancloudtech.com'), 'Main sitemap must not list the contact host.');

for (const locale of LOCALES) {
  const url = localeHome(SITE_ORIGIN, locale);
  required(sitemap.includes(`<loc>${url}</loc>`), `sitemap missing ${url}`);
  required(IDENTITY[locale].title.includes(IDENTITY[locale].siteName) || locale === 'en', `${locale} title should carry the site name.`);
  required(FAQ[locale].length === 6, `${locale} FAQ must have 6 items.`);
}

const decay = read('src/lib/intentDecay.ts');
required(decay.includes("export type IntentLevel = 'high' | 'mid' | 'weak' | 'none' | 'review'"), 'Intent keys must be stable English.');
required(!decay.includes("'高意向'"), 'intentDecay must not use Chinese union keys.');

const html = read('index.html');
required(html.includes('application/ld+json'), 'index.html must keep JSON-LD for the build to patch.');

const locCount = (sitemap.match(/<loc>/g) || []).length;
required(locCount === LOCALES.length, `Main sitemap must list exactly ${LOCALES.length} URLs, got ${locCount}.`);

required(exists('product-guide/en.md'), 'English guide markdown must exist.');
required(exists('product-guide/zh-Hant.md'), 'Traditional Chinese guide markdown must exist.');

if (exists('dist/index.html')) {
  const built = read('dist/index.html');
  required(built.includes('hreflang="zh-Hant"'), 'Built homepage must list zh-Hant hreflang.');
  required(built.includes('<noscript>'), 'Built homepage must include noscript copy.');
  required(exists('dist/en/index.html'), 'Built English homepage must exist.');
  required(exists('dist/zh-Hant/index.html'), 'Built Traditional Chinese homepage must exist.');
  required(exists('dist/404.html'), 'Built root 404 must exist.');
  required(
    /<html lang="en"[^>]*>/.test(read('dist/en/index.html')) &&
      !/<html lang="en"[^>]*lang=/.test(read('dist/en/index.html')),
    'English HTML must have a single lang=en.',
  );
  required(read('dist/en/index.html').includes(IDENTITY.en.title), 'English HTML must use English title.');
  required(!read('dist/_redirects').includes('/index.html   200'), 'Built _redirects must not SPA-fallback.');
  required(UMAMI_WEBSITE_IDS.leadshunter, 'LeadsHunter Umami website id must be provisioned.');
  required(built.includes(`${UMAMI_ORIGIN}${UMAMI_SCRIPT_PATH}`), 'Built homepage must embed Umami.');
  required(built.includes(UMAMI_WEBSITE_IDS.leadshunter), 'Built homepage must use the LeadsHunter Umami id.');
  required(read('dist/en/index.html').includes(UMAMI_WEBSITE_IDS.leadshunter), 'English homepage must embed Umami.');
  required(read('dist/zh-Hant/index.html').includes(UMAMI_WEBSITE_IDS.leadshunter), 'Traditional homepage must embed Umami.');
  required(read('dist/404.html').includes(UMAMI_WEBSITE_IDS.leadshunter), 'Main 404 must embed Umami.');
}

if (exists('dist-guide/index.html')) {
  const guide = read('dist-guide/index.html');
  required(guide.includes('hreflang="en"'), 'Guide HTML must include hreflang.');
  required(guide.includes('TechArticle'), 'Guide HTML must include TechArticle JSON-LD.');
  required(exists('dist-guide/en/index.html'), 'Guide English HTML must exist.');
  required(exists('dist-guide/zh-Hant/index.html'), 'Guide Traditional Chinese HTML must exist.');
  required(exists('dist-guide/robots.txt'), 'Guide host must ship its own robots.txt.');
  required(exists('dist-guide/sitemap.xml'), 'Guide host must ship its own sitemap.');
  required(!read('dist-guide/_redirects').includes('/index.html   200'), 'Guide must not SPA-fallback.');
  required(!read('dist-guide/sitemap.xml').includes('leadshunter.lancloudtech.com/'), 'Guide sitemap lists only this host.');
  required(guide.includes(UMAMI_WEBSITE_IDS.guide), 'Guide HTML must use the guide Umami id.');
  required(read('dist-guide/en/index.html').includes(UMAMI_WEBSITE_IDS.guide), 'Guide English HTML must embed Umami.');
  required(read('dist-guide/404.html').includes(UMAMI_WEBSITE_IDS.guide), 'Guide 404 must embed Umami.');
}

if (exists('dist-contact/index.html')) {
  const contact = read('dist-contact/index.html');
  required(contact.includes('ContactPage'), 'Contact HTML must include ContactPage JSON-LD.');
  required(exists('dist-contact/en/index.html'), 'Contact English HTML must exist.');
  required(exists('dist-contact/robots.txt'), 'Contact host must ship its own robots.txt.');
  required(!read('dist-contact/sitemap.xml').includes('leadshunter-guide.lancloudtech.com'), 'Contact sitemap must stay on-host.');
  required(contact.includes(UMAMI_WEBSITE_IDS.contact), 'Contact HTML must use the contact Umami id.');
  required(read('dist-contact/en/index.html').includes(UMAMI_WEBSITE_IDS.contact), 'Contact English HTML must embed Umami.');
  required(read('dist-contact/404.html').includes(UMAMI_WEBSITE_IDS.contact), 'Contact 404 must embed Umami.');
}

console.log(
  `PASS: LH SEO adapters OK — ${LOCALES.length} locales, hard 404, no SPA fallback, FAQ ${FAQ['zh-Hans'].length}, htmlLang ${HTML_LANG['zh-Hans']}/${HREFLANG.en}.`,
);
