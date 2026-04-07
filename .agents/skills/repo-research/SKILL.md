---
name: repo-research
description: Analyze this repository and create or update a project context document. Use when asked to research, map, understand, or summarize the codebase architecture.
---

# Repo Research Skill

## Goal
Create or update `.agents/rules/project-context.generated.md`.

## Process
1. Scan the directory tree first.
2. Identify stack, entry points, main scene files, state files, UI files, and interaction files.
3. Summarize the architecture in simple language.
4. Write findings into `.agents/rules/project-context.generated.md`.
5. Append updates instead of overwriting useful existing context.

## Output format
Include:
- current stack
- folder map
- entry points
- scene architecture
- state architecture
- interaction flow
- open questions
- risky complexity zones

## Constraints
- Keep summaries compact.
- Prefer architecture map over code dump.
- Stop after producing a useful map.