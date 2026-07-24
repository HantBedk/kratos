import { Download } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockCertificates, type CitizenCertificate } from '@/data/citizenPortal'

const TIPOS = ['Residencia', 'Estratificación'] as const

export function CitizenCertificadosPage() {
  const [items, setItems] = useState<CitizenCertificate[]>(mockCertificates)
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Residencia')
  const [nombre, setNombre] = useState('María Alejandra Restrepo')
  const [flash, setFlash] = useState<string | null>(null)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!nombre.trim()) return
    const prefix = tipo === 'Residencia' ? 'CER-RES' : 'CER-EST'
    const numero = `${prefix}-2026-${String(100 + items.length).padStart(3, '0')}`
    const nuevo: CitizenCertificate = {
      id: String(Date.now()),
      tipo,
      numero,
      solicitante: nombre.trim(),
      fecha: new Date().toLocaleDateString('es-CO'),
      estado: 'Radicado',
      estadoTone: 'accent',
    }
    setItems((prev) => [nuevo, ...prev])
    setFlash(`Solicitud ${numero} registrada (demo).`)
  }

  return (
    <div className="animate-enter mt-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Certificados
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text)]">
          Solicitar y descargar
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Residencia y estratificación. La aprobación se refleja en el expediente.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="glass-panel mt-6 space-y-4 rounded-[var(--radius-xl)] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Tipo de certificado
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
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              Solicitante
            </span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text)]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="rounded-full bg-[var(--cta)] px-5 py-2.5 text-sm font-bold text-[var(--cta-text)] hover:bg-[var(--cta-hover)]"
        >
          Solicitar (demo)
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
                <h2 className="mt-1 font-semibold text-[var(--text)]">{item.numero}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.solicitante}</p>
              </div>
              <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
            </div>
            {item.estado === 'Aprobado' && (
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)] hover:border-[var(--border-strong)]"
                onClick={() =>
                  setFlash(`Descarga simulada de ${item.numero}.pdf (demo).`)
                }
              >
                <Download className="h-4 w-4" />
                Descargar PDF (demo)
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
