# UI Library Blueprint

This repository is currently a single-package React design system built around `src/components`, Storybook, Rollup, and generated CSS variables. The recommended target is a staged migration to a monorepo UI platform with a publishable core package, a formal tokens package, and separate documentation and playground apps.

## Recommended Library Strategy

Use a hybrid model:

- `@hamro-design-system/ui`: packaged, versioned, production-grade React component library
- `@hamro-design-system/tokens`: source of truth for design tokens, theme contracts, and CSS variable themes
- `@hamro-design-system/icons`: icon exports and asset pipeline
- `@hamro-design-system/utils`: internal and public shared utilities
- `apps/docs`: product-style documentation and guidance
- `apps/playground`: validation app for Next.js integration, theme overrides, and real usage
- `blocks`: optional later addition for copyable application patterns built on top of `@hamro-design-system/ui`

This is a better fit than a pure shadcn-style copy-paste system because your stated goals require long-term package maintenance, versioning, reusability across multiple projects, and a stable theming contract. It is also better than a pure MUI-style monolith because product teams will eventually want higher-level page patterns and branded blocks without bloating the core package.

Recommended product model:

1. Treat `@hamro-design-system/ui` as the stable contract.
2. Keep advanced accessibility and stateful behaviors in the package, not in copied snippets.
3. Add copyable blocks only after the primitives, tokens, and docs are stable.
4. Keep business logic out of the shared library.

## Monorepo Structure

```text
.
├── apps
│   ├── docs
│   └── playground
├── docs
│   └── architecture
├── packages
│   ├── config-eslint
│   ├── config-typescript
│   ├── icons
│   ├── tokens
│   ├── ui
│   └── utils
├── src
│   └── current single-package library during migration
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

Migration rule: keep the current root package working while moving functionality package-by-package into `packages/*`. Do not move everything at once.

## Token Foundation

Model tokens in three layers:

1. Raw tokens
   - Palette, typography scale, spacing scale, radii, elevation, motion durations, easing, breakpoints
2. Semantic tokens
   - `color.bg.surface`
   - `color.fg.default`
   - `color.border.subtle`
   - `color.accent.primary.bg`
   - `color.accent.primary.fg`
   - `color.status.success.bg`
3. Component tokens
   - `button.primary.bg`
   - `button.primary.bg.hover`
   - `input.border.focus`
   - `dialog.overlay.bg`

Recommended domains:

- color
- typography
- space
- size
- radius
- shadow
- zIndex
- motion
- breakpoint
- opacity

Recommended naming rules:

- Use intent-oriented semantic names, not raw color names, in components.
- Keep raw palette names available only at token/theme authoring level.
- Separate scale tokens from semantic aliases.
- Reserve component tokens for exceptions and intentional customization points.

Token flow:

1. Token source lives in `packages/tokens/src`.
2. Theme contract exposes CSS variables for semantic tokens.
3. Light, dark, and brand themes assign values to the contract.
4. Components consume semantic variables by default.
5. Only opt into component tokens when semantics are not expressive enough.

## Theming Architecture

Use CSS variables as the public theming surface.

Recommended pattern:

- Define a single theme contract in `packages/tokens/src/themes/contract.css.ts`
- Generate base light theme and dark theme from the same contract
- Support brand themes by swapping theme classes or theme data attributes
- Keep component styles written against semantic variables, not direct hex values

Theme layers:

1. Global foundation
   - typography family
   - base spacing
   - radii
   - elevation
2. Semantic application
   - surfaces
   - content
   - borders
   - actions
   - focus
   - status
3. Brand overrides
   - accent color family
   - brand typography if needed
   - product-specific surfaces

Recommended runtime model:

- `ThemeProvider` sets a theme class on a root container
- Support `light`, `dark`, and named brand themes
- Support nested themes sparingly for docs and previews only
- Avoid theme objects passed deeply through React context for styling; context can still provide metadata, but CSS variables should drive rendering

## Component Architecture

Use four layers:

1. Primitives
   - Box
   - Text
   - Heading
   - Stack
   - Inline
   - VisuallyHidden
   - Portal
   - ScrollArea
2. Core components
   - Button
   - IconButton
   - Input
   - Textarea
   - Checkbox
   - RadioGroup
   - Select
   - Badge
   - Card
   - Tabs
   - Dialog
   - Tooltip
3. Composite components
   - FormField
   - DatePicker
   - SearchInput
   - Table
   - Notification
   - Toast
   - AppSwitcher
4. Pattern and block layer
   - Empty states
   - Filter bars
   - Settings panels
   - Auth panels
   - Dashboard cards

Rules:

- Primitives should be generic, low-opinion, and theme-aware.
- Core components define the reusable package contract.
- Composite components may orchestrate multiple cores but must remain domain-agnostic.
- Blocks should live outside the core package or in a separate `blocks` offering later.
- Never mix product workflows, API calls, or business rules into primitives or core components.

## Styling Strategy

Recommendation: `vanilla-extract` plus CSS variables.

Why this fits best:

- zero runtime styling cost
- type-safe tokens and themes
- first-class CSS variable theming
- library-friendly output
- avoids forcing consumers to configure Tailwind to use the package
- avoids styled-components runtime overhead and SSR coordination
- better long-term package ergonomics than CSS Modules alone

Tradeoff summary:

- Tailwind + CSS variables
  - excellent for apps and blocks
  - weaker as the primary public styling contract for a published component library
- CSS Modules
  - simple and stable
  - weaker token typing and variant composition ergonomics
- styled-components or emotion
  - flexible
  - runtime cost and theming complexity not worth it for this platform direction
- vanilla-extract
  - best balance of typed tokens, extracted CSS, theming, and package ergonomics

## API Design Principles

Standardize a small, consistent API vocabulary:

- `variant`: visual style choice
- `size`: component scale
- `tone`: semantic emphasis such as `neutral`, `brand`, `success`, `danger`
- `state`: internal styling state only when genuinely useful
- `asChild`: when polymorphism is required and safe
- `className`: always supported

Conventions:

- Prefer `variant` over multiple boolean props.
- Avoid component-specific prop names for concepts already used elsewhere.
- Prefer compositional slots over giant prop surfaces.
- Use controlled and uncontrolled APIs where the pattern is standard.
- Expose subcomponents for compound patterns when state sharing matters.
- Keep default behavior accessible and unsurprising.

Examples:

- `Button variant="solid" tone="brand" size="md"`
- `Dialog open={open} onOpenChange={setOpen}`
- `Tabs.Root defaultValue="details"`
- `Select value={value} onValueChange={setValue}`

## Accessibility Plan

Recommendation: use Radix primitives for complex interactive foundations and wrap them with your visual system.

Use Radix for:

- Dialog
- DropdownMenu
- Popover
- Select
- Tabs
- Tooltip
- Checkbox
- RadioGroup
- Switch
- ScrollArea

Accessibility requirements:

- keyboard support for every interactive control
- visible focus treatment with semantic focus tokens
- correct aria labels and relationships
- escape-key and focus-return handling for overlays
- disabled and loading states that remain understandable
- form components with clear error/help text relationships
- contrast checks against both light and dark themes

Do not hand-roll accessibility-heavy overlays unless you have a strong reason.

## Documentation and DX

Use both Storybook and a docs app, with clear separation of responsibilities.

Storybook:

- component development
- prop/variant inventory
- interaction tests
- accessibility checks
- visual review

Docs app:

- installation
- getting started
- theming guides
- migration guides
- usage recipes
- best practices
- dos and don’ts
- package-level reference

Recommended content model per component page:

1. Purpose
2. Import and installation
3. Anatomy
4. Variants and sizes
5. Accessibility notes
6. Usage examples
7. Dos and don’ts
8. Related components

## Build and Packaging

Recommended build strategy:

- `tsup` for `tokens`, `icons`, and `utils`
- `tsup` or `vite` library mode for `ui`, with extracted CSS preserved
- ESM-first output
- add CJS only if you have confirmed consumer demand
- ship `.d.ts` with package exports
- keep `react`, `react-dom`, and Radix packages as peer dependencies where appropriate

Package design rules:

- use `exports` maps from day one
- expose subpath imports intentionally
- mark packages with `sideEffects` accurately
- avoid deep private import paths
- publish CSS entrypoints intentionally

## Testing and Quality

Recommended stack:

- Vitest for unit tests
- React Testing Library for behavior
- `jest-axe` or `vitest-axe` for accessibility assertions
- Playwright for docs/playground smoke flows
- Storybook interaction tests for component scenarios
- Chromatic or Percy for visual regression when budget allows

Quality gates:

- lint
- typecheck
- unit and interaction tests
- a11y assertions on critical components
- visual regression on stable stories
- example app validation before release

## Versioning and Releases

Use Changesets and semantic versioning.

Release rules:

- patch for fixes and non-breaking refinements
- minor for additive component features and new components
- major for prop contract changes, removals, or theme contract breaks

Every breaking release should include:

- migration notes
- before and after examples
- codemod opportunities where practical
- deprecated path timeline

## Phased Roadmap

### Phase 1: Foundation

- establish workspace
- define package boundaries
- define theme contract
- set up docs and playground shells
- create lint, typecheck, test, and release infrastructure

### Phase 2: Core Components

- primitives
- Button
- IconButton
- Text input
- Textarea
- Badge
- Card
- Spinner
- Skeleton
- FormField

### Phase 3: Advanced Components

- Dialog
- Tooltip
- Select
- Tabs
- DropdownMenu
- Checkbox
- RadioGroup
- Switch

### Phase 4: Composite Components and Patterns

- table system
- toast and notification
- date picker
- search and filter patterns
- application shells and empty states

### Phase 5: Productization

- full docs
- migration guides
- theme cookbook
- release automation
- visual regression
- consumer adoption playbook

## Initial Component Priority

Build in this order:

1. ThemeProvider and token contract
2. Box, Text, Heading, Stack, Inline
3. Button
4. IconButton
5. Input
6. Textarea
7. Label and FormField
8. Badge
9. Card
10. Spinner and Skeleton
11. Tabs
12. Dialog
13. Select
14. Tooltip
15. Table

Reasoning:

- typography and layout primitives keep every later component consistent
- form controls and button APIs define the overall library ergonomics
- feedback and container components unblock real product usage quickly
- complex overlays and data-heavy components should come after the foundations are stable

## Risks to Avoid

- migrating all existing components before theme and API conventions are stable
- exposing raw palette tokens directly in component props
- allowing each component to invent its own size and variant vocabulary
- using runtime styling everywhere just because it is familiar
- putting business logic into shared components
- shipping advanced components before you have stable primitives
- documenting too late
- publishing too early before consumer-app validation

## Migration Guidance for This Repository

Recommended immediate sequence:

1. Keep the current root package stable.
2. Build the new package structure in parallel.
3. Move tokens first.
4. Build a new `Button`, `Input`, and `FormField` in `packages/ui`.
5. Validate them inside `apps/playground`.
6. Start docs in `apps/docs`.
7. Migrate existing atoms and molecules selectively, not mechanically.
