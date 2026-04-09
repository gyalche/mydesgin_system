import Link from 'next/link';
import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { productPillars } from '../../lib/docs';

export default function ProductsPage() {
  return (
    <DocsLayout
      title="Products"
      description="Hamro should present a coherent product suite: package, docs, templates, design resources, and future advanced components."
    >
      <ContentSection
        title="Platform shape"
        description="Keep the core package stable while the broader ecosystem expands around it."
      >
        <div className="feature-grid">
          {productPillars.map((pillar) => (
            <article className="feature-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <Link className="feature-link" href={pillar.href}>
                Explore
              </Link>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Recommended product line"
        description="Do not launch everything at once. Build outward from the core package."
      >
        <ul className="check-list">
          <li>`hamro-design-system` as the consumer-ready package today.</li>
          <li>`@hamro-design-system/ui`, `tokens`, and `icons` as the long-term workspace split.</li>
          <li>`@hamro-design-system/pro` later for advanced data-heavy components.</li>
          <li>Templates and design kit as adoption accelerators.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

