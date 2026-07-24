import { Outlet } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { ThemeToggle } from '@/theme/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="app-atmosphere relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8">
        <header className="flex items-center justify-between gap-4">
          <BrandMark to="/login" />
          <ThemeToggle />
        </header>
        <div className="flex flex-1 items-center py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
