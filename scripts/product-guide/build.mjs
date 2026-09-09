import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sales } from '../sales.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(root, 'product-guide');
const output = path.join(root, 'dist-guide');
const pdfName = '线索猎手-产品介绍与使用说明.pdf';
const html = await fs.readFile(path.join(source, '线索猎手-图文阅读版.html'), 'utf8');
const pdf = await fs.readFile(path.join(source, 'leadshunter-guide.pdf'));
if (pdf.subarray(0, 5).toString() !== '%PDF-') throw new Error('A valid PDF is required');
if (!html.includes('href="leadshunter-guide.pdf"') || html.includes('下载 Markdown')) {
  throw new Error('The page must offer the PDF download');
}
if (!html.includes(`href="${sales.contact}"`) || !html.includes('sales-banner__cta')) {
  throw new Error('The sales banner must open the contact Pages site');
}
const assets = [...new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]))];
const shareAssets = ['assets/leadshunter-app-logo.jpg', 'assets/leadshunter-app-icon.png'];
const illustrations = assets.filter((asset) => !shareAssets.includes(asset));

for (const asset of [...assets, ...shareAssets]) {
  if (!/^assets\/[\w.-]+\.(png|jpg|svg)$/.test(asset)) {
    throw new Error(`Unexpected image path: ${asset}`);
  }
  await fs.access(path.join(source, asset));
}
if (illustrations.length !== 29) throw new Error(`Expected 29 illustrations; found ${illustrations.length}`);
for (const asset of shareAssets) {
  if (!html.includes(asset)) throw new Error(`Sharing asset is not referenced: ${asset}`);
}
if (html.includes('案例统计口径.md') || html.includes('资料来源与图片索引.md')) {
  throw new Error('The public page must not link to editorial documents');
}

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(path.join(output, 'assets'), { recursive: true });
await fs.writeFile(path.join(output, 'index.html'), html);
await fs.writeFile(path.join(output, 'leadshunter-guide.pdf'), pdf);
await fs.writeFile(path.join(output, '_headers'), [
  '/leadshunter-guide.pdf',
  `  Content-Disposition: attachment; filename="leadshunter-guide.pdf"; filename*=UTF-8''${encodeURIComponent(pdfName)}`,
  '  Cache-Control: public, max-age=0, must-revalidate',
  '',
].join('\n'));
for (const asset of [...assets, ...shareAssets]) {
  await fs.copyFile(path.join(source, asset), path.join(output, asset));
}
console.log(JSON.stringify({ output, files: new Set([...assets, ...shareAssets]).size + 3, illustrations: illustrations.length, sharingAssets: shareAssets.length }));
