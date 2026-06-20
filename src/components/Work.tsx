import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ProjectModal } from './ProjectModal';
import { ProjectCover } from './ProjectCover';
import { projects, githubProfile, type Project } from '../data/profile';
import { useLang } from '../lib/i18n';
import { useIsTouch } from '../lib/hooks';
import { useReducedMotion } from '../lib/useReducedMotion';

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const tilt = !isTouch && !reduced;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const glareX = useTransform(sry, [-8, 8], ['0%', '100%']);

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * 14);
    rx.set(-ny * 14);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="grow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.07 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl text-left transition-colors duration-300 hover:border-amber-400/60 will-transform"
      aria-label={`Open ${project.title} details`}
    >
      {/* cover — branded promo art */}
      <div className="relative h-40 w-full overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        <ProjectCover id={project.id} index={index} />
        <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[0.72rem] text-white backdrop-blur-sm ring-1 ring-white/15">
          {project.category}
        </span>
        {project.metric && (
          <span className="absolute bottom-4 left-4 font-display text-2xl font-semibold text-white [text-shadow:0_2px_12px_rgba(8,12,40,0.55)]">
            {project.metric}
          </span>
        )}
        <span className="absolute right-4 top-4 font-mono text-xs text-white/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        {tilt && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18), transparent 60%)',
              backgroundSize: '200% 100%',
              backgroundPositionX: glareX as unknown as MotionValue<string>,
            }}
          />
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-mist-100">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-haze-300">{project.blurb}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full border border-glass-line px-2 py-0.5 font-mono text-[0.72rem] text-haze-300">
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-full px-2 py-0.5 font-mono text-[0.72rem] text-amber-500">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500">
          View details <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.button>
  );
}

export function Work() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-[var(--section-pad)]">
      <div className="container-x">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" kicker={t.selectedWork} title="Selected work." />
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-haze-300 transition-colors hover:text-mist-100"
          >
            {t.viewAllGithub} <span aria-hidden>→</span>
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
