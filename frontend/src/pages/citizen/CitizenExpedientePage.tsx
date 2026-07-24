import { Fragment, useMemo, useState, type FormEvent } from 'react'
import { CitizenHelpNote, CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { StatusBadge, type BadgeTone } from '@/components/ui/StatusBadge'
import { mockExpediente } from '@/data/citizenPortal'

/** Color del punto del timeline según el estado del evento. */
const toneBg: Record<BadgeTone, string> = {
  neutral: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  accent: 'bg-primary',
}

/** Icono del punto del timeline según el origen del evento. */
const origenIcon: Record<string, string> = {
  Certificados: 'bi-file-earmark-check',
  Peticiones: 'bi-chat-left-text',
  Impuestos: 'bi-cash-coin',
  Registros: 'bi-clipboard-data',
}

export function CitizenExpedientePage() {
  const [query, setQuery] = useState(mockExpediente.documento)
  const [loaded, setLoaded] = useState(true)
  const eventos = useMemo(() => mockExpediente.eventos, [])

  const onSearch = (event: FormEvent) => {
    event.preventDefault()
    setLoaded(!!query.trim())
  }

  return (
    <>
      <CitizenPageHeader
        eyebrow="Servicio ciudadano"
        title="Ver mi historial"
        description="Impuestos, peticiones y certificados con fechas y estado."
        iconClass="bi bi-clock-history"
      />
      <CitizenHelpNote>
        Busca con tu <strong>cédula</strong> o un <strong>número de radicado</strong>. En la demo ya hay un
        ejemplo cargado.
      </CitizenHelpNote>

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={onSearch}>
            <label className="form-label">Documento o número de trámite</label>
            <div className="input-group">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
                placeholder="CC o número de radicado"
              />
              <button type="submit" className="btn btn-primary">
                Consultar
              </button>
            </div>
          </form>
        </div>
      </div>

      {loaded && (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <small className="text-body-secondary text-uppercase">Titular</small>
              <h2 className="h5 mb-0">{mockExpediente.ciudadano}</h2>
              <p className="text-body-secondary mb-0">{mockExpediente.documento}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Línea de tiempo</h3>
            </div>
            <div className="card-body">
              {/* Timeline nativo de AdminLTE v4 (UI/timeline). */}
              <div className="timeline">
                {eventos.map((ev, idx) => {
                  const [fecha, hora] = ev.fecha.split(' ')
                  const prevFecha = eventos[idx - 1]?.fecha.split(' ')[0]
                  const showLabel = fecha !== prevFecha
                  const icon = origenIcon[ev.origen] ?? 'bi-record-circle'

                  return (
                    <Fragment key={ev.id}>
                      {showLabel && (
                        <div className="time-label">
                          <span className="text-bg-primary">{fecha}</span>
                        </div>
                      )}
                      <div>
                        <i
                          className={`timeline-icon text-white bi ${icon} ${toneBg[ev.estadoTone]}`}
                          aria-hidden
                        />
                        <div className="timeline-item">
                          {hora && (
                            <span className="time">
                              <i className="bi bi-clock me-1" />
                              {hora}
                            </span>
                          )}
                          <h3 className="timeline-header">{ev.titulo}</h3>
                          <div className="timeline-body">{ev.detalle}</div>
                          <div className="timeline-footer">
                            <span className="badge text-bg-light border me-1">{ev.origen}</span>
                            <StatusBadge tone={ev.estadoTone}>{ev.estado}</StatusBadge>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )
                })}

                {/* Cierre de la línea de tiempo */}
                <div>
                  <i className="timeline-icon text-white bi bi-check2-all bg-secondary" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
