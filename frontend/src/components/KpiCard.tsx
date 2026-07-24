import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type KpiCardProps = {
  label: string
  value: string
  hint: string
  trend?: string
  icon: LucideIcon
  tone?: 'default' | 'success' | 'warning' | 'danger'
  onClick?: () => void
}

const toneMap = {
  default: 'text-[var(--accent)] bg-[var(--accent-soft)]',
  success: 'text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_14%,transparent)]',
  warning: 'text-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_14%,transparent)]',
  danger: 'text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_14%,transparent)]',
}

export function KpiCard({
  label,
  value,
  hint,
  trend,
  icon: Icon,
  tone = 'default',
  onClick,
}: KpiCardProps) {
  const className =
    'glass-panel group w-full rounded-[var(--radius-lg)] p-5 text-left transition-transform duration-300 hover:-translate-y-0.5'

  const content = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">{label}</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)]">
            {value}
          </p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <p className="text-[var(--text-muted)]">{hint}</p>
        {trend && (
          <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text)]">
            {trend}
          </span>
        )}
      </div>
      {onClick && (
        <p className="mt-3 text-xs font-semibold text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
          Clic para ver detalle →
        </p>
      )}
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} cursor-pointer focus-visible:outline-none`}>
        {content}
      </button>
    )
  }

  return <article className={className}>{content}</article>
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{eyebrow}</p>
        )}
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{description}</p>}
      </div>
      {action}
    </div>
  )
}
