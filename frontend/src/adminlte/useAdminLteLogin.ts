import { useEffect } from 'react'
import { applyLoginBodyClasses, clearLoginBodyClasses } from './bootstrap'

/** Clases body `login-page` de AdminLTE en `/login`. */
export function useAdminLteLogin() {
  useEffect(() => {
    applyLoginBodyClasses()
    return () => {
      clearLoginBodyClasses()
    }
  }, [])
}
