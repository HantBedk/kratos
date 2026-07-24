import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { SidebarNav } from '@/components/SidebarNav'
import {
  GlobalSearch,
  NotificationsMenu,
  UserMenu,
} from '@/components/shell/TopbarControls'
import { Modal } from '@/components/ui/Modal'
import { currentEntity } from '@/data/entity'

function breadcrumbFromPath(pathname: string) {
  if (pathname.includes('/dashboard')) return 'Dashboard gerencial'
  if (pathname.includes('/modulos/')) {
    const slug = pathname.split('/modulos/')[1]
    return slug?.replace(/-/g, ' ') ?? 'Módulo'
  }
  return 'Consola'
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [entityOpen, setEntityOpen] = useState(false)
  const location = useLocation()
  const crumb = breadcrumbFromPath(location.pathname)

  return (
    <div className="app-atmosphere min-h-screen">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[var(--sidebar-width)] flex-col bg-[var(--bg-sidebar)] text-[var(--text-on-dark)] transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-[var(--topbar-height)] items-center justify-between px-4">
            <BrandMark to="/app/dashboard" inverted />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg text-[var(--text-on-dark)] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pb-3">
            <button
              type="button"
              onClick={() => setEntityOpen(true)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left transition-colors hover:bg-white/10"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-on-dark-muted)]">
                Entidad demo
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-on-dark)]">{currentEntity.name}</p>
              <p className="mt-1 text-[11px] text-[var(--text-on-dark-muted)]">Clic para ver datos</p>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <SidebarNav />
          </div>

          <div className="border-t border-white/10 p-4">
            <Link
              to="/ciudadano"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-white/10"
            >
              Ver portal ciudadano
            </Link>
          </div>
        </aside>

        {mobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            aria-label="Cerrar overlay"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-[var(--topbar-height)] items-center gap-2 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] px-3 backdrop-blur-xl md:gap-3 md:px-6">
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text)] lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden min-w-0 shrink-0 lg:block lg:max-w-[14rem] xl:max-w-[18rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                Consola institucional
              </p>
              <p className="truncate text-sm font-semibold capitalize text-[var(--text)]">{crumb}</p>
            </div>

            {/* Búsqueda: llena el hueco en móvil; en web queda a la izquierda */}
            <GlobalSearch />

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <NotificationsMenu />
              <UserMenu onOpenEntity={() => setEntityOpen(true)} />
            </div>
          </header>

          <main className="relative flex-1 px-4 py-6 md:px-6 md:py-8">
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
            <div className="relative mx-auto max-w-7xl animate-enter">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <Modal
        open={entityOpen}
        title={currentEntity.name}
        description="Entidad activa en esta sesión demo (multi-tenant)."
        onClose={() => setEntityOpen(false)}
        footer={
          <button
            type="button"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setEntityOpen(false)}
          >
            Entendido
          </button>
        }
      >
        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            ['NIT', currentEntity.nit],
            ['Categoría', currentEntity.category],
            ['Departamento', currentEntity.department],
            ['Vigencia', currentEntity.vigencia],
            ['Módulos activos', 'Suite completa (demo)'],
            ['Licencia', 'Uso SaaS · piloto'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] p-3">
              <dt className="text-xs font-semibold tracking-[0.1em] text-[var(--text-subtle)] uppercase">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</dd>
            </div>
          ))}
        </dl>
      </Modal>
    </div>
  )
}
