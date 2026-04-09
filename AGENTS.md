# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the published library source. Main exports start at `src/index.js`.
- `src/components/Atoms`, `src/components/Molecules`, and `src/components/Organisms` hold UI components by complexity level.
- `src/shared/css/` contains global CSS, generated variables, fonts, and shared animation styles.
- `assets/` stores raw design assets such as tokens, SVGs, and icon inputs.
- `stories/` contains Storybook stories and MDX docs for component review.
- `tests/` contains Jest-based component tests; keep test paths aligned with component paths when adding coverage.
- `apps/docs/` is the Next.js docs app for the product-style documentation site.
- `packages/` contains the newer workspace scaffold for tokens, UI, icons, utils, and shared config.

## Build, Test, and Development Commands

- `npm run dev` starts the docs app through the workspace filter.
- `npm run storybook:run` runs Storybook locally on port `6006`.
- `npm run build:prod` builds the current published package into `dist/`.
- `npm run build:docs` builds the docs app.
- `npm run test` runs the Jest suite.
- `npm run lint` runs ESLint on `src/` and `stories/`.
- `npm run pack:check` builds the package and previews the npm tarball.

## Coding Style & Naming Conventions

- Use 2-space indentation and keep existing semicolon usage.
- Follow the current component naming pattern: `Atoms/Button`, `Molecules/FormField`, etc.
- Prefer PascalCase for component files, camelCase for utilities/hooks, and kebab-free export names.
- Match existing React conventions in this repo: functional components, explicit props, and colocated styles where already established.
- Linting is handled by ESLint; do not introduce a new formatter without agreement.

## Testing Guidelines

- Use Jest and Testing Library for behavior-focused component tests.
- Name tests `ComponentName.test.js` and place them under matching folders in `tests/components/...`.
- Cover variants, disabled/invalid states, interaction behavior, and basic accessibility-sensitive paths.
- Run `npm run test` before opening a PR. For local disk-space issues, use a repo-local Jest cache/temp dir.

## Commit & Pull Request Guidelines

- Recent history uses short imperative messages such as `publish to npm`, `refactor cache`, and `change config file`.
- Keep commit subjects concise, lowercase, and action-oriented.
- PRs should include: purpose, major UI/API changes, affected paths, test results, and screenshots for docs or visual changes.
- Link the relevant issue or task when available, and call out breaking changes explicitly.

## Configuration Notes

- Publish targets npmjs, not GitHub Packages.
- If adding workspace features, keep the root package working until migration is complete.

## Figma Design System Rules

- IMPORTANT: When implementing from Figma, prefer existing components in `src/components/Atoms` and `src/components/Molecules` before creating new ones.
- New production library components should follow the long-term package direction in `packages/ui`, but do not break the current root package while migrating.
- Layout primitives should map to the existing `src/components/Atoms/Layout` patterns unless the new workspace package is the explicit target.
- Styling in the current package must follow the existing CSS and styled-component conventions already used in `src/`; do not introduce Tailwind into the published library source.
- IMPORTANT: Never hardcode colors, spacing, or typography if an equivalent token already exists. Use `src/shared/css/variables.css` and `src/shared/css/styleVariables.css` in the current package, or the semantic token contract in `packages/tokens` for new workspace code.
- Global library styling enters through `src/index.js`, which imports `fonts.css`, `globalStyle.css`, `variables.css`, and `styleVariables.css`. Preserve that contract unless you are intentionally changing package architecture.

### Required Figma Flow

1. Get Figma design context for the exact node.
2. Get a screenshot for visual verification.
3. Reuse an existing component or extend it before creating a new one.
4. Translate Figma output into this repo’s conventions, tokens, and accessibility patterns.
5. Validate the final result against the screenshot and the closest Storybook/docs examples.

### Asset and Accessibility Rules

- IMPORTANT: Do not add a new icon package for Figma work. Use existing SVG/icon assets or assets returned from Figma.
- Place downloaded static assets under the repository’s existing asset structure, not ad hoc folders.
- All interactive Figma-derived components must preserve keyboard access, visible focus, and disabled/loading clarity.
- Add or update Jest tests for meaningful interaction changes and update docs or stories when the public component API changes.

# AGENTS.md

## Purpose
This repository contains a reusable React/Next.js design system and UI library platform. The goal is to build a premium, maintainable, developer-friendly system similar in quality to top-tier UI libraries, while keeping the visual language original to this project.

## Primary goals
- Maintain a scalable design system architecture
- Keep APIs clean, consistent, and predictable
- Preserve accessibility and responsiveness
- Improve documentation quality and developer experience
- Avoid one-off patterns that do not fit the system

## Project priorities
When making changes, optimize for:
1. consistency
2. maintainability
3. accessibility
4. developer experience
5. visual polish

## Tech assumptions
- React
- Next.js
- TypeScript
- component-driven architecture
- design tokens and theming
- docs-first workflow

## Working rules
- Do not introduce unnecessary dependencies
- Do not create duplicate component patterns if an existing shared pattern can be extended
- Prefer reusable primitives over page-specific hacks
- Keep prop APIs consistent across components
- Keep components composable
- Preserve backward compatibility unless a change is clearly worth the break
- If a breaking change is needed, call it out clearly

## Component conventions
When creating or updating components:
- Prefer consistent prop names like `variant`, `size`, `tone`, `disabled`, `loading`
- Support `className` where appropriate
- Prefer controlled/uncontrolled patterns that are familiar to React developers
- Keep styling aligned with tokens/theme system
- Ensure states are covered: default, hover, active, focus, disabled, loading, error if relevant

## Accessibility expectations
- Keyboard accessible by default
- Visible focus states
- Correct semantic HTML where possible
- Proper ARIA usage where needed
- Do not rely on color alone to communicate meaning

## Design system rules
- Reuse tokens for color, spacing, typography, radius, and elevation
- Do not hardcode random values when a token or scale exists
- Keep visual language original to this project
- Use inspiration from mature libraries, but do not copy their branding or exact visual identity

## Docs expectations
When documenting components, include:
- purpose
- usage guidance
- variants
- sizes
- states
- accessibility notes
- example code
- API table if relevant

## Before large changes
Before major refactors or new features:
- inspect existing patterns first
- explain the proposed approach briefly
- prefer incremental changes over broad rewrites unless a rewrite is clearly justified

## Testing expectations
For meaningful UI changes:
- verify TypeScript types
- check for obvious accessibility issues
- ensure examples/docs still make sense
- avoid shipping unverified component APIs

## Output style
When implementing:
- keep code clean and production-ready
- avoid overengineering
- keep naming simple and consistent
- explain important tradeoffs briefly
