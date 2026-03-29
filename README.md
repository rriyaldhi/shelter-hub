# ShelterHub

ShelterHub is an operational management system for animal shelters, rescue organizations, and foster-based operations. It replaces fragmented tools — spreadsheets, shared inboxes, paper forms — with a single system that tracks animals from intake to outcome and manages the people, workflows, and records around them.

---

# Overview

Shelters deal with a high volume of moving pieces: animals coming in and going out, medical care schedules, foster placements, adoption applications, and a mix of staff, volunteers, partners, and vets. ShelterHub gives shelter teams a shared system to manage all of this without losing track of an animal's history or dropping an adoption application.

The system is multi-shelter. Each shelter operates in its own isolated workspace.

---

# Core Features

- Full animal lifecycle tracking — intake through outcome
- Medical and care records per animal
- Foster placement and check-in management
- Adoption application intake, review, and completion
- People records — adopters, fosters, volunteers, surrendering owners, rescue partners, vets
- Operational forms — intake, surrender, foster, adoption
- Audit trail on all records
- Intake/outcome reporting and operational dashboards

---

# Feature Areas by Workflow

## Animal Lifecycle

Each animal in the system has a profile that tracks its full history from arrival to outcome.

- **Intake** — record source (stray, surrender, transfer in), intake date, and initial assessment
- **Profile** — species, breed, age, weight, sex, microchip, photos, and notes
- **Status tracking** — available, on hold, in foster, pending adoption, adopted, transferred out, deceased
- **Transfers** — record transfers in from partner rescues and transfers out to other organizations
- **Outcome tracking** — adoption, return to owner, transfer out, euthanasia, escaped/lost
- **Timeline** — full chronological history of status changes, medical events, and notes per animal

---

## Medical and Care

Medical records are attached to the animal and visible across the team.

- **Vaccinations** — record vaccine name, date administered, next due date
- **Medications** — active and past medications with dosage, frequency, and end date
- **Treatments** — records for procedures, wound care, and recurring treatments
- **Vet visits and surgeries** — visit date, clinic, vet, notes, and follow-up actions
- **Care notes** — general notes from staff or fosters about behavior, diet, or condition
- **Due tasks and reminders** — upcoming vaccinations, medication refills, and scheduled rechecks

---

## Foster Management

- **Foster profiles** — contact info, address, household details, animal preferences, experience
- **Capacity tracking** — number and type of animals a foster can take; current vs. available capacity
- **Placements** — link an animal to a foster with placement date, expected duration, and notes
- **Check-ins** — log periodic check-ins between staff and foster; record status and any concerns
- **Foster-to-adopt** — flag a placement as a foster-to-adopt and transition directly to an adoption record

---

## Adoption Workflow

- **Applications** — collect adopter information, household details, and animal preferences via a structured form
- **Review and screening** — staff review applications, add notes, and move them through a defined pipeline
- **Pipeline stages** — New → Reviewed → Screening → Meet and Greet → Approved → Pending → Adopted
- **Holds and reservations** — place a soft hold on an animal for an applicant in the pipeline
- **Meet and greet** — schedule and record an in-person or virtual meeting between applicant and animal
- **Adoption completion** — record adoption date, fees, signed documents, and assigned staff
- **Post-adoption notes** — log follow-up contact after placement (30-day checks, returns, etc.)

---

## People and Partner Records

- **Adopters** — contact info, application history, adopted animals, notes
- **Fosters** — full profile with placement history and capacity (see Foster Management)
- **Volunteers** — contact info, availability, skills, assigned tasks
- **Surrendering owners** — contact info linked to surrender records and surrendered animals
- **Rescue partners** — organizations that send or receive transfers; contact and transfer history
- **Vets and clinics** — clinic name, address, contact, linked to vet visit records

---

## Forms and Operational Admin

- **Intake form** — captures animal details, source, condition, and initial assessment at intake
- **Surrender form** — records owner information, reason for surrender, animal history, and known medical issues
- **Foster agreement form** — captures household details, preferences, and agreement terms
- **Adoption application form** — structured form for prospective adopters to submit
- **Document handling** — attach PDFs and documents to animals, people, or records
- **Notes** — free-form notes on any entity (animal, person, application)
- **Audit trail** — all record changes are logged with timestamp and user

---

## Reporting and Visibility

- **Intake and outcome report** — count of animals in, out, and by outcome type over a date range
- **Live inventory** — current count of animals by status and location (shelter vs. foster)
- **Operational dashboard** — snapshot of open applications, animals due for medical care, and foster capacity
- **Task and reminder view** — list of overdue and upcoming tasks across all animals
- **Data export** — export animal records, adoption history, and people records to CSV
- **Data quality checks** — flag incomplete profiles, missing intake data, or animals with no outcome after a defined period

---

# MVP Scope

The MVP covers the workflows that a shelter needs to replace manual tracking entirely.

| Area | MVP |
|---|---|
| Animal lifecycle | Intake, profile, status changes, outcome, timeline |
| Medical records | Vaccinations, medications, vet visits, care notes |
| Foster management | Foster profiles, placements, check-ins |
| Adoption workflow | Applications, pipeline stages, holds, completion |
| People records | Adopters, fosters, volunteers, surrendering owners |
| Forms | Intake, surrender, foster agreement, adoption application |
| Admin | Audit trail, notes, document attachments |
| Reporting | Intake/outcome counts, live inventory, task view, CSV export |

---

# Future Enhancements

These are not in scope for the MVP but are part of the planned product direction.

- **Public adoptable listings** — a shelter-branded page showing available animals, integrated with the animal database
- **Social posting support** — draft and publish adoption posts from an animal's profile
- **Third-party platform integrations** — sync with Petfinder, Adopt-a-Pet, or similar platforms
- **Notifications** — email or push notifications for task reminders, application updates, and check-in schedules
- **Analytics** — adoption funnel metrics, length-of-stay analysis, foster utilization rates
- **Donation tracking** — link donations to animals or campaigns
- **Veterinary system integrations** — read vet records directly from clinic systems

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

## Shelter Isolation Design

Shelter Hub supports multiple shelters within a single system. Each shelter operates as its own isolated workspace.

Shelter isolation is enforced using:

- `shelter_id` on all shelter-scoped domain entities
- database-level isolation policies
- shelter-aware request middleware

Shelter identification is resolved through:

- subdomain routing — `shelterSlug.shelterhub.com`
- request header — `X-Shelter-ID`

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

# MVP Self-Hosted Deployment

Shelter Hub's MVP deployment is intentionally practical. The application runs on a self-hosted Mac mini M1 that hosts a local single-node Kubernetes cluster. This keeps the stack close to the long-term architecture while staying realistic for an early-stage product and a small operational footprint.

## Deployment Model

- The Mac mini hosts a lightweight local Kubernetes cluster
- Argo CD runs inside the cluster and pulls desired state from Git
- GitHub Actions handles CI: tests, builds, and image publishing
- Terraform is used for bootstrap and provisioning work
- GHCR, or another container registry, stores the built container images

This setup follows GitOps principles. GitHub Actions does not deploy directly to the cluster in the normal path. Instead, Git is the source of truth for what should be running.

## End-to-End Flow

1. A developer pushes code to GitHub.
2. GitHub Actions runs tests and builds a container image.
3. The image is pushed to GHCR.
4. GitHub Actions updates GitOps manifests or Helm values in Git with the new image tag.
5. Argo CD detects the Git change and syncs it to the local Kubernetes cluster.
6. Kubernetes pulls the image from the registry and starts or updates the pods.

This keeps CI and deployment responsibilities separate: GitHub Actions produces artifacts, while Argo CD reconciles the cluster to the desired state stored in Git.

## GitHub Actions and Argo CD

For the normal MVP flow, GitHub Actions does not need direct network access to the local Argo CD instance or to the Kubernetes cluster running on the Mac mini.

They are connected indirectly through Git:

- GitHub Actions updates the GitOps repository
- Argo CD pulls from that repository
- Argo CD applies the updated manifests to Kubernetes

Direct webhook or API-based triggering can be added later, but it is optional and not required for the MVP.

## Terraform's Role

Terraform is used mainly for provisioning and bootstrap tasks, not for routine application deployments. In practice, that means using Terraform for cluster setup, base infrastructure, and initial platform configuration, while application releases continue through the GitOps flow.

For a local Mac mini deployment, Terraform should usually be run:

- locally on the Mac mini itself, or
- from a self-hosted GitHub Actions runner on that machine

That avoids exposing the local cluster publicly just to allow provisioning access.

## Container Images

Container images are stored in GHCR or another registry.

- The registry stores the built Docker images
- The GitOps repository stores only image references and tags
- Kubernetes pulls the referenced image from the registry during deployment

The Git repository stores the desired version to run, not the image binaries themselves.

## Practical Infrastructure Stack

- Kubernetes: k3s or another lightweight single-node Kubernetes distribution
- CD: Argo CD
- CI: GitHub Actions
- IaC: Terraform
- Registry: GHCR
- Ingress / TLS: ingress controller plus TLS configuration
- Backups: database and media backups stored off-machine

## Tradeoffs and Limitations

This is a good fit for an MVP, low traffic, and early users, but it is not the final production architecture.

- The Mac mini is a single point of failure
- Power, internet, disk, or hardware issues directly affect availability
- Capacity is limited to one local machine
- Operational resilience is lower than a multi-node or cloud-hosted deployment

It should be treated as a pragmatic MVP deployment model: simple, cost-effective, and close to the intended platform shape, but with clear reliability limits.

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
    modules/      # NestJS domain modules
    workers/      # Async background workers
    infra/        # Prisma, PostgreSQL, object storage

packages/
  api-client/     # Typed HTTP client shared by apps
  types/          # Shared TypeScript types
  validators/     # Zod schemas (imported by core)
  config/         # Shared configuration
```

---

## Backend Module Boundaries

Backend modules are organized by **business capability / workflow**, not by database entity or technical layer.

A module should own a cohesive area of responsibility, its business rules, use cases, persistence logic, and API surface.

Examples of valid backend modules:

- `shelter` — shelter registration, onboarding, profile/settings, workspace lifecycle
- `auth` — credential handling, login, password reset, session/token issuance
- `user` — user accounts and identity data
- `membership` — shelter staff membership, roles, invitations, ownership/admin assignment
- `animal` — intake, profile updates, status changes, outcome tracking
- `medical` — vaccinations, medications, treatments, vet visits
- `foster` — foster profiles, placements, check-ins
- `adoption` — applications, screening, holds, approval, completion
- `scheduling` — meet-and-greet appointments and availability
- `people` — adopters, fosters, volunteers, partners, vets
- `reporting` — dashboards, exports, operational metrics

This means modules are **not** created simply because an entity exists.  
For example, `animal` is a valid module not because `Animal` is an entity, but because animal lifecycle management is a core shelter workflow.

---

# Long-Term Vision

Shelter Hub aims to become a comprehensive platform for animal shelters, enabling them to manage operations efficiently, communicate effectively with adopters, and improve adoption outcomes.
