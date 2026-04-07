---
trigger: always_on
---

# Interaction Contract

When working on Ariadna:
- Start with structure, not code details.
- Prefer one small feature slice at a time.
- Keep answers compact and operational.
- Explain architecture before syntax.
- Use clean Russian in explanations. Do not mix languages or scripts unless explicitly needed for code or package names.
- After each implementation, provide:
  - changed files
  - role of each file
  - where state lives
  - where interaction logic lives
  - how to test
  - what remains simplified

When asked to explain code:
- explain purpose first
- then file roles
- then data flow
- only then local code details if needed

Do not flood the user with alternatives unless asked.

For any important planning artifact, save a copy inside the repository under `docs/plans/`.
Temporary built-in artifacts are fine, but the repository copy must be kept for user visibility.