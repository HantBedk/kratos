import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSession } from '@/auth/SessionContext'
import { SectionHeader } from '@/components/KpiCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { roleCanAccessSlug } from '@/data/demoRoles'
import { findModule } from '@/data/modules'
import {
  canManageAllPqrsd,
  casesForRole,
  dueSoonCases,
  findPqrsdArea,
  findTema,
  mockPqrsdCases,
  pqrsdAreas,
  pqrsdRoutingGuide,
  statusToneFor,
  unassignedCases,
  type PqrsdAreaId,
  type PqrsdCase,
} from '@/data/pqrsd'

type ViewMode = 'bandeja' | 'asignacion' | 'vencimientos' | 'respuestas' | 'matriz'

function modeFromSlug(slug: string): ViewMode {
  if (slug.includes('asignacion')) return 'asignacion'
  if (slug.includes('vencimiento')) return 'vencimientos'
  if (slug.includes('respuesta')) return 'respuestas'
  if (slug.includes('matriz')) return 'matriz'
  return 'bandeja'
}

export function PqrsdManagePage() {
  const { slug = 'pqrsd-bandeja' } = useParams()
  const { role } = useSession()
  const mod = findModule(slug) ?? findModule('pqrsd-bandeja')
  const allowed = role
    ? roleCanAccessSlug(role, slug.startsWith('pqrsd') && slug !== 'pqrsd' ? slug : 'pqrsd-bandeja')
    : false
  const mode = modeFromSlug(slug)
  const roleId = role?.id

  const [cases, setCases] = useState<PqrsdCase[]>(mockPqrsdCases)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [attach, setAttach] = useState('')
  const [assignArea, setAssignArea] = useState<PqrsdAreaId>('hacienda')
  const [toast, setToast] = useState<string | null>(null)

  const mine = useMemo(() => casesForRole(roleId, cases), [roleId, cases])
  const due = useMemo(() => dueSoonCases(roleId, cases), [roleId, cases])
  const pendingAssign = useMemo(() => unassignedCases(cases), [cases])
  const isManager = canManageAllPqrsd(roleId)

  const list =
    mode === 'vencimientos' ? due : mode === 'asignacion' ? (isManager ? pendingAssign : []) : mine

  const selected = cases.find((c) => c.id === selectedId) ?? list[0] ?? null

  const flash = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2800)
  }

  const assign = () => {
    if (!selected || !isManager) return
    const area = findPqrsdArea(assignArea)
    if (!area) return
    setCases((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              areaId: area.id,
              assignedRoleId: area.roleId,
              status: 'Asignada',
              statusTone: statusToneFor('Asignada'),
            }
          : c,
      ),
    )
    flash(`Asignada a ${area.label}. Solo ese rol recibe la notificación.`)
  }

  const respond = () => {
    if (!selected || !reply.trim()) return
    if (!isManager && selected.assignedRoleId !== roleId) {
      flash('Solo puedes responder casos de tu bandeja.')
      return
    }
    setCases((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              status: 'Respondida',
              statusTone: statusToneFor('Respondida'),
              respuesta: reply.trim(),
              soporteRespuesta: attach || undefined,
            }
          : c,
      ),
    )
    setReply('')
    setAttach('')
    flash('Respuesta registrada. El ciudadano la verá en su portal (demo).')
  }

  if (!allowed || !mod) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <h1 className="h4">Sin acceso a PQRSD</h1>
          <p className="text-body-secondary">
            Tu perfil no gestiona peticiones. Entra como Secretaría, Hacienda, Contratación, Planeación o
            Jurídica.
          </p>
          <Link to="/app/dashboard" className="btn btn-primary mt-2">
            Volver al dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (mode === 'matriz') {
    return (
      <div>
        <SectionHeader
          eyebrow="PQRSD · reglas de notificación"
          title="Quién recibe qué"
          description="Cada rol solo es notificado de lo que le corresponde gestionar."
        />
        <div className="card mb-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Cuándo</th>
                    <th>Quién recibe</th>
                    <th>Qué llega</th>
                  </tr>
                </thead>
                <tbody>
                  {pqrsdRoutingGuide.map((row) => (
                    <tr key={row.when}>
                      <td className="fw-medium">{row.when}</td>
                      <td className="text-primary">{row.who}</td>
                      <td className="text-body-secondary">{row.gets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row g-3">
          {pqrsdAreas.map((area) => (
            <div key={area.id} className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{area.label}</h3>
                  <p className="small text-primary mb-1">Rol demo: {area.roleId}</p>
                  <p className="small text-body-secondary mb-0">{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const titles: Record<ViewMode, { title: string; description: string }> = {
    bandeja: {
      title: isManager ? 'Bandeja PQRSD (todas)' : `Mi bandeja · ${role?.label}`,
      description: isManager
        ? 'Secretaría ve el universo; las áreas solo ven lo asignado a su rol.'
        : 'Solo aparecen radicados asignados a tu área.',
    },
    asignacion: {
      title: 'Asignar a áreas responsables',
      description: 'Clasifica y envía. La notificación llega solo al rol destino.',
    },
    vencimientos: {
      title: 'Por vencer / vencidas',
      description: 'Alertas de término filtradas a tu bandeja.',
    },
    respuestas: {
      title: 'Responder al ciudadano',
      description: 'Oficio de respuesta y soportes. Solo sobre casos de tu rol.',
    },
    matriz: { title: '', description: '' },
  }

  return (
    <div>
      {toast && (
        <div className="toast show position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1080 }}>
          <div className="toast-body">{toast}</div>
        </div>
      )}

      <SectionHeader
        eyebrow={`PQRSD · ${role?.label ?? 'Demo'}`}
        title={titles[mode].title}
        description={titles[mode].description}
        action={
          <div className="btn-group">
            <Link to="/app/modulos/pqrsd-matriz" className="btn btn-outline-secondary btn-sm">
              Quién recibe qué
            </Link>
            <Link to="/app/modulos/pqrsd-dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          </div>
        }
      />

      <div className="row mb-3">
        <div className="col-md-4">
          <div className="info-box">
            <span className="info-box-icon text-bg-primary">
              <i className="bi bi-inbox" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">{isManager ? 'Abiertas' : 'En mi bandeja'}</span>
              <span className="info-box-number">
                {mine.filter((c) => c.status !== 'Cerrada' && c.status !== 'Respondida').length}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-box">
            <span className="info-box-icon text-bg-warning">
              <i className="bi bi-clock-history" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Por vencer / vencidas</span>
              <span className="info-box-number">{due.length}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-box">
            <span className={`info-box-icon ${isManager ? 'text-bg-danger' : 'text-bg-secondary'}`}>
              <i className="bi bi-person-plus" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Sin asignar</span>
              <span className="info-box-number">{pendingAssign.length}</span>
            </div>
          </div>
        </div>
      </div>

      {mode === 'asignacion' && !isManager && (
        <div className="alert alert-info">
          Solo <strong>Secretaría</strong> (o Admin) asigna. Tu rol recibe la notificación cuando te asignen un
          caso.
        </div>
      )}

      <div className="row">
        <div className="col-lg-5">
          <div className="card mb-3">
            <div className="card-header">
              <h3 className="card-title mb-0">Radicados</h3>
            </div>
            <div className="card-body p-0">
              {list.length === 0 && (
                <p className="text-center text-body-secondary py-4 mb-0">No hay radicados en esta vista.</p>
              )}
              <div className="list-group list-group-flush">
                {list.map((item) => {
                  const area = findPqrsdArea(item.areaId)
                  const active = selected?.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`list-group-item list-group-item-action ${active ? 'active' : ''}`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <small className={active ? 'opacity-75' : 'text-body-secondary'}>
                          {item.tipo} · {item.radicado}
                        </small>
                        <StatusBadge tone={item.statusTone}>{item.status}</StatusBadge>
                      </div>
                      <div className="fw-semibold mt-1">{item.asunto}</div>
                      <small className={active ? 'opacity-75' : 'text-body-secondary'}>
                        {area ? area.label : 'Sin asignar'} · vence {item.vence}
                      </small>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          {selected ? (
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-body-secondary text-uppercase">
                    {selected.tipo} · {findTema(selected.temaId)?.label}
                  </small>
                  <h3 className="card-title d-block mt-1">{selected.radicado}</h3>
                  <p className="mb-0 text-body-secondary">{selected.asunto}</p>
                </div>
                <StatusBadge tone={selected.statusTone}>{selected.status}</StatusBadge>
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <div className="small text-body-secondary">Ciudadano</div>
                    <div className="fw-medium">
                      {selected.ciudadano} · {selected.documento}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="small text-body-secondary">Término</div>
                    <div className="fw-medium">
                      {selected.vence}
                      {selected.daysLeft <= 3 && (
                        <span className="badge text-bg-warning ms-2">
                          {selected.daysLeft < 0 ? 'Vencida' : `${selected.daysLeft}d`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="small text-body-secondary">Detalle</div>
                    <p className="mb-0">{selected.detalle}</p>
                  </div>
                  {selected.attachment && (
                    <div className="col-12">
                      <span className="badge text-bg-light border">
                        <i className="bi bi-paperclip me-1" />
                        {selected.attachment}
                      </span>
                    </div>
                  )}
                  {selected.respuesta && (
                    <div className="col-12">
                      <div className="alert alert-success mb-0">
                        <strong>Respuesta:</strong> {selected.respuesta}
                      </div>
                    </div>
                  )}
                </div>

                {(mode === 'asignacion' || (mode === 'bandeja' && isManager && !selected.assignedRoleId)) &&
                  isManager && (
                    <div className="border-top pt-3">
                      <label className="form-label fw-semibold">Asignar área responsable</label>
                      <select
                        value={assignArea}
                        onChange={(e) => setAssignArea(e.target.value as PqrsdAreaId)}
                        className="form-select mb-2"
                      >
                        {pqrsdAreas.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.label} → rol {a.roleId}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="btn btn-primary" onClick={assign}>
                        <i className="bi bi-person-plus me-1" />
                        Asignar y notificar
                      </button>
                    </div>
                  )}

                {(mode === 'respuestas' || mode === 'bandeja' || mode === 'vencimientos') &&
                  selected.status !== 'Cerrada' &&
                  selected.status !== 'Respondida' && (
                    <div className="border-top pt-3 mt-3">
                      <label className="form-label fw-semibold">Responder al ciudadano</label>
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={3}
                        placeholder="Texto de la respuesta oficial…"
                        className="form-control mb-2"
                      />
                      <input
                        value={attach}
                        onChange={(e) => setAttach(e.target.value)}
                        placeholder="Nombre de soporte (ej. oficio-respuesta.pdf)"
                        className="form-control mb-2"
                      />
                      <button type="button" className="btn btn-success" onClick={respond}>
                        <i className="bi bi-send me-1" />
                        Enviar respuesta
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center text-body-secondary py-5">Selecciona un radicado</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
