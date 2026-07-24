import { Link } from 'react-router-dom'
import { currentEntity } from '@/data/entity'

/** Marca AdminLTE (`brand-link`). */
export function BrandMark({
  to = '/login',
  title,
  subtitle,
}: {
  to?: string
  title?: string
  subtitle?: string
}) {
  const displayTitle = title ?? 'Kratos'
  const displaySubtitle = subtitle ?? 'SelvaTic · ERP Municipal'

  return (
    <Link to={to} className="brand-link d-inline-flex align-items-center text-decoration-none">
      <span className="brand-image me-2" aria-hidden>
        <i className="bi bi-building" />
      </span>
      <span>
        <span className="brand-text fw-semibold d-block">{displayTitle}</span>
        <small className="text-body-secondary">{displaySubtitle || currentEntity.name}</small>
      </span>
    </Link>
  )
}
