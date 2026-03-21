---
name: map-codebase
description: Run standalone codebase analysis at a conceptual level. Use when the user wants to understand their project structure, stack, conventions, and architecture without running a full assessment.
user-invocable: true
---

# Codebase Mapping for Readiness

<objective>
Analyze the repository at a conceptual level and produce a codebase map that supports readiness assessment.
</objective>

## Architecture

**If subagent spawning is available**, spawn the mapper agent:

```
Task: Map codebase for standalone analysis

Read agents/mapper.md for your instructions.

Explore this codebase and write analysis files to .vibe-check/analysis/

Return confirmation and a summary of findings when complete.
```

**If subagent spawning is NOT available**, perform the mapping yourself:
1. Read `agents/mapper.md` for the exploration process
2. Follow the compact mode or standard mode steps depending on codebase size
3. Write all 13 analysis files to `.vibe-check/analysis/`
4. Continue to output

## Output format

Present the results covering:

1. **Stack**
   - Languages, frameworks, runtime, databases, hosting

2. **Architecture**
   - High-level pattern
   - Layers and responsibilities
   - Data flow summary

3. **Structure**
   - Top-level directories
   - Key entry points

4. **Conventions**
   - Naming, error handling, configuration, feature boundaries

5. **Testing**
   - Test frameworks
   - Coverage areas and gaps

6. **Integrations**
   - External services, APIs, queues, storage

7. **Concerns**
   - Known risks, fragile areas, bottlenecks

## Rules
- Keep it concise, focus on what affects production readiness.
- Include file paths as examples when available.
- If repository access is limited, mark sections as Unknown and list assumptions.
- Analysis files are written to `.vibe-check/analysis/` for later use by `/check` or `/refresh`.
