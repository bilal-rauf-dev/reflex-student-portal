# Phase 2 · User Research

**Weeks 3 to 5. Deliverable: research findings and personas.**

Phase 1 established what is wrong with the existing portal. Phase 2 establishes what is true about the
people who use it. These are different questions, and the second one is not answerable from
screenshots.

## What we are testing

Three assumptions were recorded in the proposal. They are assumptions, not findings, and nothing in
Phase 3 gets designed until they have been tested.

| # | Assumption | How we test it | What would disprove it |
| :---: | :--- | :--- | :--- |
| **A1** | Students already track attendance manually outside Flex, and share deadline reminders among themselves rather than receiving them from the portal. | Ask every participant to open whatever they use. Count how many have one, record what it contains, record how often it has been wrong. | Most participants have no workaround and do not want one. |
| **A2** | The moment of highest anxiety is approaching the attendance threshold, not receiving a grade. | Card-rank the events that cause them to open the portal. | Grades rank consistently above attendance. |
| **A3** | Notifications would be welcomed rather than resented, and the welcome depends on the student choosing the categories. | Ask which categories they would enable, and at what frequency alerts start to feel like pressure. | Participants say they would disable everything, or that alerts would increase anxiety. |

**A1 matters most.** If students really do keep spreadsheets, that behaviour is observable evidence of
unmet need and it carries the problem statement. If they do not, the argument weakens and we need to
know that in Week 4, not in Week 14.

## Method

| | |
| :--- | :--- |
| **Interviews** | 6 to 8 semi-structured, 20 to 30 minutes each. Mix of years so both user groups from the charter are represented. |
| **Survey** | Short, 10 to 12 questions, circulated more widely for numbers behind the interview themes. |
| **Recruitment** | Classmates and juniors across sections. Do not recruit only from BCS-5B; first-years are half the user model. |
| **Recording** | Written notes by default. Audio only with explicit consent, deleted after transcription. |

## Rules

- Consent before anything else. Use `consent-form.md`, keep it short, get it in writing.
- Anonymise at the point of collection. No roll numbers, no names beside answers. Use P1, P2, P3.
- **Raw responses never enter this repository.** Only aggregated, anonymised findings. `.gitignore`
  already excludes `research/raw/` and `research/consent/`.
- Do not lead. "How do you check attendance?" not "Wouldn't it be useful if the portal told you?"
- Do not demo ReFlex. Phase 2 is about their current behaviour, not our idea. Showing the concept
  contaminates every answer that follows.

## Files

| File | Purpose |
| :--- | :--- |
| `interview-guide.md` | Question script and probes |
| `survey.md` | Survey question set |
| `consent-form.md` | Plain-language consent, to be signed before a session |
| `findings-template.md` | Where the aggregated result goes |
| `personas/` | Two personas built from the findings, one per user group |

## Done when

- [x] Interviews completed and notes written up (3, P1 to P3, the course minimum; fewer than the 6 to 8 planned)
- [x] Survey circulated and responses aggregated (28 responses)
- [ ] Each of A1, A2, A3 marked supported, partly supported or contradicted, with the evidence
- [x] Two personas written from the data, plus an anti-persona: see [`personas/`](personas/README.md)
- [ ] Any charter assumption the research contradicted is corrected in the charter

## What the research found

From the Phase 2 submission (N = 28 survey responses, 3 interviews).

| Finding | Design response |
| :--- | :--- |
| 23 of 28 struggle to calculate overall course standing; 19 of 28 had a manual calculation that was wrong or uncertain | Weighted running total and a target calculator on the marks screen |
| Attendance is tracked by mental arithmetic (13 of 28) or by guessing from the bar (11 of 28); 4 of 28 use notes or spreadsheets | "Classes you can still miss" counter, raw log one tap behind |
| 18 of 28 found out about a key event later than they wanted; 19 of 28 first hear through classmates or WhatsApp | Opt-in alerts by category |
| 13 of 28 struggle moving between sections; 15 of 28 understand only some grade codes | Registration, timetable, prerequisites and fee status in one planner; labelled status chips and a glossary |
| 21 of 28 said plain language, an Urdu/English choice and direct attendance headroom would help | Plain-language copy, glossary, optional Urdu |
| 16 of 28 use a smartphone as their main device | Mobile-first single-column layout, cached records with a sync time |

**A1** (students track attendance outside Flex) is partly supported: most track it, but in their
heads rather than in notes or spreadsheets. A2 and A3 were not tested in the form planned above and
are still open.
