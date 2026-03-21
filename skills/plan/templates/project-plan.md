# {Project Name}

> {One-line description}

## Overview

{2-3 paragraphs: what it does, who it's for, core value prop}

## Target User

{Specific description of the first user and their problem}

## Core User Flow

{Step-by-step: what happens from landing on the app to completing the core action}

1. User arrives at...
2. They see...
3. They click/do...
4. The app...

## Tech Stack

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| Framework | {e.g., Next.js} | {why} |
| Database | {e.g., Supabase Postgres} | {why} |
| Auth | {e.g., Supabase Auth} | {why} |
| Hosting | {e.g., Vercel} | {why} |
| Styling | {e.g., Tailwind + shadcn} | {why} |

## Data Model

{Entities and their relationships, with key fields}

### {Entity 1}
- id (uuid, primary key)
- field1 (type)
- field2 (type)
- created_at (timestamp)

### {Entity 2}
- ...
- {entity1}_id (foreign key -> Entity 1)

## Pages / Screens

### {Page 1}: {Name}
- **Route**: `/path`
- **Purpose**: {what the user does here}
- **Key elements**: {main UI components}
- **Data**: {what data this page reads/writes}

### {Page 2}: {Name}
- ...

## MVP Scope

**Building:**
- {Feature 1} -- {why it's essential}
- {Feature 2} -- {why it's essential}
- {Feature 3} -- {why it's essential}

**NOT Building (yet):**
- {Feature X} -- {why it can wait}
- {Feature Y} -- {why it can wait}
- {Feature Z} -- {why it can wait}

## Implementation Order

1. **Project setup** -- Initialize repo, install dependencies, configure {stack}
2. **Data layer** -- Set up database schema, {ORM} models
3. **{Core feature}** -- {description of the first thing to build}
4. **{Auth/accounts}** -- {if needed}
5. **{Secondary feature}** -- {builds on core}
6. **Polish** -- Error handling, loading states, mobile responsive

## API / Integrations

{If any external services are needed}

| Service | Purpose | Setup Required |
|---------|---------|----------------|
| {e.g., Stripe} | {payments} | {account + API keys} |

## Open Questions

- {Anything that came up during planning that needs resolution}
