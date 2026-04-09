---
name: create-component
description: Create or upgrade a reusable design-system component with consistent API, accessibility, docs, and examples.
---

# Create Component Skill

Use this skill when the task involves:
- building a new reusable UI component
- refactoring an existing component into a design-system component
- adding variants, sizes, or states to a component
- improving docs/examples for a component

## Goal
Produce a component that fits the design system, not a one-off implementation.

## Required outcomes
A good result usually includes:
- reusable component implementation
- consistent prop API
- theme/token alignment
- accessibility support
- examples or docs updates
- minimal surprise for consumers

## Workflow

### 1. Inspect existing patterns first
Before creating anything:
- look for similar components in the repo
- check naming conventions
- check prop conventions
- check styling/theming patterns
- check how docs/examples are currently structured

Do not invent a new pattern if a compatible existing one already exists.

### 2. Define the component contract
Prefer common, predictable props where relevant:
- `variant`
- `size`
- `tone`
- `disabled`
- `loading`
- `className`

Questions to resolve:
- Is the component controlled, uncontrolled, or both?
- What are the default states?
- What variants are actually needed?
- What should be configurable vs fixed?

Avoid oversized prop surfaces.

### 3. Build for system consistency
The component should:
- use design tokens or theme variables
- match spacing/typography/radius/elevation conventions
- compose cleanly with other components
- avoid hardcoded magic values unless justified

### 4. Cover interaction states
Check these where relevant:
- default
- hover
- active
- focus-visible
- disabled
- loading
- error
- selected/open/checked if applicable

### 5. Accessibility
Ensure:
- semantic HTML is correct
- keyboard behavior works
- focus states are visible
- ARIA is used only where needed
- color is not the only status signal

### 6. Documentation
If docs exist for the component, include or update:
- overview
- usage example
- variants
- sizes
- state examples
- accessibility notes
- API summary/table if the docs pattern supports it

### 7. Keep changes scoped
Do not rewrite unrelated parts of the system.
Prefer the smallest clean change that moves the library forward.

## Quality bar
A finished component should feel:
- consistent
- reusable
- accessible
- documented
- production-ready
