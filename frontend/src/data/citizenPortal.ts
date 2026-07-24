import type { BadgeTone } from '@/components/ui/StatusBadge'
import { formatCOP } from '@/lib/money'

export type CitizenService = {
  slug: string
  /** Título corto en menú */
  title: string
  /** Verbo claro para la persona del común */
  action: string
  description: string
  hint: string
  to: string
  /** Bootstrap Icons, e.g. `bi bi-bank` */
  iconClass: string
}

export const citizenServices: CitizenService[] = [
  {
    slug: 'impuestos',
    title: 'Impuestos',
    action: 'Pagar',
    description: 'Deudas y pagos',
    hint: 'Predial e ICA',
    to: '/ciudadano/impuestos',
    iconClass: 'bi bi-bank',
  },
  {
    slug: 'registros',
    title: 'Registros',
    action: 'Inscribirme',
    description: 'Registros municipales',
    hint: 'Elige tu alcaldía',
    to: '/ciudadano/registros',
    iconClass: 'bi bi-clipboard-data',
  },
  {
    slug: 'pqrsd',
    title: 'Peticiones',
    action: 'Radicar',
    description: 'PQRSD',
    hint: 'Seguimiento',
    to: '/ciudadano/pqrsd',
    iconClass: 'bi bi-chat-left-text',
  },
  {
    slug: 'certificados',
    title: 'Certificados',
    action: 'Solicitar',
    description: 'Documentos',
    hint: 'Descarga',
    to: '/ciudadano/certificados',
    iconClass: 'bi bi-file-earmark-check',
  },
  {
    slug: 'expediente',
    title: 'Historial',
    action: 'Ver',
    description: 'Todo junto',
    hint: 'Línea de tiempo',
    to: '/ciudadano/expediente',
    iconClass: 'bi bi-clock-history',
  },
]

export type CitizenPayment = {
  id: string
  concepto: string
  referencia: string
  fecha: string
  valor: number
  canal: string
}

/** Pagos ya realizados (demo del ciudadano). */
export const mockCitizenPayments: CitizenPayment[] = [
  {
    id: '1',
    concepto: 'Predial',
    referencia: '01-02-008-00112',
    fecha: '12/03/2026',
    valor: 620_000,
    canal: 'PSE',
  },
  {
    id: '2',
    concepto: 'ICA',
    referencia: 'ICA-2025-Q4',
    fecha: '28/01/2026',
    valor: 980_000,
    canal: 'Banco',
  },
  {
    id: '3',
    concepto: 'Predial',
    referencia: '01-02-003-00045',
    fecha: '15/11/2025',
    valor: 410_000,
    canal: 'Caja',
  },
]

export function citizenDebtTotal(items: TaxObligation[] = mockTaxObligations): number {
  return items.reduce((acc, row) => acc + row.saldo, 0)
}

export function citizenPaidTotal(items: CitizenPayment[] = mockCitizenPayments): number {
  return items.reduce((acc, row) => acc + row.valor, 0)
}

/** Resumen por concepto: qué debe y por qué. */
export function citizenDebtByConcept(items: TaxObligation[] = mockTaxObligations) {
  const map = new Map<string, { concepto: string; saldo: number; items: number }>()
  for (const row of items) {
    if (row.saldo <= 0) continue
    const prev = map.get(row.concepto) ?? { concepto: row.concepto, saldo: 0, items: 0 }
    prev.saldo += row.saldo
    prev.items += 1
    map.set(row.concepto, prev)
  }
  return [...map.values()]
}

export type TaxObligation = {
  id: string
  concepto: 'Predial' | 'ICA'
  referencia: string
  vigencia: string
  detalle: string
  saldo: number
  estado: 'Al día' | 'En mora' | 'Parcial'
  estadoTone: BadgeTone
}

export const mockTaxObligations: TaxObligation[] = [
  {
    id: '1',
    concepto: 'Predial',
    referencia: '01-02-003-00045',
    vigencia: '2026',
    detalle: 'Calle 8 # 12-40, Centro · María Alejandra Restrepo',
    saldo: 842_500,
    estado: 'En mora',
    estadoTone: 'warning',
  },
  {
    id: '2',
    concepto: 'ICA',
    referencia: 'ICA-2026-1188',
    vigencia: '2026-Q1',
    detalle: 'Comercio al por menor · NIT 900.123.456-7',
    saldo: 1_250_000,
    estado: 'En mora',
    estadoTone: 'warning',
  },
  {
    id: '3',
    concepto: 'Predial',
    referencia: '01-02-008-00112',
    vigencia: '2026',
    detalle: 'Carrera 5 # 3-20 · Juan Carlos Méndez',
    saldo: 0,
    estado: 'Al día',
    estadoTone: 'success',
  },
]

export type CitizenPqrsd = {
  id: string
  radicado: string
  tipo: string
  asunto: string
  fecha: string
  estado: string
  estadoTone: BadgeTone
  respuesta?: string
}

export const mockCitizenPqrsd: CitizenPqrsd[] = [
  {
    id: '1',
    radicado: 'PQR-2026-00421',
    tipo: 'Petición',
    asunto: 'Solicitud de mantenimiento de vía barrio El Centro',
    fecha: '10/07/2026',
    estado: 'En trámite',
    estadoTone: 'info',
  },
  {
    id: '2',
    radicado: 'PQR-2026-00388',
    tipo: 'Reclamo',
    asunto: 'Factura predial con valor inconsistente',
    fecha: '28/06/2026',
    estado: 'Respondida',
    estadoTone: 'success',
    respuesta: 'Se corrigió la liquidación y se emitió nuevo estado de cuenta.',
  },
]

export type CitizenCertificate = {
  id: string
  tipo: 'Residencia' | 'Estratificación'
  numero: string
  solicitante: string
  fecha: string
  estado: string
  estadoTone: BadgeTone
}

export const mockCertificates: CitizenCertificate[] = [
  {
    id: '1',
    tipo: 'Residencia',
    numero: 'CER-RES-2026-091',
    solicitante: 'María Alejandra Restrepo',
    fecha: '15/07/2026',
    estado: 'Aprobado',
    estadoTone: 'success',
  },
  {
    id: '2',
    tipo: 'Estratificación',
    numero: 'CER-EST-2026-044',
    solicitante: 'María Alejandra Restrepo',
    fecha: '18/07/2026',
    estado: 'En revisión',
    estadoTone: 'info',
  },
]

export type ExpedienteEvent = {
  id: string
  fecha: string
  titulo: string
  detalle: string
  origen: string
  estado: string
  estadoTone: BadgeTone
}

/** Perfil del ciudadano (demo). La cédula es un identificador inmutable. */
export type CitizenProfile = {
  nombre: string
  /** Documento de identidad. No editable. */
  cedula: string
  email: string
  telefono: string
  direccion: string
  municipio: string
  iniciales: string
  miembroDesde: string
}

export const citizenProfile: CitizenProfile = {
  nombre: 'María Alejandra Restrepo',
  cedula: 'CC 52.448.901',
  email: 'maria.restrepo@correo.com',
  telefono: '+57 310 555 4820',
  direccion: 'Calle 8 # 12-40, Barrio Centro',
  municipio: 'San Verde, Putumayo',
  iniciales: 'MR',
  miembroDesde: 'Marzo 2024',
}

export const mockExpediente: {
  documento: string
  ciudadano: string
  eventos: ExpedienteEvent[]
} = {
  documento: 'CC 52.448.901',
  ciudadano: 'María Alejandra Restrepo',
  eventos: [
    {
      id: '1',
      fecha: '18/07/2026 09:14',
      titulo: 'Certificado de estratificación radicado',
      detalle: 'CER-EST-2026-044 · Anexos: recibo servicios',
      origen: 'Certificados',
      estado: 'En revisión',
      estadoTone: 'info',
    },
    {
      id: '2',
      fecha: '15/07/2026 16:02',
      titulo: 'Certificado de residencia aprobado',
      detalle: 'CER-RES-2026-091 · Documento listo para descarga',
      origen: 'Certificados',
      estado: 'Aprobado',
      estadoTone: 'success',
    },
    {
      id: '3',
      fecha: '10/07/2026 11:30',
      titulo: 'Petición en trámite',
      detalle: 'PQR-2026-00421 · Secretaría de Infraestructura',
      origen: 'Peticiones',
      estado: 'En trámite',
      estadoTone: 'info',
    },
    {
      id: '4',
      fecha: '05/07/2026 08:45',
      titulo: 'Consulta de predial',
      detalle: `Ficha 01-02-003-00045 · Saldo ${formatCOP(842_500)}`,
      origen: 'Impuestos',
      estado: 'En mora',
      estadoTone: 'warning',
    },
    {
      id: '5',
      fecha: '28/06/2026 14:20',
      titulo: 'Reclamo respondido',
      detalle: 'PQR-2026-00388 · Ya puedes ver la respuesta',
      origen: 'Peticiones',
      estado: 'Respondida',
      estadoTone: 'success',
    },
  ],
}
