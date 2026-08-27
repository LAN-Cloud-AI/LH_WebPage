import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 独立站为正式产品官网。公司站 /leadshunter/ 已跳转到本域，不要再并回路由。
const base = process.env.SITE_BASE ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5199,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    cssTarget: 'safari16',
    assetsInlineLimit: 2048,
  },
});
