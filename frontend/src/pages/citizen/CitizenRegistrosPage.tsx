import { useMemo, useState, type FormEvent } from 'react'
import { CitizenHelpNote, CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { StatusBadge } from '@/components/ui/StatusBadge'
import {
  findRegistryType,
  mockCitizenRegistrations,
  registryTypes,
  type CitizenRegistryEntry,
  type RegistryTypeId,
} from '@/data/municipalRegistries'
import {
  departments,
  findMunicipality,
  municipalitiesByDepartment,
  readCitizenMunicipalityId,
  writeCitizenMunicipalityId,
} from '@/data/municipalities'

export function CitizenRegistrosPage() {
  const [department, setDepartment] = useState('Meta')
  const [municipalityId, setMunicipalityId] = useState(
    () => readCitizenMunicipalityId() ?? 'san-verde',
  )
  const [registryTypeId, setRegistryTypeId] = useState<RegistryTypeId>('discapacidad')
  const [nombre, setNombre] = useState('')
  const [documento, setDocumento] = useState('')
  const [extra, setExtra] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(null)
  const [entries, setEntries] = useState<CitizenRegistryEntry[]>(mockCitizenRegistrations)

  const alcaldias = useMemo(() => municipalitiesByDepartment(department), [department])
  const municipality = findMunicipality(municipalityId)
  const registry = findRegistryType(registryTypeId)

  const onDepartmentChange = (dep: string) => {
    setDepartment(dep)
    const list = municipalitiesByDepartment(dep)
    const next = list[0]?.id ?? ''
    setMunicipalityId(next)
    if (next) writeCitizenMunicipalityId(next)
  }

  const onMunicipalityChange = (id: string) => {
    setMunicipalityId(id)
    writeCitizenMunicipalityId(id)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!nombre.trim() || !documento.trim() || !municipality || !registry) return

    const nuevo: CitizenRegistryEntry = {
      id: String(Date.now()),
      registryTypeId,
      municipalityId: municipality.id,
      municipalityName: municipality.name,
      department: municipality.department,
      solicitante: nombre.trim(),
      documento: documento.trim(),
      fecha: new Date().toLocaleDateString('es-CO'),
      estado: 'Radicado',
      estadoTone: 'accent',
      detalle: `${extra.trim() || registry.shortTitle}${fileName ? ` · ${fileName}` : ''}`,
    }
    setEntries((prev) => [nuevo, ...prev])
    setFlash(`Inscripción enviada a ${municipality.shortName}. Te avisaremos al validarla (demo).`)
    setNombre('')
    setDocumento('')
    setExtra('')
    setFileName(null)
  }

  return (
    <>
      <CitizenPageHeader
        eyebrow="Servicio ciudadano"
        title="Registros"
        description="Elige departamento y alcaldía, luego inscríbete."
        iconClass="bi bi-clipboard-data"
      />
      <CitizenHelpNote>
        Selecciona primero tu municipio. Luego el tipo de registro y tus datos.
      </CitizenHelpNote>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">1 · Tu alcaldía</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Departamento</label>
              <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="form-select"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Municipio / alcaldía</label>
              <select
                value={municipalityId}
                onChange={(e) => onMunicipalityChange(e.target.value)}
                className="form-select"
              >
                {alcaldias.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {municipality && (
            <p className="small text-body-secondary mt-2 mb-0">
              <i className="bi bi-geo-alt me-1" />
              {municipality.shortName} · {municipality.department}
            </p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">2 · Inscripción</h3>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tipo de registro</label>
                <select
                  value={registryTypeId}
                  onChange={(e) => setRegistryTypeId(e.target.value as RegistryTypeId)}
                  className="form-select"
                >
                  {registryTypes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Nombre completo</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Documento</label>
                <input
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Detalle / observación</label>
                <input
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Soporte (opcional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Enviar inscripción
            </button>
            {flash && <div className="alert alert-success mt-3 mb-0">{flash}</div>}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Mis inscripciones</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0 align-middle">
              <thead>
                <tr>
                  <th>Registro</th>
                  <th>Municipio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="fw-semibold">{findRegistryType(e.registryTypeId)?.shortTitle}</div>
                      <small className="text-body-secondary">{e.detalle}</small>
                    </td>
                    <td>
                      {e.municipalityName}
                      <br />
                      <small className="text-body-secondary">{e.department}</small>
                    </td>
                    <td>{e.fecha}</td>
                    <td>
                      <StatusBadge tone={e.estadoTone}>{e.estado}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
