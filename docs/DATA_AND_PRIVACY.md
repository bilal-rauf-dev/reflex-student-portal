# Data and Privacy

ReFlex is a prototype. It stores no real student record, and it never will while it remains one.
This document states the rules that keep that true, and they are enforced in review.

---

## Rule 1: every record in this repository is invented

All data in `src/data/` is seeded. It is modelled on the **shapes** of the records the live portal
displays, which is why it reads as realistic to a test participant, but no value corresponds to a real
person.

Seeded identifiers use reserved-looking values that cannot collide with real ones:

- Roll numbers in the `00X-0000` range
- CNIC-shaped strings that are structurally valid but not issuable
- `@example.com` email addresses
- Invented names not belonging to any group member or classmate

**Never** seed the repository with a real roll number, a real CNIC, or a real person's contact
details, including your own.

---

## Rule 2: screenshots of the live portal are redacted before they are committed

The Phase 1 proposal reproduces annotated screenshots of the existing Flex portal for academic
criticism and comparison. Those screenshots were captured by a group member from that member's own
account.

Before any such image enters this repository or any document, these fields are blacked out:

- CNIC and any other government identifier
- Date of birth
- Mobile and home telephone numbers
- Permanent and current home address
- Any family member's name, and the family CNIC column
- Challan numbers and instrument numbers
- Email addresses

The family fields matter most. The live landing page discloses a relative's name and a CNIC column,
and that person is not a user of the system at all. They cannot consent to publication and they are
not a party to this project.

Every reproduced screenshot is attributed to `flexstudent.nu.edu.pk` in its caption and is used under
academic criticism and comparison, not redistributed as an asset.

---

## Rule 3: what the prototype does with personal data

| Data | Where it lives | How long |
| :--- | :--- | :--- |
| Seeded student records | Browser memory and cache | Cleared on logout |
| Preferences (locale, theme, text size, notification settings) | `localStorage` | Until cleared by the user |
| Cached academic data for offline reads | Service worker cache | Cleared on logout; manual clear in Settings |
| Anything else | Nowhere | No analytics, no telemetry, no third-party requests |

There is no server, so nothing leaves the device. There is no account system beyond seeded logins,
so there is nothing to breach.

**Masking is the default.** CNIC, date of birth and mobile number render masked and are revealed only
by an explicit user action. This is the direct answer to the current portal printing them unmasked on
its landing page, and it is a design objective rather than a side effect.

---

## Rule 4: research with human participants

Phase 2 interviews and Phase 5 usability sessions involve real students. Standard practice applies and
it is not optional:

- Participants receive a plain-language statement of what the study is for and what will be recorded,
  **before** they agree to take part.
- Participation is voluntary. Consent is recorded in writing.
- Responses are anonymised **at the point of collection**. No roll numbers and no names are stored
  alongside answers.
- A participant may withdraw at any point, including after the session, without giving a reason and
  without their data being used.
- Where screen recording is used it captures the prototype only, never the participant.
- Raw research data is not committed to this repository. Only aggregated, anonymised findings are.

---

## Rule 5: what would change if this ever became real

If ReFlex moved beyond a prototype, two dependencies would arise immediately and neither is within
the group's authority to satisfy:

1. **Institutional permission.** The records belong to the university. Any integration with real Flex
   data requires written approval.
2. **Data protection obligations.** A system handling real CNIC and fee data must store and transmit
   those fields securely and expose them only to the person they belong to.

Until both are satisfied, this stays a prototype over seeded data. That is stated in the proposal
scope and it is not negotiable by a pull request.

---

## Pre-commit checklist

Before you push anything containing data or an image:

- [ ] No real roll number, CNIC, phone number, address or email anywhere in the diff
- [ ] Any portal screenshot has every field in Rule 2 blacked out
- [ ] No raw research responses, consent forms or participant identifiers
- [ ] No `.env` file, credential, token or API key
- [ ] Seeded records use reserved-looking identifiers only
