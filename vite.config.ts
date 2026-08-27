import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 独立站部署走根路径。若将来并入公司站 /leadshunter/ 路由，只需改 SITE_BASE。
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
