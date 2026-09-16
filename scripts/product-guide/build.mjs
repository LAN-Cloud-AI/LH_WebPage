import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sales } from '../sales.mjs';
import {
  DEFAULT_LOCALE,
  GUIDE_ORIGIN,
  LOCALES,
  localePrefixDir,
  satelliteRedirects,
  write404,
  writeHostLlms,
  writeHostRobots,
  writeHostSitemap,
} from '../satellite-i18n.mjs';
import { upsertAnalytics } from '../site-analytics.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(root, 'product-guide');
const output = path.join(root, 'dist-guide');
const pdfName = '线索猎手-产品介绍与使用说明.pdf';
const htmlByLocale = {
  'zh-Hans': path.join(source, '线索猎手-图文阅读版.html'),
  'zh-Hant': path.join(source, 'zh-Hant.html'),
  en: path.join(source, 'en.html'),
};

const pdf = await fs.readFile(path.join(source, 'leadshunter-guide.pdf'));
if (pdf.subarray(0, 5).toString() !== '%PDF-') throw new Error('A valid PDF is required');

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(path.join(output, 'assets'), { recursive: true });

const allAssets = new Set();
for (const locale of LOCALES) {
  const html = await fs.readFile(htmlByLocale[locale], 'utf8');
  if (!html.includes('href=') || html.includes('下载 Markdown')) {
    throw new Error(`${locale} guide must offer the PDF download, not Markdown`);
  }
  if (!html.includes('sales-banner__cta')) {
    throw new Error(`${locale} guide must keep the sales banner`);
  }
  if (!html.includes('"@type":"TechArticle"') && !html.includes('"@type": "TechArticle"')) {
    throw new Error(`${locale} guide needs TechArticle JSON-LD`);
  }
  if (html.includes('案例统计口径.md') || html.includes('资料来源与图片索引.md')) {
    throw new Error('The public page must not link to editorial documents');
  }
  const assets = [...new Set([...html.matchAll(/<(?:img|button)\b[^>]*(?:src|data-image)="([^"]+)"/g)].map((match) => match[1].replace(/^\.\.\//, '')))];
  for (const asset of assets) {
    if (asset.startsWith('http') || asset.endsWith('.pdf')) continue;
    if (!/^assets\/[\w.-]+\.(png|jpg|svg)$/.test(asset)) {
      throw new Error(`Unexpected image path: ${asset}`);
    }
    allAssets.add(asset);
  }
  const dir = path.join(output, localePrefixDir(locale));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), upsertAnalytics(html, 'guide'));
  await fs.writeFile(path.join(dir, '404.html'), write404(GUIDE_ORIGIN, locale));
  await fs.writeFile(path.join(dir, 'llms.txt'), writeHostLlms(GUIDE_ORIGIN, locale));
}

const shareAssets = ['assets/leadshunter-app-logo.jpg', 'assets/leadshunter-app-icon.png'];
for (const asset of shareAssets) allAssets.add(asset);
for (const asset of allAssets) {
  await fs.access(path.join(source, asset));
  await fs.copyFile(path.join(source, asset), path.join(output, asset));
}

const illustrations = [...allAssets].filter((asset) => !shareAssets.includes(asset));
if (illustrations.length !== 31) {
  throw new Error(`Expected 31 illustrations; found ${illustrations.length}`);
}

await fs.writeFile(path.join(output, 'leadshunter-guide.pdf'), pdf);
await fs.writeFile(path.join(output, 'robots.txt'), writeHostRobots(GUIDE_ORIGIN));
await fs.writeFile(path.join(output, 'llms.txt'), writeHostLlms(GUIDE_ORIGIN, DEFAULT_LOCALE));
await fs.writeFile(path.join(output, 'sitemap.xml'), writeHostSitemap(GUIDE_ORIGIN));
await fs.writeFile(path.join(output, '_redirects'), satelliteRedirects(GUIDE_ORIGIN));
await fs.mkdir(path.join(output, 'functions'), { recursive: true });
await fs.copyFile(path.join(root, 'functions/_middleware.js'), path.join(output, 'functions/_middleware.js'));
await fs.writeFile(path.join(output, '_headers'), [
  '/leadshunter-guide.pdf',
  `  Content-Disposition: attachment; filename="leadshunter-guide.pdf"; filename*=UTF-8''${encodeURIComponent(pdfName)}`,
  '  Cache-Control: public, max-age=0, must-revalidate',
  '',
].join('\n'));

const zh = await fs.readFile(htmlByLocale[DEFAULT_LOCALE], 'utf8');
if (!zh.includes(`href="${sales.contact}"`) && !zh.includes('leadshunter-contact.lancloudtech.com')) {
  throw new Error('The sales banner must open the contact Pages site');
}

console.log(
  JSON.stringify({
    output,
    locales: LOCALES,
    illustrations: illustrations.length,
    sharingAssets: shareAssets.length,
  }),
);
