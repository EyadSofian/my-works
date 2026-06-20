import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type Project } from '../data/profile';
import { useLang } from '../lib/i18n';
import { getLenis } from '../lib/lenis';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-ink-900/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-amber-400/30 p-7 sm:rounded-3xl sm:p-9"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              data-cursor="grow"
              aria-label={t.close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-glass-line text-mist-100 transition hover:border-amber-400 hover:text-amber-400"
            >
              ✕
            </button>

            <div className="eyebrow text-amber-400">{project.category}</div>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-mist-100">
              {project.title}
            </h3>
            {project.metric && (
              <div className="mt-1 font-mono text-sm text-jade-400">{project.metric}</div>
            )}

            <p className="mt-5 text-[0.95rem] leading-relaxed text-haze-300">{project.description}</p>

            <div className="mt-6">
              <div className="eyebrow mb-3 text-haze-300">Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-glass-line px-3 py-1 font-mono text-xs text-mist-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="grow"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {link.label}
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
