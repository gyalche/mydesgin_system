import { ButtonDemo } from '../../../components/button-demo';
import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const button = componentDocs.button;

export default function ButtonDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={button.accessibility}
      anatomy={button.anatomy}
      apiRows={button.apiRows}
      description={button.description}
      donts={button.donts}
      dos={button.dos}
      examples={button.examples}
      hero={<ButtonDemo />}
      title={button.title}
    >
      <ContentSection
        title="Usage"
        description="The default button should already communicate priority clearly; custom styling should not be the first escape hatch."
      >
        <CodeExample code={button.previewCode} />
      </ContentSection>

      <ContentSection
        title="Variants"
        description="Variants control emphasis without fragmenting the API into one-off style props."
      >
        <div className="mini-spec-grid">
          {button.variants.map((variant) => (
            <article className="mini-spec-card" key={variant}>
              <strong>{variant}</strong>
              <div className={`button-mock button-mock--${variant} button-mock--md button-mock--tone-brand`}>
                Create workspace
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Sizes"
        description="Sizes should scale spacing and typography together rather than becoming arbitrary height presets."
      >
        <div className="mini-spec-grid">
          {button.sizes.map((size) => (
            <article className="mini-spec-card" key={size}>
              <strong>{size}</strong>
              <div className={`button-mock button-mock--solid button-mock--${size} button-mock--tone-brand`}>
                Create workspace
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="States"
        description="Disabled and loading states should still preserve clarity, hierarchy, and accessibility."
      >
        <div className="mini-spec-grid">
          <article className="mini-spec-card">
            <strong>default</strong>
            <div className="button-mock button-mock--solid button-mock--md button-mock--tone-brand">
              Create workspace
            </div>
          </article>
          <article className="mini-spec-card">
            <strong>disabled</strong>
            <div className="button-mock button-mock--solid button-mock--md button-mock--tone-brand button-mock--disabled">
              Create workspace
            </div>
          </article>
          <article className="mini-spec-card">
            <strong>loading</strong>
            <div className="button-mock button-mock--solid button-mock--md button-mock--tone-brand">
              <span className="button-spinner" />
              <span>Creating</span>
            </div>
          </article>
        </div>
      </ContentSection>

      <ContentSection
        title="Implementation notes"
        description="This page is intentionally structured as the reusable pattern for Input, Tabs, Dialog, Table, and future component docs."
      >
        <div className="stack-grid">
          <article className="stack-card">
            <h3>Reusable shape</h3>
            <ul>
              <li>Preview and copy actions at the top.</li>
              <li>Variants, sizes, and states documented separately.</li>
              <li>Examples, anatomy, accessibility, and API on every component page.</li>
            </ul>
          </article>
          <article className="stack-card">
            <h3>DX objective</h3>
            <ul>
              <li>Developers should be able to evaluate and copy in under a minute.</li>
              <li>The page should guide implementation decisions, not only list props.</li>
              <li>Design hierarchy should make scanning effortless.</li>
            </ul>
          </article>
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}
