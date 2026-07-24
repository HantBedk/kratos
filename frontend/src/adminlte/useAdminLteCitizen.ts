import { useEffect } from 'react'
import {
  applyCitizenBodyClasses,
  clearCitizenBodyClasses,
  initAdminLteSidebar,
} from './bootstrap'

/** Layout AdminLTE en `/ciudadano`. */
export function useAdminLteCitizen() {
  useEffect(() => {
    applyCitizenBodyClasses()
    document.body.classList.add('app-loaded')

    const disposeSidebar = initAdminLteSidebar()

    return () => {
      disposeSidebar()
      clearCitizenBodyClasses()
    }
  }, [])
}
