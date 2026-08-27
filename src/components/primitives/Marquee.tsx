import { useReducedMotion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  /** 单圈时长（秒），越大越慢 */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  /** 项间距，同时用于修正无缝衔接的位移量 */
  gap?: string;
  /** 两端渐隐 */
  fade?: boolean;
};

const FADE_MASK = 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)';

/**
 * 无缝跑马灯。内容复制一份，位移 calc(-50% - gap/2) 正好等于一组的宽度加一个间距，
 * 因此循环点无跳帧。动画交给合成器，不占主线程。
 * reduced-motion 下降级为可横向滚动的静态列表。
 */
export function Marquee({
  children,
  duration = 42,
  reverse = false,
  pauseOnHover = true,
  className = '',
  gap = '1rem',
  fade = true,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const fadeStyle = fade ? { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK } : undefined;

  if (reduced) {
    return (
      <div className={`flex overflow-x-auto pb-2 ${className}`} style={{ gap }}>
        {children}
      </div>
    );
  }

  const trackStyle = {
    gap,
    '--marquee-gap': gap,
    animationName: reverse ? 'marquee-x-reverse' : 'marquee-x',
    animationDuration: `${duration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  } as CSSProperties;

  return (
    <div className={`group relative flex overflow-hidden ${className}`} style={fadeStyle}>
      <div
        className={`flex w-max shrink-0 ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={trackStyle}
      >
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
