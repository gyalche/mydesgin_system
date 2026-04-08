# Hamro Design System

The Hamro Design System bridges design and engineering by centralising reusable UI components, visual guidelines, and tooling powered by Storybook.

## Installation

```sh
npm install hamro-design-system
```

If your app needs the packaged global styles, import them once at your application entrypoint:

```js
import 'hamro-design-system/styles.css';
```

## Storybook

```sh
npm run storybook:run
```

## Publish Readiness

Build and inspect the npm package locally before publishing:

```sh
npm run pack:check
```

Publish to npm:

```sh
npm publish
```

Requirements:

1. You must be logged into npm with an account that can publish the package scope.
2. For a public scoped package, npm will use `--access public` through `publishConfig`.
3. `prepublishOnly` will run the production build and test suite before publish.

## Working Locally

Use npm link to test local changes in another project. See the [internal documentation](https://d-lighted.atlassian.net/wiki/spaces/Engineers/pages/2733047818/development+local+package) for more details.

1. Remove any installed npm version of the package.
   ```sh
   npm uninstall hamro-design-system
   ```
2. From the Hamro Design System folder link the package.
   ```sh
   npm link
   ```
3. Inside the consumer project link to the local package.
   ```sh
   npm link hamro-design-system
   ```
4. After testing, unlink the package in the consumer project.
   ```sh
   npm unlink hamro-design-system
   ```
5. Back in the Hamro Design System folder unlink the local package.
   ```sh
   npm unlink
   ```
6. Reinstall dependencies as needed.
   ```sh
   npm install
   ```

## Package Entry Points

- JS import: `hamro-design-system`
- CSS entrypoint: `hamro-design-system/styles.css`
