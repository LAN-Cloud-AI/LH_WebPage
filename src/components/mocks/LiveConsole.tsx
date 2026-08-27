import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { leadSamples, type LeadSample } from '../../content/site';
import { easeOutQuint, springSoft } from '../../lib/motion';
import { BrowserMock } from './Frames';
import { IntentBadge, PlatformTag } from './IntentBadge';

const TABS = ['线索总库', '归属池', '组织指派池', '账号分发池'];
const VISIBLE = 5;
const ROW_H = 56;
const ARRIVAL_MS = 2200;
const SCORING_MS = 750;

type Row = LeadSample & { key: number; scored: boolean };

function makeRow(index: number): Row {
  const sample = leadSamples[index % leadSamples.length];
  return { ...sample, key: index, scored: false };
}

/**
 * 自演示的控制台：评论行持续流入，落地后延迟一拍才亮出意向徽章，
 * 视觉上还原「先入库、再评分」的过程。仅在进入视口时运行。
 * 行绝对定位在定高容器里，靠 top 排布，避免进出时整块高度抖动。
 */
export function LiveConsole({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduced = useReducedMotion();

  const [rows, setRows] = useState<Row[]>(() =>
    Array.from({ length: VISIBLE }, (_, i) => ({ ...makeRow(VISIBLE - 1 - i), scored: true })),
  );
  const [added, setAdded] = useState(0);
  const cursor = useRef(VISIBLE);

  useEffect(() => {
    if (reduced || !inView) return;

    const timers = new Set<number>();
    const interval = window.setInterval(() => {
      const row = makeRow(cursor.current++);
      setRows((current) => [row, ...current].slice(0, VISIBLE));
      setAdded((count) => count + 1);

      const scoreTimer = window.setTimeout(() => {
        setRows((current) =>
          current.map((item) => (item.key === row.key ? { ...item, scored: true } : item)),
        );
        timers.delete(scoreTimer);
      }, SCORING_MS);
      timers.add(scoreTimer);
    }, ARRIVAL_MS);

    return () => {
      window.clearInterval(interval);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [inView, reduced]);

  return (
    <div ref={ref} className={className}>
      <BrowserMock title="线索猎手 · 线索中心" badge="实时">
        {/* 三池标签页 */}
        <div className="flex gap-1 overflow-x-auto border-b border-line px-3 pt-2.5">
          {TABS.map((tab, index) => (
            <span
              key={tab}
              className={`shrink-0 border-b-2 px-2.5 pb-2 text-[0.7rem] sm:text-xs ${
                index === 0
                  ? 'border-brand font-medium text-brand'
                  : 'border-transparent text-ink-faint'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* 统计条：口径与销售端 App 一致 */}
        <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
          <Stat label="全部" value={509 + added} />
          <Stat label="高意向" value={233} tone="high" />
          <Stat label="中意向" value={276} tone="mid" />
        </div>

        {/* 线索流 */}
        <ul
          className="relative overflow-hidden"
          style={{ height: VISIBLE * ROW_H }}
          aria-label="线索流示例"
        >
          <AnimatePresence initial={false}>
            {rows.map((row, index) => (
              <motion.li
                key={row.key}
                className="absolute inset-x-0 flex items-center gap-2.5 border-b border-line px-3 sm:gap-3 sm:px-4"
                style={{ height: ROW_H }}
                initial={
                  reduced
                    ? { opacity: 0, top: index * ROW_H }
                    : { opacity: 0, top: -ROW_H, filter: 'blur(6px)' }
                }
                animate={{ opacity: 1, top: index * ROW_H, filter: 'blur(0px)' }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
                transition={reduced ? { duration: 0.15 } : springSoft}
              >
                <PlatformTag platform={row.platform} />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.78rem] text-ink sm:text-[0.85rem]">
                    {row.text}
                  </span>
                  <span className="mt-0.5 block text-[0.65rem] text-ink-faint">
                    {row.city} · 评论
                  </span>
                </span>

                <span className="grid w-[4.6rem] shrink-0 justify-items-end">
                  <AnimatePresence mode="wait" initial={false}>
                    {row.scored ? (
                      <motion.span
                        key="badge"
                        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={reduced ? { duration: 0.15 } : springSoft}
                      >
                        <IntentBadge level={row.level} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="scoring"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center gap-1 text-[0.65rem] text-ink-faint"
                      >
                        <ScoringDots />
                        评分中
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </BrowserMock>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: number;
  tone?: 'default' | 'high' | 'mid';
}) {
  const color =
    tone === 'high' ? 'text-intent-high' : tone === 'mid' ? 'text-intent-mid' : 'text-ink';
  return (
    <div className="bg-surface px-3 py-2.5 sm:px-4">
      <p className="text-[0.62rem] text-ink-faint sm:text-[0.68rem]">{label}</p>
      <p className={`mt-0.5 text-base font-semibold sm:text-lg ${color}`}>{value}</p>
    </div>
  );
}

function ScoringDots() {
  const reduced = useReducedMotion();
  return (
    <span className="flex gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <motion.i
          key={index}
          className="block size-[3px] rounded-full bg-brand"
          animate={reduced ? undefined : { opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.15, ease: easeOutQuint }}
        />
      ))}
    </span>
  );
}
