import type { TranslationKey } from './i18n/translations'
import type { SectionId } from '../types'

export interface SectionDefinition {
  id: SectionId
  path: string
  /** Translation key for the button and nav label. */
  labelKey: TranslationKey
  /**
   * Tailwind classes for the homepage button. Dark navy text on all three
   * because every colour is bright — white would not have enough contrast.
   */
  button: string
  /** Accent used on the section page. */
  accent: string
}

export const SECTIONS: SectionDefinition[] = [
  {
    id: 'sources',
    path: '/sources',
    labelKey: 'nav.sources',
    button: 'bg-[rgb(28,255,162)] text-navy hover:bg-[rgb(16,232,143)]',
    accent: 'bg-asfc-green',
  },
  {
    id: 'outlook',
    path: '/outlook',
    labelKey: 'nav.outlook',
    button: 'bg-[rgb(255,208,0)] text-navy hover:bg-[rgb(232,189,0)]',
    accent: 'bg-asfc-yellow',
  },
  {
    id: 'alerts',
    path: '/alerts',
    labelKey: 'nav.alerts',
    button: 'bg-[rgb(255,79,49)] text-navy hover:bg-[rgb(235,64,36)]',
    accent: 'bg-asfc-red',
  },
]

/** The regional outlooks reached from the Storm Outlook page. */
export interface OutlookRegion {
  /** URL segment: /outlook/<slug>. Also the translation key suffix: country.<slug>. */
  slug: 'austria' | 'czechia' | 'slovakia' | 'hungary'
  /** Which collection of images it publishes to. */
  section: 'outlook-austria' | 'outlook-czechia' | 'outlook-slovakia' | 'outlook-hungary'
}

/** Austria, Czechia, Slovakia, Hungary — the order used everywhere this list appears. */
export const OUTLOOK_REGIONS: OutlookRegion[] = [
  { slug: 'austria', section: 'outlook-austria' },
  { slug: 'czechia', section: 'outlook-czechia' },
  { slug: 'slovakia', section: 'outlook-slovakia' },
  { slug: 'hungary', section: 'outlook-hungary' },
]

export function getOutlookRegion(slug: string): OutlookRegion | undefined {
  return OUTLOOK_REGIONS.find((region) => region.slug === slug)
}

/** Shown in the top-left corner of the homepage. Bump this when you release. */
export const VERSION_LABEL = 'current version 1.5.5'
