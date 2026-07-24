# Backlog vivo — Núcleo demo Kratos

**Producto:** Kratos (ERP Municipal SelvaTic)  
**URL demo:** http://localhost:5173  
**Versión:** 0.2  
**Última actualización:** 23 de julio de 2026  

> Solo entra lo **útil para desarrollar la idea** (SPA visual/mock).  
> Preguntas de terceros, listas largas y verticales que no priorizamos = **fuera de alcance** hasta nueva decisión.

---

## 1. Idea madre (una frase)

Una sola plataforma: **ventanilla digital para el ciudadano** + **ERP interno para la alcaldía**, con un dato que alimenta varios módulos y **expediente trazable**.

---

## 2. Núcleo que sí construimos (demo)

### Portal ciudadano (`/ciudadano`)

| # | Servicio | Qué ve el ciudadano (mock) |
|---|----------|----------------------------|
| 1 | **Impuestos** | Qué debe, por concepto, montos, pago PSE simulado (predial + ICA) |
| 2 | **PQRSD** | Radicar y consultar estado |
| 3 | **Certificados** | Solicitar (residencia / estratificación), ver estado, “descargar” mock |
| 4 | **Expediente** | Consultar historial unificado (trámites, docs, fechas, estados) |

### ERP consola (`/app`)

| # | Capacidad | Enfoque demo |
|---|-----------|--------------|
| 1 | **Contratación (Contractvs)** | Ciclo contrato + pólizas (ya base) |
| 2 | **Presupuesto → cuentas → tesorería → contabilidad** | Flujo del dinero (ya base) |
| 3 | **Estampillas** | Liquidación / pago asociado a contratos (módulo nuevo) |

---

## 3. Explicitamente fuera (no demo ahora)

- Degüello, delineación, información exógena, entidades descentralizadas como productos  
- Encuestas, registros municipales configurables  
- Licencias de cementerio / autorizaciones verticales  
- Notificaciones administrativas con constancia legal  
- SECOP / PSE reales, backend Laravel  

Pueden mencionarse en roadmap futuro; **no** en UI ni en checklists activos.

---

## 4. Rutas portal (alcance real)

```text
/ciudadano                 → Hub (4 servicios)
/ciudadano/impuestos       → Obligaciones + pago
/ciudadano/pqrsd           → Radicar / consultar
/ciudadano/certificados    → Solicitar / consultar
/ciudadano/expediente      → Consulta unificada
```

---

## 5. Checklist implementación

### Portal

- [x] Hub con 4 servicios  
- [x] Impuestos (predial + ICA + PSE mock)  
- [x] PQRSD portal  
- [x] Certificados  
- [x] Expediente ciudadano  

### ERP

- [x] Módulo estampillas en sidebar + workspace  
- [x] Workflow contratos / presupuesto / tesorería / contabilidad alineados al flujo  

### Docs

- [x] Propuesta §2.2 portal = 4 servicios (no B1–B8)  
- [x] Roadmap: portal núcleo en demo; basura a fase futura  

---

## 6. Control de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.1 | 2026-07-23 | Inventario amplio informe (B1–B8) |
| 0.2 | 2026-07-23 | Filtro: solo núcleo portal 4 + ERP contratos/presupuesto/estampillas. Resto descartado. |
