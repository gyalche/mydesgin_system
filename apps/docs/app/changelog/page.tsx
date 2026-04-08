import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { releaseMilestones } from '../../lib/docs';

export default function ChangelogPage() {
  return (
    <DocsLayout
      description="The release narrative matters. Consumers need to know what changed, what is stable, and what migration work is expected."
      title="Changelog"
    >
      <ContentSection
        title="Release direction"
        description="Use this page as the public record of package and platform maturity."
      >
        <div className="timeline">
          {releaseMilestones.map((milestone) => (
            <article className="panel timeline__item" key={milestone.version}>
              <strong>{milestone.version}</strong>
              <p>{milestone.summary}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Versioning rules"
        description="Keep the rules simple and enforce them consistently."
      >
        <ul className="check-list">
          <li>Patch for fixes and safe refinements.</li>
          <li>Minor for new components and additive APIs.</li>
          <li>Major for contract breaks, removals, or theme contract changes.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

