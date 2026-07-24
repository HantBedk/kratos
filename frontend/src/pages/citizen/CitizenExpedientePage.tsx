import { useMemo, useState, type FormEvent } from 'react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockExpediente } from '@/data/citizenPortal'

export function CitizenExpedientePage() {
  const [query, setQuery] = useState(mockExpediente.documento)
  const [loaded, setLoaded] = useState(true)

  const eventos = useMemo(() => mockExpediente.eventos, [])

  const onSearch = (event: FormEvent) => {
    event.preventDefault()
    setLoaded(!!query.trim())
  }

  return (
    <div className="animate-enter mt-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Expediente
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text)]">
          Consulta unificada
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Historial de impuestos, PQRSD y certificados en una sola línea de tiempo (mock).
        </p>
      </header>

      <form onSubmit={onSearch} className="glass-panel mt-6 rounded-[var(--radius-xl)] p-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
            Documento o radicado
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text)]"
              placeholder="CC o número de trámite"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              Consultar
            </button>
          </div>
        </label>
      </form>

      {loaded && (
        <div className="mt-6">
          <div className="mb-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Titular
            </p>
            <p className="mt-1 font-semibold text-[var(--text)]">{mockExpediente.ciudadano}</p>
            <p className="text-sm text-[var(--text-muted)]">{mockExpediente.documento}</p>
          </div>

          <ol className="relative space-y-4 border-l border-[var(--border)] pl-6">
            {eventos.map((ev) => (
              <li key={ev.id} className="relative">
                <span className="absolute top-1.5 -left-[1.85rem] h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <div className="glass-panel rounded-[var(--radius-xl)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[var(--text-subtle)]">{ev.fecha}</p>
                      <h2 className="mt-1 font-semibold text-[var(--text)]">{ev.titulo}</h2>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{ev.detalle}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-subtle)]">
                        {ev.origen}
                      </p>
                    </div>
                    <StatusBadge tone={ev.estadoTone}>{ev.estado}</StatusBadge>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
