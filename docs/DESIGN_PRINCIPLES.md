# Design Principles

These are the rules ReFlex is designed against. They are not preferences. Each one exists because the
existing Flex portal breaks it in a way we documented with a screenshot in the Phase 1 proposal, and
each traces to a published principle rather than to taste.

Every pull request that touches the interface is reviewed against the checklist at the end of this file.

---

## 1. Answer first, record second

**The rule.** Every screen opens with the derived figure, stated in one line, in plain language. The
underlying table is reachable in one action. It is never the landing content.

**Why.** Flex holds every lecture a student has attended and still cannot answer "how many more can I
miss". The student opens the screen with a question and leaves with a table. That is a failure of
flexibility and efficiency of use (Nielsen H7): the system makes the user do work it could do itself.

**What this looks like.** "You can miss 3 more classes in CS3001 before dropping below 80%" above the
log, not beneath it. "Rs 194,500 due in 4 days" above the challan row. "You need 84% in the final for
an A" above the assessment breakdown.

**What breaks it.** A screen whose first paragraph of content is a table, a percentage with no
interpretation, or a number the reader has to compare against a threshold they must remember.

---

## 2. No screen stays silent

**The rule.** Every screen has a designed empty state, loading state, error state and offline state.
Each of them names what is missing and who supplies it.

**Why.** Flex has a CLO/PLO screen that renders an entirely blank content area, and a Marks screen
that renders a course title and nothing beneath it. In both cases a student cannot tell whether there
is no data, whether the feature is closed, or whether the page failed. This is Norman's gulf of
evaluation: the system's state is not recoverable from what it displays. It is also a failure of
visibility of system status (Nielsen H1).

**What this looks like.** Not "no data". Instead: "Quiz 2 marks have not been published yet. Marks are
published by the course instructor." A closed module states the date it opens and offers a
notification. An offline view is visibly marked as cached and carries its sync time.

**What breaks it.** A blank panel. A spinner with no timeout. An error message written in the
vocabulary of the system rather than the user. A disabled control with no explanation of why.

---

## 3. Never colour alone

**The rule.** Status is carried by a text label or an icon. Colour reinforces meaning, it never
encodes meaning on its own.

**Why.** The Flex grade report encodes course status in coloured cells containing single letters, with
no legend anywhere on the page. A student with a colour vision deficiency cannot read it, and neither
can a student who has never been told what the codes mean. This fails WCAG 2.1 success criterion 1.4.1
and forces recall rather than recognition (Nielsen H6).

**What this looks like.** A chip reading "In progress" rather than a blue square. A legend on the same
screen as the codes it explains, not in a separate help page. An attendance risk state that says "at
risk" in words.

**What breaks it.** Red and green as the only difference between two states. A colour key placed on a
different screen. Relying on a shade of a single hue to carry a distinction.

---

## 4. Estimates are labelled as estimates

**The rule.** Every derived figure states that it is an estimate, states the assumptions it used, and
links to the official record. Where an input is missing the system refuses to compute and says why.

**Why.** ReFlex projects grades and attendance. A projection carries an academic consequence, and a
confidently wrong number is worse than no number. The registrar's office owns the authoritative
record; nothing ReFlex derives may be presented as one.

**What this looks like.** "Estimate, based on the published weighting for this course. Official record."
A projection control that disables itself and explains the missing input rather than guessing at it.

**What breaks it.** A number with no provenance. A projection that silently assumes a weighting.
A derived figure styled identically to an official one.

---

## 5. Nothing is a dead end

**The rule.** Every state offers a next action. A closed window states when it opens. A failed action
states what to do about it.

**Why.** Flex shows a red banner reading "Registration not active yet" with no opening date, on a
system whose home screen displays that date. Course Feedback lists six courses as "Not Submitted"
under a notice that the module is closed, with nothing to do. Grade Change Request shows an empty
table under a note written in the past tense. Each is a failure of help and documentation (Nielsen
H10) and of error recovery (H9).

**What this looks like.** "Registration opens 14 August. Notify me." "This window closed on 30 August.
Here is what you can do instead." A validation error that keeps everything the user already typed.

**What breaks it.** A banner with no date and no action. A disabled screen with no explanation.
An error that discards user input.

---

## Supporting commitments

These follow from the five rules and are non-negotiable in review.

- **Privacy by default.** CNIC, date of birth and mobile number are masked until an explicit reveal.
  The current portal prints them unmasked on its landing page, along with a home address and a family
  member's details. Removing that is an objective, not an incidental improvement.
- **Plain language over institutional vocabulary.** MCA, CLO, PLO, Cr. Att, Cr. Ernd, ARN and Challan
  are defined at their point of use, not in a manual. The glossary is one tap from every screen.
- **Course names before course codes.** A student should not have to recall six arbitrary codes to
  navigate. Codes are secondary identifiers.
- **One date format everywhere.** `DD MMM YYYY`. The existing portal uses three.
- **Reversible by default.** Every submission is confirmed before dispatch and stays withdrawable
  until a decision is recorded.

---

## Interaction style

ReFlex is predominantly **direct manipulation**, with brief form fill confined to requests and
settings. The object of interest, a course, a challan, a request, is visible on screen and the action
is performed on the object itself.

Conversational and voice paradigms were considered and rejected. A conversational reply introduces
uncertainty into an answer with academic consequence, is slower than a glance when the answer is
already on the dashboard, and requires one-handed text entry in a corridor. A voice interface fails on
the context of use alone: the environments are noisy and public, and the data includes fees and
grades. Both remain plausible additions to a mature product; neither suits the primary context.

---

## Review checklist

Every interface pull request must satisfy all of these before merge.

- [ ] The screen opens with the derived answer, not the raw record
- [ ] Empty, loading, error and offline states are all implemented and all name what is missing
- [ ] No status is conveyed by colour alone; every indicator has a text label or icon
- [ ] Any legend appears on the same screen as the codes it explains
- [ ] Every derived figure is labelled as an estimate and links to the official record
- [ ] Every closed or disabled state offers a next action
- [ ] Personal identifiers are masked on first render
- [ ] Institutional terms are defined in context or linked to the glossary
- [ ] Dates use `DD MMM YYYY`
- [ ] Contrast meets 4.5:1 for normal text and 3:1 for large text and interface components
- [ ] The screen works at 320px wide with no horizontal scrolling
- [ ] Text scales to 200% without loss of content or function
- [ ] Urdu strings exist for all new interface text
- [ ] Data tables carry programmatic labels

---

## References

1. J. Nielsen, "Enhancing the explanatory power of usability heuristics," *Proc. CHI '94*, pp. 152-158.
2. D. A. Norman, *The Design of Everyday Things*, revised ed. Basic Books, 2013.
3. B. Shneiderman et al., *Designing the User Interface*, 6th ed. Pearson, 2016.
4. W3C, *Web Content Accessibility Guidelines (WCAG) 2.1*, W3C Recommendation, 2018.
