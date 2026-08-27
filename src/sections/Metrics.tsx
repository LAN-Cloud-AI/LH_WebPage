import { metrics } from '../content/site';
import { Counter } from '../components/primitives/Counter';
import { RevealGroup, RevealItem } from '../components/primitives/Reveal';

/** 产品能力口径的数字条，不使用运营统计数据 */
export function Metrics() {
  return (
    <section aria-label="产品能力概览" className="relative border-y border-line bg-bg-elev/60">
      <div className="shell">
        <RevealGroup
          className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5"
          gap={0.07}
        >
          {metrics.map((metric) => (
            <RevealItem
              key={metric.label}
              className="relative px-1 py-7 text-center md:py-9"
            >
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                <Counter to={metric.value} />
                <span className="text-lg font-normal text-ink-muted md:text-xl">
                  {metric.suffix}
                </span>
              </p>
              <p className="mt-2 text-[0.82rem] font-medium text-ink-muted">{metric.label}</p>
              <p className="mt-1 text-[0.68rem] text-ink-faint">{metric.hint}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
