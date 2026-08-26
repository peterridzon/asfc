import { useEffect, useState } from 'react'
import { subscribeToTutorialOpen } from '../lib/tutorialOpen'
import { Modal } from './Modal'
import { TutorialContent } from './TutorialContent'

/**
 * Lets the tutorial be replayed at any time — e.g. from the homepage's
 * Tutorial button — independently of whether the first-visit welcome dialog
 * has already run.
 */
export function TutorialOnDemand() {
  const [open, setOpen] = useState(false)

  useEffect(() => subscribeToTutorialOpen(() => setOpen(true)), [])

  if (!open) return null

  return (
    <Modal label="ASFC tutorial" onClose={() => setOpen(false)}>
      <TutorialContent onClose={() => setOpen(false)} />
    </Modal>
  )
}
