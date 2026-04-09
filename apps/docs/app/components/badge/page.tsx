import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const badge = componentDocs.badge;

function BadgeHero() {
  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="badge-showcase">
          <span className="badge-mock badge-mock--success">Stable</span>
          <span className="badge-mock badge-mock--info">Beta</span>
          <span className="badge-mock badge-mock--danger">Blocked</span>
        </div>
      </div>
    </div>
  );
}

export default function BadgeDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={badge.accessibility}
      anatomy={badge.anatomy}
      apiRows={badge.apiRows}
      description={badge.description}
      donts={badge.donts}
      dos={badge.dos}
      examples={badge.examples}
      hero={<BadgeHero />}
      title={badge.title}
    >
      <ContentSection title="Usage" description="Badges should be compact, semantically meaningful, and visually consistent across dense interfaces.">
        <CodeExample code={badge.previewCode} />
      </ContentSection>
    </ComponentDocTemplate>
  );
}
