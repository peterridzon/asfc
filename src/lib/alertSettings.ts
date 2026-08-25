const DISMISSED_KEY = 'asfc.dismissedAlerts'
const ENABLED_KEY = 'asfc.showAlertPopups'
const SESSION_KEY = 'asfc.alertsSeenThisVisit'

/**
 * Preferences for the alert window that greets visitors.
 *
 * Everything lives in the browser: which alerts this person has permanently
 * dismissed, and whether they want the window at all. Storage can throw in
 * private mode, so every read falls back to "show it".
 */

export function alertPopupsEnabled(): boolean {
  try {
    return localStorage.getItem(ENABLED_KEY) !== 'false'
  } catch {
    return true
  }
}

export function setAlertPopupsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(ENABLED_KEY, enabled ? 'true' : 'false')
  } catch {
    // Preference simply will not persist.
  }
}

export function dismissedAlertIds(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

/** Hides one specific alert for good; other alerts still appear. */
export function dismissAlertForever(id: string): void {
  try {
    const ids = new Set(dismissedAlertIds())
    ids.add(id)
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...ids]))
  } catch {
    // Preference simply will not persist.
  }
}

export function clearDismissedAlerts(): void {
  try {
    localStorage.removeItem(DISMISSED_KEY)
  } catch {
    // Nothing to do.
  }
}

/** "OK" closes the window for this visit rather than for good. */
export function alertsSeenThisVisit(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function markAlertsSeenThisVisit(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
    // Nothing to do.
  }
}
