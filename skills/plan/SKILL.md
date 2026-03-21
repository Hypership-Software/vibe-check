---
name: plan
description: Plan your build with an interactive session that produces PROJECT-PLAN.md. Use when the user wants to scope and plan an app before coding — covers tech stack, data model, MVP scope, and build order.
user-invocable: true
---

# Project Planning

<objective>
Run an interactive planning session that asks easy questions and produces a detailed PROJECT-PLAN.md optimized for AI coding tools (Claude Code, Cursor, etc.). If .vibe-check/idea-brief.md exists, use it as starting context. The output should be specific enough to hand to an AI and say "build this."
</objective>

Load `reference/project-planning.md` for methodology on scoping, stack selection, data modeling, and build order.

**Key tone notes:**
- Make decisions, don't present options. "Use Supabase" not "you could use Supabase, Firebase, PlanetScale, or Neon."
- Scope down aggressively. Their instinct is to build too much. Your job is to cut.
- Keep questions easy to answer. "What info needs to be saved?" not "describe your data model."

## Conversation Flow

### Phase 1 — Load Context

Check for `.vibe-check/idea-brief.md`:

**If found:** Read it and reference it naturally. "I see you validated this idea — a {summary}. Let me build on that. Does this still capture what you're building, or has anything changed?"

**If not found:** Start from scratch. No problem — not everyone runs the idea skill first.

### Phase 2 — Core Questions

Ask these in a conversational way. These are designed to be easy for a non-technical founder to answer while giving you everything you need to write a detailed spec.

**Q1: "What does this do?"**
One sentence. If they wrote an idea brief, confirm or refine what's there.

**Q2: "Who's the first user?"**
Not a persona. A specific person or type. "My friend Sarah who runs a bakery" or "indie game developers who sell on itch.io."

**Q3: "What's the ONE thing they do when they open the app?"**
The core action. This forces focus. If they list 3 things, push back: "Which one is the reason someone opens this for the first time?"

**Q4: "What info needs to be saved?"**
Data that persists between sessions. "Their recipes and customer orders" or "the links they've bookmarked and their tags."

**Q5: "Do people need to log in?"**
Auth requirement. If yes, ask: "Just email/password, or do they need Google/GitHub login?"

**Q6: "Any external services?"**
Payments, email, AI APIs, maps, file uploads, etc. "Do you need to charge money, send emails, or connect to any other services?"

Adapt these based on context:
- If the idea brief already answers some, confirm and move on
- If they give a detailed description upfront, extract answers and confirm rather than re-asking
- If something is unclear, ask a follow-up before moving on

### Phase 3 — Form Factor & Stack

Based on what they described, recommend a form factor and tech stack. Use AskUserQuestion for a structured choice:

```
header: "Form Factor"
question: "Based on what you described, here's what I'd recommend. Sound right?"
options:
- "{Recommended form factor} (Recommended)" — with reasoning specific to their app
- "{Alternative}" — if there's a reasonable alternative
- "{Another alternative}" — if applicable
```

Then present the stack. Don't ask them to choose each layer — make sensible defaults and present the full stack. Use the defaults from `reference/project-planning.md` unless their requirements suggest otherwise.

```
header: "Tech Stack"
question: "Here's the stack I'd suggest for this. Any strong preferences or existing experience that should change this?"
options:
- "Looks good, let's go with it (Recommended)"
- "I have some preferences" — then ask what they'd change
```

### Phase 4 — Synthesis & Writing

This is where the magic happens: easy questions in, detailed spec out.

Take everything from Phases 1-3 and synthesize a complete PROJECT-PLAN.md. You're doing the hard work of turning vague requirements into a specific, buildable spec.

**Write PROJECT-PLAN.md to the project root** using the structure defined in `templates/project-plan.md`.

**Guidelines for the spec:**
- **Never pin specific version numbers** in the tech stack (e.g., "Next.js" not "Next.js 15"). AI models often install outdated versions from their training data. Always use the latest stable version of whatever technology you recommend — let the package manager resolve it.
- Data model should include actual field names, types, and relationships
- Pages should include actual routes, not placeholders
- The "NOT building" list is as important as the "building" list
- Implementation order should be specific to THEIR app, not generic
- Include 4-6 entities in the data model (most MVPs don't need more)
- Include 4-8 pages/screens (most MVPs don't need more)

### Phase 5 — Review & Iterate

After writing the file, show a summary in the terminal:

```
┌──────────────────────────────────────────────┐
│                                              │
│   PROJECT PLAN                               │
│                                              │
│   {Project Name}                             │
│                                              │
│   Stack:  {Framework + DB + Hosting}         │
│   Pages:  {count}                            │
│   Models: {count} entities                   │
│   Scope:  {count} features in v1             │
│                                              │
└──────────────────────────────────────────────┘
```

Then ask: "Take a look at PROJECT-PLAN.md. Anything you'd change before we lock it in? I can adjust the scope, stack, data model, or any section."

Iterate if they have feedback. When they're happy, close with:

"Your plan is ready. When you're ready to build, open PROJECT-PLAN.md and tell Claude Code to start with Phase 1. If you want to check production readiness later, run the vibe-check skill."

## Output Files

- `PROJECT-PLAN.md` — Detailed build spec in the project root

## Important Notes

- The spec should be detailed enough that Claude Code can build from it without a long follow-up conversation.
- Scope down aggressively. The #1 mistake vibe coders make is building too much in v1.
- The "NOT Building" list prevents scope creep during implementation. Make it explicit and specific.
- Don't recommend technologies you aren't confident about. Stick to well-established tools.
- If the user already has code or a stack, adapt to what they're using rather than suggesting they rewrite everything.
- Data model should use real field names and types, not placeholders. This is what makes the spec actually useful for AI coding tools.
- Implementation order should put the core value BEFORE auth. Build the thing that makes the app unique first.

## Context

<!-- inline:shared/persona.md -->
<!-- inline:shared/voice.md -->
