import { guideSection, site } from '../content/site';
import { GridBackdrop, Orb } from '../components/primitives/Backdrop';
import { ArrowRight, Button } from '../components/primitives/Button';
import { Reveal } from '../components/primitives/Reveal';
import { Section, SectionHeading } from '../components/primitives/Section';
import { BrowserMock } from '../components/mocks/Frames';

export function Guide() {
  return (
    <Section id="guide" spacing="lg" className="overflow-hidden">
      <GridBackdrop className="opacity-30" />
      <Orb className="-right-40 top-1/4 size-[34rem]" tone="accent" animated={false} />

      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={guideSection.eyebrow}
            title={guideSection.title}
            lede={guideSection.lede}
          />
          <Reveal delay={0.12} className="flex shrink-0 flex-wrap gap-3">
            <Button href={site.links.guide} size="lg" external>
              {guideSection.primary}
              <ArrowRight />
            </Button>
          </Reveal>
        </div>

        <Reveal preset="card" delay={0.16} className="mt-10 md:mt-14">
          <BrowserMock title="leadshunter-guide.lancloudtech.com" badge="图文手册">
            <iframe
              src={site.links.guide}
              title={guideSection.iframeTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[70vh] min-h-[24rem] w-full border-0 bg-white"
            />
          </BrowserMock>
        </Reveal>
      </div>
    </Section>
  );
}
