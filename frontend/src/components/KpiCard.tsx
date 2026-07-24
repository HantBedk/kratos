import type { ReactNode } from 'react'

export type SmallBoxTone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'

type KpiCardProps = {
  label: string
  value: string
  hint?: string
  trend?: string
  /** Bootstrap Icons class, e.g. `bi bi-cash-coin` */
  iconClass?: string
  tone?: SmallBoxTone
  onClick?: () => void
  footerLabel?: string
}

const toneClass: Record<SmallBoxTone, string> = {
  primary: 'text-bg-primary',
  success: 'text-bg-success',
  warning: 'text-bg-warning',
  danger: 'text-bg-danger',
  info: 'text-bg-info',
  secondary: 'text-bg-secondary',
}

/** KPI estilo AdminLTE `small-box`. */
export function KpiCard({
  label,
  value,
  hint,
  trend,
  iconClass = 'bi bi-bar-chart',
  tone = 'primary',
  onClick,
  footerLabel = 'Más info',
}: KpiCardProps) {
  const box = (
    <div className={`small-box ${toneClass[tone]}`}>
      <div className="inner">
        {/* Número limpio (estilo index AdminLTE v4); la tendencia va en la
            sublínea para no saturar el valor ni chocar con el icono. */}
        <h3>{value}</h3>
        <p className="mb-0">{label}</p>
        {trend || hint ? (
          <p className="small mb-0 opacity-75">
            {trend ? <span className="fw-semibold">{trend}</span> : null}
            {trend && hint ? ' · ' : null}
            {hint}
          </p>
        ) : null}
      </div>
      <i className={`small-box-icon ${iconClass}`} aria-hidden />
      {onClick ? (
        <button
          type="button"
          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover border-0 bg-transparent w-100 text-start"
          onClick={onClick}
        >
          {footerLabel} <i className="bi bi-link-45deg" />
        </button>
      ) : (
        <span className="small-box-footer link-light">
          {footerLabel} <i className="bi bi-link-45deg" />
        </span>
      )}
    </div>
  )

  return <div className="col-lg-3 col-6">{box}</div>
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
    <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">
      <div>
        {eyebrow ? <p className="text-body-secondary text-uppercase small mb-1">{eyebrow}</p> : null}
        <h1 className="h3 mb-1">{title}</h1>
        {description ? <p className="text-body-secondary mb-0">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
