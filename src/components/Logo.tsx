import { motion } from 'framer-motion';

/** Animated "E" monogram mark — replaces the photo avatar. Theme-aware accent. */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <motion.span
      whileHover={{ rotate: -6, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
      className="relative inline-flex items-center justify-center rounded-xl bg-accent-gradient shadow-glow"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 3.5 H18 V7.5 H10.2 V10 H16.5 V14 H10.2 V16.5 H18 V20.5 H6 Z"
          fill="#fff"
        />
      </svg>
      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-jade-400 ring-2 ring-ink-800" />
    </motion.span>
  );
}
