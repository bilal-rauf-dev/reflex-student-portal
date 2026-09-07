# 0002 · Seeded data, no backend, no university API

**Status:** Accepted
**Date:** Phase 1, Week 3
**Decided by:** Whole group

## Context

ReFlex displays a student's real academic and financial records. The natural instinct is to integrate
with the university's existing system so the prototype shows real data. That instinct puts the entire
project behind a permission we do not control and cannot schedule.

## Options considered

| Option | For | Against |
| :--- | :--- | :--- |
| Integrate with the real Flex data | Genuinely real, most convincing demo | Requires written university permission with no timeline; would place real CNIC and fee data in a student project; a refusal or a delay blocks everything downstream |
| Build our own backend with a database | Full stack experience, real persistence | Not what an HCI course assesses; spends weeks on infrastructure that earns no marks and teaches nothing about the research question |
| **Seeded JSON, client only** | No external dependency, nothing can block us, no real personal data ever at risk, all effort goes into the interface | Not a production system; a reviewer must be told plainly that it is a prototype |

## Decision

The prototype runs entirely in the browser over seeded JSON data committed to the repository, modelled
on the shapes observed in the real portal. No backend, no university API, no real authentication, no
payment processing, no write path to any institutional system.

## Consequences

- **Easier:** the project cannot be blocked by an access request. Every hour goes into the interface,
  which is the thing being assessed. No real student data is ever at risk.
- **Harder:** the seeded data has to be realistic enough that a test participant reads it as real,
  which means modelling it carefully from the screenshots rather than inventing it casually.
- **Obligation:** the limitation is stated plainly in the README, the scope table and the security
  policy. Nothing claims to be more than it is.
- **Rule:** derived values are never seeded. Attendance headroom and required score are computed by
  pure functions, because seeding them would hide a bug in the function that produces them.

## Viva answer

Integrating with real university data needs institutional permission we cannot schedule around and
would put real CNIC and fee records in a student project. Seeding the data removes the only hard
external dependency, so the prototype cannot be blocked, and every hour goes into the interface, which
is what the course assesses.
