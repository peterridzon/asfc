import { useEffect, useState } from 'react'
import { subscribeToWelcome, welcomeHandled } from './welcome'

/**
 * True while the welcome tutorial has not been answered yet.
 *
 * The disclaimer and the alert popups read this so they never stack on top of
 * the tutorial — they simply wait until it reports `false`.
 */
export function useWelcomePending(): boolean {
  const [pending, setPending] = useState(() => !welcomeHandled())

  useEffect(() => subscribeToWelcome(() => setPending(!welcomeHandled())), [])

  return pending
}
