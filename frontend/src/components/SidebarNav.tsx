import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { filterGroupsForRole } from '@/data/demoRoles'
import { findModuleGroup } from '@/data/modules'

function closedGroups(groupIds: string[]): Record<string, boolean> {
  return Object.fromEntries(groupIds.map((id) => [id, false]))
}

function activeGroupIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/app\/modulos\/([^/]+)/)
  if (!match) return null
  return findModuleGroup(match[1])?.id ?? null
}

export function SidebarNav() {
  const location = useLocation()
  const { role } = useSession()
  const groups = useMemo(() => filterGroupsForRole(role ?? undefined), [role])
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    closedGroups(groups.map((g) => g.id)),
  )

  useEffect(() => {
    const ids = groups.map((g) => g.id)
    const activeGroupId = activeGroupIdFromPath(location.pathname)
    setOpenGroups(() => {
      const next = closedGroups(ids)
      if (activeGroupId && ids.includes(activeGroupId)) next[activeGroupId] = true
      return next
    })
  }, [location.pathname, groups])

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    // Treeview controlado por React (estado openGroups). NO usamos
    // `data-lte-toggle="treeview"` para evitar el doble toggle con el
    // listener global de AdminLTE, que provocaba el parpadeo abrir/cerrar.
    <ul className="nav sidebar-menu flex-column" role="menu">
      <li className="nav-item">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          end
        >
          <i className="nav-icon bi bi-speedometer2" aria-hidden />
          <p>Dashboard</p>
        </NavLink>
      </li>

      {groups.map((group) => {
        const open = openGroups[group.id]
        const hasActiveChild = group.items.some((item) =>
          location.pathname.includes(`/modulos/${item.slug}`),
        )
        const icon = group.iconClass ?? 'bi-folder'

        return (
          <li
            key={group.id}
            className={`nav-item${open || hasActiveChild ? ' menu-open' : ''}`}
          >
            <a
              href="#"
              className={`nav-link${hasActiveChild ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                toggleGroup(group.id)
              }}
              aria-expanded={open}
            >
              <i className={`nav-icon bi ${icon}`} aria-hidden />
              <p>
                {group.label}
                <i className="nav-arrow bi bi-chevron-right" aria-hidden />
              </p>
            </a>
            <ul className="nav nav-treeview" style={{ display: open ? 'block' : 'none' }}>
              {group.items.map((item) => (
                <li key={item.slug} className="nav-item">
                  <NavLink
                    to={`/app/modulos/${item.slug}`}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    {/* El Dashboard del módulo lleva icono propio; el resto de
                        sub-ítems usa el bullet estándar del treeview AdminLTE. */}
                    <i
                      className={`nav-icon bi ${
                        item.kind === 'dashboard' ? 'bi-speedometer2' : 'bi-circle'
                      }`}
                      aria-hidden
                    />
                    <p>{item.label}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
