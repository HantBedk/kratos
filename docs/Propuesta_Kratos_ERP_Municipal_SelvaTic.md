# ERP Municipal SelvaTic — Proyecto Kratos

**Documento de propuesta funcional y comercial**  
**Versión:** 0.1 (borrador para revisión interna)  
**Fecha:** 22 de julio de 2026  
**Empresa:** SelvaTic (en formación)  
**Producto:** ERP Municipal SelvaTic  
**Nombre del proyecto:** Kratos  
**Audiencia:** Equipo SelvaTic, aliados y alcaldías interesadas en un piloto  

> Este documento describe **qué es** el sistema, **qué hace cada módulo** y **cómo se ofrece**.  
> Se irá enriqueciendo con más detalle operativo, pantallas y reglas de negocio a medida que avance el proyecto.  
> No incluye código ni especificaciones técnicas de desarrollo (van en archivos separados).

---

## 1. Resumen ejecutivo

**Kratos** es el proyecto con el que SelvaTic construye un **ERP municipal en la nube**: una suite integral para que las alcaldías digitalicen finanzas, contratación, rentas, talento humano, almacén, atención ciudadana y planeación, con información conectada entre dependencias.

Se ofrece como **licencia digital de uso** (no se vende el código del programa): la entidad opera en una plataforma web administrada por SelvaTic, con acompañamiento de implementación y capacitación.

### Qué resuelve

- Procesos que hoy viven en **papel, Excel o sistemas aislados**
- Falta de trazabilidad entre presupuesto, contratos, pagos y recaudo
- Dificultad para responder a auditorías, control interno y ciudadanía
- Costos de servidores locales y mantenimientos dispersos

### Cómo se entrega

1. Reunión de alcance con la alcaldía  
2. Selección de **módulos prioritarios** y cronograma  
3. Piloto / implementación por fases  
4. Capacitación en sitio y soporte continuo en la nube  

---

## 2. Visión del producto

### 2.1 Principios

| Principio | Significado práctico |
|-----------|----------------------|
| 100% web en la nube | Acceso desde navegador; SelvaTic administra infraestructura, respaldos y disponibilidad |
| Centrado en datos | Un dato alimenta varios módulos (sin silos) |
| Modular | Se contratan los módulos que la alcaldía priorice |
| Multi-entidad | Una plataforma sirve a varias alcaldías (multi-tenant), con datos separados por entidad |
| Dos superficies | Consola para funcionarios y portal para ciudadanos |
| Cumplimiento negociado | Requisitos normativos se acuerdan con cada alcaldía en la explicación del proyecto |

### 2.2 Superficies de uso

**A. Consola institucional (funcionarios)**  
Secretarías de Hacienda, Contratación, Planeación, Talento Humano, Archivo, Jurídica, Almacén, etc. Gestión completa de procesos, aprobaciones, reportes y auditoría.

**B. Portal ciudadano**  
Ventanilla digital con cuatro servicios núcleo (demo SPA):

1. **Impuestos** — consulta de obligaciones (predial, ICA), estados de cuenta y pago en línea (PSE u otros).  
2. **PQRSD** — radicación y seguimiento de estado.  
3. **Certificados** — solicitud y entrega de documentos municipales (p. ej. residencia, estratificación).  
4. **Expediente** — consulta ciudadana del historial del trámite (documentos, fechas, estados, responsables).

La consola ERP es el back-office de esos mismos procesos (liquidación, respuesta, contratos, presupuesto, tesorería, contabilidad, estampillas).

**Idea madre:** un dato alimenta varios módulos; el ciudadano ve la cara pública y la alcaldía opera el expediente interno.

---

## 3. Modelo comercial

### 3.1 Licencia digital de uso

- La alcaldía adquiere el **derecho de uso** de los módulos contratados por vigencia (anual o según acuerdo).
- No se transfiere la propiedad del software.
- Incluye operación en la nube bajo administración de SelvaTic (según el contrato de servicio).

### 3.2 Implementación y capacitación

- Parametrización, migración acordada de datos, puesta en marcha.
- Capacitación presencial o acompañada en la entidad, a cargo del equipo SelvaTic.
- Puede cotizarse **incluida** o **aparte**, según negociación.

### 3.3 Empaque flexible

El precio puede estructurarse como:

- **Por módulo**, o  
- **Tarifa única** por paquete de módulos,

según la negociación con cada alcaldía.

### 3.4 Bonificación por incremento de recaudo (opcional)

En módulos de rentas (predial, ICA, vehicular, etc.), además de la licencia base, se puede acordar:

> Si el recaudo efectivo supera una **línea base** definida con la alcaldía, SelvaTic participa de un **porcentaje del incremento** documentado.

El porcentaje y la línea base se fijan por contrato. El modelo alinea incentivos: más recaudo para la entidad, mayor retorno para SelvaTic.

### 3.5 Cómo se define el alcance de cada proyecto

**Los módulos “principales” no son fijos de fábrica.**  
Se definen en una **reunión conjunta alcaldía + SelvaTic**, donde se acuerda:

1. Módulos prioritarios del piloto / primera entrega  
2. Tiempo de entrega por módulo  
3. Tiempo de entrega final de la fase contratada  
4. Responsables de ambas partes  

El catálogo de este documento es el **menú completo** de lo que Kratos puede cubrir a lo largo del tiempo.

---

## 4. Mapa de la suite

```text
                    ┌─────────────────────────┐
                    │  Alta gerencia / BI     │
                    └───────────┬─────────────┘
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼────────┐    ┌─────────▼─────────┐    ┌───────▼────────┐
│ Planeación     │    │ Contratación      │    │ Tributario     │
│ y proyectos    │    │ y compras         │    │ y rentas       │
└───────┬────────┘    └─────────┬─────────┘    └───────┬────────┘
        │                       │                       │
        └───────────┬───────────┴───────────┬───────────┘
                    │                       │
          ┌─────────▼─────────┐   ┌─────────▼─────────┐
          │ Financiero y      │   │ Documental y      │
          │ presupuestal      │   │ servicio ciudadano│
          └─────────┬─────────┘   └─────────┬─────────┘
                    │                       │
     ┌──────────────┼──────────────┐        │
     │              │              │        │
┌────▼────┐  ┌──────▼──────┐ ┌─────▼─────┐ │
│ Talento │  │ Almacén e   │ │ Defensa   │ │
│ humano  │  │ inventarios │ │ judicial  │ │
└─────────┘  └─────────────┘ └───────────┘ │
                                           │
                    ┌──────────────────────▼──────────┐
                    │ Plataforma: usuarios, flujos,   │
                    │ archivos, portal, nube          │
                    └─────────────────────────────────┘
```

**Módulos sectoriales** (tránsito, salud, educación/PAE, riesgo, catastro, servicios públicos, programas sociales) se ofrecen como **ampliaciones** según necesidad del municipio.

---

## 5. Plataforma transversal (base de todo el ERP)

Antes de los módulos de negocio, Kratos incluye capacidades comunes:

| Capacidad | Para qué sirve |
|-----------|----------------|
| Usuarios, roles y permisos | Cada funcionario ve solo lo de su competencia |
| Auditoría de acciones | Quién creó, modificó o aprobó (trazabilidad) |
| Flujos de aprobación | Radicaciones, CDP, pagos, contratos, PQRSD |
| Gestión de archivos | Soportes digitales asociados a cada expediente |
| Notificaciones y alertas | Vencimientos, términos, pólizas, cartera |
| Multi-tenant | Varias alcaldías en la misma plataforma, datos aislados |
| Reportes exportables | Apoyo a control interno y organismos de control |

---

## 6. Detalle de módulos y submódulos

Leyenda de fase (orientativa; la prioridad real la fija cada contrato):

- **Núcleo:** frecuente en primeros proyectos / alto valor  
- **Expansión:** segunda ola  
- **Add-on:** opcional / sectorial  

Cada ficha se irá ampliando (campos, pantallas, reglas exactas) en versiones posteriores de este documento.

---

### MÓDULO A — Financiero y presupuestal

Motor del gasto público legal: planear, comprometer, pagar y contabilizar con trazabilidad.

#### A1. Presupuesto (CDP, registros, adiciones) — Núcleo

**Qué es:** Control de la vigencia presupuestal municipal.  
**Para qué sirve:** Evitar comprometer recursos sin disponibilidad y dejar rastro de cada movimiento.  
**Quién lo usa:** Presupuesto, Hacienda, ordenadores del gasto.  
**Qué hace (flujo resumido):**

1. Carga del presupuesto aprobado (rubros, fuentes, valores).  
2. Solicitud y expedición de **CDP** (Certificado de Disponibilidad Presupuestal).  
3. **Registro presupuestal (RP)** al perfeccionar compromisos.  
4. Adiciones, reducciones, traslados según actos administrativos.  
5. Consultas de ejecución y saldos por rubro.  

**Se conecta con:** Contratación, cuentas por pagar, tesorería, contabilidad, planeación.

#### A2. Contabilidad pública (NIIF SP) — Núcleo

**Qué es:** Registro contable según marco aplicable a entidades públicas.  
**Para qué sirve:** Libros, estados e información para control y toma de decisiones.  
**Quién lo usa:** Contabilidad, Hacienda.  
**Qué hace:**

1. Parametrización de plan de cuentas y centros.  
2. Recepción de asientos automáticos desde otros módulos (tesorería, almacén, nómina, etc.).  
3. Asientos manuales controlados.  
4. Libros auxiliares, balances y reportes de gestión.  

**Se conecta con:** Todos los módulos que generan hechos económicos.

#### A3. Tesorería y flujo de caja — Núcleo

**Qué es:** Control del dinero que entra y sale.  
**Para qué sirve:** Liquidez, legalidad de pagos y conciliación de recaudos.  
**Quién lo usa:** Tesorería.  
**Qué hace:**

1. Ingresos por rentas, transferencias y otros.  
2. Programación y ejecución de egresos.  
3. Bancos, cajas y saldos.  
4. Visión de flujo de caja para la dirección.  

**Se conecta con:** Rentas, órdenes de pago, nómina, conciliación bancaria.

#### A4. Órdenes de pago y egresos — Núcleo

**Qué es:** Trámite de pago a terceros (contratistas, proveedores, nómina).  
**Para qué sirve:** Pagar solo lo causado y autorizado, con soportes.  
**Qué hace:**

1. Generación de orden de pago desde cuenta radicada / causación.  
2. Validaciones presupuestales y de expediente.  
3. Autorizaciones según flujo.  
4. Desembolso y comprobante.  

#### A5. Conciliación bancaria — Expansión

**Qué es:** Cruce entre extractos bancarios y movimientos del sistema.  
**Para qué sirve:** Detectar diferencias, omisiones y errores a tiempo.

#### A6. Radicación de cuentas por pagar — Núcleo

**Qué es:** Ventanilla de cuentas de cobro / facturas de proveedores y contratistas.  
**Para qué sirve:** Ordenar el ingreso de obligaciones hasta el pago.  
**Qué hace:**

1. Radicación con soportes.  
2. Revisión técnica/financiera.  
3. Causación / vínculo a contrato y presupuesto.  
4. Paso a orden de pago.  

---

### MÓDULO B — Contratación y compras

Control del ciclo contractual para reducir riesgo jurídico y fiscal.

#### B1. Estudios previos y pliegos — Núcleo

**Qué es:** Expediente precontractual.  
**Para qué sirve:** Dejar soportada la necesidad, el análisis del sector y las reglas de la selección.  
**Qué hace:** Registro de estudios previos, anexos, pliegos o invitaciones, versiones y aprobaciones.

#### B2. Licitaciones y concursos — Expansión

**Qué es:** Gestión del proceso de selección (etapas, observaciones, evaluación).  
**Para qué sirve:** Orden interno del proceso; la publicación en SECOP puede integrarse después.  
**Nota:** En Kratos el expediente es **propio**; la entidad coordina SECOP según su operación.

#### B3. Generación y legalización de contratos — Núcleo

**Qué es:** Contrato digitalizado con datos, valor, plazo, supervisor, objeto.  
**Para qué sirve:** Un solo lugar de verdad del contrato vigente.  
**Qué hace:** Creación, firmas/soportes, legalización, vínculo a CDP/RP.

#### B4. Control de pólizas y garantías — Núcleo

**Qué es:** Seguimiento de amparos y vencimientos.  
**Para qué sirve:** Alertar antes de que una póliza expire y deje desprotegida a la entidad.

#### B5. Actas (inicio, recibo, liquidación) — Núcleo

**Qué es:** Hitos documentales de ejecución.  
**Para qué sirve:** Trazabilidad de inicio, recibos parciales/finales y liquidación.

#### B6. Seguimiento a otrosíes (adiciones / prórrogas) — Núcleo

**Qué es:** Modificaciones contractuales.  
**Para qué sirve:** Controlar cambios de valor/plazo con impacto presupuestal y de pólizas.

---

### MÓDULO C — Tributario y de rentas

Recaudo municipal y gestión de cartera. Base del modelo de bonificación por incremento de recaudo.

#### C1. Impuesto predial — Núcleo

**Qué es:** Liquidación, facturación y cobro del predial.  
**Para qué sirve:** Principal ingreso propio de muchos municipios.  
**Qué hace:** Predios y contribuyentes, tarifas, calendario, liquidación, facturación, cartera, acuerdos de pago.  
**Portal ciudadano:** consultar predios, deuda y pagar.

#### C2. Industria y comercio (ICA) — Núcleo

**Qué es:** Gestión del ICA municipal.  
**Para qué sirve:** Declaraciones/liquidaciones, sanciones, cartera y fiscalización básica.

#### C3. Impuesto vehicular — Expansión / según municipio

**Qué es:** Liquidación y cobro de impuesto de vehículos (cuando aplique a la entidad).  
**Nota:** En Colombia el diseño institucional varía; se parametriza según competencia de la alcaldía.

#### C4. Facturación y botón de pago (PSE) — Núcleo

**Qué es:** Generación de facturas/estados de cuenta y recaudo electrónico.  
**Para qué sirve:** Reducir filas y agilizar caja.  
**Qué hace:** Emisión, notificación, pago en línea, conciliación de recaudos.

#### C5. Fiscalización — Expansión

**Qué es:** Herramientas para detectar omisiones e inconsistencias.  
**Para qué sirve:** Ampliar base y formalidad tributaria.

#### C6. Cobro coactivo — Expansión

**Qué es:** Expediente de cobro persuasivo y coactivo (mandamientos, embargos, etc.).  
**Para qué sirve:** Recuperar cartera vencida con trazabilidad jurídica.

#### C7. Estampillas y tasas parafiscales — Expansión

**Qué es:** Liquidación y control de estampillas/tasas municipales aplicables.  
**Para qué sirve:** No perder recaudo asociado a actos y contratos.

---

### MÓDULO D — Talento humano y nómina

#### D1. Nómina pública — Núcleo

**Qué es:** Liquidación de salarios y prestaciones del personal.  
**Para qué sirve:** Pago correcto, novedades y reportes.  
**Qué hace:** Planta, conceptos, novedades, liquidación, descuentos de ley, enlace a tesorería/contabilidad.

#### D2. Control de asistencia y turnos (biometría) — Add-on / roadmap

**Qué es:** Registro de entrada/salida (incluye biometría).  
**Para qué sirve:** Soporte a novedades de nómina y control de jornada.  
**Fase:** Deseable; no necesariamente en el primer piloto.

#### D3. Vacaciones y permisos — Expansión

**Qué es:** Solicitudes, saldos y aprobaciones.  
**Para qué sirve:** Ordenar ausencias y alimentar nómina.

#### D4. Viáticos y gastos de viaje — Expansión

**Qué es:** Solicitud, legalización y control de viáticos.  
**Para qué sirve:** Trazabilidad del gasto de comisión.

#### D5. Evaluación de desempeño (MIPG / CNSC) — Expansión

**Qué es:** Ciclos de evaluación según lineamientos aplicables.  
**Para qué sirve:** Soporte a gestión del talento y MIPG.

#### D6. Seguridad y salud en el trabajo (SST) — Add-on

**Qué es:** Apoyo documental y de seguimiento SST.  
**Para qué sirve:** Cumplimiento básico y evidencias.

---

### MÓDULO E — Almacén e inventarios (activos fijos)

#### E1. Entradas y salidas de almacén — Núcleo / Expansión

**Qué es:** Kardex de bienes de consumo y devolutivos.  
**Para qué sirve:** Control de existencias y movimientos.

#### E2. Asignación de bienes por funcionario — Expansión

**Qué es:** Responsabilidad individual sobre bienes.  
**Para qué sirve:** Inventarios personales y traslados.

#### E3. Control de activos fijos (depreciación) — Expansión

**Qué es:** Vida útil, avalúos, depreciación.  
**Para qué sirve:** Asientos contables y control patrimonial.

#### E4. Baja de bienes — Expansión

**Qué es:** Proceso de baja con soportes y contabilidad.  
**Para qué sirve:** Depurar inventario de forma legal.

---

### MÓDULO F — Gestión documental y servicio al ciudadano

#### F1. Ventanilla única de radicación — Núcleo

**Qué es:** Punto de entrada de comunicaciones y solicitudes.  
**Para qué sirve:** Número de radicado, asignación y seguimiento.

#### F2. PQRSD — Núcleo / Expansión

**Qué es:** Peticiones, quejas, reclamos, sugerencias y denuncias.  
**Para qué sirve:** Cumplir términos y mejorar servicio.

#### F3. Trazabilidad y semáforo de tiempos legales — Núcleo

**Qué es:** Alertas por vencimiento de términos.  
**Para qué sirve:** Evitar silencios administrativos e incumplimientos.

#### F4. Tablas de retención documental (TRD) — Expansión

**Qué es:** Tiempos de conservación por tipología.  
**Para qué sirve:** Archivo ordenado y disposición final.

#### F5. Archivo digital (cero papel) — Núcleo

**Qué es:** Repositorio de expedientes digitales.  
**Para qué sirve:** Soportes listos para auditoría y consulta.

---

### MÓDULO G — Planeación y gestión de proyectos

#### G1. Trazabilidad del Plan de Desarrollo — Expansión

**Qué es:** Metas, indicadores y avance del plan.  
**Para qué sirve:** Seguimiento político-administrativo de compromisos.

#### G2. Banco de programas y proyectos — Expansión

**Qué es:** Formulación y priorización de proyectos de inversión.  
**Para qué sirve:** Alimentar presupuesto y contratación.

#### G3. Presupuesto participativo — Add-on

**Qué es:** Apoyo a procesos participativos de priorización.  
**Para qué sirve:** Transparencia con la comunidad.

#### G4. Gestión de regalías (SGR) — Add-on

**Qué es:** Seguimiento de proyectos financiados con regalías (según alcance acordado).  
**Para qué sirve:** Control de ejecución y reportes.

---

### MÓDULO H — Defensa judicial

#### H1. Control de tutelas — Expansión

**Qué es:** Expediente y términos de tutelas.  
**Para qué sirve:** Responder a tiempo y dejar evidencia.

#### H2. Procesos judiciales y demandas — Expansión

**Qué es:** Inventario de litigios.  
**Para qué sirve:** Visión de riesgo jurídico para la alta gerencia.

#### H3. Alertas de vencimiento de términos — Expansión

**Qué es:** Semáforo jurídico.  
**Para qué sirve:** Reducir fallas por caducidad o silencio.

---

### MÓDULO I — Alta gerencia (Business Intelligence)

#### I1. Tableros de control en tiempo real — Expansión

**Qué es:** Dashboards de recaudo, ejecución, contratos en riesgo, PQRSD, etc.  
**Para qué sirve:** Decisiones del alcalde y secretarios con datos vivos.

#### I2. Indicadores de gestión (MIPG) — Expansión

**Qué es:** Tablero de indicadores institucionales.  
**Para qué sirve:** Apoyo a autodiagnóstico y mejora.

#### I3. Rendición de cuentas — Expansión

**Qué es:** Empaques de información para audiencias públicas y reportes.  
**Para qué sirve:** Transparencia y narrativa de gestión.

---

### MÓDULO J — Sectoriales (add-ons / roadmap)

| Submódulo | Para qué sirve | Fase |
|-----------|----------------|------|
| J1. Tránsito y multas | Comparendos, cartera y recaudo asociado | Add-on |
| J2. Salud pública e inspecciones | Actas, visitas, seguimiento sanitario | Add-on |
| J3. Educación y control PAE | Apoyo a seguimiento PAE / cobertura (alcance acordado) | Add-on |
| J4. Gestión del riesgo y desastres | Inventarios, emergencias, ayudas | Add-on |
| J5. Catastro multipropósito (SIG) | Base territorial ligada a predial y territorio | Roadmap principal |
| J6. Servicios públicos | Usuarios, lecturas, facturación, cartera de acueducto/aseo u otros | Add-on |
| J7. Programas sociales (p. ej. adulto mayor) | Beneficiarios, entregas, trazabilidad | Add-on posterior |

---

## 7. Flujos punta a punta (visión)

### 7.1 Del contrato al pago

1. Estudio previo → proceso de selección → contrato  
2. CDP / RP en presupuesto  
3. Ejecución (actas, pólizas)  
4. Radicación de cuenta → causación → orden de pago → tesorería  
5. Asiento contable automático o integrado  

### 7.2 Del predio al recaudo

1. Base de predios / catastro (según fase)  
2. Liquidación y facturación predial  
3. Pago en caja o PSE (portal ciudadano)  
4. Conciliación en tesorería  
5. Cartera → fiscalización / cobro coactivo si aplica  
6. Tablero de recaudo para alta gerencia (+ eventual bonificación SelvaTic)

### 7.3 De la PQRSD a la respuesta

1. Radicación (ventanilla o canal digital)  
2. Asignación a dependencia  
3. Semáforo de términos  
4. Respuesta y archivo en expediente  

---

## 8. Seguridad y operación en la nube

Sin entrar en detalle técnico (archivo separado), el compromiso comercial incluye:

- Hospedaje y administración por SelvaTic  
- Copias de seguridad y recuperación ante contingencias  
- Control de acceso por usuario y rol  
- Disponibilidad orientada a no interrumpir la operación municipal  
- Canal de soporte para incidentes y dudas de uso  

Los requisitos específicos de protección de datos y archivo se **acuerdan con cada alcaldía** en la etapa de explicación del proyecto.

---

## 9. Implementación tipo (piloto)

| Paso | Actividad |
|------|-----------|
| 1 | Presentación de esta propuesta y demo de alcance |
| 2 | Reunión de priorización de módulos y plazos |
| 3 | Acuerdo de licencia de uso + (opcional) bonificación por recaudo |
| 4 | Parametrización y carga inicial de datos |
| 5 | Capacitación a funcionarios clave |
| 6 | Salida a producción del piloto |
| 7 | Soporte y siguiente oleada de módulos |

---

## 10. Qué no cubre este documento (aún)

- Diseño de pantallas finales y prototipos navegables  
- Diccionario de datos y reglas contables/tributarias al detalle por municipio  
- Cotización numérica (depende de módulos y tamaño de entidad)  
- Especificación técnica de desarrollo (stack, SDD, repositorio) — **archivo aparte**  
- Constitución legal de SelvaTic / RUP  

Esas piezas se irán agregando en versiones 0.2, 0.3, etc.

---

## 11. Glosario breve

| Término | Significado corto |
|---------|-------------------|
| CDP | Certificado de Disponibilidad Presupuestal |
| RP | Registro Presupuestal |
| NIIF SP | Normas de información financiera para el sector público |
| PQRSD | Peticiones, quejas, reclamos, sugerencias y denuncias |
| TRD | Tabla de Retención Documental |
| PSE | Pagos Seguros en Línea |
| MIPG | Modelo Integrado de Planeación y Gestión |
| SGR | Sistema General de Regalías |
| Multi-tenant | Varias entidades en una plataforma con datos separados |
| Licencia de uso | Derecho a usar el software sin adquirir el código |

---

## 12. Control de cambios del documento

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.1 | 2026-07-22 | Primera versión completa del catálogo y modelo comercial para revisión interna |

---

## 13. Próxima acción recomendada (equipo SelvaTic)

1. Lectura conjunta de este documento entre los dos líderes.  
2. Marcar módulos “candidatos frecuentes” de piloto (sin cerrar: la alcaldía decide en reunión).  
3. Revisar el archivo `Roadmap_Kratos.md`.  
4. Completar fichas de los 3–5 módulos que primero mostrarán a aliados (más detalle de campos y pasos).  
5. Preparar versión “presentable” (PDF) a partir de este Markdown.

---

*Documento elaborado para el Proyecto Kratos — ERP Municipal SelvaTic. Uso interno y con aliados bajo acuerdo de confidencialidad recomendado.*
