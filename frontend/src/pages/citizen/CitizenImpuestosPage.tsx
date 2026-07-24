import { CreditCard, Search } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockTaxObligations, type TaxObligation } from '@/data/citizenPortal'
import { formatCOP } from '@/lib/money'

export function CitizenImpuestosPage() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<TaxObligation[]>(mockTaxObligations)
  const [paying, setPaying] = useState<TaxObligation | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.referencia.toLowerCase().includes(q) ||
        item.concepto.toLowerCase().includes(q) ||
        item.detalle.toLowerCase().includes(q),
    )
  }, [items, query])

  const onSearch = (event: FormEvent) => {
    event.preventDefault()
  }

  const totalDeuda = filtered.reduce((acc, item) => acc + item.saldo, 0)

  return (
    <div className="animate-enter mt-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Impuestos
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text)]">
          Obligaciones y pagos
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Consulta predial e ICA. Los montos están en COP. El pago PSE es una simulación.
        </p>
      </header>

      <form onSubmit={onSearch} className="glass-panel mt-6 rounded-[var(--radius-xl)] p-4 md:p-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
            Buscar por ficha, ICA o texto
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] pr-4 pl-10 text-sm text-[var(--text)] outline-none focus:border-[var(--border-strong)]"
              placeholder="Ej. 01-02-003-00045 o ICA-2026"
            />
          </div>
        </label>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Saldo filtrado:{' '}
          <strong className="text-[var(--text)]">{formatCOP(totalDeuda)}</strong>
        </p>
      </form>

      <ul className="mt-4 space-y-3">
        {filtered.map((item) => (
          <li key={item.id} className="glass-panel rounded-[var(--radius-xl)] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                  {item.concepto} · vigencia {item.vigencia}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
                  {item.referencia}
                </h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.detalle}</p>
              </div>
              <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                <CreditCard className="h-4 w-4 text-[var(--text-subtle)]" />
                {formatCOP(item.saldo)}
              </p>
              <button
                type="button"
                disabled={item.saldo <= 0}
                onClick={() => setPaying(item)}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.saldo <= 0 ? 'Al día' : 'Pagar con PSE'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={!!paying}
        title="Pago PSE (demo)"
        description="Simulación de botón de pagos. No se realiza cobro real."
        onClose={() => setPaying(null)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
              onClick={() => setPaying(null)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-full bg-[var(--cta)] px-4 py-2 text-sm font-bold text-[var(--cta-text)]"
              onClick={() => {
                if (!paying) return
                setItems((prev) =>
                  prev.map((row) =>
                    row.id === paying.id
                      ? { ...row, saldo: 0, estado: 'Al día', estadoTone: 'success' }
                      : row,
                  ),
                )
                setPaying(null)
              }}
            >
              Confirmar pago demo
            </button>
          </div>
        }
      >
        <div className="space-y-2 text-sm text-[var(--text-muted)]">
          <p>
            Concepto:{' '}
            <strong className="text-[var(--text)]">{paying?.concepto}</strong>
          </p>
          <p>
            Referencia:{' '}
            <strong className="text-[var(--text)]">{paying?.referencia}</strong>
          </p>
          <p>
            Valor:{' '}
            <strong className="text-[var(--text)]">
              {paying ? formatCOP(paying.saldo) : '—'}
            </strong>
          </p>
          <p>Banco simulado: Bancolombia · ref. PSE-DEMO-9912</p>
        </div>
      </Modal>
    </div>
  )
}
