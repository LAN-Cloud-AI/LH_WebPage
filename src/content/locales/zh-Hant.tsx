import { Br } from '../../components/primitives/Br';
import type { IntentLevel } from '../../lib/intentDecay';
import { FAQ, IDENTITY } from '../identity.js';

/**
 * 繁体文案包。结构与 ../site 对齐，运行时按 pathname 选择。
 */

export const site = {
  brand: {
    name: IDENTITY['zh-Hant'].siteName,
    latin: 'LEADSHUNTER',
    company: IDENTITY['zh-Hant'].company,
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
    role: '銷售經理',
    phone: '+86-17380566771',
    phoneHref: 'tel:+8617380566771',
    email: 'lance@lancloudtech.com',
    wecomQr: '/assets/wecom-qr.png',
  },

  nav: [
    { href: '#pipeline', label: '工作方式' },
    { href: '#intent', label: '意向識別' },
    { href: '#pools', label: '三池分發' },
    { href: '#surfaces', label: '產品體驗' },
    { href: '#roles', label: '角色權限' },
    { href: '#faq', label: '常見問題' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  pill: 'AI 即時識別公開購車意向',
  titleLines: ['從公開內容中', '發現可跟進的銷售線索'],
  lede: '持續監測抖音、小紅書的公開評論與帖子，判斷購車意向等級、生成摘要與跟進建議，再經三層線索池精準分發到銷售手機。',
  primaryCta: '預約產品演示',
  secondaryCta: '看它怎麼工作',
  facts: [
    { index: '01', label: '公開內容持續監測' },
    { index: '02', label: '五檔購車意向識別' },
    { index: '03', label: '三層線索池分發' },
    { index: '04', label: '銷售端 App 即時提醒' },
  ],
};

// ---------------------------------------------------------------------------
// Metrics：用產品能力口徑，不用演示統計數字
// ---------------------------------------------------------------------------

export const metrics = [
  { value: 2, suffix: '', label: '公開內容平台', hint: '抖音 · 小紅書' },
  { value: 5, suffix: ' 檔', label: '意向分級', hint: '高 / 中 / 弱 / 無 / 待覆核' },
  { value: 3, suffix: ' 層', label: '線索池', hint: '歸屬 → 組織指派 → 帳號分發' },
  { value: 14, suffix: ' 個', label: '採集端點', hint: '逐端點健康檢測' },
  { value: 4, suffix: ' 維', label: '語義判斷', hint: '角色 / 功能 / 可行動性 / 證據' },
];

// ---------------------------------------------------------------------------
// Problem：傳統線索 vs 線索獵手
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: '為什麼需要它',
  title: (
    <>
      不是名單電話，
      <Br />
      而是正在發生的真實需求
    </>
  ),
  lede: '買來的線索名單是過期的靜態資料，公開內容裡的每一句提問卻是剛剛發生、帶著完整語境的成交訊號。',
  before: {
    label: '傳統通路線索',
    tone: 'muted' as const,
    items: [
      '一串號碼，不知道對方在糾結什麼',
      '多家門店同時撥打，第一通電話已經是騷擾',
      '按條計價，無效線索照樣付費',
      '拿到手時需求窗口往往已經關閉',
    ],
  },
  after: {
    label: '線索獵手',
    tone: 'brand' as const,
    items: [
      '保留公開原文與上下文，第一句話就能接上',
      '按組織與地區分發，同一條不重複轟炸',
      '五檔分級先排優先順序，把時間投給最值得的人',
      '時間衰減自動降級，過期需求不占銷售待辦',
    ],
  },
};

// ---------------------------------------------------------------------------
// Capabilities：六宮格
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
    title: '多平台持續採集',
    body: '關鍵詞組、競品帳號、帖子組三種編排，每天定時展開，逐端點健康檢測，分頁與失敗自動重試。',
    icon: 'radar',
  },
  {
    index: '02',
    title: '五檔意向識別',
    body: '大模型負責開放語義理解，本地確定性策略決定最終分級，同時給出摘要、判斷依據與下一步話術。',
    icon: 'brain',
  },
  {
    index: '03',
    title: '三層線索池分發',
    body: '歸屬池確認線索歸誰，組織指派池按六類日配額分配，帳號分發池落到具體銷售，每層都可追溯。',
    icon: 'pools',
  },
  {
    index: '04',
    title: '銷售端唯讀 App',
    body: '銷售只看分配給自己的線索，支援按平台、意向與跟進狀態篩選，可標記已聯繫或跳過。',
    icon: 'phone',
  },
  {
    index: '05',
    title: '組織隔離與三角色',
    body: 'admin、經銷商管理員、銷售三級權限，資料按組織隔離，銷售端不暴露任何跨組織內容。',
    icon: 'shield',
  },
  {
    index: '06',
    title: '閱後即焚短鏈',
    body: '原帖與作者主頁透過伺服器授權短鏈打開，每條連結僅可查看一次，鏈路留痕。',
    icon: 'link',
  },
];

export const capabilitiesSection = {
  eyebrow: '核心能力',
  title: '從採集到交付，一條鏈路上的六件事',
  lede: '每個環節都可以單獨配置和審計，不是一個只能整體接受的黑盒。',
};

// ---------------------------------------------------------------------------
// Pipeline：滾動驅動的六個關鍵幀
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
  post: '7月底｜王朝網｜價格',
  comment: '優惠後還能用報廢補貼嗎？',
  age: '2 小時前',
};

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    index: '01',
    title: '公開內容裡出現一句提問',
    body: '一位使用者在小紅書某條價格帖下留言，問優惠之後能不能疊加報廢補貼。這是公開可見的真實需求表達，不是任何形式的私密資料。',
    meta: '來源 · 小紅書評論',
  },
  {
    id: 'collect',
    index: '02',
    title: '按監測主題採集入庫',
    body: '這條評論命中了經銷商配置的關鍵詞組，隨採集任務一起進入資料庫，保留帖子標題、地區、發佈時間與作者公開資訊。',
    meta: '採集 · 關鍵詞組命中',
  },
  {
    id: 'analyze',
    index: '03',
    title: '四個維度拆解這句話',
    body: '先判斷說話人是誰、這句話在做什麼，再評估可行動性與證據強度。不做關鍵詞硬匹配，賣家回覆和同行廣告在這一步就被排除。',
    meta: '判斷 · 語義拆解',
  },
  {
    id: 'score',
    index: '04',
    title: '給出分級、摘要與話術',
    body: '確定性策略據四維結論落定意向等級，同時產出一句線索摘要和一條下一步建議，銷售不需要自己再讀一遍原文推斷。',
    meta: '輸出 · 高意向',
  },
  {
    id: 'decay',
    index: '05',
    title: '按時間衰減校準',
    body: '同樣一句話，兩小時前問和兩週前問價值完全不同。語義意向疊加評論年齡後重算，過期需求自動降級，不占銷售待辦。',
    meta: '校準 · 0–3 天維持',
  },
  {
    id: 'deliver',
    index: '06',
    title: '流過三池抵達銷售手機',
    body: '確認歸屬組織、扣減當日配額、匹配到具體銷售帳號，線索進入 App 與站內通知，銷售透過授權短鏈打開原帖跟進。',
    meta: '交付 · 銷售端 App',
  },
];

/** 第 3 幀的四維拆解結論 */
export const analysisDimensions = [
  { key: 'speaker_role', label: '說話人角色', value: '買家候選', tone: 'brand' as const },
  { key: 'utterance_type', label: '話語功能', value: '詢價 + 補貼資格', tone: 'brand' as const },
  {
    key: 'buyer_actionability',
    label: '可行動性',
    value: 'immediate_followup',
    tone: 'high' as const,
  },
  { key: 'evidence_strength', label: '證據強度', value: 'strong', tone: 'high' as const },
];

/** 第 4 幀的模型輸出 */
export const analysisOutput = {
  level: 'high' as IntentLevel,
  summary: '河南使用者詢問優惠後是否可疊加報廢補貼，購車語境完整，具備近期決策訊號。',
  nextAction: '先拆解落地價構成，再核對報廢補貼資格',
};

// ---------------------------------------------------------------------------
// IntentEngine
// ---------------------------------------------------------------------------

export const intentSection = {
  eyebrow: '意向識別',
  title: (
    <>
      五檔分級，
      <Br />
      並且會隨時間自動降級
    </>
  ),
  lede: '大模型只負責理解這句話的語義，最終落庫的等級由確定性程式決定——因此同樣的輸入永遠得到同樣的結果，也能解釋為什麼是這個等級。',
  dimensionsIntro: '判斷順序固定，先角色後語義，避免把賣家回覆和同行廣告誤判為客戶需求。',
  decayIntro: '拖動下面的天數，看同一條語義意向如何隨評論年齡降級。',
  levels: [
    {
      level: 'high' as IntentLevel,
      sample: '優惠後還能用報廢補貼嗎？',
      note: '明確詢價、現車、補貼或成交計畫',
    },
    {
      level: 'mid' as IntentLevel,
      sample: '宋 Pro 和元 UP 到底怎麼選？',
      note: '車型比較、配置選擇與流程諮詢',
    },
    {
      level: 'weak' as IntentLevel,
      sample: '這車看著還行',
      note: '輕度興趣，購車語境尚不完整',
    },
    {
      level: 'none' as IntentLevel,
      sample: '私信我，本店有現車',
      note: '賣家回覆、同行廣告或無關內容',
    },
    {
      level: 'review' as IntentLevel,
      sample: '幫朋友問問',
      note: '角色或語境衝突，證據不足交人工',
    },
  ],
};

// ---------------------------------------------------------------------------
// ThreePools
// ---------------------------------------------------------------------------

export const poolsSection = {
  eyebrow: '三池分發',
  title: (
    <>
      一條線索的歸屬、配額與落點，
      <Br at="lg" />
      每一層都說得清
    </>
  ),
  lede: '線索不是評分完就直接群發。它要先確認歸誰，再按組織的每日配額分配，最後才落到具體銷售帳號——三層之間的每次流轉都有記錄。',
  pools: [
    {
      id: 'ownership',
      name: '歸屬池',
      tone: 'neutral' as const,
      caption: '這條線索歸誰',
      body: '剛評分完成的線索先進歸屬池。同一條內容可能同時命中多個組織的監測主題，此時由平台管理員確認歸屬，避免多家門店重複觸達同一位客戶。',
      tags: ['多組織可共享', '平台管理員確認'],
    },
    {
      id: 'org',
      name: '組織指派池',
      tone: 'brand' as const,
      caption: '這個組織今天還能領多少',
      body: '歸屬確認後進入組織指派池，按六類共享日配額扣減。配額用盡的組織當天不再進新線索，積壓部分按先進先出在次日補發。',
      tags: ['六類日配額', 'FIFO 積壓補發'],
    },
    {
      id: 'account',
      name: '帳號分發池',
      tone: 'accent' as const,
      caption: '具體交給哪位銷售',
      body: '按命中組的帳號取並集，落到具體銷售帳號並寫入分發記錄。銷售端 App 只能看到落到自己帳號的線索，同組同事的也看不到。',
      tags: ['命中組帳號取並集', '銷售端唯讀可見'],
    },
  ],
};

// ---------------------------------------------------------------------------
// LeadSamples：脫敏樣本跑馬燈
// ---------------------------------------------------------------------------

export type LeadSample = {
  platform: '小红书' | '抖音';
  city: string;
  text: string;
  level: IntentLevel;
};

export const leadSamples: LeadSample[] = [
  { platform: '小红书', city: '河南', text: '優惠後還能用報廢補貼嗎？', level: 'high' },
  { platform: '抖音', city: '成都', text: '成都有沒有現車，最快多久能提', level: 'high' },
  { platform: '小红书', city: '苏州', text: '十五個多，是首付還是落地？', level: 'high' },
  { platform: '抖音', city: '苏州', text: '生產要多久', level: 'mid' },
  { platform: '小红书', city: '天津', text: '熱泵空調有沒有人說一下', level: 'mid' },
  { platform: '抖音', city: '重庆', text: '宋 Pro 和元 UP 到底怎麼選？', level: 'mid' },
  { platform: '小红书', city: '杭州', text: '四驅版本值得加這個錢嗎', level: 'mid' },
  { platform: '抖音', city: '武汉', text: '置換補貼需要什麼材料', level: 'high' },
  { platform: '小红书', city: '西安', text: '這個配色實車好看嗎', level: 'weak' },
  { platform: '抖音', city: '长沙', text: '試駕要提前預約嗎', level: 'high' },
  { platform: '小红书', city: '青岛', text: '同價位還有別的推薦嗎', level: 'mid' },
  { platform: '抖音', city: '郑州', text: '保養一次大概多少錢', level: 'weak' },
];

// ---------------------------------------------------------------------------
// Surfaces：雙端展示
// ---------------------------------------------------------------------------

export const surfaces = {
  eyebrow: '產品體驗',
  title: '後台掌控全局，銷售端只專注跟進',
  lede: '兩端圍繞同一條線索協同：Web 控制台負責監測配置、意向覆核與三池營運，銷售端 App 只呈現已分配到個人的線索。',
  console: {
    label: 'Web 控制台',
    shots: [
      {
        src: '/assets/screenshots/console-leads.jpg',
        alt: '控制台線索中心，展示線索總庫與三池標籤頁',
        title: '線索中心 · 三池視圖',
        caption: '線索總庫、歸屬池、組織指派池、帳號分發池在同一頁切換，每條線索都帶三池計數。',
      },
      {
        src: '/assets/screenshots/console-dashboard.jpg',
        alt: '控制台資料總覽，展示內容、評論、線索與意向分佈',
        title: '資料總覽',
        caption: '內容、評論、線索與意向分佈一屏可見，快速定位當日跟進重點。',
      },
      {
        src: '/assets/screenshots/console-keywords.jpg',
        alt: '控制台關鍵詞配置頁',
        title: '監測配置',
        caption: '把落地價、現車、補貼等詞納入本店監測主題，按組管理、每天定時展開。',
      },
    ],
  },
  app: {
    label: '銷售端 App',
    title: '銷售只看一件事：今天該跟誰',
    body: 'App 是唯讀的——不提供歸屬確認、組織指派與帳號分發能力，這些介面對銷售角色完全不開放。它只回答一個問題：哪些線索落到了我頭上，我該怎麼開口。',
    cta: '申請內測',
    note: 'TestFlight 與 Android 安裝包內測中',
    shots: [
      {
        src: '/assets/screenshots/ios-01.jpg',
        alt: '銷售端線索列表，按意向分檔並顯示跟進狀態',
        index: '01',
        caption: '按意向排優先順序',
        desc: '只列出分配給本人的線索，高中意向分開計數，可按平台、日期與跟進狀態篩選。',
      },
      {
        src: '/assets/screenshots/ios-02.jpg',
        alt: '銷售端線索詳情，含評論原文、來源組與跟進建議',
        index: '02',
        caption: '帶著上下文開口',
        desc: '評論原文、帖子標題、來源組與 AI 跟進建議在同一屏，不用切平台反覆確認。',
      },
      {
        src: '/assets/screenshots/ios-03.jpg',
        alt: '銷售端通知中心，含每日摘要與新線索提醒',
        index: '03',
        caption: '不用盯著後台',
        desc: '新線索即時通知，每天 10:00 彙總當日待跟進摘要，未讀數直接落在圖示上。',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

export const rolesSection = {
  eyebrow: '角色權限',
  title: '三種角色，三種視野',
  lede: '同一套資料，按角色裁剪出完全不同的可見範圍。越靠前線，看到的越聚焦。',
  roles: [
    {
      id: 'admin',
      name: '平台管理員',
      latin: 'admin',
      summary: '管理全部組織、配額與歸屬，跨組織指派線索',
      abilities: [
        '建立經銷商管理員與銷售帳號，分配組織席位配額',
        '在歸屬池確認線索歸屬，處理多組織命中衝突',
        '設定各組織六類意向的每日分發配額與排序策略',
        '配置採集端點、短鏈域名與系統參數',
      ],
      scope: '全部組織',
    },
    {
      id: 'saler-admin',
      name: '經銷商管理員',
      latin: 'saler-admin',
      summary: '管理本組織的監測主題、銷售帳號與線索指派',
      abilities: [
        '維護本組織關鍵詞組、競品組與帖子組，每天 00:00 定時採集',
        '在組織指派池把線索分配到本組織銷售，可撤銷重派',
        '在席位配額內建立與停用本組織銷售帳號',
        '維護跟進話術範本，查看本組織線索統計',
      ],
      scope: '本組織（脫敏）',
    },
    {
      id: 'user',
      name: '一線銷售',
      latin: 'user',
      summary: '在 App 裡唯讀查看分配給自己的線索',
      abilities: [
        '查看已分配到本人帳號的線索，按平台與狀態篩選',
        '標記已聯繫或跳過，跟進狀態回寫線索',
        '接收站內通知與每日 10:00 待辦摘要推送',
        '透過閱後即焚短鏈打開原帖與作者主頁',
      ],
      scope: '僅本人已分配',
    },
  ],
};

// ---------------------------------------------------------------------------
// Timeline：一天的自動化節奏
// ---------------------------------------------------------------------------

export const timeline = {
  eyebrow: '每日節奏',
  title: '系統的一天',
  lede: '除了管理員的歸屬確認，其餘環節全部自動完成。銷售早上打開手機就能看到當天該跟的人。',
  events: [
    {
      time: '00:00',
      title: '定時採集',
      body: '各組織的關鍵詞組、競品組與帖子組批量展開，按端點速率限制依次抓取。',
    },
    {
      time: '採集完成後',
      title: '觸發評分',
      body: '有新評論即觸發評分，失敗則進持久隊列，由定時任務每 2 小時兜底重試。',
    },
    {
      time: '02:30',
      title: '兜底指派',
      body: '把仍未指派的中高意向線索按負載均衡分配給在崗銷售，避免線索沉底。',
    },
    {
      time: '10:00',
      title: '摘要推送',
      body: '當日待跟進線索彙總成摘要，推送到銷售端 App，配合站內通知提醒。',
    },
  ],
};

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const security = {
  eyebrow: '資料邊界',
  title: (
    <>
      資訊流動有速度，
      <Br />
      可見範圍有邊界
    </>
  ),
  lede: '所有資料只來自平台公開可見的內容，並按組織與帳號逐層收窄可見範圍。',
  items: [
    {
      title: '僅採集公開內容',
      body: '只處理平台上任何人都能看到的評論與帖子，不涉及私信、通訊錄或任何需要授權才能存取的資料。',
    },
    {
      title: '組織隔離',
      body: '經銷商管理員與銷售只能存取本組織資料，跨組織查詢在伺服器統一攔截。',
    },
    {
      title: '銷售端唯讀',
      body: 'App 不提供歸屬、指派與分發能力，介面層面就沒有開放變更入口。',
    },
    {
      title: '授權短鏈存取',
      body: '原帖與作者主頁經伺服器簽發短鏈打開，每條連結僅可查看一次並留下造訪記錄。',
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = {
  eyebrow: '常見問題',
  title: '關於線索獵手',
  lede: '關於資料來源、識別準確度、接入方式與權限邊界，這裡是最常被問到的幾個問題。',
  items: FAQ['zh-Hant'],
};

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const cta = {
  eyebrow: '準備開始發現線索？',
  title: (
    <>
      讓下一條高意向，
      <Br />
      更早抵達銷售手機
    </>
  ),
  lede: '掃碼加入銷售經理，或打開聯繫頁預約演示、開通試用。',
  primary: '發送諮詢',
  secondary: '聯繫銷售',
  guide: '閱讀產品介紹',
};

export const guideSection = {
  eyebrow: '產品介紹',
  title: (
    <>
      後台與 APP 怎麼用，
      <Br />
      都寫在圖文手冊裡
    </>
  ),
  lede: '完整圖文手冊發佈在 leadshunter-guide.lancloudtech.com。下面直接嵌入該頁面，也可新視窗打開閱讀後台、APP 用法和長沙門店使用效果。',
  primary: '打開產品介紹',
  iframeTitle: '線索獵手產品介紹與使用說明',
};

export const pipelineSection = {
  eyebrow: '工作方式',
  title: '一條線索，如何抵達銷售手機',
  lede: '下面跟著一條真實評論走完全程。從公開內容裡出現的一句提問，到落進某位銷售的待辦，每一步都可解釋、可追溯。',
  ledeReduced: '從公開互動中提取成交訊號，每一步都可解釋、可追溯。',
};

export const samplesSection = {
  eyebrow: '線索長什麼樣',
  title: (
    <>
      不是一行資料，
      <Br />
      而是一句能接上話的提問
    </>
  ),
  lede: '以下均為脫敏後的公開評論示例。銷售看到的是原話本身，加上分級、摘要與建議。',
};

export const ui = {
  skipToMain: '跳到主要內容',
  metricsAria: '產品能力概覽',
  navAria: '頁面導覽',
  navMobileAria: '行動版導覽',
  navOpen: '打開導覽選單',
  navClose: '關閉導覽選單',
  guide: '產品介紹',
  contact: '聯繫銷售',
  bookDemo: '預約演示',
  bookDemoLong: '預約產品演示',
  readGuide: '閱讀產品介紹',
  localeAria: '切換語言',
  locales: {
    'zh-Hans': '简体',
    'zh-Hant': '繁體',
    en: 'EN',
  },
  footerCompany: '蘭芯雲朵官網',
  footerIndex: '公司站產品索引',
  footerApp: '銷售端下載',
  footerPhone: '電話',
  footerMail: '郵件',
  footerBlurb: IDENTITY['zh-Hant'].tagline,
  footerLegal: '僅採集平台公開可見內容 · 資料按組織隔離',
  contactQrAlt: '線索獵手銷售經理企業微信二維碼，長按識別',
  contactQrTitle: '長按識別二維碼',
  contactQrHint: '加入線索獵手銷售經理',
  contactWecom: '企業微信',
  phone: '電話',
  mail: '郵件',
  heroPhoneAlt: '銷售端 App 線索列表',
  heroFactsAria: '產品能力概覽',
  heroCardKicker: '新發現 · 河南',
  heroCardText: '優惠後還能用報廢補貼嗎？',
  heroCardMeta: '已進入歸屬池 · 等待確認組織',
  consoleTitle: '線索獵手 · 線索中心',
  consoleBadge: '即時',
  consoleTabs: ['線索總庫', '歸屬池', '組織指派池', '帳號分發池'],
  consoleAll: '全部',
  consoleHigh: '高意向',
  consoleMid: '中意向',
  consoleStreamAria: '線索流示例',
  consoleComment: '評論',
  consoleScoring: '評分中',
  intentDecayEyebrow: '時間衰減',
  intentSemanticAria: '選擇語義意向',
  intentModelJudge: '模型判定',
  intentAge: '評論年齡',
  intentDays: '天',
  intentFinal: '落庫意向',
  intentSlider: '評論年齡（天）',
  intentJustNow: '剛發佈',
  intentFreshPrefix: '需求窗口仍然新鮮，維持',
  intentFreshSuffix: '，正常進入分發流程。',
  intentDegradedFrom: '這條線索已從',
  intentDegradedTo: '衰減為',
  intentDegradedNone: '，不再進入銷售待辦。',
  intentDegradedDown: '，優先順序相應下調。',
  intentBand: '30 天衰減帶',
  intentLeft: '越靠左需求越新鮮',
  intentRight: '越靠右越接近失效',
  intentOrder: '判斷順序',
  intentRules: '完整衰減規則',
  intentNoDecay: '無意向與待覆核不參與衰減：前者已經排除，後者等待人工確認。',
  intentDimensions: [
    { step: '1', name: 'speaker_role', label: '說話人是誰' },
    { step: '2', name: 'utterance_type', label: '這句話在做什麼' },
    { step: '3', name: 'buyer_actionability', label: '值不值得馬上跟' },
    { step: '4', name: 'evidence_strength', label: '證據夠不夠硬' },
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
  pipelineCaptured: '已入庫',
  pipelinePublic: '公開可見',
  pipelinePost: '帖子',
  pipelineHitTopic: '命中主題',
  pipelineHitTopicValue: '報廢補貼',
  pipelineHitGroup: '命中組',
  pipelineHitGroupValue: '王朝網關鍵詞組',
  pipelineAnalyzeTitle: '語義拆解 · 判斷順序固定',
  pipelineAnalyzeNote: '角色先於語義：賣家回覆與同行廣告在第一維就被排除，不做關鍵詞硬匹配。',
  pipelineScoreOut: '模型輸出',
  pipelineSummary: '線索摘要',
  pipelineNext: '下一步建議',
  pipelineDecayNote: '時間衰減校準 · 評論年齡 2 小時',
  pipelineCurrent: '當前',
  pipelineNow: '現在',
  pipelineNewLead: '你有 1 條新線索',
  pipelineAppTabs: ['首頁', '線索', '通知'],
  pipelinePools: [
    { name: '歸屬池', tone: 'var(--lh-intent-weak)' },
    { name: '組織指派池', tone: 'var(--lh-brand)' },
    { name: '帳號分發池', tone: 'var(--lh-accent)' },
  ],
  pipelineDecayRules: [
    { range: '0–3 天', level: 'high' as IntentLevel, active: true },
    { range: '3–7 天', level: 'mid' as IntentLevel, active: false },
    { range: '7 天以上', level: 'none' as IntentLevel, active: false },
  ],
  notFoundTitle: '沒有這個頁面',
  notFoundBody: '連結可能寫錯了，或頁面已經換了地址。',
  notFoundHome: '回到首頁',
};
