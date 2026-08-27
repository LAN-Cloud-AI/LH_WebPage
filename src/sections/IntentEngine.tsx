import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useId, useMemo, useState } from 'react';

import { intentSection } from '../content/site';
import {
  applyDecay,
  axisProgressToDays,
  decayAxisMarks,
  daysToAxisProgress,
  DECAY_HORIZON_DAYS,
  INTENT_META,
  type IntentLevel,
} from '../lib/intentDecay';
import { easeOutQuint, springSoft } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { Reveal, RevealGroup, RevealItem } from '../components/primitives/Reveal';
import { Section, SectionHeading } from '../components/primitives/Section';
import { IntentBadge } from '../components/mocks/IntentBadge';

const SLIDER_STEPS = 1000;
const SEMANTIC_OPTIONS: IntentLevel[] = ['高意向', '中意向', '弱意向'];

export function IntentEngine() {
  return (
    <Section id="intent" spacing="lg" className="overflow-hidden">
      <GridBackdrop className="opacity-40" variant="dot" />
      <Orb className="-top-32 -left-40 size-[32rem]" tone="brand" animated={false} />

      <div className="shell relative">
        <SectionHeading
          eyebrow={intentSection.eyebrow}
          title={intentSection.title}
          lede={intentSection.lede}
          align="split"
        />

        {/* 五档 */}
        <RevealGroup className="mt-14 grid gap-3 md:mt-16 md:grid-cols-5" gap={0.07}>
          {intentSection.levels.map((item) => {
            const meta = INTENT_META[item.level];
            return (
              <RevealItem
                key={item.level}
                className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />
                <IntentBadge level={item.level} size="md" className="self-start" />
                <p className="mt-3.5 text-[0.82rem] leading-snug text-ink">「{item.sample}」</p>
                <p className="mt-auto pt-3 text-[0.72rem] leading-relaxed text-ink-faint">
                  {item.note}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* 时间衰减交互 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <Reveal preset="card" className="h-full">
            <DecayPlayground />
          </Reveal>

          <Reveal preset="card" delay={0.08} className="h-full">
            <DecayTable />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** 拖动天数，看同一条语义意向如何被时间衰减重算 */
function DecayPlayground() {
  const reduced = useReducedMotion();
  const sliderId = useId();
  const [semantic, setSemantic] = useState<IntentLevel>('高意向');
  const [days, setDays] = useState(1);

  const final = useMemo(() => applyDecay(semantic, days), [semantic, days]);
  const marks = useMemo(() => decayAxisMarks(semantic), [semantic]);
  const progress = daysToAxisProgress(days, marks);
  const degraded = final !== semantic;
  const bandSegments = useMemo(
    () =>
      marks.slice(0, -1).map((start, index) => {
        const end = marks[index + 1];
        return {
          start,
          end,
          level: applyDecay(semantic, end),
        };
      }),
    [marks, semantic],
  );

  return (
    <div className="flex h-full flex-col rounded-panel border border-line bg-surface p-5 shadow-card md:p-7">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">时间衰减</p>
      <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
        {intentSection.decayIntro}
      </p>

      {/* 语义意向选择 */}
      <div className="mt-5 flex flex-wrap gap-1.5" role="group" aria-label="选择语义意向">
        {SEMANTIC_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSemantic(option)}
            aria-pressed={semantic === option}
            className={`relative rounded-lg px-3 py-1.5 text-[0.78rem] transition-colors ${
              semantic === option ? 'text-ink' : 'text-ink-faint hover:text-ink-muted'
            }`}
          >
            {semantic === option && (
              <motion.span
                layoutId="semantic-pill"
                className="absolute inset-0 rounded-lg border border-line-strong bg-surface-2"
                transition={springSoft}
              />
            )}
            <span className="relative">模型判定 {option}</span>
          </button>
        ))}
      </div>

      {/* 结果 */}
      <div className="mt-6 flex items-center gap-3 rounded-card border border-line bg-surface-2 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.66rem] text-ink-faint">评论年龄</p>
          <p className="mt-0.5 text-2xl font-semibold">
            {days}
            <span className="ml-1 text-sm font-normal text-ink-muted">天</span>
          </p>
        </div>

        <svg
          viewBox="0 0 12 8"
          className="size-3 shrink-0 fill-ink-faint"
          aria-hidden="true"
        >
          <path d="M0 3h7V0l5 4-5 4V5H0Z" />
        </svg>

        <div className="min-w-0 flex-1 text-right">
          <p className="text-[0.66rem] text-ink-faint">落库意向</p>
          <div className="mt-1.5 flex justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={final}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.9 }}
                transition={reduced ? { duration: 0.12 } : springSoft}
              >
                <IntentBadge level={final} size="md" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 滑块 */}
      <div className="mt-6">
        <label htmlFor={sliderId} className="sr-only">
          评论年龄（天）
        </label>
        <div className="relative">
          {/* 刻度与滑块拇指同坐标：左右各留半个拇指宽 */}
          <div className="pointer-events-none absolute inset-x-2 -top-2 h-2" aria-hidden="true">
            {marks.map((day, index) => (
              <span
                key={day}
                className="absolute top-0 h-2 w-px bg-line-strong"
                style={{
                  left: `${(index / (marks.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            ))}
          </div>

          <input
            id={sliderId}
            type="range"
            min={0}
            max={SLIDER_STEPS}
            step={1}
            value={Math.round(progress * SLIDER_STEPS)}
            onChange={(event) =>
              setDays(axisProgressToDays(Number(event.target.value) / SLIDER_STEPS, marks))
            }
            className="lh-range w-full"
            aria-valuemin={0}
            aria-valuemax={DECAY_HORIZON_DAYS}
            aria-valuenow={days}
            aria-valuetext={`${days} 天，落库意向 ${final}`}
            style={
              {
                '--range-fill': `${progress * 100}%`,
                '--range-color': INTENT_META[final].color,
              } as React.CSSProperties
            }
          />

          <div className="relative mt-2 h-4 px-2">
            {marks.map((day, index) => {
              const isFirst = index === 0;
              const isLast = index === marks.length - 1;
              return (
                <span
                  key={day}
                  className="absolute top-0 font-mono text-[0.62rem] whitespace-nowrap text-ink-faint"
                  style={{
                    left: `${(index / (marks.length - 1)) * 100}%`,
                    transform: isFirst
                      ? 'none'
                      : isLast
                        ? 'translateX(-100%)'
                        : 'translateX(-50%)',
                  }}
                >
                  {day === 0 ? '刚发布' : `${day} 天`}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-5 text-[0.75rem] leading-relaxed text-ink-faint">
        {degraded ? (
          <>
            这条线索已从
            <span className="text-ink-muted">{semantic}</span>
            衰减为
            <span style={{ color: INTENT_META[final].color }}>{final}</span>
            {final === '无意向' ? '，不再进入销售待办。' : '，优先级相应下调。'}
          </>
        ) : (
          <>需求窗口仍然新鲜，维持{semantic}，正常进入分发流程。</>
        )}
      </p>

      {/* 衰减带：按断点等分，与上方时间轴同一套比例 */}
      <div className="mt-auto pt-6">
        <p className="text-[0.66rem] text-ink-faint">30 天衰减带</p>
        <div className="relative mt-2 h-9 overflow-hidden rounded-lg border border-line">
          <div className="flex h-full">
            {bandSegments.map((segment) => (
              <span
                key={`${segment.start}-${segment.end}`}
                className="h-full flex-1 transition-colors duration-300"
                style={{ backgroundColor: INTENT_META[segment.level].soft }}
              />
            ))}
          </div>
          <motion.span
            className="absolute inset-y-0 w-0.5 -translate-x-1/2"
            style={{ backgroundColor: INTENT_META[final].color }}
            animate={{ left: `${progress * 100}%` }}
            transition={reduced ? { duration: 0.1 } : springSoft}
            aria-hidden="true"
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.6rem] text-ink-faint">
          <span>越靠左需求越新鲜</span>
          <span>越靠右越接近失效</span>
        </div>
      </div>
    </div>
  );
}

const TABLE_ROWS: { semantic: IntentLevel; ranges: { label: string; day: number }[] }[] = [
  {
    semantic: '高意向',
    ranges: [
      { label: '0–3 天', day: 2 },
      { label: '3–7 天', day: 5 },
      { label: '7 天以上', day: 20 },
    ],
  },
  {
    semantic: '中意向',
    ranges: [
      { label: '0–3 天', day: 2 },
      { label: '3–14 天', day: 8 },
      { label: '14 天以上', day: 20 },
    ],
  },
  {
    semantic: '弱意向',
    ranges: [
      { label: '0–7 天', day: 5 },
      { label: '7 天以上', day: 20 },
    ],
  },
];

function DecayTable() {
  return (
    <div className="flex h-full flex-col rounded-panel border border-line bg-surface p-5 shadow-card md:p-7">
      <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">判断顺序</p>
      <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
        {intentSection.dimensionsIntro}
      </p>

      <RevealGroup className="mt-5 space-y-2" gap={0.06}>
        {[
          { step: '1', name: 'speaker_role', label: '说话人是谁' },
          { step: '2', name: 'utterance_type', label: '这句话在做什么' },
          { step: '3', name: 'buyer_actionability', label: '值不值得马上跟' },
          { step: '4', name: 'evidence_strength', label: '证据够不够硬' },
        ].map((item) => (
          <RevealItem
            key={item.name}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2.5"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-md bg-accent-soft font-mono text-[0.62rem] text-accent">
              {item.step}
            </span>
            <span className="font-mono text-[0.68rem] text-ink-faint">{item.name}</span>
            <span className="ml-auto text-[0.78rem] text-ink-muted">{item.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* 衰减规则总表 */}
      <div className="mt-6 border-t border-line pt-5">
        <p className="text-[0.72rem] text-ink-faint">完整衰减规则</p>
        <div className="mt-3 space-y-3">
          {TABLE_ROWS.map((row) => (
            <div key={row.semantic}>
              <div className="flex items-center gap-2">
                <IntentBadge level={row.semantic} />
                <span className="text-[0.68rem] text-ink-faint">模型判定</span>
              </div>
              <div className="mt-1.5 flex gap-1">
                {row.ranges.map((range) => {
                  const result = applyDecay(row.semantic, range.day);
                  return (
                    <div
                      key={range.label}
                      className="flex-1 rounded-md px-2 py-1.5 text-center"
                      style={{ backgroundColor: INTENT_META[result].soft }}
                    >
                      <p className="font-mono text-[0.58rem] text-ink-faint">{range.label}</p>
                      <p
                        className="mt-0.5 text-[0.68rem] font-medium"
                        style={{ color: INTENT_META[result].color }}
                      >
                        {result}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        className="mt-5 text-[0.72rem] leading-relaxed text-ink-faint"
        style={{ transitionTimingFunction: `cubic-bezier(${easeOutQuint.join(',')})` }}
      >
        无意向与待复核不参与衰减：前者已经排除，后者等待人工确认。
      </p>
    </div>
  );
}
