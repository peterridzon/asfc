import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useOutlookPath } from '../lib/useOutlookPath'
import { DISCLAIMER, SECTIONS, VERSION_LABEL } from '../lib/sections'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import type { SectionId } from '../types'

/** Full-width buttons under the 2x2 block, in the order they appear. */
const WIDE_BUTTONS = [
  { to: '/update-log', label: 'UPDATE LOG' },
  { to: '/archive', label: 'OUTLOOK ARCHIVE' },
]

/**
 * The 2x2 block: green above yellow, red to the right of yellow, and grey
 * settings above red. The point where all four meet is the middle of the
 * block. The white update-log button sits underneath.
 */
const CELL: Record<SectionId, string> = {
  sources: 'col-start-1 row-start-1',
  outlook: 'col-start-1 row-start-2',
  alerts: 'col-start-2 row-start-2',
}

/**
 * The homepage is deliberately bare: light blue background, the heading text
 * and the buttons. No header, no footer.
 *
 * On a tall viewport the block is positioned so the three-way corner lands
 * exactly on the centre of the page. On shorter ones it simply sits below the
 * heading and the page scrolls — see the `tall` variant in index.css.
 */
export function Home() {
  useDocumentMeta('ASFC', `ASFC — Amateur Storm Forecast Center. ${DISCLAIMER}`)
  const outlook = useOutlookPath()

  return (
    <div className="relative flex min-h-dvh flex-col bg-sky-canvas px-4 py-8 sm:px-6 sm:py-12">
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
        --asfc-row is the height of a coloured button. On tall screens the block
        is shifted up by one row plus half a gap, which puts the three-way
        corner on the viewport centre whatever sits below it.
      */}
      <nav
        aria-label="Sections"
        className="mt-8 flex flex-1 items-center [--asfc-row:6rem] sm:[--asfc-row:7rem] tall:absolute tall:top-1/2 tall:left-1/2 tall:mt-0 tall:block tall:w-full tall:-translate-x-1/2 tall:-translate-y-[calc(var(--asfc-row)+0.375rem)] tall:px-4"
      >
        <ul className="mx-auto grid w-[min(38rem,92vw)] grid-cols-2 gap-3">
          {SECTIONS.map((section) => (
            <li key={section.id} className={CELL[section.id]}>
              <Link
                // Storm Outlook skips the chooser once a country is picked.
                to={section.id === 'outlook' ? outlook : section.path}
                className={`flex h-[var(--asfc-row)] items-center justify-center px-3 text-center font-mono text-sm leading-tight font-bold tracking-[0.06em] shadow-sm transition sm:text-base sm:tracking-[0.1em] md:text-lg ${section.button}`}
              >
                {section.label}
              </Link>
            </li>
          ))}

          <li className="col-start-2 row-start-1">
            <Link
              to="/settings"
              className="flex h-[var(--asfc-row)] items-center justify-center bg-[rgb(170,178,188)] px-3 text-center font-mono text-sm leading-tight font-bold tracking-[0.06em] text-navy shadow-sm transition hover:bg-[rgb(150,159,170)] sm:text-base sm:tracking-[0.1em] md:text-lg"
            >
              SETTINGS
            </Link>
          </li>

          {WIDE_BUTTONS.map((button, index) => (
            <li key={button.to} className="col-span-2" style={{ gridRow: 3 + index }}>
              <Link
                to={button.to}
                className="flex h-[calc(var(--asfc-row)/2)] items-center justify-center bg-white px-3 text-center font-mono text-sm font-bold tracking-[0.06em] text-navy shadow-sm transition hover:bg-[rgb(240,244,248)] sm:text-base sm:tracking-[0.1em] md:text-lg"
              >
                {button.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
