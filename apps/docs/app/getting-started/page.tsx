import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function GettingStartedPage() {
  return (
    <DocsLayout
      description="How to install the package today, consume its CSS entrypoint, and validate it in a real app before wider rollout."
      title="Getting Started"
    >
      <ContentSection
        title="Install"
        description="Treat the npm package as the source of truth for consumer applications."
      >
        <CodeExample
          code={`npm install hamro-design-system\n\nimport 'hamro-design-system/styles.css';`}
        />
      </ContentSection>

      <ContentSection
        title="Local validation"
        description="Before wider adoption, link the package into a real app and verify imports, styling, and SSR behavior."
      >
        <CodeExample
          code={`npm run build:prod\nnpm link\n\n# in the consumer app\nnpm link hamro-design-system`}
        />
      </ContentSection>

      <ContentSection
        title="Publish flow"
        description="Publish to npmjs, then deploy docs separately. Package deployment and docs deployment are not the same thing."
      >
        <CodeExample
          code={`npm view hamro-design-system --registry=https://registry.npmjs.org/\nnpm login\nnpm publish --registry=https://registry.npmjs.org/`}
        />
      </ContentSection>
    </DocsLayout>
  );
}

