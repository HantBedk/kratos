import { moduleGroups } from '@/data/modules'
import { getWorkspace } from '@/data/moduleWorkspaces'
import { formatCOP } from '@/lib/money'

export type ModuleDashKpi = {
  label: string
  value: string
  hint: string
  trend?: string
  tone?: 'default' | 'success' | 'warning' | 'danger'
}

export type ModuleDashboardConfig = {
  groupId: string
  title: string
  subtitle: string
  kpis: ModuleDashKpi[]
  highlights: string[]
  primaryListSlug: string
}

export const moduleDashboards: Record<string, ModuleDashboardConfig> = {
  predial: {
    groupId: 'predial',
    title: 'Dashboard · Impuesto predial',
    subtitle: 'Liquidación, cartera y recaudo de predios del municipio.',
    primaryListSlug: 'predial',
    kpis: [
      {
        label: 'Cartera predial',
        value: formatCOP(11_250_000_000),
        hint: 'Saldo vigencia + mora',
        trend: '34% en mora',
        tone: 'warning',
      },
      {
        label: 'Recaudo del mes',
        value: formatCOP(612_300_000),
        hint: 'PSE + bancos + caja',
        trend: '+8%',
        tone: 'success',
      },
      {
        label: 'Predios con saldo',
        value: '8.420',
        hint: 'De 22.630 predios activos',
      },
      {
        label: 'Facturas vencidas',
        value: '1.204',
        hint: 'Requieren gestión de cobro',
        tone: 'danger',
      },
    ],
    highlights: [
      'Meta de recaudo predial julio: 88% cumplida.',
      '1.204 estados de cuenta vencidos pendientes de persuasivo.',
      'Base catastral sincronizada al corte 20/07/2026 (demo).',
    ],
  },
  ica: {
    groupId: 'ica',
    title: 'Dashboard · Industria y comercio',
    subtitle: 'Declaraciones, sanciones y cartera ICA.',
    primaryListSlug: 'ica',
    kpis: [
      {
        label: 'Cartera ICA',
        value: formatCOP(4_965_200_000),
        hint: 'Incluye sanciones',
        tone: 'warning',
      },
      {
        label: 'Recaudo mes',
        value: formatCOP(412_800_000),
        hint: 'Declaraciones y pagos',
        tone: 'success',
      },
      {
        label: 'Contribuyentes',
        value: '2.184',
        hint: 'Inscritos activos',
      },
      {
        label: 'En fiscalización',
        value: '47',
        hint: 'Casos abiertos',
        tone: 'danger',
      },
    ],
    highlights: [
      'Q2 2026: 186 declaraciones pendientes de pago.',
      '47 contribuyentes en etapa de fiscalización.',
      'Tasa de oportunidad de declaración: 81%.',
    ],
  },
  delineacion: {
    groupId: 'delineacion',
    title: 'Dashboard · Delineación urbana',
    subtitle: 'Licencias de construcción, urbanismo y liquidación de tasas.',
    primaryListSlug: 'delineacion',
    kpis: [
      {
        label: 'Liquidaciones abiertas',
        value: formatCOP(286_400_000),
        hint: 'Tasas por liquidar',
        tone: 'warning',
      },
      {
        label: 'Licencias mes',
        value: '38',
        hint: 'Radicadas / en trámite',
      },
      {
        label: 'Recaudado mes',
        value: formatCOP(94_200_000),
        hint: 'Tasas pagadas',
        tone: 'success',
      },
      {
        label: 'Por vencer (término)',
        value: '9',
        hint: 'Respuestas urbanísticas',
        tone: 'danger',
      },
    ],
    highlights: [
      '9 trámites urbanísticos cerca del término legal.',
      'Licencias de construcción: 62% del recaudo del mes.',
      'Pendiente cruce con catastro para 12 predios (demo).',
    ],
  },
  deguello: {
    groupId: 'deguello',
    title: 'Dashboard · Degüello de ganado',
    subtitle: 'Guías, liquidación y recaudo del impuesto de degüello.',
    primaryListSlug: 'deguello',
    kpis: [
      {
        label: 'Cartera degüello',
        value: formatCOP(128_750_000),
        hint: 'Guías pendientes de pago',
        tone: 'warning',
      },
      {
        label: 'Guías del mes',
        value: '214',
        hint: 'Bovino / porcino',
      },
      {
        label: 'Recaudo mes',
        value: formatCOP(42_800_000),
        hint: 'Pagos registrados',
        tone: 'success',
      },
      {
        label: 'Guías anuladas',
        value: '6',
        hint: 'Requieren justificación',
        tone: 'danger',
      },
    ],
    highlights: [
      '214 guías liquidables en el mes en curso.',
      '6 guías anuladas pendientes de auditoría.',
      'Punto de control matadero municipal activo (demo).',
    ],
  },
  estampillas: {
    groupId: 'estampillas',
    title: 'Dashboard · Estampillas',
    subtitle: 'Liquidación y recaudo ligados a contratos y actos.',
    primaryListSlug: 'estampillas',
    kpis: [
      {
        label: 'Pendiente de pago',
        value: formatCOP(428_450_000),
        hint: 'Liquidaciones abiertas',
        tone: 'warning',
      },
      {
        label: 'Recaudo mes',
        value: formatCOP(128_450_000),
        hint: 'Pro cultura / adulto mayor / hospital',
        tone: 'success',
      },
      {
        label: 'Ligadas a contratos',
        value: '64',
        hint: 'Vigencia 2026',
      },
      {
        label: 'Sin legalizar',
        value: '9',
        hint: 'Bloquean acta de inicio',
        tone: 'danger',
      },
    ],
    highlights: [
      '9 contratos sin estampilla pagada (bloqueo de inicio).',
      'Mayor recaudo: estampilla pro-cultura.',
      'Cruce automático con contratación en demo.',
    ],
  },
  exogena: {
    groupId: 'exogena',
    title: 'Dashboard · Información exógena',
    subtitle: 'Reportes a control y cruces de información tributaria.',
    primaryListSlug: 'exogena',
    kpis: [
      {
        label: 'Reportes vigencia',
        value: '28',
        hint: 'Presentados / en elaboración',
      },
      {
        label: 'Pendientes de envío',
        value: '5',
        hint: 'Cerca de fecha de corte',
        tone: 'warning',
      },
      {
        label: 'Inconsistencias',
        value: '132',
        hint: 'Cruces predial / ICA / RUT',
        tone: 'danger',
      },
      {
        label: 'Cerrados OK',
        value: '23',
        hint: 'Sin observación',
        tone: 'success',
      },
    ],
    highlights: [
      '5 reportes exógenos con corte en 15 días.',
      '132 inconsistencias en cruce predial–RUT.',
      'Plantillas DIAN / contraloría en demo.',
    ],
  },
  'estados-cuenta': {
    groupId: 'estados-cuenta',
    title: 'Dashboard · Estados de cuenta',
    subtitle: 'Emisión, notificación y seguimiento a contribuyentes.',
    primaryListSlug: 'facturacion',
    kpis: [
      {
        label: 'Emitidos mes',
        value: '1.842',
        hint: 'Facturas / estados',
      },
      {
        label: 'Valor emitido',
        value: formatCOP(2_450_000_000),
        hint: 'Todos los conceptos',
      },
      {
        label: 'Pendientes de pago',
        value: '638',
        hint: 'Aún no cancelados',
        tone: 'warning',
      },
      {
        label: 'Pagados',
        value: '1.104',
        hint: 'Mes en curso',
        tone: 'success',
      },
    ],
    highlights: [
      '638 estados de cuenta pendientes de pago.',
      'Canal preferido: PSE (demo).',
      'Reenvío de notificaciones desde la lista operativa.',
    ],
  },
  entidades: {
    groupId: 'entidades',
    title: 'Dashboard · Entidades agregadas / descentralizadas',
    subtitle: 'Hospital, ESE, empresas y fondos vinculados al municipio.',
    primaryListSlug: 'entidades',
    kpis: [
      {
        label: 'Entidades activas',
        value: '7',
        hint: 'Agregadas / descentralizadas',
      },
      {
        label: 'Cartera asociada',
        value: formatCOP(1_842_000_000),
        hint: 'Reportada al municipio',
        tone: 'warning',
      },
      {
        label: 'Reportes al día',
        value: '5 / 7',
        hint: 'Corte mensual',
        tone: 'success',
      },
      {
        label: 'Sin reporte',
        value: '2',
        hint: 'Fuera de término',
        tone: 'danger',
      },
    ],
    highlights: [
      '2 entidades sin reporte de cartera del mes.',
      'ESE Hospital concentra el 41% de la cartera asociada.',
      'Convenios PSE en 4 entidades (demo).',
    ],
  },
  pse: {
    groupId: 'pse',
    title: 'Dashboard · Pagos PSE',
    subtitle: 'Recaudo electrónico ciudadano e institucional.',
    primaryListSlug: 'pse',
    kpis: [
      {
        label: 'Tx hoy',
        value: '142',
        hint: 'Intentos de pago',
      },
      {
        label: 'Recaudado hoy',
        value: formatCOP(86_400_000),
        hint: 'Aprobadas',
        tone: 'success',
      },
      {
        label: 'Tasa de éxito',
        value: '94%',
        hint: 'Aprobadas / intentos',
        tone: 'success',
      },
      {
        label: 'Rechazadas / expiradas',
        value: '11',
        hint: 'Requieren reintento',
        tone: 'warning',
      },
    ],
    highlights: [
      '3 lotes PSE pendientes de conciliación.',
      'Mayor volumen: predial vigencia 2026.',
      'Portal ciudadano con botón PSE activo (demo).',
    ],
  },
  registros: {
    groupId: 'registros',
    title: 'Dashboard · Registros municipales',
    subtitle: 'Inscripciones ciudadanas, validación, anexos y reportes.',
    primaryListSlug: 'registros-discapacidad',
    kpis: [
      {
        label: 'Inscritos discapacidad',
        value: '1.284',
        hint: 'Registro activo',
      },
      {
        label: 'Oferentes activos',
        value: '312',
        hint: 'Agropecuarios / alimentos',
        tone: 'success',
      },
      {
        label: 'Pendientes validar',
        value: '60',
        hint: 'Cola de revisión',
        tone: 'warning',
      },
      {
        label: 'Tipos públicos',
        value: '5',
        hint: 'Abiertos en el portal',
      },
    ],
    highlights: [
      'El ciudadano elige departamento → alcaldía → tipo de registro.',
      'Cada tipo admite formularios, anexos y validación.',
      'La alcaldía puede crear nuevos tipos en el catálogo.',
    ],
  },
  pqrsd: {
    groupId: 'pqrsd',
    title: 'Dashboard · PQRSD',
    subtitle: 'Radicación, asignación por área, términos legales y alertas por rol.',
    primaryListSlug: 'pqrsd-bandeja',
    kpis: [
      {
        label: 'Abiertas',
        value: '128',
        hint: 'En trámite municipal',
      },
      {
        label: 'Por vencer',
        value: '14',
        hint: '< 3 días hábiles',
        tone: 'warning',
      },
      {
        label: 'Sin asignar',
        value: '9',
        hint: 'Cola de ventanilla',
        tone: 'danger',
      },
      {
        label: 'Cerradas mes',
        value: '41',
        hint: 'Con respuesta al ciudadano',
        tone: 'success',
      },
    ],
    highlights: [
      'Secretaría recibe lo nuevo y asigna; cada área solo ve y es notificada de lo suyo.',
      'Hacienda · impuestos · Contratación · contratos · Planeación · vías · Jurídica · denuncias.',
      'Alertas de vencimiento van al rol asignado (+ Secretaría en seguimiento).',
    ],
  },
}

function buildFallbackDashboard(groupId: string): ModuleDashboardConfig | undefined {
  const group = moduleGroups.find((g) => g.id === groupId)
  if (!group) return undefined
  const primary = group.items.find((i) => i.kind !== 'dashboard')
  const ws = primary ? getWorkspace(primary.slug) : undefined
  return {
    groupId,
    title: `Dashboard · ${group.label}`,
    subtitle: `Panel operativo de ${group.label} (demo).`,
    primaryListSlug: primary?.slug ?? '',
    kpis: (ws?.stats ?? []).slice(0, 4).map((s) => ({
      label: s.label,
      value: s.value,
      hint: 'Indicador del módulo',
      tone: 'default' as const,
    })),
    highlights: [
      `${group.label}: ${group.items.filter((i) => i.kind !== 'dashboard').length} listas en el menú.`,
      'Indicadores de demostración; se alimentan con la operación diaria.',
    ],
  }
}

export function getModuleDashboard(groupId: string): ModuleDashboardConfig | undefined {
  return moduleDashboards[groupId] ?? buildFallbackDashboard(groupId)
}

export function getDashboardBySlug(slug: string): ModuleDashboardConfig | undefined {
  if (!slug.endsWith('-dashboard')) return undefined
  return getModuleDashboard(slug.replace(/-dashboard$/, ''))
}
