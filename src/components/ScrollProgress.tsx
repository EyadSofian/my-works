import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin top progress bar, amber → cyan gradient. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--amber-500), var(--cyan-400))',
      }}
    />
  );
}
