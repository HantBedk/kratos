# Notas técnicas — Proyecto Kratos (borrador separado)

**Versión:** 0.4  
**Fecha:** 23 de julio de 2026  
**Importante:** Este archivo **no** es la propuesta comercial. No mezclar con `Propuesta_Kratos_ERP_Municipal_SelvaTic.md`.

---

## 1. Stack acordado

| Capa | Tecnología |
|------|------------|
| Backend | PHP + Laravel 13 |
| Frontend | React 19 + TypeScript + Vite (SPA) |
| UI (todo el frontend) | **AdminLTE 4.1** + Bootstrap 5 + Bootstrap Icons |
| Infra local/dev | Docker Compose |
| Arquitectura | ERP **multi-tenant** (varias alcaldías, datos aislados) |

**Sin Tailwind, sin design tokens propios, sin CSS bridge.** Único CSS de UI: paquetes AdminLTE/Bootstrap vía [`frontend/src/adminlte/bootstrap.ts`](../frontend/src/adminlte/bootstrap.ts).

## 2. Principios técnicos (para cuando exista SDD)

- API + SPA desacopladas  
- Autenticación y autorización por rol y por tenant  
- Auditoría de acciones sensibles  
- Archivos con control de acceso  
- Backups y restauración definidos en operación nube  
- Integraciones externas (PSE, SECOP, CHIP, etc.) como conectores versionados  

## 3. Estado actual de la SPA

- URL: **http://localhost:5173**
- `/login` → `login-page` / `login-box`
- `/app/*` → `layout-fixed` + `app-wrapper` (consola)
- `/ciudadano/*` → mismo layout AdminLTE (portal)
- Tema: `data-bs-theme` (ThemeProvider)
- Backend Laravel pendiente

## Puerto fijo

**5173** — regla del proyecto; ver `.cursor/rules/puerto-fijo.mdc`. No cambiar.

---

## 4. Control de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.4 | 2026-07-23 | Solo AdminLTE en todo el frontend; eliminados Tailwind, tokens y Lucide |
| 0.3 | 2026-07-23 | Consola/login con markup AdminLTE real |
| 0.2 | 2026-07-23 | AdminLTE 4 en shell de consola |
| 0.1 | 2026-07-22 | Borrador de stack y separación documental |
