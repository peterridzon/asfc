import { OUTLOOK_REGIONS, type OutlookRegion } from './sections'

const KEY = 'asfc.preferredCountry'

/** Slug of an entry in OUTLOOK_REGIONS, or null when nothing is chosen. */
export type CountrySlug = OutlookRegion['slug']

const VALID: CountrySlug[] = OUTLOOK_REGIONS.map((region) => region.slug)

export function preferredCountry(): CountrySlug | null {
  try {
    const stored = localStorage.getItem(KEY)
    return VALID.includes(stored as CountrySlug) ? (stored as CountrySlug) : null
  } catch {
    return null
  }
}

export function setPreferredCountry(slug: CountrySlug): void {
  try {
    localStorage.setItem(KEY, slug)
  } catch {
    // Preference simply will not persist.
  }
  announce()
}

export function clearPreferredCountry(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to do.
  }
  announce()
}

/**
 * localStorage fires no event in the tab that wrote it, so anything already on
 * screen — the header link, the homepage button — would keep the old target
 * until the next reload. This tells them to look again.
 */
const CHANGED_EVENT = 'asfc:country-changed'

function announce(): void {
  window.dispatchEvent(new Event(CHANGED_EVENT))
}

export function subscribeToCountry(listener: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(CHANGED_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}

/**
 * Where the Storm Outlook button should lead: straight to the chosen country
 * when there is one, otherwise to the two-button chooser.
 */
export function outlookPath(): string {
  const country = preferredCountry()
  return country ? `/outlook/${country}` : '/outlook'
}

/** Wipes every preference this site stores in the browser. */
export function resetAllSettings(): void {
  const localKeys = [
    KEY,
    'asfc.showAlertPopups',
    'asfc.dismissedAlerts',
    'asfc.disclaimerHidden',
    'asfc.welcomeSeen',
  ]
  const sessionKeys = ['asfc.alertsSeenThisVisit', 'asfc.disclaimerAcknowledged']

  try {
    localKeys.forEach((key) => localStorage.removeItem(key))
  } catch {
    // Nothing to do.
  }
  try {
    sessionKeys.forEach((key) => sessionStorage.removeItem(key))
  } catch {
    // Nothing to do.
  }
}
