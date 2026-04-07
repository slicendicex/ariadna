---
name: ariadna-feature-build
description: Implement one small Ariadna feature slice in a browser-first 3D prototype using a simple readable architecture. Use when asked to add scene, camera, node, card, drag, edge, or local state behavior.
---

# Ariadna Feature Build Skill

## Goal
Implement exactly one approved feature slice.

## Process
1. Restate the requested slice.
2. Identify affected files.
3. Explain the minimal architecture delta.
4. Implement only the requested slice.
5. Report changed files and testing steps.

## Constraints
- Keep the implementation small.
- Prefer readability over cleverness.
- Do not expand scope.
- Separate rendering, state, and interaction when reasonable.
- Do not add dependencies without explicit approval.

## Required output
- changed files
- role of each changed file
- where state lives
- where interaction logic lives
- how to test in browser
- what remains temporary