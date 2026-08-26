import { LazyImage } from './LazyImage'

const TUTORIAL_TEXT =
  "on storm outlook, if a color is given to your location or about 40 kilometers from your location, right in the upper left corner there is the key to what the color means. if there's a severe or a strong thunderstorm around the area of Czechia or Slovakia, we are most likely to give a warning for it in Alerts. DISCLAIMER: our warnings are not official and they don't replace national weather services or official weather warnings. you can change other stuff in settings."

/** The screenshot-plus-explanation shown by the welcome tutorial and by the
 * on-demand Tutorial button. Kept in one place so the two cannot drift apart. */
export function TutorialContent({ onClose }: { onClose: () => void }) {
  return (
    <>
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
        onClick={onClose}
        className="mx-auto w-full max-w-xs bg-navy px-6 py-4 font-mono text-lg font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft"
      >
        OK
      </button>
    </>
  )
}
