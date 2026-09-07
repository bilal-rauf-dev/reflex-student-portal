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

- [ ] 6 to 8 interviews completed and notes written up
- [ ] Survey circulated and responses aggregated
- [ ] Each of A1, A2, A3 marked supported, partly supported or contradicted, with the evidence
- [ ] Two personas written from the data, not from imagination
- [ ] Any charter assumption the research contradicted is corrected in the charter
