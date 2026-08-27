import { motion, useReducedMotion } from 'motion/react';

import { cta, site } from '../content/site';
import { inViewOnce } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { ArrowRight, Button } from '../components/primitives/Button';
import { Reveal } from '../components/primitives/Reveal';

export function Cta() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <GridBackdrop className="opacity-40" fade={false} />
      <Orb className="-top-40 left-1/3 size-[38rem]" tone="brand" />
      <Orb className="-bottom-48 right-1/4 size-[32rem]" tone="accent" />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/50 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              {cta.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl leading-[1.16] font-semibold sm:text-4xl md:text-[3rem]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
              {cta.lede}
            </p>
          </Reveal>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Button href={site.links.demoForm} size="lg" external>
              {cta.primary}
              <ArrowRight />
            </Button>
            <Button href={site.links.wecom} variant="ghost" size="lg" external>
              {cta.secondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
