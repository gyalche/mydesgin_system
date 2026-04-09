import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const select = componentDocs.select;

function SelectHero() {
  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="demo-stage">
          <label className="field-label" htmlFor="select-preview">
            Scope
          </label>
          <select className="input-mock" defaultValue="team" id="select-preview">
            <option value="team">Team</option>
            <option value="workspace">Workspace</option>
            <option value="public">Public</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function SelectDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={select.accessibility}
      anatomy={select.anatomy}
      apiRows={select.apiRows}
      description={select.description}
      donts={select.donts}
      dos={select.dos}
      examples={select.examples}
      hero={<SelectHero />}
      title={select.title}
    >
      <ContentSection title="Usage" description="Use the native select surface when the interaction is straightforward and semantics matter more than bespoke chrome.">
        <CodeExample code={select.previewCode} />
      </ContentSection>
    </ComponentDocTemplate>
  );
}
