import { useState } from 'react'
import { useTranslation } from '../lib/i18n/useTranslation'
import { markWelcomeSeen } from '../lib/welcome'
import { useWelcomePending } from '../lib/useWelcomePending'
import { Modal } from './Modal'
import { TutorialContent } from './TutorialContent'

const yellow =
  'flex-1 bg-[rgb(255,208,0)] px-8 py-4 font-mono text-base font-bold tracking-[0.14em] text-navy uppercase transition hover:bg-[rgb(232,189,0)]'

/**
 * Greets a first-time visitor once, ever — the "seen" flag is permanent, set
 * whether they take the tour or decline it.
 *
 * Runs at the top of the app rather than on any one page, so it appears no
 * matter which URL someone lands on first. The disclaimer and the alert
 * popups hold off until this is answered (see useWelcomePending).
 */
export function WelcomeTutorial() {
  const { t } = useTranslation()
  const pending = useWelcomePending()
  const [step, setStep] = useState<'ask' | 'tutorial'>('ask')

  if (!pending) return null

  if (step === 'ask') {
    return (
      <Modal label={t('welcome.dialogLabel')} area={0.4} onClose={markWelcomeSeen}>
        <p className="text-center text-lg leading-relaxed font-semibold text-navy sm:text-xl">
          {t('welcome.ask')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setStep('tutorial')} className={yellow}>
            {t('welcome.yes')}
          </button>
          <button type="button" onClick={markWelcomeSeen} className={yellow}>
            {t('welcome.no')}
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal label={t('tutorial.dialogLabel')} onClose={markWelcomeSeen}>
      <TutorialContent onClose={markWelcomeSeen} />
    </Modal>
  )
}
