import type { BadgeTone } from '@/components/ui/StatusBadge'

export type RegistryTypeId = 'discapacidad' | 'oferentes' | 'otro'

export type RegistryType = {
  id: RegistryTypeId
  title: string
  shortTitle: string
  description: string
  fields: { key: string; label: string; type: 'text' | 'select' | 'file'; options?: string[] }[]
  openToCitizen: boolean
}

/** Tipos de registro que la alcaldía administra (y el ciudadano puede solicitar). */
export const registryTypes: RegistryType[] = [
  {
    id: 'discapacidad',
    title: 'Personas en condición de discapacidad',
    shortTitle: 'Discapacidad',
    description: 'Inscripción y actualización del registro municipal de discapacidad.',
    openToCitizen: true,
    fields: [
      { key: 'nombre', label: 'Nombre completo', type: 'text' },
      { key: 'documento', label: 'Documento', type: 'text' },
      { key: 'tipoDiscapacidad', label: 'Tipo de discapacidad', type: 'select', options: ['Física', 'Sensorial', 'Cognitiva', 'Múltiple', 'Otra'] },
      { key: 'soporte', label: 'Certificado médico (adjunto)', type: 'file' },
    ],
  },
  {
    id: 'oferentes',
    title: 'Oferentes de productos alimenticios y agropecuarios',
    shortTitle: 'Oferentes agropecuarios',
    description: 'Registro de productores y comercializadores locales.',
    openToCitizen: true,
    fields: [
      { key: 'razonSocial', label: 'Nombre / razón social', type: 'text' },
      { key: 'documento', label: 'Cédula o NIT', type: 'text' },
      { key: 'producto', label: 'Producto principal', type: 'select', options: ['Lácteos', 'Cárnicos', 'Frutas y verduras', 'Granos', 'Otro'] },
      { key: 'soporte', label: 'RUT o cámara de comercio (adjunto)', type: 'file' },
    ],
  },
  {
    id: 'otro',
    title: 'Otro registro municipal',
    shortTitle: 'Otros registros',
    description: 'Registros que la alcaldía cree según necesidad (plantilla genérica).',
    openToCitizen: true,
    fields: [
      { key: 'nombre', label: 'Nombre completo', type: 'text' },
      { key: 'documento', label: 'Documento', type: 'text' },
      { key: 'motivo', label: '¿Qué registro necesitas?', type: 'text' },
      { key: 'soporte', label: 'Documento de soporte (adjunto)', type: 'file' },
    ],
  },
]

export type CitizenRegistryEntry = {
  id: string
  registryTypeId: RegistryTypeId
  municipalityId: string
  municipalityName: string
  department: string
  solicitante: string
  documento: string
  fecha: string
  estado: string
  estadoTone: BadgeTone
  detalle: string
}

export const mockCitizenRegistrations: CitizenRegistryEntry[] = [
  {
    id: '1',
    registryTypeId: 'discapacidad',
    municipalityId: 'san-verde',
    municipalityName: 'Alcaldía San Verde',
    department: 'Meta',
    solicitante: 'María Alejandra Restrepo',
    documento: 'CC 52.448.901',
    fecha: '10/07/2026',
    estado: 'Aprobado',
    estadoTone: 'success',
    detalle: 'Tipo: Física · Certificado cargado',
  },
  {
    id: '2',
    registryTypeId: 'oferentes',
    municipalityId: 'san-verde',
    municipalityName: 'Alcaldía San Verde',
    department: 'Meta',
    solicitante: 'Finca La Esperanza',
    documento: 'NIT 900.778.221-4',
    fecha: '18/07/2026',
    estado: 'En validación',
    estadoTone: 'info',
    detalle: 'Producto: Frutas y verduras',
  },
]

export function findRegistryType(id: string): RegistryType | undefined {
  return registryTypes.find((t) => t.id === id)
}
