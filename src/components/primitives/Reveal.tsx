import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

import { inViewOnce, reducedVariants, riseBlur, riseCard, stagger } from '../../lib/motion';

type Preset = 'blur' | 'card' | 'none';

const PRESETS: Record<Exclude<Preset, 'none'>, Variants> = {
  blur: riseBlur,
  card: riseCard,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** blur = 标题/文案，card = 卡片 */
  preset?: Preset;
  delay?: number;
  as?: ElementType;
};

/** 进入视口时播放一次的入场动画，reduced-motion 下退化为淡入 */
export function Reveal({
  children,
  className,
  preset = 'blur',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;
  const variants = reduced || preset === 'none' ? reducedVariants : PRESETS[preset];

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: ElementType;
};

/** 父容器：让内部的 RevealItem 依次入场 */
export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = 'div',
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;

  return (
    <Component
      className={className}
      variants={reduced ? reducedVariants : stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  as?: ElementType;
};

/** RevealGroup 的子项，不自带 viewport 观察，由父级排队驱动 */
export function RevealItem({ children, className, preset = 'card', as = 'div' }: RevealItemProps) {
  const reduced = useReducedMotion();
  const Component = motion[as as 'div'] ?? motion.div;
  const variants = reduced || preset === 'none' ? reducedVariants : PRESETS[preset];

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
