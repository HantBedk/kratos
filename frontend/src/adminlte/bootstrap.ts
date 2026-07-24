/**
 * AdminLTE v4 + Bootstrap 5 — único CSS/JS de UI del frontend.
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { PushMenu } from 'admin-lte'

// `sidebar-expand-md`: el sidebar permanece fijo desde 768px (no 992px de
// `lg`). Evita que portátiles con escalado 125–150% (ancho CSS < 992px) caigan
// al modo móvil/offcanvas y se vean "como en un teléfono" en el escritorio.
const LAYOUT_BODY = ['layout-fixed', 'sidebar-expand-md', 'bg-body-tertiary'] as const
const LOGIN_BODY = ['login-page', 'bg-body-secondary'] as const
const STATE_BODY = [
  'sidebar-open',
  'sidebar-collapse',
  'sidebar-mini',
  'app-loaded',
  'hold-transition',
] as const

export function applyConsoleBodyClasses() {
  document.body.classList.remove(...LOGIN_BODY)
  document.body.classList.add(...LAYOUT_BODY)
}

export function clearConsoleBodyClasses() {
  document.body.classList.remove(...LAYOUT_BODY, ...STATE_BODY)
}

/** Mismo layout AdminLTE que la consola (portal ciudadano). */
export const applyCitizenBodyClasses = applyConsoleBodyClasses
export const clearCitizenBodyClasses = clearConsoleBodyClasses

export function applyLoginBodyClasses() {
  document.body.classList.remove(...LAYOUT_BODY, ...STATE_BODY)
  document.body.classList.add(...LOGIN_BODY)
}

export function clearLoginBodyClasses() {
  document.body.classList.remove(...LOGIN_BODY)
}

/**
 * Umbral (px) a partir del cual el sidebar se muestra fijo. Debe coincidir con
 * la clase CSS `sidebar-expand-md` (Bootstrap: `md` → max 767.98px es móvil).
 */
export const SIDEBAR_BREAKPOINT = 767.98

/**
 * Inicializa el sidebar AdminLTE en una SPA y devuelve su función de limpieza.
 *
 * AdminLTE detecta el breakpoint leyendo `::before { content }` de la clase
 * `sidebar-expand-*`, pero esa regla vive dentro de un `@media` y solo es
 * legible por debajo del umbral; en escritorio devuelve "none" y PushMenu cae
 * a su default (991.98), tratando como móvil todo lo <992px. Por eso pasamos el
 * breakpoint explícito. Además, AdminLTE cablea la lógica responsive en
 * `DOMContentLoaded` (que no aplica en SPA, el sidebar monta después), así que
 * registramos aquí el listener de `matchMedia` y lo liberamos al desmontar.
 */
export function initAdminLteSidebar(): () => void {
  const sidebar = document.querySelector<HTMLElement>('.app-sidebar')
  if (!sidebar) return () => {}

  const pushMenu = PushMenu.getOrCreateInstance(sidebar, {
    sidebarBreakpoint: SIDEBAR_BREAKPOINT,
  })
  pushMenu.init()

  const mediaQuery = window.matchMedia(`(max-width: ${SIDEBAR_BREAKPOINT}px)`)
  const handleBreakpointChange = () => pushMenu.updateStateByResponsiveLogic()
  mediaQuery.addEventListener('change', handleBreakpointChange)

  return () => mediaQuery.removeEventListener('change', handleBreakpointChange)
}
