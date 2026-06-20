import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ui, type Lang, type UIStrings } from '../data/profile';

interface LangContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: UIStrings;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      t: ui[lang],
      setLang,
      toggle: () => setLang((l) => (l === 'en' ? 'ar' : 'en')),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>');
  return ctx;
}
