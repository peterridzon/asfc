import { updateLog } from '../content/updateLog'
import { useTranslation } from '../lib/i18n/useTranslation'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Plain white page listing what changed in each version. Entries are kept in
 * the language they were written in — they are a historical log, not UI text. */
export function UpdateLog() {
  const { t } = useTranslation()
  useDocumentMeta(t('updateLog.title'), t('updateLog.metaDesc'))

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <ul className="space-y-3">
        {updateLog.map((entry) => (
          <li key={entry.id} className="font-mono text-lg text-navy sm:text-xl">
            {entry.text}
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-lg text-navy-soft sm:text-xl">
        {t('updateLog.moreUpdatesSoon')}
      </p>
    </div>
  )
}
