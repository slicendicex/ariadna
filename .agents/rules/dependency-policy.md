---
trigger: always_on
---

# Dependency Policy

- Do not install new packages without explicit approval.
- If a new dependency is proposed, explain:
  1. what problem it solves
  2. why existing stack is insufficient
  3. what lighter alternative exists
  4. what complexity cost it adds

- Prefer existing stack over new dependencies.
- Prefer small, well-known libraries only when they remove real complexity.
- Avoid heavy abstractions for MVP.