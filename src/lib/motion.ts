import type { Transition, Variants } from 'motion/react';

/** 统一缓动：与 CSS 里的 --ease-out-quint 保持一致 */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const springSoft: Transition = { type: 'spring', stiffness: 180, damping: 24, mass: 0.9 };
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 };
export const springLayout: Transition = { type: 'spring', stiffness: 260, damping: 30 };

/** 进入视口时的默认观察配置：一次性播放，提前一点触发 */
export const inViewOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

/** 标题/段落：模糊上浮 */
export const riseBlur: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easeOutQuint },
  },
};

/** 卡片：轻微上浮 + 缩放 */
export const riseCard: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutQuint },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutQuint } },
};

/** 父容器：为子元素排队 */
export function stagger(children = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}

/** 降级后的静态变体，reduced-motion 时替换掉位移与模糊 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};
