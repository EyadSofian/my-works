import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { skills } from '../data/profile';
import { useReducedMotion } from '../lib/useReducedMotion';

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden py-[var(--section-pad)]">
      {/* soft accent orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.32), transparent 60%)' }}
      />
      <div className="container-x relative">
        <SectionHeading
          index="05"
          kicker="Skills"
          title="The stack I build with."
          align="center"
          className="mb-14 items-center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((lane, laneIdx) => (
            <motion.div
              key={lane.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: laneIdx * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-haze-300">
                  {lane.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {lane.items.map((item, i) => (
                  <span
                    key={item}
                    className="group cursor-default rounded-full border border-glass-line bg-ink-900/30 px-3 py-1.5 text-sm text-mist-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/70 hover:text-amber-400 hover:shadow-glow"
                    data-cursor="grow"
                    style={
                      reduced
                        ? undefined
                        : { animation: `float-slow ${5 + (i % 4)}s ease-in-out ${(i % 5) * 0.4}s infinite` }
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
