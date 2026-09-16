import { Br } from '../../components/primitives/Br';
import type { IntentLevel } from '../../lib/intentDecay';
import { FAQ, IDENTITY } from '../identity.js';

/**
 * English copy bundle. Shape matches ../site; selected at runtime by pathname.
 */

export const site = {
  brand: {
    name: IDENTITY.en.siteName,
    latin: 'Sales lead workspace',
    company: IDENTITY.en.company,
    icon: '/assets/icon/app-256.png',
    beian: '蜀ICP备2026002396号',
  },

  origin: 'https://leadshunter.lancloudtech.com',

  links: {
    home: 'https://leadshunter.lancloudtech.com/',
    guide: 'https://leadshunter-guide.lancloudtech.com/',
    contact: 'https://leadshunter-contact.lancloudtech.com/',
    demoForm: 'https://mcnrhzccf0jd.feishu.cn/share/base/form/shrcnJQiDATOar41Kyk0DrqeCbe',
    demoMail:
      'mailto:lance@lancloudtech.com?subject=%E7%BA%BF%E7%B4%A2%E7%8C%8E%E6%89%8B%E4%BA%A7%E5%93%81%E6%BC%94%E7%A4%BA%E5%92%A8%E8%AF%A2',
    wecom: 'https://work.weixin.qq.com/ct/wcde518f3ee4ac1b506616d06dedf1fb6f60',
    appstore: 'https://appstore.lancloudtech.com/app?id=leadshunter',
    company: 'https://lancloudtech.com/',
    companyProduct: 'https://lancloudtech.com/#leadshunter',
    beian: 'https://beian.miit.gov.cn/',
  },

  contact: {
    role: 'Sales manager',
    phone: '+86-17380566771',
    phoneHref: 'tel:+8617380566771',
    email: 'lance@lancloudtech.com',
    wecomQr: '/assets/wecom-qr.png',
  },

  nav: [
    { href: '#pipeline', label: 'How it works' },
    { href: '#intent', label: 'Intent scoring' },
    { href: '#pools', label: 'Three pools' },
    { href: '#surfaces', label: 'Product' },
    { href: '#roles', label: 'Roles' },
    { href: '#faq', label: 'FAQ' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  pill: 'AI scores public car-buying intent in real time',
  titleLines: ['Find followable sales leads', 'in public content'],
  lede: 'Monitor public Douyin and Xiaohongshu comments and posts, score purchase intent, write a summary and next step, then route the lead through three pools to a salesperson’s phone.',
  primaryCta: 'Book a demo',
  secondaryCta: 'See how it works',
  facts: [
    { index: '01', label: 'Continuous public-content monitoring' },
    { index: '02', label: 'Five-level purchase-intent scoring' },
    { index: '03', label: 'Three-layer lead-pool routing' },
    { index: '04', label: 'Instant alerts on the sales app' },
  ],
};

// ---------------------------------------------------------------------------
// Metrics: product-capability counts, not demo statistics
// ---------------------------------------------------------------------------

export const metrics = [
  { value: 2, suffix: '', label: 'Public content platforms', hint: 'Douyin · Xiaohongshu' },
  { value: 5, suffix: ' levels', label: 'Intent grades', hint: 'High / Mid / Weak / None / Review' },
  { value: 3, suffix: ' layers', label: 'Lead pools', hint: 'Ownership → org assignment → account routing' },
  { value: 14, suffix: '', label: 'Collection endpoints', hint: 'Per-endpoint health checks' },
  { value: 4, suffix: ' dims', label: 'Semantic checks', hint: 'Role / function / actionability / evidence' },
];

// ---------------------------------------------------------------------------
// Problem: bought lists vs 线索猎手
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: 'Why it exists',
  title: (
    <>
      Not a phone-number list,
      <Br />
      but demand happening now
    </>
  ),
  lede: 'Bought lead lists are stale static data. Each question in public content is a just-happened close signal, with the full context still attached.',
  before: {
    label: 'Traditional lead channels',
    tone: 'muted' as const,
    items: [
      'A string of numbers — no idea what they are stuck on',
      'Several stores call at once; the first ring already feels like spam',
      'Priced per record; invalid leads are billed the same',
      'The buying window is often closed by the time the list arrives',
    ],
  },
  after: {
    label: '线索猎手',
    tone: 'brand' as const,
    items: [
      'Keeps the public original and its context, so the first line can continue the thread',
      'Routes by organization and region — the same lead is not blasted twice',
      'Five grades set priority first, so time goes to the people worth calling',
      'Time decay steps leads down automatically; expired demand leaves the queue',
    ],
  },
};

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

export type Capability = {
  index: string;
  title: string;
  body: string;
  icon: 'radar' | 'brain' | 'pools' | 'phone' | 'shield' | 'link';
};

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Continuous multi-platform collection',
    body: 'Keyword groups, competitor accounts, and post groups run on a daily schedule. Each endpoint is health-checked; pagination and failures retry automatically.',
    icon: 'radar',
  },
  {
    index: '02',
    title: 'Five-level intent scoring',
    body: 'The model handles open-ended meaning; local deterministic policy sets the final grade, plus a summary, rationale, and next-line script.',
    icon: 'brain',
  },
  {
    index: '03',
    title: 'Three-layer lead-pool routing',
    body: 'The ownership pool decides who the lead belongs to. The org-assignment pool spends six shared daily quotas. The account pool lands on a specific salesperson. Every hop is auditable.',
    icon: 'pools',
  },
  {
    index: '04',
    title: 'Sales follow-up app',
    body: 'Salespeople only see leads assigned to them. Filter by platform, intent, and follow-up status; mark contacted or skip.',
    icon: 'phone',
  },
  {
    index: '05',
    title: 'Org isolation and three roles',
    body: 'admin, dealer admin, and sales — data is isolated by organization. The sales app never exposes cross-org content.',
    icon: 'shield',
  },
  {
    index: '06',
    title: 'Burn-after-read short links',
    body: 'Original posts and author profiles open through server-authorized short links. Each link can be viewed once, and the hop is logged.',
    icon: 'link',
  },
];

export const capabilitiesSection = {
  eyebrow: 'Capabilities',
  title: 'Six jobs on one path from collection to delivery',
  lede: 'Every step can be configured and audited on its own. This is not a black box you have to take as a whole.',
};

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

export type PipelineStep = {
  id: string;
  index: string;
  title: string;
  body: string;
  meta: string;
};

export const pipelineSample = {
  platform: '小红书' as const,
  city: 'Henan',
  post: 'Late July · Dynasty Network · Price',
  comment: 'Can I still use the scrappage subsidy after the discount?',
  age: '2 hours ago',
};

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    index: '01',
    title: 'A question appears in public content',
    body: 'A user comments on a Xiaohongshu price post, asking whether a discount can stack with the scrappage subsidy. It is a publicly visible ask — not private data of any kind.',
    meta: 'Source · Xiaohongshu comment',
  },
  {
    id: 'collect',
    index: '02',
    title: 'Collected under a monitoring topic',
    body: 'The comment hits a dealer-configured keyword group and lands in the database with the post title, region, publish time, and the author’s public profile.',
    meta: 'Collect · keyword-group hit',
  },
  {
    id: 'analyze',
    index: '03',
    title: 'The line is split across four dimensions',
    body: 'First who is speaking and what the line is doing, then actionability and evidence strength. No keyword hard-match — seller replies and competitor ads drop out here.',
    meta: 'Score · semantic breakdown',
  },
  {
    id: 'score',
    index: '04',
    title: 'Grade, summary, and script',
    body: 'Deterministic policy locks the intent level from the four-dimension result, and writes a one-line summary plus a next step. Sales does not have to re-read the original to infer intent.',
    meta: 'Output · High intent',
  },
  {
    id: 'decay',
    index: '05',
    title: 'Recalibrated by time decay',
    body: 'The same sentence asked two hours ago is not the same as two weeks ago. Semantic intent is recomputed against comment age; expired demand steps down and leaves the queue.',
    meta: 'Calibrate · held 0–3 days',
  },
  {
    id: 'deliver',
    index: '06',
    title: 'Through three pools to a sales phone',
    body: 'Confirm the owning org, spend today’s quota, match a sales account. The lead hits the app and in-product notifications; the salesperson opens the original post through an authorized short link.',
    meta: 'Deliver · sales app',
  },
];

/** Frame 3: four-dimension breakdown */
export const analysisDimensions = [
  { key: 'speaker_role', label: 'Speaker role', value: 'Buyer candidate', tone: 'brand' as const },
  { key: 'utterance_type', label: 'Utterance type', value: 'Price ask + subsidy eligibility', tone: 'brand' as const },
  {
    key: 'buyer_actionability',
    label: 'Actionability',
    value: 'immediate_followup',
    tone: 'high' as const,
  },
  { key: 'evidence_strength', label: 'Evidence strength', value: 'strong', tone: 'high' as const },
];

/** Frame 4: model output */
export const analysisOutput = {
  level: 'high' as IntentLevel,
  summary:
    'A Henan user asks whether a discount can stack with the scrappage subsidy. The buying context is complete, with a near-term decision signal.',
  nextAction: 'Break down the OTD price first, then check scrappage-subsidy eligibility',
};

// ---------------------------------------------------------------------------
// IntentEngine
// ---------------------------------------------------------------------------

export const intentSection = {
  eyebrow: 'Intent scoring',
  title: (
    <>
      Five grades,
      <Br />
      and they decay on their own
    </>
  ),
  lede: 'The model only reads what the sentence means. The grade written to the database is decided by deterministic code — so the same input always yields the same result, and the grade can be explained.',
  dimensionsIntro:
    'The order is fixed: role first, then meaning — so seller replies and competitor ads are not mistaken for customer demand.',
  decayIntro: 'Drag the day slider to see how the same semantic intent steps down as the comment ages.',
  levels: [
    {
      level: 'high' as IntentLevel,
      sample: 'Can I still use the scrappage subsidy after the discount?',
      note: 'A clear price, stock, subsidy, or close-plan ask',
    },
    {
      level: 'mid' as IntentLevel,
      sample: 'Song Pro or Yuan UP — which should I pick?',
      note: 'Model compare, trim choice, or process questions',
    },
    {
      level: 'weak' as IntentLevel,
      sample: 'This car looks decent',
      note: 'Light interest; the buying context is still thin',
    },
    {
      level: 'none' as IntentLevel,
      sample: 'DM me — we have stock in store',
      note: 'Seller reply, competitor ad, or off-topic',
    },
    {
      level: 'review' as IntentLevel,
      sample: 'Asking for a friend',
      note: 'Role or context conflicts; evidence goes to a human',
    },
  ],
};

// ---------------------------------------------------------------------------
// ThreePools
// ---------------------------------------------------------------------------

export const poolsSection = {
  eyebrow: 'Three-pool routing',
  title: (
    <>
      Ownership, quota, and landing account —
      <Br at="lg" />
      each layer is explainable
    </>
  ),
  lede: 'A scored lead is not blasted to everyone. It first confirms who owns it, then spends the org’s daily quota, and only then lands on a sales account — every hop between layers is recorded.',
  pools: [
    {
      id: 'ownership',
      name: 'Ownership pool',
      tone: 'neutral' as const,
      caption: 'Who this lead belongs to',
      body: 'Newly scored leads enter the ownership pool first. The same content can hit monitoring topics from more than one org; a platform admin confirms ownership so several stores do not reach the same person.',
      tags: ['Orgs may share a hit', 'Confirmed by platform admin'],
    },
    {
      id: 'org',
      name: 'Org-assignment pool',
      tone: 'brand' as const,
      caption: 'How many this org can still take today',
      body: 'After ownership is confirmed, the lead enters the org-assignment pool and spends one of six shared daily quotas. Orgs that have used their quota take no new leads that day; the backlog ships FIFO the next day.',
      tags: ['Six daily quotas', 'FIFO backlog catch-up'],
    },
    {
      id: 'account',
      name: 'Account-routing pool',
      tone: 'accent' as const,
      caption: 'Which salesperson receives it',
      body: 'Accounts from the hit groups are unioned, the lead lands on a sales account, and a routing record is written. The sales app only shows leads on that account — not even a teammate’s.',
      tags: ['Union of hit-group accounts', 'Only assigned leads visible'],
    },
  ],
};

// ---------------------------------------------------------------------------
// LeadSamples
// ---------------------------------------------------------------------------

export type LeadSample = {
  platform: '小红书' | '抖音';
  city: string;
  text: string;
  level: IntentLevel;
};

export const leadSamples: LeadSample[] = [
  { platform: '小红书', city: 'Henan', text: 'Can I still use the scrappage subsidy after the discount?', level: 'high' },
  { platform: '抖音', city: 'Chengdu', text: 'Any stock in Chengdu, and how soon can I pick up?', level: 'high' },
  { platform: '小红书', city: 'Suzhou', text: 'Just over 150k — down payment or OTD?', level: 'high' },
  { platform: '抖音', city: 'Suzhou', text: 'How long is production?', level: 'mid' },
  { platform: '小红书', city: 'Tianjin', text: 'Anyone tried the heat-pump AC?', level: 'mid' },
  { platform: '抖音', city: 'Chongqing', text: 'Song Pro or Yuan UP — which should I pick?', level: 'mid' },
  { platform: '小红书', city: 'Hangzhou', text: 'Is the AWD trim worth the extra?', level: 'mid' },
  { platform: '抖音', city: 'Wuhan', text: 'What papers do I need for the trade-in subsidy?', level: 'high' },
  { platform: '小红书', city: 'Xi\'an', text: 'Does this color look good on the real car?', level: 'weak' },
  { platform: '抖音', city: 'Changsha', text: 'Do I need to book a test drive in advance?', level: 'high' },
  { platform: '小红书', city: 'Qingdao', text: 'Anything else you would recommend at this price?', level: 'mid' },
  { platform: '抖音', city: 'Zhengzhou', text: 'Roughly how much is a service visit?', level: 'weak' },
];

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

export const surfaces = {
  eyebrow: 'Product',
  title: 'The console runs the system; the sales app only follows up',
  lede: 'Both sides work the same lead: the web console handles monitoring, intent review, and three-pool ops; the sales app only shows leads already assigned to that person.',
  console: {
    label: 'Web console 2.3.1',
    shots: [
      {
        src: '/assets/screenshots/console-v231-leads.png',
        alt: 'Console lead center showing the master library and three pool tabs',
        title: 'Lead center · three-pool view',
        caption: 'Master library, ownership, org-assignment, and account-routing pools switch on one page. Every lead carries three-pool counts.',
      },
      {
        src: '/assets/screenshots/console-v231-dashboard.png',
        alt: 'Console overview of content, comments, leads, and intent mix',
        title: 'Overview',
        caption: 'Content, comments, leads, and intent mix on one screen, so today’s follow-up focus is obvious.',
      },
      {
        src: '/assets/screenshots/console-v231-keywords.png',
        alt: 'Console keyword configuration page',
        title: 'Monitoring setup',
        caption: 'Add OTD, in-stock, subsidy, and similar terms to this store’s topics. Managed by group, expanded on a daily schedule.',
      },
    ],
  },
  app: {
    label: 'Sales app',
    title: 'Sales sees one job: who to follow today',
    body: 'Start with pending follow-ups, read original content and intent analysis, then continue from notifications. Dealer admins can also open Account → Organization management to manage sales accounts, keyword and post groups, and recipients.',
    cta: 'Get 线索猎手',
    note: 'App 3.0.0 · iOS TestFlight / Android package; check the app store for available builds',
    shots: [
      {
        src: '/assets/screenshots/app-v3-leads.png',
        alt: 'Sales lead list graded by intent with follow-up status',
        index: '01',
        caption: 'Priority by intent',
        desc: 'Only leads assigned to this account. Filter by intent, platform, date, and follow-up status.',
      },
      {
        src: '/assets/screenshots/app-v3-comment-detail.png',
        alt: 'Sales lead detail with original comment, source group, and follow-up suggestion',
        index: '02',
        caption: 'Open with context',
        desc: 'Original comment, post title, source group, and the AI next step on one screen — no hopping between platforms to confirm.',
      },
      {
        src: '/assets/screenshots/app-v3-notifications.png',
        alt: 'Sales notification center with daily digest and new-lead alerts',
        index: '03',
        caption: 'No need to watch the console',
        desc: 'New leads notify immediately. A 10:00 digest lists today’s follow-ups; unread count sits on the icon.',
      },
      {
        src: "/assets/screenshots/app-v3-management.png",
        alt: "Organization management with account and intent-group entries",
        index: "04",
        caption: "Manage the organization on mobile",
        desc: "Dealer admins open organization management from Account. Accounts and groups have separate pages; these entries are not shown to salespeople.",
      },
      {
        src: "/assets/screenshots/app-v3-users.png",
        alt: "Sales-account detail with name, username, phone, and notes",
        index: "05",
        caption: "People and quotas in one place",
        desc: "Create sales accounts within the seat limit, then edit names, phone numbers, and notes. Deactivation removes group membership; restoration requires manual rejoining.",
      },
      {
        src: "/assets/screenshots/app-v3-group.png",
        alt: "Group detail with keywords and recipient configuration",
        index: "06",
        caption: "Keywords and recipients per group",
        desc: "Keyword and post groups each have their own lists and details. Select multiple organization recipients while preserving existing deliveries and follow-up history.",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

export const rolesSection = {
  eyebrow: 'Roles',
  title: 'Three roles, three fields of view',
  lede: 'The same data is cut to a different visible range per role. Closer to the front line, the view gets tighter.',
  roles: [
    {
      id: 'admin',
      name: 'Platform admin',
      latin: 'admin',
      summary: 'Manages every org, quota, and ownership; can assign leads across orgs',
      abilities: [
        'Create dealer-admin and sales accounts; allocate org seat quotas',
        'Confirm ownership in the ownership pool; resolve multi-org hits',
        'Set each org’s six daily intent quotas and ranking policy',
        'Configure collection endpoints, short-link domains, and system settings',
      ],
      scope: 'All organizations',
    },
    {
      id: 'saler-admin',
      name: 'Dealer admin',
      latin: 'saler-admin',
      summary: 'Manages this org’s monitoring topics, sales accounts, and lead assignment',
      abilities: [
        'Maintain this org’s keyword, competitor, and post groups; collect daily at 00:00',
        'Assign leads from the org pool to this org’s sales; revoke and reassign',
        'Create, disable, or restore sales accounts within the seat quota in the app or console',
        'Maintain follow-up script templates; view this org’s lead stats',
      ],
      scope: 'This org (redacted)',
    },
    {
      id: 'user',
      name: 'Front-line sales',
      latin: 'user',
      summary: 'View and follow up leads assigned to this account in the app',
      abilities: [
        'View leads on this account; filter by platform and status',
        'Mark contacted or skip; write follow-up status back to the lead',
        'Receive in-app notifications and the 10:00 daily digest',
        'Open the original post and author profile through a burn-after-read short link',
      ],
      scope: 'Assigned to this account only',
    },
  ],
};

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

export const timeline = {
  eyebrow: 'Daily rhythm',
  title: 'A day in the system',
  lede: 'Aside from an admin confirming ownership, every other step runs on its own. Sales opens the phone in the morning and sees who to follow that day.',
  events: [
    {
      time: '00:00',
      title: 'Scheduled collection',
      body: 'Each org’s keyword, competitor, and post groups expand in batch, fetched in order under per-endpoint rate limits.',
    },
    {
      time: 'After collection',
      title: 'Scoring kicks off',
      body: 'New comments trigger scoring immediately. Failures enter a durable queue; a scheduled job retries every 2 hours.',
    },
    {
      time: '02:30',
      title: 'Fallback assignment',
      body: 'Unassigned mid and high-intent leads are load-balanced to on-duty sales so nothing sits at the bottom of the pool.',
    },
    {
      time: '10:00',
      title: 'Digest push',
      body: 'Today’s follow-up queue is summarized and pushed to the sales app, with an in-product notification.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const security = {
  eyebrow: 'Data boundary',
  title: (
    <>
      Information moves quickly,
      <Br />
      visibility stays bounded
    </>
  ),
  lede: 'Every record comes from publicly visible platform content, then visibility narrows by organization and account.',
  items: [
    {
      title: 'Public content only',
      body: 'Only comments and posts anyone can see. No DMs, no contacts, no data that requires user authorization.',
    },
    {
      title: 'Organization isolation',
      body: 'Dealer admins and sales can only access this org’s data. Cross-org queries are blocked on the server.',
    },
    {
      title: 'Actions follow the role',
      body: 'Salespeople handle their own leads. Dealer admins can manage this organization’s sales accounts, keyword and post groups, and group recipients in the app.',
    },
    {
      title: 'Authorized short-link access',
      body: 'Original posts and author profiles open through server-issued short links. Each link can be viewed once, and the visit is logged.',
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = {
  eyebrow: 'FAQ',
  title: 'About 线索猎手',
  lede: 'Data source, scoring accuracy, onboarding, and permission boundaries — the questions we hear most.',
  items: FAQ.en,
};

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const cta = {
  eyebrow: 'Ready to start finding leads?',
  title: (
    <>
      Get the next high-intent lead
      <Br />
      to a sales phone sooner
    </>
  ),
  lede: 'Scan to add the sales manager, or open the contact page to book a demo and start a trial.',
  primary: 'Send an inquiry',
  secondary: 'Contact sales',
  guide: 'Read the product guide',
};

export const guideSection = {
  eyebrow: 'Product guide',
  title: (
    <>
      How the console and app work
      <Br />
      is in the illustrated handbook
    </>
  ),
  lede: 'The full illustrated guide is published at leadshunter-guide.lancloudtech.com. It is embedded below; you can also open it in a new window for console and app usage, and how the Changsha store runs it.',
  primary: 'Open the product guide',
  iframeTitle: '线索猎手 product guide and usage notes',
};

export const pipelineSection = {
  eyebrow: 'How it works',
  title: 'How one lead reaches a sales phone',
  lede: 'Follow one real comment all the way through. From a question in public content to a salesperson’s queue — every step is explainable and auditable.',
  ledeReduced: 'Extract a close signal from public interaction. Every step is explainable and auditable.',
};

export const samplesSection = {
  eyebrow: 'What a lead looks like',
  title: (
    <>
      Not a spreadsheet row,
      <Br />
      but a question you can answer
    </>
  ),
  lede: 'These are redacted public-comment examples. Sales sees the original line, plus the grade, summary, and suggestion.',
};

export const ui = {
  skipToMain: 'Skip to main content',
  metricsAria: 'Product capabilities',
  navAria: 'Page navigation',
  navMobileAria: 'Mobile navigation',
  navOpen: 'Open navigation menu',
  navClose: 'Close navigation menu',
  guide: 'Product guide',
  contact: 'Contact sales',
  bookDemo: 'Book a demo',
  bookDemoLong: 'Book a product demo',
  readGuide: 'Read the product guide',
  localeAria: 'Switch language',
  locales: {
    'zh-Hans': '简体',
    'zh-Hant': '繁體',
    en: 'EN',
  },
  footerCompany: 'LAN Cloud website',
  footerIndex: 'Company product index',
  footerApp: 'Sales app download',
  footerPhone: 'Phone',
  footerMail: 'Email',
  footerBlurb: IDENTITY.en.tagline,
  footerLegal: 'Only publicly visible platform content is collected · Data isolated by organization',
  contactQrAlt: 'WeCom QR code for the 线索猎手 sales manager — long-press to recognize',
  contactQrTitle: 'Long-press to recognize the QR code',
  contactQrHint: 'Add the 线索猎手 sales manager',
  contactWecom: 'WeCom',
  phone: 'Phone',
  mail: 'Email',
  heroPhoneAlt: '线索猎手 home with pending follow-ups and leads added today',
  heroFactsAria: 'Product capability overview',
  heroCardKicker: 'New · Henan',
  heroCardText: 'Can I still use the scrappage subsidy after the discount?',
  heroCardMeta: 'In the ownership pool · awaiting org confirmation',
  consoleTitle: '线索猎手 · Lead center',
  consoleBadge: 'Live',
  consoleTabs: ['Master library', 'Ownership', 'Org assignment', 'Account routing'],
  consoleAll: 'All',
  consoleHigh: 'High intent',
  consoleMid: 'Mid intent',
  consoleStreamAria: 'Lead stream example',
  consoleComment: 'Comment',
  consoleScoring: 'Scoring',
  intentDecayEyebrow: 'Time decay',
  intentSemanticAria: 'Choose semantic intent',
  intentModelJudge: 'Model grade',
  intentAge: 'Comment age',
  intentDays: 'days',
  intentFinal: 'Stored intent',
  intentSlider: 'Comment age (days)',
  intentJustNow: 'Just posted',
  intentFreshPrefix: 'The demand window is still fresh — kept at ',
  intentFreshSuffix: ', and enters routing as usual.',
  intentDegradedFrom: 'This lead decayed from ',
  intentDegradedTo: ' to ',
  intentDegradedNone: ' and no longer enters the sales queue.',
  intentDegradedDown: ', with priority stepped down.',
  intentBand: '30-day decay band',
  intentLeft: 'Newer demand on the left',
  intentRight: 'Closer to expiry on the right',
  intentOrder: 'Scoring order',
  intentRules: 'Full decay rules',
  intentNoDecay: 'None and Review do not decay: the former is already excluded; the latter waits for a human.',
  intentDimensions: [
    { step: '1', name: 'speaker_role', label: 'Who is speaking' },
    { step: '2', name: 'utterance_type', label: 'What this line is doing' },
    { step: '3', name: 'buyer_actionability', label: 'Worth following now' },
    { step: '4', name: 'evidence_strength', label: 'Is the evidence strong enough' },
  ],
  intentTable: [
    {
      semantic: 'high' as IntentLevel,
      ranges: [
        { label: '0–3 days', day: 2 },
        { label: '3–7 days', day: 5 },
        { label: '7+ days', day: 20 },
      ],
    },
    {
      semantic: 'mid' as IntentLevel,
      ranges: [
        { label: '0–3 days', day: 2 },
        { label: '3–14 days', day: 8 },
        { label: '14+ days', day: 20 },
      ],
    },
    {
      semantic: 'weak' as IntentLevel,
      ranges: [
        { label: '0–7 days', day: 5 },
        { label: '7+ days', day: 20 },
      ],
    },
  ],
  pipelineCaptured: 'Captured',
  pipelinePublic: 'Public',
  pipelinePost: 'Post',
  pipelineHitTopic: 'Topic match',
  pipelineHitTopicValue: 'Scrappage subsidy',
  pipelineHitGroup: 'Hit group',
  pipelineHitGroupValue: 'Dynasty keyword group',
  pipelineAnalyzeTitle: 'Semantic split · fixed order',
  pipelineAnalyzeNote:
    'Role before meaning: seller replies and competitor ads drop at the first dimension. No keyword hard-match.',
  pipelineScoreOut: 'Model output',
  pipelineSummary: 'Lead summary',
  pipelineNext: 'Next-step suggestion',
  pipelineDecayNote: 'Time-decay calibration · comment age 2 hours',
  pipelineCurrent: 'Current',
  pipelineNow: 'Now',
  pipelineNewLead: 'You have 1 new lead',
  pipelineAppTabs: ['Home', 'Leads', 'Alerts'],
  pipelinePools: [
    { name: 'Ownership pool', tone: 'var(--lh-intent-weak)' },
    { name: 'Org-assignment pool', tone: 'var(--lh-brand)' },
    { name: 'Account-routing pool', tone: 'var(--lh-accent)' },
  ],
  pipelineDecayRules: [
    { range: '0–3 days', level: 'high' as IntentLevel, active: true },
    { range: '3–7 days', level: 'mid' as IntentLevel, active: false },
    { range: '7+ days', level: 'none' as IntentLevel, active: false },
  ],
  notFoundTitle: 'This page doesn’t exist',
  notFoundBody: 'The link may be wrong, or the page has moved.',
  notFoundHome: 'Back to home',
};
