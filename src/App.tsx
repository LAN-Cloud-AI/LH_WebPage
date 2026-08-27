import { useReducedMotion } from 'motion/react';
import { lazy, Suspense, useEffect } from 'react';

import { Footer } from './components/layout/Footer';
import { Nav } from './components/layout/Nav';
import { useLenis } from './lib/useLenis';
import { Capabilities } from './sections/Capabilities';
import { Hero } from './sections/Hero';
import { Metrics } from './sections/Metrics';
import { Problem } from './sections/Problem';

// 首屏之后的重型区块单独切包，首屏 JS 只包含 Nav/Hero/Metrics/Problem/Capabilities
const Pipeline = lazy(() => import('./sections/Pipeline').then((m) => ({ default: m.Pipeline })));
const IntentEngine = lazy(() =>
  import('./sections/IntentEngine').then((m) => ({ default: m.IntentEngine })),
);
const ThreePools = lazy(() =>
  import('./sections/ThreePools').then((m) => ({ default: m.ThreePools })),
);
const LeadSamples = lazy(() =>
  import('./sections/LeadSamples').then((m) => ({ default: m.LeadSamples })),
);
const Surfaces = lazy(() => import('./sections/Surfaces').then((m) => ({ default: m.Surfaces })));
const Roles = lazy(() => import('./sections/Roles').then((m) => ({ default: m.Roles })));
const Timeline = lazy(() => import('./sections/Timeline').then((m) => ({ default: m.Timeline })));
const Security = lazy(() => import('./sections/Security').then((m) => ({ default: m.Security })));
const Faq = lazy(() => import('./sections/Faq').then((m) => ({ default: m.Faq })));
const Cta = lazy(() => import('./sections/Cta').then((m) => ({ default: m.Cta })));

export function App() {
  const reduced = useReducedMotion();
  const lenisRef = useLenis(!reduced);

  // 带 hash 直接进站时，懒加载区块挂载后文档才变高，需要重新定位一次
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash === '#top') return;
    const timer = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' });
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        跳到主要内容
      </a>

      <Nav lenisRef={lenisRef} />

      <main id="main">
        <Hero lenisRef={lenisRef} />
        <Metrics />
        <Problem />
        <Capabilities />

        <Suspense fallback={<SectionFallback />}>
          <Pipeline />
          <IntentEngine />
          <ThreePools />
          <LeadSamples />
          <Surfaces />
          <Roles />
          <Timeline />
          <Security />
          <Faq />
          <Cta />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

/** 占位高度避免懒加载时页面高度塌缩导致滚动跳动 */
function SectionFallback() {
  return <div className="h-screen" aria-hidden="true" />;
}
