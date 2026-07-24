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
    return <div className="alert alert-light border mb-0">{emptyMessage}</div>
  }

  return (
    <div className="card mb-0">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0 align-middle">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={col.className} scope="col">
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
                  className={[
                    onRowClick ? 'cursor-pointer' : '',
                    selectedId === row.id ? 'table-primary' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={col.className}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
