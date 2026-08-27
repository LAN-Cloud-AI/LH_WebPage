import type { ReactNode } from 'react';

import { Reveal } from './Reveal';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** 区块上下留白档位 */
  spacing?: 'sm' | 'md' | 'lg';
  'aria-labelledby'?: string;
};

const SPACING = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-36',
};

export function Section({
  id,
  children,
  className = '',
  spacing = 'md',
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={`relative ${SPACING[spacing]} ${className}`} {...rest}>
      {children}
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: 'left' | 'center' | 'split';
  className?: string;
};

/** 统一的区块标题。split 在宽屏下把 lede 推到右侧。 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = 'left',
  className = '',
}: HeadingProps) {
  const isSplit = align === 'split';
  const isCenter = align === 'center';

  return (
    <div
      className={[
        isSplit ? 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16' : '',
        isCenter ? 'mx-auto max-w-3xl text-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal>
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="text-3xl leading-[1.15] font-semibold sm:text-4xl md:text-[2.75rem]"
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.1}>
          <p
            className={`text-[0.98rem] leading-relaxed text-ink-muted ${
              isSplit ? '' : isCenter ? 'mx-auto mt-5 max-w-2xl' : 'mt-5 max-w-2xl'
            }`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
