import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { authenticateDemo, DEMO_PASSWORD, demoRoles } from '@/data/demoRoles'

export function LoginPage() {
  const navigate = useNavigate()
  const { enterAs } = useSession()
  const [identifier, setIdentifier] = useState('101')
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState<string | null>(null)
  const [hintsOpen, setHintsOpen] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = authenticateDemo(identifier, password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setError(null)
    enterAs(result.role.id)
    navigate(result.role.home)
  }

  return (
    <>
      <div className="login-logo">
        <Link to="/login">
          <b>Kratos</b> · SelvaTic
        </Link>
      </div>

      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Ingresa a la consola institucional</p>

          <form onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="loginId">
              Cédula o correo
            </label>
            <div className="input-group mb-3">
              <input
                id="loginId"
                type="text"
                className="form-control"
                placeholder="Cédula o correo"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value)
                  setError(null)
                }}
                autoComplete="username"
                required
              />
              <div className="input-group-text">
                <span className="bi bi-person" />
              </div>
            </div>

            <label className="visually-hidden" htmlFor="loginPassword">
              Contraseña
            </label>
            <div className="input-group mb-3">
              <input
                id="loginPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(null)
                }}
                autoComplete="current-password"
                required
              />
              <div className="input-group-text">
                <span className="bi bi-lock-fill" />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <div className="row mb-3">
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Entrar
                </button>
              </div>
            </div>
          </form>

          <p className="mb-1">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setHintsOpen((v) => !v)}
            >
              {hintsOpen ? 'Ocultar cuentas demo' : 'Ver cédulas y correos demo'}
            </button>
          </p>

          {hintsOpen && (
            <div className="border rounded p-2 mb-2 small" style={{ maxHeight: '11rem', overflowY: 'auto' }}>
              <p className="mb-2">
                Contraseña: <code>{DEMO_PASSWORD}</code>
              </p>
              <ul className="list-unstyled mb-0">
                {demoRoles.map((role) => (
                  <li key={role.id} className="mb-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary w-100 text-start"
                      onClick={() => {
                        setIdentifier(role.cedula)
                        setPassword(DEMO_PASSWORD)
                        setError(null)
                      }}
                    >
                      <strong>
                        CC {role.cedula} · {role.label}
                      </strong>
                      <span className="d-block text-body-secondary">{role.email}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mb-0 text-center small">
            <Link to="/ciudadano">Ir al portal ciudadano (sin sesión)</Link>
          </p>
          <p className="mt-2 mb-0 text-center text-body-secondary small">
            Licencia digital de uso · ERP municipal
          </p>
        </div>
      </div>
    </>
  )
}
