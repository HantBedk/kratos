import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { KpiCard, SectionHeader, type SmallBoxTone } from '@/components/KpiCard'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  dashboardKpiPanels,
  type KpiDetailItem,
  type KpiPanel,
} from '@/data/dashboardKpis'
import { filterGroupsForRole } from '@/data/demoRoles'
import { currentEntity } from '@/data/entity'
import { formatCOP } from '@/lib/money'

const activities = [
  {
    title: 'Póliza por vencer — Contrato 045-2026',
    meta: 'Contratación · en 5 días',
    tone: 'warning' as const,
    to: '/app/modulos/polizas',
  },
  {
    title: 'PQRSD #1842 cerca del término',
    meta: 'Planeación · 2 días restantes',
    tone: 'danger' as const,
    to: '/app/modulos/pqrsd-vencimientos',
  },
  {
    title: 'Recaudo predial del día',
    meta: `Rentas · ${formatCOP(48_200_000)}`,
    tone: 'success' as const,
    to: '/app/modulos/predial',
  },
  {
    title: 'CDP solicitado por Planeación',
    meta: 'Presupuesto · pendiente de firma',
    tone: 'primary' as const,
    to: '/app/modulos/presupuesto',
  },
]

export function DashboardPage() {
  const { role } = useSession()
  const visibleGroups = useMemo(() => filterGroupsForRole(role ?? undefined), [role])
  const [panel, setPanel] = useState<KpiPanel | null>(null)
  const [detail, setDetail] = useState<KpiDetailItem | null>(null)

  const openPanel = (id: KpiPanel['id']) => {
    setDetail(null)
    setPanel(dashboardKpiPanels[id])
  }

  const closeAll = () => {
    setPanel(null)
    setDetail(null)
  }

  const firstModule = visibleGroups[0]?.items[0]?.slug

  return (
    <>
      <SectionHeader
        eyebrow={`Vista · ${role?.label ?? 'Demo'}`}
        title={`Buen día — ${currentEntity.name}`}
        description={
          role?.id === 'admin'
            ? 'Resumen operativo. Clic en cada indicador. Montos en COP.'
            : `Perfil ${role?.label}: el menú lateral solo muestra tus módulos.`
        }
        action={
          firstModule ? (
            <Link to={`/app/modulos/${firstModule}`} className="btn btn-primary">
              Ir a {visibleGroups[0]?.items[0]?.label} <i className="bi bi-arrow-right-short" />
            </Link>
          ) : (
            <Link to="/ciudadano" className="btn btn-primary">
              Portal ciudadano
            </Link>
          )
        }
      />

      <div className="row">
        <KpiCard
          label="Recaudo del mes"
          value={formatCOP(1_280_450_000)}
          hint="Predial + ICA (COP)"
          trend="+12%"
          iconClass="bi bi-cash-coin"
          tone="success"
          onClick={() => openPanel('recaudo')}
        />
        <KpiCard
          label="Ejecución presupuestal"
          value="64%"
          hint="Compromisos vs apropiación"
          trend="meta"
          iconClass="bi bi-pie-chart"
          tone="primary"
          onClick={() => openPanel('ejecucion')}
        />
        <KpiCard
          label="Contratos en riesgo"
          value="7"
          hint="Pólizas o plazos críticos"
          iconClass="bi bi-exclamation-triangle"
          tone="warning"
          onClick={() => openPanel('contratos')}
        />
        <KpiCard
          label="PQRSD por vencer"
          value="14"
          hint="Términos legales bajo 3 días"
          iconClass="bi bi-hourglass-split"
          tone="danger"
          onClick={() => openPanel('pqrsd')}
        />
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Actividad reciente</h3>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {activities.map((item) => (
                  <li key={item.title} className="list-group-item">
                    <Link to={item.to} className="d-flex justify-content-between align-items-start text-decoration-none text-body">
                      <div>
                        <div className="fw-semibold">{item.title}</div>
                        <div className="small text-body-secondary">{item.meta}</div>
                      </div>
                      <span className={`badge text-bg-${item.tone === 'primary' ? 'primary' : item.tone}`}>
                        {item.tone}
                      </span>
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
              <h3 className="card-title">Módulos prioritarios</h3>
            </div>
            <div className="card-body p-0">
              <ul className="nav flex-column">
                {visibleGroups.slice(0, 4).map((group) => {
                  const first = group.items[0]
                  return (
                    <li key={group.id} className="nav-item">
                      <Link to={`/app/modulos/${first.slug}`} className="nav-link">
                        <i className="nav-icon bi bi-folder2-open me-2" />
                        {group.label}
                        <span className="badge text-bg-secondary float-end">{group.items.length}</span>
                      </Link>
                    </li>
                  )
                })}
                {visibleGroups.length === 0 && (
                  <li className="nav-item px-3 py-3 text-body-secondary">Sin módulos para este perfil.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!panel && !detail}
        title={panel?.title ?? ''}
        description={panel?.description}
        onClose={closeAll}
        wide
        footer={
          panel && (
            <>
              {panel.moduleLink && (
                <Link to={panel.moduleLink} onClick={closeAll} className="btn btn-outline-primary">
                  Ir al módulo
                </Link>
              )}
              <button type="button" className="btn btn-primary" onClick={closeAll}>
                Cerrar
              </button>
            </>
          )
        }
      >
        {panel && (
          <div className="list-group">
            {panel.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => setDetail(item)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">
                    <span className="text-primary me-2">{item.code}</span>
                    {item.title}
                  </h6>
                  <StatusBadge tone={item.statusTone}>{item.status}</StatusBadge>
                </div>
                <p className="mb-1 small text-body-secondary">{item.subtitle}</p>
                {item.amount && <small className="fw-semibold">{item.amount}</small>}
              </button>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={!!detail}
        title={detail?.title ?? ''}
        description={detail ? `${detail.code} · ${detail.subtitle}` : undefined}
        onClose={() => setDetail(null)}
        wide
        footer={
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setDetail(null)}>
              Volver al listado
            </button>
            <button type="button" className="btn btn-primary" onClick={closeAll}>
              Cerrar
            </button>
          </>
        }
      >
        {detail && (
          <>
            <div className="mb-3">
              <StatusBadge tone={detail.statusTone}>{detail.status}</StatusBadge>
              {detail.amount && <span className="badge text-bg-light border ms-2">{detail.amount}</span>}
            </div>
            <div className="row g-3">
              {detail.fields.map((field) => (
                <div key={field.label} className="col-sm-6">
                  <div className="border rounded p-3 h-100">
                    <div className="small text-body-secondary text-uppercase">{field.label}</div>
                    <div className="fw-semibold">{field.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="alert alert-secondary mt-3 mb-0">
              <strong>Notas:</strong> {detail.notes}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export type _DashTone = SmallBoxTone
