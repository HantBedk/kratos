import { CheckCircle2, Eye, Plus, Search, Workflow } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SectionHeader } from '@/components/KpiCard'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Field, inputClass, textareaClass } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { findModule, findModuleGroup } from '@/data/modules'
import { getWorkspace, type ModuleRecord } from '@/data/moduleWorkspaces'
import { formatCOP } from '@/lib/money'

export function ModuleWorkspacePage() {
  const { slug = '' } = useParams()
  const mod = findModule(slug)
  const group = findModuleGroup(slug)
  const workspace = getWorkspace(slug)

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
      <div className="glass-panel rounded-[var(--radius-lg)] p-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
          Módulo no encontrado
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">Revisa el menú lateral o vuelve al dashboard.</p>
        <Link to="/app/dashboard" className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)]">
          Volver al dashboard
        </Link>
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
      render: (row) => <span className="font-semibold text-[var(--accent)]">{row.code}</span>,
    },
    {
      key: 'title',
      header: workspace.singular,
      render: (row) => (
        <div>
          <p className="font-semibold text-[var(--text)]">{row.title}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.party}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Valor',
      render: (row) =>
        row.amount != null ? (
          <span className="tabular-nums">{formatCOP(row.amount)}</span>
        ) : (
          <span className="text-[var(--text-subtle)]">—</span>
        ),
    },
    {
      key: 'date',
      header: 'Fecha',
      render: (row) => <span className="text-[var(--text-muted)]">{row.date}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => <StatusBadge tone={row.statusTone}>{row.status}</StatusBadge>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: () => <Eye className="h-4 w-4 text-[var(--text-subtle)]" />,
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

  const advanceStatus = () => {
    if (!selected) return
    const idx = workspace.filters.filter((f) => f !== 'Todos').indexOf(selected.status)
    const options = workspace.filters.filter((f) => f !== 'Todos')
    const next = options[Math.min(idx + 1, options.length - 1)] ?? selected.status
    const tones = ['neutral', 'info', 'warning', 'success', 'accent', 'danger'] as const
    const updated = {
      ...selected,
      status: next,
      statusTone: tones[Math.min(idx + 1, tones.length - 1)],
      notes: `${selected.notes} · Avance de flujo: ${next}`,
    }
    setRecords((prev) => prev.map((row) => (row.id === selected.id ? { ...updated, fields: row.fields } : row)))
    setSelected(updated)
    showToast(`Estado actualizado a “${next}”`)
  }

  return (
    <div className="relative">
      {toast && (
        <div className="animate-enter fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-[var(--shadow-md)]">
          <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
          {toast}
        </div>
      )}

      <SectionHeader
        eyebrow={group?.label ?? 'Módulo'}
        title={mod.label}
        description={mod.description}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--text)] uppercase">
              {mod.phase}
            </span>
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              <Plus className="h-4 w-4" />
              {workspace.createLabel}
            </button>
          </div>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {workspace.stats.map((stat) => (
          <div key={stat.label} className="glass-panel rounded-[var(--radius-lg)] px-4 py-3">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-subtle)] uppercase">{stat.label}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-5 glass-panel rounded-[var(--radius-lg)] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
          <Workflow className="h-4 w-4 text-[var(--accent)]" />
          Flujo del módulo
        </div>
        <ol className="flex flex-wrap gap-2">
          {workspace.workflow.map((step, index) => (
            <li
              key={step}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--accent-soft)] text-[10px] text-[var(--accent)]">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={workspace.searchPlaceholder}
            className={`${inputClass} pl-10`}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {workspace.filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-2 text-xs font-bold transition-colors ${
                filter === item
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-3 text-sm text-[var(--text-muted)]">
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
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={advanceStatus}
                className="rounded-full bg-[var(--cta)] px-4 py-2 text-sm font-bold text-[var(--cta-text)] hover:bg-[var(--cta-hover)]"
              >
                Avanzar estado
              </button>
            </div>
          )
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={selected.statusTone}>{selected.status}</StatusBadge>
              {selected.amount != null && (
                <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-sm font-semibold text-[var(--text)]">
                  {formatCOP(selected.amount)}
                </span>
              )}
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {(selected.fields.length
                ? selected.fields
                : [
                    { label: 'Código', value: selected.code },
                    { label: 'Parte', value: selected.party },
                    { label: 'Fecha', value: selected.date },
                  ]
              ).map((field) => (
                <div key={field.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] p-3">
                  <dt className="text-xs font-semibold tracking-[0.1em] text-[var(--text-subtle)] uppercase">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--text)]">{field.value}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-xs font-semibold tracking-[0.1em] text-[var(--text-subtle)] uppercase">Notas / bitácora</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{selected.notes}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={createOpen}
        title={workspace.createLabel}
        description={`Demostración interactiva de ${workspace.plural.toLowerCase()}. Los datos se guardan solo en esta sesión.`}
        onClose={() => setCreateOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="create-module-form"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              Guardar
            </button>
          </div>
        }
      >
        <form id="create-module-form" className="space-y-4" onSubmit={onCreate}>
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
