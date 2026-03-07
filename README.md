# Shelter Hub

Shelter Hub is a platform designed to help animal shelters manage their daily operations, communicate with adopters, and coordinate staff and volunteers more effectively.

Many shelters rely on fragmented tools such as spreadsheets, messaging apps, and social media to manage animals and respond to adoption inquiries. Shelter Hub provides a unified system that centralizes these workflows into a single platform.

The goal of Shelter Hub is to simplify shelter operations, improve response times to adopters, and increase successful adoption outcomes.

---

# Product Overview

Shelter Hub provides tools for shelters to manage:

- animal records and adoption status
- adopter inquiries and conversations
- staff and volunteer coordination
- adoption visit scheduling
- operational workflows and reminders

The system is designed to support multiple shelters while keeping each shelter's data isolated.

---

# Core Modules

## Animal

The Animal module manages the lifecycle of animals in the shelter.

Responsibilities:

- maintain animal profiles
- manage photos and media
- track intake information
- track adoption status
- manage foster assignments
- provide public adoption listings

Key features:

- create and update animal profiles
- upload and manage photos
- track adoption status
- manage public adoptable listings

---

## Adopter

The Adopter module represents people interacting with the shelter.

Responsibilities:

- maintain adopter contact information
- track adoption applications
- maintain interaction history
- manage messaging consent

Key features:

- adopter profiles
- adoption history tracking
- inquiry management

---

## Messaging

The Messaging module provides a unified inbox for communication with adopters.

Responsibilities:

- manage message threads
- integrate external messaging channels
- support message templates
- track message delivery status

Key features:

- threaded conversations
- quick reply templates
- messaging integrations
- webhook handling for inbound messages

---

## Staff

The Staff module manages users inside a shelter.

Responsibilities:

- manage user accounts
- manage roles and permissions
- assign conversations and tasks
- track staff activity

Key features:

- role-based access control
- volunteer and staff management
- activity logs

---

## Appointments

The Appointments module handles scheduling interactions with adopters and veterinary care.

Responsibilities:

- adoption visits
- veterinary appointments
- internal operational scheduling

Key features:

- appointment scheduling
- staff assignment
- reminders

---

## Workflow

The Workflow module coordinates operational tasks.

Responsibilities:

- manage adoption pipelines
- track follow-up tasks
- automate reminders

Example pipeline:

New Inquiry → Contacted → Screening → Visit Scheduled → Pending → Adopted

---

# Feature Roadmap

## Phase 1 — Core Operations

Initial functionality focuses on core shelter workflows.

Features:

- animal profile management
- public adoptable listings
- adopter inquiries
- unified messaging inbox
- staff user management
- workflow pipeline
- basic appointment scheduling

Goal:

Allow shelters to manage their day-to-day operations using Shelter Hub.

---

## Phase 2 — Communication Platform

Focus on improving communication efficiency.

Features:

- messaging channel integrations
- message templates
- automated follow-ups
- notifications
- conversation assignment
- conversation search

Goal:

Reduce response times and prevent missed adopter inquiries.

---

## Phase 3 — Operational Improvements

Focus on improving operational coordination.

Features:

- advanced appointment management
- task management
- activity tracking
- improved workflow automation

Goal:

Enable shelters to coordinate staff and volunteers effectively.

---

## Phase 4 — Insights and Analytics

Focus on operational insights.

Features:

- adoption funnel analytics
- response time metrics
- operational dashboards
- workflow performance tracking

Goal:

Provide shelters with insights to improve adoption outcomes.

---

## Phase 5 — Integrations

Expand the ecosystem around shelters.

Features:

- external adoption platform integrations
- donation system integrations
- veterinary system integrations
- shelter collaboration tools

Goal:

Connect shelters with external services and tools.

---

# Architecture

ShelterHub supports both **online and offline** usage across **mobile and desktop** clients. Business logic is written once in a shared `core` package and reused by all client apps. Platform-specific code is limited to UI and adapter implementations.

## Layers

```
UI → Application / Use Cases → Domain → Interfaces → Platform Adapters
```

| Layer | Responsibility |
|---|---|
| UI | Platform-specific views (mobile, desktop) |
| Application / Use Cases | Orchestrates business operations |
| Domain | Models, rules, validation, sync logic |
| Interfaces | Repository and service contracts |
| Platform Adapters | Concrete implementations (local DB, API, storage) |

---

## Shared Core

The `core` package contains all logic that must behave identically across platforms:

- **Domain models** — entities and value objects (Animal, Adopter, Appointment, etc.)
- **Business rules** — invariants and domain policies
- **Use cases** — application services that orchestrate domain operations
- **Validation** — input and state validation shared across all clients
- **Sync rules** — conflict detection and resolution policies
- **Repository interfaces** — abstractions that platform adapters implement

Mobile and desktop apps import `core` directly. No business logic lives in platform-specific code.

---

## Platform-Specific Apps

Each client app contains only what is specific to its platform:

- **Mobile** (`apps/mobile`) — React Native UI, Expo, mobile-native adapters
- **Desktop** (`apps/desktop`) — Desktop UI, desktop-native adapters
- **Adapters** — concrete implementations of repository interfaces (SQLite, API client, file storage)

---

## Offline-First

The UI reads exclusively from the **local database** (SQLite). All writes go to local storage first and are reflected in the UI immediately, regardless of network state.

A background sync service reads from a local outbox and pushes changes to the backend. Incoming server changes are written to the local database and the UI updates reactively.

The app remains fully functional without a network connection.

---

## Sync and Conflict Handling

Conflict resolution policies live in `core/sync`:

- Each entity carries a `version` or `updatedAt` timestamp
- On sync, the client compares local and server versions
- **Last-write-wins** is the default for most fields
- **Domain-specific rules** apply to critical state transitions (e.g., adoption status cannot revert once confirmed)
- Unresolvable conflicts are surfaced to the user for manual resolution

The backend is the **source of truth** for invariants that must never conflict (e.g., an animal cannot be adopted twice).

---

## Multi-Tenant Design

Shelter Hub supports multiple shelters within a single system. Each shelter acts as a tenant.

Tenant isolation is enforced using:

- `tenant_id` on all domain entities
- database-level isolation policies
- tenant-aware request middleware

Tenant identification is resolved through:

- subdomain routing — `shelterSlug.shelterhub.com`
- request header — `X-Tenant-ID`

---

## Design Principles

- **Offline-first** — the local database is the primary data source; the network is secondary
- **Shared core** — business logic lives once in `core` and is imported by all client apps
- **Platform adapters** — each app provides its own adapter implementations; `core` never depends on platform APIs
- **Backend as authority** — critical invariants are enforced server-side
- **Eventual consistency** — clients sync in the background; the UI reflects local state immediately
- **No duplication** — adding a business rule means editing `core`, not updating each app separately

---

# Technology Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Web / Desktop Application

- Next.js / Electron
- React
- TypeScript
- SQLite (local database for offline support)

## Mobile Application

- React Native
- Expo
- SQLite (via expo-sqlite)

## Infrastructure

- Docker
- Turborepo
- pnpm workspaces

## Storage

- S3-compatible object storage

---

# Repository Structure

```
core/
  domain/         # entities, value objects, domain rules
  use-cases/      # application services
  validation/     # shared validators
  sync/           # sync rules and conflict resolution
  interfaces/     # repository and service contracts

apps/
  mobile/
    ui/           # React Native screens and components
    adapters/     # SQLite, API, and storage implementations
  desktop/
    ui/           # Desktop UI
    adapters/     # Platform-specific implementations

backend/
  modules/        # NestJS domain modules
  workers/        # Async background workers
  infra/          # Prisma, PostgreSQL, object storage

packages/
  api-client/     # Typed HTTP client shared by apps
  types/          # Shared TypeScript types
  validators/     # Zod schemas (imported by core)
  config/         # Shared configuration
```

---

# Long-Term Vision

Shelter Hub aims to become a comprehensive platform for animal shelters, enabling them to manage operations efficiently, communicate effectively with adopters, and improve adoption outcomes.