import { motion } from 'framer-motion';
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
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-mist-100"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
