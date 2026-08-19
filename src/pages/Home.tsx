import { Link } from 'react-router-dom'

/**
 * Temporary placeholder — replaced by the full homepage in later prompts.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6">Family textile house · est. 1987</p>
      <h1 className="text-4xl tracking-tight">JANANI</h1>
      <p className="mt-8 max-w-md text-base text-ink-soft">
        Wholesale sarees and designer lehengas for boutiques, multi-brand stores
        and export buyers.
      </p>
      <p className="mt-12 font-utility text-sm text-ink-soft">
        Prompt 1 scaffold — review the system at{' '}
        <Link to="/styleguide" className="underline decoration-zari underline-offset-4 hover:text-ink">
          /styleguide
        </Link>
      </p>
    </main>
  )
}
