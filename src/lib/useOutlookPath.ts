import { useEffect, useState } from 'react'
import { outlookPath, subscribeToCountry } from './countryPreference'

/**
 * Where the Storm Outlook link should point right now, kept in step with the
 * country chosen in settings without needing a page reload.
 */
export function useOutlookPath(): string {
  const [path, setPath] = useState(outlookPath)

  useEffect(() => subscribeToCountry(() => setPath(outlookPath())), [])

  return path
}
