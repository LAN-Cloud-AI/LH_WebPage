import { INTENT_META, type IntentLevel } from '../../lib/intentDecay';

type IntentBadgeProps = {
  level: IntentLevel;
  size?: 'sm' | 'md';
  className?: string;
};

/** 意向徽章，颜色与后端五档一一对应 */
export function IntentBadge({ level, size = 'sm', className = '' }: IntentBadgeProps) {
  const meta = INTENT_META[level];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-[0.7rem]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
      style={{ backgroundColor: meta.soft, color: meta.color }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}

type PlatformTagProps = {
  platform: '小红书' | '抖音';
  className?: string;
};

const PLATFORM_TONE = {
  小红书: { bg: 'rgb(255 36 66 / 0.14)', fg: '#ff566f' },
  抖音: { bg: 'rgb(37 244 238 / 0.12)', fg: '#3fd8e0' },
};

export function PlatformTag({ platform, className = '' }: PlatformTagProps) {
  const tone = PLATFORM_TONE[platform];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[0.68rem] font-medium ${className}`}
      style={{ backgroundColor: tone.bg, color: tone.fg }}
    >
      {platform}
    </span>
  );
}
