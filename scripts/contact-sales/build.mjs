import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { sales } from '../sales.mjs';

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
const title = '联系线索猎手销售';
const description = '预约产品演示、开通门店试用或了解合作方案。电话、邮件或企业微信联系线索猎手销售经理。';

const icons = {
  phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.2 3.8c.4-.5 1.1-.6 1.6-.3l2.1 1.3c.5.3.7.9.5 1.5l-.8 2.3a1.2 1.2 0 0 1-.7.7 8.8 8.8 0 0 0 4.8 4.8c.3.1.6 0 .7-.3l2.3-.8c.6-.2 1.2 0 1.5.5l1.3 2.1c.3.5.2 1.2-.3 1.6l-1.5 1.2c-.5.4-1.2.6-1.8.4C11.4 18 6 12.6 4.8 6.1c-.2-.6 0-1.3.4-1.8Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2.2"/><path d="m4.2 7.2 7.1 5.2c.4.3 1 .3 1.4 0l7.1-5.2"/></svg>',
};

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f3f5f8">
<meta name="color-scheme" content="light">
<title>${title}｜线索猎手</title>
<meta name="description" content="${description}">
<meta name="application-name" content="线索猎手">
<link rel="canonical" href="${sales.contact}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="线索猎手">
<meta property="og:locale" content="zh_CN">
<meta property="og:url" content="${sales.contact}">
<meta property="og:title" content="${title}｜线索猎手">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${shareImageUrl}">
<meta property="og:image:secure_url" content="${shareImageUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="1024">
<meta property="og:image:alt" content="线索猎手 APP Logo">
<meta itemprop="name" content="${title}｜线索猎手">
<meta itemprop="description" content="${description}">
<meta itemprop="image" content="${shareImageUrl}">
<link rel="image_src" href="${shareImageUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}｜线索猎手">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${shareImageUrl}">
<meta name="twitter:image:alt" content="线索猎手 APP Logo">
<link rel="icon" type="image/png" href="assets/leadshunter-app-icon.png?v=${logoVersion}">
<link rel="apple-touch-icon" href="assets/leadshunter-app-icon.png?v=${logoVersion}">
<style>
${css}
</style>
</head>
<body>
  <div class="page">
    <header class="top">
      <a class="brand" href="${sales.site}">
        <img src="assets/leadshunter-app-icon.png" width="32" height="32" alt="">
        <span>
          <span class="brand-name">线索猎手</span>
          <span class="brand-sub">LEADSHUNTER</span>
        </span>
      </a>
      <a class="top-link" href="${sales.guide}">产品介绍</a>
    </header>

    <p class="kicker">SALES</p>
    <h1>联系线索猎手<wbr>销售</h1>
    <p class="lede">预约产品演示、开通门店试用，<br>或了解合作方案。<br>销售经理会在工作时间回复。</p>

    <section class="panel" aria-label="联系方式">
      <div class="qr">
        <img src="assets/wecom-qr.png" width="220" height="220" alt="线索猎手销售经理企业微信二维码，长按识别">
      </div>
      <p class="qr-title">长按识别二维码</p>
      <p class="qr-hint">添加线索猎手销售经理<br>企业微信</p>

      <div class="channels">
        <a class="channel" href="${sales.phoneHref}" aria-label="打电话 ${sales.phone}">
          <span class="channel-logo">${icons.phone}</span>
          <span class="channel-text">
            <span class="channel-label">电话</span>
            <span class="channel-value channel-value--phone">${sales.phone}</span>
          </span>
        </a>
        <a class="channel" href="${sales.mailHref}" aria-label="发邮件 ${sales.email}">
          <span class="channel-logo">${icons.mail}</span>
          <span class="channel-text">
            <span class="channel-label">邮件</span>
            <span class="channel-value">lance@<wbr>lancloudtech.com</span>
          </span>
        </a>
      </div>
    </section>

    <nav class="more" aria-label="相关页面">
      <a href="${sales.site}">产品官网</a>
      <a href="${sales.guide}">图文手册</a>
      <a href="${sales.appstore}">获取 APP</a>
    </nav>

    <p class="legal">
      <span>${sales.company}</span>
      <a href="${sales.beianHref}" target="_blank" rel="noreferrer noopener">${sales.beian}</a>
    </p>
  </div>
</body>
</html>
`;

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(path.join(output, 'assets'), { recursive: true });
await fs.writeFile(path.join(output, 'index.html'), html);
await fs.copyFile(iconSrc, path.join(output, 'assets/leadshunter-app-icon.png'));
await fs.copyFile(logoSrc, path.join(output, 'assets/leadshunter-app-logo.jpg'));
await fs.copyFile(qrSrc, path.join(output, 'assets/wecom-qr.png'));
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
    '/assets/leadshunter-app-logo.jpg',
    '  Cache-Control: public, max-age=604800',
    '  Access-Control-Allow-Origin: *',
    '',
  ].join('\n'),
);

if (!html.includes(sales.phone) || !html.includes('assets/wecom-qr.png') || !html.includes('channel-logo')) {
  throw new Error('Contact page is missing sales details');
}

console.log(JSON.stringify({ output, bytes: Buffer.byteLength(html) }));
