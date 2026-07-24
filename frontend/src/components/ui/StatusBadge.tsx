import type { ReactNode } from 'react'

const toneClass = {
  neutral: 'text-bg-secondary',
  success: 'text-bg-success',
  warning: 'text-bg-warning',
  danger: 'text-bg-danger',
  info: 'text-bg-info',
  accent: 'text-bg-primary',
} as const

export type BadgeTone = keyof typeof toneClass

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge ${toneClass[tone]}`}>{children}</span>
}
