import { formatCOP } from '@/lib/money'
import { moduleGroups } from '@/data/modules'
import { notificationsForRole } from '@/data/pqrsd'

export type SearchHit = {
  id: string
  kind: 'Módulo' | 'Contrato' | 'Predio' | 'PQRSD' | 'Funcionario'
  title: string
  subtitle: string
  to?: string
}

export function buildSearchIndex(): SearchHit[] {
  const modules: SearchHit[] = moduleGroups.flatMap((group) =>
    group.items.map((item) => ({
      id: `mod-${item.slug}`,
      kind: 'Módulo' as const,
      title: item.label,
      subtitle: group.label,
      to: `/app/modulos/${item.slug}`,
    })),
  )

  const extras: SearchHit[] = [
    {
      id: 'cto-045',
      kind: 'Contrato',
      title: 'CTO-2026-045 · Servicio de aseo',
      subtitle: `Serviaseo S.A.S. · ${formatCOP(780_000_000)}`,
      to: '/app/modulos/contratos',
    },
    {
      id: 'cto-031',
      kind: 'Contrato',
      title: 'CTO-2026-031 · Parque central',
      subtitle: 'Constructora Llanos · Suspendido',
      to: '/app/modulos/contratos',
    },
    {
      id: 'pred-045',
      kind: 'Predio',
      title: '01-02-003-00045',
      subtitle: `Calle 8 # 12-40 · saldo ${formatCOP(842_500)}`,
      to: '/app/modulos/predial',
    },
    {
      id: 'pred-218',
      kind: 'Predio',
      title: '01-04-011-00218',
      subtitle: 'Carrera 5 # 22-10 · Al día',
      to: '/app/modulos/predial',
    },
    {
      id: 'pqr-1842',
      kind: 'PQRSD',
      title: 'PQRSD-1842 · Hueco vía principal',
      subtitle: 'Por vencer · Planeación',
      to: '/app/modulos/pqrsd-vencimientos',
    },
    {
      id: 'pqr-1830',
      kind: 'PQRSD',
      title: 'PQRSD-1830 · Copia de contrato',
      subtitle: 'En trámite · Contratación',
      to: '/app/modulos/pqrsd-bandeja',
    },
    {
      id: 'fun-laura',
      kind: 'Funcionario',
      title: 'Laura Mendoza',
      subtitle: 'Secretaría de Hacienda',
      to: '/app/modulos/nomina',
    },
    {
      id: 'fun-andres',
      kind: 'Funcionario',
      title: 'Andrés Vega',
      subtitle: 'Planeación municipal',
      to: '/app/modulos/vacaciones',
    },
  ]

  return [...modules, ...extras]
}

export function searchCatalog(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return buildSearchIndex()
    .filter(
      (hit) =>
        hit.title.toLowerCase().includes(q) ||
        hit.subtitle.toLowerCase().includes(q) ||
        hit.kind.toLowerCase().includes(q),
    )
    .slice(0, limit)
}

export type AppNotification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  tone: 'info' | 'warning' | 'danger' | 'success'
  to?: string
}

/** Prefer notificationsForRole(roleId) — filtrado por perfil. */
export const initialNotifications: AppNotification[] = notificationsForRole('admin')

export { notificationsForRole }
