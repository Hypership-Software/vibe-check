---
name: fix
description: Review vibe-check findings and apply fixes with your approval. Use when the user wants to address issues found by /check — presents findings, suggests fixes, and only applies changes after explicit confirmation.
user-invocable: true
args:
  - name: item
    description: Specific item to fix (e.g., item-003) or omit for all
    required: false
---

# Vibe Check Fix

Review fixable checklist items from an existing vibe-check assessment, present proposed fixes, and apply them only after the user approves.

## Important: User Approval Required

This skill is advisory. It presents findings and proposed fixes but
NEVER applies changes without explicit user approval.

Flow:
1. Load fixable items from `.vibe-check/checklist/`
2. Present each item with: what's wrong, proposed fix, files affected
3. Ask the user: "Which items would you like me to fix?"
4. Only after approval: apply fixes one at a time with verification
5. Report results after each fix

## Reference Files

Read these as needed:

- `reference/agent-classification.md` — How to classify items as agent-fixable vs. human-required

## Architecture

```
fix (orchestrator)
    |
    +-- Phase 1: Validate
    |   +-- Check .vibe-check/ exists and has checklist items
    |
    +-- Phase 2: Load Items
    |   +-- Read checklist, filter to agent-doable Fail items
    |   +-- Sort by priority: Critical > High > Medium > Low
    |
    +-- Phase 3: Present Findings
    |   +-- Show each item: what's wrong, proposed fix, files affected
    |   +-- Ask user which items to fix (individually or batch)
    |   +-- Wait for explicit approval before proceeding
    |
    +-- Phase 4: Fix Loop (sequential, after approval)
    |   +-- For each approved item:
    |       +-- Spawn: vibe-fixer agent (fresh context)
    |       +-- Agent: reads item, applies fix, verifies, commits
    |       +-- Returns: fixed | failed | skipped
    |       +-- Report result before moving to next item
    |
    +-- Phase 5: Update Status
    |   +-- Update checklist items with new status
    |
    +-- Phase 6: Summary
        +-- Show what was fixed, what failed, what still needs human action
```

**Why sequential:** Each fix may affect subsequent fixes. Fresh context per item keeps agents focused.

## Prerequisites

Requires existing `.vibe-check/` directory with checklist items. If not found:

```
No vibe-check assessment found.

Run /check first to identify issues, then come back to fix them.
```

## Process

### Phase 1: Validate

Check that `.vibe-check/checklist/` exists and contains item files.

```bash
ls .vibe-check/checklist/item-*.md
```

If no items exist:

```
No checklist items found. Either:
- No issues were identified (congrats!)
- Assessment hasn't been run yet

Run /check to generate an assessment.
```

### Phase 2: Load Items

Read `metadata.json` to get the item list, or scan the checklist directory.

Filter items to those where:
- `Agent-Doable: Yes` or `Agent-Doable: Partial`
- `Status: Fail` (don't fix Unknown or Pass)

**If specific item requested** (e.g., `/fix item-003`):
- Parse the item ID from the argument
- Filter to just that item
- If not found or not agent-doable, explain why and suggest alternatives

**Sort by priority:** Critical > High > Medium > Low

### Phase 3: Present Findings

Before applying any fix, present a summary of what will be done. For each item, show:

```
┌─ item-001: Secrets Management ────────────────────────────────┐
│ Priority: Critical                                            │
│ What's wrong: API keys are hardcoded in source files          │
│                                                               │
│ Proposed fix:                                                 │
│   - Find all hardcoded secrets in the codebase               │
│   - Create .env.example with placeholder values              │
│   - Refactor code to use process.env.VARIABLE_NAME           │
│   - Add .env to .gitignore                                    │
│                                                               │
│ Files affected: src/api/client.ts, config/database.js        │
│                                                               │
│ After fix, you'll still need to:                              │
│   - Copy .env.example to .env and fill in real values         │
│   - Set env vars in your hosting platform                     │
└───────────────────────────────────────────────────────────────┘
```

After presenting all items, ask:

```
Found {N} fixable items above.

Which would you like me to fix?
  • Type "all" to fix everything
  • Type item IDs to fix specific items (e.g., "item-001 item-003")
  • Type "none" to cancel
```

**Wait for the user's response before doing anything.**

### Phase 4: Fix Loop

Only after the user approves specific items, spawn a `vibe-fixer` agent for each:

```
Task: Fix checklist item {item-id}

Read agents/vibe-fixer.md for your instructions.

Item file: .vibe-check/checklist/{item-filename}

Load references:
- references/persona.md
- references/voice.md

Apply the fix, verify it works, and commit if successful.

Return status: fixed | failed | skipped
```

**Wait for each agent to complete before starting the next.** Report the result of each fix immediately so the user can see progress.

**Graceful degradation:** If agent spawning is not available, apply the fix directly using the agent-classification guidance in `reference/agent-classification.md`. Still apply fixes one at a time with verification, and report each result before proceeding.

### Phase 5: Update Status

For items marked as `fixed`:

1. Read the checklist item file
2. Update `Status: Fail` to `Status: Pass`
3. Add a note at the top: `**Fixed:** {date} by vibe-check:fix`
4. Write the updated file

For items marked as `failed`:

1. Read the checklist item file
2. Add a note: `**Fix Attempted:** {date} — Agent could not complete. See error below.`
3. Append the error details to the file
4. Keep Status as Fail

### Phase 6: Summary

Use the visual patterns from `references/ui-brand.md`. Display results:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK FIX COMPLETE                    │
│                                              │
│   ✓ {N} fixed  ✗ {N} failed  ○ {N} skipped   │
│                                              │
└──────────────────────────────────────────────┘

FIXED  ✓
═══════════════════════════════════════════════
✓  item-001: Secrets Management
✓  item-003: Input Validation
✓  item-012: Error Handling

FAILED  ✗
═══════════════════════════════════════════════
✗  item-007: Authentication — {brief reason}

SKIPPED  ○
═══════════════════════════════════════════════
○  item-015: Error Tracking — needs human action

┌─ NEXT ──────────────────────────────────────┐
│                                             │
│  Run /refresh to update score               │
│                                             │
└─────────────────────────────────────────────┘
```

If nothing to fix:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK FIX                             │
│                                              │
│   No agent-doable items to fix.              │
│                                              │
└──────────────────────────────────────────────┘

┌─ WARNING ───────────────────────────────────┐
│                                             │
│  Your failing items require manual action:  │
│                                             │
│  — Privacy Policy: write and host a policy  │
│  — Backups: enable in database dashboard    │
│                                             │
└─────────────────────────────────────────────┘

Run /discuss to get help with these.
```

## Handling Partial Items

Items with `Agent-Doable: Partial` need both agent work and human work.

When presenting partial items, clearly distinguish what the agent will do vs. what requires human follow-up. After the agent portion is done:

```
PARTIALLY FIXED  ½
═══════════════════════════════════════════════
½  item-015: Error Tracking
   ✓ Installed Sentry SDK
   ✓ Added error boundary
   → You need to: Create Sentry account and set DSN in env vars
```

## Commit Message Format

Fixer agents commit with this format:

```
fix(vibe-check): {item-slug} - {brief description}

Fixes vibe-check item {item-id}.
See .vibe-check/checklist/{item-filename} for details.
```

Example:
```
fix(vibe-check): secrets-management - move API keys to env vars

Fixes vibe-check item item-001.
See .vibe-check/checklist/item-001-secrets-management.md for details.
```

## Error Handling

**If fixer agent fails:**
- Capture the error
- Ensure any partial changes are rolled back (`git restore .`)
- Mark item as failed with reason
- Continue to next item (only if user wants to proceed)

**If verification fails:**
- Roll back the changes
- Mark as failed: "Fix applied but verification failed"
- Include verification output in error details

**If git operations fail:**
- Stop the fix loop
- Report which items were successfully committed
- Leave remaining items for retry

## Orchestrator Rules

**Never fix without approval.** Always present findings first and wait for the user to confirm which items to fix.

**Don't fix items yourself.** Spawn fixer agents. They have fresh context for each item. Use graceful degradation if spawning is unavailable.

**Process sequentially.** Parallel fixes can conflict.

**Verify before commit.** Never commit broken code.

**Roll back failures.** Don't leave partial changes.

**Update checklist files.** Keep them accurate.

**Be specific in summary.** User should know exactly what happened.

## Context

<!-- inline:shared/persona.md -->
<!-- inline:shared/voice.md -->
<!-- inline:shared/ui-brand.md -->
