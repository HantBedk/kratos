import { useState, type FormEvent } from 'react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockCitizenPqrsd, type CitizenPqrsd } from '@/data/citizenPortal'

const TIPOS = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Denuncia'] as const

export function CitizenPqrsdPage() {
  const [items, setItems] = useState<CitizenPqrsd[]>(mockCitizenPqrsd)
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Petición')
  const [asunto, setAsunto] = useState('')
  const [detalle, setDetalle] = useState('')
  const [flash, setFlash] = useState<string | null>(null)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!asunto.trim()) return
    const radicado = `PQR-2026-${String(500 + items.length).padStart(5, '0')}`
    const nuevo: CitizenPqrsd = {
      id: String(Date.now()),
      radicado,
      tipo,
      asunto: asunto.trim(),
      fecha: new Date().toLocaleDateString('es-CO'),
      estado: 'Radicada',
      estadoTone: 'accent',
    }
    setItems((prev) => [nuevo, ...prev])
    setAsunto('')
    setDetalle('')
    setFlash(`Radicado ${radicado} creado (demo).`)
  }

  return (
    <div className="animate-enter mt-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          PQRSD
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text)]">
          Radicar y consultar
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Flujo visual de ventanilla ciudadana. La respuesta la gestiona la consola ERP.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="glass-panel mt-6 space-y-4 rounded-[var(--radius-xl)] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Tipo
            </span>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as (typeof TIPOS)[number])}
              className="h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text)]"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Asunto
            </span>
            <input
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
              className="h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text)]"
              placeholder="Resumen breve"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Detalle
            </span>
            <textarea
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)]"
              placeholder="Describe la situación (mock, no se envía a nadie)"
            />
          </label>
        </div>
        <button
          type="submit"
          className="rounded-full bg-[var(--cta)] px-5 py-2.5 text-sm font-bold text-[var(--cta-text)] hover:bg-[var(--cta-hover)]"
        >
          Radicar (demo)
        </button>
        {flash && <p className="text-sm font-semibold text-[var(--success)]">{flash}</p>}
      </form>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="glass-panel rounded-[var(--radius-xl)] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                  {item.tipo} · {item.fecha}
                </p>
                <h2 className="mt-1 font-semibold text-[var(--text)]">{item.radicado}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.asunto}</p>
                {item.respuesta && (
                  <p className="mt-2 rounded-xl bg-[var(--bg-muted)] p-3 text-sm text-[var(--text)]">
                    {item.respuesta}
                  </p>
                )}
              </div>
              <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
