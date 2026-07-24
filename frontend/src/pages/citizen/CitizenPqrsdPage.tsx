import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CitizenHelpNote, CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockCitizenPqrsd, type CitizenPqrsd } from '@/data/citizenPortal'
import {
  findTema,
  pqrsdTemas,
  pqrsdTipos,
  suggestArea,
  type PqrsdTemaId,
  type PqrsdTipo,
} from '@/data/pqrsd'

export function CitizenPqrsdPage() {
  const [items, setItems] = useState<CitizenPqrsd[]>(mockCitizenPqrsd)
  const [tipo, setTipo] = useState<PqrsdTipo>('Petición')
  const [temaId, setTemaId] = useState<PqrsdTemaId>('vias')
  const [asunto, setAsunto] = useState('')
  const [detalle, setDetalle] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const area = useMemo(() => suggestArea(tipo, temaId), [tipo, temaId])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!asunto.trim()) return
    const radicado = `PQR-2026-${String(500 + items.length).padStart(5, '0')}`
    const nuevo: CitizenPqrsd = {
      id: String(Date.now()),
      radicado,
      tipo,
      asunto: asunto.trim(),
      fecha: new Date().toLocaleDateString('es-CO'),
      estado: 'Radicada',
      estadoTone: 'accent',
    }
    setItems((prev) => [nuevo, ...prev])
    setAsunto('')
    setDetalle('')
    setFileName(null)
    setFlash(
      `Radicado ${radicado}. Área sugerida: ${area.label} (solo ese rol será notificado al asignarlo).`,
    )
  }

  return (
    <>
      <CitizenPageHeader
        eyebrow="Servicio ciudadano"
        title="Peticiones, quejas y denuncias"
        description="Presenta PQRSD y obtén un radicado para seguimiento."
        iconClass="bi bi-chat-left-text"
      />
      <CitizenHelpNote>
        Elige el <strong>tema</strong> para orientar el área. La alcaldía asigna formalmente.
      </CitizenHelpNote>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">Nuevo radicado PQRSD</h3>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as PqrsdTipo)}
                  className="form-select"
                >
                  {pqrsdTipos.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tema</label>
                <select
                  value={temaId}
                  onChange={(e) => setTemaId(e.target.value as PqrsdTemaId)}
                  className="form-select"
                >
                  {pqrsdTemas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <div className="alert alert-info mb-0">
                  Área sugerida: <strong>{area.label}</strong>
                  {findTema(temaId) ? ` · ${findTema(temaId)?.label}` : ''}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Asunto</label>
                <input
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Detalle</label>
                <textarea
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  rows={3}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Anexo (opcional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
                {fileName && (
                  <small className="text-primary">
                    <i className="bi bi-paperclip me-1" />
                    {fileName}
                  </small>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Radicar
            </button>
            {flash && <div className="alert alert-success mt-3 mb-0">{flash}</div>}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h3 className="card-title mb-0">Mis radicados</h3>
          <Link to="/ciudadano/expediente" className="btn btn-sm btn-outline-secondary">
            Ver expediente
          </Link>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {items.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between gap-2">
                  <div>
                    <small className="text-body-secondary text-uppercase">
                      {item.tipo} · {item.radicado}
                    </small>
                    <div className="fw-semibold">{item.asunto}</div>
                    <small className="text-body-secondary">{item.fecha}</small>
                    {item.respuesta && (
                      <div className="alert alert-success mt-2 mb-0 py-2">{item.respuesta}</div>
                    )}
                  </div>
                  <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
