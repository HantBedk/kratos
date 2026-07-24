import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'

/** Consola: exige rol con acceso a /app */
export function RequireConsole() {
  const { role, signedIn } = useSession()
  const location = useLocation()

  if (!signedIn || !role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (!role.consoleAccess) {
    return <Navigate to="/ciudadano" replace />
  }
  return <Outlet />
}
