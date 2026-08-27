import { LazyImage } from '../components/LazyImage'
import { providers } from '../content/providers'
import { useTranslation } from '../lib/i18n/useTranslation'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** The three organisations ASFC follows, listed one under the other. */
export function Sources() {
  const { t } = useTranslation()
  useDocumentMeta(t('sources.title'), t('sources.metaDesc'))

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-mono text-3xl font-extrabold tracking-[0.1em] text-navy uppercase sm:text-4xl">
        {t('sources.title')}
      </h1>

      <ul className="mt-10 space-y-6">
        {providers.map((provider) => (
          <li
            key={provider.id}
            className="flex items-center gap-5 border-b border-hairline pb-6 last:border-b-0"
          >
            <LazyImage
              src={provider.logo}
              alt={t('sources.logoAlt', { name: provider.name })}
              className="h-16 w-28 shrink-0 sm:h-20 sm:w-36"
            />
            <span className="font-mono text-lg font-bold tracking-[0.08em] text-navy sm:text-2xl">
              {provider.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
