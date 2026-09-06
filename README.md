<div align="center">

<img src="docs/assets/logo.png" alt="ReFlex Student Portal" width="520" />

### A redesigned student portal for university academic management

**Flex shows you rows. ReFlex tells you what they mean.**

<br />

[![Course](https://img.shields.io/badge/Course-CS3014%20Applied%20HCI-0F1E3D?style=for-the-badge)](docs/PROJECT_CHARTER.md)
[![University](https://img.shields.io/badge/FAST--NUCES-Chiniot--Faisalabad-1565E0?style=for-the-badge)](https://www.nu.edu.pk/)
[![Team](https://img.shields.io/badge/Team-Z--BASH-12A5D9?style=for-the-badge)](CONTRIBUTING.md)
[![License](https://img.shields.io/badge/License-MIT-17B98A?style=for-the-badge)](LICENSE)

[![Phase](https://img.shields.io/badge/Phase-1%20of%205%20complete-1565E0?style=flat-square)](#-project-phases)
[![Platform](https://img.shields.io/badge/Platform-Responsive%20Web-12A5D9?style=flat-square)](#-tech-stack)
[![Accessibility](https://img.shields.io/badge/Target-WCAG%202.1%20AA-17B98A?style=flat-square)](docs/ACCESSIBILITY.md)
[![Data](https://img.shields.io/badge/Data-Seeded%20only-6B7A99?style=flat-square)](docs/DATA_AND_PRIVACY.md)
[![Locales](https://img.shields.io/badge/Locales-EN%20%7C%20UR-0F1E3D?style=flat-square)](docs/ACCESSIBILITY.md)

</div>

---

## 🎯 What this is

ReFlex is a **responsive web portal** that keeps every record the university's existing portal already holds and adds the interpretation that is missing.

The existing system, Flex, is a read-only record viewer. Every screen is a table and a semester selector. It performs no computation and issues no notification, so a student must do the arithmetic, remember the calendar and poll the site by hand. The consequences are academic and financial: an attendance threshold breached, a fee deadline missed.

ReFlex inverts that relationship. **The derived answer leads. The raw record stays one tap behind.**

<div align="center">

| Flex asks you to work it out | ReFlex tells you |
| :--- | :--- |
| A lecture-by-lecture attendance log and a percentage bar | *"You can miss 3 more classes in CS3001 before dropping below 80%"* |
| A list of published marks | *"You need 84% in the final to reach an A"* |
| One challan row beside forty lines of bank instructions | *"Rs 194,500 due in 4 days"* |
| A red banner reading "Registration not active yet" | *"Registration opens in 6 days. Build your draft schedule now."* |
| Course status encoded in colour with no legend | A labelled chip, with the legend on the same screen |

</div>

---

## 🖼️ Screens

<div align="center">
<img src="docs/assets/screens/01-login.png" alt="ReFlex sign-in screen" width="820" />
<br /><em>Sign in</em>
</div>

<br />

> **Adding more screens:** drop image files into `docs/assets/screens/` and link them here.
> Suggested naming keeps them ordered: `02-dashboard.png`, `03-attendance.png`, `04-marks.png`, and so on.
> Table layout below is ready to fill in.

<div align="center">

| Today dashboard | Attendance intelligence |
| :---: | :---: |
| <!-- <img src="docs/assets/screens/02-dashboard.png" width="400" /> --> *coming in Phase 4* | <!-- <img src="docs/assets/screens/03-attendance.png" width="400" /> --> *coming in Phase 4* |
| **Grade projection** | **Finance timeline** |
| <!-- <img src="docs/assets/screens/04-marks.png" width="400" /> --> *coming in Phase 4* | <!-- <img src="docs/assets/screens/05-finance.png" width="400" /> --> *coming in Phase 4* |

</div>

---

## 🧩 The nine modules

```mermaid
flowchart TD
    T["M1 · Today<br/>What needs attention now"]

    T --> A["M2 · Attendance<br/>Headroom and risk"]
    T --> M["M3 · Marks<br/>Running total and projection"]
    T --> P["M4 · Progress<br/>CGPA trend and degree audit"]
    T --> R["M5 · Registration<br/>Countdown, prerequisites, clashes"]
    T --> F["M6 · Finance<br/>One challan timeline"]
    T --> Q["M7 · Requests<br/>One inbox, explicit states"]
    T --> N["M8 · Notifications<br/>Opt-in, per category"]

    X["M9 · Accessibility, Language, Offline<br/>Runs across every module"]
    X -.-> T
    X -.-> A
    X -.-> M
    X -.-> P
    X -.-> R
    X -.-> F
    X -.-> Q
    X -.-> N

    classDef hub fill:#0F1E3D,stroke:#0F1E3D,color:#ffffff
    classDef mod fill:#E8F1FD,stroke:#1565E0,color:#0F1E3D
    classDef cross fill:#E4F7F1,stroke:#17B98A,color:#0F1E3D
    class T hub
    class A,M,P,R,F,Q,N mod
    class X cross
```

<div align="center">

| Module | What it does |
| :--- | :--- |
| **M1 · Today** | Replaces the profile dump. Next class, attendance risk, unpaid challan with days remaining, open registration window, marks published since the last visit. Identifiers masked by default. |
| **M2 · Attendance** | Leads with the headroom sentence. Per-course risk state, end-of-semester projection, lecture log one tap behind. |
| **M3 · Marks** | Weighted running total, explicit empty states naming who publishes what, and the score still needed for a target grade. |
| **M4 · Progress** | CGPA trend across semesters, credits earned against credits required, every status code a labelled chip beside a permanent legend. |
| **M5 · Registration** | Window dates and a countdown even while closed, prerequisite checking, clash detection, a draft schedule built before the window opens. |
| **M6 · Finance** | One chronological challan timeline. Payment instructions on request, not on every visit. |
| **M7 · Requests** | Feedback, retake, grade change and withdrawal in one inbox, each with an explicit state. |
| **M8 · Notifications** | Opt-in per category. This is what turns a viewer into a system. |
| **M9 · Cross-cutting** | WCAG 2.1 AA, no colour-only status, Urdu locale, offline reads labelled with their sync time. |

</div>

---

## 📐 Design principles

Five rules the project holds itself to. Every pull request is reviewed against them.

<div align="center">

| # | Principle | In practice |
| :---: | :--- | :--- |
| **1** | **Answer first, record second** | Every screen opens with the derived figure in one line. The underlying table is reachable, never the landing content. |
| **2** | **No screen stays silent** | Every screen has a designed empty, loading, error and offline state that names what is missing and who supplies it. |
| **3** | **Never colour alone** | Status carries a text label or an icon. Colour reinforces, it never encodes. |
| **4** | **Estimates are labelled** | Every derived figure says it is an estimate, states its assumptions, and links to the official record. |
| **5** | **Nothing is a dead end** | A closed window states when it opens. A failed action states what to do next. |

</div>

Full reasoning, with the Nielsen, Norman and WCAG references behind each rule, is in **[docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md)**.

---

## 🛠️ Tech stack

<div align="center">

![React](https://img.shields.io/badge/React-1565E0?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-0F1E3D?style=for-the-badge&logo=javascript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-12A5D9?style=for-the-badge&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-17B98A?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-6B7A99?style=for-the-badge&logo=figma&logoColor=white)

</div>

- **Phase 3** wireframes and the first clickable walkthrough are built in **Figma**.
- **Phase 4** implements the prototype as a responsive single-page application in **React**, over a seeded JSON data set.
- Offline reads use the browser cache and a service worker. Charts use a JavaScript charting library.
- **No backend.** No university API, no real authentication, no payment processing. See [Scope](#-scope).

---

## 🚀 Getting started

```bash
git clone https://github.com/<org-or-user>/reflex-student-portal.git
cd reflex-student-portal

npm install
npm run dev        # start the dev server
npm run build      # production build
npm run lint       # lint and format check
npm run a11y       # automated accessibility audit
```

> Phase 3 is design-only, so the `src/` tree is a placeholder until Phase 4 begins.
> Until then the living artefacts are the Figma file and the documents under `docs/`.

---

## 🔒 Scope

<div align="center">

| ✅ In scope | ❌ Out of scope |
| :--- | :--- |
| All nine modules as an interactive high-fidelity prototype | Live integration with the university's Flex database or any university API |
| Realistic seeded data modelled on the shapes observed in the real portal | Real authentication against university credentials |
| Light and dark themes, English and Urdu locales | Actual payment processing through KuickPay, JazzCash, EasyPaisa or any bank |
| WCAG 2.1 AA conformance on every screen | Faculty, staff, registrar and administrator portals |
| Offline reads labelled with their synchronisation time | Timetable generation and room allocation |
| Usability testing with real undergraduates in Phase 5 | Any write path back to official university records |

</div>

**Every record in this repository is invented.** No real student data is stored, transmitted or displayed. See **[docs/DATA_AND_PRIVACY.md](docs/DATA_AND_PRIVACY.md)**.

---

## 📅 Project phases

```mermaid
gantt
    title ReFlex delivery schedule (Fall 2026)
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Delivery
    P1 Proposal and problem definition  :done,   p1, 2026-08-24, 14d
    P2 User research and personas       :active, p2, 2026-09-07, 21d
    P3 IA, wireframes, lo-fi prototype  :        p3, 2026-09-28, 28d
    P4 High-fidelity prototype          :        p4, 2026-10-26, 21d
    P5 Usability testing and iteration  :        p5, 2026-11-16, 28d
```

<div align="center">

| Phase | Weeks | Deliverable | Status |
| :---: | :---: | :--- | :---: |
| **1** | 2 to 3 | Proposal and problem definition | ![](https://img.shields.io/badge/complete-17B98A?style=flat-square) |
| **2** | 3 to 5 | Research findings and personas | ![](https://img.shields.io/badge/in%20progress-1565E0?style=flat-square) |
| **3** | 6 to 9 | Information architecture and lo-fi prototype | ![](https://img.shields.io/badge/planned-6B7A99?style=flat-square) |
| **4** | 10 to 12 | High-fidelity prototype, frozen for testing | ![](https://img.shields.io/badge/planned-6B7A99?style=flat-square) |
| **5** | 13 to 16 | Usability test report and final submission | ![](https://img.shields.io/badge/planned-6B7A99?style=flat-square) |

</div>

---

## 📊 By the numbers

<div align="center">

| 9 | 22 | 38 | 11 | 8 |
| :---: | :---: | :---: | :---: | :---: |
| modules | screens | functional requirements | non-functional requirements | use cases |

</div>

---

## 👥 Team Z-BASH

<div align="center">

| Roll | Member | Area of responsibility |
| :--- | :--- | :--- |
| **24F-0508** | **Bilal Rauf** *(lead)* | Problem analysis and heuristic evaluation |
| **24F-0736** | **M. Hassaan** | Requirements and use case modelling |
| **24F-0531** | **M. Zain Tahir** | Information architecture and screen inventory |
| **24F-0740** | **M. Saad Ur Rehman** | Comparative analysis and accessibility |

</div>

Branching, review and ownership rules are in **[CONTRIBUTING.md](CONTRIBUTING.md)**.

---

## 📚 Documentation

<div align="center">

| Document | What it covers |
| :--- | :--- |
| [Design Principles](docs/DESIGN_PRINCIPLES.md) | The five rules, the HCI principles behind them, and the review checklist |
| [Architecture](docs/ARCHITECTURE.md) | Folder structure, data model, state, offline strategy |
| [Coding Standards](docs/CODING_STANDARDS.md) | Naming, components, commits, branches, pull requests |
| [Accessibility](docs/ACCESSIBILITY.md) | WCAG 2.1 AA targets and the per-screen audit checklist |
| [Data and Privacy](docs/DATA_AND_PRIVACY.md) | Seeded-data policy, redaction rule, research consent |
| [Project Charter](docs/PROJECT_CHARTER.md) | Problem, objectives, users, scope, success criteria |
| [Contributing](CONTRIBUTING.md) | How the four of us work on this |
| [Security](SECURITY.md) | Reporting a vulnerability, and what this prototype does not do |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Expected behaviour |

</div>

---

## 🌍 Why it matters

Access to the internet in Pakistan is overwhelmingly mobile: the PTA reports the country has passed 200 million telecom subscribers with roughly 150 million broadband connections and penetration above 60 per cent. The population affected is large: the Pakistan Economic Survey records 2,010,672 enrolments across 269 higher-education institutions in FY2024.

For those students the campus portal is the primary interface to their own academic record. When it withholds an answer it already holds, the cost lands on the student. ReFlex aligns with **SDG 4 (Quality Education)** on access to information the institution already possesses, and with **SDG 10 (Reduced Inequalities)** through the Urdu locale, low-end device support and the removal of colour-only encoding.

---

## 📄 License

Released under the [MIT License](LICENSE). The screenshots of the existing Flex portal reproduced in the Phase 1 proposal are used for academic criticism and comparison, are attributed to `flexstudent.nu.edu.pk`, and were redacted before reproduction. They are not covered by this licence.

---

<div align="center">

**Built for CS3014 Applied Human Computer Interaction · FAST-NUCES · Fall 2026**

<sub>ReFlex is an independent student project. It is not affiliated with, endorsed by, or connected to the operators of the Flex student portal.</sub>

</div>
