import { motion, useReducedMotion } from 'motion/react';

import { problem } from '../content/site';
import { inViewOnce, springSoft } from '../lib/motion';
import { Orb } from '../components/primitives/Backdrop';
import { Section, SectionHeading } from '../components/primitives/Section';

export function Problem() {
  return (
    <Section spacing="lg" className="overflow-hidden">
      <Orb className="-top-24 left-1/4 size-[30rem]" tone="brand" animated={false} />

      <div className="shell relative">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          lede={problem.lede}
          align="split"
        />

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          <Column data={problem.before} from={-40} />
          <Column data={problem.after} from={40} />
        </div>
      </div>
    </Section>
  );
}

type ColumnData = {
  label: string;
  tone: 'muted' | 'brand';
  items: string[];
};

function Column({ data, from }: { data: ColumnData; from: number }) {
  const reduced = useReducedMotion();
  const isBrand = data.tone === 'brand';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-panel border p-6 md:p-8 ${
        isBrand
          ? 'border-brand/25 bg-linear-to-b from-brand-soft to-surface'
          : 'border-line bg-surface'
      }`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: from, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={inViewOnce}
      transition={reduced ? { duration: 0.2 } : { duration: 0.8, ...springSoft }}
    >
      <div className="flex items-center gap-2">
        <span
          className={`size-1.5 rounded-full ${isBrand ? 'bg-brand' : 'bg-intent-weak'}`}
          aria-hidden="true"
        />
        <h3
          className={`text-[0.82rem] font-semibold tracking-[0.12em] uppercase ${
            isBrand ? 'text-brand' : 'text-ink-faint'
          }`}
        >
          {data.label}
        </h3>
      </div>

      <ul className="mt-6 space-y-4">
        {data.items.map((item, index) => (
          <motion.li
            key={item}
            className="flex gap-3"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ delay: 0.15 + index * 0.09, duration: 0.55 }}
          >
            <span className="mt-0.5 shrink-0" aria-hidden="true">
              {isBrand ? <CheckMark /> : <CrossMark />}
            </span>
            <span
              className={`text-[0.9rem] leading-relaxed ${
                isBrand ? 'text-ink' : 'text-ink-muted'
              }`}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-brand" aria-hidden="true">
      <circle cx="8" cy="8" r="7.2" fill="currentColor" opacity="0.16" />
      <path
        d="m5 8.2 2.1 2.1L11 6.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-ink-faint" aria-hidden="true">
      <circle cx="8" cy="8" r="7.2" fill="currentColor" opacity="0.14" />
      <path
        d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
