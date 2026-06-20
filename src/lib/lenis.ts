import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Scroll to an element id (or y) — uses Lenis when active, else native. */
export function scrollToSection(id: string, offset = 0) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/** Mount Lenis smooth scroll and bind it to GSAP's ticker + ScrollTrigger. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('lenis');
      return;
    }
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisInstance = lenis;
    document.documentElement.classList.add('lenis');
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
      document.documentElement.classList.remove('lenis');
    };
  }, [enabled]);
}
