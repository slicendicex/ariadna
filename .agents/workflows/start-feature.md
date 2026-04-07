---
description: Turn a feature idea into a small approved Ariadna implementation slice
---

When the user types `/start-feature <feature request>`, do this sequence:

1. Act as @pm.
2. Restate the requested feature in one short paragraph.
3. Define:
   - goal
   - acceptance criteria
   - files/modules likely affected
   - risks
   - what will NOT be included
4. Pause for approval.

After approval:
5. Act as @engineer.
6. Use the `ariadna-feature-build` skill.
7. Implement only the approved slice.
8. After implementation, report:
   - changed files
   - purpose of each file
   - where state lives
   - where interaction logic lives
   - how to test
   - what remains simplified