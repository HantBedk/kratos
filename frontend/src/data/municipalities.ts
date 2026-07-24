/** Catálogo demo multi-tenant: departamentos → alcaldías. */

export type Municipality = {
  id: string
  name: string
  shortName: string
  department: string
  nit: string
}

export const departments = [
  'Meta',
  'Cundinamarca',
  'Antioquia',
  'Valle del Cauca',
  'Santander',
  'Boyacá',
] as const

export type Department = (typeof departments)[number]

export const municipalities: Municipality[] = [
  {
    id: 'san-verde',
    name: 'Alcaldía San Verde',
    shortName: 'San Verde',
    department: 'Meta',
    nit: '800.123.456-7',
  },
  {
    id: 'villavicencio',
    name: 'Alcaldía de Villavicencio',
    shortName: 'Villavicencio',
    department: 'Meta',
    nit: '892.000.001-1',
  },
  {
    id: 'acacias',
    name: 'Alcaldía de Acacías',
    shortName: 'Acacías',
    department: 'Meta',
    nit: '892.000.002-2',
  },
  {
    id: 'granada-meta',
    name: 'Alcaldía de Granada',
    shortName: 'Granada',
    department: 'Meta',
    nit: '892.000.003-3',
  },
  {
    id: 'zipaquira',
    name: 'Alcaldía de Zipaquirá',
    shortName: 'Zipaquirá',
    department: 'Cundinamarca',
    nit: '890.100.001-1',
  },
  {
    id: 'chia',
    name: 'Alcaldía de Chía',
    shortName: 'Chía',
    department: 'Cundinamarca',
    nit: '890.100.002-2',
  },
  {
    id: 'soacha',
    name: 'Alcaldía de Soacha',
    shortName: 'Soacha',
    department: 'Cundinamarca',
    nit: '890.100.003-3',
  },
  {
    id: 'medellin',
    name: 'Alcaldía de Medellín',
    shortName: 'Medellín',
    department: 'Antioquia',
    nit: '890.200.001-1',
  },
  {
    id: 'rionegro',
    name: 'Alcaldía de Rionegro',
    shortName: 'Rionegro',
    department: 'Antioquia',
    nit: '890.200.002-2',
  },
  {
    id: 'cali',
    name: 'Alcaldía de Santiago de Cali',
    shortName: 'Cali',
    department: 'Valle del Cauca',
    nit: '890.300.001-1',
  },
  {
    id: 'palmira',
    name: 'Alcaldía de Palmira',
    shortName: 'Palmira',
    department: 'Valle del Cauca',
    nit: '890.300.002-2',
  },
  {
    id: 'bucaramanga',
    name: 'Alcaldía de Bucaramanga',
    shortName: 'Bucaramanga',
    department: 'Santander',
    nit: '890.400.001-1',
  },
  {
    id: 'floridablanca',
    name: 'Alcaldía de Floridablanca',
    shortName: 'Floridablanca',
    department: 'Santander',
    nit: '890.400.002-2',
  },
  {
    id: 'tunja',
    name: 'Alcaldía de Tunja',
    shortName: 'Tunja',
    department: 'Boyacá',
    nit: '890.500.001-1',
  },
  {
    id: 'duitama',
    name: 'Alcaldía de Duitama',
    shortName: 'Duitama',
    department: 'Boyacá',
    nit: '890.500.002-2',
  },
]

export function municipalitiesByDepartment(department: string): Municipality[] {
  return municipalities.filter((m) => m.department === department)
}

export function findMunicipality(id: string): Municipality | undefined {
  return municipalities.find((m) => m.id === id)
}

const STORAGE_KEY = 'kratos-citizen-municipality'

export function readCitizenMunicipalityId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function writeCitizenMunicipalityId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}
