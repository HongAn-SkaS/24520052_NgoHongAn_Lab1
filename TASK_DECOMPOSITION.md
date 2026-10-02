# TASK DECOMPOSITION — T-01

## Semantic DOM Landmarks & A11y Contract

### Requirements

* [ ] Zero `<div>` elements.
* [ ] Exactly one `<h1>`.
* [ ] No heading-level skipping.
* [ ] Exactly 4 landmarks:

  * [ ] `<header role="banner">`
  * [ ] `<nav role="navigation">`
  * [ ] `<main role="main" id="main-content">`
  * [ ] `<footer role="contentinfo">`
* [ ] Skip-link is the first focusable element.
* [ ] Skip-link targets `#main-content`.
* [ ] `<html lang="en">`.
* [ ] `<meta charset="UTF-8">`.

### Verification Gate — DevTools

* [ ] **Elements:** verify `lang="en"` and `meta charset="UTF-8"`.
* [ ] **Console:** `document.querySelectorAll('div').length` → `0`.
* [ ] **Console:** `document.querySelectorAll('h1').length` → `1`.
* [ ] **Console:** verify heading order: `h1 → h2 → h3...`, no skipped levels.
* [ ] **Console:** verify each landmark selector returns exactly `1`.
* [ ] **Console:** `document.querySelectorAll('a[href="#main-content"]').length` → at least `1`.
* [ ] **Console:** `document.querySelectorAll('#main-content').length` → `1`.
* [ ] **Keyboard:** reload → press `Tab` → skip-link receives first focus.
* [ ] **Keyboard:** press `Enter` → moves to main content.

### Commit

```text
feat(html): semantic landmark tree
```

### Out of Scope

* T-02A
* T-02B
* T-02C
* T-03
* T-04
* T-05

### Definition of Done

All T-01 requirements and verification checks pass. Only T-01 changes are included in the commit.


## Milestone T-02: Enterprise Portfolio (CSS + JS)

### Sub-task T-02A: Design Tokens & Reset
**Commit:** `feat(css): tokens & reset`
**Files:** reset.css, theme.css
**Contract:**
- box-sizing: border-box on *, *::before, *::after
- margin/padding reset to 0
- :root declares ALL color tokens (--bg-primary, --text-primary, --accent, --card-bg, --border-color)
- No hardcoded hex in any rule except inside :root declarations
- Skip-link hidden by default, visible on :focus
- color-scheme: light dark on html

### Sub-task T-02B: Responsive Layout (Flexbox + Grid)
**Commit:** `feat(css): responsive grid`
**Files:** navbar.css, grid.css
**Contract:**
- Navbar: display flex, justify-content: space-between, gap used (not margin)
- Project grid: repeat(auto-fit, minmax(280px, 1fr))
- Works at 375px with zero horizontal scroll
- No media queries needed for the grid (autonomous responsiveness)

### Sub-task T-02C: Dark Mode Engine
**Commit:** `feat(js): dark mode engine`
**Files:** theme-toggle.js
**Contract:**
- Button with id="theme-btn" and aria-pressed
- Reads localStorage key exactly 'theme' on load
- Toggles body class 'dark-theme'
- Persists to localStorage 'theme' = 'dark' | 'light'
- Zero console errors
- Full keyboard accessible (Tab focus, Enter activate)

## Milestone T-03: Resilient Project Component (4 States)

### State Machine (contract)
IDLE → LOADING → { SUCCESS | EMPTY | ERROR }
ERROR → (retry) → LOADING
EMPTY → (retry) → LOADING
Invariant: only ONE state active at a time; aria-busy mirrored.

### Sub-task T-03A: Loading Skeleton
**Commit:** `feat(ss): skeleton`
**Files:** skeleton.css, index.html (replace hardcoded articles)
**Contract:**
- Pure CSS shimmer (no JS, no images).
- Uses only CSS variables for colors (zero hardcoded hex outside :root).
- 3 placeholder items, each with aria-hidden="true".
- Respects @media (prefers-reduced-motion: reduce) → no animation.
- Container has aria-busy="true", role="status" element announces "Loading projects…".

### Sub-task T-03B: Live Data State
**Commit:** `feat(js): live project render`
**Files:** data/projects.json, projects-engine.js
**Contract:**
- Fetch API with async/await, relative path './data/projects.json'.
- try/catch wraps fetch; non-OK response throws.
- Renders <li><article> per project using textContent (NOT innerHTML).
- Renders metadata badges (tags) with Flexbox gap.
- On success: aria-busy="false", status announces count.
- Zero console errors in SUCCESS path.

### Sub-task T-03C: Empty & Error States
**Commit:** `feat(js): empty & error states`
**Files:** states.css, projects-engine.js (extend)
**Contract:**
- EMPTY: shows friendly message + retry button (button#retry-btn).
- ERROR: shows error message + same retry button.
- Retry button: <button type="button">, keyboard-focusable, min tap 44×44px.
- Click retry → transitions back to LOADING and re-fetches.
- Empty JSON array `[]` MUST trigger EMPTY, not SUCCESS.
- Network failure (fetch reject) MUST trigger ERROR.
- aria-live region announces state change to screen reader.