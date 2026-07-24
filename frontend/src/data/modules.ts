export type ModuleItem = {
  slug: string
  label: string
  description: string
  phase: 'Núcleo' | 'Expansión' | 'Add-on'
  /** Si el dato mock vive en otro slug de workspace */
  workspaceSlug?: string
  /** Panel KPI del módulo (no es lista operativa) */
  kind?: 'dashboard' | 'workspace'
}

export type ModuleGroup = {
  id: string
  label: string
  /** Icono Bootstrap Icons del módulo en el sidebar (se asigna en build). */
  iconClass?: string
  items: ModuleItem[]
}

function dash(groupId: string, label: string): ModuleItem {
  return {
    slug: `${groupId}-dashboard`,
    label: 'Dashboard',
    description: `Panel de indicadores de ${label}.`,
    phase: 'Núcleo',
    kind: 'dashboard',
  }
}

function withDash(group: ModuleGroup): ModuleGroup {
  if (group.items.some((i) => i.kind === 'dashboard')) return group
  return {
    ...group,
    items: [dash(group.id, group.label), ...group.items],
  }
}

const baseGroups: ModuleGroup[] = [
  {
    id: 'presupuesto',
    label: 'Presupuesto',
    items: [
      {
        slug: 'presupuesto',
        label: 'CDP y disponibilidades',
        description: 'Certificados de disponibilidad presupuestal.',
        phase: 'Núcleo',
      },
      {
        slug: 'presupuesto-rp',
        label: 'Registros presupuestales (RP)',
        description: 'Compromisos y registros sobre CDP.',
        phase: 'Núcleo',
        workspaceSlug: 'presupuesto',
      },
      {
        slug: 'presupuesto-adiciones',
        label: 'Adiciones y modificaciones',
        description: 'Cambios a la apropiación de la vigencia.',
        phase: 'Núcleo',
        workspaceSlug: 'presupuesto',
      },
      {
        slug: 'presupuesto-saldos',
        label: 'Saldos por rubro',
        description: 'Consulta de saldos disponibles por rubro.',
        phase: 'Núcleo',
        workspaceSlug: 'presupuesto',
      },
    ],
  },
  {
    id: 'financiero',
    label: 'Financiero',
    items: [
      {
        slug: 'cartera-ciudadania',
        label: 'Deuda tributaria ciudadanía',
        description: 'Cuánto debe la ciudadanía en predial, ICA y otros conceptos.',
        phase: 'Núcleo',
      },
      {
        slug: 'recaudo-consolidado',
        label: 'Recaudo consolidado',
        description: 'Recaudo del mes y de la vigencia por concepto.',
        phase: 'Núcleo',
      },
      {
        slug: 'proyeccion-ingresos',
        label: 'Proyección de ingresos',
        description: 'Meta vs recaudo y proyección de cierre.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'contabilidad',
    label: 'Contabilidad',
    items: [
      {
        slug: 'contabilidad',
        label: 'Comprobantes contables',
        description: 'Captura y contabilización de asientos.',
        phase: 'Núcleo',
      },
      {
        slug: 'contabilidad-causacion',
        label: 'Causación',
        description: 'Hechos económicos pendientes de asiento.',
        phase: 'Núcleo',
        workspaceSlug: 'contabilidad',
      },
      {
        slug: 'contabilidad-libros',
        label: 'Libros y reportes',
        description: 'Libros oficiales y reportes NIIF SP.',
        phase: 'Núcleo',
        workspaceSlug: 'contabilidad',
      },
    ],
  },
  {
    id: 'tesoreria',
    label: 'Tesorería',
    items: [
      {
        slug: 'tesoreria',
        label: 'Movimientos de caja y bancos',
        description: 'Ingresos, egresos y traslados.',
        phase: 'Núcleo',
      },
      {
        slug: 'ordenes-pago',
        label: 'Órdenes de pago',
        description: 'Egresos autorizados a terceros y nómina.',
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
    id: 'radicacion',
    label: 'Radicación de cuentas',
    items: [
      {
        slug: 'radicacion-cuentas',
        label: 'Cuentas de cobro',
        description: 'Ventanilla de cuentas hasta la causación.',
        phase: 'Núcleo',
      },
      {
        slug: 'radicacion-revision',
        label: 'Revisión técnica',
        description: 'Cuentas en revisión antes de causación.',
        phase: 'Núcleo',
        workspaceSlug: 'radicacion-cuentas',
      },
      {
        slug: 'radicacion-causacion',
        label: 'Causación',
        description: 'Paso a orden de pago / contabilidad.',
        phase: 'Núcleo',
        workspaceSlug: 'radicacion-cuentas',
      },
    ],
  },
  {
    id: 'contratacion',
    label: 'Contratación',
    items: [
      {
        slug: 'estudios-previos',
        label: 'Estudios previos y pliegos',
        description: 'Expediente precontractual.',
        phase: 'Núcleo',
      },
      {
        slug: 'contratos',
        label: 'Contratos',
        description: 'Legalización, ejecución y liquidación.',
        phase: 'Núcleo',
      },
      {
        slug: 'polizas',
        label: 'Pólizas y garantías',
        description: 'Amparos y alertas de vencimiento.',
        phase: 'Núcleo',
      },
    ],
  },

  /* —— Impuestos municipales (cada uno con menú propio) —— */
  {
    id: 'predial',
    label: 'Impuesto predial',
    items: [
      {
        slug: 'predial',
        label: 'Liquidaciones y cartera',
        description: 'Saldos por predio y vigencia.',
        phase: 'Núcleo',
      },
      {
        slug: 'predial-base',
        label: 'Base catastral',
        description: 'Fichas, avalúos y propietarios.',
        phase: 'Núcleo',
        workspaceSlug: 'predial',
      },
      {
        slug: 'predial-liquidacion',
        label: 'Liquidación',
        description: 'Cálculo de impuesto e intereses.',
        phase: 'Núcleo',
        workspaceSlug: 'predial',
      },
      {
        slug: 'predial-cobro',
        label: 'Gestión de cobro',
        description: 'Persuasivo y acuerdos de pago.',
        phase: 'Núcleo',
        workspaceSlug: 'predial',
      },
    ],
  },
  {
    id: 'ica',
    label: 'Industria y comercio',
    items: [
      {
        slug: 'ica',
        label: 'Declaraciones y cartera',
        description: 'ICA por periodo y contribuyente.',
        phase: 'Núcleo',
      },
      {
        slug: 'ica-inscripcion',
        label: 'Inscripción de establecimientos',
        description: 'RUT municipal / actividad económica.',
        phase: 'Núcleo',
        workspaceSlug: 'ica',
      },
      {
        slug: 'ica-sanciones',
        label: 'Sanciones e intereses',
        description: 'Extemporaneidad y omisos.',
        phase: 'Núcleo',
        workspaceSlug: 'ica',
      },
      {
        slug: 'ica-fiscalizacion',
        label: 'Fiscalización',
        description: 'Casos en revisión de ingresos.',
        phase: 'Expansión',
        workspaceSlug: 'ica',
      },
    ],
  },
  {
    id: 'delineacion',
    label: 'Delineación urbana',
    items: [
      {
        slug: 'delineacion',
        label: 'Liquidaciones de tasa',
        description: 'Tasas por licencia / urbanismo.',
        phase: 'Núcleo',
      },
      {
        slug: 'delineacion-licencias',
        label: 'Licencias de construcción',
        description: 'Trámites urbanísticos en curso.',
        phase: 'Núcleo',
        workspaceSlug: 'delineacion',
      },
      {
        slug: 'delineacion-pagos',
        label: 'Pagos y paz y salvos',
        description: 'Recaudo de tasas liquidables.',
        phase: 'Núcleo',
        workspaceSlug: 'delineacion',
      },
    ],
  },
  {
    id: 'deguello',
    label: 'Degüello de ganado',
    items: [
      {
        slug: 'deguello',
        label: 'Guías y liquidaciones',
        description: 'Impuesto de degüello por guía.',
        phase: 'Núcleo',
      },
      {
        slug: 'deguello-matadero',
        label: 'Control de matadero',
        description: 'Ingresos y salidas de animales.',
        phase: 'Núcleo',
        workspaceSlug: 'deguello',
      },
      {
        slug: 'deguello-recaudo',
        label: 'Recaudo',
        description: 'Pagos asociados a guías.',
        phase: 'Núcleo',
        workspaceSlug: 'deguello',
      },
    ],
  },
  {
    id: 'estampillas',
    label: 'Estampillas',
    items: [
      {
        slug: 'estampillas',
        label: 'Liquidaciones',
        description: 'Estampillas por contrato o acto.',
        phase: 'Núcleo',
      },
      {
        slug: 'estampillas-contratos',
        label: 'Ligadas a contratos',
        description: 'Cruce con contratación.',
        phase: 'Núcleo',
        workspaceSlug: 'estampillas',
      },
      {
        slug: 'estampillas-recaudo',
        label: 'Recaudo',
        description: 'Pagos y recibos.',
        phase: 'Núcleo',
        workspaceSlug: 'estampillas',
      },
    ],
  },
  {
    id: 'exogena',
    label: 'Información exógena',
    items: [
      {
        slug: 'exogena',
        label: 'Reportes y envíos',
        description: 'Presentaciones a entidades de control.',
        phase: 'Núcleo',
      },
      {
        slug: 'exogena-cruces',
        label: 'Cruces e inconsistencias',
        description: 'Predial / ICA / RUT / terceros.',
        phase: 'Núcleo',
        workspaceSlug: 'exogena',
      },
      {
        slug: 'exogena-calendario',
        label: 'Calendario de cortes',
        description: 'Fechas de obligación de reporte.',
        phase: 'Núcleo',
        workspaceSlug: 'exogena',
      },
    ],
  },
  {
    id: 'estados-cuenta',
    label: 'Estados de cuenta',
    items: [
      {
        slug: 'facturacion',
        label: 'Emisión de estados',
        description: 'Facturas y estados de cuenta.',
        phase: 'Núcleo',
      },
      {
        slug: 'estados-notificacion',
        label: 'Notificación al contribuyente',
        description: 'Envío y constancia (demo).',
        phase: 'Núcleo',
        workspaceSlug: 'facturacion',
      },
      {
        slug: 'estados-pendientes',
        label: 'Pendientes de pago',
        description: 'Cartera documentada en estados.',
        phase: 'Núcleo',
        workspaceSlug: 'facturacion',
      },
    ],
  },
  {
    id: 'entidades',
    label: 'Entidades descentralizadas',
    items: [
      {
        slug: 'entidades',
        label: 'Entidades y convenios',
        description: 'Agregadas / descentralizadas vinculadas.',
        phase: 'Núcleo',
      },
      {
        slug: 'entidades-cartera',
        label: 'Cartera reportada',
        description: 'Saldos que reportan al municipio.',
        phase: 'Núcleo',
        workspaceSlug: 'entidades',
      },
      {
        slug: 'entidades-recaudo',
        label: 'Recaudo compartido',
        description: 'PSE / bancos por entidad.',
        phase: 'Núcleo',
        workspaceSlug: 'entidades',
      },
    ],
  },
  {
    id: 'pse',
    label: 'Pagos PSE',
    items: [
      {
        slug: 'pse',
        label: 'Transacciones',
        description: 'Aprobadas, pendientes y rechazadas.',
        phase: 'Núcleo',
      },
      {
        slug: 'pse-lotes',
        label: 'Lotes y conciliación',
        description: 'Cruce con bancos.',
        phase: 'Núcleo',
        workspaceSlug: 'pse',
      },
      {
        slug: 'pse-rechazos',
        label: 'Rechazos y expiradas',
        description: 'Reintentos de pago.',
        phase: 'Núcleo',
        workspaceSlug: 'pse',
      },
    ],
  },
  {
    id: 'cobro',
    label: 'Cobro coactivo',
    items: [
      {
        slug: 'cobro-coactivo',
        label: 'Expedientes',
        description: 'Persuasivo y coactivo.',
        phase: 'Expansión',
      },
      {
        slug: 'cobro-mandamientos',
        label: 'Mandamientos',
        description: 'Actos de cobro.',
        phase: 'Expansión',
        workspaceSlug: 'cobro-coactivo',
      },
      {
        slug: 'cobro-medidas',
        label: 'Medidas cautelares',
        description: 'Embargos y secuestros (demo).',
        phase: 'Expansión',
        workspaceSlug: 'cobro-coactivo',
      },
    ],
  },

  {
    id: 'talento',
    label: 'Talento humano',
    items: [
      {
        slug: 'nomina',
        label: 'Nómina pública',
        description: 'Liquidación y novedades.',
        phase: 'Núcleo',
      },
      {
        slug: 'vacaciones',
        label: 'Vacaciones y permisos',
        description: 'Solicitudes y aprobaciones.',
        phase: 'Expansión',
      },
      {
        slug: 'biometria',
        label: 'Asistencia biométrica',
        description: 'Control de jornada (roadmap).',
        phase: 'Add-on',
      },
    ],
  },
  {
    id: 'almacen',
    label: 'Almacén',
    items: [
      {
        slug: 'almacen',
        label: 'Entradas y salidas',
        description: 'Kardex de consumo y devolutivos.',
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
    label: 'Documental',
    items: [
      {
        slug: 'ventanilla',
        label: 'Ventanilla única',
        description: 'Radicación y asignación.',
        phase: 'Núcleo',
      },
      {
        slug: 'archivo',
        label: 'Archivo digital',
        description: 'Expedientes y soporte a auditoría.',
        phase: 'Núcleo',
      },
    ],
  },
  {
    id: 'pqrsd',
    label: 'PQRSD',
    items: [
      {
        slug: 'pqrsd-bandeja',
        label: 'Mi bandeja',
        description: 'Solo lo asignado a tu rol (o todo si eres ventanilla).',
        phase: 'Núcleo',
      },
      {
        slug: 'pqrsd-asignacion',
        label: 'Asignar a áreas',
        description: 'Clasificar y enviar a Hacienda, Obras, Jurídica…',
        phase: 'Núcleo',
      },
      {
        slug: 'pqrsd-vencimientos',
        label: 'Por vencer',
        description: 'Alertas de término legal de tu bandeja.',
        phase: 'Núcleo',
      },
      {
        slug: 'pqrsd-respuestas',
        label: 'Responder',
        description: 'Oficio de respuesta y soportes al ciudadano.',
        phase: 'Núcleo',
      },
      {
        slug: 'pqrsd-matriz',
        label: 'Quién recibe qué',
        description: 'Matriz de notificaciones por rol.',
        phase: 'Núcleo',
      },
    ],
  },
  {
    id: 'registros',
    label: 'Registros municipales',
    items: [
      {
        slug: 'registros-discapacidad',
        label: 'Discapacidad',
        description: 'Personas en condición de discapacidad.',
        phase: 'Núcleo',
      },
      {
        slug: 'registros-oferentes',
        label: 'Oferentes agropecuarios',
        description: 'Productos alimenticios y agropecuarios.',
        phase: 'Núcleo',
      },
      {
        slug: 'registros-catalogo',
        label: 'Catálogo de registros',
        description: 'Tipos que la alcaldía puede crear.',
        phase: 'Núcleo',
      },
      {
        slug: 'registros-validacion',
        label: 'Validación y anexos',
        description: 'Revisión, documentos y actualización.',
        phase: 'Núcleo',
        workspaceSlug: 'registros-discapacidad',
      },
      {
        slug: 'registros-reportes',
        label: 'Reportes',
        description: 'Listados e indicadores del registro.',
        phase: 'Expansión',
        workspaceSlug: 'registros-catalogo',
      },
    ],
  },
  {
    id: 'planeacion',
    label: 'Planeación',
    items: [
      {
        slug: 'plan-desarrollo',
        label: 'Plan de desarrollo',
        description: 'Metas e indicadores.',
        phase: 'Expansión',
      },
      {
        slug: 'banco-proyectos',
        label: 'Banco de proyectos',
        description: 'Formulación y priorización.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'juridica',
    label: 'Jurídica',
    items: [
      {
        slug: 'tutelas',
        label: 'Tutelas',
        description: 'Términos y evidencias.',
        phase: 'Expansión',
      },
      {
        slug: 'procesos',
        label: 'Procesos judiciales',
        description: 'Inventario de litigios.',
        phase: 'Expansión',
      },
    ],
  },
  {
    id: 'gerencia',
    label: 'Alta gerencia',
    items: [
      {
        slug: 'tableros',
        label: 'Tableros BI',
        description: 'Recaudo, ejecución y contratos.',
        phase: 'Expansión',
      },
      {
        slug: 'mipg',
        label: 'Indicadores MIPG',
        description: 'Seguimiento de gestión.',
        phase: 'Expansión',
      },
    ],
  },
]

/**
 * Icono propio de cada módulo (Bootstrap Icons), elegido por la semántica del
 * dominio municipal para que cada módulo sea reconocible de un vistazo:
 * - Financieros: calculadora (presupuesto), billetera (financiero), libro
 *   contable, monedas (tesorería), recibo (radicación).
 * - Impuestos: casas (predial), tienda (ICA), reglas (delineación), etiquetas
 *   (degüello/guías), estampilla, hoja de cálculo (exógena), recibo recortado
 *   (estados de cuenta), organigrama (entidades), tarjeta (PSE), mazo (coactivo).
 * - Transversales: personas (talento), caja (almacén), carpeta (documental),
 *   chat (PQRSD), lista (registros), brújula (planeación), escudo (jurídica),
 *   barras (alta gerencia).
 */
const groupIcons: Record<string, string> = {
  presupuesto: 'bi-calculator',
  financiero: 'bi-wallet2',
  contabilidad: 'bi-journal-text',
  tesoreria: 'bi-cash-coin',
  radicacion: 'bi-receipt',
  contratacion: 'bi-briefcase',
  predial: 'bi-houses',
  ica: 'bi-shop',
  delineacion: 'bi-rulers',
  deguello: 'bi-tags',
  estampillas: 'bi-postage',
  exogena: 'bi-file-earmark-spreadsheet',
  'estados-cuenta': 'bi-receipt-cutoff',
  entidades: 'bi-diagram-3',
  pse: 'bi-credit-card',
  cobro: 'bi-hammer',
  talento: 'bi-people',
  almacen: 'bi-box-seam',
  documental: 'bi-folder2-open',
  pqrsd: 'bi-chat-left-text',
  registros: 'bi-card-list',
  planeacion: 'bi-compass',
  juridica: 'bi-shield-check',
  gerencia: 'bi-bar-chart-line',
}

export const moduleGroups: ModuleGroup[] = baseGroups.map((group) =>
  withDash({ ...group, iconClass: groupIcons[group.id] ?? 'bi-folder' }),
)

export const quickLinks = [
  { to: '/app/dashboard', label: 'Dashboard', iconClass: 'bi bi-speedometer2' },
  { to: '/app/modulos/predial-dashboard', label: 'Predial', iconClass: 'bi bi-building' },
  { to: '/app/modulos/contratos', label: 'Contratos', iconClass: 'bi bi-briefcase' },
  { to: '/ciudadano', label: 'Portal ciudadano', iconClass: 'bi bi-people' },
]

/** Grupos de impuestos municipales (menú Hacienda). */
export const taxModuleGroupIds = [
  'predial',
  'ica',
  'delineacion',
  'deguello',
  'estampillas',
  'exogena',
  'estados-cuenta',
  'entidades',
  'pse',
  'cobro',
] as const

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

export function resolveWorkspaceSlug(slug: string): string {
  const mod = findModule(slug)
  if (mod?.kind === 'dashboard') return slug
  return mod?.workspaceSlug ?? slug
}
