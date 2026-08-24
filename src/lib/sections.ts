import type { SectionId } from '../types'

export interface SectionDefinition {
  id: SectionId
  path: string
  /** Text on the homepage button. */
  label: string
  /** Heading on the section page. */
  title: string
  description: string
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
    label: 'SOURCES / ZDROJE',
    title: 'Sources / Zdroje',
    description: 'Radar, satellite and model images collected from the sources ASFC follows.',
    button: 'bg-[rgb(28,255,162)] text-navy hover:bg-[rgb(16,232,143)]',
    accent: 'bg-asfc-green',
  },
  {
    id: 'outlook',
    path: '/outlook',
    label: 'STORM OUTLOOK',
    title: 'Storm Outlook',
    description: 'Experimental amateur storm outlook maps published by ASFC.',
    button: 'bg-[rgb(255,208,0)] text-navy hover:bg-[rgb(232,189,0)]',
    accent: 'bg-asfc-yellow',
  },
  {
    id: 'alerts',
    path: '/alerts',
    label: 'ALERTS / VAROVANIA',
    title: 'Alerts / Varovania',
    description:
      'Images related to severe weather situations. Official warnings are issued by the national meteorological services, not by ASFC.',
    button: 'bg-[rgb(255,79,49)] text-navy hover:bg-[rgb(235,64,36)]',
    accent: 'bg-asfc-red',
  },
]

export function getSection(id: string): SectionDefinition | undefined {
  return SECTIONS.find((section) => section.id === id)
}

/** Shown in the top-left corner of the homepage. Bump this when you release. */
export const VERSION_LABEL = 'current version 0.1'

export const DISCLAIMER =
  'This is for experimental purposes only and this doesn’t replace official weather warnings or forecasts.'
