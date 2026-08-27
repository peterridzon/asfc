import { useEffect, useState } from 'react'
import { LANGUAGES, type LanguageCode } from './languages'
import { currentLanguage, subscribeToLanguage } from './store'
import { translations, type TranslationKey } from './translations'

export function useLanguage(): LanguageCode {
  const [lang, setLang] = useState(currentLanguage)
  useEffect(() => subscribeToLanguage(() => setLang(currentLanguage())), [])
  return lang
}

type Vars = Record<string, string | number>

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  )
}

/** `t('settings.language')`, or `t('outlook.forecastFor', { country: 'Austria' })`. */
export function useTranslation(): { t: (key: TranslationKey, vars?: Vars) => string; lang: LanguageCode } {
  const lang = useLanguage()
  return { t: (key, vars) => interpolate(translations[lang][key], vars), lang }
}

/** Keeps <html lang> in step with the chosen language, for accessibility and SEO. */
export function useSyncHtmlLang(): void {
  const lang = useLanguage()
  useEffect(() => {
    document.documentElement.lang = LANGUAGES.find((l) => l.code === lang)?.htmlLang ?? 'en'
  }, [lang])
}
