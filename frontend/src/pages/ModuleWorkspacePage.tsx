import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { SectionHeader } from '@/components/KpiCard'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Field, inputClass, textareaClass } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { roleCanAccessSlug } from '@/data/demoRoles'
import { findModule, findModuleGroup } from '@/data/modules'
import { getWorkspace, type ModuleRecord } from '@/data/moduleWorkspaces'
import { formatCOP } from '@/lib/money'
import { ModuleDashboardPage } from '@/pages/ModuleDashboardPage'
import { PqrsdManagePage } from '@/pages/PqrsdManagePage'

/** Estados de excepción: no forman parte del avance lineal del flujo. */
const FLOW_EXCEPTION_STATUSES = new Set([
  'Anulada',
  'Anulado',
  'Rechazada',
  'Rechazado',
  'Reversado',
  'Devuelta',
  'Devuelto',
  'Cancelada',
  'Cancelado',
])

export function ModuleWorkspacePage() {
  const { slug = '' } = useParams()
  const { role } = useSession()
  const mod = findModule(slug) ?? (slug === 'pqrsd' ? findModule('pqrsd-bandeja') : undefined)
  const accessSlug = slug === 'pqrsd' ? 'pqrsd-bandeja' : slug
  const allowed = role ? roleCanAccessSlug(role, accessSlug) : false

  if (slug === 'pqrsd' || slug.startsWith('pqrsd-')) {
    if (mod?.kind === 'dashboard') {
      if (!allowed) return <AccessDenied />
      return <ModuleDashboardPage slug={slug} />
    }
    return <PqrsdManagePage />
  }

  if (mod?.kind === 'dashboard') {
    if (!allowed) return <AccessDenied />
    return <ModuleDashboardPage slug={slug} />
  }

  return <ModuleListWorkspace slug={slug} />
}

function AccessDenied() {
  return (
    <div className="card">
      <div className="card-body text-center py-5">
        <h1 className="h4">Sin acceso a este módulo</h1>
        <Link to="/app/dashboard" className="btn btn-primary mt-3">
          Volver al dashboard
        </Link>
      </div>
    </div>
  )
}

function ModuleListWorkspace({ slug }: { slug: string }) {
  const { role } = useSession()
  const mod = findModule(slug)
  const group = findModuleGroup(slug)
  const workspace = getWorkspace(slug)
  const allowed = role ? roleCanAccessSlug(role, slug) : false

  const [records, setRecords] = useState<ModuleRecord[]>(() => workspace?.records ?? [])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<ModuleRecord | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', party: '', amount: '', notes: '' })

  useEffect(() => {
    if (!workspace) return
    setRecords(workspace.records)
    setQuery('')
    setFilter('Todos')
    setSelected(null)
    setCreateOpen(false)
    setForm({ title: '', party: '', amount: '', notes: '' })
  }, [workspace])

  if (!mod || !workspace) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <h1 className="h4">Módulo no encontrado</h1>
          <Link to="/app/dashboard" className="btn btn-primary mt-3">
            Volver al dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <h1 className="h4">Sin acceso a este módulo</h1>
          <p className="text-body-secondary">
            El perfil <strong>{role?.label}</strong> no incluye {mod.label}.
          </p>
          <Link to="/app/dashboard" className="btn btn-primary mt-2">
            Volver al dashboard
          </Link>
        </div>
      </div>
    )
  }

  const filtered = records.filter((row) => {
    const matchesFilter = filter === 'Todos' || row.status === filter
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      row.code.toLowerCase().includes(q) ||
      row.title.toLowerCase().includes(q) ||
      row.party.toLowerCase().includes(q) ||
      row.notes.toLowerCase().includes(q)
    return matchesFilter && matchesQuery
  })

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2800)
  }

  const columns: Column<ModuleRecord>[] = [
    {
      key: 'code',
      header: 'Código',
      render: (row) => <span className="fw-semibold text-primary">{row.code}</span>,
    },
    {
      key: 'title',
      header: workspace.singular,
      render: (row) => (
        <div>
          <div className="fw-semibold">{row.title}</div>
          <div className="small text-body-secondary">{row.party}</div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Valor',
      render: (row) =>
        row.amount != null ? (
          <span className="font-monospace">{formatCOP(row.amount)}</span>
        ) : (
          <span className="text-body-secondary">—</span>
        ),
    },
    {
      key: 'date',
      header: 'Fecha',
      render: (row) => <span className="text-body-secondary">{row.date}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => <StatusBadge tone={row.statusTone}>{row.status}</StatusBadge>,
    },
    {
      key: 'actions',
      header: '',
      render: () => <i className="bi bi-eye text-body-secondary" />,
    },
  ]

  const onCreate = (event: FormEvent) => {
    event.preventDefault()
    if (!form.title.trim() || !form.party.trim()) return

    const amount = form.amount ? Number(form.amount.replace(/\D/g, '')) : undefined
    const newRecord: ModuleRecord = {
      id: `new-${Date.now()}`,
      code: `${workspace.singular.slice(0, 3).toUpperCase()}-DEMO-${String(records.length + 1).padStart(3, '0')}`,
      title: form.title.trim(),
      party: form.party.trim(),
      amount: Number.isFinite(amount) ? amount : undefined,
      date: new Date().toLocaleDateString('es-CO'),
      status: workspace.filters[1] ?? 'Borrador',
      statusTone: 'neutral',
      notes: form.notes.trim() || 'Creado en demostración SPA',
      fields: [],
    }
    newRecord.fields = [
      { label: 'Código', value: newRecord.code },
      { label: 'Responsable / tercero', value: newRecord.party },
      { label: 'Fecha', value: newRecord.date },
      ...(newRecord.amount != null ? [{ label: 'Valor (COP)', value: formatCOP(newRecord.amount) }] : []),
      { label: 'Estado', value: newRecord.status },
      { label: 'Notas', value: newRecord.notes },
    ]

    setRecords((prev) => [newRecord, ...prev])
    setCreateOpen(false)
    setForm({ title: '', party: '', amount: '', notes: '' })
    setSelected(newRecord)
    showToast(`${workspace.singular} creado correctamente (demo)`)
  }

  const flowOptions = workspace.filters.filter(
    (f) => f !== 'Todos' && !FLOW_EXCEPTION_STATUSES.has(f),
  )
  const selectedFlowIdx = selected ? flowOptions.indexOf(selected.status) : -1
  const canAdvance =
    !!selected && selectedFlowIdx >= 0 && selectedFlowIdx < flowOptions.length - 1

  const advanceStatus = () => {
    if (!selected || !canAdvance) {
      showToast('El registro ya está en el estado final del flujo')
      return
    }
    const next = flowOptions[selectedFlowIdx + 1]
    const tones = ['neutral', 'info', 'warning', 'success', 'accent'] as const
    const updated = {
      ...selected,
      status: next,
      statusTone: tones[Math.min(selectedFlowIdx + 1, tones.length - 1)],
      notes: `${selected.notes} · Avance de flujo: ${next}`,
    }
    setRecords((prev) => prev.map((row) => (row.id === selected.id ? { ...updated, fields: row.fields } : row)))
    setSelected(updated)
    showToast(`Estado actualizado a “${next}”`)
  }

  return (
    <div>
      {toast && (
        <div className="toast show position-fixed bottom-0 end-0 m-3 align-items-center" style={{ zIndex: 1080 }}>
          <div className="toast-body">
            <i className="bi bi-check-circle text-success me-2" />
            {toast}
          </div>
        </div>
      )}

      <SectionHeader
        eyebrow={group?.label ?? 'Módulo'}
        title={mod.label}
        description={mod.description}
        action={
          <div className="d-flex flex-wrap gap-2">
            <span className="badge text-bg-secondary align-self-center">{mod.phase}</span>
            <button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}>
              <i className="bi bi-plus-lg me-1" />
              {workspace.createLabel}
            </button>
          </div>
        }
      />

      <div className="row mb-3">
        {workspace.stats.map((stat) => (
          <div key={stat.label} className="col-md-4 mb-2">
            <div className="info-box">
              <span className="info-box-icon text-bg-primary">
                <i className="bi bi-graph-up" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">{stat.label}</span>
                <span className="info-box-number">{stat.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title mb-0">
            <i className="bi bi-diagram-3 me-2" />
            Flujo del módulo
          </h3>
        </div>
        <div className="card-body">
          <ol className="breadcrumb mb-0 flex-wrap">
            {workspace.workflow.map((step, index) => (
              <li key={step} className="breadcrumb-item">
                <span className="badge text-bg-light border me-1">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2 align-items-center">
            <div className="col-lg-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search" />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={workspace.searchPlaceholder}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="btn-group flex-wrap" role="group">
                {workspace.filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`btn btn-sm ${filter === item ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-body-secondary small mb-2">
        {filtered.length} de {records.length} {workspace.plural.toLowerCase()} · clic en una fila para ver detalle
      </p>

      <DataTable
        columns={columns}
        rows={filtered}
        selectedId={selected?.id}
        onRowClick={setSelected}
        emptyMessage="No hay registros con esos filtros. Prueba otra búsqueda o crea uno nuevo."
      />

      <Modal
        open={!!selected}
        title={selected?.title ?? ''}
        description={selected ? `${selected.code} · ${selected.party}` : undefined}
        onClose={() => setSelected(null)}
        wide
        footer={
          selected && (
            <>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setSelected(null)}>
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={advanceStatus}
                disabled={!canAdvance}
                title={canAdvance ? undefined : 'Sin más avances en este flujo'}
              >
                Avanzar estado
              </button>
            </>
          )
        }
      >
        {selected && (
          <>
            <div className="mb-3">
              <StatusBadge tone={selected.statusTone}>{selected.status}</StatusBadge>
              {selected.amount != null && (
                <span className="badge text-bg-light border ms-2">{formatCOP(selected.amount)}</span>
              )}
            </div>
            <div className="row g-3">
              {(selected.fields.length
                ? selected.fields
                : [
                    { label: 'Código', value: selected.code },
                    { label: 'Parte', value: selected.party },
                    { label: 'Fecha', value: selected.date },
                  ]
              ).map((field) => (
                <div key={field.label} className="col-sm-6">
                  <div className="border rounded p-3 h-100">
                    <div className="small text-body-secondary text-uppercase">{field.label}</div>
                    <div className="fw-semibold">{field.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="alert alert-secondary mt-3 mb-0">
              <strong>Notas / bitácora:</strong> {selected.notes}
            </div>
          </>
        )}
      </Modal>

      <Modal
        open={createOpen}
        title={workspace.createLabel}
        description={`Demostración interactiva. Los datos se guardan solo en esta sesión.`}
        onClose={() => setCreateOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setCreateOpen(false)}>
              Cancelar
            </button>
            <button type="submit" form="create-module-form" className="btn btn-primary">
              Guardar
            </button>
          </>
        }
      >
        <form id="create-module-form" onSubmit={onCreate}>
          <Field label={workspace.formHints.title}>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </Field>
          <Field label={workspace.formHints.party}>
            <input
              className={inputClass}
              value={form.party}
              onChange={(e) => setForm((f) => ({ ...f, party: e.target.value }))}
              required
            />
          </Field>
          {workspace.formHints.amount && (
            <Field label="Valor (COP)" hint="Solo números; se formatea en pesos colombianos.">
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="Ej. 25000000"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              />
            </Field>
          )}
          <Field label={workspace.formHints.notes}>
            <textarea
              className={textareaClass}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </Field>
        </form>
      </Modal>
    </div>
  )
}
