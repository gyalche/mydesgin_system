import Link from 'next/link';
import { productPillars } from '../lib/docs';

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
              <div className="eyebrow">Premium React UI platform</div>
              <h1>Build product-grade interfaces with Hamro.</h1>
              <p>
                Hamro Design System is a serious UI library platform for React, Next.js,
                and TypeScript. It combines a reusable package, a theming system,
                templates, design resources, and polished documentation into one product.
              </p>
              <div className="hero__actions">
                <Link className="button-link button-link--primary" href="/components">Browse Components</Link>
                <Link className="button-link" href="/getting-started">Get Started</Link>
                <Link className="button-link" href="/templates">See Templates</Link>
              </div>
              <div className="hero__meta">
                <div className="stat">
                  <strong>UI</strong>
                  Reusable component package for real apps
                </div>
                <div className="stat">
                  <strong>Theme</strong>
                  Token-driven customization and dark mode
                </div>
                <div className="stat">
                  <strong>Ecosystem</strong>
                  Templates, design kit, and roadmap
                </div>
              </div>
            </div>

            <aside className="hero__card">
              <strong>Install</strong>
              <div className="code-block">
                <code>{`npm install hamro-design-system\n\nimport 'hamro-design-system/styles.css';`}</code>
              </div>
              <div className="hero-mini-grid">
                <div className="hero-mini-card">
                  <span>Button</span>
                  <strong>Copy install and import commands from each component card</strong>
                </div>
                <div className="hero-mini-card">
                  <span>Platform</span>
                  <strong>Docs, templates, design resources, and showcase under one system</strong>
                </div>
              </div>
              <p className="list-note" style={{ marginTop: 14 }}>
                Package publishing is only one part. The public docs and ecosystem
                presentation make the library feel premium.
              </p>
            </aside>
          </div>
        </section>

        <section className="page-section" id="why">
          <div className="section-heading">
            <h2>Product pillars</h2>
            <p>
              A premium UI platform is more than a list of components. Hamro needs clear
              product surfaces, strong customization, and enough ecosystem depth that
              teams can adopt it with confidence.
            </p>
          </div>
          <div className="feature-grid">
            {productPillars.map((card) => (
              <article className="feature-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link className="feature-link" href={card.href}>
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="products">
          <div className="section-heading">
            <h2>A platform with multiple entry points</h2>
            <p>
              Developers should be able to approach Hamro from the angle they need:
              package install, component exploration, themed customization, templates,
              or design resources.
            </p>
          </div>
          <div className="product-showcase">
            <article className="product-showcase__lead">
              <span className="eyebrow">Core package</span>
              <h3>hamro-design-system</h3>
              <p>
                The stable npm entry point for current adoption. Clean exports, global
                styles, and component imports that work in consumer apps today.
              </p>
              <div className="code-block">
                <code>{`npm install hamro-design-system\nimport 'hamro-design-system/styles.css';`}</code>
              </div>
            </article>
            <div className="product-showcase__grid">
              {featureCards.map((card) => (
                <article className="stack-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
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
            <h2>Documentation should sell trust</h2>
            <p>
              Storybook is still valuable, but the docs site should lead with product
              positioning, architecture, setup guidance, and component guidance that real
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
