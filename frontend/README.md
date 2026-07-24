# Kratos — Frontend SPA

ERP Municipal SelvaTic · Proyecto Kratos

SPA de demostración (consola institucional + portal ciudadano) con tema claro/oscuro.

## Puerto fijo (obligatorio)

**http://localhost:5173** — no cambiar nunca.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router
- Lucide Icons

## Arranque local (Vite)

```bash
cd frontend
npm install
npm run dev
```

Abre **http://localhost:5173**.

## Docker

Desde la raíz del repo:

```bash
docker compose up --build -d
```

- URL: **http://localhost:5173**
- Contenedor: `kratos-frontend`

Detener:

```bash
docker compose down
```

> No uses Vite y Docker a la vez en el mismo puerto: uno u otro. Si 5173 está ocupado, libera el proceso; no cambies el puerto.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Acceso a consola (demo: cualquier credencial) |
| `/app/dashboard` | Dashboard gerencial mock |
| `/app/modulos/:slug` | Workspace interactivo por módulo |
| `/ciudadano` | Portal ciudadano (consulta predial mock) |

## Tema día / noche

El toggle persiste en `localStorage` (`kratos-theme`). En la primera visita respeta `prefers-color-scheme`.

## Notas

- Sin backend todavía: datos mock.
- Design system propio; tipografías Fraunces + Manrope.
- Marca de producto: **Kratos** · Empresa: **SelvaTic**.
