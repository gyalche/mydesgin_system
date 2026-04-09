import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { designResources } from '../../lib/docs';

export default function DesignPage() {
  return (
    <DocsLayout
      title="Design"
      description="Design resources should mirror the code system closely enough that designers and engineers are working from the same vocabulary."
    >
      <ContentSection
        title="Design resources"
        description="The design side of the platform should be as intentional as the code side."
      >
        <div className="stack-grid">
          {designResources.map((resource) => (
            <article className="stack-card" key={resource.title}>
              <h3>{resource.title}</h3>
              <p>{resource.detail}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Alignment rules"
        description="Keep the design and engineering contracts tight."
      >
        <ul className="check-list">
          <li>Use matching token names in Figma and code.</li>
          <li>Keep variants aligned across component definitions and docs.</li>
          <li>Document intentional gaps rather than letting them drift silently.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

