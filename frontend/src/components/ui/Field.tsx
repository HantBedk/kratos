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
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {children}
      {hint ? <div className="form-text">{hint}</div> : null}
    </div>
  )
}

export const inputClass = 'form-control'

export const selectClass = 'form-select'

export const textareaClass = 'form-control'
