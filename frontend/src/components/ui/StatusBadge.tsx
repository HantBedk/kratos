import type { ReactNode } from 'react'

const toneClass = {
  neutral: 'bg-[var(--bg-muted)] text-[var(--text-muted)]',
  success: 'bg-[color-mix(in_srgb,var(--success)_16%,transparent)] text-[var(--success)]',
  warning: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-[var(--warning)]',
  danger: 'bg-[color-mix(in_srgb,var(--danger)_16%,transparent)] text-[var(--danger)]',
  info: 'bg-[color-mix(in_srgb,var(--info)_16%,transparent)] text-[var(--info)]',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)]',
} as const

export type BadgeTone = keyof typeof toneClass

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${toneClass[tone]}`}>
      {children}
    </span>
  )
}
