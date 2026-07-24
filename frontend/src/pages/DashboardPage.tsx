import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CircleDollarSign,
  FileWarning,
  Landmark,
  Timer,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KpiCard, SectionHeader } from '@/components/KpiCard'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  dashboardKpiPanels,
  type KpiDetailItem,
  type KpiPanel,
} from '@/data/dashboardKpis'
import { currentEntity } from '@/data/entity'
import { moduleGroups } from '@/data/modules'
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
    meta: 'Ventanilla · 2 días restantes',
    tone: 'danger' as const,
    to: '/app/modulos/pqrsd',
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
    tone: 'default' as const,
    to: '/app/modulos/presupuesto',
  },
]

export function DashboardPage() {
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

  return (
    <div>
      <SectionHeader
        eyebrow="Vista gerencial"
        title={`Buen día, ${currentEntity.name}`}
        description="Resumen operativo de demostración. Haz clic en cada indicador para ver el listado y el detalle. Montos en pesos colombianos (COP)."
        action={
          <Link
            to="/app/modulos/predial"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Ir a Predial
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Recaudo del mes"
          value={formatCOP(1_280_450_000)}
          hint="Predial + ICA acumulado (COP)"
          trend="+12%"
          icon={CircleDollarSign}
          tone="success"
          onClick={() => openPanel('recaudo')}
        />
        <KpiCard
          label="Ejecución presupuestal"
          value="64%"
          hint="Compromisos vs apropiación"
          trend="En meta"
          icon={Landmark}
          tone="default"
          onClick={() => openPanel('ejecucion')}
        />
        <KpiCard
          label="Contratos en riesgo"
          value="7"
          hint="Pólizas o plazos críticos"
          trend="Revisar"
          icon={AlertTriangle}
          tone="warning"
          onClick={() => openPanel('contratos')}
        />
        <KpiCard
          label="PQRSD por vencer"
          value="14"
          hint="Términos legales < 3 días"
          trend="Urgente"
          icon={Timer}
          tone="danger"
          onClick={() => openPanel('pqrsd')}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass-panel rounded-[var(--radius-lg)] p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
              Actividad reciente
            </h2>
            <FileWarning className="h-5 w-5 text-[var(--text-subtle)]" />
          </div>
          <ul className="space-y-3">
            {activities.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.to}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{item.meta}</p>
                  </div>
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.tone === 'success'
                        ? 'bg-[var(--success)]'
                        : item.tone === 'warning'
                          ? 'bg-[var(--warning)]'
                          : item.tone === 'danger'
                            ? 'bg-[var(--danger)]'
                            : 'bg-[var(--accent)]'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel rounded-[var(--radius-lg)] p-5 md:p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
            Módulos prioritarios
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Accesos rápidos del catálogo modular. El orden final lo define cada alcaldía en reunión de alcance.
          </p>
          <div className="mt-5 space-y-2">
            {moduleGroups.slice(0, 4).map((group) => {
              const Icon = group.icon
              const first = group.items[0]
              return (
                <Link
                  key={group.id}
                  to={`/app/modulos/${first.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--text)]">{group.label}</span>
                    <span className="block truncate text-xs text-[var(--text-muted)]">
                      {group.items.length} submódulos
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-subtle)]" />
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      <Modal
        open={!!panel && !detail}
        title={panel?.title ?? ''}
        description={panel?.description}
        onClose={closeAll}
        wide
        footer={
          panel && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-[var(--text-muted)]">{panel.items.length} registros</p>
              <div className="flex gap-2">
                {panel.moduleLink && (
                  <Link
                    to={panel.moduleLink}
                    onClick={closeAll}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
                  >
                    Ir al módulo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={closeAll}
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )
        }
      >
        {panel && (
          <ul className="space-y-2">
            {panel.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setDetail(item)}
                  className="flex w-full items-start justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-left transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[var(--accent)]">{item.code}</span>
                      <StatusBadge tone={item.statusTone}>{item.status}</StatusBadge>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[var(--text)]">{item.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">{item.subtitle}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {item.amount && (
                      <p className="text-sm font-semibold tabular-nums text-[var(--text)]">{item.amount}</p>
                    )}
                    <p className="mt-1 text-xs font-semibold text-[var(--accent)]">Ver detalle →</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal
        open={!!detail}
        title={detail?.title ?? ''}
        description={detail ? `${detail.code} · ${detail.subtitle}` : undefined}
        onClose={() => setDetail(null)}
        wide
        footer={
          detail && (
            <div className="flex flex-wrap justify-between gap-2">
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al listado
              </button>
              <button
                type="button"
                onClick={closeAll}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              >
                Cerrar
              </button>
            </div>
          )
        }
      >
        {detail && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={detail.statusTone}>{detail.status}</StatusBadge>
              {detail.amount && (
                <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-sm font-semibold">
                  {detail.amount}
                </span>
              )}
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {detail.fields.map((field) => (
                <div key={field.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] p-3">
                  <dt className="text-xs font-semibold tracking-[0.1em] text-[var(--text-subtle)] uppercase">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--text)]">{field.value}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-xs font-semibold tracking-[0.1em] text-[var(--text-subtle)] uppercase">Notas</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{detail.notes}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
