import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAdminLteCitizen } from '@/adminlte/useAdminLteCitizen'
import { useSession } from '@/auth/SessionContext'
import { CitizenUserMenu } from '@/components/shell/TopbarControls'
import { citizenServices } from '@/data/citizenPortal'
import { currentEntity } from '@/data/entity'

export function CitizenLayout() {
  useAdminLteCitizen()
  const { role, signedIn } = useSession()
  const staffSession = signedIn && role?.consoleAccess

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
                aria-label="Alternar menú"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-list" />
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <span className="nav-link disabled">Portal ciudadano</span>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {staffSession && (
              <li className="nav-item">
                <Link to="/app/dashboard" className="nav-link">
                  Consola funcionarios
                </Link>
              </li>
            )}
            <CitizenUserMenu />
          </ul>
        </div>
      </nav>

      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <Link to="/ciudadano" className="brand-link">
            <span className="brand-image opacity-75 me-2">
              <i className="bi bi-building" />
            </span>
            <span className="brand-text fw-light">{currentEntity.name}</span>
          </Link>
        </div>
        <div className="sidebar-wrapper">
          <nav className="mt-2" aria-label="Servicios ciudadanos">
            <ul className="nav sidebar-menu flex-column" role="menu">
              <li className="nav-item">
                <NavLink
                  to="/ciudadano"
                  end
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  <i className="nav-icon bi bi-speedometer2" />
                  <p>Inicio</p>
                </NavLink>
              </li>
              {citizenServices.map((service) => (
                <li key={service.slug} className="nav-item">
                  <NavLink
                    to={service.to}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    <i className={`nav-icon ${service.iconClass}`} />
                    <p>{service.title}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">Demo · SelvaTic</div>
        <strong>{currentEntity.name}</strong> — Portal ciudadano (AdminLTE 4)
      </footer>
    </div>
  )
}
