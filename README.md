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

# Architecture Overview

Shelter Hub is implemented as a modular monolithic system with clear domain boundaries.

The architecture emphasizes:

- multi-tenant support
- strong data isolation
- modular domain design
- asynchronous processing for external integrations

---

# High-Level Architecture

Clients:

- Web Application
- Mobile Application

Backend:

- NestJS API server

Infrastructure:

- PostgreSQL database
- object storage for media
- background workers

External integrations:

- messaging APIs
- external services

---

# Logical System Structure

Clients

Web Application  
Mobile Application

↓

API Layer

NestJS Backend

↓

Core Domain Modules

Animal Module  
Adopter Module  
Messaging Module  
Staff Module  
Appointments Module  
Workflow Module

↓

Data Layer

PostgreSQL  
Object Storage

↓

Async Workers

Outbox Worker  
Notification Worker  
Messaging Worker

↓

External Integrations

Messaging APIs  
External service APIs

---

# Multi-Tenant Design

Shelter Hub supports multiple shelters within a single system.

Each shelter acts as a tenant.

Tenant isolation is enforced using:

- `tenant_id` on all domain entities
- database-level isolation policies
- tenant-aware request middleware

Tenant identification can be resolved through:

- subdomain routing  
  `shelterSlug.shelterhub.com`

or

- request headers  
  `X-Tenant-ID`

---

# Event-Driven Processing

Certain operations are handled asynchronously.

Examples include:

- sending outbound messages
- notification delivery
- reminder generation
- analytics updates

Shelter Hub uses a transactional outbox pattern to ensure reliable event processing.

Processing flow:

1. a state change is committed in the database
2. an outbox event is recorded
3. background workers process the event
4. external actions are executed

This allows the system to maintain reliability while supporting eventual consistency.

---

# Technology Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Web Application

- Next.js
- React
- TypeScript

## Mobile Application

- React Native
- Expo

## Infrastructure

- Docker
- Turborepo
- pnpm workspaces

## Storage

- S3-compatible object storage

---

# Repository Structure

apps/
api/
web/
mobile/

packages/
ui/
api-client/
types/
validators/
config/

---

# Long-Term Vision

Shelter Hub aims to become a comprehensive platform for animal shelters, enabling them to manage operations efficiently, communicate effectively with adopters, and improve adoption outcomes.