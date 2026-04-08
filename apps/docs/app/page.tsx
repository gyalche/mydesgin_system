import Link from 'next/link';

const featureCards = [
  {
    title: 'Package first',
    body:
      'Ship a reusable npm package with stable APIs, predictable exports, and a real theming contract instead of loosely copied snippets.',
  },
  {
    title: 'Theme driven',
    body:
      'Base the system on semantic tokens and CSS variables so light mode, dark mode, and brand skins can evolve without rewriting components.',
  },
  {
    title: 'Composable',
    body:
      'Expose primitives, core components, and higher-order patterns separately so teams can compose fast without inheriting product-specific constraints.',
  },
];

const stackCards = [
  {
    title: 'Foundation',
    items: ['React + TypeScript', 'Rollup today, monorepo migration path ready', 'Next.js docs app for public-facing product docs'],
  },
  {
    title: 'System',
    items: ['Semantic token contract', 'Light, dark, and brand theme classes', 'Shared component API conventions'],
  },
  {
    title: 'Quality',
    items: ['Storybook for component review', 'Jest today, Vitest path for new packages', 'Consumer-app validation before release'],
  },
  {
    title: 'Distribution',
    items: ['npm package publishing', 'Vercel docs deployment', 'GitHub Actions release workflow'],
  },
];

const docCards = [
  {
    title: 'Get Started',
    items: ['Installation', 'CSS import', 'Local linking', 'First consumer setup'],
  },
  {
    title: 'Architecture',
    items: ['Hybrid package strategy', 'Monorepo package boundaries', 'Migration path from current repo'],
  },
  {
    title: 'Theming',
    items: ['Token layers', 'Semantic color model', 'Brand and dark theme support'],
  },
  {
    title: 'Components',
    items: ['API conventions', 'Accessibility expectations', 'Build order and scope control'],
  },
];

export default function HomePage() {
  return (
      <main id="top">
        <section className="page-section hero">
          <div className="hero__grid">
            <div>
              <div className="eyebrow">Library platform, not a component dump</div>
              <h1>Deploy Hamro like a real UI product.</h1>
              <p>
                Hamro Design System should feel installable, documented, themed, and
                dependable. The package goes to npm. The docs go to Vercel. Storybook
                supports engineering review, not the whole public experience.
              </p>
              <div className="hero__actions">
                <a className="button-link button-link--primary" href="#launch">See Deployment Path</a>
                <Link className="button-link" href="/getting-started">Open Documentation</Link>
              </div>
              <div className="hero__meta">
                <div className="stat">
                  <strong>1</strong>
                  npm package as the consumer contract
                </div>
                <div className="stat">
                  <strong>2</strong>
                  Public docs plus Storybook companion
                </div>
                <div className="stat">
                  <strong>3</strong>
                  Release workflow with stable API discipline
                </div>
              </div>
            </div>

            <aside className="hero__card">
              <strong>Install</strong>
              <div className="code-block">
                <code>{`npm install hamro-design-system\n\nimport 'hamro-design-system/styles.css';`}</code>
              </div>
              <p className="list-note" style={{ marginTop: 14 }}>
                Package publishing is the first deployment. Public docs make it usable at
                scale.
              </p>
            </aside>
          </div>
        </section>

        <section className="page-section" id="why">
          <div className="section-heading">
            <h2>What makes a library feel real</h2>
            <p>
              MUI and Mantine are not just component bundles. They ship a stable package
              contract, public docs, live examples, and enough operational discipline
              that teams trust them in production.
            </p>
          </div>
          <div className="feature-grid">
            {featureCards.map((card) => (
              <article className="feature-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="stack">
          <div className="section-heading">
            <h2>Recommended deployment stack</h2>
            <p>
              Use the current package as the publish target now, then let the new
              workspace evolve behind it. The docs app is the next concrete public asset.
            </p>
          </div>
          <div className="stack-grid">
            {stackCards.map((card) => (
              <article className="stack-card" key={card.title}>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="docs">
          <div className="section-heading">
            <h2>Docs should be the front door</h2>
            <p>
              Storybook is still valuable, but the docs site should lead with product
              positioning, setup guidance, architecture, and component guidance that real
              teams can navigate quickly.
            </p>
          </div>
          <div className="doc-grid">
            {docCards.map((card) => (
              <article className="panel doc-card" key={card.title}>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="hero__actions" style={{ marginTop: 22 }}>
            <Link className="button-link button-link--primary" href="/getting-started">
              Getting Started
            </Link>
            <Link className="button-link" href="/architecture">
              Architecture
            </Link>
            <Link className="button-link" href="/theming">
              Theming
            </Link>
            <Link className="button-link" href="/components">
              Components
            </Link>
          </div>
        </section>

        <section className="page-section" id="launch">
          <div className="section-heading">
            <h2>Launch sequence</h2>
            <p>
              Publish the package first, then deploy docs. That is the minimum credible
              platform shape. After that, add Storybook hosting and release automation.
            </p>
          </div>
          <div className="callout">
            <strong>Phase 1</strong>
            <div className="code-block">
              <code>{`npm view hamro-design-system --registry=https://registry.npmjs.org/\nnpm login\nnpm publish --registry=https://registry.npmjs.org/`}</code>
            </div>
            <strong>Phase 2</strong>
            <ul className="check-list">
              <li>Install Next.js docs dependencies in `apps/docs`.</li>
              <li>Import this app into Vercel and deploy previews on each branch.</li>
              <li>Point a real domain at the production deployment.</li>
              <li>Link Storybook as a secondary reference, not the only entry point.</li>
            </ul>
          </div>
        </section>
      </main>
  );
}

