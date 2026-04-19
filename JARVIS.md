# Jarvis Scaffold Conventions

This file documents the contract Jarvis (the AI app builder) honors when generating code into this scaffold. It is written for **humans** — agents read [`manifest.json`](./manifest.json), which is the machine-readable source of truth.

If you're using this scaffold standalone (without Jarvis), most of this is informational. The only thing you can't do is "edit `manifest.json` and expect it to mean something" — that file only matters to Jarvis.

## TL;DR

- Build features in `src/pages/`, `src/components/` (your own subfolders), `src/features/`, `src/hooks/`.
- Use the primitives at `@/components/ui/*` (Button, Dialog, Tooltip, Skeleton). Don't reinvent.
- Use `@/` import alias for everything inside `src/`.
- Animation: `motion/react` (NOT `framer-motion`).
- Routing: `react-router` v7 (NOT `react-router-dom`).
- Tailwind v4 CSS-first — there is NO `tailwind.config.js`. Extend via `@theme` in `src/index.css`.
- Forms: `react-hook-form` + `zod`.
- Don't touch `package.json`, `vite.config.ts`, `tsconfig*.json`, `src/main.tsx`, `src/components/ui/**`, `src/lib/cn.ts`. They are locked.

## Editable vs locked paths

The full rules are in [`manifest.json`](./manifest.json) under `editable` and `locked`. When Jarvis applies AI-generated code, the backend **rejects writes to locked paths** before they ever reach this project's working tree. If an agent tries to edit `package.json` or `vite.config.ts`, the edit is silently dropped and surfaced as a warning in the workspace UI.

| Editable | Locked |
|---|---|
| `src/App.tsx` | `package.json`, `package-lock.json` |
| `src/pages/**` | `tsconfig*.json` |
| `src/components/**` (except `ui/`, `transitions/`) | `vite.config.ts`, `eslint.config.js` |
| `src/features/**` | `src/main.tsx` |
| `src/hooks/**` | `src/components/ui/**` |
| `src/lib/**` (except `cn.ts`) | `src/components/transitions/**` |
| `src/mock/**` | `src/lib/cn.ts` |
| `src/store/**`, `src/i18n/**` | `manifest.json`, `JARVIS.md`, `README.md` |
| `src/seo/**`, `src/content/**` | `.prettierrc.json`, `.prettierignore`, `.gitignore` |
| `src/index.css`, `index.html`, `public/**` (except `favicon.svg`) | |

## Mount points

When the AI builds an app, it composes against these known anchors:

- `src/App.tsx` — root component and routes container. The AI may rewrite this freely.
- `src/index.css` — global styles. Editable, but `@theme` tokens at the top should be preserved (they define the design system).
- `index.html` — `<title>` is substituted at project creation (don't hand-edit it for the project name).
- `src/main.tsx` — locked. Already wires `<BrowserRouter>`, `<TooltipProvider>`, `<ToastContainer>`. Never regenerated.

## Slash agents (optional, used by Jarvis)

When invoked from the workspace, agents narrow what they're allowed to touch:

| Agent | Editable scope (in addition to manifest editable) |
|---|---|
| `/seo` | `index.html`, `src/seo/**`, `src/components/seo/**` |
| `/designer` | `src/components/**` (excluding `ui/`), `src/index.css` |
| `/copywriter` | `src/content/**`, `src/i18n/locales/**`, `src/components/**/*.tsx` (text-only diffs) |
| `/refactor` | full editable scope |
| `/debugger` | full editable scope |
| `/reviewer` | read-only — returns advisory text, never edits |

Scopes live in YAML frontmatter on each agent's `.md` definition in the backend (`jarvis-backend/src/agents/`).

## Motion vocabulary

This scaffold ships consistent motion tokens in `src/index.css` (under `@theme`). Use them rather than ad-hoc cubic-beziers and durations.

- Easing utilities: `ease-out-expo`, `ease-out-quart`, `ease-in-out-quart`
- Default transition is 200 ms / `ease-out-quart`
- Keyframe utilities for Radix `data-[state=...]` hooks: `animate-fade-in`, `animate-fade-out`, `animate-scale-in`, `animate-scale-out`, `animate-slide-up`, `animate-slide-down`

For route-level transitions use `<PageTransition>` from `@/components/transitions/PageTransition` — it wraps `motion`'s `AnimatePresence` keyed by pathname and respects `prefers-reduced-motion`.

## Substitutions at project creation

When Jarvis materializes this scaffold for a new project, it runs the `substitutions` block from `manifest.json`:

- `package.json` `name` → project slug (kebab-case of project name)
- `index.html` `<title>` → project display name

These run once at materialization. The AI never needs to do them.

## Adding a new locked or editable path

1. Edit `manifest.json` (`editable` or `locked` array).
2. Bump `manifest.json` `version` (semver).
3. Tag a release `react-vite-v<new-version>`. CI publishes the tarball + manifest to S3.
4. Existing projects stay on their pinned `templateVersion` — only new projects get the new manifest.

## Adding a primitive to `src/components/ui/`

1. Add the file under `src/components/ui/`.
2. Append it to `manifest.json` `primitives.ui[]`.
3. Document it in this file's "Primitives" section if user-facing.
4. Bump version + tag.
