import type { LucideIcon } from 'lucide-react'
import {
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileStack,
  Gavel,
  Landmark,
  LayoutDashboard,
  Package,
  Scale,
  Users,
  Wallet,
} from 'lucide-react'

export type ModuleItem = {
  slug: string
  label: string
  description: string
  phase: 'Núcleo' | 'Expansión' | 'Add-on'
}

export type ModuleGroup = {
  id: string
  label: string
  icon: LucideIcon
  items: ModuleItem[]
}

export const moduleGroups: ModuleGroup[] = [
  {
    id: 'financiero',
    label: 'Financiero y presupuestal',
    icon: Wallet,
    items: [
      {
        slug: 'presupuesto',
        label: 'Presupuesto',
        description: 'CDP, registros presupuestales, adiciones y saldos por rubro.',
        phase: 'Núcleo',
      },
      {
        slug: 'contabilidad',
        label: 'Contabilidad pública',
        description: 'Registro contable NIIF SP e integración con hechos económicos.',
        phase: 'Núcleo',
      },
      {
        slug: 'tesoreria',
        label: 'Tesorería',
        description: 'Flujos de caja, bancos y control de liquidez municipal.',
        phase: 'Núcleo',
      },
      {
        slug: 'ordenes-pago',
        label: 'Órdenes de pago',
        description: 'Egresos autorizados a contratistas, proveedores y nómina.',
        phase: 'Núcleo',
      },
      {
        slug: 'radicacion-cuentas',
        label: 'Radicación de cuentas',
        description: 'Ventanilla de cuentas de cobro hasta la causación.',
        phase: 'Núcleo',
      },
      {
        slug: 'conciliacion-bancaria',
        label: 'Conciliación bancaria',
        description: 'Cruce de extractos y movimientos del sistema.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'contratacion',
    label: 'Contratación y compras',
    icon: BriefcaseBusiness,
    items: [
      {
        slug: 'estudios-previos',
        label: 'Estudios previos y pliegos',
        description: 'Expediente precontractual con versiones y aprobaciones.',
        phase: 'Núcleo',
      },
      {
        slug: 'contratos',
        label: 'Contratos',
        description: 'Legalización, supervisión, actas, otrosíes y pólizas.',
        phase: 'Núcleo',
      },
      {
        slug: 'polizas',
        label: 'Pólizas y garantías',
        description: 'Alertas de vencimiento y amparos contractuales.',
        phase: 'Núcleo',
      },
    ],
  },
  {
    id: 'rentas',
    label: 'Tributario y rentas',
    icon: Landmark,
    items: [
      {
        slug: 'predial',
        label: 'Impuesto predial',
        description: 'Liquidación, facturación, cartera y portal de pago.',
        phase: 'Núcleo',
      },
      {
        slug: 'ica',
        label: 'Industria y comercio',
        description: 'ICA municipal, sanciones y seguimiento de cartera.',
        phase: 'Núcleo',
      },
      {
        slug: 'estampillas',
        label: 'Estampillas',
        description: 'Liquidación y recaudo de estampillas ligadas a contratos y actos.',
        phase: 'Núcleo',
      },
      {
        slug: 'pse',
        label: 'Facturación y PSE',
        description: 'Estados de cuenta y recaudo electrónico.',
        phase: 'Núcleo',
      },
      {
        slug: 'cobro-coactivo',
        label: 'Cobro coactivo',
        description: 'Expedientes de cobro persuasivo y coactivo.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'talento',
    label: 'Talento humano',
    icon: Users,
    items: [
      {
        slug: 'nomina',
        label: 'Nómina pública',
        description: 'Liquidación, novedades y enlace a tesorería.',
        phase: 'Núcleo',
      },
      {
        slug: 'vacaciones',
        label: 'Vacaciones y permisos',
        description: 'Solicitudes, saldos y aprobaciones.',
        phase: 'Expansión',
      },
      {
        slug: 'biometria',
        label: 'Asistencia biométrica',
        description: 'Control de jornada con biometría (roadmap).',
        phase: 'Add-on',
      },
    ],
  },
  {
    id: 'almacen',
    label: 'Almacén e inventarios',
    icon: Package,
    items: [
      {
        slug: 'almacen',
        label: 'Entradas y salidas',
        description: 'Kardex de bienes de consumo y devolutivos.',
        phase: 'Expansión',
      },
      {
        slug: 'activos-fijos',
        label: 'Activos fijos',
        description: 'Asignación, depreciación y bajas.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'documental',
    label: 'Documental y ciudadano',
    icon: FileStack,
    items: [
      {
        slug: 'ventanilla',
        label: 'Ventanilla única',
        description: 'Radicación, asignación y seguimiento.',
        phase: 'Núcleo',
      },
      {
        slug: 'pqrsd',
        label: 'PQRSD',
        description: 'Términos legales con semáforo de vencimientos.',
        phase: 'Núcleo',
      },
      {
        slug: 'archivo',
        label: 'Archivo digital',
        description: 'Expedientes digitales y soporte a auditoría.',
        phase: 'Núcleo',
      },
    ],
  },
  {
    id: 'planeacion',
    label: 'Planeación',
    icon: ClipboardList,
    items: [
      {
        slug: 'plan-desarrollo',
        label: 'Plan de desarrollo',
        description: 'Metas, indicadores y avance institucional.',
        phase: 'Expansión',
      },
      {
        slug: 'banco-proyectos',
        label: 'Banco de proyectos',
        description: 'Formulación y priorización de inversión.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'juridica',
    label: 'Defensa judicial',
    icon: Scale,
    items: [
      {
        slug: 'tutelas',
        label: 'Tutelas',
        description: 'Control de términos y evidencias de respuesta.',
        phase: 'Expansión',
      },
      {
        slug: 'procesos',
        label: 'Procesos judiciales',
        description: 'Inventario de litigios y alertas.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'gerencia',
    label: 'Alta gerencia',
    icon: LayoutDashboard,
    items: [
      {
        slug: 'tableros',
        label: 'Tableros BI',
        description: 'Recaudo, ejecución, contratos y PQRSD en vivo.',
        phase: 'Expansión',
      },
      {
        slug: 'mipg',
        label: 'Indicadores MIPG',
        description: 'Seguimiento de gestión institucional.',
        phase: 'Expansión',
      },
    ],
  },
]

export const quickLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/modulos/predial', label: 'Predial', icon: Building2 },
  { to: '/app/modulos/contratos', label: 'Contratos', icon: Gavel },
  { to: '/ciudadano', label: 'Portal ciudadano', icon: Landmark },
]

export function findModule(slug: string): ModuleItem | undefined {
  for (const group of moduleGroups) {
    const found = group.items.find((item) => item.slug === slug)
    if (found) return found
  }
  return undefined
}

export function findModuleGroup(slug: string): ModuleGroup | undefined {
  return moduleGroups.find((group) => group.items.some((item) => item.slug === slug))
}
