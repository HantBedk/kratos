# Roadmap — Proyecto Kratos (ERP Municipal SelvaTic)

**Versión:** 0.1  
**Fecha:** 22 de julio de 2026  
**Relacionado con:** `Propuesta_Kratos_ERP_Municipal_SelvaTic.md`  

> Este archivo es la **hoja de ruta**. La prioridad real de cada cliente se define en reunión con la alcaldía.  
> Las fechas abajo son **orientativas internas**; se ajustan al primer piloto concreto.

---

## 1. Fases del producto

### Fase 0 — Ideación y propuesta (actual)

- [x] Discovery de negocio y catálogo de módulos  
- [x] Documento comercial v0.1  
- [x] Roadmap v0.1  
- [ ] Revisión entre líderes SelvaTic  
- [ ] Nombre visual / identidad mínima (logo, colores)  
- [ ] Constitución legal SelvaTic (en paralelo, fuera de producto)

### Fase 1 — Cimientos técnicos (cuando se autorice construcción)

- Repositorio y entorno Docker Compose  
- Backend Laravel 13 (API)  
- Frontend React 19 + TypeScript + Vite (SPA)  
- UI Tailwind CSS 4 (+ referencia AdminLTE)  
- Multi-tenant (aislamiento por alcaldía)  
- IAM: usuarios, roles, auditoría básica  
- Carga de archivos / expediente digital básico  

*Detalle técnico en archivo separado (no mezclar con propuesta comercial).*

### Fase 2 — Piloto funcional (módulos típicos de primer contrato)

Candidatos frecuentes (se confirman con la alcaldía):

| Orden sugerido | Módulo | Por qué |
|----------------|--------|---------|
| 1 | Presupuesto (CDP/RP) | Base del gasto legal |
| 2 | Contratación (contrato, pólizas, actas) | Alto riesgo / alta visibilidad |
| 3 | Radicación de cuentas + órdenes de pago + tesorería | Cierra el ciclo del dinero |
| 4 | Predial + facturación/PSE + portal ciudadano básico | Recaudo + bonificación |
| 5 | Contabilidad (asientos desde los anteriores) | Cierre financiero |
| 6 | Ventanilla / archivo digital | Soporte transversal |

Entregables de fase 2:

- Consola institucional usable en piloto  
- Portal ciudadano **núcleo**: impuestos, PQRSD, certificados, expediente (demo SPA)  
- Ciclo gasto: presupuesto → contratación → tesorería → contabilidad + estampillas  
- Capacitación y soporte en nube  

### Fase 3 — Expansión financiera y rentas

- Vehicular (si aplica), más conceptos tributarios  
- Conciliación bancaria  
- Fiscalización y cobro coactivo  
- Nómina pública  
- Almacén / recursos físicos  

### Fase 4 — Ciudadano ampliado, control y gerencia

- Semáforo de términos PQRSD (profundidad)  
- TRD  
- Defensa judicial (tutelas / términos)  
- Tableros BI / MIPG / rendición de cuentas  
- Planeación: plan de desarrollo y banco de proyectos  
- *Fuera del núcleo actual (no priorizado):* encuestas, registros configurables, licencias cementerio, notificaciones con constancia legal  

### Fase 5 — Add-ons y profundidad

- Biometría de asistencia  
- Firma electrónica avanzada  
- Catastro multipropósito / SIG  
- Integración SECOP (coordinada con la entidad)  
- Servicios públicos, tránsito, PAE, riesgo, programas sociales  
- Presupuesto participativo / SGR  

---

## 2. Matriz rápida módulo → fase

| Módulo / submódulo | Fase orientativa |
|--------------------|------------------|
| Plataforma IAM + archivos + multi-tenant | 1 |
| Presupuesto CDP/RP | 2 |
| Contratación (contrato, pólizas, actas, otrosíes) | 2 |
| Estudios previos / pliegos | 2 |
| Licitaciones (expediente interno) | 2–3 |
| Radicación cuentas, órdenes de pago, tesorería | 2 |
| Contabilidad NIIF SP | 2–3 |
| Predial + PSE + portal ciudadano rentas | 2 |
| ICA / estampillas / vehicular | 3 |
| Conciliación bancaria | 3 |
| Fiscalización / cobro coactivo | 3 |
| Nómina | 3 |
| Almacén y activos | 3 |
| Vacaciones, viáticos, evaluación, SST | 4 |
| PQRSD + semáforo | 4 |
| TRD | 4 |
| Planeación / banco proyectos | 4 |
| BI / MIPG | 4 |
| Defensa judicial | 4 |
| Biometría | 5 |
| Firmas digitales nativas | 5 |
| Catastro SIG | 5 (roadmap principal) |
| SECOP integración | 5 |
| Sectoriales (tránsito, salud, PAE, riesgo, SPD, social) | 5 |

---

## 3. Hitos de negocio (paralelos al software)

| Hito | Descripción |
|------|-------------|
| B1 | Documento comercial listo para aliados (este paquete) |
| B2 | Primera reunión de priorización con alcaldía piloto |
| B3 | Acuerdo de licencia de uso (+ opcional bonificación por recaudo) |
| B4 | Go-live piloto |
| B5 | Medición de recaudo vs línea base (si aplica bonificación) |
| B6 | Segunda alcaldía / replicación multi-tenant |

---

## 4. Cómo usar este roadmap en negociaciones

1. Mostrar el **catálogo completo** (propuesta).  
2. En reunión, marcar en esta matriz qué entra en el contrato.  
3. Asignar fechas reales por módulo.  
4. Actualizar este archivo con el nombre de la alcaldía y la vigencia.  

Plantilla de acuerdo (copiar por cliente):

```text
Alcaldía: ____________________
Fecha reunión: _______________
Módulos fase contratada:
1. _____________  entrega: ____
2. _____________  entrega: ____
3. _____________  entrega: ____
Entrega final fase: __________
Bonificación recaudo: Sí / No
Línea base / %: ______________
```

---

## 5. Control de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.1 | 2026-07-22 | Roadmap inicial alineado a discovery cerrado |
