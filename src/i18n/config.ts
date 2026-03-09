export type Locale = 'sk' | 'cz' | 'de' | 'hu' | 'en';

export const defaultLocale: Locale = 'sk';

export const locales: Locale[] = ['sk', 'cz', 'de', 'hu', 'en'];

export const localeNames: Record<Locale, string> = {
  sk: 'Slovensky',
  cz: 'Česky',
  de: 'Deutsch',
  hu: 'Magyar',
  en: 'English',
};

export type Translations = typeof import('./translations/sk').default;
