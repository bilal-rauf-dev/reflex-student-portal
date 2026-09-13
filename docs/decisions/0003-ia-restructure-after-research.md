# 0003 · Restructure the information architecture after Phase 2 research

**Status:** Accepted
**Date:** Phase 2, Week 5 (Activity 4)
**Decided by:** Whole group

## Context

The Phase 1 proposal defined 22 screens and a navigation map in which every module landing screen
hung directly off the Today dashboard. Those numbers are used by the requirements traceability matrix
(Table 8 of the proposal), so changing them has consequences beyond the interface.

Phase 2 research and the two personas produced three findings the Phase 1 structure did not account
for:

- **Theme 1, Manual Interpretation Burden.** Persona 1 (Ayesha) needs one number interpreted for her.
  Attendance, marks and transcript are not three questions to her, they are one question: how am I
  doing.
- **Theme 2, Fragmented Scattered Information.** Persona 2 (Hamza) moves between timetable,
  registration and fees to make a single decision. Phase 1 treated those as unrelated destinations.
- Flex itself disagreed across the screens we had kept separate: four course tabs on Attendance and
  six on Marks for the same semester (Figures 2 and 8 of the proposal).

A card sort of the twelve content items (C1 to C12) produced five groups, not nine modules.

## Options considered

| Option | For | Against |
| :--- | :--- | :--- |
| Keep the Phase 1 structure unchanged | Traceability stays intact with no bookkeeping | Ignores the research. The activity explicitly asks for the navigation map to be refined rather than copied, and a structure that survives research untouched suggests the research was decorative |
| Rebuild the IA from the card sort and renumber the screens | Cleanest structure | Breaks every screen reference in the proposal's traceability matrix, which is a submitted and marked document |
| **Regroup into five sections, keep the Phase 1 screen numbers as stable IDs** | Structure follows the research; traceability is preserved because the numbers never move | Requires this record so that nobody later wonders why the section count and the screen count disagree |

## Decision

Adopt the five-section hierarchy from Activity 4, and treat the Phase 1 screen numbers as **stable
identifiers that are never reassigned**.

```
Home (root)
├─ My Progress ──── Attendance · Marks · Transcript & Degree Progress
├─ Registration
├─ Fees ─────────── Payment Instructions
├─ Requests & Alerts ── Notification Settings
└─ Settings & Help ──── Profile & Privacy · Display & Language · Help & Glossary
```

Three specific changes from Phase 1:

1. **Attendance, Marks and Transcript are grouped under one parent, My Progress**, rather than being
   three independent modules. They answer one question the student actually asks.
2. **Fee Challan and Fee Details are merged into one Fees section.** Phase 1 already identified them
   as answering the same question twice with no statement of which was authoritative. Payment
   instructions become a child page that opens on request.
3. **The standalone Search screen (Phase 1 screen 22) is dropped**, folded into Home and Help &
   Glossary. It answered no validated need on its own.

## Consequences

- **Screen numbers do not change.** Attendance List stays screen 5 whatever section it now sits
  under. Every FR reference in the proposal's Table 8 remains correct.
- **Screen 22 (Search) is retired, not reused.** The number is not reassigned to anything else.
  `docs/screens/README.md` marks it retired with a pointer to this record.
- **FR-38 traced to "screens 1 to 22".** It now applies to screens 1 to 21. This is a documentation
  correction, not a change in the requirement: text scaling still applies to every screen that exists.
- **The Phase 1 navigation map made an argument about search deep-linking into detail screens.**
  Notifications still deep-link. Search does so from Home instead of from a screen of its own, so the
  property the argument depended on survives.
- **NEW-01 from Activity 3** (surface short cross-links between related sections) gets no section of
  its own. It is satisfied inside Registration and Fees, which is where Persona 2's decision actually
  happens. It needs an FR number if the proposal is ever revised; **FR-39** is reserved for it.
- **No menu is longer than five items**, against a flat thirteen-item drawer in Flex.
- The two-tap target in NFR-09 still holds for every frequent task. The deepest path is three levels
  (Home to My Progress to Attendance), and the third level is only reached for the full raw record,
  which Design Principle 1 already puts behind the derived answer.

## Viva answer

The research showed students treat attendance, marks and transcript as one question, so we grouped
them under one parent instead of keeping three separate modules, and we merged the two fee screens we
had already criticised Flex for duplicating. We kept the Phase 1 screen numbers as fixed identifiers
so the requirements traceability in the proposal stays valid.
