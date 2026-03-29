# ShelterHub Backend

NestJS backend for ShelterHub, organized as a service-ready template with
shared platform primitives.

## Run

```bash
npm install
npm run prisma:generate
npm run start:dev
```

The API runs on `http://localhost:4000` by default with a global `/api` prefix.

Configure runtime values:

```bash
cp .env.example .env
```

To enable CORS, provide an explicit allowlist:

```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Current Scope

- shared HTTP bootstrap template (`src/platform/bootstrap`)
- shared Prisma integration (`src/platform/prisma`)
- shared health API template (`src/platform/health`)
- platform-level health integration test harness

## Endpoints

- `GET /api/health`
  - returns service status and database connectivity (`database: "up" | "down"`)

## Test

```bash
npm run test:integration
```

Integration tests are DB-backed and start a temporary PostgreSQL container
with `testcontainers`. Docker must be running before executing the suite.

## Service Template Notes

The current backend keeps one deployable service while preparing for
distributed deployment on Kubernetes:

- `SERVICE_NAME` controls the value returned by `GET /api/health`.
- `API_PREFIX` sets the global API route prefix (defaults to `api`).
- `PORT` controls the HTTP listen port (defaults to `4000`).

New services can reuse the same platform template by importing
`PlatformModule.forRoot(...)` and bootstrapping through
`createHttpService(...)`.
