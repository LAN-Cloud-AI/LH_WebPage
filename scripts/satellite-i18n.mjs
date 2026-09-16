import {
  CONTACT_ORIGIN,
  DEFAULT_LOCALE,
  GUIDE_ORIGIN,
  HREFLANG,
  HTML_LANG,
  IDENTITY,
  JSON_LD_LANG,
  LOCALES,
  OG_LOCALE,
  SITE_ORIGIN,
  localeHome,
} from '../src/content/identity.js';
import { sales } from './sales.mjs';
import { writeWelcomeRobots } from './ai-crawler-policy.mjs';
import { upsertAnalytics } from './site-analytics.mjs';

export {
  CONTACT_ORIGIN,
  DEFAULT_LOCALE,
  GUIDE_ORIGIN,
  HREFLANG,
  HTML_LANG,
  IDENTITY,
  LOCALES,
  OG_LOCALE,
  SITE_ORIGIN,
  localeHome,
};

export const GUIDE_MD = {
  'zh-Hans': '线索猎手-产品介绍与使用说明.md',
  'zh-Hant': 'zh-Hant.md',
  en: 'en.md',
};

export const GUIDE = {
  'zh-Hans': {
    title: '线索猎手｜产品介绍与使用说明',
    description:
      '从抖音、小红书发现购车需求，AI 识别意向、分发线索。了解后台与 APP 用法及长沙小鹏使用成果。',
    brandSub: '产品介绍与使用说明',
    openMenu: '打开目录',
    closeMenu: '关闭目录',
    drawer: '手册目录',
    drawerKicker: '目录',
    downloadPdf: '下载 PDF',
    downloadPdfShort: 'PDF',
    eyebrow: '线索猎手 · 产品图文手册',
    h1: '线索猎手',
    subtitle: '产品介绍与使用说明',
    lede: '让公开表达的购车需求，成为门店可以发现、理解和跟进的销售机会。',
    chips: ['汽车经销商 · DCC · 销售顾问', '后台 + APP', '公域需求发现', '长沙小鹏 · 使用案例'],
    hint: '点击配图可放大查看',
    zoom: '放大：',
    footer: '线索猎手 · 发现购车需求，连接门店与客户。',
    site: '产品官网',
    console: '进入后台',
    app: '获取 APP',
    contact: '联系销售',
    bannerAria: '联系线索猎手销售',
    bannerKicker: '添加线索猎手销售经理企业微信',
    bannerTitle: '预约线索猎手演示或开通试用',
    close: '关闭 · Esc',
    tocHeading: '阅读导航',
    quick: '快速入口',
    nav: [
      ['#what', '线索猎手是什么'],
      ['#why', '为什么有 DCC 和汽车垂媒，还需要线索猎手'],
      ['#channels', '如何扩大经销商的线索入口'],
      ['#console', '后台怎么用：配置、识别、指派与分发'],
      ['#app', 'APP 怎么用：查看、筛选、提醒与跟进'],
      ['#partners', '合作伙伴与使用效果'],
      ['#faq', '日常使用清单与常见问题'],
      ['contact', '联系销售经理'],
    ],
  },
  'zh-Hant': {
    title: '线索猎手｜產品介紹與使用說明',
    description:
      '從抖音、小紅書發現購車需求，AI 識別意向、分發線索。了解後台與 APP 用法及長沙小鵬使用成果。',
    brandSub: '產品介紹與使用說明',
    openMenu: '打開目錄',
    closeMenu: '關閉目錄',
    drawer: '手冊目錄',
    drawerKicker: '目錄',
    downloadPdf: '下載 PDF',
    downloadPdfShort: 'PDF',
    eyebrow: '线索猎手 · 產品圖文手冊',
    h1: '线索猎手',
    subtitle: '產品介紹與使用說明',
    lede: '讓公開表達的購車需求，成為門店可以發現、理解和跟進的銷售機會。',
    chips: ['汽車經銷商 · DCC · 銷售顧問', '後台 + APP', '公域需求發現', '長沙小鵬 · 使用案例'],
    hint: '點擊配圖可放大查看',
    zoom: '放大：',
    footer: '线索猎手 · 發現購車需求，連接門店與客戶。',
    site: '產品官網',
    console: '進入後台',
    app: '取得 APP',
    contact: '聯繫銷售',
    bannerAria: '聯繫线索猎手銷售',
    bannerKicker: '加入线索猎手銷售經理企業微信',
    bannerTitle: '預約线索猎手演示或開通試用',
    close: '關閉 · Esc',
    tocHeading: '閱讀導覽',
    quick: '快速入口',
    nav: [
      ['#what', '线索猎手是什麼'],
      ['#why', '為什麼有 DCC 和汽車垂媒，還需要线索猎手'],
      ['#channels', '如何擴大經銷商的線索入口'],
      ['#console', '後台怎麼用：配置、識別、指派與分發'],
      ['#app', 'APP 怎麼用：查看、篩選、提醒與跟進'],
      ['#partners', '合作夥伴與使用效果'],
      ['#faq', '日常使用清單與常見問題'],
      ['contact', '聯繫銷售經理'],
    ],
  },
  en: {
    title: '线索猎手 | Product guide',
    description:
      'Find car-buying demand on Douyin and Xiaohongshu, score intent with AI, and route leads. Console and app usage, plus the Changsha Xiaopeng case.',
    brandSub: 'Product guide',
    openMenu: 'Open table of contents',
    closeMenu: 'Close table of contents',
    drawer: 'Guide contents',
    drawerKicker: 'Contents',
    downloadPdf: 'Download PDF',
    downloadPdfShort: 'PDF',
    eyebrow: '线索猎手 · Illustrated guide',
    h1: '线索猎手',
    subtitle: 'Product introduction and how-to',
    lede: 'Turn publicly expressed car-buying demand into opportunities a store can find, understand, and follow up.',
    chips: ['Dealers · DCC · sales', 'Console + app', 'Public-domain demand', 'Changsha Xiaopeng case'],
    hint: 'Tap a figure to enlarge',
    zoom: 'Enlarge: ',
    footer: '线索猎手 · Find demand and connect stores with customers.',
    site: 'Official site',
    console: 'Open console',
    app: 'Get the app',
    contact: 'Contact sales',
    bannerAria: 'Contact 线索猎手 sales',
    bannerKicker: 'Add the 线索猎手 sales manager on WeCom',
    bannerTitle: 'Book a demo or start a store trial',
    close: 'Close · Esc',
    tocHeading: 'Contents',
    quick: 'Quick links',
    nav: [
      ['#what', 'What 线索猎手 is'],
      ['#why', 'Why it is still needed with DCC and auto media'],
      ['#channels', 'How to widen the dealer lead intake'],
      ['#console', 'Console: configure, score, assign, route'],
      ['#app', 'App: read, filter, notify, follow up'],
      ['#partners', 'Partners and results'],
      ['#faq', 'Daily checklist and FAQ'],
      ['contact', 'Contact the sales manager'],
    ],
  },
};

export const CONTACT = {
  'zh-Hans': {
    title: '联系线索猎手销售',
    description:
      '预约产品演示、开通门店试用或了解合作方案。电话、邮件或企业微信联系线索猎手销售经理。',
    h1: '联系线索猎手<wbr>销售',
    lede: '预约产品演示、开通门店试用，<br>或了解合作方案。<br>销售经理会在工作时间回复。',
    guide: '产品介绍',
    qrAlt: '线索猎手销售经理企业微信二维码，长按识别',
    qrTitle: '长按识别二维码',
    qrHint: '添加线索猎手销售经理<br>企业微信',
    phone: '电话',
    mail: '邮件',
    site: '产品官网',
    handbook: '图文手册',
    app: '获取 APP',
    channelsAria: '联系方式',
    moreAria: '相关页面',
  },
  'zh-Hant': {
    title: '聯繫线索猎手銷售',
    description:
      '預約產品演示、開通門店試用或了解合作方案。電話、郵件或企業微信聯繫线索猎手銷售經理。',
    h1: '聯繫线索猎手<wbr>銷售',
    lede: '預約產品演示、開通門店試用，<br>或了解合作方案。<br>銷售經理會在工作時間回覆。',
    guide: '產品介紹',
    qrAlt: '线索猎手銷售經理企業微信二維碼，長按識別',
    qrTitle: '長按識別二維碼',
    qrHint: '加入线索猎手銷售經理<br>企業微信',
    phone: '電話',
    mail: '郵件',
    site: '產品官網',
    handbook: '圖文手冊',
    app: '取得 APP',
    channelsAria: '聯繫方式',
    moreAria: '相關頁面',
  },
  en: {
    title: 'Contact 线索猎手 sales',
    description:
      'Book a product demo, start a store trial, or talk through a partnership. Call, email, or add the 线索猎手 sales manager on WeCom.',
    h1: 'Contact 线索猎手<wbr> sales',
    lede: 'Book a demo, open a store trial,<br>or discuss a partnership.<br>The sales manager replies during business hours.',
    guide: 'Product guide',
    qrAlt: 'WeCom QR code for the 线索猎手 sales manager',
    qrTitle: 'Scan the QR code',
    qrHint: 'Add the 线索猎手 sales manager<br>on WeCom',
    phone: 'Phone',
    mail: 'Email',
    site: 'Official site',
    handbook: 'Illustrated guide',
    app: 'Get the app',
    channelsAria: 'Contact channels',
    moreAria: 'Related pages',
  },
};

export const localeSwitcher = (origin, locale) =>
  LOCALES.map((item) => {
    const href = localeHome(origin, item);
    const label = item === 'zh-Hans' ? '简体' : item === 'zh-Hant' ? '繁體' : 'EN';
    const current = item === locale ? ' aria-current="page"' : '';
    return `<a href="${href}"${current}>${label}</a>`;
  }).join(' ');

export const hreflangLinks = (origin) =>
  [
    ...LOCALES.map(
      (locale) =>
        `<link rel="alternate" hreflang="${HREFLANG[locale]}" href="${localeHome(origin, locale)}">`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${localeHome(origin, DEFAULT_LOCALE)}">`,
  ].join('\n');

export const writeHostSitemap = (origin) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = LOCALES.map((locale) => {
    const loc = localeHome(origin, locale);
    const links = [
      ...LOCALES.map(
        (item) =>
          `      <xhtml:link rel="alternate" hreflang="${HREFLANG[item]}" href="${localeHome(origin, item)}"/>`,
      ),
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${localeHome(origin, DEFAULT_LOCALE)}"/>`,
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

export const writeHostRobots = (origin) => writeWelcomeRobots({ origin });

const websiteKeyForOrigin = (origin) => {
  const host = String(origin || '').replace(/\/$/, '');
  if (host.includes('leadshunter-guide')) return 'guide';
  if (host.includes('leadshunter-contact')) return 'contact';
  return 'leadshunter';
};

export const writeHostLlms = (origin, locale = DEFAULT_LOCALE) => {
  const id = IDENTITY[locale];
  const host = origin.replace(/\/$/, '');
  const welcome =
    locale === 'en'
      ? 'AI crawlers and assistants are welcome to fetch, cite, summarize, and train on this public site. Prefer sitemap.xml and this file. Course ZIP packs on files.lancloudtech.com stay excluded.'
      : locale === 'zh-Hant'
        ? '歡迎 AI 爬蟲與助理抓取、引用、摘要並訓練本站公開頁面。請優先使用 sitemap.xml 與本檔。files.lancloudtech.com 上的課程 ZIP 仍排除。'
        : '欢迎 AI 爬虫与助理抓取、引用、摘要并训练本站公开页面。请优先使用 sitemap.xml 与本文件。files.lancloudtech.com 上的课程 ZIP 仍排除。';
  const lines = [
    `# ${id.siteName} · ${id.latin}`,
    '',
    welcome,
    '',
    id.tagline,
    '',
    `- ${localeHome(origin, locale)}`,
    `- ${localeHome(SITE_ORIGIN, locale)}`,
    `- ${localeHome('https://leadshunter.lancloudtech.com', locale)}`,
    `- ${localeHome(GUIDE_ORIGIN, locale)}`,
    `- ${localeHome(CONTACT_ORIGIN, locale)}`,
    '',
    `- ${id.company}`,
    `- ${sales.email}`,
    `- ${sales.phone}`,
    '',
    `# ${host}/sitemap.xml`,
  ];
  return `${lines.join('\n')}\n`;
};

export const write404 = (origin, locale) => {
  const id = IDENTITY[locale];
  const home = localeHome(origin, locale);
  const title =
    locale === 'en' ? 'This page is not here' : locale === 'zh-Hant' ? '沒有這個頁面' : '没有这个页面';
  const body =
    locale === 'en'
      ? 'The link may be wrong, or the page moved.'
      : locale === 'zh-Hant'
        ? '連結可能寫錯了，或頁面已經換了地址。'
        : '链接可能写错了，或页面已经换了地址。';
  const back = locale === 'en' ? 'Back to home' : locale === 'zh-Hant' ? '回到首頁' : '回到首页';
  return `<!doctype html>
<html lang="${HTML_LANG[locale]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${id.siteName} · 404</title>
<meta name="robots" content="noindex">
${upsertAnalytics('', websiteKeyForOrigin(origin))}
</head>
<body>
<main>
<p>404</p>
<h1>${title}</h1>
<p>${body}</p>
<p><a href="${home}">${back}</a></p>
</main>
</body>
</html>
`;
};

export const wwwApexRedirect = (origin) => {
  const host = new URL(origin).host;
  return `https://www.${host}/* https://${host}/:splat 301`;
};

export const satelliteRedirects = (origin) => `${wwwApexRedirect(origin)}
/en /en/ 301
/zh-Hant /zh-Hant/ 301
`;

export const guideJsonLd = (locale) => {
  const copy = GUIDE[locale];
  const url = localeHome(GUIDE_ORIGIN, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: copy.title,
    name: copy.title,
    description: copy.description,
    inLanguage: JSON_LD_LANG[locale],
    url,
    image: `${GUIDE_ORIGIN.replace(/\/$/, '')}/assets/leadshunter-app-logo.jpg`,
    author: { '@type': 'Organization', name: IDENTITY[locale].company, url: SITE_ORIGIN },
    publisher: { '@type': 'Organization', name: IDENTITY[locale].company, url: SITE_ORIGIN },
  };
};

export const contactJsonLd = (locale) => {
  const copy = CONTACT[locale];
  const url = localeHome(CONTACT_ORIGIN, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: copy.title,
    description: copy.description,
    inLanguage: JSON_LD_LANG[locale],
    url,
    mainEntity: {
      '@type': 'Organization',
      name: IDENTITY[locale].siteName,
      telephone: sales.phone,
      email: sales.email,
      url: SITE_ORIGIN,
    },
  };
};

export const localePrefixDir = (locale) =>
  locale === DEFAULT_LOCALE ? '' : locale === 'en' ? 'en' : 'zh-Hant';
