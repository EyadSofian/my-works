import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { metrics, about, type Metric } from '../data/profile';
import { useCountUp } from '../lib/hooks';
import { useLang } from '../lib/i18n';

function formatValue(m: Metric, current: number): string {
  const n = m.decimals ? current.toFixed(m.decimals) : Math.round(current).toLocaleString('en-US');
  return `${m.prefix ?? ''}${n}${m.suffix ?? ''}`;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const value = useCountUp(metric.value, inView, 1700, metric.decimals);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="glass rounded-2xl p-5 sm:p-6"
    >
      <div className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
        {formatValue(metric, value)}
      </div>
      <div className="mt-2 text-sm font-medium text-mist-100">{metric.label}</div>
      {metric.hint && <div className="mt-1 text-xs text-haze-300">{metric.hint}</div>}
    </motion.div>
  );
}

export function About() {
  const { lang } = useLang();
  const body = lang === 'ar' ? about.bodyAr : about.body;

  return (
    <section id="about" className="relative overflow-hidden py-[var(--section-pad)]">
      {/* drifting amber gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-0 h-[60vh] w-[60vh] animate-float-slow rounded-full opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 65%)' }}
      />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* Left — bio */}
        <div className="flex flex-col gap-7">
          <SectionHeading index="01" kicker="About" title={about.heading} />
          <div className="flex flex-col gap-4 text-base leading-relaxed text-haze-300">
            {body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
                className={lang === 'ar' ? 'font-arabic text-right' : ''}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right — metric counters */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {metrics.map((m, i) => (
            <div key={m.label} className={i === 0 ? 'col-span-2' : ''}>
              <MetricCard metric={m} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
