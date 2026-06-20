import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { training, type TrainedModel } from '../data/profile';

const EASE = [0.16, 1, 0.3, 1] as const;

function ModelCard({ model, index }: { model: TrainedModel; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      className="group glass relative rounded-2xl p-6 transition-colors duration-300 hover:border-amber-400/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-amber-500">
            Base model
          </div>
          <h3 className="mt-1 font-display text-2xl font-semibold text-mist-100">{model.base}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-glass-line px-2.5 py-1 font-mono text-xs text-mist-100">
          {model.params}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-gradient px-2.5 py-1 text-xs font-semibold text-white">
          {model.technique}
        </span>
        <span className="text-sm font-medium text-amber-500">{model.focus}</span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-haze-300">{model.detail}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-glass-line px-2 py-0.5 font-mono text-[0.72rem] text-haze-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function ModelTraining() {
  return (
    <section id="training" className="relative overflow-hidden py-[var(--section-pad)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[55vh] w-[55vh] rounded-full opacity-25 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 65%)' }}
      />

      <div className="container-x relative">
        <SectionHeading
          index="04"
          kicker="Model Training"
          title={training.heading}
          className="mb-7"
        />
        <p className="mb-9 max-w-2xl text-base leading-relaxed text-haze-300">{training.blurb}</p>

        {/* training pipeline */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {training.pipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                className="glass rounded-full px-4 py-2 text-sm font-medium text-mist-100"
              >
                {step}
              </motion.span>
              {i < training.pipeline.length - 1 && (
                <span aria-hidden className="font-mono text-amber-500">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* model cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {training.models.map((m, i) => (
            <ModelCard key={m.id} model={m} index={i} />
          ))}
        </div>

        {/* stack + repo */}
        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.2em] text-haze-300">
              Trained with
            </span>
            {training.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-glass-line px-2.5 py-1 font-mono text-[0.72rem] text-haze-300"
              >
                {s}
              </span>
            ))}
          </div>
          <a
            href={training.repo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            className="link-underline inline-flex shrink-0 items-center gap-2 text-sm font-medium text-amber-500 transition-colors hover:text-mist-100"
          >
            Explore the training repo <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
