import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(root, 'product-guide/线索猎手-图文阅读版.html');
const output = path.join(root, 'product-guide/leadshunter-guide.pdf');
const chrome = process.env.GUIDE_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
await fs.access(chrome);
await fs.access(source);
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'leadshunter-pdf-'));

try {
  const result = spawnSync(chrome, [
    '--headless',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-sync',
    '--disable-extensions',
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    '--timeout=60000',
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ], { encoding: 'utf8', timeout: 65000, maxBuffer: 4 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.error?.message || result.stderr || 'PDF export failed');
  const pdf = await fs.readFile(output);
  if (pdf.subarray(0, 5).toString() !== '%PDF-' || pdf.length < 100000) {
    throw new Error('PDF export is incomplete');
  }
  console.log(JSON.stringify({ output, bytes: pdf.length }));
} finally {
  await fs.rm(profile, { recursive: true, force: true });
}
