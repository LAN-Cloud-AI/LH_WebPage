import { motion, useReducedMotion } from 'motion/react';

import { capabilities, type Capability } from '../content/site';
import { Section, SectionHeading } from '../components/primitives/Section';
import { RevealGroup, RevealItem } from '../components/primitives/Reveal';

export function Capabilities() {
  return (
    <Section spacing="lg" className="overflow-hidden">
      <div className="shell relative">
        <SectionHeading
          eyebrow="核心能力"
          title="从采集到交付，一条链路上的六件事"
          lede="每个环节都可以单独配置和审计，不是一个只能整体接受的黑盒。"
          align="center"
        />

        <RevealGroup
          className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {capabilities.map((item) => (
            <RevealItem key={item.index} className="h-full">
              <Card item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

function Card({ item }: { item: Capability }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong"
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* hover 时的角落辉光 */}
      <span
        className="pointer-events-none absolute -top-16 -right-16 size-32 rounded-full bg-brand/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <CapabilityIcon icon={item.icon} />
        <span className="font-mono text-[0.62rem] text-ink-faint">{item.index}</span>
      </div>

      <h3 className="mt-5 text-[1.05rem] font-semibold">{item.title}</h3>
      <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-muted">{item.body}</p>
    </motion.article>
  );
}

/** 每个图标带一个独立的 hover 微动效 */
function CapabilityIcon({ icon }: { icon: Capability['icon'] }) {
  const reduced = useReducedMotion();
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" aria-hidden="true">
        {icon === 'radar' && (
          <>
            <circle cx="12" cy="12" r="9" {...stroke} opacity="0.35" />
            <circle cx="12" cy="12" r="5" {...stroke} opacity="0.6" />
            <motion.line
              x1="12"
              y1="12"
              x2="12"
              y2="3"
              {...stroke}
              style={{ originX: '12px', originY: '12px' }}
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <circle cx="16.5" cy="8" r="1.4" fill="currentColor" />
          </>
        )}

        {icon === 'brain' && (
          <>
            <path d="M12 4.5a3.2 3.2 0 0 0-3.2 3.2v.4A2.8 2.8 0 0 0 6 10.9v1.4a2.8 2.8 0 0 0 2.1 2.7v.6a3.2 3.2 0 0 0 3.9 3.1" {...stroke} />
            <path d="M12 4.5a3.2 3.2 0 0 1 3.2 3.2v.4A2.8 2.8 0 0 1 18 10.9v1.4a2.8 2.8 0 0 1-2.1 2.7v.6a3.2 3.2 0 0 1-3.9 3.1" {...stroke} />
            <motion.circle
              cx="12"
              cy="11.5"
              r="1.6"
              fill="currentColor"
              animate={reduced ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '12px', originY: '11.5px' }}
            />
          </>
        )}

        {icon === 'pools' && (
          <>
            {[5.5, 11.5, 17.5].map((y, index) => (
              <motion.rect
                key={y}
                x="3.5"
                y={y}
                width="17"
                height="4"
                rx="1.4"
                {...stroke}
                animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.35,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {icon === 'phone' && (
          <>
            <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" {...stroke} />
            <line x1="10.5" y1="5.4" x2="13.5" y2="5.4" {...stroke} />
            <motion.rect
              x="9.4"
              y="8.6"
              width="5.2"
              height="5.2"
              rx="1.2"
              fill="currentColor"
              animate={reduced ? undefined : { opacity: [0.3, 1, 0.3], y: [8.6, 7.8, 8.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {icon === 'shield' && (
          <>
            <path d="M12 3 19.5 5.6v5.2c0 5-3.2 8.3-7.5 10-4.3-1.7-7.5-5-7.5-10V5.6Z" {...stroke} />
            <motion.path
              d="m8.7 11.8 2.4 2.4 4.2-4.8"
              {...stroke}
              animate={reduced ? undefined : { pathLength: [0, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
            />
          </>
        )}

        {icon === 'link' && (
          <>
            <path d="M10 13.8a3.4 3.4 0 0 0 4.8 0l2.7-2.7a3.4 3.4 0 0 0-4.8-4.8l-1 1" {...stroke} />
            <path d="M14 10.2a3.4 3.4 0 0 0-4.8 0l-2.7 2.7a3.4 3.4 0 0 0 4.8 4.8l1-1" {...stroke} />
            <motion.circle
              cx="12"
              cy="12"
              r="1.1"
              fill="currentColor"
              animate={reduced ? undefined : { opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </svg>
    </span>
  );
}
