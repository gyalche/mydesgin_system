import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function ArchitecturePage() {
  return (
    <DocsLayout
      description="The library should grow into a platform: stable package contract, formal tokens, and separate docs and playground apps."
      title="Architecture"
    >
      <ContentSection
        title="Recommended model"
        description="Use a hybrid approach: package-first core library today, copyable blocks later."
      >
        <ul className="check-list">
          <li>`hamro-design-system` remains the stable consumer contract today.</li>
          <li>`@hamro-design-system/ui` becomes the long-term package target in the workspace.</li>
          <li>Blocks and app patterns should come later, after the primitives and themes settle.</li>
        </ul>
      </ContentSection>

      <ContentSection
        title="Workspace shape"
        description="The current repo keeps the root package working while the new monorepo structure grows in parallel."
      >
        <CodeExample
          code={`apps/docs\napps/playground\npackages/ui\npackages/tokens\npackages/icons\npackages/utils\npackages/config-eslint\npackages/config-typescript`}
        />
      </ContentSection>

      <ContentSection
        title="Migration rule"
        description="Do not rewrite the whole system mechanically. Move foundations first, then rebuild a few core components to establish the new contract."
      >
        <ul className="check-list">
          <li>Move tokens first.</li>
          <li>Rebuild `Button`, `Input`, and `FormField` against the new theme contract.</li>
          <li>Validate them in the playground app before broad migration.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

