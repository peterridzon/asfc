import { useTranslation } from '../lib/i18n/useTranslation'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-14 border-t border-hairline bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="flex items-center gap-2.5 font-mono text-sm font-bold tracking-[0.16em] text-navy">
          <Logo className="h-8 w-auto" />
          <span>ASFC — {t('app.tagline').toUpperCase()}</span>
        </p>
        <p className="mt-2 max-w-prose text-sm text-navy-soft">{t('disclaimer.short')}</p>
        <p className="mt-2 max-w-prose text-sm text-navy-soft">{t('footer.officialInfo')}</p>
      </div>
    </footer>
  )
}
