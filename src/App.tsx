import { useEffect, useState } from 'react';
import { LanguageProvider } from './lib/i18n';
import { ThemeProvider } from './lib/theme';
import { useLenis } from './lib/lenis';
import { useReducedMotion } from './lib/useReducedMotion';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Work } from './components/Work';
import { ModelTraining } from './components/ModelTraining';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';

export default function App() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useLenis(!reduced);

  // Safety net: never leave the page gated if the preloader is interrupted.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 4500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Preloader onComplete={() => setReady(true)} />
        <Cursor />
        <ScrollProgress />
        <Header />
        <main className="relative z-[1]">
          <Hero ready={ready} />
          <About />
          <Experience />
          <Work />
          <ModelTraining />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
