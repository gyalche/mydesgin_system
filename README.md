# Sherpa Design System

The Sherpa Design System bridges design and engineering by centralising reusable UI components, visual guidelines, and tooling powered by Storybook.

## Installation

```sh
npm install @d-lighted/sherpa-design-system
```

## Storybook

```sh
npm run storybook:run
```

## Working Locally

Use npm link to test local changes in another project. See the [internal documentation](https://d-lighted.atlassian.net/wiki/spaces/Engineers/pages/2733047818/development+local+package) for more details.

1. Remove any installed npm version of the package.
   ```sh
   npm uninstall @d-lighted/sherpa-design-system
   ```
2. From the Sherpa Design System folder link the package.
   ```sh
   npm link
   ```
3. Inside the consumer project link to the local package.
   ```sh
   npm link @d-lighted/sherpa-design-system
   ```
4. After testing, unlink the package in the consumer project.
   ```sh
   npm unlink @d-lighted/sherpa-design-system
   ```
5. Back in the Sherpa Design System folder unlink the local package.
   ```sh
   npm unlink
   ```
6. Reinstall dependencies as needed.
   ```sh
   npm install
   ```
