import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

import { rolesSection } from '../content/site';
import { easeOutQuint, springSoft } from '../lib/motion';
import { Orb } from '../components/primitives/Backdrop';
import { Section, SectionHeading } from '../components/primitives/Section';
import { Reveal } from '../components/primitives/Reveal';

const COUNT = rolesSection.roles.length;

export function Roles() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const role = rolesSection.roles[active];

  // tab 模式要求左右方向键切换
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + COUNT) % COUNT;
    setActive(next);
    document.getElementById(`role-tab-${rolesSection.roles[next].id}`)?.focus();
  };

  return (
    <Section id="roles" spacing="lg" className="overflow-hidden">
      <Orb className="-bottom-40 right-1/4 size-[32rem]" tone="accent" animated={false} />

      <div className="shell relative">
        <SectionHeading
          eyebrow={rolesSection.eyebrow}
          title={rolesSection.title}
          lede={rolesSection.lede}
          align="split"
        />

        <Reveal preset="card" className="mt-14 md:mt-16">
          <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-card">
            {/* Tab 头 */}
            <div
              className="flex gap-1 border-b border-line p-2"
              role="tablist"
              aria-label="角色切换"
              onKeyDown={onKeyDown}
            >
              {rolesSection.roles.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`role-tab-${item.id}`}
                  aria-selected={active === index}
                  aria-controls={`role-panel-${item.id}`}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  className="relative flex-1 rounded-xl px-2 py-3 text-center transition-colors sm:px-4"
                >
                  {active === index && (
                    <motion.span
                      layoutId="role-active"
                      className="absolute inset-0 rounded-xl bg-surface-2"
                      transition={springSoft}
                    />
                  )}
                  <span className="relative block">
                    <span
                      className={`block text-[0.85rem] font-medium transition-colors sm:text-[0.95rem] ${
                        active === index ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.6rem] text-ink-faint">
                      {item.latin}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* 面板 */}
            <div
              id={`role-panel-${role.id}`}
              role="tabpanel"
              aria-labelledby={`role-tab-${role.id}`}
              className="relative p-6 md:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={role.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: easeOutQuint }}
                  className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
                >
                  <div>
                    <p className="text-[0.95rem] leading-relaxed text-ink">{role.summary}</p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2">
                      <span className="text-[0.68rem] text-ink-faint">可见范围</span>
                      <span className="text-[0.8rem] font-medium text-brand">{role.scope}</span>
                    </div>
                  </div>

                  <motion.ul
                    className="space-y-3"
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                    }}
                  >
                    {role.abilities.map((ability) => (
                      <motion.li
                        key={ability}
                        className="flex gap-3"
                        variants={{
                          hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 14 },
                          show: { opacity: 1, x: 0, transition: springSoft },
                        }}
                      >
                        <span
                          className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        <span className="text-[0.88rem] leading-relaxed text-ink-muted">
                          {ability}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
