import type { UpdateLogEntry } from '../types'

/**
 * ============================================================================
 *  HOW TO ADD A LINE TO THE UPDATE LOG
 * ============================================================================
 *  Put the newest entry at the TOP of the array:
 *
 *    { id: '0.6', text: 'version 0.6 - what changed' },
 *
 *  Remember to bump VERSION_LABEL in src/lib/sections.ts as well — that is the
 *  text in the top-left corner of the homepage.
 * ============================================================================
 */
export const updateLog: UpdateLogEntry[] = [
  { id: '1.0.1', text: 'version 1.0.1 - added tutorial' },
  { id: '1.0', text: 'version 1.0 - site is now completely finished.' },
  { id: '0.6.1', text: 'version 0.6.1 - more settings' },
  { id: '0.5', text: 'version 0.5 - outlook archive' },
  { id: '0.4', text: 'version 0.4 - settings' },
  { id: '0.3', text: 'version 0.3 - alerts on homepage' },
  { id: '0.2', text: 'version 0.2 - added Czechia storm outlook' },
  { id: '0.1', text: 'version 0.1: website release' },
]
