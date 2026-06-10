# Action Plan

**Project:** {Project Name}
**Analysis Date:** {YYYY-MM-DD}

---

## Overview

This plan prioritizes fixes based on risk severity and implementation complexity.

```
CHECKLIST SUMMARY
─────────────────────────────────────────────────

  ✓ Pass     {N} items
  ✗ Fail     {N} items    ← {agent-doable} agent-fixable
  ? Unknown  {N} items
```

---

## Short-term (Critical + High Priority)

```
IMMEDIATE ACTION
═══════════════════════════════════════════════
```

Items that should be addressed before launch or as soon as possible.

### ◆ Critical

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

### ● High

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Mid-term (Medium Priority)

```
BEFORE SCALING
═══════════════════════════════════════════════
```

Important improvements to complete after initial launch stabilizes.

### ◐ Medium

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Long-term (Low Priority)

```
NICE TO HAVE
═══════════════════════════════════════════════
```

Strategic improvements for scale, compliance, or operational excellence.

### ○ Low

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Not Worth Fixing Right Now

```
SKIP THESE — DELIBERATELY
═══════════════════════════════════════════════
```

{Based on your project context (audience, data, stakes), these failing items aren't worth your time yet. They stay in the checklist and score, but we recommend deferring them. Never list Critical items here. Omit this section if nothing qualifies.}

| Item | Why skip it for now |
|------|---------------------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {One line — e.g., "E2E tests add little value before you have real user flows to protect"} |
| [{Title}](./checklist/item-NNN-{slug}.md) | {One line} |

Revisit these when your audience, data sensitivity, or stakes change.

---

## Agent-Fixable Items

```
QUICK WINS  ⚡
═══════════════════════════════════════════════
```

These items can be fixed automatically by an AI coding agent:

| Item | Domain | Priority |
|------|--------|----------|
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |

To fix a specific item, tell your AI assistant:

```
Read .vibe-check/checklist/item-NNN-{slug}.md and fix it
```

---

## Human-Required Items

```
┌─ WARNING ───────────────────────────────────┐
│                                             │
│  These items require human action:          │
│                                             │
│  — {Item} — {what you need to do}           │
│  — {Item} — {what you need to do}           │
│  — {Item} — {what you need to do}           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Progress Tracking

After making fixes, re-run the check to see updated scores.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ◆ | Critical — fix immediately |
| ● | High — fix before launch |
| ◐ | Medium — fix soon |
| ○ | Low — when time allows |
| ℹ | Informational — advisory only |
| ⚡ | Agent can fix completely |
| ½ | Agent + human effort |
| — | Human action required |
