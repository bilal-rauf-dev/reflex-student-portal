# Security Policy

## What this project is

ReFlex is a **client-only prototype** built for a university course. It has no backend, no database,
no server-side component and no external network calls. Every record it displays is seeded, invented
data committed to this repository. There is no real authentication, no session token, no payment
processing and no write path to any institutional system.

That means the attack surface is small, and most of what a security report would normally cover does
not exist here. It also means a reader should not mistake this for a production system.

## What it deliberately does not do

| Not implemented | Why |
| :--- | :--- |
| Real authentication | Login screens accept seeded accounts only. There is no credential store. |
| Server-side anything | The application runs entirely in the browser. |
| Payment processing | Payment is represented as a state in seeded data. No gateway is contacted. |
| Real student records | Every value is invented. See [docs/DATA_AND_PRIVACY.md](docs/DATA_AND_PRIVACY.md). |
| Analytics or telemetry | Nothing is collected and nothing leaves the device. |

## Supported versions

The version on `main` is the only supported one. This is a semester project with no long-term
maintenance commitment, which is stated plainly in the project charter.

## Reporting a vulnerability

If you find a security problem, please **do not open a public issue**.

Use GitHub's **Report a vulnerability** button under the Security tab of this repository, or contact
the group lead through the repository's contact details.

Please include what you found, how to reproduce it, and what you think the impact is. We will
acknowledge within a week during term time. Given the nature of the project, expect a fix or a
documented explanation of why something is out of scope, rather than a formal advisory process.

## Scope

**In scope:** cross-site scripting in the prototype, exposure of anything that should be masked,
a dependency vulnerability, real personal data accidentally committed to this repository, an
unredacted screenshot of the live portal.

**Out of scope:** the absence of a backend, the absence of real authentication, seeded credentials
in `src/data/`, anything affecting the live `flexstudent.nu.edu.pk` portal. **That portal is not ours.**
If you find a problem in the real Flex system, report it to the university's IT department, not here.

## A note on the existing portal

This project analyses the university's live student portal for academic criticism. We have documented
interface and privacy concerns in that system, including personal identifiers displayed unmasked. We
have not tested it for technical vulnerabilities, we have not attempted to access any account other
than a group member's own, and we do not publish anything that would help someone do so. All
reproduced screenshots are redacted.
