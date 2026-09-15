/**
 * 时间衰减规则，与后端本地确定性策略保持一致。
 * LLM 只输出语义意向（不看时间），衰减由确定性代码完成。
 * 键名用稳定英文；展示文案由内容包提供。
 */
export type IntentLevel = 'high' | 'mid' | 'weak' | 'none' | 'review';

export const INTENT_ORDER: IntentLevel[] = ['high', 'mid', 'weak', 'none', 'review'];

type DecayRule = { maxDays: number; level: IntentLevel };

const DECAY_TABLE: Record<'high' | 'mid' | 'weak', DecayRule[]> = {
  high: [
    { maxDays: 3, level: 'high' },
    { maxDays: 7, level: 'mid' },
    { maxDays: Infinity, level: 'none' },
  ],
  mid: [
    { maxDays: 3, level: 'mid' },
    { maxDays: 14, level: 'weak' },
    { maxDays: Infinity, level: 'none' },
  ],
  weak: [
    { maxDays: 7, level: 'weak' },
    { maxDays: Infinity, level: 'none' },
  ],
};

/** 给定语义意向与评论年龄（天），返回落库的最终意向 */
export function applyDecay(semantic: IntentLevel, ageInDays: number): IntentLevel {
  if (semantic === 'none' || semantic === 'review') return semantic;
  const rules = DECAY_TABLE[semantic];
  return rules.find((rule) => ageInDays <= rule.maxDays)?.level ?? 'none';
}

/** 该语义意向下所有的衰减断点，用于渲染刻度 */
export function decayBreakpoints(semantic: IntentLevel): number[] {
  if (semantic === 'none' || semantic === 'review') return [];
  return DECAY_TABLE[semantic].map((rule) => rule.maxDays).filter(Number.isFinite);
}

/** 时间轴右端：超过此天数一律按失效展示 */
export const DECAY_HORIZON_DAYS = 30;

/** 轴上的关键点：刚发布 + 各衰减断点 + 视界 */
export function decayAxisMarks(semantic: IntentLevel): number[] {
  return [0, ...decayBreakpoints(semantic), DECAY_HORIZON_DAYS];
}

/**
 * 天数 → 轴上进度 0–1。
 * 相邻断点之间等分视觉宽度，不按 30 天均分，
 * 这样 3 / 7 天不会挤在左侧。
 */
export function daysToAxisProgress(days: number, marks: number[]): number {
  if (marks.length < 2) return 0;
  const min = marks[0];
  const max = marks[marks.length - 1];
  const clamped = Math.min(Math.max(days, min), max);
  for (let i = 0; i < marks.length - 1; i += 1) {
    const start = marks[i];
    const end = marks[i + 1];
    if (clamped <= end) {
      const local = end === start ? 0 : (clamped - start) / (end - start);
      return (i + local) / (marks.length - 1);
    }
  }
  return 1;
}

/** 轴上进度 0–1 → 天数（四舍五入到整天） */
export function axisProgressToDays(progress: number, marks: number[]): number {
  if (marks.length < 2) return 0;
  const segments = marks.length - 1;
  const x = Math.min(Math.max(progress, 0), 1) * segments;
  const index = Math.min(Math.floor(x), segments - 1);
  const local = x - index;
  return Math.round(marks[index] + local * (marks[index + 1] - marks[index]));
}

export const INTENT_META: Record<IntentLevel, { color: string; soft: string }> = {
  high: {
    color: 'var(--lh-intent-high)',
    soft: 'color-mix(in oklab, var(--lh-intent-high) 16%, transparent)',
  },
  mid: {
    color: 'var(--lh-intent-mid)',
    soft: 'color-mix(in oklab, var(--lh-intent-mid) 16%, transparent)',
  },
  weak: {
    color: 'var(--lh-intent-weak)',
    soft: 'color-mix(in oklab, var(--lh-intent-weak) 16%, transparent)',
  },
  none: {
    color: 'var(--lh-intent-none)',
    soft: 'color-mix(in oklab, var(--lh-intent-none) 20%, transparent)',
  },
  review: {
    color: 'var(--lh-intent-review)',
    soft: 'color-mix(in oklab, var(--lh-intent-review) 16%, transparent)',
  },
};
