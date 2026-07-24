import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

type ThemeToggleProps = {
  variant?: 'default' | 'ghost' | 'on-dark'
  className?: string
}

export function ThemeToggle({ variant = 'default', className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()

  const base =
    'inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none'

  const variants = {
    default:
      'border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text)] shadow-[var(--shadow-sm)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]',
    ghost: 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]',
    'on-dark':
      'border border-white/15 bg-white/10 text-[var(--text-on-dark)] hover:bg-white/15',
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
      title={isDark ? 'Modo día' : 'Modo noche'}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" strokeWidth={2} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={2} />}
    </button>
  )
}
