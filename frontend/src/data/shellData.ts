import { formatCOP } from '@/lib/money'
import { moduleGroups } from '@/data/modules'

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
      subtitle: 'Por vencer · Infraestructura',
      to: '/app/modulos/pqrsd',
    },
    {
      id: 'pqr-1830',
      kind: 'PQRSD',
      title: 'PQRSD-1830 · Copia de contrato',
      subtitle: 'En término · Contratación',
      to: '/app/modulos/pqrsd',
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

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Póliza por vencer',
    body: 'CTO-2026-045 · cumplimiento vence el 05/08/2026',
    time: 'hace 12 min',
    read: false,
    tone: 'warning',
    to: '/app/modulos/polizas',
  },
  {
    id: 'n2',
    title: 'PQRSD crítica',
    body: 'PQRSD-1842 vence en menos de 24 horas',
    time: 'hace 35 min',
    read: false,
    tone: 'danger',
    to: '/app/modulos/pqrsd',
  },
  {
    id: 'n3',
    title: 'Recaudo PSE',
    body: `Lote bancario conciliado por ${formatCOP(48_200_000)}`,
    time: 'hace 1 h',
    read: false,
    tone: 'success',
    to: '/app/modulos/pse',
  },
  {
    id: 'n4',
    title: 'CDP pendiente de firma',
    body: 'CDP-2026-0158 · Secretaría de Cultura',
    time: 'hace 2 h',
    read: true,
    tone: 'info',
    to: '/app/modulos/presupuesto',
  },
  {
    id: 'n5',
    title: 'Nueva radicación',
    body: 'RAD-2026-45802 · Oficio Contraloría sin asignar',
    time: 'hace 3 h',
    read: true,
    tone: 'info',
    to: '/app/modulos/ventanilla',
  },
]
