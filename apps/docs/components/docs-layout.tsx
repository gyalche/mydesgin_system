import Link from 'next/link';
import { docsNavigation } from '../lib/docs';

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
            <strong>Navigate</strong>
            <nav className="docs-sidebar__nav" aria-label="Documentation navigation">
              {docsNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div className="docs-content">{children}</div>
      </section>
    </main>
  );
}

