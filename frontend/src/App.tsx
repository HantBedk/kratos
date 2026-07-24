import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireConsole } from '@/auth/RequireConsole'
import { AppShell } from '@/layouts/AppShell'
import { AuthLayout } from '@/layouts/AuthLayout'
import { CitizenLayout } from '@/layouts/CitizenLayout'
import { CitizenHomePage } from '@/pages/CitizenHomePage'
import { CitizenCertificadosPage } from '@/pages/citizen/CitizenCertificadosPage'
import { CitizenExpedientePage } from '@/pages/citizen/CitizenExpedientePage'
import { CitizenImpuestosPage } from '@/pages/citizen/CitizenImpuestosPage'
import { CitizenPerfilPage } from '@/pages/citizen/CitizenPerfilPage'
import { CitizenPqrsdPage } from '@/pages/citizen/CitizenPqrsdPage'
import { CitizenRegistrosPage } from '@/pages/citizen/CitizenRegistrosPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { ModuleWorkspacePage } from '@/pages/ModuleWorkspacePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RequireConsole />}>
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="modulos/:slug" element={<ModuleWorkspacePage />} />
        </Route>
      </Route>

      <Route path="/ciudadano" element={<CitizenLayout />}>
        <Route index element={<CitizenHomePage />} />
        <Route path="impuestos" element={<CitizenImpuestosPage />} />
        <Route path="registros" element={<CitizenRegistrosPage />} />
        <Route path="pqrsd" element={<CitizenPqrsdPage />} />
        <Route path="certificados" element={<CitizenCertificadosPage />} />
        <Route path="expediente" element={<CitizenExpedientePage />} />
        <Route path="perfil" element={<CitizenPerfilPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
