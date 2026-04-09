import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const alert = componentDocs.alert;

function AlertHero() {
  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="mini-spec-grid">
          <article className="mini-spec-card">
            <strong>info</strong>
            <div className="alert-mock alert-mock--info">Heads up: changes apply instantly.</div>
          </article>
          <article className="mini-spec-card">
            <strong>warning</strong>
            <div className="alert-mock alert-mock--warning">This workspace is visible to all operators.</div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function AlertDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={alert.accessibility}
      anatomy={alert.anatomy}
      apiRows={alert.apiRows}
      description={alert.description}
      donts={alert.donts}
      dos={alert.dos}
      examples={alert.examples}
      hero={<AlertHero />}
      title={alert.title}
    >
      <ContentSection title="Usage" description="Alerts should feel informative and deliberate, not like generic colored boxes.">
        <CodeExample code={alert.previewCode} />
      </ContentSection>
    </ComponentDocTemplate>
  );
}
