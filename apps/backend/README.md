# ShelterHub Backend

NestJS backend for ShelterHub, organized by business capability modules.

## Run

```bash
npm install
npm run start:dev
```

The API runs on `http://localhost:4000` by default with a global `/api` prefix.

To enable CORS, provide an explicit allowlist:

```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Current Scope

- app bootstrap
- health endpoint
- integration test harness

## Endpoints

- `GET /api/health`

## Test

```bash
npm run test:integration
```
