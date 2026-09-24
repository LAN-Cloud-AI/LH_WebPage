import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';

import { App } from './App';
import { setPrerenderLocale, type SiteLocale } from './lib/locale';

const streamToString = async (stream: NodeJS.ReadableStream) => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
};

/** 把某一语言的营销页渲染成静态 HTML，供构建写入 #root。 */
export async function renderLocale(locale: SiteLocale) {
  setPrerenderLocale(locale);
  try {
    const { prelude } = await prerenderToNodeStream(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    return await streamToString(prelude);
  } finally {
    setPrerenderLocale(null);
  }
}
