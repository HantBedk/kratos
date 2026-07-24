import type { BadgeTone } from '@/components/ui/StatusBadge'
import { formatCOP } from '@/lib/money'

export type KpiDetailItem = {
  id: string
  code: string
  title: string
  subtitle: string
  amount?: string
  status: string
  statusTone: BadgeTone
  fields: { label: string; value: string }[]
  notes: string
}

export type KpiPanel = {
  id: 'recaudo' | 'ejecucion' | 'contratos' | 'pqrsd'
  title: string
  description: string
  moduleLink?: string
  items: KpiDetailItem[]
}

export const dashboardKpiPanels: Record<KpiPanel['id'], KpiPanel> = {
  recaudo: {
    id: 'recaudo',
    title: 'Recaudo del mes',
    description: 'Detalle de recaudos Predial + ICA acumulados en julio 2026 (COP).',
    moduleLink: '/app/modulos/predial',
    items: [
      {
        id: 'r1',
        code: 'REC-PRED-0726',
        title: 'Impuesto predial — pagos PSE',
        subtitle: 'Rentas · canal electrónico',
        amount: formatCOP(742_180_000),
        status: 'Conciliado',
        statusTone: 'success',
        fields: [
          { label: 'Concepto', value: 'Predial vigencia 2026' },
          { label: 'Transacciones', value: '3.842' },
          { label: 'Periodo', value: '01–23 jul 2026' },
          { label: 'Valor (COP)', value: formatCOP(742_180_000) },
        ],
        notes: 'Incluye descuentos por pronto pago. Conciliado con Banco Agrario.',
      },
      {
        id: 'r2',
        code: 'REC-PRED-CAJA',
        title: 'Impuesto predial — caja presencial',
        subtitle: 'Tesorería · ventanilla',
        amount: formatCOP(125_470_000),
        status: 'Conciliado',
        statusTone: 'success',
        fields: [
          { label: 'Concepto', value: 'Predial vigencia 2026' },
          { label: 'Recibos', value: '612' },
          { label: 'Periodo', value: '01–23 jul 2026' },
          { label: 'Valor (COP)', value: formatCOP(125_470_000) },
        ],
        notes: 'Cierre diario de caja sin diferencias.',
      },
      {
        id: 'r3',
        code: 'REC-ICA-0726',
        title: 'ICA — declaraciones pagadas',
        subtitle: 'Rentas · industria y comercio',
        amount: formatCOP(312_800_000),
        status: 'En conciliación',
        statusTone: 'warning',
        fields: [
          { label: 'Concepto', value: 'ICA Q1–Q2 2026' },
          { label: 'Contribuyentes', value: '418' },
          { label: 'Periodo', value: '01–23 jul 2026' },
          { label: 'Valor (COP)', value: formatCOP(312_800_000) },
        ],
        notes: 'Pendiente cruce de 3 lotes PSE del 22/07.',
      },
      {
        id: 'r4',
        code: 'REC-ICA-SAN',
        title: 'ICA — sanciones e intereses',
        subtitle: 'Fiscalización',
        amount: formatCOP(100_000_000),
        status: 'Registrado',
        statusTone: 'info',
        fields: [
          { label: 'Concepto', value: 'Sanciones + mora' },
          { label: 'Expedientes', value: '27' },
          { label: 'Valor (COP)', value: formatCOP(100_000_000) },
        ],
        notes: 'Incluye acuerdos de pago del mes.',
      },
    ],
  },

  ejecucion: {
    id: 'ejecucion',
    title: 'Ejecución presupuestal',
    description: 'Compromisos frente a la apropiación vigente por dependencia (corte 23/07/2026).',
    moduleLink: '/app/modulos/presupuesto',
    items: [
      {
        id: 'e1',
        code: 'DEP-INFRA',
        title: 'Secretaría de Infraestructura',
        subtitle: 'Ejecución 78%',
        amount: formatCOP(6_840_000_000),
        status: 'Sobre meta',
        statusTone: 'success',
        fields: [
          { label: 'Apropiación', value: formatCOP(8_770_000_000) },
          { label: 'Comprometido', value: formatCOP(6_840_000_000) },
          { label: 'CDP vigentes', value: '34' },
          { label: '% ejecución', value: '78%' },
        ],
        notes: 'Obras viales y mantenimiento urbano concentran el gasto.',
      },
      {
        id: 'e2',
        code: 'DEP-SOCIAL',
        title: 'Desarrollo Social',
        subtitle: 'Ejecución 61%',
        amount: formatCOP(2_150_000_000),
        status: 'En meta',
        statusTone: 'accent',
        fields: [
          { label: 'Apropiación', value: formatCOP(3_520_000_000) },
          { label: 'Comprometido', value: formatCOP(2_150_000_000) },
          { label: '% ejecución', value: '61%' },
        ],
        notes: 'Programas de adulto mayor e infancia al día.',
      },
      {
        id: 'e3',
        code: 'DEP-EDU',
        title: 'Educación / PAE',
        subtitle: 'Ejecución 54%',
        amount: formatCOP(4_980_000_000),
        status: 'En meta',
        statusTone: 'info',
        fields: [
          { label: 'Apropiación', value: formatCOP(9_200_000_000) },
          { label: 'Comprometido', value: formatCOP(4_980_000_000) },
          { label: '% ejecución', value: '54%' },
        ],
        notes: 'Segundo semestre concentra contratos de alimentación.',
      },
      {
        id: 'e4',
        code: 'DEP-GEN',
        title: 'Secretaría General',
        subtitle: 'Ejecución 41%',
        amount: formatCOP(890_000_000),
        status: 'Bajo ritmo',
        statusTone: 'warning',
        fields: [
          { label: 'Apropiación', value: formatCOP(2_170_000_000) },
          { label: 'Comprometido', value: formatCOP(890_000_000) },
          { label: '% ejecución', value: '41%' },
        ],
        notes: 'Retraso en estudios previos de dotación.',
      },
      {
        id: 'e5',
        code: 'DEP-HAC',
        title: 'Hacienda (funcionamiento)',
        subtitle: 'Ejecución 69%',
        amount: formatCOP(3_460_000_000),
        status: 'En meta',
        statusTone: 'success',
        fields: [
          { label: 'Apropiación', value: formatCOP(5_010_000_000) },
          { label: 'Comprometido', value: formatCOP(3_460_000_000) },
          { label: '% ejecución', value: '69%' },
        ],
        notes: 'Incluye nómina y servicios generales.',
      },
    ],
  },

  contratos: {
    id: 'contratos',
    title: 'Contratos en riesgo',
    description: 'Contratos con pólizas por vencer, plazos críticos o suspensión.',
    moduleLink: '/app/modulos/contratos',
    items: [
      {
        id: 'c1',
        code: 'CTO-2026-045',
        title: 'Servicio de aseo',
        subtitle: 'Póliza de cumplimiento por vencer',
        amount: formatCOP(780_000_000),
        status: 'Póliza crítica',
        statusTone: 'warning',
        fields: [
          { label: 'Contratista', value: 'Serviaseo S.A.S.' },
          { label: 'Supervisor', value: 'Ana Ruiz' },
          { label: 'Vence póliza', value: '05/08/2026' },
          { label: 'Amparo', value: formatCOP(780_000_000) },
        ],
        notes: 'Alerta automática a Contratación y supervisor.',
      },
      {
        id: 'c2',
        code: 'CTO-2026-031',
        title: 'Obra parque central etapa 1',
        subtitle: 'Contrato suspendido',
        amount: formatCOP(2_400_000_000),
        status: 'Suspendido',
        statusTone: 'danger',
        fields: [
          { label: 'Contratista', value: 'Constructora Llanos' },
          { label: 'Motivo', value: 'Temporada de lluvias' },
          { label: 'Desde', value: '01/07/2026' },
          { label: 'Reinicio estimado', value: '15/08/2026' },
        ],
        notes: 'Requiere acta de reinicio y revisión de pólizas.',
      },
      {
        id: 'c3',
        code: 'CTO-2025-198',
        title: 'Interventoría vial',
        subtitle: 'Plazo de liquidación vencido',
        amount: formatCOP(156_000_000),
        status: 'Por liquidar',
        statusTone: 'warning',
        fields: [
          { label: 'Contratista', value: 'Ing. Camilo Duarte' },
          { label: 'Acta final', value: 'Cargada' },
          { label: 'Días de mora liquidación', value: '18' },
        ],
        notes: 'Pendiente paz y salvo DIAN del contratista.',
      },
      {
        id: 'c4',
        code: 'CTO-2026-052',
        title: 'Mantenimiento parque automotor',
        subtitle: 'Sin acta de inicio',
        amount: formatCOP(180_000_000),
        status: 'Sin inicio',
        statusTone: 'danger',
        fields: [
          { label: 'Contratista', value: 'Mecánica Andina' },
          { label: 'Legalización', value: '10/07/2026' },
          { label: 'Días sin acta', value: '13' },
        ],
        notes: 'Supervisor no ha cargado acta de inicio.',
      },
      {
        id: 'c5',
        code: 'CTO-2026-038',
        title: 'Suministro útiles',
        subtitle: 'Póliza de calidad por vencer',
        amount: formatCOP(45_000_000),
        status: 'Póliza crítica',
        statusTone: 'warning',
        fields: [
          { label: 'Contratista', value: 'Papelería Central' },
          { label: 'Vence póliza', value: '28/07/2026' },
        ],
        notes: 'Renovación solicitada al contratista.',
      },
      {
        id: 'c6',
        code: 'CTO-2026-019',
        title: 'Consultoría catastro',
        subtitle: 'Adición sin RP actualizado',
        amount: formatCOP(250_000_000),
        status: 'Riesgo presupuestal',
        statusTone: 'danger',
        fields: [
          { label: 'Contratista', value: 'GeoLlanos Ltda.' },
          { label: 'Otrosí', value: 'Adición 20%' },
          { label: 'RP', value: 'Pendiente' },
        ],
        notes: 'Bloqueado hasta registro presupuestal.',
      },
      {
        id: 'c7',
        code: 'CTO-2025-210',
        title: 'Apoyo nutricional',
        subtitle: 'Garantía de anticipo por vencer',
        amount: formatCOP(320_000_000),
        status: 'Póliza crítica',
        statusTone: 'warning',
        fields: [
          { label: 'Contratista', value: 'Alimentos del Meta' },
          { label: 'Vence amparo anticipo', value: '02/08/2026' },
        ],
        notes: 'Notificación enviada el 20/07/2026.',
      },
    ],
  },

  pqrsd: {
    id: 'pqrsd',
    title: 'PQRSD por vencer',
    description: 'Peticiones, quejas y reclamos con término legal menor a 3 días.',
    moduleLink: '/app/modulos/pqrsd',
    items: Array.from({ length: 14 }, (_, i) => {
      const n = 1842 - i
      const days = (i % 3) + 1
      const tipos = ['Queja', 'Petición', 'Reclamo', 'Denuncia', 'Sugerencia'] as const
      const deps = ['Infraestructura', 'Rentas', 'Contratación', 'General', 'Salud', 'Cultura'] as const
      const tipo = tipos[i % tipos.length]
      const dep = deps[i % deps.length]
      const urgente = days === 1
      return {
        id: `p${i + 1}`,
        code: `PQRSD-${n}`,
        title: `${tipo}: caso #${n}`,
        subtitle: `${dep} · vence en ${days} día${days > 1 ? 's' : ''}`,
        status: urgente ? 'Crítico' : 'Por vencer',
        statusTone: (urgente ? 'danger' : 'warning') as BadgeTone,
        fields: [
          { label: 'Tipo', value: tipo },
          { label: 'Dependencia', value: dep },
          { label: 'Radicado', value: `RAD-2026-${45000 + n}` },
          { label: 'Ciudadano', value: `Ciudadano demo ${i + 1}` },
          { label: 'Término', value: `${days} día(s) restantes` },
          { label: 'Canal', value: i % 2 === 0 ? 'Ventanilla' : 'Web / correo' },
        ],
        notes:
          i % 2 === 0
            ? 'Asignada a profesional responsable. Semáforo en seguimiento diario.'
            : 'Pendiente de respuesta borrador. Requiere visto bueno del jefe de área.',
      }
    }),
  },
}
