import { useTranslation } from '../lib/i18n/useTranslation'
import { LazyImage } from './LazyImage'

/** The screenshot-plus-explanation shown by the welcome tutorial and by the
 * on-demand Tutorial button. Kept in one place so the two cannot drift apart. */
export function TutorialContent({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex justify-center">
        <LazyImage
          src="/images/tutorial-outlook.jpg"
          alt={t('tutorial.imageAlt')}
          eager
          className="max-h-[45dvh] w-auto max-w-full"
        />
      </div>
      <p className="text-sm leading-relaxed text-navy sm:text-base">{t('tutorial.text')}</p>
      <button
        type="button"
        onClick={onClose}
        className="mx-auto w-full max-w-xs bg-navy px-6 py-4 font-mono text-lg font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft"
      >
        {t('tutorial.ok')}
      </button>
    </>
  )
}
