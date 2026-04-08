# Deploy Docs

This repository now includes a deployable Next.js docs app in `apps/docs`.

## Local Development

After installing the workspace dependencies:

```sh
pnpm install
pnpm --filter @hamro-design-system/docs dev
```

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Set the project root to `apps/docs`.
4. Use the default Next.js framework detection.
5. Configure preview deployments for pull requests.
6. Add a production domain when the docs structure is stable.

## Recommended Public Surface

- `hamro-design-system` on npm
- docs site on Vercel
- Storybook deployed separately for engineering review and visual QA

## Next Practical Step

Install the docs dependencies and migrate content from the architecture blueprint into real docs routes:

- installation
- theming
- components
- migration guides
- changelog
