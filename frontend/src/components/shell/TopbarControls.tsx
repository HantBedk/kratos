import {
  Bell,
  Building2,
  CheckCheck,
  ChevronDown,
  HelpCircle,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { Field, inputClass, selectClass } from '@/components/ui/Field'
import {
  initialNotifications,
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
    <div ref={wrapRef} className="relative min-w-0 flex-1 lg:max-w-md lg:flex-none">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Buscar…"
        className="h-10 w-full rounded-full border border-[var(--border)] bg-[var(--surface-solid)] pr-4 pl-10 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-subtle)] focus:border-[var(--border-strong)]"
        aria-label="Búsqueda global"
      />
      {open && query.trim().length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-lg)] lg:w-[28rem]">
          {hits.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">Sin resultados para “{query}”</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {hits.map((hit) => (
                <li key={hit.id}>
                  <button
                    type="button"
                    onClick={() => go(hit)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[var(--bg-muted)]"
                  >
                    <span className="mt-0.5 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--accent)] uppercase">
                      {hit.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[var(--text)]">{hit.title}</span>
                      <span className="block truncate text-xs text-[var(--text-muted)]">{hit.subtitle}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export function NotificationsMenu() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<AppNotification[]>(initialNotifications)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useClickOutside(ref, () => setOpen(false), open)

  const unread = items.filter((n) => !n.read).length

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  const openItem = (n: AppNotification) => {
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
    setOpen(false)
    if (n.to) navigate(n.to)
  }

  const toneDot = {
    info: 'bg-[var(--info)]',
    warning: 'bg-[var(--warning)]',
    danger: 'bg-[var(--danger)]',
    success: 'bg-[var(--success)]',
  }

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text)]"
        aria-label="Notificaciones"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--cta)] px-1 text-[10px] font-bold text-[var(--cta-text)]">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop móvil: cierra al tocar fuera y evita scroll raro */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/25 md:hidden"
            aria-label="Cerrar notificaciones"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed top-[var(--topbar-height)] right-0 left-0 z-50 flex max-h-[min(70dvh,calc(100dvh-var(--topbar-height)))] w-full flex-col overflow-hidden border-b border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-lg)] md:absolute md:top-[calc(100%+8px)] md:right-0 md:left-auto md:w-[min(100vw-2rem,22rem)] md:rounded-2xl md:border"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Notificaciones</p>
                <p className="text-xs text-[var(--text-muted)]">{unread} sin leer</p>
              </div>
              <button
                type="button"
                onClick={markAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)]"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Marcar todas
              </button>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {items.map((n) => (
                <li key={n.id} className="border-b border-[var(--border)] last:border-0">
                  <button
                    type="button"
                    onClick={() => openItem(n)}
                    className={`flex w-full gap-3 px-4 py-3 text-left hover:bg-[var(--bg-muted)] ${
                      n.read ? 'opacity-70' : ''
                    }`}
                  >
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${toneDot[n.tone]}`} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[var(--text)]">{n.title}</span>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--text-muted)]">{n.body}</span>
                      <span className="mt-1 block text-[11px] text-[var(--text-subtle)]">{n.time}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export function UserMenu({ onOpenEntity }: { onOpenEntity?: () => void }) {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  useClickOutside(ref, () => setOpen(false), open)

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2500)
  }

  const logout = () => {
    setOpen(false)
    navigate('/login')
  }

  return (
    <>
      {toast && (
        <div className="fixed right-4 bottom-4 z-[60] max-w-[calc(100vw-2rem)] rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3 text-sm font-semibold shadow-[var(--shadow-md)]">
          {toast}
        </div>
      )}

      <div className="relative shrink-0" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-solid)] py-1 pr-2 pl-1 sm:pr-3"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
            ST
          </span>
          <span className="hidden text-sm font-semibold text-[var(--text)] sm:inline">Funcionario demo</span>
          <ChevronDown className={`h-4 w-4 text-[var(--text-subtle)] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute top-[calc(100%+8px)] right-0 z-50 w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-lg)]"
          >
            <div className="border-b border-[var(--border)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text)]">Funcionario demo</p>
              <p className="text-xs text-[var(--text-muted)]">funcionario@alcaldia.gov.co</p>
              <p className="mt-1 text-[11px] font-semibold text-[var(--accent)]">Rol: Hacienda · Demo</p>
            </div>
            <ul className="py-1">
              <MenuItem
                icon={<UserRound className="h-4 w-4" />}
                label="Mi perfil"
                onClick={() => {
                  setOpen(false)
                  setProfileOpen(true)
                }}
              />
              <MenuItem
                icon={<Settings className="h-4 w-4" />}
                label="Configuración de cuenta"
                onClick={() => {
                  setOpen(false)
                  setSettingsOpen(true)
                }}
              />
              <MenuItem
                icon={<Building2 className="h-4 w-4" />}
                label="Datos de la entidad"
                onClick={() => {
                  setOpen(false)
                  onOpenEntity?.()
                }}
              />
              <MenuItem
                icon={isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                label={isDark ? 'Tema: modo día' : 'Tema: modo noche'}
                onClick={() => {
                  toggleTheme()
                  showToast(isDark ? 'Tema claro activado' : 'Tema oscuro activado')
                }}
              />
              <MenuItem
                icon={<HelpCircle className="h-4 w-4" />}
                label="Ayuda / atajos"
                onClick={() => {
                  setOpen(false)
                  setHelpOpen(true)
                }}
              />
              <li className="my-1 border-t border-[var(--border)]" />
              <MenuItem icon={<LogOut className="h-4 w-4" />} label="Cerrar sesión" danger onClick={logout} />
            </ul>
          </div>
        )}
      </div>

      <Modal
        open={profileOpen}
        title="Mi perfil"
        description="Datos del funcionario demo (solo sesión local)."
        onClose={() => setProfileOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
              onClick={() => setProfileOpen(false)}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                setProfileOpen(false)
                showToast('Perfil actualizado (demo)')
              }}
            >
              Guardar cambios
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <Field label="Nombre completo">
            <input className={inputClass} defaultValue="Funcionario Demo SelvaTic" />
          </Field>
          <Field label="Correo institucional">
            <input className={inputClass} defaultValue="funcionario@alcaldia.gov.co" />
          </Field>
          <Field label="Dependencia">
            <select className={selectClass} defaultValue="hacienda">
              <option value="hacienda">Secretaría de Hacienda</option>
              <option value="contratacion">Contratación</option>
              <option value="planeacion">Planeación</option>
            </select>
          </Field>
          <Field label="Cargo">
            <input className={inputClass} defaultValue="Analista financiero" />
          </Field>
        </div>
      </Modal>

      <Modal
        open={settingsOpen}
        title="Configuración de cuenta"
        description="Preferencias de la consola para esta sesión."
        onClose={() => setSettingsOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
              onClick={() => setSettingsOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                setSettingsOpen(false)
                showToast('Preferencias guardadas (demo)')
              }}
            >
              Guardar
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
            <span className="text-sm font-semibold text-[var(--text)]">Alertas por correo</span>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
            <span className="text-sm font-semibold text-[var(--text)]">Sonido de notificaciones</span>
            <input type="checkbox" className="h-4 w-4" />
          </label>
          <Field label="Densidad de tablas">
            <select className={selectClass} defaultValue="comfortable">
              <option value="comfortable">Cómoda</option>
              <option value="compact">Compacta</option>
            </select>
          </Field>
          <Field label="Idioma">
            <select className={selectClass} defaultValue="es">
              <option value="es">Español (Colombia)</option>
            </select>
          </Field>
        </div>
      </Modal>

      <Modal
        open={helpOpen}
        title="Ayuda rápida"
        description="Atajos y tip de la consola demo."
        onClose={() => setHelpOpen(false)}
      >
        <ul className="space-y-2 text-sm text-[var(--text-muted)]">
          <li>• Usa la búsqueda para ir a módulos, contratos o predios.</li>
          <li>• La campana muestra alertas; clic abre el módulo relacionado.</li>
          <li>• El tema día/noche está en el menú de usuario.</li>
          <li>• Cerrar sesión vuelve a la pantalla de ingreso.</li>
        </ul>
      </Modal>
    </>
  )
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <li>
      <button
        type="button"
        role="menuitem"
        onClick={onClick}
        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold hover:bg-[var(--bg-muted)] ${
          danger ? 'text-[var(--danger)]' : 'text-[var(--text)]'
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  )
}
