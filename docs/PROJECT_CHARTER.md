# Project Charter

One page on what this project is, for anyone arriving at the repository without the proposal.

---

## Problem

Flex, the student portal at FAST-NUCES, is a read-only record viewer. It shows rows, it never
interprets them, and it never reaches the student when something changes.

A student needing to know whether the next lecture can be missed, what mark is still needed in a
final, whether a fee is about to fall due, or whether registration has opened, must do the arithmetic,
remember the calendar and poll the site by hand. The institution requires 80% attendance and charges
fees against a deadline, so getting it wrong carries an academic or financial cost. The portal holds
every number needed to warn the student in advance, and stays silent.

Thirteen screens of the live portal were captured and analysed in Phase 1. Findings included a
completely blank CLO/PLO screen, a Marks screen that renders a course title and nothing else, a
registration screen with a dead-end banner and no opening date, course status encoded in colour with
no legend anywhere, unmasked CNIC and family details on the landing page, three different date formats
across the product, and no notification of any kind.

## Solution

A responsive web portal that keeps every record Flex holds and adds the interpretation that is
missing, organised into nine modules across 22 screens. The organising principle is an inversion: the
derived answer leads, and the raw record stays one tap behind.

## Users

**Primary:** undergraduates at FAST-NUCES, in two groups. First and second years who do not yet know
the institutional vocabulary or the calendar. Third and fourth years managing electives, retakes and
degree completion, who have built personal spreadsheet workarounds.

**Cross-cutting:** students with low vision or colour vision deficiency, who cannot use the current
grade report at all.

**Secondary:** parents and fee payers, academic advisers, course instructors.
**Tertiary:** the university IT department, the registrar's office, accreditation bodies.

## Context of use

Short bursts, standing up, one-handed, under time pressure. A typical session is well under a minute,
in a corridor between classes or immediately after one ends, often outdoors in bright sunlight and in
noisy environments. Before use the student has just left a class or received a message from a
classmate; after use they act. Load, anxiety and consequence all peak on two days a semester:
registration day and the fee deadline, when the network is also most congested.

## Objectives

1. By end of Phase 4, an interactive high-fidelity prototype covering all 9 modules and all 22
   screens over seeded data, every screen within two taps of the dashboard.
2. By end of Phase 5, in moderated testing with at least 8 undergraduates, a first-time user locates
   attendance headroom for a named course within 3 taps and 30 seconds. Target: 7 of 8 succeed.
3. By end of Phase 5, participants correctly interpret every status code without help. Target: 90% of
   interpretation items correct, against a baseline measured on the existing Flex grade report.
4. By end of Phase 4, an automated WCAG 2.1 AA contrast audit passes on every screen with zero
   failures, and manual review confirms no status is conveyed by colour alone.

All numeric values are design targets set before testing, not measurements.

## Success criteria

The project succeeds if a student who has never seen ReFlex can answer the four recurring questions,
attendance headroom, marks published, fee due, registration open, faster and more correctly than on
the existing portal, and if the students the current grade report excludes can read ours.

## Constraints

One semester. Four members. No backend, no university API, no real authentication, no payment
processing, no write path to official records. Prototype over seeded data throughout.

## After the semester

A student project has no institutional maintenance path, and the group does not claim otherwise.
Three realistic outcomes, not mutually exclusive: publish the prototype and the research findings
openly, hand the findings to the university IT department as evidence for improving the existing
portal, or continue the work as a final year project.
