/** @typedef {'zh-Hans' | 'zh-Hant' | 'en'} SiteLocale */

export const SITE_ORIGIN = 'https://leadshunter.lancloudtech.com';
export const GUIDE_ORIGIN = 'https://leadshunter-guide.lancloudtech.com';
export const CONTACT_ORIGIN = 'https://leadshunter-contact.lancloudtech.com';
export const COMPANY_ORIGIN = 'https://lancloudtech.com';

export const LOCALES = /** @type {const} */ (['zh-Hans', 'zh-Hant', 'en']);
export const DEFAULT_LOCALE = 'zh-Hans';

export const LOCALE_PREFIX = {
  'zh-Hans': '',
  'zh-Hant': '/zh-Hant',
  en: '/en',
};

export const HTML_LANG = {
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-Hant',
  en: 'en',
};

export const HREFLANG = {
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-Hant',
  en: 'en',
};

export const OG_LOCALE = {
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
  en: 'en_US',
};

export const JSON_LD_LANG = {
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-Hant',
  en: 'en',
};

/** @type {Record<SiteLocale, { siteName: string, latin: string, tagline: string, title: string, description: string, ogDescription: string, imageAlt: string, company: string, keywords: string }>} */
export const IDENTITY = {
  'zh-Hans': {
    siteName: '线索猎手',
    latin: 'LeadsHunter',
    tagline: '从公开内容中发现可跟进的销售线索，把真实需求更早送到销售手上。',
    title: '线索猎手 · 从公开内容发现高意向销售线索',
    description:
      '线索猎手持续监测抖音、小红书公开评论与帖子，用 AI 五档判断购车意向并生成跟进建议，经三层线索池分发到销售端 App。',
    ogDescription: '持续监测抖音、小红书公开内容，AI 五档识别购车意向，三池分发到销售手机。',
    imageAlt: '线索猎手',
    company: '四川兰芯云朵智能科技有限公司',
    keywords: '线索猎手,LeadsHunter,汽车销售线索,购车意向,抖音获客,小红书获客,线索分发,AI线索',
  },
  'zh-Hant': {
    siteName: '線索獵手',
    latin: 'LeadsHunter',
    tagline: '從公開內容中發現可跟進的銷售線索，把真實需求更早送到銷售手上。',
    title: '線索獵手 · 從公開內容發現高意向銷售線索',
    description:
      '線索獵手持續監測抖音、小紅書公開評論與帖子，用 AI 五檔判斷購車意向並生成跟進建議，經三層線索池分發到銷售端 App。',
    ogDescription: '持續監測抖音、小紅書公開內容，AI 五檔識別購車意向，三池分發到銷售手機。',
    imageAlt: '線索獵手',
    company: '四川蘭芯雲朵智能科技有限公司',
    keywords: '線索獵手,LeadsHunter,汽車銷售線索,購車意向,抖音獲客,小紅書獲客,線索分發,AI線索',
  },
  en: {
    siteName: 'LeadsHunter',
    latin: 'LeadsHunter',
    tagline: 'Find followable sales leads in public content and get real demand to sales earlier.',
    title: 'LeadsHunter · Find high-intent auto sales leads in public content',
    description:
      'LeadsHunter monitors public Douyin and Xiaohongshu comments and posts, scores purchase intent in five levels with AI, writes follow-up suggestions, and routes leads through three pools to the sales app.',
    ogDescription:
      'Monitor public Douyin and Xiaohongshu content, score purchase intent in five levels, and route leads to sales phones.',
    imageAlt: 'LeadsHunter',
    company: 'Sichuan Lanxin Yunduo Intelligent Technology Co., Ltd.',
    keywords:
      'LeadsHunter,auto sales leads,purchase intent,Douyin,Xiaohongshu,lead routing,AI leads',
  },
};

/** @type {Record<SiteLocale, { q: string, a: string }[]>} */
export const FAQ = {
  'zh-Hans': [
    {
      q: '线索来自哪里，会有合规风险吗？',
      a: '全部来自抖音、小红书上公开可见的评论与帖子——任何人打开对应内容都能看到同样的信息。系统不接触私信、不获取通讯录、不使用任何需要用户授权才能访问的数据。作者主页与原帖也不是直接暴露链接，而是通过服务端签发的一次性短链打开，访问过程留痕。',
    },
    {
      q: '意向判断准不准，会不会把卖家和同行也算成客户？',
      a: '判断顺序是先角色后语义：先确定说话人是买家候选、卖家、已购车主还是同行车商，再看这句话在做什么。卖家回复、同行广告、已购复盘在角色这一步就被排除。另外系统不做关键词硬匹配，"补贴"这个词出现在卖家话术里和出现在买家提问里会得到完全不同的结论。证据不足或角色冲突的会归入待复核，交人工确认而不是硬判一个等级。',
    },
    {
      q: '为什么线索会自己降级？',
      a: '因为购车需求有时效。同一句"有没有现车"，两小时前问和两周前问的价值差别很大。系统把语义意向和评论年龄分开处理：大模型只判断语义，本地确定性代码再叠加时间衰减重算最终等级。高意向超过 7 天、中意向超过 14 天会归为无意向，不再占用销售的待办列表。',
    },
    {
      q: '销售会不会看到别人的线索？',
      a: '不会。销售端 App 只呈现落到本人账号的线索，同组同事的线索也看不到。这个限制在接口层就生效，不是靠前端隐藏。App 本身是只读的，不提供归属确认、组织指派或账号分发能力，相关变更接口对销售角色完全不开放。',
    },
    {
      q: '接入需要做什么，多久能看到线索？',
      a: '经销商侧只需要提供要监测的关键词、竞品账号和目标区域，由管理员配置成监测主题。配置完成当天 00:00 起开始定时采集，评分完成即进入三池分发流程。销售账号在席位配额内由经销商管理员自行创建，销售安装 App 登录后即可接收分配到自己的线索。',
    },
    {
      q: '怎样阅读完整产品介绍，或直接联系销售经理？',
      a: '完整产品介绍挂在 leadshunter-guide.lancloudtech.com，官网同步嵌入该页面。合作咨询打开 leadshunter-contact.lancloudtech.com，或致电 +86-17380566771、发送邮件至 lance@lancloudtech.com、添加企业微信。',
    },
  ],
  'zh-Hant': [
    {
      q: '線索來自哪裡，會有合規風險嗎？',
      a: '全部來自抖音、小紅書上公開可見的評論與帖子——任何人打開對應內容都能看到同樣的資訊。系統不接觸私信、不取得通訊錄、不使用任何需要使用者授權才能存取的資料。作者主頁與原帖也不是直接暴露連結，而是透過伺服器簽發的一次性短鏈打開，造訪過程留痕。',
    },
    {
      q: '意向判斷準不準，會不會把賣家和同行也算成客戶？',
      a: '判斷順序是先角色後語義：先確定說話人是買家候選、賣家、已購車主還是同行車商，再看這句話在做什麼。賣家回覆、同行廣告、已購復盤在角色這一步就被排除。另外系統不做關鍵詞硬匹配，「補貼」這個詞出現在賣家話術裡和出現在買家提問裡會得到完全不同的結論。證據不足或角色衝突的會歸入待覆核，交人工確認而不是硬判一個等級。',
    },
    {
      q: '為什麼線索會自己降級？',
      a: '因為購車需求有時效。同一句「有沒有現車」，兩小時前問和兩週前問的價值差別很大。系統把語義意向和評論年齡分開處理：大模型只判斷語義，本地確定性程式再疊加時間衰減重算最終等級。高意向超過 7 天、中意向超過 14 天會歸為無意向，不再占用銷售的待辦列表。',
    },
    {
      q: '銷售會不會看到別人的線索？',
      a: '不會。銷售端 App 只呈現落到本人帳號的線索，同組同事的線索也看不到。這個限制在介面層就生效，不是靠前端隱藏。App 本身是唯讀的，不提供歸屬確認、組織指派或帳號分發能力，相關變更介面對銷售角色完全不開放。',
    },
    {
      q: '接入需要做什麼，多久能看到線索？',
      a: '經銷商側只需要提供要監測的關鍵詞、競品帳號和目標區域，由管理員配置成監測主題。配置完成當天 00:00 起開始定時採集，評分完成即進入三池分發流程。銷售帳號在席位配額內由經銷商管理員自行建立，銷售安裝 App 登入後即可接收分配到自己的線索。',
    },
    {
      q: '怎樣閱讀完整產品介紹，或直接聯繫銷售經理？',
      a: '完整產品介紹掛在 leadshunter-guide.lancloudtech.com，官網同步嵌入該頁面。合作諮詢打開 leadshunter-contact.lancloudtech.com，或致電 +86-17380566771、發送郵件至 lance@lancloudtech.com、加入企業微信。',
    },
  ],
  en: [
    {
      q: 'Where do leads come from, and is that compliant?',
      a: 'Every lead comes from publicly visible Douyin and Xiaohongshu comments and posts — anyone who opens the same content sees the same text. The system never touches DMs, contacts, or any data that requires user authorization. Author profiles and original posts open through one-time server-signed short links, and each visit is logged.',
    },
    {
      q: 'How accurate is intent scoring? Will sellers and competitors be counted as customers?',
      a: 'Scoring is role first, then meaning: the model decides whether the speaker is a buyer candidate, a seller, an existing owner, or a competing dealer before it reads the ask. Seller replies, competitor ads, and post-purchase recaps drop out at the role step. There is no keyword hard-match — the word “subsidy” in a seller pitch and in a buyer question produce different results. Ambiguous or conflicting cases go to review instead of a forced grade.',
    },
    {
      q: 'Why do leads decay on their own?',
      a: 'Car-buying demand expires. “Do you have stock?” asked two hours ago is not the same as two weeks ago. Semantic intent and comment age are handled separately: the model only reads meaning; local deterministic code then applies time decay. High intent older than 7 days and mid intent older than 14 days become none, so they stop occupying a salesperson’s queue.',
    },
    {
      q: 'Can salespeople see other people’s leads?',
      a: 'No. The sales app only shows leads assigned to that account — not even teammates in the same group. The limit is enforced at the API, not by hiding UI. The app is read-only: it cannot confirm ownership, assign within the org, or fan out accounts, and those mutation APIs are closed to the sales role.',
    },
    {
      q: 'What does onboarding take, and when do leads appear?',
      a: 'The dealer provides keywords, competitor accounts, and target regions; an admin turns them into monitoring topics. Collection starts at 00:00 the same day the config is saved, and scored leads enter the three-pool flow immediately. Dealer admins create sales seats within quota; once the app is installed, assigned leads arrive on that phone.',
    },
    {
      q: 'Where can I read the full product guide or contact sales?',
      a: 'The illustrated guide lives at leadshunter-guide.lancloudtech.com and is embedded on the official site. For a demo or trial, open leadshunter-contact.lancloudtech.com, call +86-17380566771, email lance@lancloudtech.com, or add the WeCom card.',
    },
  ],
};

/** @type {Record<SiteLocale, Record<string, { label: string, blurb: string }>>} */
export const INTENT_COPY = {
  'zh-Hans': {
    high: { label: '高意向', blurb: '买家本人且有明确可行动的交易需求' },
    mid: { label: '中意向', blurb: '在了解车型、配置与流程，尚无成交动作' },
    weak: { label: '弱意向', blurb: '轻度兴趣或上下文相关短句，证据偏弱' },
    none: { label: '无意向', blurb: '卖家回复、已购复盘、同行广告或无关内容' },
    review: { label: '待复核', blurb: '角色或语境冲突、证据不足，交人工确认' },
  },
  'zh-Hant': {
    high: { label: '高意向', blurb: '買家本人且有明確可行動的交易需求' },
    mid: { label: '中意向', blurb: '在了解車型、配置與流程，尚無成交動作' },
    weak: { label: '弱意向', blurb: '輕度興趣或上下文相關短句，證據偏弱' },
    none: { label: '無意向', blurb: '賣家回覆、已購復盤、同行廣告或無關內容' },
    review: { label: '待覆核', blurb: '角色或語境衝突、證據不足，交人工確認' },
  },
  en: {
    high: { label: 'High', blurb: 'The buyer is speaking and the ask is actionable' },
    mid: { label: 'Mid', blurb: 'Comparing models, trims, or process — no close yet' },
    weak: { label: 'Weak', blurb: 'Light interest or a thin contextual line' },
    none: { label: 'None', blurb: 'Seller reply, owner recap, competitor ad, or off-topic' },
    review: { label: 'Review', blurb: 'Role or context conflicts; a human should confirm' },
  },
};

export const SHARE_IMAGE = `${SITE_ORIGIN}/assets/wechat-share.jpg?v=20260828-logo`;
export const SHARE_IMAGE_WIDTH = 1024;
export const SHARE_IMAGE_HEIGHT = 1024;

/**
 * @param {string} origin
 * @param {SiteLocale} locale
 */
export function localeHome(origin, locale) {
  const prefix = LOCALE_PREFIX[locale];
  const base = origin.replace(/\/$/, '');
  return prefix ? `${base}${prefix}/` : `${base}/`;
}

/**
 * @param {SiteLocale} locale
 */
export function hreflangLinks(localeHomeFn = localeHome) {
  return [
    ...LOCALES.map((locale) => ({
      hreflang: HREFLANG[locale],
      href: localeHomeFn(SITE_ORIGIN, locale),
    })),
    { hreflang: 'x-default', href: localeHomeFn(SITE_ORIGIN, DEFAULT_LOCALE) },
  ];
}
