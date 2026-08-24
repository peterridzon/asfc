import { updateLog } from '../content/updateLog'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Plain white page listing what changed in each version. */
export function UpdateLog() {
  useDocumentMeta('Update log', 'What changed in each version of the ASFC website.')

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <ul className="space-y-3">
        {updateLog.map((entry) => (
          <li key={entry.id} className="font-mono text-lg text-navy sm:text-xl">
            {entry.text}
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-lg text-navy-soft sm:text-xl">more updates soon!</p>
    </div>
  )
}
