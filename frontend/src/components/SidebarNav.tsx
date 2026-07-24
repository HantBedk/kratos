import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { findModuleGroup, moduleGroups } from '@/data/modules'

function closedGroups(): Record<string, boolean> {
  return Object.fromEntries(moduleGroups.map((group) => [group.id, false]))
}

function activeGroupIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/app\/modulos\/([^/]+)/)
  if (!match) return null
  return findModuleGroup(match[1])?.id ?? null
}

export function SidebarNav({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(closedGroups)

  useEffect(() => {
    const activeGroupId = activeGroupIdFromPath(location.pathname)
    setOpenGroups(() => {
      const next = closedGroups()
      if (activeGroupId) next[activeGroupId] = true
      return next
    })
  }, [location.pathname])

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <nav className="flex flex-col gap-1 px-3 pb-6" aria-label="Módulos del ERP">
      <NavLink
        to="/app/dashboard"
        className={({ isActive }) =>
          [
            'mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
            isActive
              ? 'bg-[var(--bg-sidebar-active)] text-[var(--text-on-dark)]'
              : 'text-[var(--text-on-dark-muted)] hover:bg-[var(--bg-sidebar-hover)] hover:text-[var(--text-on-dark)]',
          ].join(' ')
        }
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">◆</span>
        {!collapsed && <span>Dashboard</span>}
      </NavLink>

      {moduleGroups.map((group) => {
        const Icon = group.icon
        const open = openGroups[group.id]

        return (
          <div key={group.id} className="mb-1">
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[var(--text-on-dark-muted)] transition-colors hover:bg-[var(--bg-sidebar-hover)] hover:text-[var(--text-on-dark)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/8 text-[var(--ink-200)]">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{group.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}
                  />
                </>
              )}
            </button>

            {!collapsed && open && (
              <ul className="mt-1 space-y-0.5 border-l border-white/10 ml-7 pl-3">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={`/app/modulos/${item.slug}`}
                      className={({ isActive }) =>
                        [
                          'block rounded-lg px-2.5 py-2 text-[13px] transition-colors',
                          isActive
                            ? 'bg-[var(--bg-sidebar-active)] font-semibold text-[var(--text-on-dark)]'
                            : 'text-[var(--text-on-dark-muted)] hover:bg-[var(--bg-sidebar-hover)] hover:text-[var(--text-on-dark)]',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
