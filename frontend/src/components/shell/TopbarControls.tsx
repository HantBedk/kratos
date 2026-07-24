import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { Modal } from '@/components/ui/Modal'
import { Field, inputClass, selectClass } from '@/components/ui/Field'
import { citizenProfile } from '@/data/citizenPortal'
import {
  notificationsForRole,
  searchCatalog,
  type AppNotification,
  type SearchHit,
} from '@/data/shellData'
import { useTheme } from '@/theme/ThemeProvider'

function useClickOutside(ref: RefObject<HTMLElement | null>, onOutside: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onOutside, active])
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useClickOutside(wrapRef, () => setOpen(false), open)

  const hits = useMemo(() => searchCatalog(query), [query])

  const go = (hit: SearchHit) => {
    if (hit.to) navigate(hit.to)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className="position-relative flex-grow-1 kratos-search">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" aria-hidden />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar módulos, contratos, predios…"
          className="form-control"
          aria-label="Búsqueda global"
        />
      </div>
      {open && query.trim().length > 0 && (
        <div className="dropdown-menu show kratos-search-menu shadow">
          {hits.length === 0 ? (
            <span className="dropdown-item-text text-body-secondary">Sin resultados para “{query}”</span>
          ) : (
            hits.map((hit) => (
              <button key={hit.id} type="button" className="dropdown-item" onClick={() => go(hit)}>
                <span className="badge text-bg-secondary me-2">{hit.kind}</span>
                <strong>{hit.title}</strong>
                <div className="small text-body-secondary">{hit.subtitle}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export function NotificationsMenu() {
  const { role } = useSession()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<AppNotification[]>(() => notificationsForRole(role?.id))
  const ref = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setItems(notificationsForRole(role?.id))
  }, [role?.id])

  useClickOutside(ref as RefObject<HTMLElement | null>, () => setOpen(false), open)

  const unread = items.filter((n) => !n.read).length
  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  const openItem = (n: AppNotification) => {
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
    setOpen(false)
    if (n.to) navigate(n.to)
  }

  return (
    <li className="nav-item dropdown" ref={ref}>
      <button
        type="button"
        className={`nav-link${open ? ' show' : ''}`}
        aria-expanded={open}
        aria-label="Notificaciones"
        onClick={() => setOpen((v) => !v)}
      >
        <i className="bi bi-bell-fill" />
        {unread > 0 && <span className="navbar-badge badge text-bg-warning">{unread}</span>}
      </button>
      <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-end${open ? ' show' : ''}`} style={{ right: 0, left: 'auto' }}>
        <span className="dropdown-item dropdown-header">
          {unread} sin leer · {role?.label ?? 'Demo'}
        </span>
        <div className="dropdown-divider" />
        {items.length === 0 && (
          <span className="dropdown-item-text text-body-secondary">Sin alertas para este perfil.</span>
        )}
        {items.map((n) => (
          <button key={n.id} type="button" className="dropdown-item" onClick={() => openItem(n)}>
            <div className="d-flex">
              <div className="flex-grow-1">
                <h3 className="dropdown-item-title">
                  {n.title}
                  {!n.read && <span className="float-end badge text-bg-danger">nuevo</span>}
                </h3>
                <p className="text-sm mb-0">{n.body}</p>
                <p className="text-sm text-body-secondary mb-0">
                  <i className="bi bi-clock-history me-1" />
                  {n.time}
                </p>
              </div>
            </div>
          </button>
        ))}
        <div className="dropdown-divider" />
        <button type="button" className="dropdown-item dropdown-footer" onClick={markAll}>
          Marcar todas como leídas
        </button>
      </div>
    </li>
  )
}

export function UserMenu({ onOpenEntity }: { onOpenEntity?: () => void }) {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const ref = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { role, logout: clearSession } = useSession()

  useClickOutside(ref as RefObject<HTMLElement | null>, () => setOpen(false), open)

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2500)
  }

  const logout = () => {
    setOpen(false)
    clearSession()
    navigate('/login')
  }

  const displayName = role?.name ?? 'Funcionario demo'
  const displayEmail = role?.email ?? 'funcionario@alcaldia.gov.co'
  const displayRole = role?.label ?? 'Demo'
  const initials = role?.initials ?? 'ST'

  return (
    <>
      {toast && (
        <div className="toast show position-fixed bottom-0 end-0 m-3" role="status" style={{ zIndex: 1080 }}>
          <div className="toast-body">{toast}</div>
        </div>
      )}

      <li className="nav-item dropdown user-menu" ref={ref}>
        <button
          type="button"
          className={`nav-link dropdown-toggle${open ? ' show' : ''}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="d-none d-md-inline me-1">{displayRole}</span>
          <span className="badge text-bg-primary rounded-circle">{initials}</span>
        </button>
        <ul className={`dropdown-menu dropdown-menu-end${open ? ' show' : ''}`} style={{ right: 0, left: 'auto' }}>
          <li className="user-header text-bg-primary">
            <p className="mb-0">
              {displayName}
              <small className="d-block opacity-75">{displayEmail}</small>
            </p>
          </li>
          <li>
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); setProfileOpen(true) }}>
              <i className="bi bi-person me-2" /> Mi perfil
            </button>
          </li>
          <li>
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); setSettingsOpen(true) }}>
              <i className="bi bi-gear me-2" /> Configuración
            </button>
          </li>
          <li>
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); onOpenEntity?.() }}>
              <i className="bi bi-building me-2" /> Datos de la entidad
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => {
                toggleTheme()
                showToast(isDark ? 'Tema claro activado' : 'Tema oscuro activado')
              }}
            >
              <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'} me-2`} />
              {isDark ? 'Tema: modo día' : 'Tema: modo noche'}
            </button>
          </li>
          <li>
            <button type="button" className="dropdown-item" onClick={() => { setOpen(false); setHelpOpen(true) }}>
              <i className="bi bi-question-circle me-2" /> Ayuda
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button type="button" className="dropdown-item text-danger" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2" /> Cerrar sesión
            </button>
          </li>
        </ul>
      </li>

      <Modal
        open={profileOpen}
        title="Mi perfil"
        description="Datos del funcionario demo (solo sesión local)."
        onClose={() => setProfileOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setProfileOpen(false)}>
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setProfileOpen(false)
                showToast('Perfil actualizado (demo)')
              }}
            >
              Guardar cambios
            </button>
          </>
        }
      >
        <Field label="Nombre completo">
          <input className={inputClass} defaultValue={displayName} key={displayName} />
        </Field>
        <Field label="Correo institucional">
          <input className={inputClass} defaultValue={displayEmail} key={displayEmail} />
        </Field>
        <Field label="Perfil demo">
          <input className={inputClass} defaultValue={displayRole} readOnly />
        </Field>
      </Modal>

      <Modal
        open={settingsOpen}
        title="Configuración de cuenta"
        description="Preferencias de la consola para esta sesión."
        onClose={() => setSettingsOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSettingsOpen(false)}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSettingsOpen(false)
                showToast('Preferencias guardadas (demo)')
              }}
            >
              Guardar
            </button>
          </>
        }
      >
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="mailAlerts" defaultChecked />
          <label className="form-check-label" htmlFor="mailAlerts">
            Alertas por correo
          </label>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="soundAlerts" />
          <label className="form-check-label" htmlFor="soundAlerts">
            Sonido de notificaciones
          </label>
        </div>
        <Field label="Densidad de tablas">
          <select className={selectClass} defaultValue="comfortable">
            <option value="comfortable">Cómoda</option>
            <option value="compact">Compacta</option>
          </select>
        </Field>
      </Modal>

      <Modal open={helpOpen} title="Ayuda rápida" description="Atajos de la consola demo." onClose={() => setHelpOpen(false)}>
        <ul className="mb-0">
          <li>Usa la búsqueda para ir a módulos, contratos o predios.</li>
          <li>La campana muestra alertas filtradas por rol.</li>
          <li>El tema día/noche está en el menú de usuario.</li>
          <li>Cerrar sesión vuelve a la pantalla de ingreso.</li>
        </ul>
      </Modal>
    </>
  )
}

/**
 * Menú de usuario del portal ciudadano: editar perfil, cambiar tema y cerrar
 * sesión (o "Soy funcionario" cuando se navega sin sesión).
 */
export function CitizenUserMenu() {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const ref = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { role, signedIn, logout: clearSession } = useSession()

  useClickOutside(ref as RefObject<HTMLElement | null>, () => setOpen(false), open)

  const citizenSession = signedIn && role && !role.consoleAccess
  const name = citizenSession ? role.name : citizenProfile.nombre
  const email = citizenSession ? role.email : citizenProfile.email
  const initials = citizenSession ? role.initials : citizenProfile.iniciales

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2500)
  }

  const logout = () => {
    setOpen(false)
    clearSession()
    navigate('/login')
  }

  return (
    <>
      {toast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          role="status"
          style={{ zIndex: 1080 }}
        >
          <div className="toast-body">{toast}</div>
        </div>
      )}

      <li className="nav-item dropdown user-menu" ref={ref}>
        <button
          type="button"
          className={`nav-link dropdown-toggle${open ? ' show' : ''}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="d-none d-md-inline me-1">{name.split(' ')[0]}</span>
          <span className="badge text-bg-primary rounded-circle">{initials}</span>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end${open ? ' show' : ''}`}
          style={{ right: 0, left: 'auto' }}
        >
          <li className="user-header text-bg-primary">
            <p className="mb-0">
              {name}
              <small className="d-block opacity-75">{email}</small>
            </p>
          </li>
          <li>
            <Link
              to="/ciudadano/perfil"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <i className="bi bi-person-badge me-2" /> Editar perfil
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => {
                toggleTheme()
                showToast(isDark ? 'Tema claro activado' : 'Tema oscuro activado')
              }}
            >
              <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'} me-2`} />
              {isDark ? 'Tema: modo día' : 'Tema: modo noche'}
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          {citizenSession ? (
            <li>
              <button type="button" className="dropdown-item text-danger" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2" /> Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="dropdown-item" onClick={() => setOpen(false)}>
                <i className="bi bi-shield-lock me-2" /> Soy funcionario
              </Link>
            </li>
          )}
        </ul>
      </li>
    </>
  )
}

/** Evita warning de ReactNode no usado en exports del archivo. */
export type _ShellNode = ReactNode
