# Repository Guidelines

## Project Structure & Module Organization
- Place all Pesalink Developer Portal source in `src/`; expose routes under `src/app/<path>` and co-locate shared UI in `src/components/`.
- Keep shared helpers in `src/lib/` and remote integrations in `src/services/`; mirroring this layout keeps import paths predictable.
- Store static assets such as logos or JSON schema files in `public/`, and longer-form contributor docs in `docs/`.

## Build, Test, and Development Commands
- `npm install` — install dependencies after cloning or pulling new modules.
- `npm run dev` — launch the Next.js dev server on `http://localhost:3000` with hot reload for the portal.
- `npm run build` — produce the optimized production bundle; run before tagging a release.
- `npm run lint` — execute ESLint + TypeScript checks; required before opening a pull request.
- `npm test` — run Jest suites once; use `npm run test:watch` during iterative development.

## Coding Style & Naming Conventions
- Write TypeScript in strict mode with 2-space indentation; avoid default exports except for Next.js route components.
- Name React components and hooks using PascalCase (`TransferSummary.tsx`) and functions/variables in camelCase.
- Organize styles with module-scoped CSS or Tailwind utility classes; do not check in global CSS overrides without review.
- Format all changes with Prettier by running `npm run lint -- --fix` or enabling the editor integration.

## Testing Guidelines
- Unit tests rely on Jest + `@testing-library/react`; name files `*.test.ts(x)` beside the unit they cover.
- Add Playwright journeys under `tests/e2e/` for signup, authentication, and high-risk payment flows; mark new scenarios with descriptive titles.
- Target ≥80% statement coverage for core payment logic (`src/services/payments`); document gaps in the pull request if temporarily lower.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) with concise summaries; scope optional (`feat(transfers): add limit check`).
- Each pull request must include: problem statement, solution notes, testing checklist (`npm run build`, `npm test`), and linked Linear/Jira issue.
- Request at least one reviewer familiar with the affected area; attach screenshots or GIFs for UI changes sized under 5 MB.

## Security & Configuration Notes
- Never commit credentials; place secrets in `.env.local` and document required keys in `docs/configuration.md`.
- Expose safe values with the `NEXT_PUBLIC_` prefix; everything else stays server-side.
- Rotate sandbox API keys every 90 days and note the rotation in the pull request description.
