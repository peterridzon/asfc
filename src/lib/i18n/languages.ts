export type LanguageCode = 'en' | 'de' | 'cs' | 'sk' | 'hu'

export interface LanguageOption {
  code: LanguageCode
  /** Which country's translation this is — null for the English default. */
  countrySlug: 'austria' | 'czechia' | 'slovakia' | 'hungary' | null
  /** For the <html lang> attribute. */
  htmlLang: string
}

/** Country options first — Austria, Czechia, Slovakia, Hungary — then Default. */
export const LANGUAGES: LanguageOption[] = [
  { code: 'de', countrySlug: 'austria', htmlLang: 'de' },
  { code: 'cs', countrySlug: 'czechia', htmlLang: 'cs' },
  { code: 'sk', countrySlug: 'slovakia', htmlLang: 'sk' },
  { code: 'hu', countrySlug: 'hungary', htmlLang: 'hu' },
  { code: 'en', countrySlug: null, htmlLang: 'en' },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'en'
