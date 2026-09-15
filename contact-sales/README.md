---
title: 线索猎手｜联系销售
type: runbook
status: current
owner: Kaison
updated: 2026-09-09
related:
  - README.md
  - product-guide/README.md
---
# 线索猎手｜联系销售

独立 Cloudflare Pages，只放销售经理联系方式。

正式地址：[leadshunter-contact.lancloudtech.com](https://leadshunter-contact.lancloudtech.com/)

手册底部按钮和官网 `/contact` 都跳到这里，不在手册底栏再堆电话、邮件和企业微信。

## 发布

在仓库根目录：

```bash
npm run contact:build     # 生成 dist-contact/
npm run deploy:contact    # 发布到 Pages 项目 leadshunter-contact
npm run dns:contact       # 绑定自定义域（首次或重绑时）
```

Pages 项目：`leadshunter-contact`。生产分支：`main`。自定义域：`leadshunter-contact.lancloudtech.com`。
