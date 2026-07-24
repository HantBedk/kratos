import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { citizenServices } from '@/data/citizenPortal'
import { currentEntity } from '@/data/entity'

export function CitizenHomePage() {
  return (
    <>
      <section className="animate-enter mt-10 text-center md:mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Portal ciudadano · {currentEntity.shortName}
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
          Trámites y servicios en un solo lugar
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]">
          Demo visual: impuestos, PQRSD, certificados y consulta de expediente. Sin cobros ni
          radicaciones reales.
        </p>
      </section>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {citizenServices.map((service, index) => {
          const Icon = service.icon
          return (
            <Link
              key={service.slug}
              to={service.to}
              className={`glass-panel group rounded-[var(--radius-xl)] p-5 transition hover:border-[var(--border-strong)] ${
                index % 2 === 1 ? 'animate-enter-delay' : 'animate-enter'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--text-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{service.description}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
