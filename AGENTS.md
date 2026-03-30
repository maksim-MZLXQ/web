# AGENTS.md

## Cursor Cloud specific instructions

This is a **static HTML/CSS/JS website** with zero build tools, no package manager, and no external dependencies. The codebase consists of `index.html`, `styles.css`, and `script.js`.

### Running the dev server

Serve the project root with any static file server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

### Lint / Test / Build

- **No build step** — files are served as-is.
- **No package manager or lockfile** — no `npm install` or equivalent needed.
- **No automated test suite** — manual browser testing is the primary verification method.
- **Lint**: There is no configured linter. You can optionally run `npx htmlhint index.html` or `npx stylelint styles.css` for ad-hoc checks, but these are not part of the project's standard workflow.

### Key functional areas to verify

1. **Testimonial carousel** — prev/next buttons and auto-rotate every 5 seconds.
2. **Demand form** — "新增产品" (add product) button, per-product price * quantity auto-calculation, grand total update.
3. **Admin mode toggle** — checkbox reveals status dropdowns on each product row.
4. **Form submission** — triggers a `window.alert` with the demand summary.
