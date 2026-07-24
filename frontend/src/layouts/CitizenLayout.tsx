import { Link, NavLink, Outlet } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { citizenServices } from '@/data/citizenPortal'
import { ThemeToggle } from '@/theme/ThemeToggle'

export function CitizenLayout() {
  return (
    <div className="app-atmosphere min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" />
      <div className="relative mx-auto max-w-5xl px-4 py-6 md:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <BrandMark to="/ciudadano" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-2 text-sm font-semibold text-[var(--text)] sm:inline-flex"
            >
              Consola funcionarios
            </Link>
          </div>
        </header>

        <nav
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          aria-label="Servicios del portal"
        >
          <NavLink
            to="/ciudadano"
            end
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`
            }
          >
            Inicio
          </NavLink>
          {citizenServices.map((service) => (
            <NavLink
              key={service.slug}
              to={service.to}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`
              }
            >
              {service.title}
            </NavLink>
          ))}
        </nav>

        <Outlet />
      </div>
    </div>
  )
}
