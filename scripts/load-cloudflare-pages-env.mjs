import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** 读取 ~/.config/lanxin/env/cloudflare/pages.env，供 Pages / DNS 操作使用。 */
export const loadCloudflarePagesEnv = () => {
  const file = path.join(os.homedir(), '.config/lanxin/env/cloudflare/pages.env');
  if (!fs.existsSync(file)) {
    console.warn(`Missing ${file}; falling back to process env CLOUDFLARE_API_TOKEN.`);
    return;
  }
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
};
