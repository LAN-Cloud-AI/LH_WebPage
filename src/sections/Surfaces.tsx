import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

import { site, surfaces } from '../content/site';
import { easeOutQuint, springSoft } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { ArrowRight, Button } from '../components/primitives/Button';
import { Reveal, RevealGroup, RevealItem } from '../components/primitives/Reveal';
import { Section, SectionHeading } from '../components/primitives/Section';
import { BrowserMock, PhoneMock } from '../components/mocks/Frames';

export function Surfaces() {
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
          title={`控制台 · ${shot.title}`}
          badge={surfaces.console.label}
          className="mx-auto max-w-5xl"
        >
          <div className="relative aspect-1024/640 overflow-hidden bg-bg-elev">
            <AnimatePresence mode="wait">
              <motion.img
                key={shot.src}
                src={shot.src}
                width={2000}
                height={1250}
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
 * 销售端：三个核心界面各配一条能力说明，图放大到可读。
 * 宽屏三列等分，窄屏收成一列（文字在上、截图在下），不做横向滚动。
 */
function AppShowcase() {
  return (
    <div className="mt-24 md:mt-32">
      {/* 文案：与全站 split 标题同构（左标题右正文、底对齐），CTA 单独起一行，
          避免按钮把右栏撑高、把正文顶到标题上方。 */}
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

      {/* 三个界面 + 能力说明。三列在 md 以上才展开，避免中间宽度下文字被挤成窄条。 */}
      <RevealGroup
        className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-7"
        gap={0.1}
      >
        {surfaces.app.shots.map((shot) => (
          <RevealItem key={shot.src}>
            <AppFeature shot={shot} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

type Shot = {
  src: string;
  alt: string;
  index: string;
  caption: string;
  desc: string;
};

function AppFeature({ shot }: { shot: Shot }) {
  const reduced = useReducedMotion();

  return (
    <figure className="group flex flex-col">
      {/* 说明在上，让三列的截图顶边对齐 */}
      <figcaption className="border-t border-line pt-4">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[0.68rem] text-brand">{shot.index}</span>
          <h4 className="text-[1rem] font-semibold">{shot.caption}</h4>
        </div>
        {/* 预留三行高度，保证三列的截图顶边始终对齐 */}
        <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-muted md:min-h-[4.6rem]">
          {shot.desc}
        </p>
      </figcaption>

      <motion.div
        className="mx-auto mt-7 w-[12rem] xs:w-[13rem] md:w-full md:max-w-[15rem]"
        whileHover={reduced ? undefined : { y: -8 }}
        transition={springSoft}
      >
        <PhoneMock>
          <img
            src={shot.src}
            width={443}
            height={960}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </PhoneMock>
      </motion.div>
    </figure>
  );
}
