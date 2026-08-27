import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from './languages'

const KEY = 'asfc.language'
const CHANGED_EVENT = 'asfc:language-changed'

export function currentLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(KEY)
    return LANGUAGES.some((language) => language.code === stored)
      ? (stored as LanguageCode)
      : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function setLanguage(code: LanguageCode): void {
  try {
    localStorage.setItem(KEY, code)
  } catch {
    // Preference simply will not persist.
  }
  // localStorage raises no event in the tab that wrote it, so anything
  // already on screen needs telling explicitly (same pattern as country and
  // welcome preferences elsewhere in this app).
  window.dispatchEvent(new Event(CHANGED_EVENT))
}

export function subscribeToLanguage(listener: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, listener)
  return () => window.removeEventListener(CHANGED_EVENT, listener)
}
