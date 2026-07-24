# Kratos — Frontend SPA

ERP Municipal SelvaTic · Proyecto Kratos

**UI:** solo AdminLTE 4 + Bootstrap 5 + Bootstrap Icons (consola, login y portal ciudadano).

## Puerto fijo (obligatorio)

**http://localhost:5174** — no cambiar nunca.

## Stack

- React 19 + TypeScript + Vite
- AdminLTE 4.1 + Bootstrap 5 + Bootstrap Icons
- React Router
- Sin Tailwind / sin CSS propio de marca

## Arranque local

```bash
cd frontend
npm install
npm run dev
```

Abre **http://localhost:5174**. CSS de UI en `src/adminlte/bootstrap.ts`.

## Docker

```bash
docker compose up --build -d
```

URL: **http://localhost:5174**

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Login AdminLTE |
| `/app/*` | Consola AdminLTE |
| `/ciudadano/*` | Portal ciudadano AdminLTE |

## Tema

`localStorage` (`kratos-theme`) + `data-bs-theme`.

## Notas

- Datos mock; sin backend.
- Marca: **Kratos** · **SelvaTic**.
