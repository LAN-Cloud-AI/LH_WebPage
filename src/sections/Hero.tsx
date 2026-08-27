import type Lenis from 'lenis';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type RefObject } from 'react';

import { hero, site } from '../content/site';
import { easeOutQuint, springSoft } from '../lib/motion';
import { scrollToAnchor } from '../lib/useLenis';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { ArrowRight, Button, Pill } from '../components/primitives/Button';
import { LiveConsole } from '../components/mocks/LiveConsole';
import { PhoneMock } from '../components/mocks/Frames';
import { IntentBadge } from '../components/mocks/IntentBadge';

type HeroProps = { lenisRef: RefObject<Lenis | null> };

export function Hero({ lenisRef }: HeroProps) {
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);

  // 产品视觉随滚动轻微后退，制造纵深
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5], reduced ? [1, 1] : [1, 0.96]);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <GridBackdrop className="opacity-70" />
      <Orb className="top-[-18rem] left-1/2 size-[46rem] -translate-x-1/2" tone="mixed" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/40 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative">
        {/* 文案区 */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutQuint }}
          >
            <Pill live>{hero.pill}</Pill>
          </motion.div>

          {/* clamp 让标题随视口连续缩放，避免窄屏把「发现可跟进的销售线索」断在词中间 */}
          <h1 className="mt-6 text-[clamp(1.6rem,7.6vw,3.9rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
            {hero.titleLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={
                  reduced ? { opacity: 0 } : { opacity: 0, y: 30, filter: 'blur(12px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.85,
                  delay: 0.1 + index * 0.14,
                  ease: easeOutQuint,
                }}
              >
                {index === hero.titleLines.length - 1 ? (
                  <span className="text-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted md:text-base"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: easeOutQuint }}
          >
            {hero.lede}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease: easeOutQuint }}
          >
            <Button href={site.links.demoForm} size="lg" external>
              {hero.primaryCta}
              <ArrowRight />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollToAnchor(lenisRef.current, '#pipeline')}
            >
              <PlayMark />
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* 产品视觉 */}
        <motion.div
          ref={visualRef}
          className="relative mt-14 md:mt-20"
          style={{ y: visualY, scale: visualScale }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 56, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.5, ease: easeOutQuint }}
        >
          <div className="relative mx-auto max-w-5xl">
            <LiveConsole />

            {/* 悬浮的销售端手机 */}
            <motion.div
              className="absolute -right-2 -bottom-10 hidden w-[8.5rem] md:block lg:-right-10 lg:w-[10rem]"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1, delay: 0.9, ease: easeOutQuint }}
            >
              <PhoneMock>
                <img
                  src="/assets/screenshots/ios-01.jpg"
                  width={443}
                  height={960}
                  alt="销售端 App 线索列表"
                  className="h-auto w-full"
                  fetchPriority="high"
                  decoding="async"
                />
              </PhoneMock>
            </motion.div>

            {/* 悬浮的新线索卡片：跨在控制台左下角，和右下角的手机呼应 */}
            <motion.article
              className="absolute -bottom-7 -left-5 z-10 hidden w-[14.5rem] rounded-xl border border-line bg-surface/95 p-3 shadow-float backdrop-blur-md lg:block lg:-left-12"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -30, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: easeOutQuint }}
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.65rem] text-ink-faint">新发现 · 河南</span>
                  <IntentBadge level="高意向" />
                </div>
                <p className="mt-2 text-[0.82rem] font-medium">优惠后还能用报废补贴吗？</p>
                <p className="mt-1.5 text-[0.65rem] text-ink-faint">
                  已进入归属池 · 等待确认组织
                </p>
              </motion.div>
            </motion.article>
          </div>
        </motion.div>

        {/* 能力概览 */}
        <motion.ul
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-5 md:mt-24 md:grid-cols-4"
          aria-label="产品能力概览"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
        >
          {hero.facts.map((fact) => (
            <motion.li
              key={fact.index}
              className="border-t border-line pt-3"
              variants={{
                hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: springSoft },
              }}
            >
              <span className="font-mono text-[0.65rem] text-brand">{fact.index}</span>
              <p className="mt-1 text-[0.82rem] font-medium text-ink-muted">{fact.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function PlayMark() {
  return (
    <span
      className="grid size-4 place-items-center rounded-full bg-brand-soft"
      aria-hidden="true"
    >
      <svg viewBox="0 0 10 10" className="size-2 fill-brand">
        <path d="M2 1.2 8.4 5 2 8.8Z" />
      </svg>
    </span>
  );
}
