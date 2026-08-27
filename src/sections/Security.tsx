import { security } from '../content/site';
import { Section, SectionHeading } from '../components/primitives/Section';
import { RevealGroup, RevealItem } from '../components/primitives/Reveal';

export function Security() {
  return (
    <Section spacing="lg">
      <div className="shell">
        <div className="rounded-panel border border-line bg-surface p-6 md:p-12">
          <SectionHeading
            eyebrow={security.eyebrow}
            title={security.title}
            lede={security.lede}
            align="split"
          />

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-4">
            {security.items.map((item, index) => (
              <RevealItem key={item.title} className="bg-surface p-5">
                <span className="font-mono text-[0.62rem] text-brand">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-[0.95rem] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-muted">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
