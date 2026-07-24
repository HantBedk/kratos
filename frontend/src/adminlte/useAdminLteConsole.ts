import { useEffect } from 'react'
import {
  applyConsoleBodyClasses,
  clearConsoleBodyClasses,
  initAdminLteSidebar,
} from './bootstrap'

/** Layout AdminLTE en `/app` (sidebar + PushMenu tras mount SPA). */
export function useAdminLteConsole() {
  useEffect(() => {
    applyConsoleBodyClasses()
    document.body.classList.add('app-loaded')

    const disposeSidebar = initAdminLteSidebar()

    return () => {
      disposeSidebar()
      clearConsoleBodyClasses()
    }
  }, [])
}
