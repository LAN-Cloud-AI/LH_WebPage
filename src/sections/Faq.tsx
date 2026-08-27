import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

import { faq } from '../content/site';
import { easeOutQuint } from '../lib/motion';
import { Section, SectionHeading } from '../components/primitives/Section';
import { Reveal } from '../components/primitives/Reveal';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" spacing="lg">
      <div className="shell">
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          lede={faq.lede}
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} preset="card" delay={index * 0.05}>
              <Item
                question={item.q}
                answer={item.a}
                index={index}
                open={open === index}
                onToggle={() => setOpen(open === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

type ItemProps = {
  question: string;
  answer: string;
  index: number;
  open: boolean;
  onToggle: () => void;
};

function Item({ question, answer, index, open, onToggle }: ItemProps) {
  const reduced = useReducedMotion();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:text-brand"
        >
          <span className="flex-1 text-[1rem] font-medium md:text-[1.05rem]">{question}</span>

          <motion.span
            className="grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-surface-2"
            animate={{ rotate: open ? 45 : 0 }}
            transition={reduced ? { duration: 0.12 } : { duration: 0.35, ease: easeOutQuint }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 14 14"
              className="size-3 text-ink-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M7 2v10M2 7h10" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0.12 } : { duration: 0.42, ease: easeOutQuint }}
          >
            <p className="pr-10 pb-6 text-[0.9rem] leading-relaxed text-ink-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
