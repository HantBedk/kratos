import type { BadgeTone } from '@/components/ui/StatusBadge'
import type { DemoRoleId } from '@/data/demoRoles'

/** Tipos legales PQRSD que el ciudadano puede radicar. */
export const pqrsdTipos = [
  'Petición',
  'Queja',
  'Reclamo',
  'Sugerencia',
  'Denuncia',
] as const

export type PqrsdTipo = (typeof pqrsdTipos)[number]

export type PqrsdStatus =
  | 'Radicada'
  | 'Asignada'
  | 'En trámite'
  | 'Por vencer'
  | 'Vencida'
  | 'Respondida'
  | 'Cerrada'

export type PqrsdAreaId =
  | 'secretaria'
  | 'hacienda'
  | 'contratacion'
  | 'planeacion'
  | 'juridica'

export type PqrsdArea = {
  id: PqrsdAreaId
  label: string
  /** Rol demo que recibe bandeja y notificaciones de esta área */
  roleId: DemoRoleId
  description: string
  /** Días hábiles de respuesta sugeridos (demo) */
  defaultDays: number
}

/** Áreas receptoras: cada una mapea a un rol; no todos ven todo. */
export const pqrsdAreas: PqrsdArea[] = [
  {
    id: 'secretaria',
    label: 'Secretaría / Ventanilla',
    roleId: 'secretaria',
    description: 'Radica, clasifica y asigna. Ve lo sin asignar y hace seguimiento.',
    defaultDays: 15,
  },
  {
    id: 'hacienda',
    label: 'Hacienda / Rentas',
    roleId: 'hacienda',
    description: 'Impuestos, predial, ICA, facturación y cartera.',
    defaultDays: 15,
  },
  {
    id: 'contratacion',
    label: 'Contratación',
    roleId: 'contratacion',
    description: 'Contratos, copias de actas y procesos contractuales.',
    defaultDays: 10,
  },
  {
    id: 'planeacion',
    label: 'Planeación / Obras',
    roleId: 'planeacion',
    description: 'Vías, espacio público, proyectos y quejas de infraestructura.',
    defaultDays: 15,
  },
  {
    id: 'juridica',
    label: 'Jurídica',
    roleId: 'juridica',
    description: 'Denuncias, tutelas relacionadas y escalamientos legales.',
    defaultDays: 10,
  },
]

export const pqrsdTemas = [
  { id: 'impuestos', label: 'Impuestos / predial / ICA', areaId: 'hacienda' as PqrsdAreaId },
  { id: 'contratos', label: 'Contratos y copias', areaId: 'contratacion' as PqrsdAreaId },
  { id: 'vias', label: 'Vías e infraestructura', areaId: 'planeacion' as PqrsdAreaId },
  { id: 'espacio', label: 'Espacio público', areaId: 'planeacion' as PqrsdAreaId },
  { id: 'denuncia', label: 'Hecho irregular / denuncia', areaId: 'juridica' as PqrsdAreaId },
  { id: 'sugerencia', label: 'Sugerencia de servicio', areaId: 'secretaria' as PqrsdAreaId },
  { id: 'otro', label: 'Otro (clasifica ventanilla)', areaId: 'secretaria' as PqrsdAreaId },
] as const

export type PqrsdTemaId = (typeof pqrsdTemas)[number]['id']

export type PqrsdCase = {
  id: string
  radicado: string
  tipo: PqrsdTipo
  temaId: PqrsdTemaId
  asunto: string
  detalle: string
  ciudadano: string
  documento: string
  fechaRadicacion: string
  /** Fecha límite ISO-like display dd/mm/yyyy */
  vence: string
  daysLeft: number
  status: PqrsdStatus
  statusTone: BadgeTone
  /** null = solo ventanilla lo gestiona hasta asignar */
  areaId: PqrsdAreaId | null
  assignedRoleId: DemoRoleId | null
  attachment?: string
  respuesta?: string
  soporteRespuesta?: string
}

export function findPqrsdArea(id: PqrsdAreaId | null | undefined) {
  if (!id) return undefined
  return pqrsdAreas.find((a) => a.id === id)
}

export function findTema(id: PqrsdTemaId) {
  return pqrsdTemas.find((t) => t.id === id)
}

/** Sugiere área según tipo + tema (el ciudadano ve a dónde irá). */
export function suggestArea(tipo: PqrsdTipo, temaId: PqrsdTemaId): PqrsdArea {
  if (tipo === 'Denuncia') return pqrsdAreas.find((a) => a.id === 'juridica')!
  const tema = findTema(temaId)
  const areaId = tema?.areaId ?? 'secretaria'
  return pqrsdAreas.find((a) => a.id === areaId) ?? pqrsdAreas[0]!
}

export function statusToneFor(status: PqrsdStatus): BadgeTone {
  switch (status) {
    case 'Por vencer':
      return 'warning'
    case 'Vencida':
      return 'danger'
    case 'Respondida':
    case 'Cerrada':
      return 'success'
    case 'En trámite':
    case 'Asignada':
      return 'info'
    default:
      return 'accent'
  }
}

/** Casos demo compartidos (consola + portal). */
export const mockPqrsdCases: PqrsdCase[] = [
  {
    id: '1',
    radicado: 'PQRSD-1842',
    tipo: 'Queja',
    temaId: 'vias',
    asunto: 'Hueco en vía principal del barrio El Centro',
    detalle: 'Carrera 5 con calle 8; riesgo para motos y peatones.',
    ciudadano: 'Carlos Niño',
    documento: 'CC 1.098.332.441',
    fechaRadicacion: '18/07/2026',
    vence: '25/07/2026',
    daysLeft: 2,
    status: 'Por vencer',
    statusTone: 'warning',
    areaId: 'planeacion',
    assignedRoleId: 'planeacion',
    attachment: 'foto-hueco.jpg',
  },
  {
    id: '2',
    radicado: 'PQRSD-1830',
    tipo: 'Petición',
    temaId: 'contratos',
    asunto: 'Copia de contrato de aseo 045-2026',
    detalle: 'Solicitud de copia auténtica para veeduría ciudadana.',
    ciudadano: 'Ana Beltrán',
    documento: 'CC 52.110.882',
    fechaRadicacion: '15/07/2026',
    vence: '30/07/2026',
    daysLeft: 7,
    status: 'En trámite',
    statusTone: 'success',
    areaId: 'contratacion',
    assignedRoleId: 'contratacion',
  },
  {
    id: '3',
    radicado: 'PQRSD-1799',
    tipo: 'Reclamo',
    temaId: 'impuestos',
    asunto: 'Factura predial con valor inconsistente',
    detalle: 'Predio 01-02-003-00045 · liquidación 2026.',
    ciudadano: 'José Melo',
    documento: 'CC 17.445.201',
    fechaRadicacion: '05/07/2026',
    vence: '18/07/2026',
    daysLeft: -5,
    status: 'Vencida',
    statusTone: 'danger',
    areaId: 'hacienda',
    assignedRoleId: 'hacienda',
  },
  {
    id: '4',
    radicado: 'PQRSD-1760',
    tipo: 'Sugerencia',
    temaId: 'sugerencia',
    asunto: 'Ampliar horarios de ventanilla los sábados',
    detalle: 'Propuesta de atención 8–12 a. m. un sábado al mes.',
    ciudadano: 'Anónimo',
    documento: '—',
    fechaRadicacion: '02/07/2026',
    vence: '17/07/2026',
    daysLeft: 0,
    status: 'Cerrada',
    statusTone: 'neutral',
    areaId: 'secretaria',
    assignedRoleId: 'secretaria',
    respuesta: 'Se evaluará en comité de servicio al ciudadano (2026-II).',
  },
  {
    id: '5',
    radicado: 'PQRSD-1855',
    tipo: 'Denuncia',
    temaId: 'denuncia',
    asunto: 'Presunto uso irregular de espacio público',
    detalle: 'Ocupación de andén con estructura fija sin permiso.',
    ciudadano: 'María A. Restrepo',
    documento: 'CC 52.448.901',
    fechaRadicacion: '20/07/2026',
    vence: '30/07/2026',
    daysLeft: 7,
    status: 'Asignada',
    statusTone: 'info',
    areaId: 'juridica',
    assignedRoleId: 'juridica',
    attachment: 'evidencia.pdf',
  },
  {
    id: '6',
    radicado: 'PQRSD-1860',
    tipo: 'Petición',
    temaId: 'otro',
    asunto: 'Información sobre subsidio de adulto mayor',
    detalle: 'Requisitos y fechas de inscripción 2026.',
    ciudadano: 'Pedro Ríos',
    documento: 'CC 19.220.110',
    fechaRadicacion: '22/07/2026',
    vence: '06/08/2026',
    daysLeft: 14,
    status: 'Radicada',
    statusTone: 'accent',
    areaId: null,
    assignedRoleId: null,
  },
]

export function canManageAllPqrsd(roleId: DemoRoleId | null | undefined): boolean {
  return roleId === 'admin' || roleId === 'secretaria'
}

/**
 * Bandeja por rol:
 * - Admin / Secretaría: todas (+ sin asignar).
 * - Área: solo las asignadas a su rol.
 */
export function casesForRole(
  roleId: DemoRoleId | null | undefined,
  cases: PqrsdCase[] = mockPqrsdCases,
): PqrsdCase[] {
  if (!roleId) return []
  if (canManageAllPqrsd(roleId)) return cases
  return cases.filter((c) => c.assignedRoleId === roleId)
}

export function unassignedCases(cases: PqrsdCase[] = mockPqrsdCases): PqrsdCase[] {
  return cases.filter((c) => !c.assignedRoleId && c.status !== 'Cerrada' && c.status !== 'Respondida')
}

export function dueSoonCases(
  roleId: DemoRoleId | null | undefined,
  cases: PqrsdCase[] = mockPqrsdCases,
): PqrsdCase[] {
  return casesForRole(roleId, cases).filter(
    (c) =>
      (c.status === 'Por vencer' || c.status === 'Vencida' || c.daysLeft <= 3) &&
      c.status !== 'Cerrada' &&
      c.status !== 'Respondida',
  )
}

export type RoleNotification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  tone: 'info' | 'warning' | 'danger' | 'success'
  to?: string
  audienceRoles: DemoRoleId[] | '*'
}

/** Notificaciones de dominio + PQRSD; cada una declara qué roles la ven. */
export const roleScopedNotifications: RoleNotification[] = [
  {
    id: 'n-poliza',
    title: 'Póliza por vencer',
    body: 'CTO-2026-045 · cumplimiento vence el 05/08/2026',
    time: 'hace 12 min',
    read: false,
    tone: 'warning',
    to: '/app/modulos/polizas',
    audienceRoles: ['admin', 'contratacion'],
  },
  {
    id: 'n-pqr-1842',
    title: 'PQRSD por vencer · tu bandeja',
    body: 'PQRSD-1842 · vías · vence en menos de 48 h (Planeación)',
    time: 'hace 35 min',
    read: false,
    tone: 'danger',
    to: '/app/modulos/pqrsd-vencimientos',
    audienceRoles: ['admin', 'planeacion', 'secretaria'],
  },
  {
    id: 'n-pqr-1799',
    title: 'PQRSD vencida · Hacienda',
    body: 'PQRSD-1799 · reclamo predial sin respuesta formal',
    time: 'hace 50 min',
    read: false,
    tone: 'danger',
    to: '/app/modulos/pqrsd-bandeja',
    audienceRoles: ['admin', 'hacienda', 'secretaria'],
  },
  {
    id: 'n-pqr-1855',
    title: 'Denuncia asignada a Jurídica',
    body: 'PQRSD-1855 · uso irregular de espacio público',
    time: 'hace 1 h',
    read: false,
    tone: 'warning',
    to: '/app/modulos/pqrsd-bandeja',
    audienceRoles: ['admin', 'juridica'],
  },
  {
    id: 'n-pqr-1830',
    title: 'Petición en tu bandeja',
    body: 'PQRSD-1830 · copia de contrato · Contratación',
    time: 'hace 2 h',
    read: false,
    tone: 'info',
    to: '/app/modulos/pqrsd-bandeja',
    audienceRoles: ['admin', 'contratacion'],
  },
  {
    id: 'n-pqr-1860',
    title: 'Nueva PQRSD sin asignar',
    body: 'PQRSD-1860 · subsidio adulto mayor · requiere clasificación',
    time: 'hace 3 h',
    read: false,
    tone: 'info',
    to: '/app/modulos/pqrsd-asignacion',
    audienceRoles: ['admin', 'secretaria'],
  },
  {
    id: 'n-pse',
    title: 'Recaudo PSE',
    body: 'Lote bancario conciliado',
    time: 'hace 1 h',
    read: false,
    tone: 'success',
    to: '/app/modulos/pse',
    audienceRoles: ['admin', 'hacienda', 'financiero', 'tesoreria'],
  },
  {
    id: 'n-cdp',
    title: 'CDP pendiente de firma',
    body: 'CDP-2026-0158 · Secretaría de Cultura',
    time: 'hace 2 h',
    read: true,
    tone: 'info',
    to: '/app/modulos/presupuesto',
    audienceRoles: ['admin', 'financiero'],
  },
  {
    id: 'n-rad',
    title: 'Nueva radicación ventanilla',
    body: 'RAD-2026-45802 · Oficio Contraloría sin asignar',
    time: 'hace 3 h',
    read: true,
    tone: 'info',
    to: '/app/modulos/ventanilla',
    audienceRoles: ['admin', 'secretaria'],
  },
]

export function notificationsForRole(roleId: DemoRoleId | null | undefined): Omit<RoleNotification, 'audienceRoles'>[] {
  if (!roleId) return []
  return roleScopedNotifications
    .filter((n) => n.audienceRoles === '*' || n.audienceRoles.includes(roleId))
    .map(({ audienceRoles: _a, ...rest }) => rest)
}

/** Matriz legible para la UI de consola. */
export const pqrsdRoutingGuide = [
  {
    when: 'Cualquier radicado nuevo',
    who: 'Secretaría / Ventanilla',
    gets: 'Notificación de ingreso y cola “sin asignar”.',
  },
  {
    when: 'Tema impuestos / predial / ICA',
    who: 'Hacienda',
    gets: 'Solo si se le asigna; alertas de vencimiento de sus casos.',
  },
  {
    when: 'Tema contratos',
    who: 'Contratación',
    gets: 'Bandeja y plazos de peticiones contractuales.',
  },
  {
    when: 'Vías / infraestructura',
    who: 'Planeación',
    gets: 'Quejas y peticiones de obras; alertas por vencer.',
  },
  {
    when: 'Denuncia',
    who: 'Jurídica',
    gets: 'Asignación prioritaria y soportes de evidencia.',
  },
  {
    when: 'Sugerencia general',
    who: 'Secretaría',
    gets: 'Puede responder o reasignar a otra área.',
  },
] as const
