---
title: 线索猎手｜产品介绍与使用说明
type: overview
status: current
owner: Kaison
updated: 2026-09-09
related:
  - product-guide/线索猎手-产品介绍与使用说明.md
  - product-guide/en.md
  - product-guide/zh-Hant.md
  - contact-sales/README.md
---
# 线索猎手｜产品介绍与使用说明

让公开表达的购车需求，成为门店可以发现、理解和跟进的销售机会。

正式地址：[leadshunter-guide.lancloudtech.com](https://leadshunter-guide.lancloudtech.com/)

产品官网：[leadshunter.lancloudtech.com](https://leadshunter.lancloudtech.com/)

联系销售：[leadshunter-contact.lancloudtech.com](https://leadshunter-contact.lancloudtech.com/)

- [产品介绍与使用说明](线索猎手-产品介绍与使用说明.md)
- [图文阅读页面](线索猎手-图文阅读版.html)
- [PDF 使用手册](leadshunter-guide.pdf)

## 发布

在仓库根目录：

```bash
npm run guide:pack      # 渲染 HTML、导出 PDF、生成 dist-guide/
npm run deploy:guide    # 发布到 Cloudflare Pages 项目 leadshunter-guide
```

Pages 项目：`leadshunter-guide`。生产分支：`main`。自定义域：`leadshunter-guide.lancloudtech.com`。官网项目 `leadshunter-webpage` 只嵌入和跳转这份手册，不另存副本。手册底栏按钮跳到独立联系页 `leadshunter-contact`。
