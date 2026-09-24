import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import './styles/index.css';
import { App } from './App';
import { HTML_LANG } from './lib/locale';
import { currentLocale } from './lib/locale';

document.documentElement.lang = HTML_LANG[currentLocale()];

const container = document.getElementById('root');
if (!container) throw new Error('缺少 #root 挂载点');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (container.childElementCount > 0) hydrateRoot(container, app);
else createRoot(container).render(app);
