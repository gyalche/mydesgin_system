import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function InstallationPage() {
  return (
    <DocsLayout
      description="Install the package, import the stylesheet once, and verify the setup in a consumer app before wider rollout."
      title="Installation"
    >
      <ContentSection
        description="The current stable consumer contract remains the root package while the TypeScript workspace grows underneath it."
        title="Package install"
      >
        <CodeExample code={`npm install hamro-design-system`} />
      </ContentSection>

      <ContentSection
        description="Import the global stylesheet once at the app entry so tokens, fonts, and shared primitives are present."
        title="Stylesheet"
      >
        <CodeExample
          code={`import 'hamro-design-system/styles.css';\nimport { Button, Input, ThemeProvider } from 'hamro-design-system';`}
        />
      </ContentSection>

      <ContentSection
        description="Before introducing the library broadly, link it into a real app and validate SSR, hydration, theming, and consumer build behavior."
        title="Consumer validation"
      >
        <CodeExample
          code={`npm run build:prod\nnpm pack\n\n# in your consumer app\nnpm install ../receptionist-design-system/hamro-design-system-0.4.2.tgz`}
        />
      </ContentSection>
    </DocsLayout>
  );
}
