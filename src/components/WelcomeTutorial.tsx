import { useState } from 'react'
import { markWelcomeSeen } from '../lib/welcome'
import { useWelcomePending } from '../lib/useWelcomePending'
import { LazyImage } from './LazyImage'
import { Modal } from './Modal'

const yellow =
  'flex-1 bg-[rgb(255,208,0)] px-8 py-4 font-mono text-base font-bold tracking-[0.14em] text-navy uppercase transition hover:bg-[rgb(232,189,0)]'

const TUTORIAL_TEXT =
  "on storm outlook, if a color is given to your location or about 40 kilometers from your location, right in the upper left corner there is the key to what the color means. if there's a severe or a strong thunderstorm around the area of Czechia or Slovakia, we are most likely to give a warning for it in Alerts. DISCLAIMER: our warnings are not official and they don't replace national weather services or official weather warnings. you can change other stuff in settings."

/**
 * Greets a first-time visitor once, ever — the "seen" flag is permanent, set
 * whether they take the tour or decline it.
 *
 * Runs at the top of the app rather than on any one page, so it appears no
 * matter which URL someone lands on first. The disclaimer and the alert
 * popups hold off until this is answered (see useWelcomePending).
 */
export function WelcomeTutorial() {
  const pending = useWelcomePending()
  const [step, setStep] = useState<'ask' | 'tutorial'>('ask')

  if (!pending) return null

  if (step === 'ask') {
    return (
      <Modal label="Welcome to ASFC" area={0.4} onClose={markWelcomeSeen}>
        <p className="text-center text-lg leading-relaxed font-semibold text-navy sm:text-xl">
          welcome to Asfc, would you like to have a quick tutorial?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setStep('tutorial')} className={yellow}>
            Yes
          </button>
          <button type="button" onClick={markWelcomeSeen} className={yellow}>
            No
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal label="ASFC tutorial" onClose={markWelcomeSeen}>
      <div className="flex justify-center">
        <LazyImage
          src="/images/tutorial-outlook.jpg"
          alt="Storm outlook map with the colour key in the upper-left corner circled"
          eager
          className="max-h-[45dvh] w-auto max-w-full"
        />
      </div>
      <p className="text-sm leading-relaxed text-navy sm:text-base">{TUTORIAL_TEXT}</p>
      <button
        type="button"
        onClick={markWelcomeSeen}
        className="mx-auto w-full max-w-xs bg-navy px-6 py-4 font-mono text-lg font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft"
      >
        OK
      </button>
    </Modal>
  )
}
