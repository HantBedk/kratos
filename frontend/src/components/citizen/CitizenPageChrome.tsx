import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function CitizenPageHeader({
  eyebrow,
  title,
  description,
  iconClass,
}: {
  eyebrow: string
  title: string
  description: string
  iconClass?: string
}) {
  return (
    <div className="app-content-header px-0">
      <div className="row mb-2">
        <div className="col-sm-8">
          <Link to="/ciudadano" className="small">
            <i className="bi bi-arrow-left me-1" />
            Volver al inicio
          </Link>
          <p className="text-body-secondary text-uppercase small mb-1 mt-2">{eyebrow}</p>
          <h1 className="h3 mb-1">
            {iconClass ? <i className={`${iconClass} me-2`} /> : null}
            {title}
          </h1>
          <p className="text-body-secondary mb-0">{description}</p>
        </div>
        <div className="col-sm-4">
          <ol className="breadcrumb float-sm-end">
            <li className="breadcrumb-item">
              <Link to="/ciudadano">Portal</Link>
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export function CitizenHelpNote({ children }: { children: ReactNode }) {
  return <div className="alert alert-secondary">{children}</div>
}
