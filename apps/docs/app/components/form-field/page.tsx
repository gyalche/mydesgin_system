import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { FormFieldDemo } from '../../../components/form-field-demo';
import { componentDocs } from '../../../lib/docs';

const formField = componentDocs['form-field'];

export default function FormFieldDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={formField.accessibility}
      anatomy={formField.anatomy}
      apiRows={formField.apiRows}
      description={formField.description}
      donts={formField.donts}
      dos={formField.dos}
      examples={formField.examples}
      hero={<FormFieldDemo />}
      title={formField.title}
    >
      <ContentSection title="Usage" description="FormField should be the default wrapper for labels, helper copy, and validation around text-entry controls.">
        <CodeExample code={formField.previewCode} />
      </ContentSection>

      <ContentSection title="States" description="The wrapper should make helper and validation states consistent across the whole product.">
        <div className="mini-spec-grid">
          <article className="mini-spec-card">
            <strong>helper</strong>
            <div className="form-field-mock">
              <label className="field-label">Workspace</label>
              <input className="input-mock" placeholder="Workspace name" readOnly />
              <span className="field-help">Visible to the whole team.</span>
            </div>
          </article>
          <article className="mini-spec-card">
            <strong>validation</strong>
            <div className="form-field-mock">
              <label className="field-label">Workspace</label>
              <input className="input-mock input-mock--invalid" placeholder="Workspace name" readOnly />
              <span className="field-help field-help--invalid">Required field.</span>
            </div>
          </article>
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}

