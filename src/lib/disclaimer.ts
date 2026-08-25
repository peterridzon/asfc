const STORAGE_KEY = 'asfc.disclaimerHidden'
const SESSION_KEY = 'asfc.disclaimerAcknowledged'

/** True once the visitor has either acknowledged or permanently hidden it. */
export function disclaimerHandled(): boolean {
  try {
    // "Don't show this again" is permanent; "Got it!" lasts until the tab is
    // closed, so navigating deeper into a section does not ask twice.
    return (
      localStorage.getItem(STORAGE_KEY) === 'true' ||
      sessionStorage.getItem(SESSION_KEY) === 'true'
    )
  } catch {
    // Private mode or blocked storage — just show the dialog.
    return false
  }
}

/** Remembers "Got it!" until the browser tab is closed. */
export function acknowledgeDisclaimer(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
    // Nothing to do — the dialog will simply appear again.
  }
}

/** Hides the disclaimer for good on this browser. */
export function hideDisclaimerForever(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // Nothing to do — the choice simply will not persist.
  }
}
