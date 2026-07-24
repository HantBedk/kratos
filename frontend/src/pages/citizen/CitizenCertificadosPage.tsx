import { useState, type FormEvent } from 'react'
import { CitizenHelpNote, CitizenPageHeader } from '@/components/citizen/CitizenPageChrome'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockCertificates, type CitizenCertificate } from '@/data/citizenPortal'

const TIPOS = ['Residencia', 'Estratificación'] as const

export function CitizenCertificadosPage() {
  const [items, setItems] = useState<CitizenCertificate[]>(mockCertificates)
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Residencia')
  const [nombre, setNombre] = useState('María Alejandra Restrepo')
  const [flash, setFlash] = useState<string | null>(null)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!nombre.trim()) return
    const prefix = tipo === 'Residencia' ? 'CER-RES' : 'CER-EST'
    const numero = `${prefix}-2026-${String(100 + items.length).padStart(3, '0')}`
    const nuevo: CitizenCertificate = {
      id: String(Date.now()),
      tipo,
      numero,
      solicitante: nombre.trim(),
      fecha: new Date().toLocaleDateString('es-CO'),
      estado: 'Radicado',
      estadoTone: 'accent',
    }
    setItems((prev) => [nuevo, ...prev])
    setFlash(`Solicitud ${numero} enviada. Cuando diga “Aprobado” podrás descargarlo.`)
  }

  return (
    <>
      <CitizenPageHeader
        eyebrow="Servicio ciudadano"
        title="Pedir un certificado"
        description="Solicita certificados de residencia o estratificación. Cuando se apruebe, descárgalo aquí."
        iconClass="bi bi-file-earmark-check"
      />
      <CitizenHelpNote>
        Ten a la mano tu <strong>nombre completo</strong> y cédula. En la demo no se piden anexos reales.
      </CitizenHelpNote>

      <div className="card mb-3">
        <div className="card-header">
          <h3 className="card-title">Nueva solicitud</h3>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">¿Qué certificado necesitas?</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as (typeof TIPOS)[number])}
                  className="form-select"
                >
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      Certificado de {t.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tu nombre completo</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Enviar solicitud
            </button>
            {flash && <div className="alert alert-success mt-3 mb-0">{flash}</div>}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Mis solicitudes</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0 align-middle">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-semibold">{item.numero}</td>
                    <td>{item.tipo}</td>
                    <td>{item.fecha}</td>
                    <td>
                      <StatusBadge tone={item.estadoTone}>{item.estado}</StatusBadge>
                    </td>
                    <td className="text-end">
                      {item.estado === 'Aprobado' && (
                        <button type="button" className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-download me-1" />
                          Descargar
                        </button>
                      )}
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
