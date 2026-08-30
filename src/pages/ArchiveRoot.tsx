import { Link } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { useTranslation } from '../lib/i18n/useTranslation'
import type { TranslationKey } from '../lib/i18n/translations'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const ARCHIVE_LINKS: Array<{ to: string; labelKey: TranslationKey }> = [
  { to: '/archive/alerts', labelKey: 'archive.alertsArchive' },
  { to: '/archive/outlook', labelKey: 'archive.chooserTitle' },
]

/** Reached from the homepage's ARCHIVE button: pick which archive to browse. */
export function ArchiveRoot() {
  const { t } = useTranslation()
  useDocumentMeta(t('archive.rootTitle'), t('archive.rootMetaDesc'))

  return (
    <>
      <DisclaimerDialog />

      <div className="mx-auto flex min-h-[calc(100dvh-14rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
        <h1 className="text-center font-mono text-3xl font-extrabold tracking-[0.1em] text-navy uppercase sm:text-4xl">
          {t('archive.rootTitle')}
        </h1>

        <nav aria-label={t('archive.rootTitle')} className="mt-10">
          <ul className="grid grid-cols-1 gap-4">
            {ARCHIVE_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex min-h-28 items-center justify-center bg-[rgb(255,208,0)] px-4 text-center font-mono text-base leading-tight font-bold tracking-[0.06em] text-navy uppercase shadow-sm transition hover:bg-[rgb(232,189,0)] sm:text-lg sm:tracking-[0.1em]"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
