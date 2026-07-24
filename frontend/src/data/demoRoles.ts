import type { ModuleGroup } from '@/data/modules'
import { moduleGroups } from '@/data/modules'

export type DemoRoleId =
  | 'admin'
  | 'ciudadano'
  | 'secretaria'
  | 'hacienda'
  | 'contabilidad'
  | 'financiero'
  | 'tesoreria'
  | 'contratacion'
  | 'planeacion'
  | 'almacen'
  | 'juridica'

export type DemoRole = {
  id: DemoRoleId
  label: string
  description: string
  name: string
  email: string
  /** Cédula demo (101–111). También sirve como usuario de ingreso. */
  cedula: string
  initials: string
  /** Destino tras autenticar */
  home: string
  /** true = consola + portal; false = solo portal */
  consoleAccess: boolean
  /** Grupos del sidebar; '*' = todos */
  groups: '*' | string[]
  /** Si se define, limita a estos slugs dentro de los grupos permitidos */
  slugs?: string[]
}

/** Contraseña única de la demo (todos los perfiles). */
export const DEMO_PASSWORD = '1qwer432'

export const demoRoles: DemoRole[] = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Acceso total a consola y portal.',
    name: 'Admin SelvaTic',
    email: 'admin@prueba.com',
    cedula: '101',
    initials: 'AD',
    home: '/app/dashboard',
    consoleAccess: true,
    groups: '*',
  },
  {
    id: 'ciudadano',
    label: 'Ciudadano',
    description: 'Portal: impuestos, registros, PQRSD, certificados y expediente.',
    name: 'María A. Restrepo',
    email: 'ciudadano@prueba.com',
    cedula: '102',
    initials: 'CR',
    home: '/ciudadano',
    consoleAccess: false,
    groups: [],
  },
  {
    id: 'secretaria',
    label: 'Secretaría',
    description: 'Ventanilla, PQRSD (asigna a áreas), archivo, talento y registros.',
    name: 'Laura Secretaría',
    email: 'secretaria@prueba.com',
    cedula: '103',
    initials: 'SG',
    home: '/app/modulos/pqrsd-dashboard',
    consoleAccess: true,
    groups: ['pqrsd', 'documental', 'talento', 'registros'],
  },
  {
    id: 'hacienda',
    label: 'Hacienda',
    description: 'Impuestos + PQRSD asignadas a Rentas (reclamos predial/ICA).',
    name: 'Carlos Hacienda',
    email: 'hacienda@prueba.com',
    cedula: '104',
    initials: 'SH',
    home: '/app/modulos/predial-dashboard',
    consoleAccess: true,
    groups: [
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
      'pqrsd',
    ],
  },
  {
    id: 'financiero',
    label: 'Financiero',
    description: 'Deuda ciudadana, recaudo y proyección (aparte de presupuesto).',
    name: 'Diana Financiero',
    email: 'financiero@prueba.com',
    cedula: '105',
    initials: 'FI',
    home: '/app/modulos/cartera-ciudadania',
    consoleAccess: true,
    groups: ['financiero', 'presupuesto', 'tesoreria', 'radicacion'],
  },
  {
    id: 'contabilidad',
    label: 'Contabilidad',
    description: 'Solo contabilidad pública.',
    name: 'Andrés Contador',
    email: 'contabilidad@prueba.com',
    cedula: '106',
    initials: 'CO',
    home: '/app/modulos/contabilidad',
    consoleAccess: true,
    groups: ['contabilidad'],
  },
  {
    id: 'tesoreria',
    label: 'Tesorería',
    description: 'Caja, bancos, órdenes de pago y conciliación.',
    name: 'Patricia Tesorería',
    email: 'tesoreria@prueba.com',
    cedula: '107',
    initials: 'TE',
    home: '/app/modulos/tesoreria',
    consoleAccess: true,
    groups: ['tesoreria'],
  },
  {
    id: 'contratacion',
    label: 'Contratación',
    description: 'Contratos, pólizas y PQRSD asignadas a Contratación.',
    name: 'Julián Contratos',
    email: 'contratacion@prueba.com',
    cedula: '108',
    initials: 'CT',
    home: '/app/modulos/contratos',
    consoleAccess: true,
    groups: ['contratacion', 'pqrsd'],
  },
  {
    id: 'planeacion',
    label: 'Planeación',
    description: 'Plan de desarrollo y PQRSD de vías/infraestructura.',
    name: 'Sofía Planeación',
    email: 'planeacion@prueba.com',
    cedula: '109',
    initials: 'PL',
    home: '/app/modulos/plan-desarrollo',
    consoleAccess: true,
    groups: ['planeacion', 'pqrsd'],
  },
  {
    id: 'almacen',
    label: 'Almacén',
    description: 'Entradas, salidas y activos fijos.',
    name: 'Miguel Almacén',
    email: 'almacen@prueba.com',
    cedula: '110',
    initials: 'AL',
    home: '/app/modulos/almacen',
    consoleAccess: true,
    groups: ['almacen'],
  },
  {
    id: 'juridica',
    label: 'Jurídica',
    description: 'Tutelas, denuncias y PQRSD asignadas a Jurídica.',
    name: 'Elena Jurídica',
    email: 'juridica@prueba.com',
    cedula: '111',
    initials: 'JU',
    home: '/app/modulos/tutelas',
    consoleAccess: true,
    groups: ['juridica', 'pqrsd'],
  },
]

export function getDemoRole(id: string | null | undefined): DemoRole | undefined {
  if (!id) return undefined
  return demoRoles.find((role) => role.id === id)
}

export function findRoleByEmail(email: string): DemoRole | undefined {
  const normalized = email.trim().toLowerCase()
  return demoRoles.find((role) => role.email.toLowerCase() === normalized)
}

export function findRoleByCedula(cedula: string): DemoRole | undefined {
  const normalized = cedula.trim().replace(/\D/g, '')
  if (!normalized) return undefined
  return demoRoles.find((role) => role.cedula === normalized)
}

/** Busca por correo @prueba.com o por cédula (101–111). */
export function findRoleByLogin(identifier: string): DemoRole | undefined {
  const raw = identifier.trim()
  if (!raw) return undefined
  if (raw.includes('@')) return findRoleByEmail(raw)
  return findRoleByCedula(raw) ?? findRoleByEmail(raw)
}

export type AuthResult =
  | { ok: true; role: DemoRole }
  | { ok: false; message: string }

/** Autenticación demo: correo o cédula → rol; misma contraseña para todos. */
export function authenticateDemo(identifier: string, password: string): AuthResult {
  const role = findRoleByLogin(identifier)
  if (!role) {
    return { ok: false, message: 'Correo o cédula no registrados en la demo.' }
  }
  if (password !== DEMO_PASSWORD) {
    return { ok: false, message: 'Contraseña incorrecta.' }
  }
  return { ok: true, role }
}

export function roleCanAccessSlug(role: DemoRole, slug: string): boolean {
  if (role.groups === '*') return true
  if (!role.consoleAccess) return false
  const group = moduleGroups.find((g) => g.items.some((item) => item.slug === slug))
  if (!group || !role.groups.includes(group.id)) return false
  if (role.slugs && role.slugs.length > 0) {
    const item = group.items.find((i) => i.slug === slug)
    const dataSlug = item?.workspaceSlug ?? slug
    return role.slugs.includes(slug) || role.slugs.includes(dataSlug)
  }
  return true
}

export function filterGroupsForRole(role: DemoRole | undefined): ModuleGroup[] {
  if (!role || !role.consoleAccess) return []
  if (role.groups === '*') return moduleGroups

  return moduleGroups
    .filter((group) => role.groups.includes(group.id))
    .map((group) => ({
      ...group,
      items:
        role.slugs && role.slugs.length > 0
          ? group.items.filter((item) => role.slugs!.includes(item.slug))
          : group.items,
    }))
    .filter((group) => group.items.length > 0)
}
