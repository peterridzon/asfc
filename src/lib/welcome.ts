const SEEN_KEY = 'asfc.welcomeSeen'
const CHANGED_EVENT = 'asfc:welcome-changed'

/**
 * The welcome tutorial only ever appears once — on the very first visit —
 * whether the visitor takes the tour or declines it.
 */
export function welcomeHandled(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === 'true'
  } catch {
    // Private mode or blocked storage — treat it as already seen so the
    // tutorial cannot get stuck reappearing on every navigation.
    return true
  }
}

export function markWelcomeSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, 'true')
  } catch {
    // Nothing to do.
  }
  window.dispatchEvent(new Event(CHANGED_EVENT))
}

export function subscribeToWelcome(listener: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, listener)
  return () => window.removeEventListener(CHANGED_EVENT, listener)
}
