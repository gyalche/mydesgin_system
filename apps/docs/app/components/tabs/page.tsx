import { TabsDemo } from '../../../components/tabs-demo';
import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const tabs = componentDocs.tabs;

export default function TabsDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={tabs.accessibility}
      anatomy={tabs.anatomy}
      apiRows={tabs.apiRows}
      description={tabs.description}
      donts={tabs.donts}
      dos={tabs.dos}
      examples={tabs.examples}
      hero={<TabsDemo />}
      title={tabs.title}
    >
      <ContentSection title="Usage" description="Tabs should separate sibling content views while preserving a clear sense of location.">
        <CodeExample code={tabs.previewCode} />
      </ContentSection>

      <ContentSection title="Variants" description="Choose the variant that matches density and emphasis, not personal preference.">
        <div className="mini-spec-grid">
          {tabs.variants.map((variant) => (
            <article className="mini-spec-card" key={variant}>
              <strong>{variant}</strong>
              <div className={`tabs-variant-sample tabs-variant-sample--${variant}`}>
                <span>Overview</span>
                <span>Activity</span>
                <span>Settings</span>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}

