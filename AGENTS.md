## Cursor Cloud specific instructions

This is a Vite vanilla JS web application. All standard dev commands are in `package.json` scripts.

### Quick reference

| Task     | Command          |
|----------|------------------|
| Dev      | `npm run dev`    |
| Build    | `npm run build`  |
| Lint     | `npm run lint`   |
| Test     | `npm run test`   |
| Preview  | `npm run preview`|

### Notes

- The dev server runs on port **5173** by default. Use `--host 0.0.0.0` to expose it outside localhost.
- Tests use **jsdom** environment (configured in `vitest.config.js`).
- ESLint uses flat config format (`eslint.config.js`).
