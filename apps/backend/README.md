# ShelterHub Backend

NestJS backend for ShelterHub, organized by business capability modules.

## Run

```bash
npm install
npm run prisma:generate
npm run start:dev
```

The API runs on `http://localhost:4000` by default with a global `/api` prefix.

To enable CORS, provide an explicit allowlist:

```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

Configure PostgreSQL with `DATABASE_URL`:

```bash
cp .env.example .env
```

## Current Scope

- app bootstrap
- health endpoint
- integration test harness

## Endpoints

- `GET /api/health`
  - returns service status and database connectivity (`database: "up" | "down"`)

## Test

```bash
npm run test:integration
```

Integration tests are DB-backed and start a temporary PostgreSQL container
with `testcontainers`. Docker must be running before executing the suite.
