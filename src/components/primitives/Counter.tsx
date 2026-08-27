import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { easeOutQuint } from '../../lib/motion';

type CounterProps = {
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
};

/** 进入视口时从 0 滚到目标值。reduced-motion 直接落到终值。 */
export function Counter({ to, duration = 1.5, decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: easeOutQuint,
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
    </span>
  );
}
