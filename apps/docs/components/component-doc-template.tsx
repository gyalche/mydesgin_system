import { ApiTable } from './api-table';
import { ContentSection } from './content-blocks';
import { DocsLayout } from './docs-layout';

interface ExampleItem {
  code: string;
  title: string;
}

interface ApiRow {
  defaultValue: string;
  description: string;
  prop: string;
  type: string;
}

interface ComponentDocTemplateProps {
  accessibility: readonly string[];
  anatomy: readonly string[];
  apiRows: readonly ApiRow[];
  children?: React.ReactNode;
  description: string;
  donts: readonly string[];
  dos: readonly string[];
  examples: readonly ExampleItem[];
  hero: React.ReactNode;
  title: string;
}

export function ComponentDocTemplate({
  accessibility,
  anatomy,
  apiRows,
  children,
  description,
  donts,
  dos,
  examples,
  hero,
  title,
}: ComponentDocTemplateProps) {
  return (
    <DocsLayout description={description} title={title}>
      <ContentSection
        title="Preview"
        description="Live preview, install, and import belong at the top so developers can evaluate and copy immediately."
      >
        {hero}
      </ContentSection>

      {children}

      <ContentSection
        title="Examples"
        description="Document the most common usage patterns directly from the component page."
      >
        <div className="example-stack">
          {examples.map((example) => (
            <article className="panel example-card" key={example.title}>
              <h3>{example.title}</h3>
              <div className="code-block">
                <code>{example.code}</code>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Anatomy"
        description="Keep the anatomy simple so theming and accessibility remain easy to reason about."
      >
        <ul className="check-list">
          {anatomy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        title="Accessibility"
        description="The component should preserve native semantics while making focus and disabled states obvious."
      >
        <ul className="check-list">
          {accessibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        title="API"
        description="Keep the surface area tight. Every prop should earn its place."
      >
        <ApiTable rows={apiRows} />
      </ContentSection>

      <ContentSection
        title="Dos and don’ts"
        description="Most component inconsistency comes from undocumented edge behavior. Be explicit."
      >
        <div className="stack-grid">
          <article className="stack-card">
            <h3>Do</h3>
            <ul>
              {dos.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="stack-card">
            <h3>Don’t</h3>
            <ul>
              {donts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </ContentSection>
    </DocsLayout>
  );
}

