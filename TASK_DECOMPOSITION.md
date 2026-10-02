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
