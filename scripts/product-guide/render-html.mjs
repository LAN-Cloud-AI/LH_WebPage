import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { sales } from '../sales.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../product-guide');
const shareTitle = '线索猎手｜产品介绍与使用说明';
const shareDescription = '从抖音、小红书发现购车需求，AI 识别意向、分发线索。了解后台与 APP 用法及长沙小鹏使用成果。';
const canonicalUrl = sales.guide;
const shareImagePath = 'assets/leadshunter-app-logo.jpg';
const logoVersion = createHash('sha256').update(await fs.readFile(path.join(root, shareImagePath))).digest('hex').slice(0, 12);
const shareImageUrl = new URL(`${shareImagePath}?v=${logoVersion}`, canonicalUrl).href;
const appIconPath = 'assets/leadshunter-app-icon.png';
const css = await fs.readFile(path.join(here, 'guide.css'), 'utf8');

const nav = [
  ['#what', '线索猎手是什么'],
  ['#why', '为什么有 DCC 和汽车垂媒，还需要线索猎手'],
  ['#channels', '如何扩大经销商的线索入口'],
  ['#console', '后台怎么用：配置、识别、指派与分发'],
  ['#app', 'APP 怎么用：查看、筛选、提醒与跟进'],
  ['#partners', '合作伙伴与使用效果'],
  ['#faq', '日常使用清单与常见问题'],
  [sales.contact, '联系销售经理'],
];

const md = await fs.readFile(path.join(root, '线索猎手-产品介绍与使用说明.md'), 'utf8');
let body = marked.parse(md, { gfm: true });
body = body.replace(/<h1>[\s\S]*?<\/h1>/, '').replace(/<blockquote>[\s\S]*?<\/blockquote>/, '');
body = body.replace(/<h2>阅读导航<\/h2>[\s\S]*?(?=<a id="what")/, '');
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
    return `<figure class="${klass}"><button class="image-button" aria-label="放大：${alt}" data-image="${src}" data-alt="${alt}"><img src="${src}" alt="${alt}"></button><figcaption>${caption}</figcaption></figure>`;
  },
);
body = body.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, '</table></div>');
body = body.replace(
  /<p><strong>快速入口<\/strong>：([\s\S]*?)<\/p>/,
  (_, links) => `<div class="quick-links"><p>快速入口</p>${links.replace(/href="#contact"/g, `href="${sales.contact}"`).replace(/\s*·\s*/g, '')}</div>`,
);

const navItems = nav
  .map(([href, title], index) => `<a href="${href}"><span class="index">${String(index + 1).padStart(2, '0')}</span>${title}</a>`)
  .join('');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#12314e">
<title>${shareTitle}</title>
<meta name="description" content="${shareDescription}">
<meta name="application-name" content="线索猎手">
<link rel="canonical" href="${canonicalUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="线索猎手">
<meta property="og:locale" content="zh_CN">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${shareTitle}">
<meta property="og:description" content="${shareDescription}">
<meta property="og:image" content="${shareImageUrl}">
<meta property="og:image:secure_url" content="${shareImageUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="1024">
<meta property="og:image:alt" content="线索猎手 APP Logo">
<meta itemprop="name" content="${shareTitle}">
<meta itemprop="description" content="${shareDescription}">
<meta itemprop="image" content="${shareImageUrl}">
<link rel="image_src" href="${shareImageUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${shareTitle}">
<meta name="twitter:description" content="${shareDescription}">
<meta name="twitter:image" content="${shareImageUrl}">
<meta name="twitter:image:alt" content="线索猎手 APP Logo">
<link rel="icon" type="image/png" sizes="256x256" href="${appIconPath}?v=${logoVersion}">
<link rel="apple-touch-icon" sizes="256x256" href="${appIconPath}?v=${logoVersion}">
<style>
${css}
</style>
</head>
<body>
<header class="topbar">
  <button class="icon-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="打开目录">
    <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
  </button>
  <a class="brand" href="${sales.site}">
    <img src="${appIconPath}" width="28" height="28" alt="">
    <span class="brand-text">
      <span class="brand-name">线索猎手</span>
      <span class="brand-sub">产品介绍与使用说明</span>
    </span>
  </a>
  <div class="topbar-actions">
    <a class="btn btn-ghost" href="leadshunter-guide.pdf" download="线索猎手-产品介绍与使用说明.pdf"><span class="wide-only">下载 </span>PDF</a>
  </div>
</header>

<div class="backdrop" id="backdrop"></div>
<nav class="drawer" id="menu" aria-label="手册目录">
  <p class="drawer-kicker">目录</p>
  ${navItems}
  <a class="btn btn-primary download" href="leadshunter-guide.pdf" download="线索猎手-产品介绍与使用说明.pdf">下载 PDF</a>
</nav>

<header class="hero">
  <div class="hero-inner">
    <div class="eyebrow">LEADSHUNTER · 产品图文手册</div>
    <h1>线索猎手</h1>
    <p class="subtitle">产品介绍与使用说明</p>
    <p>让公开表达的购车需求，成为门店可以发现、理解和跟进的销售机会。</p>
    <div class="chips">
      <span>汽车经销商 · DCC · 销售顾问</span>
      <span>后台 + APP</span>
      <span>公域需求发现</span>
      <span>长沙小鹏 · 使用案例</span>
    </div>
  </div>
</header>

<main>
  <div class="hint">点击配图可放大查看</div>
  ${body}
</main>

<footer class="site-footer">
  线索猎手 · 发现购车需求，连接门店与客户。
  <div>
    <a href="${sales.site}">产品官网</a>
    <a href="${sales.console}">进入后台</a>
    <a href="${sales.appstore}">获取 APP</a>
    <a href="${sales.contact}">联系销售</a>
  </div>
</footer>

<aside class="sales-banner" aria-label="联系线索猎手销售">
  <div class="sales-banner__inner">
    <div class="sales-banner__copy">
      <p class="sales-banner__kicker">添加线索猎手销售经理企业微信</p>
      <p class="sales-banner__title">预约线索猎手演示或开通试用</p>
    </div>
    <a class="btn btn-primary sales-banner__cta" href="${sales.contact}">联系销售</a>
  </div>
</aside>

<dialog id="viewer">
  <button type="button">关闭 · Esc</button>
  <img alt="">
</dialog>

<script>
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const backdrop = document.getElementById('backdrop');
const openMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
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

await fs.writeFile(path.join(root, '线索猎手-图文阅读版.html'), html);
console.log(JSON.stringify({ figures: (html.match(/<figure /g) || []).length, htmlBytes: Buffer.byteLength(html) }));
