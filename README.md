# 线索猎手 · 产品官网

LeadsHunter（金星版 Venus）产品营销落地页。单页长滚动，深色为设计基线，用滚动驱动的可视化讲清「公开内容采集 → AI 五档意向 → 三层线索池 → 销售端 App」这条链路。

## 技术栈

| 用途 | 选型 |
| --- | --- |
| 构建 | Vite 8 |
| 框架 | React 19 + TypeScript 5 |
| 样式 | Tailwind CSS 4（CSS-first，`@theme` 定义 token） |
| 动效 | motion 13（`motion/react`） |
| 平滑滚动 | lenis 1.3 |
| 字体 | 自托管 Inter 可变字体拉丁子集（48KB），中文回落系统字体 |

## 开发

```bash
npm install
npm run dev        # http://localhost:5199
npm run build      # tsc -b && vite build，产物在 dist/
npm run preview    # 预览生产构建
npm run typecheck  # 仅类型检查
```

## 目录结构

```
src/
├── main.tsx / App.tsx          # 入口与区块编排（首屏之后的区块懒加载）
├── styles/index.css            # 设计 token、主题覆写、关键帧、自定义 utility
├── content/site.tsx            # 全站文案集中一处，便于改稿与后续 i18n
├── lib/
│   ├── motion.ts               # easing / spring / variants 预设
│   ├── theme.ts                # 主题状态与持久化
│   ├── useLenis.ts             # 平滑滚动与锚点跳转
│   └── intentDecay.ts          # 意向时间衰减规则，与后端确定性策略一致
├── components/
│   ├── primitives/             # Reveal Marquee Counter Backdrop Button Section
│   ├── layout/                 # Nav Footer ThemeToggle
│   └── mocks/                  # LiveConsole Frames IntentBadge
└── sections/                   # 14 个页面区块，一段一文件
```

## 主题

深色是设计基线，`<html data-theme="dark">` 由 `index.html` 的内联脚本在首帧前落定，避免闪烁。用户显式点击切换按钮后写入 `localStorage.lh-theme`，浅色主题通过 `[data-theme="light"]` 覆写同名 CSS 变量实现，无需重新加载。

## 动效约定

- 滚动联动、共享布局、进出场统一走 `motion/react`；跑马灯、网格底纹、极光光斑走纯 CSS，避免占用主线程
- 所有动效只改 `transform` / `opacity` / `filter`，不触发 layout
- 命中 `prefers-reduced-motion` 时：Lenis 不启用，Pipeline 由 sticky 滚动劫持退化为静态分步网格，跑马灯变为可横向滚动列表，其余仅保留淡入

## 内容口径

首屏数字条使用产品**能力**口径（平台数、意向档位数、线索池层数、采集端点数），不使用运营统计数据。产品截图内的 509 / 233 / 276 是控制台与 App 的真实界面示例，仅作 UI 演示。

线索样本均为脱敏后的公开评论示例。

## 部署

独立静态站，计划挂在 [Cloudflare Pages](https://developers.cloudflare.com/pages/)，自定义域 `leadshunter.lancloudtech.com`。

```bash
npm run build    # 产物在 dist/
```

Pages 项目设置：

| 项 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Build output | `dist` |
| Node | 20 |
| 自定义域 | `leadshunter.lancloudtech.com` |

`public/_headers`、`public/_redirects`、`robots.txt`、`sitemap.xml` 会随构建复制到 `dist/`。SPA 回退已配置为 `/* → /index.html 200`，静态文件仍优先。

分享图必须用绝对 HTTPS 地址（微信爬虫不执行 JS、也不认相对路径）：

- 通用 OG / Twitter：`/assets/og-share.png`（1200×630）
- 微信会话卡片：`/assets/wechat-share.jpg`（1024×1024，方图）

微信会缓存卡片。上线或换图后，用[微信公众平台分享调试](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)或把链接丢进文件传输助手再分享，必要时给图片加 `?v=` 版本号清缓存。

base path 默认 `/`。若将来挂到子路径，构建时设置：

```bash
SITE_BASE=/leadshunter/ npm run build
```
