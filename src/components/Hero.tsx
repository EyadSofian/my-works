import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from './MagneticButton';
import { hero, ticker, assets } from '../data/profile';
import { useLang } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import { usePointerRef, useIsMobile } from '../lib/hooks';
import { useReducedMotion } from '../lib/useReducedMotion';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToSection } from '../lib/lenis';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ ready = true }: { ready?: boolean }) {
  const { lang, t } = useLang();
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const pointer = usePointerRef();
  const progress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [tickI, setTickI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTickI((i) => (i + 1) % ticker.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  // Scroll-pin + portrait→avatar handoff progress.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const overlay = overlayRef.current;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=110%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        if (overlay) {
          overlay.style.opacity = String(Math.max(0, 1 - self.progress * 1.5));
          overlay.style.transform = `translateY(${-self.progress * 48}px)`;
        }
      },
    });
    return () => st.kill();
  }, [reduced]);

  // Pause the render loop when the hero scrolls off-screen.
  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const reveal = (delay: number) => {
    const initial = reduced ? { opacity: 0 } : { y: 28, opacity: 0 };
    const target = reduced ? { opacity: 1 } : { y: 0, opacity: 1 };
    return {
      initial,
      animate: ready ? target : initial,
      transition: reduced ? { duration: 0.4 } : { duration: 1, ease: EASE, delay },
    };
  };

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene
          reduced={reduced}
          isMobile={isMobile}
          dark={theme === 'dark'}
          active={active}
          pointer={pointer}
          progress={progress}
        />
      </div>

      {/* DOM overlay — frames the 3D portrait, no pointer events except CTAs */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between px-6 py-[clamp(5rem,12vh,9rem)]"
      >
        {/* Top: eyebrow + first name line */}
        <div className="flex w-full flex-col items-center gap-4">
          <motion.p {...reveal(0.1)} className="eyebrow text-center">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...reveal(0.18)}
            className="pointer-events-auto select-none text-center font-display font-bold leading-[0.9] tracking-tightest text-mist-100 transition-colors duration-500 hover:text-gradient"
            style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
          >
            {lang === 'ar' ? 'إياد' : 'EYAD'}
          </motion.h1>
        </div>

        {/* Bottom: second name line + subtitle + CTAs */}
        <div className="flex w-full max-w-3xl flex-col items-center gap-6">
          <motion.h1
            {...reveal(0.26)}
            aria-hidden
            className="pointer-events-auto select-none text-center font-display font-bold leading-[0.9] tracking-tightest text-mist-100 transition-colors duration-500 hover:text-gradient"
            style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
          >
            {lang === 'ar' ? 'سفيان' : 'SOFIAN'}
          </motion.h1>
          <motion.p
            {...reveal(0.34)}
            className={`max-w-xl text-center text-base text-haze-300 sm:text-lg ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? hero.subtitleAr : hero.subtitle}
          </motion.p>
          <motion.div {...reveal(0.42)} className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
            <MagneticButton variant="primary" onClick={() => scrollToSection('work')}>
              {hero.ctaPrimary}
              <span aria-hidden>↓</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href={assets.cv} download="Eyad-Sofian-CV.pdf">
              {hero.ctaSecondary}
              <span aria-hidden>↗</span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom-left: live ticker */}
      <div className="pointer-events-none absolute bottom-6 left-0 z-10 hidden w-full px-6 sm:block">
        <div className="flex items-center gap-3 font-mono text-xs text-haze-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-jade-400" />
          </span>
          <span className="text-jade-400">{hero.available}</span>
          <span className="text-glass-line">·</span>
          <span className="h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={tickI}
                initial={{ y: reduced ? 0 : 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: reduced ? 0 : -12, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="inline-block text-mist-100"
              >
                {ticker[tickI]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>

      {/* Bottom-right: scroll cue */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-haze-300">{t.scroll}</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-glass-line pt-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-amber-500"
            animate={reduced ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  );
}
