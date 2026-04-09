import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { templateCatalog } from '../../lib/docs';

export default function TemplatesPage() {
  return (
    <DocsLayout
      title="Templates"
      description="Templates should shorten the path from install to real product screens. They are part of the ecosystem story, not a separate afterthought."
    >
      <ContentSection
        title="Starter catalog"
        description="Focus first on the templates that prove Hamro can power actual product surfaces."
      >
        <div className="stack-grid">
          {templateCatalog.map((template) => (
            <article className="stack-card" key={template.name}>
              <h3>{template.name}</h3>
              <p>{template.summary}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Template rules"
        description="Templates should demonstrate good use of the system, not bypass it."
      >
        <ul className="check-list">
          <li>Use shared tokens and component APIs.</li>
          <li>Keep business logic out of the template package.</li>
          <li>Show realistic layout and content density.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

