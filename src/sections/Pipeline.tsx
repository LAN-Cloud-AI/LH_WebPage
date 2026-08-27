import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';

import {
  analysisDimensions,
  analysisOutput,
  pipelineSample,
  pipelineSteps,
} from '../content/site';
import { easeOutQuint, springSoft } from '../lib/motion';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { SectionHeading } from '../components/primitives/Section';
import { IntentBadge, PlatformTag } from '../components/mocks/IntentBadge';
import { PhoneMock } from '../components/mocks/Frames';

const STEPS = pipelineSteps.length;

/**
 * 全站核心：滚动把一条真实评论从公开内容一路带到销售手机。
 * 外层容器高度 = 步数 × 100vh，内层 sticky 铺满一屏，
 * 滚动进度离散成当前步索引，左侧文字与右侧画布同步切换。
 */
export function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(STEPS - 1, Math.max(0, Math.floor(latest * STEPS)));
    setStep(next);
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // reduced-motion：退化为纵向分步图，不做 sticky 劫持
  if (reduced) {
    return (
      <section id="pipeline" className="relative py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="工作方式"
            title="一条线索，如何抵达销售手机"
            lede="从公开互动中提取成交信号，每一步都可解释、可追溯。"
            align="split"
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {pipelineSteps.map((item) => (
              <li key={item.id} className="rounded-card border border-line bg-surface p-6">
                <p className="font-mono text-xs text-brand">{item.index}</p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                <p className="mt-4 text-xs text-ink-faint">{item.meta}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="pipeline" className="relative">
      {/* 标题 */}
      <div className="shell relative pt-20 md:pt-28">
        <SectionHeading
          eyebrow="工作方式"
          title="一条线索，如何抵达销售手机"
          lede="下面跟着一条真实评论走完全程。从公开内容里出现的一句提问，到落进某位销售的待办，每一步都可解释、可追溯。"
          align="split"
        />
      </div>

      {/* 滚动驱动区 */}
      <div ref={containerRef} className="relative" style={{ height: `${STEPS * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <GridBackdrop className="opacity-50" fade={false} />
          <Orb
            className="top-1/2 -right-40 size-[34rem] -translate-y-1/2"
            tone="accent"
            animated={false}
          />

          <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* 左：步骤文字 */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-brand">
                  {String(step + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <span className="font-mono text-xs text-ink-faint">
                  / {String(STEPS).padStart(2, '0')}
                </span>
              </div>

              <div className="relative mt-6 min-h-[15rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pipelineSteps[step].id}
                    initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                    transition={{ duration: 0.45, ease: easeOutQuint }}
                  >
                    <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                      {pipelineSteps[step].meta}
                    </p>
                    <h3 className="mt-4 text-2xl leading-snug font-semibold md:text-[1.9rem]">
                      {pipelineSteps[step].title}
                    </h3>
                    <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted">
                      {pipelineSteps[step].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 步骤指示条 */}
              <div className="mt-8 flex gap-1.5" role="presentation">
                {pipelineSteps.map((item, index) => (
                  <span
                    key={item.id}
                    className="h-0.5 flex-1 overflow-hidden rounded-full bg-line"
                  >
                    <motion.span
                      className="block h-full rounded-full bg-brand"
                      initial={false}
                      animate={{ scaleX: index <= step ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={springSoft}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* 右：画布 */}
            <div className="relative h-[24rem] sm:h-[26rem] lg:h-[30rem]">
              <Stage step={step} />
            </div>
          </div>

          {/* 底部总进度 */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-brand to-accent"
            style={{ scaleX: progressScale }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

/** 右侧画布：六个关键帧共用同一张卡片，靠 layoutId 在阶段间平滑过渡 */
function Stage({ step }: { step: number }) {
  return (
    <div className="relative grid h-full place-items-center">
      {/* 01 + 02：公开评论卡片 */}
      <AnimatePresence>
        {step <= 1 && (
          <motion.div
            key="source"
            className="absolute w-full max-w-md"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
          >
            <CommentCard captured={step === 1} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 03：四维拆解 */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="analyze"
            className="absolute w-full max-w-md"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: easeOutQuint }}
          >
            <AnalysisCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 04 + 05：评分输出与时间校准 */}
      <AnimatePresence>
        {(step === 3 || step === 4) && (
          <motion.div
            key="score"
            className="absolute w-full max-w-md"
            initial={{ opacity: 0, y: 26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: easeOutQuint }}
          >
            <ScoreCard showDecay={step === 4} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 06：三池 → 手机 */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            key="deliver"
            className="absolute flex w-full max-w-md flex-col items-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
          >
            <DeliverCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CommentCard({ captured }: { captured: boolean }) {
  return (
    <div className="relative rounded-card border border-line bg-surface p-5 shadow-card">
      {/* 采集时的扫描线 */}
      <AnimatePresence>
        {captured && (
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="absolute inset-x-0 h-16 animate-scan bg-linear-to-b from-transparent via-brand/25 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <PlatformTag platform={pipelineSample.platform} />
        <span className="text-[0.7rem] text-ink-faint">
          {pipelineSample.city} · {pipelineSample.age}
        </span>
        <motion.span
          className="ml-auto text-[0.68rem] font-medium"
          animate={{ color: captured ? 'var(--lh-brand)' : 'var(--lh-ink-faint)' }}
        >
          {captured ? '已入库' : '公开可见'}
        </motion.span>
      </div>

      <p className="mt-3 text-[0.72rem] text-ink-faint">帖子 · {pipelineSample.post}</p>
      <p className="mt-2 text-xl leading-snug font-medium">「{pipelineSample.comment}」</p>

      <AnimatePresence>
        {captured && (
          <motion.div
            className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easeOutQuint }}
          >
            {[
              ['命中主题', '报废补贴'],
              ['命中组', '王朝网关键词组'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[0.62rem] text-ink-faint">{label}</p>
                <p className="mt-0.5 text-[0.78rem] font-medium">{value}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TONE_COLOR = {
  brand: 'var(--lh-brand)',
  high: 'var(--lh-intent-high)',
};

function AnalysisCard() {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
        <p className="text-[0.78rem] font-medium">语义拆解 · 判断顺序固定</p>
      </div>

      <motion.ul
        className="mt-4 space-y-2"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } } }}
      >
        {analysisDimensions.map((dimension) => (
          <motion.li
            key={dimension.key}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2.5"
            variants={{
              hidden: { opacity: 0, x: -14 },
              show: { opacity: 1, x: 0, transition: springSoft },
            }}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.6rem] text-ink-faint">{dimension.key}</span>
              <span className="block text-[0.78rem] text-ink-muted">{dimension.label}</span>
            </span>
            <span
              className="shrink-0 rounded-md px-2 py-1 text-[0.72rem] font-medium"
              style={{
                color: TONE_COLOR[dimension.tone],
                backgroundColor: `color-mix(in oklab, ${TONE_COLOR[dimension.tone]} 14%, transparent)`,
              }}
            >
              {dimension.value}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <p className="mt-4 text-[0.7rem] leading-relaxed text-ink-faint">
        角色先于语义：卖家回复与同行广告在第一维就被排除，不做关键词硬匹配。
      </p>
    </div>
  );
}

function ScoreCard({ showDecay }: { showDecay: boolean }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.78rem] font-medium">模型输出</p>
        <motion.div layout transition={springSoft}>
          <IntentBadge level={analysisOutput.level} size="md" />
        </motion.div>
      </div>

      <div className="mt-4 space-y-3">
        <Field label="线索摘要" value={analysisOutput.summary} />
        <Field label="下一步建议" value={analysisOutput.nextAction} accent />
      </div>

      <AnimatePresence>
        {showDecay && (
          <motion.div
            className="mt-4 overflow-hidden border-t border-line"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easeOutQuint }}
          >
            <p className="pt-4 text-[0.62rem] text-ink-faint">时间衰减校准 · 评论年龄 2 小时</p>
            <div className="mt-2.5 space-y-1.5">
              {[
                { range: '0–3 天', level: '高意向', active: true },
                { range: '3–7 天', level: '中意向', active: false },
                { range: '7 天以上', level: '无意向', active: false },
              ].map((rule) => (
                <div
                  key={rule.range}
                  className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-[0.72rem] transition-colors ${
                    rule.active
                      ? 'bg-brand-soft text-ink'
                      : 'bg-surface-2 text-ink-faint'
                  }`}
                >
                  <span className="font-mono">{rule.range}</span>
                  <span className="flex items-center gap-2">
                    {rule.level}
                    {rule.active && (
                      <span className="rounded bg-brand px-1.5 py-0.5 text-[0.6rem] text-white">
                        当前
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${
        accent ? 'border-brand/25 bg-brand-soft' : 'border-line bg-surface-2'
      }`}
    >
      <p className="text-[0.62rem] text-ink-faint">{label}</p>
      <p className="mt-1 text-[0.82rem] leading-relaxed">{value}</p>
    </div>
  );
}

const DELIVER_POOLS = [
  { name: '归属池', tone: 'var(--lh-intent-weak)' },
  { name: '组织指派池', tone: 'var(--lh-brand)' },
  { name: '账号分发池', tone: 'var(--lh-accent)' },
];

function DeliverCard() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* 三池串行 */}
      <motion.div
        className="flex w-full items-center justify-between gap-1.5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } } }}
      >
        {DELIVER_POOLS.map((pool, index) => (
          <motion.div
            key={pool.name}
            className="flex flex-1 items-center gap-1.5"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: springSoft },
            }}
          >
            <span
              className="flex-1 rounded-lg border px-2 py-2 text-center text-[0.68rem] font-medium whitespace-nowrap sm:text-[0.72rem]"
              style={{
                color: pool.tone,
                borderColor: `color-mix(in oklab, ${pool.tone} 32%, transparent)`,
                backgroundColor: `color-mix(in oklab, ${pool.tone} 10%, transparent)`,
              }}
            >
              {pool.name}
            </span>
            {index < DELIVER_POOLS.length - 1 && (
              <svg viewBox="0 0 12 8" className="size-2.5 shrink-0 fill-ink-faint" aria-hidden="true">
                <path d="M0 3h7V0l5 4-5 4V5H0Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* 手机通知 */}
      <motion.div
        className="w-[8rem] sm:w-[9.5rem]"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easeOutQuint }}
      >
        <PhoneMock lockRatio>
          <div className="flex h-full flex-col bg-bg-elev px-2 pt-6 pb-2.5 sm:px-2.5 sm:pt-7">
            <p className="text-center text-[0.6rem] text-ink-faint">10:00</p>

            <motion.div
              className="mt-3 rounded-xl border border-line bg-surface p-2.5"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.85, ease: easeOutQuint }}
            >
              <div className="flex items-center gap-1">
                <img
                  src="/assets/icon/app-256.png"
                  width={14}
                  height={14}
                  alt=""
                  className="lh-icon shrink-0"
                />
                <span className="text-[0.58rem] font-medium whitespace-nowrap">线索猎手</span>
                <span className="ml-auto hidden text-[0.55rem] whitespace-nowrap text-ink-faint sm:inline">
                  现在
                </span>
              </div>
              <p className="mt-1.5 text-[0.6rem] leading-snug font-medium">你有 1 条新线索</p>
              <p className="mt-0.5 text-[0.56rem] leading-snug text-ink-muted">
                {pipelineSample.comment}
              </p>
              <div className="mt-1.5">
                <IntentBadge level="高意向" />
              </div>
            </motion.div>

            <div className="mt-auto flex justify-around border-t border-line pt-2">
              {['首页', '线索', '通知'].map((tab, index) => (
                <span
                  key={tab}
                  className={`text-[0.55rem] ${index === 2 ? 'text-brand' : 'text-ink-faint'}`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
        </PhoneMock>
      </motion.div>
    </div>
  );
}
