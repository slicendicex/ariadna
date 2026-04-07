---
name: browser-check
description: Verify a local Ariadna feature in the browser and report exactly what works, what breaks, and how to reproduce issues.
---

# Browser Check Skill

## Goal
Test the requested user interaction against the local app.

## Process
1. Open the local app.
2. Follow the requested scenario exactly.
3. Report:
   - what works
   - what breaks
   - what is unclear
   - exact reproduction steps
4. If the issue is obvious, suggest the smallest fix.

## Constraints
- Test only the requested slice.
- Do not invent features that were not requested.
- Keep the report compact.