import type Lenis from 'lenis';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

import { localizedContactUrl, localizedGuideUrl, useContent } from '../../content/runtime';
import { easeOutQuint, springSnappy } from '../../lib/motion';
import { scrollToAnchor } from '../../lib/useLenis';
import { Button } from '../primitives/Button';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';

type NavProps = { lenisRef: RefObject<Lenis | null> };

export function Nav({ lenisRef }: NavProps) {
  const { site, ui } = useContent();
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCondensed(latest > 40);
  });

  // 锚点高亮：观察每个 section 与视口中部的交叉
  useEffect(() => {
    const targets = site.nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // 抽屉打开时锁滚动
  useEffect(() => {
    const lenis = lenisRef.current;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, lenisRef]);

  const go = (href: string) => {
    setOpen(false);
    // 等抽屉收起再滚，避免滚动被锁定期间丢失
    requestAnimationFrame(() => scrollToAnchor(lenisRef.current, href));
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4"
        initial={false}
      >
        <motion.div
          className="flex w-full flex-nowrap items-center gap-2 overflow-hidden rounded-[1.15rem] border px-3 py-2 md:gap-3"
          animate={{
            maxWidth: condensed ? '72rem' : '78rem',
            backgroundColor: condensed ? 'var(--lh-surface)' : 'transparent',
            borderColor: condensed ? 'var(--lh-line)' : 'transparent',
            backdropFilter: condensed ? 'blur(18px)' : 'blur(0px)',
            boxShadow: condensed ? 'var(--lh-shadow-card)' : 'none',
          }}
          transition={reduced ? { duration: 0.15 } : { duration: 0.5, ease: easeOutQuint }}
        >
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              go('#top');
            }}
            className="flex shrink-0 items-center gap-2"
            aria-label={`${site.brand.name}首页`}
          >
            <img src={site.brand.icon} width={30} height={30} alt="" className="lh-icon" />
            <span className="flex flex-col leading-none">
              <span className="text-[0.92rem] font-semibold">{site.brand.name}</span>
              <span className="mt-0.5 text-[0.55rem] tracking-[0.18em] text-ink-faint">
                {site.brand.latin}
              </span>
            </span>
          </a>

          <nav className="ml-2 hidden min-w-0 items-center gap-0.5 xl:flex" aria-label={ui.navAria}>
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
                className="relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
                aria-current={active === item.href ? 'true' : undefined}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-surface-2"
                    transition={springSnappy}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:gap-2">
            <a
              href={localizedGuideUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink xl:inline"
            >
              {ui.guide}
            </a>
            <a
              href={localizedContactUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink xl:inline"
            >
              {ui.contact}
            </a>
            <LanguageSwitch className="hidden xl:flex" />
            <ThemeToggle className="hidden xl:grid" />
            {/* 包一层来控制显隐：Button 自带 inline-flex，直接加 hidden 会互相覆盖 */}
            <span className="hidden xs:contents">
              <Button href={site.links.demoForm} size="md" external>
                {ui.bookDemo}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? ui.navClose : ui.navOpen}
            >
              <span className="relative flex h-3 w-4 flex-col justify-between">
                <motion.i
                  className="block h-[1.5px] w-full rounded bg-ink"
                  animate={open ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
                  transition={springSnappy}
                />
                <motion.i
                  className="block h-[1.5px] w-full rounded bg-ink"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.i
                  className="block h-[1.5px] w-full rounded bg-ink"
                  animate={open ? { rotate: -45, y: -5.25 } : { rotate: 0, y: 0 }}
                  transition={springSnappy}
                />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/96 px-5 pb-8 pt-24 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-1" aria-label={ui.navMobileAria}>
              {site.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.href);
                  }}
                  className="border-b border-line py-4 text-xl font-medium"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.4, ease: easeOutQuint }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <LanguageSwitch className="mt-6" />
            <ThemeToggle expanded className="mt-5" />
            <Button href={localizedGuideUrl()} variant="ghost" size="lg" className="mt-4 w-full" external>
              {ui.readGuide}
            </Button>
            <Button href={localizedContactUrl()} variant="outline" size="lg" className="mt-3 w-full" external>
              {ui.contact}
            </Button>
            <Button href={site.links.demoForm} size="lg" className="mt-3 w-full" external>
              {ui.bookDemoLong}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
