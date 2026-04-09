import { InputDemo } from '../../../components/input-demo';
import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const input = componentDocs.input;

export default function InputDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={input.accessibility}
      anatomy={input.anatomy}
      apiRows={input.apiRows}
      description={input.description}
      donts={input.donts}
      dos={input.dos}
      examples={input.examples}
      hero={<InputDemo />}
      title={input.title}
    >
      <ContentSection title="Usage" description="Inputs should feel calm in default state and unmistakable in focus or error states.">
        <CodeExample code={input.previewCode} />
      </ContentSection>

      <ContentSection title="Variants" description="Variants should stay restrained and preserve familiarity.">
        <div className="mini-spec-grid">
          {input.variants.map((variant) => (
            <article className="mini-spec-card" key={variant}>
              <strong>{variant}</strong>
              <input className={`input-mock input-mock--${variant}`} placeholder="Project name" value="" readOnly />
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="States" description="State handling matters more than decoration in form controls.">
        <div className="mini-spec-grid">
          <article className="mini-spec-card">
            <strong>default</strong>
            <input className="input-mock" placeholder="Project name" readOnly />
          </article>
          <article className="mini-spec-card">
            <strong>invalid</strong>
            <input className="input-mock input-mock--invalid" placeholder="Project name" readOnly />
          </article>
          <article className="mini-spec-card">
            <strong>disabled</strong>
            <input className="input-mock input-mock--disabled" disabled placeholder="Project name" readOnly />
          </article>
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}

