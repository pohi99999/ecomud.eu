'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';
import sk from './translations/sk';

type TranslationType = typeof sk;

const translations: Record<Locale, TranslationType> = {
  sk,
  cz: sk, // Placeholder — will be replaced with actual Czech translations
  de: sk, // Placeholder
  hu: sk, // Placeholder
  en: sk, // Placeholder
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationType;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: sk,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  return useContext(I18nContext);
}
