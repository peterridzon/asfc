import { LANGUAGES } from '../lib/i18n/languages'
import { setLanguage } from '../lib/i18n/store'
import { countryTranslationKey } from '../lib/i18n/translations'
import { useTranslation } from '../lib/i18n/useTranslation'
import { Modal } from './Modal'

const option =
  'flex min-h-20 items-center justify-center bg-[rgb(255,208,0)] px-4 font-mono text-base font-bold tracking-[0.1em] text-navy uppercase transition hover:bg-[rgb(232,189,0)] sm:text-lg'
const secondary =
  'border border-hairline px-5 py-3 font-mono text-xs tracking-[0.1em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy'

/** Translates the whole site: the country options already used elsewhere, plus Default (English). */
export function LanguageDialog({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()

  const choose = (code: (typeof LANGUAGES)[number]['code']) => {
    setLanguage(code)
    onClose()
  }

  return (
    <Modal label={t('settings.language')} area={0.55} onClose={onClose}>
      <div className="flex flex-col items-center gap-3">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => choose(language.code)}
              className={option}
            >
              {language.countrySlug ? t(countryTranslationKey(language.countrySlug)) : t('language.default')}
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className={secondary}>
          {t('header.close')}
        </button>
      </div>
    </Modal>
  )
}
