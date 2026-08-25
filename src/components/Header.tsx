import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SECTIONS } from '../lib/sections'
import { useOutlookPath } from '../lib/useOutlookPath'

/** Shown on every page except the homepage. */
export function Header() {
  const location = useLocation()
  const outlook = useOutlookPath()
  // Remembering which route the menu was opened on closes it on navigation.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const open = openedOn === location.pathname

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 font-mono text-[12px] tracking-[0.14em] uppercase transition ${
      isActive ? 'bg-navy text-white' : 'text-navy-soft hover:bg-sky-canvas hover:text-navy'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="bg-navy px-7 py-4 font-mono text-[22px] font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft sm:text-2xl"
        >
          ← Back to home
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              to={section.id === 'outlook' ? outlook : section.path}
              className={linkClass}
            >
              {section.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="border border-hairline px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-navy uppercase md:hidden"
          aria-expanded={open}
          aria-controls="asfc-mobile-nav"
          onClick={() => setOpenedOn(open ? null : location.pathname)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          id="asfc-mobile-nav"
          className="border-t border-hairline bg-white px-4 pt-2 pb-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <NavLink
                  to={section.id === 'outlook' ? outlook : section.path}
                  className={({ isActive }) => `${linkClass({ isActive })} block`}
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
