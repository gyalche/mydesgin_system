import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { TableDemo } from '../../../components/table-demo';
import { componentDocs } from '../../../lib/docs';

const table = componentDocs.table;

export default function TableDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={table.accessibility}
      anatomy={table.anatomy}
      apiRows={table.apiRows}
      description={table.description}
      donts={table.donts}
      dos={table.dos}
      examples={table.examples}
      hero={<TableDemo />}
      title={table.title}
    >
      <ContentSection title="Usage" description="Tables should optimise scanning and comparison instead of forcing data into decorative card layouts.">
        <CodeExample code={table.previewCode} />
      </ContentSection>

      <ContentSection title="Variants" description="Use compact density only when the data really demands it.">
        <div className="mini-spec-grid">
          {table.variants.map((variant) => (
            <article className="mini-spec-card" key={variant}>
              <strong>{variant}</strong>
              <div className={`table-variant-sample table-variant-sample--${variant}`}>
                <span>ID</span>
                <span>Owner</span>
                <span>Status</span>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}

