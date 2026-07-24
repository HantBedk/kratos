import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAdminLteConsole } from '@/adminlte/useAdminLteConsole'
import { useSession } from '@/auth/SessionContext'
import { SidebarNav } from '@/components/SidebarNav'
import {
  GlobalSearch,
  NotificationsMenu,
  UserMenu,
} from '@/components/shell/TopbarControls'
import { Modal } from '@/components/ui/Modal'
import { currentEntity } from '@/data/entity'
import { findModule } from '@/data/modules'

function breadcrumbFromPath(pathname: string) {
  if (pathname.includes('/dashboard')) {
    return { section: 'Consola', page: 'Dashboard' }
  }
  if (pathname.includes('/modulos/')) {
    const slug = pathname.split('/modulos/')[1]
    const mod = findModule(slug ?? '')
    return {
      section: 'Módulos',
      page: mod?.label ?? slug?.replace(/-/g, ' ') ?? 'Módulo',
    }
  }
  return { section: 'Consola', page: 'Inicio' }
}

export function AppShell() {
  useAdminLteConsole()
  const [entityOpen, setEntityOpen] = useState(false)
  const location = useLocation()
  const crumb = breadcrumbFromPath(location.pathname)
  const { role } = useSession()

  return (
    <div className="app-wrapper">
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-lte-toggle="sidebar"
                href="#"
                role="button"
                aria-label="Alternar menú lateral"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-list" />
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <span className="nav-link disabled">Consola · {role?.label ?? 'Demo'}</span>
            </li>
          </ul>

          <div className="d-none d-lg-flex flex-grow-1 justify-content-center px-3" style={{ maxWidth: '28rem' }}>
            <GlobalSearch />
          </div>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-lg-none">
              <div className="px-2 py-1" style={{ minWidth: '12rem' }}>
                <GlobalSearch />
              </div>
            </li>
            <NotificationsMenu />
            <UserMenu onOpenEntity={() => setEntityOpen(true)} />
          </ul>
        </div>
      </nav>

      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <Link to="/app/dashboard" className="brand-link">
            <span className="brand-image-icon brand-image" aria-hidden>
              <i className="bi bi-building" />
            </span>
            <span className="brand-text fw-light">{currentEntity.name}</span>
          </Link>
        </div>

        <div className="sidebar-wrapper">
          <div className="px-3 pb-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-light w-100 text-start"
              onClick={() => setEntityOpen(true)}
            >
              <span className="d-block small text-uppercase opacity-75">Entidad demo</span>
              <span className="fw-semibold">{currentEntity.name}</span>
              <span className="d-block small">Perfil: {role?.label ?? '—'}</span>
            </button>
          </div>
          <nav className="mt-2" aria-label="Módulos del ERP">
            <SidebarNav />
          </nav>
          <div className="px-3 py-3 border-top mt-auto">
            <Link to="/ciudadano" className="btn btn-outline-primary btn-sm w-100">
              Portal ciudadano
            </Link>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">{crumb.page}</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">{crumb.section}</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {crumb.page}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid kratos-panel">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">http://localhost:5173</div>
        <strong>Kratos · SelvaTic</strong> — AdminLTE 4
      </footer>

      <Modal
        open={entityOpen}
        title={currentEntity.name}
        description="Entidad activa en esta sesión demo (multi-tenant)."
        onClose={() => setEntityOpen(false)}
        footer={
          <button type="button" className="btn btn-primary" onClick={() => setEntityOpen(false)}>
            Entendido
          </button>
        }
      >
        <div className="row g-3">
          {[
            ['NIT', currentEntity.nit],
            ['Categoría', currentEntity.category],
            ['Departamento', currentEntity.department],
            ['Vigencia', currentEntity.vigencia],
            ['Perfil activo', role?.label ?? '—'],
            ['Licencia', 'Uso SaaS · piloto'],
          ].map(([label, value]) => (
            <div key={label} className="col-sm-6">
              <div className="border rounded p-3 h-100">
                <div className="small text-body-secondary text-uppercase">{label}</div>
                <div className="fw-semibold">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
