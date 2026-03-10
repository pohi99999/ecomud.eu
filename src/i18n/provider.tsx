'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';
import sk from './translations/sk';
import cz from './translations/cz';
import de from './translations/de';
import hu from './translations/hu';
import en from './translations/en';

type TranslationType = {
  nav: { home: string; services: string; about: string; references: string; contact: string; cta: string };
  hero: { title: string; titleAccent: string; subtitle: string; ctaServices: string; ctaContact: string };
  intro: { text: string };
  services: {
    title: string;
    subtitle: string;
    more: string;
    introDetail: string;
    detailsLabel: string;
    targetLabel: string;
    futureLabel: string;
    bio: { title: string; short: string; slug: string; items: readonly string[]; target: string };
    dehydration: { title: string; short: string; slug: string; items: readonly string[]; target: string };
    automated: { title: string; short: string; slug: string; items: readonly string[]; target: string };
    smartlake: { title: string; short: string; slug: string; items: readonly string[]; target: string; future: string };
    survey: { title: string; short: string; slug: string; items: readonly string[]; target: string };
  };
  why: {
    title: string;
    experience: { title: string; text: string };
    biological: { title: string; text: string };
    fullservice: { title: string; text: string };
  };
  references: {
    title: string;
    subtitle: string;
    cta: string;
    resultLabel: string;
    items: readonly { title: string; location: string; type: string; description: string; result: string }[];
  };
  about: {
    title: string;
    intro: string;
    intro2: string;
    values: {
      title: string;
      natural: { title: string; text: string };
      innovation: { title: string; text: string };
      reliability: { title: string; text: string };
      fullcare: { title: string; text: string };
    };
    stats: {
      years: string; yearsLabel: string;
      team: string; teamLabel: string;
      areas: string; areasLabel: string;
      countries: string; countriesLabel: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string; email: string; phone: string; type: string;
      typeOptions: { bio: string; dehydration: string; automated: string; smartlake: string; survey: string; other: string };
      message: string; submit: string; success: string;
    };
    company: { name: string; address: string; city: string; ico: string };
  };
  footer: { rights: string; services: string };
  chat: {
    title: string;
    placeholder: string;
    greeting: string;
    send: string;
    suggestions: readonly string[];
    fallback: string;
    answers: Record<string, string>;
  };
};

const translations: Record<Locale, TranslationType> = {
  sk,
  cz,
  de,
  hu,
  en,
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
