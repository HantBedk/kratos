import type { BadgeTone } from '@/components/ui/StatusBadge'
import { formatCOP } from '@/lib/money'
import {
  FileCheck2,
  FileSearch,
  Landmark,
  MessageSquareWarning,
  type LucideIcon,
} from 'lucide-react'

export type CitizenService = {
  slug: string
  title: string
  description: string
  to: string
  icon: LucideIcon
}

export const citizenServices: CitizenService[] = [
  {
    slug: 'impuestos',
    title: 'Impuestos',
    description: 'Consulta qué debes, por concepto y monto; paga con PSE (demo).',
    to: '/ciudadano/impuestos',
    icon: Landmark,
  },
  {
    slug: 'pqrsd',
    title: 'PQRSD',
    description: 'Radica peticiones, quejas, reclamos, sugerencias o denuncias y sigue el estado.',
    to: '/ciudadano/pqrsd',
    icon: MessageSquareWarning,
  },
  {
    slug: 'certificados',
    title: 'Certificados',
    description: 'Solicita residencia o estratificación y descarga el documento aprobado.',
    to: '/ciudadano/certificados',
    icon: FileCheck2,
  },
  {
    slug: 'expediente',
    title: 'Expediente',
    description: 'Consulta el historial unificado de tus trámites, documentos y estados.',
    to: '/ciudadano/expediente',
    icon: FileSearch,
  },
]

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
      origen: 'Portal · Certificados',
      estado: 'En revisión',
      estadoTone: 'info',
    },
    {
      id: '2',
      fecha: '15/07/2026 16:02',
      titulo: 'Certificado de residencia aprobado',
      detalle: 'CER-RES-2026-091 · Documento listo para descarga',
      origen: 'Portal · Certificados',
      estado: 'Aprobado',
      estadoTone: 'success',
    },
    {
      id: '3',
      fecha: '10/07/2026 11:30',
      titulo: 'PQRSD en trámite',
      detalle: 'PQR-2026-00421 · Asignada a Secretaría de Infraestructura',
      origen: 'Portal · PQRSD',
      estado: 'En trámite',
      estadoTone: 'info',
    },
    {
      id: '4',
      fecha: '05/07/2026 08:45',
      titulo: 'Obligación predial consultada',
      detalle: `Ficha 01-02-003-00045 · Saldo ${formatCOP(842_500)}`,
      origen: 'Portal · Impuestos',
      estado: 'En mora',
      estadoTone: 'warning',
    },
    {
      id: '5',
      fecha: '28/06/2026 14:20',
      titulo: 'PQRSD respondida',
      detalle: 'PQR-2026-00388 · Respuesta notificada al ciudadano',
      origen: 'Consola · PQRSD',
      estado: 'Respondida',
      estadoTone: 'success',
    },
  ],
}
