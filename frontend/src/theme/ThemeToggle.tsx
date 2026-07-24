import { useTheme } from './ThemeProvider'

/** Toggle tema AdminLTE/Bootstrap (`data-bs-theme`). */
export function ThemeToggle({ className = 'nav-link' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
      title={isDark ? 'Modo día' : 'Modo noche'}
    >
      <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-fill'}`} aria-hidden />
    </button>
  )
}
