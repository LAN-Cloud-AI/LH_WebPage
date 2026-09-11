import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import { App } from './App';
import { HTML_LANG } from './lib/locale';
import { currentLocale } from './lib/locale';

document.documentElement.lang = HTML_LANG[currentLocale()];

const container = document.getElementById('root');
if (!container) throw new Error('缺少 #root 挂载点');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
