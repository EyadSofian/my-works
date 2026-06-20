import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;
const NAME = 'EYAD SOFIAN';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    let p = 0;
    const bump = (to: number) => {
      if (!mounted) return;
      p = Math.max(p, to);
      setProgress(p);
    };

    const fontsReady: Promise<unknown> =
      'fonts' in document ? (document as Document & { fonts: FontFaceSet }).fonts.ready : Promise.resolve();

    const trickle = window.setInterval(() => {
      p = Math.min(p + 4, 90);
      setProgress(p);
    }, 110);

    const start = performance.now();
    Promise.resolve(fontsReady).then(() => {
      window.clearInterval(trickle);
      bump(100);
      const wait = Math.max(0, 650 - (performance.now() - start));
      window.setTimeout(() => {
        if (!mounted) return;
        setDone(true);
        onComplete();
      }, wait);
    });

    return () => {
      mounted = false;
      window.clearInterval(trickle);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ink-900"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="mb-8 overflow-hidden px-6">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="font-display text-3xl font-semibold tracking-[0.25em] text-mist-100 sm:text-5xl"
            >
              {NAME}
            </motion.h1>
          </div>

          <div className="relative h-[3px] w-[min(64vw,420px)] overflow-hidden rounded-full bg-ink-700">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: 'var(--accent-gradient)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-4 font-mono text-xs text-haze-300">
            {String(Math.round(progress)).padStart(3, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
