# 0005 · Launchpad Home and a four-item bottom bar

**Status:** Accepted
**Date:** Phase 3 (wireframes)
**Decided by:** Whole group

## Context

Phone-first students need quick access to the sections they check between lectures. The previous
Home put several updates first and grouped Attendance, Marks and Transcript behind a switcher.
The Phase 3 wireframes needed to give each section a large, direct touch target on Home while
keeping urgent information visible.

## Options considered

| Option | For | Against |
| :--- | :--- | :--- |
| Keep the updates feed and section navigation | Surfaces several recent updates on Home | Some sections take an extra tap through a section or switcher |
| **Use Launchpad Home with a four-item bottom bar** | Each section is one tap away on a large target with a live status line | Home has room to feature one urgent item in full |

## Decision

Home (Screen 4) becomes a tile Launchpad with one urgent **Needs attention** card above the tiles.
Each tile is a single large touch target with a live status line. The bottom bar contains **Home,
Search, Alerts and Profile**.

## Consequences

- Existing section names and screen numbers carry forward.
- Phase 4 must build the tile grid and the four-item bottom bar.
- The five-section information architecture from [ADR 0003](0003-ia-restructure-after-research.md)
  continues to group the destinations behind the tiles.

## Viva answer

We chose Launchpad Home so phone-first students can reach every section in one tap on a large
touch target. One urgent card keeps the most pressing item visible, and the four-item bottom bar
keeps Home, Search, Alerts and Profile within reach.
