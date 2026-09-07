# NN · Screen Name

**Module:** M
**Requirements:** FR-
**Use case:** UC-
**Priority:** Must / Should / Could
**Owner:**

---

## The question this screen answers

<!-- One sentence, in the user's words. If you cannot write it, the screen does not have a job yet. -->

## The answer, first

<!-- The exact derived sentence that leads the screen. Write the real string, not a description of it.
     e.g. "You can miss 3 more classes in CS3001 before dropping below 80%" -->

## Below the answer

<!-- What the raw record looks like underneath, and what it takes to reach it. -->

## Layout

| Width | Behaviour |
| :--- | :--- |
| 320px | |
| 768px | |
| 1280px+ | |

## States

Every row is implemented. A state with no design is a bug waiting for a demo.

| State | What the user sees | Text shown |
| :--- | :--- | :--- |
| Default | | |
| Empty | | Names what is missing **and who supplies it** |
| Loading | | |
| Error | | Says what to do next |
| Offline | | Cached, with sync-age label; countdowns suppressed |
| Success | | |

## Data

| Field | Source | Derived? |
| :--- | :--- | :---: |
| | `src/data/` | |

Derived values name the pure function in `src/lib/` that produces them.

## Actions

| Action | Result | Reversible? |
| :--- | :--- | :---: |
| | | |

## Copy

<!-- Every user-facing string, English and Urdu. These become the locale entries. -->

| Key | English | Urdu |
| :--- | :--- | :--- |
| | | |

## Accessibility notes

- Focus order:
- Status indicators and their text labels:
- Table caption and headers:
- Anything that needs an `aria-label`:

## Open questions

<!-- Things to resolve before build, not during. -->
