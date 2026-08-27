import { leadSamples, type LeadSample } from '../content/site';
import { Br } from '../components/primitives/Br';
import { Marquee } from '../components/primitives/Marquee';
import { Reveal } from '../components/primitives/Reveal';
import { Section } from '../components/primitives/Section';
import { IntentBadge, PlatformTag } from '../components/mocks/IntentBadge';

const HALF = Math.ceil(leadSamples.length / 2);

/** 脱敏线索样本双向跑马灯，替代常见的客户证言墙 */
export function LeadSamples() {
  return (
    <Section spacing="md" className="overflow-hidden">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            线索长什么样
          </p>
          <h2 className="text-3xl leading-[1.15] font-semibold sm:text-4xl">
            不是一行数据，
            <Br />
            而是一句能接上话的提问
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
            以下均为脱敏后的公开评论示例。销售看到的是原话本身，加上分级、摘要与建议。
          </p>
        </Reveal>
      </div>

      <div className="mt-12 space-y-3 md:mt-14">
        <Marquee duration={52} gap="0.75rem">
          {leadSamples.slice(0, HALF).map((sample) => (
            <SampleCard key={sample.text} sample={sample} />
          ))}
        </Marquee>

        <Marquee duration={58} reverse gap="0.75rem">
          {leadSamples.slice(HALF).map((sample) => (
            <SampleCard key={sample.text} sample={sample} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

function SampleCard({ sample }: { sample: LeadSample }) {
  return (
    <article className="flex w-[17rem] shrink-0 flex-col rounded-card border border-line bg-surface p-4 transition-colors hover:border-line-strong">
      <div className="flex items-center gap-2">
        <PlatformTag platform={sample.platform} />
        <span className="text-[0.68rem] text-ink-faint">{sample.city}</span>
        <span className="ml-auto">
          <IntentBadge level={sample.level} />
        </span>
      </div>
      <p className="mt-3 text-[0.92rem] leading-snug">「{sample.text}」</p>
    </article>
  );
}
