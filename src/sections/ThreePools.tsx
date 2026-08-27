import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';

import { poolsSection } from '../content/site';
import { easeOutQuint, springSoft } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { Reveal } from '../components/primitives/Reveal';
import { Section, SectionHeading } from '../components/primitives/Section';

const TONE: Record<'neutral' | 'brand' | 'accent', string> = {
  neutral: 'var(--lh-intent-weak)',
  brand: 'var(--lh-brand)',
  accent: 'var(--lh-accent)',
};

export function ThreePools() {
  const [active, setActive] = useState(0);

  return (
    <Section id="pools" spacing="lg" className="overflow-hidden">
      <GridBackdrop className="opacity-40" />
      <Orb className="top-1/4 -right-48 size-[36rem]" tone="accent" animated={false} />

      <div className="shell relative">
        <SectionHeading
          eyebrow={poolsSection.eyebrow}
          title={poolsSection.title}
          lede={poolsSection.lede}
          align="split"
        />

        {/* 流动示意 */}
        <Reveal preset="card" className="mt-14 md:mt-16">
          <PoolFlow active={active} />
        </Reveal>

        {/* 三池说明 */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {poolsSection.pools.map((pool, index) => (
            <Reveal
              key={pool.id}
              preset="card"
              delay={index * 0.08}
              className="h-full"
            >
              <div
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                tabIndex={0}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-5 transition-colors hover:border-line-strong md:p-6"
                style={
                  active === index
                    ? { borderColor: `color-mix(in oklab, ${TONE[pool.tone]} 40%, transparent)` }
                    : undefined
                }
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500"
                  style={{
                    backgroundColor: TONE[pool.tone],
                    transform: `scaleX(${active === index ? 1 : 0.15})`,
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold" style={{ color: TONE[pool.tone] }}>
                    {pool.name}
                  </h3>
                  <span className="font-mono text-[0.62rem] text-ink-faint">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-1 text-[0.78rem] text-ink-muted">{pool.caption}</p>
                <p className="mt-3.5 text-[0.85rem] leading-relaxed text-ink-muted">{pool.body}</p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {pool.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.68rem] text-ink-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const PARTICLES = 9;

/**
 * 三个池子 + 之间流动的线索粒子。
 * 粒子用 CSS/motion 的 keyframes 在三段之间循环，不逐帧计算位置。
 */
function PoolFlow({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-panel border border-line bg-surface p-6 md:p-10"
    >
      <div className="relative grid grid-cols-3 items-center gap-2 sm:gap-6">
        {poolsSection.pools.map((pool, index) => (
          <div key={pool.id} className="relative">
            {/* 池体 */}
            <motion.div
              className="relative grid h-24 place-items-center rounded-xl border sm:h-28"
              animate={{
                borderColor:
                  active === index
                    ? `color-mix(in oklab, ${TONE[pool.tone]} 55%, transparent)`
                    : 'var(--lh-line)',
                backgroundColor:
                  active === index
                    ? `color-mix(in oklab, ${TONE[pool.tone]} 9%, transparent)`
                    : 'var(--lh-surface-2)',
              }}
              transition={{ duration: 0.4, ease: easeOutQuint }}
            >
              {/* 池内堆积的线索格子 */}
              <div className="flex flex-wrap justify-center gap-1 px-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.span
                    key={i}
                    className="block size-2 rounded-[3px] sm:size-2.5"
                    style={{ backgroundColor: TONE[pool.tone] }}
                    animate={
                      reduced || !inView
                        ? { opacity: 0.5 }
                        : { opacity: [0.25, 0.85, 0.25] }
                    }
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: i * 0.16 + index * 0.5,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              <span
                className="absolute -bottom-px inset-x-4 h-px"
                style={{ backgroundColor: `color-mix(in oklab, ${TONE[pool.tone]} 45%, transparent)` }}
                aria-hidden="true"
              />
            </motion.div>

            <p
              className="mt-3 text-center text-[0.72rem] font-medium sm:text-[0.8rem]"
              style={{ color: active === index ? TONE[pool.tone] : 'var(--lh-ink-muted)' }}
            >
              {pool.name}
            </p>

            {/* 段间通道与粒子 */}
            {index < poolsSection.pools.length - 1 && (
              <div
                className="absolute top-12 left-full h-px w-2 sm:top-14 sm:w-6"
                aria-hidden="true"
              >
                <span className="absolute inset-0 bg-line" />
                {!reduced &&
                  inView &&
                  Array.from({ length: 3 }, (_, i) => (
                    <motion.span
                      className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full"
                      key={i}
                      style={{ backgroundColor: TONE[poolsSection.pools[index + 1].tone] }}
                      animate={{ left: ['-10%', '110%'], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        delay: i * 0.55 + index * 0.3,
                        ease: 'linear',
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部：从池子流向销售端的粒子束 */}
      <div className="relative mt-8 h-16">
        <svg
          viewBox="0 0 600 64"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <path id="pool-out-a" d="M100 0 C 100 34, 300 30, 300 64" />
            <path id="pool-out-b" d="M300 0 L300 64" />
            <path id="pool-out-c" d="M500 0 C 500 34, 300 30, 300 64" />
          </defs>
          {['pool-out-a', 'pool-out-b', 'pool-out-c'].map((id, index) => (
            <use
              key={id}
              href={`#${id}`}
              fill="none"
              stroke="var(--lh-line-strong)"
              strokeWidth="1"
              strokeDasharray={index === 1 ? undefined : '3 4'}
            />
          ))}

          {!reduced &&
            inView &&
            Array.from({ length: PARTICLES }, (_, i) => {
              const paths = ['pool-out-a', 'pool-out-b', 'pool-out-c'];
              const path = paths[i % 3];
              return (
                <circle key={i} r="2.5" fill="var(--lh-brand)">
                  <animateMotion
                    dur={`${2.2 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`-${i * 0.32}s`}
                  >
                    <mpath href={`#${path}`} />
                  </animateMotion>
                </circle>
              );
            })}
        </svg>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          initial={false}
        >
          <span className="flex items-center gap-2 rounded-full border border-brand/35 bg-brand-soft px-3.5 py-1.5 text-[0.72rem] font-medium text-brand backdrop-blur-sm">
            <span className="relative flex size-1.5">
              {!reduced && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand" />
              )}
              <span className="relative size-1.5 rounded-full bg-brand" />
            </span>
            销售端 App · 站内通知 · 授权短链
          </span>
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-center text-[0.72rem] text-ink-faint"
        animate={{ opacity: 1 }}
        transition={springSoft}
      >
        每层流转都写入记录，可回溯一条线索是何时、由谁、按哪条规则分到销售手上的。
      </motion.p>
    </div>
  );
}
