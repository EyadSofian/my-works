import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { Logo } from './Logo';
import { MagneticButton } from './MagneticButton';
import { nav } from '../data/profile';
import { useLang } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import { scrollToSection } from '../lib/lenis';

const SECTION_IDS = ['work', 'experience', 'training', 'skills', 'contact'];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function Header() {
  const { lang, t, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.62);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-[150]"
        >
          <div className="container-x mt-3">
            <div className="glass flex items-center justify-between gap-4 rounded-full py-2.5 pl-3 pr-2.5">
              <button
                type="button"
                onClick={() => scrollToSection('top')}
                data-cursor="grow"
                className="flex items-center gap-3"
                aria-label="Back to top"
              >
                <Logo size={40} />
                <span className="font-display text-[0.98rem] font-semibold tracking-tight text-mist-100">
                  Eyad&nbsp;Sofian
                </span>
              </button>

              <nav className="hidden items-center gap-7 md:flex">
                {nav.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    data-active={active === item.id}
                    data-cursor="grow"
                    className={clsx(
                      'link-underline text-sm font-medium transition-colors',
                      active === item.id ? 'text-mist-100' : 'text-haze-300 hover:text-mist-100',
                    )}
                  >
                    {lang === 'ar' ? item.labelAr : item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  data-cursor="grow"
                  aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-haze-300 transition-colors hover:text-amber-400"
                >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>

                {/* Language toggle */}
                <button
                  type="button"
                  onClick={toggleLang}
                  data-cursor="grow"
                  aria-label="Toggle language"
                  className="glass flex h-9 items-center rounded-full px-1 text-xs font-semibold"
                >
                  <span className={clsx('rounded-full px-2.5 py-1 transition', lang === 'en' ? 'bg-accent-gradient text-white' : 'text-haze-300')}>EN</span>
                  <span className={clsx('rounded-full px-2.5 py-1 transition', lang === 'ar' ? 'bg-accent-gradient text-white' : 'text-haze-300')}>AR</span>
                </button>

                <MagneticButton variant="primary" className="!px-5 !py-2.5 text-sm" onClick={() => scrollToSection('contact')}>
                  {t.talk}
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
