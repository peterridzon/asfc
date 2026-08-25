import type { UpdateLogEntry } from '../types'

/**
 * ============================================================================
 *  HOW TO ADD A LINE TO THE UPDATE LOG
 * ============================================================================
 *  Put the newest entry at the TOP of the array:
 *
 *    { id: '0.2', text: 'version 0.2: added the outlook archive' },
 *
 *  Remember to bump VERSION_LABEL in src/lib/sections.ts as well — that is the
 *  text in the top-left corner of the homepage.
 * ============================================================================
 */
export const updateLog: UpdateLogEntry[] = [
  { id: '0.2', text: 'version 0.2 - added Czechia storm outlook' },
  { id: '0.1', text: 'version 0.1: website release' },
]
