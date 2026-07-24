# Notas técnicas — Proyecto Kratos (borrador separado)

**Versión:** 0.1  
**Fecha:** 22 de julio de 2026  
**Importante:** Este archivo **no** es la propuesta comercial. No mezclar con `Propuesta_Kratos_ERP_Municipal_SelvaTic.md`.

---

## 1. Stack acordado (construcción futura)

| Capa | Tecnología |
|------|------------|
| Backend | PHP + Laravel 13 |
| Frontend | React 19 + TypeScript + Vite (SPA) |
| UI | Tailwind CSS 4 (referencia AdminLTE v4 o mínimo v3) |
| Infra local/dev | Docker Compose |
| Arquitectura | ERP **multi-tenant** (varias alcaldías, datos aislados) |

## 2. Principios técnicos (para cuando exista SDD)

- API + SPA desacopladas  
- Autenticación y autorización por rol y por tenant  
- Auditoría de acciones sensibles  
- Archivos con control de acceso  
- Backups y restauración definidos en operación nube  
- Integraciones externas (PSE, SECOP, CHIP, etc.) como conectores versionados, no como núcleo duro del día 1  

## 3. Pendiente (SDD completo)

Cuando el equipo autorice la fase de construcción, redactar en este directorio (u otro `docs/tecnico/`):

- Glosario de dominio  
- Specs por módulo (entradas/salidas/reglas)  
- Modelo de datos multi-tenant  
- Definition of Done  
- Política de secretos y datos personales  

**Estado actual:** SPA en [`frontend/`](../frontend/) (Vite + React 19 + Tailwind 4 + tema claro/oscuro). URL fija: **http://localhost:5173** (`docker compose up --build -d` o `npm run dev`). Backend Laravel pendiente.

**Alcance portal / ERP (demo):** solo el **núcleo** del backlog [`Backlog_Informe_Portal_Ciudadano.md`](./Backlog_Informe_Portal_Ciudadano.md) v0.2 — portal (impuestos, PQRSD, certificados, expediente) + ERP (contratos, flujo presupuesto/tesorería/contabilidad, estampillas). Todo es **SPA visual/mock**; sin backend aún.

## Puerto fijo

**5173** — regla del proyecto; ver `.cursor/rules/puerto-fijo.mdc`. No cambiar.

---

## 4. Control de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.1 | 2026-07-22 | Borrador de stack y separación documental |
