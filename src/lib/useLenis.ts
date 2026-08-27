import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

/**
 * Lenis 平滑滚动。命中 prefers-reduced-motion 时完全不启用，
 * 保留浏览器原生滚动。锚点跳转由返回的 scrollTo 处理。
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}

/** 全站锚点跳转：有 Lenis 用 Lenis，否则退回原生 */
export function scrollToAnchor(lenis: Lenis | null, hash: string, offset = -80) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset, duration: 1.1 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'auto' });
  }
}
