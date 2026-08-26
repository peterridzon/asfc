const OPEN_EVENT = 'asfc:open-tutorial'

/** Opens the tutorial on demand — e.g. from the homepage Tutorial button. */
export function openTutorial(): void {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function subscribeToTutorialOpen(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener)
  return () => window.removeEventListener(OPEN_EVENT, listener)
}
