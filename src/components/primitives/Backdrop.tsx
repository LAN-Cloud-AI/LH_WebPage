type GridBackdropProps = {
  className?: string;
  /** 网格向下淡出 */
  fade?: boolean;
  variant?: 'grid' | 'dot';
};

/** 装饰性网格/点阵底纹，绝对定位铺满父容器 */
export function GridBackdrop({ className = '', fade = true, variant = 'grid' }: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0',
        variant === 'grid' ? 'grid-backdrop' : 'dot-backdrop',
        fade ? 'mask-fade-b' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

type OrbProps = {
  className?: string;
  /** 主色调 */
  tone?: 'brand' | 'accent' | 'mixed';
  /** 呼吸动画 */
  animated?: boolean;
};

const TONES: Record<NonNullable<OrbProps['tone']>, string> = {
  brand: 'radial-gradient(circle at 50% 50%, var(--lh-glow-a), transparent 68%)',
  accent: 'radial-gradient(circle at 50% 50%, var(--lh-glow-b), transparent 68%)',
  mixed:
    'radial-gradient(circle at 32% 38%, var(--lh-glow-a), transparent 60%), radial-gradient(circle at 68% 64%, var(--lh-glow-b), transparent 62%)',
};

/** 极光光斑。纯装饰，用 blur + radial-gradient，不参与布局。 */
export function Orb({ className = '', tone = 'brand', animated = true }: OrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${animated ? 'animate-breathe' : ''} ${className}`}
      style={{ backgroundImage: TONES[tone] }}
    />
  );
}
