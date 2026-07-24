import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  mockCitizenPayments,
  mockTaxObligations,
  type TaxObligation,
} from '@/data/citizenPortal'
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

  const confirmPay = () => {
    if (!paying) return
    setItems((prev) =>
      prev.map((row) =>
        row.id === paying.id
          ? { ...row, saldo: 0, estado: 'Al día', estadoTone: 'success' }
          : row,
      ),
    )
    setPaying(null)
  }

  return (
    <>
      <CitizenPageHeader
        eyebrow="Servicio ciudadano"
        title="Impuestos"
        description="Consulta deudas, conceptos y pagos. PSE simulado (demo)."
        iconClass="bi bi-bank"
      />

      <div className="row mb-3">
        <div className="col-md-8">
          <form onSubmit={onSearch}>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
                placeholder="Buscar ficha o ICA…"
              />
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <div className="info-box mb-0">
            <span className="info-box-icon text-bg-warning">
              <i className="bi bi-cash-stack" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total a pagar</span>
              <span className="info-box-number">{formatCOP(totalDeuda)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">Obligaciones</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Referencia</th>
                  <th>Saldo</th>
                  <th>Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="fw-semibold">{item.concepto}</div>
                      <small className="text-body-secondary">{item.vigencia}</small>
                    </td>
                    <td>
                      <div>{item.referencia}</div>
                      <small className="text-body-secondary">{item.detalle}</small>
                    </td>
                    <td className="fw-bold">{formatCOP(item.saldo)}</td>
                    <td>
                      <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
                    </td>
                    <td className="text-end">
                      {item.saldo > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => setPaying(item)}
                        >
                          Pagar PSE
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">Pagos realizados</h3>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {mockCitizenPayments.map((p) => (
              <li key={p.id} className="list-group-item d-flex justify-content-between">
                <span>
                  {p.concepto} · {p.fecha} · {p.canal}
                </span>
                <span className="fw-bold text-success">{formatCOP(p.valor)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="small text-body-secondary">
        <Link to="/ciudadano/expediente">Ver historial en expediente</Link>
      </p>

      <Modal
        open={!!paying}
        title="Pago PSE (demo)"
        description={paying ? `${paying.concepto} · ${paying.referencia}` : undefined}
        onClose={() => setPaying(null)}
        footer={
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setPaying(null)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-success" onClick={confirmPay}>
              Confirmar pago simulado
            </button>
          </>
        }
      >
        {paying && (
          <p className="mb-0">
            Se simulará el pago de <strong>{formatCOP(paying.saldo)}</strong>. No hay cobro real.
          </p>
        )}
      </Modal>
    </>
  )
}
