import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

import { useContent } from '../content/runtime';
import { easeOutQuint, springSoft } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { ArrowRight, Button } from '../components/primitives/Button';
import { Reveal } from '../components/primitives/Reveal';
import { Section, SectionHeading } from '../components/primitives/Section';
import { BrowserMock, PhoneMock } from '../components/mocks/Frames';

export function Surfaces() {
  const { surfaces } = useContent();
  return (
    <Section id="surfaces" spacing="lg" className="overflow-hidden">
      <GridBackdrop className="opacity-30" />
      <Orb className="top-1/3 -left-52 size-[36rem]" tone="brand" animated={false} />

      <div className="shell relative">
        <SectionHeading
          eyebrow={surfaces.eyebrow}
          title={surfaces.title}
          lede={surfaces.lede}
          align="center"
        />

        <ConsoleShowcase />
        <AppShowcase />
      </div>
    </Section>
  );
}

/** 控制台：随滚动做轻微 3D 抬升，下方三个截图可切换 */
function ConsoleShowcase() {
  const { surfaces } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const shot = surfaces.console.shots[index];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [11, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.92, 1]);

  return (
    <div ref={ref} className="mt-14 md:mt-16" style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, scale, transformOrigin: 'center bottom' }}>
        <BrowserMock
          title={`${surfaces.console.label} · ${shot.title}`}
          badge={surfaces.console.label}
          className="mx-auto max-w-5xl"
        >
          <div
            className="relative overflow-hidden bg-bg-elev"
            style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={shot.src}
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4, ease: easeOutQuint }}
              />
            </AnimatePresence>
          </div>
        </BrowserMock>
      </motion.div>

      {/* 截图切换：按钮组而非 tab 模式，无需漫游焦点 */}
      <div
        className="mx-auto mt-5 grid max-w-5xl gap-2.5 md:grid-cols-3"
        role="group"
        aria-label="控制台界面切换"
      >
        {surfaces.console.shots.map((item, i) => (
          <button
            key={item.src}
            type="button"
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            className="relative overflow-hidden rounded-card border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
          >
            {index === i && (
              <motion.span
                layoutId="console-shot-active"
                className="absolute inset-0 rounded-card border border-brand/40 bg-brand-soft"
                transition={springSoft}
              />
            )}
            <span className="relative block">
              <span className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full transition-colors ${
                    index === i ? 'bg-brand' : 'bg-ink-faint'
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[0.86rem] font-medium">{item.title}</span>
              </span>
              <span className="mt-1.5 block text-[0.76rem] leading-relaxed text-ink-muted">
                {item.caption}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 销售端：六张界面从内容左缘排开，铺到视口右缘，左右滑动。
 */
function AppShowcase() {
  const { site, surfaces } = useContent();
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const shots = surfaces.app.shots;

  const go = (next: number) => {
    const root = scrollerRef.current;
    const clamped = Math.max(0, Math.min(shots.length - 1, next));
    const slide = root?.querySelectorAll<HTMLElement>('[data-shot]')[clamped];
    if (!root || !slide) return;
    const max = root.scrollWidth - root.clientWidth;
    root.scrollTo({
      left: Math.min(Math.max(0, slide.offsetLeft - root.offsetLeft), max),
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  const onScroll = () => {
    const root = scrollerRef.current;
    if (!root) return;
    const origin = root.scrollLeft;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    root.querySelectorAll<HTMLElement>('[data-shot]').forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft - root.offsetLeft - origin);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  };

  return (
    <div className="mt-24 md:mt-32">
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            {surfaces.app.label}
          </p>
          <h3 className="mt-4 text-2xl leading-snug font-semibold md:text-[2rem]">
            {surfaces.app.title}
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[0.95rem] leading-relaxed text-ink-muted">{surfaces.app.body}</p>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Button href={site.links.appstore} variant="ghost" size="lg" external>
            {surfaces.app.cta}
            <ArrowRight />
          </Button>
          <span className="text-[0.75rem] text-ink-faint">{surfaces.app.note}</span>
        </div>
      </Reveal>

      <div className="mt-12 md:mt-16" role="region" aria-roledescription="carousel" aria-label={surfaces.app.carousel}>
        <div className="w-[calc(50%+50vw)] max-w-none">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              data-shot
              className="w-[min(12.75rem,62vw)] shrink-0 snap-start"
              aria-hidden={i === index ? undefined : true}
            >
              <PhoneMock>
                <img
                  src={shot.src}
                  width={1170}
                  height={2532}
                  alt={shot.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full"
                />
              </PhoneMock>
              <figcaption className="mt-4 text-center">
                <div className="flex items-baseline justify-center gap-2.5">
                  <span className="font-mono text-[0.68rem] text-brand">{shot.index}</span>
                  <h4 className="text-[1rem] font-semibold">{shot.caption}</h4>
                </div>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-muted">{shot.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label={surfaces.app.prev}
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className="grid size-9 place-items-center rounded-full border border-line text-ink disabled:opacity-30"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="flex items-center gap-1.5">
            {shots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                aria-label={shot.caption}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-brand' : 'w-1.5 bg-ink-faint/50'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={surfaces.app.next}
            disabled={index === shots.length - 1}
            onClick={() => go(index + 1)}
            className="grid size-9 place-items-center rounded-full border border-line text-ink disabled:opacity-30"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
