import type Lenis from 'lenis';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

import { site } from '../../content/site';
import { easeOutQuint, springSnappy } from '../../lib/motion';
import { scrollToAnchor } from '../../lib/useLenis';
import { Button } from '../primitives/Button';
import { ThemeToggle } from './ThemeToggle';

type NavProps = { lenisRef: RefObject<Lenis | null> };

export function Nav({ lenisRef }: NavProps) {
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
          className="flex w-full items-center gap-2 rounded-2xl border px-3 py-2 md:gap-3"
          animate={{
            maxWidth: condensed ? '58rem' : '78rem',
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

          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="页面导航">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
                className="relative rounded-lg px-3 py-1.5 text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
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

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {/* 包一层来控制显隐：Button 自带 inline-flex，直接加 hidden 会互相覆盖 */}
            <span className="hidden xs:contents">
              <Button href={site.links.demoForm} size="md" external>
                预约演示
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
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
            className="fixed inset-0 z-40 bg-bg/96 px-5 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-1" aria-label="移动端导航">
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
            <Button href={site.links.demoForm} size="lg" className="mt-8 w-full" external>
              预约产品演示
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
