# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a static landing page for a Chinese-Russian import/export trading company (满洲里欣睿进出口贸易有限公司). The site is built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools, no package manager, no backend.

### Running the application

Serve the static files with any HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in Chrome.

### Key files

| File | Purpose |
|---|---|
| `index.html` | Main page markup and `<template>` for product rows |
| `styles.css` | All styles (CSS custom properties, responsive breakpoints) |
| `script.js` | Client-side logic: form handling, carousel, auto-calculation |

### Lint / test / build

- **No linter, test framework, or build step** is configured. The codebase has no `package.json` or other dependency manifests.
- To validate HTML/CSS/JS, open Chrome DevTools console and verify there are no errors on page load.

### Gotchas

- The hero section uses an external Vimeo video and Unsplash poster image. If network access is restricted, the hero background will appear blank — this is expected and does not affect functionality.
- Avatar images in the testimonials section load from `pravatar.cc` / `unsplash.com` — same caveat applies.
- Form submission triggers a `window.alert()` only; there is no backend persistence.
- The admin mode toggle (管理员模式) reveals status dropdowns on each product row but is hidden by default.
