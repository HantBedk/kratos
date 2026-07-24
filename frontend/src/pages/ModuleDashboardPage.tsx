import { Link } from 'react-router-dom'
import { KpiCard, SectionHeader, type SmallBoxTone } from '@/components/KpiCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { getDashboardBySlug } from '@/data/moduleDashboards'
import { findModuleGroup } from '@/data/modules'
import { getWorkspace } from '@/data/moduleWorkspaces'

function mapTone(tone?: string): SmallBoxTone {
  if (tone === 'success') return 'success'
  if (tone === 'warning') return 'warning'
  if (tone === 'danger') return 'danger'
  return 'primary'
}

function iconForTone(tone?: string): string {
  if (tone === 'success') return 'bi bi-graph-up-arrow'
  if (tone === 'warning') return 'bi bi-exclamation-triangle'
  if (tone === 'danger') return 'bi bi-exclamation-octagon'
  return 'bi bi-speedometer2'
}

export function ModuleDashboardPage({ slug }: { slug: string }) {
  const config = getDashboardBySlug(slug)
  const group = findModuleGroup(slug)

  if (!config || !group) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <h1 className="h4">Dashboard no encontrado</h1>
          <Link to="/app/dashboard" className="btn btn-primary mt-3">
            Volver al dashboard general
          </Link>
        </div>
      </div>
    )
  }

  const listItems = group.items.filter((i) => i.kind !== 'dashboard')
  const recent = getWorkspace(config.primaryListSlug)?.records.slice(0, 5) ?? []

  return (
    <div>
      <SectionHeader
        eyebrow="Panel del módulo"
        title={config.title}
        description={config.subtitle}
        action={
          config.primaryListSlug ? (
            <Link to={`/app/modulos/${config.primaryListSlug}`} className="btn btn-primary">
              Ir a la lista principal <i className="bi bi-arrow-right-short" />
            </Link>
          ) : undefined
        }
      />

      <div className="row">
        {config.kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            iconClass={iconForTone(kpi.tone)}
            tone={mapTone(kpi.tone)}
          />
        ))}
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">
                <i className="bi bi-list-ul me-2" />
                Listas de este módulo
              </h3>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {listItems.map((item) => (
                  <li key={item.slug} className="list-group-item">
                    <Link to={`/app/modulos/${item.slug}`} className="d-flex justify-content-between text-decoration-none text-body">
                      <span>
                        <span className="d-block fw-semibold">{item.label}</span>
                        <span className="small text-body-secondary">{item.description}</span>
                      </span>
                      <i className="bi bi-chevron-right align-self-center" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Alertas y foco</h3>
            </div>
            <div className="card-body">
              <ul className="mb-4">
                {config.highlights.map((h) => (
                  <li key={h} className="mb-2">
                    {h}
                  </li>
                ))}
              </ul>
              <h4 className="h6 text-uppercase text-body-secondary">Actividad reciente</h4>
              <ul className="list-group list-group-flush">
                {recent.map((row) => (
                  <li key={row.id} className="list-group-item d-flex justify-content-between align-items-start px-0">
                    <div className="me-2">
                      <div className="fw-semibold text-truncate" style={{ maxWidth: '14rem' }}>
                        {row.title}
                      </div>
                      <div className="small text-body-secondary">
                        {row.code} · {row.date}
                      </div>
                    </div>
                    <StatusBadge tone={row.statusTone}>{row.status}</StatusBadge>
                  </li>
                ))}
                {recent.length === 0 && (
                  <li className="list-group-item px-0 text-body-secondary">Sin registros demo.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
