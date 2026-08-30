import type { TranslationKey } from './translations'

export type LanguageCode = 'en' | 'de' | 'cs' | 'sk' | 'hu'

export interface LanguageOption {
  code: LanguageCode
  /** What shows on its button in the language picker. */
  labelKey: TranslationKey
  /** For the <html lang> attribute. */
  htmlLang: string
}

/**
 * Country options first — Austria, Czechia, Slovakia, Hungary — then Default.
 * The Austria option is labelled by its language ("German"), not the country:
 * this picker is about which language you read the site in, whereas the
 * separate "Select your country" dialog (for the Storm Outlook shortcut) is
 * genuinely about the country, so it keeps using country names.
 */
export const LANGUAGES: LanguageOption[] = [
  { code: 'de', labelKey: 'language.german', htmlLang: 'de' },
  { code: 'cs', labelKey: 'country.czechia', htmlLang: 'cs' },
  { code: 'sk', labelKey: 'country.slovakia', htmlLang: 'sk' },
  { code: 'hu', labelKey: 'country.hungary', htmlLang: 'hu' },
  { code: 'en', labelKey: 'language.default', htmlLang: 'en' },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'en'
