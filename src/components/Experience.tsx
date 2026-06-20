import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { experience, type ExperienceItem } from '../data/profile';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';

function Role({ item }: { item: ExperienceItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 sm:pl-16"
    >
      {/* node */}
      <span className="absolute left-[11px] top-1.5 sm:left-[19px]">
        <span className="block h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-ink-900 shadow-glow" />
      </span>

      <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-amber-400/50 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-xs text-amber-400">{item.period}</span>
          <span className="text-glass-line">·</span>
          <span className="font-mono text-xs text-haze-300">{item.location}</span>
          {item.current && (
            <span className="rounded-full bg-jade-400/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-jade-400">
              Current
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-semibold text-mist-100 sm:text-2xl">{item.role}</h3>
        <div className="text-sm font-medium" style={{ color: 'var(--cyan-400)' }}>
          {item.org}
        </div>
        <p className="mt-2 text-sm text-haze-300">{item.summary}</p>

        <ul className="mt-4 flex flex-col gap-2">
          {item.highlights.map((h, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-haze-300">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-glass-line px-2.5 py-1 font-mono text-[0.7rem] text-haze-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // GSAP-driven glowing spine (kept consistent with the hero's ScrollTrigger).
  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;
    if (reduced) {
      fill.style.transform = 'scaleY(1)';
      return;
    }
    gsap.set(fill, { scaleY: 0, transformOrigin: 'top center' });
    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top 65%',
      end: 'bottom 75%',
      scrub: true,
      onUpdate: (self) => {
        fill.style.transform = `scaleY(${self.progress})`;
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <section id="experience" className="relative py-[var(--section-pad)]">
      <div className="container-x relative">
        <SectionHeading index="02" kicker="Experience" title="Where I've shipped." className="mb-14" />

        <div ref={trackRef} className="relative">
          {/* spine track */}
          <div className="absolute bottom-2 left-[17px] top-2 w-px bg-glass-line sm:left-[25px]" />
          {/* spine fill */}
          <div
            ref={fillRef}
            className="absolute left-[17px] top-2 w-px origin-top sm:left-[25px]"
            style={{
              height: 'calc(100% - 16px)',
              transformOrigin: 'top center',
              transform: 'scaleY(0)',
              background: 'linear-gradient(180deg, var(--amber-500), var(--ember-600))',
              boxShadow: '0 0 16px rgba(59,130,246,0.6)',
            }}
          />

          <div className="flex flex-col gap-8">
            {experience.map((item) => (
              <Role key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
