import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { showcaseExamples } from '../../lib/docs';

export default function ShowcasePage() {
  return (
    <DocsLayout
      title="Showcase"
      description="The showcase should prove the system works in full product contexts, not only in isolated stories."
    >
      <ContentSection
        title="Reference surfaces"
        description="Use these showcase lanes to communicate aesthetic range and product readiness."
      >
        <div className="stack-grid">
          {showcaseExamples.map((example) => (
            <article className="stack-card" key={example.title}>
              <h3>{example.title}</h3>
              <p>{example.detail}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Showcase rules"
        description="Examples should feel believable, not artificially polished to the point of being unusable."
      >
        <ul className="check-list">
          <li>Show complex screens with realistic density.</li>
          <li>Use the same components documented elsewhere in the system.</li>
          <li>Demonstrate both marketing and application UI surfaces.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}
