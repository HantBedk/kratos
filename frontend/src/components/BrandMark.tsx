import { Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { currentEntity } from '@/data/entity'

type BrandMarkProps = {
  to?: string
  /** En consola (sidebar): muestra el nombre de la alcaldía, no el producto. */
  inverted?: boolean
  compact?: boolean
  title?: string
  subtitle?: string
}

export function BrandMark({
  to = '/login',
  inverted = false,
  compact = false,
  title,
  subtitle,
}: BrandMarkProps) {
  const displayTitle = title ?? (inverted ? currentEntity.name : 'Kratos')
  const displaySubtitle =
    subtitle ?? (inverted ? 'SelvaTic · Consola municipal' : 'SelvaTic · ERP Municipal')

  const content = (
    <span className="inline-flex min-w-0 items-center gap-3">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
          inverted
            ? 'bg-white/10 text-[var(--bronze-400)] ring-1 ring-white/15'
            : 'bg-[var(--ink-900)] text-[var(--bronze-400)] shadow-[var(--shadow-sm)]'
        }`}
      >
        <Landmark className="h-5 w-5" strokeWidth={2.1} />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={`truncate font-[family-name:var(--font-display)] text-base font-semibold tracking-tight sm:text-lg ${
              inverted ? 'text-[var(--text-on-dark)]' : 'text-[var(--text)]'
            }`}
            title={displayTitle}
          >
            {displayTitle}
          </span>
          <span
            className={`truncate text-[11px] font-semibold uppercase tracking-[0.14em] ${
              inverted ? 'text-[var(--text-on-dark-muted)]' : 'text-[var(--text-subtle)]'
            }`}
          >
            {displaySubtitle}
          </span>
        </span>
      )}
    </span>
  )

  return (
    <Link to={to} className="group min-w-0 transition-opacity hover:opacity-90">
      {content}
    </Link>
  )
}
