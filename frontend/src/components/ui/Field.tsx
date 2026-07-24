import type { ReactNode } from 'react'

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--text-subtle)]">{hint}</span>}
    </label>
  )
}

export const inputClass =
  'h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 text-sm text-[var(--text)] outline-none focus:border-[var(--border-strong)]'

export const selectClass = inputClass

export const textareaClass =
  'min-h-24 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--border-strong)]'
