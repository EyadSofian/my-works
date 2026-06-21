import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  align = 'left',
  className,
}: SectionHeadingProps) {
  // useInView hook (same proven path as the metric counters) — reliable in-view reveal
  // that can never leave the heading clipped/hidden if the trigger is finicky.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div
      className={clsx(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3 eyebrow">
        <span className="text-amber-500">{index}</span>
        <span className="h-px w-8 bg-glass-line" style={{ background: 'var(--glass-line)' }} />
        <span className="text-haze-300">{kicker}</span>
      </div>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-mist-100"
      >
        {title}
      </motion.h2>
    </div>
  );
}
