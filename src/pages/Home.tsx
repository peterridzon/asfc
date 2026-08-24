import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { DISCLAIMER, SECTIONS, VERSION_LABEL } from '../lib/sections'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import type { SectionId } from '../types'

/**
 * The three coloured buttons form an L: green above yellow, red to the right of
 * yellow. The empty top-right quadrant means the point where all three meet is
 * the middle of the 2x2 block — and the grid is offset so that meeting point
 * lands exactly on the centre of the viewport.
 *
 * The white button sits underneath, spanning the full width of the yellow and
 * red buttons, and is half as tall as the green one.
 */
const CELL: Record<SectionId, string> = {
  sources: 'col-start-1 row-start-1',
  outlook: 'col-start-1 row-start-2',
  alerts: 'col-start-2 row-start-2',
}

/**
 * The homepage is deliberately bare: light blue background, the heading text
 * and the buttons centred on the screen. No header, no footer.
 */
export function Home() {
  useDocumentMeta('ASFC', `ASFC — Amateur Storm Forecast Center. ${DISCLAIMER}`)

  return (
    <div className="relative min-h-dvh bg-sky-canvas px-4 py-8 sm:px-6 sm:py-12">
      <p className="absolute top-3 left-4 font-mono text-xs text-black sm:top-4 sm:left-6 sm:text-sm">
        {VERSION_LABEL}
      </p>

      <header className="text-center">
        <h1 className="flex items-center justify-center gap-3 font-mono text-5xl leading-none font-extrabold tracking-[0.14em] text-navy sm:gap-5 sm:text-7xl lg:text-8xl">
          <Logo className="h-[1.1em] w-auto" />
          <span>ASFC</span>
        </h1>
        <p className="mt-3 font-mono text-base font-semibold tracking-[0.16em] text-navy-soft uppercase sm:mt-4 sm:text-2xl">
          Amateur Storm Forecast Center
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-snug font-semibold text-navy sm:mt-6 sm:text-lg">
          {DISCLAIMER}
        </p>
      </header>

      {/*
        --asfc-row is the height of a coloured button; the gap is 0.75rem, so
        shifting the grid up by one row plus half a gap puts the three-way
        corner on the viewport centre, whatever is added below it.
      */}
      <nav
        aria-label="Sections"
        className="absolute top-1/2 left-1/2 w-full max-w-[38rem] -translate-x-1/2 -translate-y-[calc(var(--asfc-row)+0.375rem)] px-4 [--asfc-row:6rem] sm:[--asfc-row:7rem]"
      >
        <ul className="grid grid-cols-2 gap-3">
          {SECTIONS.map((section) => (
            <li key={section.id} className={CELL[section.id]}>
              <Link
                to={section.path}
                className={`flex h-[var(--asfc-row)] items-center justify-center px-3 text-center font-mono text-sm leading-tight font-bold tracking-[0.06em] shadow-sm transition sm:text-base sm:tracking-[0.1em] md:text-lg ${section.button}`}
              >
                {section.label}
              </Link>
            </li>
          ))}

          <li className="col-span-2 row-start-3">
            <Link
              to="/update-log"
              className="flex h-[calc(var(--asfc-row)/2)] items-center justify-center bg-white px-3 text-center font-mono text-sm font-bold tracking-[0.06em] text-navy shadow-sm transition hover:bg-[rgb(240,244,248)] sm:text-base sm:tracking-[0.1em] md:text-lg"
            >
              UPDATE LOG
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
