/** The three sections behind the coloured homepage buttons. */
export type SectionId = 'sources' | 'outlook' | 'alerts'

/** A data provider listed on the Sources page. */
export interface Provider {
  id: string
  name: string
  /** Path under /public, e.g. "/images/logos/ecmwf.svg". */
  logo: string
}

/** One line of the update log. */
export interface UpdateLogEntry {
  id: string
  text: string
}
