import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/app/dashboard')
  }

  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="animate-enter">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          SelvaTic
        </p>
        <h1 className="max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-semibold tracking-tight text-[var(--text)] md:text-5xl">
          La administración municipal, clara y conectada.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
          ERP Municipal SelvaTic para alcaldías: finanzas, contratación, rentas y atención ciudadana
          en una sola plataforma en la nube.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-[var(--text-muted)]">
          {[
            'Consola institucional con módulos priorizables por entidad',
            'Portal ciudadano para impuestos, PQRSD, certificados y expediente',
            'Tema día / noche y experiencia pensada para funcionarios reales',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/ciudadano"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            Explorar portal ciudadano
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="animate-enter-delay">
        <form
          onSubmit={handleSubmit}
          className="glass-panel mx-auto w-full max-w-md rounded-[var(--radius-xl)] p-7 md:p-8"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
            Ingreso a la consola
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Demo visual — cualquier credencial abre el dashboard.
          </p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                Correo institucional
              </span>
              <input
                type="email"
                defaultValue="funcionario@alcaldia.gov.co"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 text-sm text-[var(--text)] outline-none focus:border-[var(--border-strong)]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                Contraseña
              </span>
              <input
                type="password"
                defaultValue="kratos-demo"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 text-sm text-[var(--text)] outline-none focus:border-[var(--border-strong)]"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-5 text-sm font-bold text-[var(--cta-text)] transition-colors hover:bg-[var(--cta-hover)]"
          >
            Entrar a la consola
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-center text-xs text-[var(--text-subtle)]">
            Licencia digital de uso · SelvaTic
          </p>
        </form>
      </section>
    </div>
  )
}
