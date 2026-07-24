import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { demoRoles, getDemoRole, type DemoRole, type DemoRoleId } from '@/data/demoRoles'

const STORAGE_KEY = 'kratos-demo-role'

type SessionContextValue = {
  role: DemoRole | null
  roleId: DemoRoleId | null
  signedIn: boolean
  enterAs: (roleId: DemoRoleId) => DemoRole
  logout: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

function readStoredRoleId(): DemoRoleId | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const role = getDemoRole(raw)
    return role ? role.id : null
  } catch {
    return null
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleId] = useState<DemoRoleId | null>(() => readStoredRoleId())

  const enterAs = useCallback((id: DemoRoleId) => {
    const role = getDemoRole(id)
    if (!role) throw new Error(`Rol demo desconocido: ${id}`)
    localStorage.setItem(STORAGE_KEY, id)
    setRoleId(id)
    return role
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setRoleId(null)
  }, [])

  const role = useMemo(() => (roleId ? getDemoRole(roleId) ?? null : null), [roleId])

  const value = useMemo<SessionContextValue>(
    () => ({
      role: role ?? null,
      roleId,
      signedIn: !!role,
      enterAs,
      logout,
    }),
    [role, roleId, enterAs, logout],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession debe usarse dentro de SessionProvider')
  return ctx
}

export { demoRoles }
