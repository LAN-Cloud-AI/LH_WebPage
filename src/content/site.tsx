import { Br } from '../components/primitives/Br';
import type { IntentLevel } from '../lib/intentDecay';
import { FAQ, IDENTITY } from './identity.js';

/**
 * 简体文案包。繁体 / 英文见 locales/，运行时按 pathname 选择。
 */

export const site = {
  brand: {
    name: IDENTITY['zh-Hans'].siteName,
    latin: 'LEADSHUNTER',
    company: IDENTITY['zh-Hans'].company,
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
    appstore: 'https://appstore.lancloudtech.com',
    company: 'https://lancloudtech.com/',
    companyProduct: 'https://lancloudtech.com/#leadshunter',
    beian: 'https://beian.miit.gov.cn/',
  },

  contact: {
    role: '销售经理',
    phone: '+86-17380566771',
    phoneHref: 'tel:+8617380566771',
    email: 'lance@lancloudtech.com',
    wecomQr: '/assets/wecom-qr.png',
  },

  nav: [
    { href: '#pipeline', label: '工作方式' },
    { href: '#intent', label: '意向识别' },
    { href: '#pools', label: '三池分发' },
    { href: '#surfaces', label: '产品体验' },
    { href: '#roles', label: '角色权限' },
    { href: '#faq', label: '常见问题' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  pill: 'AI 实时识别公开购车意向',
  titleLines: ['从公开内容中', '发现可跟进的销售线索'],
  lede: '持续监测抖音、小红书的公开评论与帖子，判断购车意向等级、生成摘要与跟进建议，再经三层线索池精准分发到销售手机。',
  primaryCta: '预约产品演示',
  secondaryCta: '看它怎么工作',
  facts: [
    { index: '01', label: '公开内容持续监测' },
    { index: '02', label: '五档购车意向识别' },
    { index: '03', label: '三层线索池分发' },
    { index: '04', label: '销售端 App 即时提醒' },
  ],
};

// ---------------------------------------------------------------------------
// Metrics：用产品能力口径，不用演示统计数字
// ---------------------------------------------------------------------------

export const metrics = [
  { value: 2, suffix: '', label: '公开内容平台', hint: '抖音 · 小红书' },
  { value: 5, suffix: ' 档', label: '意向分级', hint: '高 / 中 / 弱 / 无 / 待复核' },
  { value: 3, suffix: ' 层', label: '线索池', hint: '归属 → 组织指派 → 账号分发' },
  { value: 14, suffix: ' 个', label: '采集端点', hint: '逐端点健康检测' },
  { value: 4, suffix: ' 维', label: '语义判断', hint: '角色 / 功能 / 可行动性 / 证据' },
];

// ---------------------------------------------------------------------------
// Problem：传统线索 vs 线索猎手
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: '为什么需要它',
  title: (
    <>
      不是名单电话，
      <Br />
      而是正在发生的真实需求
    </>
  ),
  lede: '买来的线索名单是过期的静态数据，公开内容里的每一句提问却是刚刚发生、带着完整语境的成交信号。',
  before: {
    label: '传统渠道线索',
    tone: 'muted' as const,
    items: [
      '一串号码，不知道对方在纠结什么',
      '多家门店同时拨打，第一通电话已经是骚扰',
      '按条计价，无效线索照样付费',
      '拿到手时需求窗口往往已经关闭',
    ],
  },
  after: {
    label: '线索猎手',
    tone: 'brand' as const,
    items: [
      '保留公开原文与上下文，第一句话就能接上',
      '按组织与地区分发，同一条不重复轰炸',
      '五档分级先排优先级，把时间投给最值得的人',
      '时间衰减自动降级，过期需求不占销售待办',
    ],
  },
};

// ---------------------------------------------------------------------------
// Capabilities：六宫格
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
    title: '多平台持续采集',
    body: '关键词组、竞品账号、帖子组三种编排，每天定时展开，逐端点健康检测，分页与失败自动重试。',
    icon: 'radar',
  },
  {
    index: '02',
    title: '五档意向识别',
    body: '大模型负责开放语义理解，本地确定性策略决定最终分级，同时给出摘要、判断依据与下一步话术。',
    icon: 'brain',
  },
  {
    index: '03',
    title: '三层线索池分发',
    body: '归属池确认线索归谁，组织指派池按六类日配额分配，账号分发池落到具体销售，每层都可追溯。',
    icon: 'pools',
  },
  {
    index: '04',
    title: '销售端只读 App',
    body: '销售只看分配给自己的线索，支持按平台、意向与跟进状态筛选，可标记已联系或跳过。',
    icon: 'phone',
  },
  {
    index: '05',
    title: '组织隔离与三角色',
    body: 'admin、经销商管理员、销售三级权限，数据按组织隔离，销售端不暴露任何跨组织内容。',
    icon: 'shield',
  },
  {
    index: '06',
    title: '阅后即焚短链',
    body: '原帖与作者主页通过服务端授权短链打开，每条链接仅可查看一次，链路留痕。',
    icon: 'link',
  },
];

export const capabilitiesSection = {
  eyebrow: '核心能力',
  title: '从采集到交付，一条链路上的六件事',
  lede: '每个环节都可以单独配置和审计，不是一个只能整体接受的黑盒。',
};

// ---------------------------------------------------------------------------
// Pipeline：滚动驱动的六个关键帧
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
  city: '河南',
  post: '7月底｜王朝网｜价格',
  comment: '优惠后还能用报废补贴吗？',
  age: '2 小时前',
};

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    index: '01',
    title: '公开内容里出现一句提问',
    body: '一位用户在小红书某条价格帖下留言，问优惠之后能不能叠加报废补贴。这是公开可见的真实需求表达，不是任何形式的私密数据。',
    meta: '来源 · 小红书评论',
  },
  {
    id: 'collect',
    index: '02',
    title: '按监测主题采集入库',
    body: '这条评论命中了经销商配置的关键词组，随采集任务一起进入数据库，保留帖子标题、地区、发布时间与作者公开信息。',
    meta: '采集 · 关键词组命中',
  },
  {
    id: 'analyze',
    index: '03',
    title: '四个维度拆解这句话',
    body: '先判断说话人是谁、这句话在做什么，再评估可行动性与证据强度。不做关键词硬匹配，卖家回复和同行广告在这一步就被排除。',
    meta: '判断 · 语义拆解',
  },
  {
    id: 'score',
    index: '04',
    title: '给出分级、摘要与话术',
    body: '确定性策略据四维结论落定意向等级，同时产出一句线索摘要和一条下一步建议，销售不需要自己再读一遍原文推断。',
    meta: '输出 · 高意向',
  },
  {
    id: 'decay',
    index: '05',
    title: '按时间衰减校准',
    body: '同样一句话，两小时前问和两周前问价值完全不同。语义意向叠加评论年龄后重算，过期需求自动降级，不占销售待办。',
    meta: '校准 · 0–3 天维持',
  },
  {
    id: 'deliver',
    index: '06',
    title: '流过三池抵达销售手机',
    body: '确认归属组织、扣减当日配额、匹配到具体销售账号，线索进入 App 与站内通知，销售通过授权短链打开原帖跟进。',
    meta: '交付 · 销售端 App',
  },
];

/** 第 3 帧的四维拆解结论 */
export const analysisDimensions = [
  { key: 'speaker_role', label: '说话人角色', value: '买家候选', tone: 'brand' as const },
  { key: 'utterance_type', label: '话语功能', value: '询价 + 补贴资格', tone: 'brand' as const },
  {
    key: 'buyer_actionability',
    label: '可行动性',
    value: 'immediate_followup',
    tone: 'high' as const,
  },
  { key: 'evidence_strength', label: '证据强度', value: 'strong', tone: 'high' as const },
];

/** 第 4 帧的模型输出 */
export const analysisOutput = {
  level: 'high' as IntentLevel,
  summary: '河南用户询问优惠后是否可叠加报废补贴，购车语境完整，具备近期决策信号。',
  nextAction: '先拆解落地价构成，再核对报废补贴资格',
};

// ---------------------------------------------------------------------------
// IntentEngine
// ---------------------------------------------------------------------------

export const intentSection = {
  eyebrow: '意向识别',
  title: (
    <>
      五档分级，
      <Br />
      并且会随时间自动降级
    </>
  ),
  lede: '大模型只负责理解这句话的语义，最终落库的等级由确定性代码决定——因此同样的输入永远得到同样的结果，也能解释为什么是这个等级。',
  dimensionsIntro: '判断顺序固定，先角色后语义，避免把卖家回复和同行广告误判为客户需求。',
  decayIntro: '拖动下面的天数，看同一条语义意向如何随评论年龄降级。',
  levels: [
    {
      level: 'high' as IntentLevel,
      sample: '优惠后还能用报废补贴吗？',
      note: '明确询价、现车、补贴或成交计划',
    },
    {
      level: 'mid' as IntentLevel,
      sample: '宋 Pro 和元 UP 到底怎么选？',
      note: '车型比较、配置选择与流程咨询',
    },
    {
      level: 'weak' as IntentLevel,
      sample: '这车看着还行',
      note: '轻度兴趣，购车语境尚不完整',
    },
    {
      level: 'none' as IntentLevel,
      sample: '私信我，本店有现车',
      note: '卖家回复、同行广告或无关内容',
    },
    {
      level: 'review' as IntentLevel,
      sample: '帮朋友问问',
      note: '角色或语境冲突，证据不足交人工',
    },
  ],
};

// ---------------------------------------------------------------------------
// ThreePools
// ---------------------------------------------------------------------------

export const poolsSection = {
  eyebrow: '三池分发',
  title: (
    <>
      一条线索的归属、配额与落点，
      <Br at="lg" />
      每一层都说得清
    </>
  ),
  lede: '线索不是评分完就直接群发。它要先确认归谁，再按组织的每日配额分配，最后才落到具体销售账号——三层之间的每次流转都有记录。',
  pools: [
    {
      id: 'ownership',
      name: '归属池',
      tone: 'neutral' as const,
      caption: '这条线索归谁',
      body: '刚评分完成的线索先进归属池。同一条内容可能同时命中多个组织的监测主题，此时由平台管理员确认归属，避免多家门店重复触达同一位客户。',
      tags: ['多组织可共享', '平台管理员确认'],
    },
    {
      id: 'org',
      name: '组织指派池',
      tone: 'brand' as const,
      caption: '这个组织今天还能领多少',
      body: '归属确认后进入组织指派池，按六类共享日配额扣减。配额用尽的组织当天不再进新线索，积压部分按先进先出在次日补发。',
      tags: ['六类日配额', 'FIFO 积压补发'],
    },
    {
      id: 'account',
      name: '账号分发池',
      tone: 'accent' as const,
      caption: '具体交给哪位销售',
      body: '按命中组的账号取并集，落到具体销售账号并写入分发记录。销售端 App 只能看到落到自己账号的线索，同组同事的也看不到。',
      tags: ['命中组账号取并集', '销售端只读可见'],
    },
  ],
};

// ---------------------------------------------------------------------------
// LeadSamples：脱敏样本跑马灯
// ---------------------------------------------------------------------------

export type LeadSample = {
  platform: '小红书' | '抖音';
  city: string;
  text: string;
  level: IntentLevel;
};

export const leadSamples: LeadSample[] = [
  { platform: '小红书', city: '河南', text: '优惠后还能用报废补贴吗？', level: 'high' },
  { platform: '抖音', city: '成都', text: '成都有没有现车，最快多久能提', level: 'high' },
  { platform: '小红书', city: '苏州', text: '十五个多，是首付还是落地？', level: 'high' },
  { platform: '抖音', city: '苏州', text: '生产要多久', level: 'mid' },
  { platform: '小红书', city: '天津', text: '热泵空调有没有人说一下', level: 'mid' },
  { platform: '抖音', city: '重庆', text: '宋 Pro 和元 UP 到底怎么选？', level: 'mid' },
  { platform: '小红书', city: '杭州', text: '四驱版本值得加这个钱吗', level: 'mid' },
  { platform: '抖音', city: '武汉', text: '置换补贴需要什么材料', level: 'high' },
  { platform: '小红书', city: '西安', text: '这个配色实车好看吗', level: 'weak' },
  { platform: '抖音', city: '长沙', text: '试驾要提前预约吗', level: 'high' },
  { platform: '小红书', city: '青岛', text: '同价位还有别的推荐吗', level: 'mid' },
  { platform: '抖音', city: '郑州', text: '保养一次大概多少钱', level: 'weak' },
];

// ---------------------------------------------------------------------------
// Surfaces：双端展示
// ---------------------------------------------------------------------------

export const surfaces = {
  eyebrow: '产品体验',
  title: '后台掌控全局，销售端只专注跟进',
  lede: '两端围绕同一条线索协同：Web 控制台负责监测配置、意向复核与三池运营，销售端 App 只呈现已分配到个人的线索。',
  console: {
    label: 'Web 控制台',
    shots: [
      {
        src: '/assets/screenshots/console-leads.jpg',
        alt: '控制台线索中心，展示线索总库与三池标签页',
        title: '线索中心 · 三池视图',
        caption: '线索总库、归属池、组织指派池、账号分发池在同一页切换，每条线索都带三池计数。',
      },
      {
        src: '/assets/screenshots/console-dashboard.jpg',
        alt: '控制台数据总览，展示内容、评论、线索与意向分布',
        title: '数据总览',
        caption: '内容、评论、线索与意向分布一屏可见，快速定位当日跟进重点。',
      },
      {
        src: '/assets/screenshots/console-keywords.jpg',
        alt: '控制台关键词配置页',
        title: '监测配置',
        caption: '把落地价、现车、补贴等词纳入本店监测主题，按组管理、每天定时展开。',
      },
    ],
  },
  app: {
    label: '销售端 App',
    title: '销售只看一件事：今天该跟谁',
    body: 'App 是只读的——不提供归属确认、组织指派与账号分发能力，这些接口对销售角色完全不开放。它只回答一个问题：哪些线索落到了我头上，我该怎么开口。',
    cta: '申请内测',
    note: 'TestFlight 与 Android 安装包内测中',
    shots: [
      {
        src: '/assets/screenshots/ios-01.jpg',
        alt: '销售端线索列表，按意向分档并显示跟进状态',
        index: '01',
        caption: '按意向排优先级',
        desc: '只列出分配给本人的线索，高中意向分开计数，可按平台、日期与跟进状态筛选。',
      },
      {
        src: '/assets/screenshots/ios-02.jpg',
        alt: '销售端线索详情，含评论原文、来源组与跟进建议',
        index: '02',
        caption: '带着上下文开口',
        desc: '评论原文、帖子标题、来源组与 AI 跟进建议在同一屏，不用切平台反复确认。',
      },
      {
        src: '/assets/screenshots/ios-03.jpg',
        alt: '销售端通知中心，含每日摘要与新线索提醒',
        index: '03',
        caption: '不用盯着后台',
        desc: '新线索即时通知，每天 10:00 汇总当日待跟进摘要，未读数直接落在图标上。',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

export const rolesSection = {
  eyebrow: '角色权限',
  title: '三种角色，三种视野',
  lede: '同一套数据，按角色裁剪出完全不同的可见范围。越靠前线，看到的越聚焦。',
  roles: [
    {
      id: 'admin',
      name: '平台管理员',
      latin: 'admin',
      summary: '管理全部组织、配额与归属，跨组织指派线索',
      abilities: [
        '创建经销商管理员与销售账号，分配组织席位配额',
        '在归属池确认线索归属，处理多组织命中冲突',
        '设置各组织六类意向的每日分发配额与排序策略',
        '配置采集端点、短链域名与系统参数',
      ],
      scope: '全部组织',
    },
    {
      id: 'saler-admin',
      name: '经销商管理员',
      latin: 'saler-admin',
      summary: '管理本组织的监测主题、销售账号与线索指派',
      abilities: [
        '维护本组织关键词组、竞品组与帖子组，每天 00:00 定时采集',
        '在组织指派池把线索分配到本组织销售，可撤销重派',
        '在席位配额内创建与停用本组织销售账号',
        '维护跟进话术模板，查看本组织线索统计',
      ],
      scope: '本组织（脱敏）',
    },
    {
      id: 'user',
      name: '一线销售',
      latin: 'user',
      summary: '在 App 里只读查看分配给自己的线索',
      abilities: [
        '查看已分配到本人账号的线索，按平台与状态筛选',
        '标记已联系或跳过，跟进状态回写线索',
        '接收站内通知与每日 10:00 待办摘要推送',
        '通过阅后即焚短链打开原帖与作者主页',
      ],
      scope: '仅本人已分配',
    },
  ],
};

// ---------------------------------------------------------------------------
// Timeline：一天的自动化节奏
// ---------------------------------------------------------------------------

export const timeline = {
  eyebrow: '每日节奏',
  title: '系统的一天',
  lede: '除了管理员的归属确认，其余环节全部自动完成。销售早上打开手机就能看到当天该跟的人。',
  events: [
    {
      time: '00:00',
      title: '定时采集',
      body: '各组织的关键词组、竞品组与帖子组批量展开，按端点速率限制依次抓取。',
    },
    {
      time: '采集完成后',
      title: '触发评分',
      body: '有新评论即触发评分，失败则进持久队列，由定时任务每 2 小时兜底重试。',
    },
    {
      time: '02:30',
      title: '兜底指派',
      body: '把仍未指派的中高意向线索按负载均衡分配给在岗销售，避免线索沉底。',
    },
    {
      time: '10:00',
      title: '摘要推送',
      body: '当日待跟进线索汇总成摘要，推送到销售端 App，配合站内通知提醒。',
    },
  ],
};

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const security = {
  eyebrow: '数据边界',
  title: (
    <>
      信息流动有速度，
      <Br />
      可见范围有边界
    </>
  ),
  lede: '所有数据只来自平台公开可见的内容，并按组织与账号逐层收窄可见范围。',
  items: [
    {
      title: '仅采集公开内容',
      body: '只处理平台上任何人都能看到的评论与帖子，不涉及私信、通讯录或任何需要授权才能访问的数据。',
    },
    {
      title: '组织隔离',
      body: '经销商管理员与销售只能访问本组织数据，跨组织查询在服务端统一拦截。',
    },
    {
      title: '销售端只读',
      body: 'App 不提供归属、指派与分发能力，接口层面就没有开放变更入口。',
    },
    {
      title: '授权短链访问',
      body: '原帖与作者主页经服务端签发短链打开，每条链接仅可查看一次并留下访问记录。',
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = {
  eyebrow: '常见问题',
  title: '关于线索猎手',
  lede: '关于数据来源、识别准确度、接入方式与权限边界，这里是最常被问到的几个问题。',
  items: FAQ['zh-Hans'],
};

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const cta = {
  eyebrow: '准备开始发现线索？',
  title: (
    <>
      让下一条高意向，
      <Br />
      更早抵达销售手机
    </>
  ),
  lede: '扫码添加销售经理，或打开联系页预约演示、开通试用。',
  primary: '发送咨询',
  secondary: '联系销售',
  guide: '阅读产品介绍',
};

export const guideSection = {
  eyebrow: '产品介绍',
  title: (
    <>
      后台与 APP 怎么用，
      <Br />
      都写在图文手册里
    </>
  ),
  lede: '完整图文手册发布在 leadshunter-guide.lancloudtech.com。下面直接嵌入该页面，也可新窗口打开阅读后台、APP 用法和长沙门店使用效果。',
  primary: '打开产品介绍',
  iframeTitle: '线索猎手产品介绍与使用说明',
};

export const pipelineSection = {
  eyebrow: '工作方式',
  title: '一条线索，如何抵达销售手机',
  lede: '下面跟着一条真实评论走完全程。从公开内容里出现的一句提问，到落进某位销售的待办，每一步都可解释、可追溯。',
  ledeReduced: '从公开互动中提取成交信号，每一步都可解释、可追溯。',
};

export const samplesSection = {
  eyebrow: '线索长什么样',
  title: (
    <>
      不是一行数据，
      <Br />
      而是一句能接上话的提问
    </>
  ),
  lede: '以下均为脱敏后的公开评论示例。销售看到的是原话本身，加上分级、摘要与建议。',
};

export const ui = {
  skipToMain: '跳到主要内容',
  metricsAria: '产品能力概览',
  navAria: '页面导航',
  navMobileAria: '移动端导航',
  navOpen: '打开导航菜单',
  navClose: '关闭导航菜单',
  guide: '产品介绍',
  contact: '联系销售',
  bookDemo: '预约演示',
  bookDemoLong: '预约产品演示',
  readGuide: '阅读产品介绍',
  localeAria: '切换语言',
  locales: {
    'zh-Hans': '简体',
    'zh-Hant': '繁體',
    en: 'EN',
  },
  footerCompany: '兰芯云朵官网',
  footerIndex: '公司站产品索引',
  footerApp: '销售端下载',
  footerPhone: '电话',
  footerMail: '邮件',
  footerBlurb: IDENTITY['zh-Hans'].tagline,
  footerLegal: '仅采集平台公开可见内容 · 数据按组织隔离',
  contactQrAlt: '线索猎手销售经理企业微信二维码，长按识别',
  contactQrTitle: '长按识别二维码',
  contactQrHint: '添加线索猎手销售经理',
  contactWecom: '企业微信',
  phone: '电话',
  mail: '邮件',
  heroPhoneAlt: '销售端 App 线索列表',
  heroFactsAria: '产品能力概览',
  heroCardKicker: '新发现 · 河南',
  heroCardText: '优惠后还能用报废补贴吗？',
  heroCardMeta: '已进入归属池 · 等待确认组织',
  consoleTitle: '线索猎手 · 线索中心',
  consoleBadge: '实时',
  consoleTabs: ['线索总库', '归属池', '组织指派池', '账号分发池'],
  consoleAll: '全部',
  consoleHigh: '高意向',
  consoleMid: '中意向',
  consoleStreamAria: '线索流示例',
  consoleComment: '评论',
  consoleScoring: '评分中',
  intentDecayEyebrow: '时间衰减',
  intentSemanticAria: '选择语义意向',
  intentModelJudge: '模型判定',
  intentAge: '评论年龄',
  intentDays: '天',
  intentFinal: '落库意向',
  intentSlider: '评论年龄（天）',
  intentJustNow: '刚发布',
  intentFreshPrefix: '需求窗口仍然新鲜，维持',
  intentFreshSuffix: '，正常进入分发流程。',
  intentDegradedFrom: '这条线索已从',
  intentDegradedTo: '衰减为',
  intentDegradedNone: '，不再进入销售待办。',
  intentDegradedDown: '，优先级相应下调。',
  intentBand: '30 天衰减带',
  intentLeft: '越靠左需求越新鲜',
  intentRight: '越靠右越接近失效',
  intentOrder: '判断顺序',
  intentRules: '完整衰减规则',
  intentNoDecay: '无意向与待复核不参与衰减：前者已经排除，后者等待人工确认。',
  intentDimensions: [
    { step: '1', name: 'speaker_role', label: '说话人是谁' },
    { step: '2', name: 'utterance_type', label: '这句话在做什么' },
    { step: '3', name: 'buyer_actionability', label: '值不值得马上跟' },
    { step: '4', name: 'evidence_strength', label: '证据够不够硬' },
  ],
  intentTable: [
    {
      semantic: 'high' as IntentLevel,
      ranges: [
        { label: '0–3 天', day: 2 },
        { label: '3–7 天', day: 5 },
        { label: '7 天以上', day: 20 },
      ],
    },
    {
      semantic: 'mid' as IntentLevel,
      ranges: [
        { label: '0–3 天', day: 2 },
        { label: '3–14 天', day: 8 },
        { label: '14 天以上', day: 20 },
      ],
    },
    {
      semantic: 'weak' as IntentLevel,
      ranges: [
        { label: '0–7 天', day: 5 },
        { label: '7 天以上', day: 20 },
      ],
    },
  ],
  pipelineCaptured: '已入库',
  pipelinePublic: '公开可见',
  pipelinePost: '帖子',
  pipelineHitTopic: '命中主题',
  pipelineHitTopicValue: '报废补贴',
  pipelineHitGroup: '命中组',
  pipelineHitGroupValue: '王朝网关键词组',
  pipelineAnalyzeTitle: '语义拆解 · 判断顺序固定',
  pipelineAnalyzeNote: '角色先于语义：卖家回复与同行广告在第一维就被排除，不做关键词硬匹配。',
  pipelineScoreOut: '模型输出',
  pipelineSummary: '线索摘要',
  pipelineNext: '下一步建议',
  pipelineDecayNote: '时间衰减校准 · 评论年龄 2 小时',
  pipelineCurrent: '当前',
  pipelineNow: '现在',
  pipelineNewLead: '你有 1 条新线索',
  pipelineAppTabs: ['首页', '线索', '通知'],
  pipelinePools: [
    { name: '归属池', tone: 'var(--lh-intent-weak)' },
    { name: '组织指派池', tone: 'var(--lh-brand)' },
    { name: '账号分发池', tone: 'var(--lh-accent)' },
  ],
  pipelineDecayRules: [
    { range: '0–3 天', level: 'high' as IntentLevel, active: true },
    { range: '3–7 天', level: 'mid' as IntentLevel, active: false },
    { range: '7 天以上', level: 'none' as IntentLevel, active: false },
  ],
  notFoundTitle: '没有这个页面',
  notFoundBody: '链接可能写错了，或页面已经换了地址。',
  notFoundHome: '回到首页',
};
