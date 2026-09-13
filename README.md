# 线索猎手 · 产品官网

仓库：[LAN-Cloud-AI/LH_WebPage](https://github.com/LAN-Cloud-AI/LH_WebPage)

LeadsHunter（金星版 Venus）产品营销落地页。单页长滚动，深色为设计基线，用滚动驱动的可视化讲清「公开内容采集 → AI 五档意向 → 三层线索池 → 销售端 App」这条链路。产品图文手册也在本仓库 `product-guide/`，仍发布到 [leadshunter-guide.lancloudtech.com](https://leadshunter-guide.lancloudtech.com/)。联系销售是独立 Pages：[leadshunter-contact.lancloudtech.com](https://leadshunter-contact.lancloudtech.com/)。

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
product-guide/                      # 产品介绍与使用说明（独立 Pages 项目）
contact-sales/                      # 联系销售页说明
scripts/product-guide/              # 手册 HTML / PDF / 发布包
scripts/contact-sales/              # 联系销售页构建
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

默认跟随系统亮暗模式，系统运行时切换会立即生效。页脚与移动端汉堡菜单均提供「跟随系统 / 白天 / 黑夜」可见开关，桌面导航保留快捷选择。显式浅色或深色写入 `localStorage['lancloud.theme']` 并优先于系统，选择跟随系统则移除该偏好。旧版 `lh-theme` 有效偏好在首次访问时迁移到新键，不覆盖已有新偏好；异常值或存储不可用时默认跟随系统。

`public/theme-init.js` 在首帧前统一设置 `data-theme`、原生控件的 `color-scheme` 和浏览器 `theme-color`，React 订阅同一状态；跨标签页的偏好变更也会同步。每次状态变化发送 `lan:theme-change` 事件，详情为 `{theme, preference}`，与公司站使用一致约定（不同域的偏好各自保存）。页面 token 与 Tailwind 主题类均依赖 `data-theme`。产品截图为固定的真实 UI 示例，不根据系统主题替换成另一张图。三语页面及 404 均沿用同一主题状态。

## 动效约定

- 滚动联动、共享布局、进出场统一走 `motion/react`；跑马灯、网格底纹、极光光斑走纯 CSS，避免占用主线程
- 所有动效只改 `transform` / `opacity` / `filter`，不触发 layout
- 命中 `prefers-reduced-motion` 时：Lenis 不启用，Pipeline 由 sticky 滚动劫持退化为静态分步网格，跑马灯变为可横向滚动列表，其余仅保留淡入

## 内容口径

首屏数字条使用产品**能力**口径（平台数、意向档位数、线索池层数、采集端点数），不使用运营统计数据。产品截图内的 509 / 233 / 276 是控制台与 App 的真实界面示例，仅作 UI 演示。

线索样本均为脱敏后的公开评论示例。

## 部署

已挂在 [Cloudflare Pages](https://developers.cloudflare.com/pages/)，直传 `dist`（不走 Git 构建）。

- 正式域：https://leadshunter.lancloudtech.com/
- 预览域：https://leadshunter-webpage.pages.dev
- 公司站索引：兰芯云朵官网首页 `#leadshunter`、页脚与 `/sitemap/` 指向本域；`https://lancloudtech.com/leadshunter/` 仅跳转，不再作为产品页

```bash
npx wrangler pages deploy dist --project-name leadshunter-webpage --branch main
# 或
npm run deploy
```

产品手册单独发布，正式域不变：

```bash
npm run deploy:guide      # 渲染 + 导出 PDF + 发布到 leadshunter-guide
npm run deploy:contact    # 发布联系销售页到 leadshunter-contact
```

DNS：`leadshunter.lancloudtech.com` 橙云 CNAME → `leadshunter-webpage.pages.dev`。重绑域名：

```bash
npm run dns           # 官网 + www.leadshunter
npm run dns:guide     # 手册 + www.leadshunter-guide
npm run dns:contact   # 联系销售 + www.leadshunter-contact
```

`www.*` 橙云 CNAME 到同一 Pages 项目；`functions/_middleware.js` 把 `www.` 301 回不带 www 的正式域。

Pages 项目：

| 项 | 值 |
| --- | --- |
| Project | `leadshunter-webpage` |
| 输出目录 | `dist` |
| 生产分支 | `main` |
| 自定义域 | `leadshunter.lancloudtech.com`（`www.` 301 到此） |

手册 Pages 项目：

| 项 | 值 |
| --- | --- |
| Project | `leadshunter-guide` |
| 源码 | `product-guide/` |
| 输出目录 | `dist-guide` |
| 生产分支 | `main` |
| 自定义域 | `leadshunter-guide.lancloudtech.com`（`www.` 301 到此） |

联系销售 Pages 项目：

| 项 | 值 |
| --- | --- |
| Project | `leadshunter-contact` |
| 源码 | `scripts/contact-sales/` |
| 输出目录 | `dist-contact` |
| 生产分支 | `main` |
| 自定义域 | `leadshunter-contact.lancloudtech.com`（`www.` 301 到此） |

`public/_headers`、`public/_redirects`、`robots.txt`、`sitemap.xml` 会随构建复制到 `dist/`。未知路由返回真正的 404，不使用 SPA 200 回退；三语页面拥有各自的 canonical 与 hreflang。

分享图必须用绝对 HTTPS 地址（微信爬虫不执行 JS、也不认相对路径）：

- 分享图统一为 App logo：`/assets/wechat-share.jpg`（1024×1024）
- `og:image` / `itemprop` / `image_src` / Twitter 都指向同一张 logo，避免微信抓到旧横图

微信会缓存卡片。上线或换图后，用[微信公众平台分享调试](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)或把链接丢进文件传输助手再分享，必要时给图片加 `?v=` 版本号清缓存。

base path 默认 `/`。本站是正式产品官网，不要再并入公司站 `/leadshunter/` 路由。
