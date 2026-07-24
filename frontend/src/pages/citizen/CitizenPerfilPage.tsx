import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { useSession } from '@/auth/SessionContext'
import {
  citizenDebtTotal,
  citizenPaidTotal,
  citizenProfile,
  mockCertificates,
  mockCitizenPqrsd,
} from '@/data/citizenPortal'
import { formatCOP } from '@/lib/money'

type Tab = 'info' | 'edit'

export function CitizenPerfilPage() {
  const { role, signedIn } = useSession()
  const citizenSession = signedIn && role && !role.consoleAccess

  // La cédula es inmutable; el resto arranca del perfil demo (o de la sesión).
  const base = useMemo(
    () => ({
      ...citizenProfile,
      nombre: citizenSession ? role.name : citizenProfile.nombre,
      email: citizenSession ? role.email : citizenProfile.email,
      iniciales: citizenSession ? role.initials : citizenProfile.iniciales,
    }),
    [citizenSession, role],
  )

  const [tab, setTab] = useState<Tab>('info')
  const [form, setForm] = useState(base)
  const [flash, setFlash] = useState<string | null>(null)

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // La cédula nunca cambia (campo de solo lectura); no se persiste en la demo.
    setFlash('Perfil actualizado (demo). El número de cédula no cambia.')
    setTab('info')
  }

  const tramites = mockCitizenPqrsd.length + mockCertificates.length

  return (
    <>
      <CitizenPageHeader
        eyebrow="Mi cuenta"
        title="Perfil del ciudadano"
        description="Consulta y actualiza tus datos de contacto. Tu número de cédula es fijo."
        iconClass="bi bi-person-badge"
      />

      <div className="row g-3">
        {/* Columna izquierda: tarjeta de perfil */}
        <div className="col-lg-4">
          <div className="card card-primary card-outline mb-3">
            <div className="card-body text-center">
              <div
                className="mx-auto mb-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: 104, height: 104, fontSize: '2.5rem', fontWeight: 600 }}
                aria-hidden
              >
                {base.iniciales}
              </div>
              <h3 className="h5 mb-0">{form.nombre}</h3>
              <p className="text-body-secondary mb-3">Ciudadano · {form.municipio}</p>

              <ul className="list-group list-group-flush text-start mb-3">
                <li className="list-group-item d-flex justify-content-between px-0">
                  <b>Trámites</b>
                  <span className="text-body-secondary">{tramites}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <b>Deuda actual</b>
                  <span className="text-body-secondary">{formatCOP(citizenDebtTotal())}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <b>Total pagado</b>
                  <span className="text-body-secondary">{formatCOP(citizenPaidTotal())}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <b>Miembro desde</b>
                  <span className="text-body-secondary">{citizenProfile.miembroDesde}</span>
                </li>
              </ul>

              <Link to="/ciudadano/expediente" className="btn btn-primary d-block">
                <i className="bi bi-clock-history me-1" />
                Ver mi expediente
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha: pestañas Información / Editar */}
        <div className="col-lg-8">
          <div className="card card-primary card-outline">
            <div className="card-header p-0 border-bottom-0">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className={`nav-link${tab === 'info' ? ' active' : ''}`}
                    onClick={() => setTab('info')}
                    aria-selected={tab === 'info'}
                  >
                    <i className="bi bi-card-text me-1" />
                    Información
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className={`nav-link${tab === 'edit' ? ' active' : ''}`}
                    onClick={() => setTab('edit')}
                    aria-selected={tab === 'edit'}
                  >
                    <i className="bi bi-pencil-square me-1" />
                    Editar perfil
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {flash && tab === 'info' && (
                <div className="alert alert-success" role="status">
                  <i className="bi bi-check-circle me-1" />
                  {flash}
                </div>
              )}

              {tab === 'info' ? (
                <dl className="row mb-0">
                  <dt className="col-sm-4">Número de cédula</dt>
                  <dd className="col-sm-8">
                    {citizenProfile.cedula}
                    <span className="badge text-bg-secondary ms-2">
                      <i className="bi bi-lock-fill me-1" />
                      Fijo
                    </span>
                  </dd>

                  <dt className="col-sm-4">Nombre completo</dt>
                  <dd className="col-sm-8">{form.nombre}</dd>

                  <dt className="col-sm-4">Correo electrónico</dt>
                  <dd className="col-sm-8">{form.email}</dd>

                  <dt className="col-sm-4">Teléfono</dt>
                  <dd className="col-sm-8">{form.telefono}</dd>

                  <dt className="col-sm-4">Dirección</dt>
                  <dd className="col-sm-8">{form.direccion}</dd>

                  <dt className="col-sm-4">Municipio</dt>
                  <dd className="col-sm-8 mb-0">{form.municipio}</dd>
                </dl>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Número de cédula</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-lock-fill" />
                        </span>
                        <input
                          className="form-control"
                          value={citizenProfile.cedula}
                          readOnly
                          disabled
                          aria-describedby="cedulaHelp"
                        />
                      </div>
                      <div id="cedulaHelp" className="form-text">
                        El número de cédula no se puede cambiar.
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Nombre completo</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        value={form.nombre}
                        onChange={set('nombre')}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Correo electrónico</label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={set('email')}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Teléfono</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        value={form.telefono}
                        onChange={set('telefono')}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Dirección</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        value={form.direccion}
                        onChange={set('direccion')}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Municipio</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        value={form.municipio}
                        onChange={set('municipio')}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-9 offset-sm-3">
                      <button type="submit" className="btn btn-primary">
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => {
                          setForm(base)
                          setTab('info')
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
