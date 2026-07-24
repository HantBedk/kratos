import { Link } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  citizenDebtByConcept,
  citizenDebtTotal,
  citizenPaidTotal,
  citizenServices,
  mockCertificates,
  mockCitizenPayments,
  mockCitizenPqrsd,
  mockExpediente,
  mockTaxObligations,
} from '@/data/citizenPortal'
import { formatCOP } from '@/lib/money'

export function CitizenHomePage() {
  const { role, signedIn } = useSession()
  const name =
    signedIn && role && !role.consoleAccess
      ? role.name.split(' ')[0]
      : mockExpediente.ciudadano.split(' ')[0]

  const debtTotal = citizenDebtTotal()
  const paidTotal = citizenPaidTotal()
  const byConcept = citizenDebtByConcept()
  const openDebts = mockTaxObligations.filter((d) => d.saldo > 0)
  const readyCerts = mockCertificates.filter((c) => c.estado === 'Aprobado').length
  const openPqrsd = mockCitizenPqrsd.filter((p) => p.estado !== 'Respondida').length

  return (
    <>
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
        <div>
          <p className="text-body-secondary text-uppercase small mb-1">Mi dashboard</p>
          <h1 className="h3 mb-0">Hola, {name}</h1>
        </div>
        <Link to="/ciudadano/impuestos" className="btn btn-primary">
          Pagar deudas <i className="bi bi-arrow-right-short" />
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-4 col-6">
          <div className="small-box text-bg-warning">
            <div className="inner">
              <h3>{formatCOP(debtTotal)}</h3>
              <p>Qué debes</p>
              <p className="small mb-0 opacity-75">
                {openDebts.length} concepto{openDebts.length === 1 ? '' : 's'} pendiente
                {openDebts.length === 1 ? '' : 's'}
              </p>
            </div>
            <i className="small-box-icon bi bi-wallet2" />
            <Link to="/ciudadano/impuestos" className="small-box-footer link-dark">
              Ver deudas <i className="bi bi-link-45deg" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-6">
          <div className="small-box text-bg-success">
            <div className="inner">
              <h3>{formatCOP(paidTotal)}</h3>
              <p>Ya pagaste</p>
              <p className="small mb-0 opacity-75">{mockCitizenPayments.length} pagos registrados</p>
            </div>
            <i className="small-box-icon bi bi-check-circle" />
            <Link to="/ciudadano/impuestos" className="small-box-footer link-light">
              Historial <i className="bi bi-link-45deg" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="small-box text-bg-primary">
            <div className="inner">
              <h3>
                {readyCerts} · {openPqrsd}
              </h3>
              <p>Certificados · peticiones</p>
            </div>
            <i className="small-box-icon bi bi-file-earmark-check" />
            <Link to="/ciudadano/certificados" className="small-box-footer link-light">
              Ver trámites <i className="bi bi-link-45deg" />
            </Link>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">Por concepto</h3>
          <Link to="/ciudadano/impuestos" className="btn btn-sm btn-outline-primary">
            Ver detalle
          </Link>
        </div>
        <div className="card-body">
          {byConcept.length === 0 ? (
            <div className="alert alert-success mb-0">Estás al día</div>
          ) : (
            <div className="row g-3">
              {byConcept.map((row) => (
                <div key={row.concepto} className="col-md-6">
                  <Link to="/ciudadano/impuestos" className="card h-100 text-decoration-none text-body">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="bi bi-cash-coin fs-3 text-warning" />
                        <StatusBadge tone="warning">Debe</StatusBadge>
                      </div>
                      <p className="mb-1 mt-2 text-body-secondary">
                        {row.concepto === 'Predial' ? 'Impuesto predial' : 'Industria y comercio'}
                      </p>
                      <h4 className="mb-0">{formatCOP(row.saldo)}</h4>
                      <small className="text-body-secondary">
                        {row.items} liquidación{row.items === 1 ? '' : 'es'}
                      </small>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-header">
              <h3 className="card-title">Detalle de lo que debes</h3>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {openDebts.map((d) => (
                  <li key={d.id} className="list-group-item d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">{d.concepto}</div>
                      <small className="text-body-secondary">
                        {d.referencia} · {d.vigencia}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">{formatCOP(d.saldo)}</div>
                      <StatusBadge tone={d.estadoTone}>{d.estado}</StatusBadge>
                    </div>
                  </li>
                ))}
                {openDebts.length === 0 && (
                  <li className="list-group-item text-body-secondary">Sin deudas</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-header">
              <h3 className="card-title">Pagos realizados</h3>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {mockCitizenPayments.map((p) => (
                  <li key={p.id} className="list-group-item d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">{p.concepto}</div>
                      <small className="text-body-secondary">
                        {p.fecha} · {p.canal}
                      </small>
                    </div>
                    <span className="fw-bold text-success">{formatCOP(p.valor)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">Más trámites</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {citizenServices.map((s) => (
              <div key={s.slug} className="col-6 col-md-4 col-lg">
                <Link to={s.to} className="btn btn-outline-secondary w-100 h-100 py-3">
                  <i className={`${s.iconClass} d-block fs-3 mb-2`} />
                  {s.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
