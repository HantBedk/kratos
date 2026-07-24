import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  header: string
  className?: string
  render: (row: T) => ReactNode
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  onRowClick,
  selectedId,
  emptyMessage = 'No hay registros con los filtros actuales.',
}: {
  columns: Column<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  selectedId?: string | null
  emptyMessage?: string
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] px-6 py-12 text-center text-sm text-[var(--text-muted)]">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-solid)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--bg-muted)]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-bold tracking-[0.08em] text-[var(--text-subtle)] uppercase ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[var(--border)] last:border-0 transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[var(--bg-muted)]' : ''
                } ${selectedId === row.id ? 'bg-[var(--accent-soft)]' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-[var(--text)] ${col.className ?? ''}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
