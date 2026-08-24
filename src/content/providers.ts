import type { Provider } from '../types'

/**
 * ============================================================================
 *  THE LOGOS ARE PLACEHOLDERS
 * ============================================================================
 *  The files in public/images/logos/ are plain grey stand-ins, not the real
 *  logos. To use the real ones, download each organisation's official logo and
 *  overwrite the file of the same name — nothing else needs changing.
 *
 *  Check each provider's terms before publishing their logo on a live site.
 * ============================================================================
 */
export const providers: Provider[] = [
  { id: 'ecmwf', name: 'ECMWF', logo: '/images/logos/ecmwf.svg' },
  { id: 'aladin', name: 'ALADIN', logo: '/images/logos/aladin.svg' },
  { id: 'dwd', name: 'Deutscher Wetterdienst', logo: '/images/logos/dwd.svg' },
]
