# jarvis-scaffold

The default scaffold every [Jarvis AI](https://github.com/itsAyyazdev) generated app starts from. Open-source so you can see exactly what your generated app looks like before you build it, audit the dependency tree, or use it standalone.

## Stack

- **React 19** + **Vite 7** + **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config (no `tailwind.config.js`)
- **State:** Redux Toolkit (no Zustand / Context)
- **Routing:** `react-router` v7
- **Animation:** `motion` (the new `framer-motion`)
- **Forms:** `react-hook-form` + `zod`
- **Headless UI primitives:** Radix (Dialog, Tooltip, Dropdown Menu, Popover, Tabs, Accordion, Switch, Select, Checkbox, Label, Slot)
- **Icons:** `lucide-react`
- **Toasts:** `react-toastify`
- **Typography:** Inter (via `rsms.me`, swap to `@fontsource-variable/inter` for self-hosting)

## What's already wired

- `<BrowserRouter>`, `<TooltipProvider>`, `<ToastContainer>` mounted in `src/main.tsx`
- `@/` import alias resolving to `src/`
- Tailwind v4 motion design tokens in `src/index.css`:
  - Easing: `ease-out-expo`, `ease-out-quart`, `ease-in-out-quart`
  - Keyframes: `animate-fade-in`, `animate-scale-in`, `animate-slide-up` (and counterparts) — designed to hook into Radix `data-[state=...]` attributes
- UI primitives at `src/components/ui/`:
  - `Button` (cva variants + `asChild` via Radix Slot)
  - `Dialog` (animated overlay + content)
  - `Tooltip`
  - `Skeleton`
- `<PageTransition>` at `src/components/transitions/PageTransition.tsx` — wraps routes with `motion`'s `AnimatePresence` keyed by pathname; respects `prefers-reduced-motion`
- `cn(...)` helper at `src/lib/cn.ts` — `clsx` + `tailwind-merge`

## Standalone use

```bash
git clone https://github.com/itsTalhadev/jarvis-scaffold my-app
cd my-app
rm -rf .git && git init
npm install
npm run dev
```

Open http://localhost:5173 — you'll see a centered demo card with a Tooltip-wrapped button, an animated Dialog, and a Skeleton toggle.

## Use inside Jarvis

When Jarvis materializes this scaffold for a new project, it:

1. Pulls the tagged release tarball from S3 (`s3://jarvis-templates/react-vite/<version>/`).
2. Substitutes `package.json` `name` → your project slug, `index.html` `<title>` → your project name (per [`manifest.json`](./manifest.json) `substitutions`).
3. Seeds the project's working tree in the Jarvis backend.
4. Lets the AI fill in features inside the **editable** paths declared in [`manifest.json`](./manifest.json).
5. **Rejects** any AI-generated edit to a **locked** path (`package.json` deps, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/components/ui/**`, etc.).

This is what keeps Jarvis-generated apps consistent, auditable, and unbreakable — the AI can compose freely inside known boundaries but can't subvert the build pipeline.

## Project structure

```
.
├── manifest.json              # Editable vs locked paths, mount points, substitutions, vocabulary
├── JARVIS.md                  # Human-readable convention doc
├── index.html                 # Vite entry; <title> substituted at project creation
├── src/
│   ├── main.tsx               # LOCKED — wires providers
│   ├── App.tsx                # AI mount point — routes container
│   ├── index.css              # Tailwind v4 + Inter + design tokens
│   ├── lib/
│   │   └── cn.ts              # LOCKED — clsx + tailwind-merge helper
│   ├── components/
│   │   ├── ui/                # LOCKED — Button, Dialog, Tooltip, Skeleton
│   │   └── transitions/       # LOCKED — PageTransition
│   ├── pages/                 # AI builds here
│   ├── features/              # AI builds here
│   ├── hooks/                 # AI builds here
│   ├── mock/                  # AI puts mock data here
│   ├── store/                 # AI builds Redux slices here
│   ├── i18n/                  # AI puts i18next setup + locales here
│   ├── seo/                   # /seo agent edits here
│   └── content/               # /copywriter agent edits here
├── vite.config.ts             # LOCKED
├── tsconfig*.json             # LOCKED
└── eslint.config.js           # LOCKED
```

## Releasing a new version (Jarvis maintainers)

1. Land your changes on `main`.
2. Bump `manifest.json` `version` (semver).
3. Tag: `git tag react-vite-v<version> && git push origin react-vite-v<version>`.
4. The release workflow ([`.github/workflows/release.yml`](./.github/workflows/release.yml)) builds, lints, packs into a tarball, and uploads to S3 alongside `manifest.json`. It also updates `latest.json`.
5. Existing Jarvis projects stay on their pinned version. New projects pick up the new template once `latest.json` flips.

## License

MIT — see [`LICENSE`](./LICENSE) (TODO: add).

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run preview` — preview production build
