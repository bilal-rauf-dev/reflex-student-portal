# 0001 · Responsive web application, not a native app

**Status:** Accepted
**Date:** Phase 1, Week 3
**Decided by:** Whole group

## Context

Our users check attendance, marks and fees from a phone, between classes. The obvious reading is that
a phone-first product should be a native Android application. Analysis of the existing portal
complicated that: Flex is already responsive. Its sidebar collapses to a drawer and its cards stack in
one column on a phone. The problem was never that it does not fit the screen; the problem is what the
screens say.

## Options considered

| Option | For | Against |
| :--- | :--- | :--- |
| Native Android | Best offline story, real push notifications, feels native | Requires installation, excludes iOS and laptop use without a second build, larger build cost in a 16-week project, and none of it addresses the actual defect |
| Cross-platform native (Flutter / React Native) | One codebase, two platforms | New framework for the group to learn, still requires installation, still does not address the defect |
| **Responsive web** | Nothing to install, one codebase, serves phone and computer lab equally, matches the platform the incumbent already uses, group already knows the technology | Push notifications are weaker than native, offline needs a service worker |

## Decision

A responsive web application, served as a single site adapting from a 320px phone viewport up to a
desktop browser. No native build.

## Consequences

- **Easier:** one codebase, no app store, no install friction, works on a shared or borrowed device
  and in the computer lab without a second implementation.
- **Harder:** offline requires deliberate service worker work rather than coming free, and web push is
  less reliable than native push. The design compensates by making in-product alerts a full fallback,
  so a student who declines notification permission still sees every alert on the dashboard.
- **Ruled out:** any feature that depends on native device capability.

## Viva answer

Flex is already responsive, so the failure is not the viewport, it is that the screens never interpret
the data. A native app would have carried an installation cost and excluded the computer lab without
fixing the actual problem, so we kept the platform and changed what the screens say.
