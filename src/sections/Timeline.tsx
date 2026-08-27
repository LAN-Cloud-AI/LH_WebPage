import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { timeline } from '../content/site';
import { inViewOnce, springSoft } from '../lib/motion';
import { Section, SectionHeading } from '../components/primitives/Section';
import { Reveal } from '../components/primitives/Reveal';

/** 一天的自动化节奏：横向时间轴，进度线随滚动推进 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  return (
    <Section spacing="lg" className="overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow={timeline.eyebrow}
          title={timeline.title}
          lede={timeline.lede}
          align="split"
        />

        <div ref={ref} className="relative mt-14 md:mt-20">
          {/* 轨道 */}
          <div
            className="absolute top-2 right-0 left-0 hidden h-px bg-line md:block"
            aria-hidden="true"
          >
            <motion.span
              className="block h-full origin-left bg-linear-to-r from-brand to-accent"
              style={{ scaleX: lineScale }}
            />
          </div>

          <ol className="grid gap-8 pl-5 md:grid-cols-4 md:gap-6 md:pl-0">
            {timeline.events.map((event, index) => (
              <motion.li
                key={event.time}
                className="relative md:pt-10"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ ...springSoft, delay: index * 0.1 }}
              >
                {/* 节点 */}
                <span
                  className="absolute top-0 left-0 hidden md:block"
                  aria-hidden="true"
                >
                  <span className="relative flex size-[1.05rem] items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-brand/20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={inViewOnce}
                      transition={{ ...springSoft, delay: index * 0.1 + 0.1 }}
                    />
                    <span className="relative size-1.5 rounded-full bg-brand" />
                  </span>
                </span>

                {/* 移动端竖线 */}
                <span
                  className="absolute top-1.5 -left-4 h-full w-px bg-line md:hidden"
                  aria-hidden="true"
                />
                <span
                  className="absolute top-1 -left-[1.15rem] size-1.5 rounded-full bg-brand md:hidden"
                  aria-hidden="true"
                />

                <p className="font-mono text-sm font-medium text-brand">{event.time}</p>
                <h3 className="mt-2.5 text-[1.02rem] font-semibold">{event.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-muted">{event.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-12 border-t border-line pt-6 text-[0.8rem] text-ink-faint">
            采集频率与推送时间由平台统一配置，经销商侧无需维护任何定时任务。
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
