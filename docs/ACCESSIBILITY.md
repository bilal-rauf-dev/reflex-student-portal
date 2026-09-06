# Accessibility

ReFlex targets **WCAG 2.1 Level AA** on every screen. This is not an aspiration attached to the end of
the project. It is the reason a specific group of students can use the product at all.

The existing Flex grade report encodes course status in coloured cells with no legend anywhere on the
page. A student with a colour vision deficiency cannot read that screen. For them ReFlex is not a
convenience improvement, it is access to information the interface currently withholds.

---

## Targets

| ID | Target | How it is verified |
| :--- | :--- | :--- |
| **A1** | Contrast of 4.5:1 for normal text, 3:1 for large text and interface components | Automated audit on all 22 screens, zero failures |
| **A2** | No information conveyed by colour alone (SC 1.4.1) | Manual review of every status indicator, zero colour-only indicators |
| **A3** | Text scalable to 200% without loss of content or function | Browser zoom to 200% on every screen |
| **A4** | No horizontal scrolling from 320px to 1920px | Checked at 320, 768 and 1920 |
| **A5** | Every data table programmatically labelled | `caption` plus `th` with `scope` on every table |
| **A6** | Full keyboard operability with a visible focus indicator | Keyboard-only walkthrough of every flow |
| **A7** | Full Urdu locale for all interface text | Every string present in `ur.json` |

---

## The colour rule, stated precisely

Colour may **reinforce** a state. It may never **encode** one.

| ❌ Wrong | ✅ Right |
| :--- | :--- |
| A blue cell containing `I` | A chip reading `In progress`, tinted blue |
| Red text for an overdue challan | `Overdue` label with an icon, in red |
| A green attendance bar | `Safe · 4 classes of headroom`, bar tinted green |
| A legend on a separate help page | A legend on the same screen as the codes |

If the screen were printed in greyscale, every state must still be readable. That is the test.

---

## Palette

Brand colours, with their accessible pairings. Contrast values are against white unless stated.

| Token | Hex | Contrast | Use |
| :--- | :--- | :---: | :--- |
| `--navy-900` | `#0F1E3D` | 14.8:1 | Body text, headings, primary surfaces |
| `--blue-600` | `#1565E0` | 5.1:1 | Primary actions, links, active navigation |
| `--cyan-500` | `#12A5D9` | 2.9:1 | **Decorative only.** Fails on white for text. Use on navy. |
| `--teal-500` | `#17B98A` | 2.3:1 | **Decorative only.** For a safe-state label use `--teal-700`. |
| `--teal-700` | `#0E7A5C` | 4.6:1 | Safe-state text and icons |
| `--amber-700` | `#9A5B00` | 4.7:1 | At-risk text and icons |
| `--red-700` | `#B3261E` | 5.9:1 | Below-threshold and overdue text |
| `--slate-500` | `#6B7A99` | 3.6:1 | **Large text and borders only.** Not for body copy. |

The two brand accents, cyan and teal, are the ones most likely to be misused. Neither is legible as
text on white. Use the darker paired token whenever the colour carries meaning rather than decoration.

---

## Per-screen audit

Run before each phase deadline. All 22 screens, all rows.

| Check | Pass condition |
| :--- | :--- |
| Contrast | Automated audit returns zero failures |
| Colour independence | Screen readable in greyscale |
| Keyboard | Every action reachable; focus order matches visual order; focus always visible |
| Zoom | 200% with no clipping and no loss of function |
| Reflow | No horizontal scroll at 320px |
| Tables | `caption` and scoped `th` present |
| Images | Meaningful images have alt text; decorative images have `alt=""` |
| Forms | Every input has a visible, associated label; errors named in text |
| Motion | No animation over 3 seconds; `prefers-reduced-motion` respected |
| Language | `lang` attribute correct; Urdu strings present and rendering right-to-left where required |

---

## Urdu locale

Urdu is a comprehension need for part of our user base, not a decoration.

- Every user-facing string ships in `en.json` and `ur.json` **in the same commit**. A pull request
  that adds an English string without its Urdu counterpart is incomplete.
- Numbers, dates and course codes stay in Latin script. Institutional codes such as `CS3001` are not
  transliterated.
- Layout must survive longer strings. Urdu renderings frequently run longer than the English; nothing
  may be fixed-width where text goes.
- Right-to-left rendering is handled with logical CSS properties (`margin-inline-start`, not
  `margin-left`).

---

## Tooling

```bash
npm run a11y          # automated audit across all screens
npm run a11y -- --screen=attendance-detail
```

Automated tools catch roughly a third of real accessibility problems. They will not tell you that a
status is encoded in colour, that a focus order makes no sense, or that an empty state says nothing
useful. The manual checks in the table above are the ones that matter, and a human runs them.
