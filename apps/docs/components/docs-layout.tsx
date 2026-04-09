import { DocsNav } from './docs-nav';

interface DocsLayoutProps {
  children: React.ReactNode;
  description: string;
  title: string;
}

export function DocsLayout({ children, description, title }: DocsLayoutProps) {
  return (
    <main className="docs-page">
      <section className="page-section docs-hero">
        <div className="section-heading">
          <span className="eyebrow">Documentation</span>
          <h1 className="docs-page__title">{title}</h1>
          <p>{description}</p>
        </div>
      </section>

      <section className="page-section docs-page__body">
        <aside className="docs-sidebar">
          <div className="panel docs-sidebar__panel">
            <div className="docs-sidebar__heading">
              <strong>Library docs</strong>
              <span>Installation, foundations, components, and ecosystem guidance.</span>
            </div>
            <DocsNav />
          </div>
        </aside>
        <div className="docs-content">{children}</div>
      </section>
    </main>
  );
}
