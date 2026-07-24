import { useAdminLteLogin } from '@/adminlte/useAdminLteLogin'
import { Outlet } from 'react-router-dom'

/** Layout Auth AdminLTE (`login-page`). */
export function AuthLayout() {
  useAdminLteLogin()

  return (
    <main className="login-box">
      <Outlet />
    </main>
  )
}
