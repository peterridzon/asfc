import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export function NotFound() {
  useDocumentMeta('Page not found', 'This ASFC page does not exist.')

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-6xl font-extrabold tracking-[0.1em] text-navy">404</p>
      <h1 className="mt-3 font-mono text-lg font-bold tracking-[0.14em] text-navy-soft uppercase">
        Page not found
      </h1>
      <Link
        to="/"
        className="mt-6 rounded bg-navy px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft"
      >
        Back to homepage
      </Link>
    </div>
  )
}
