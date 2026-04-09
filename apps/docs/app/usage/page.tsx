import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function UsagePage() {
  return (
    <DocsLayout
      description="Use the library with a small, predictable API vocabulary: semantic tones, clear variants, typed props, and composition over one-off escape hatches."
      title="Usage"
    >
      <ContentSection
        description="The default happy path should feel obvious: import components directly, use theme classes, and let tokens drive styling."
        title="Core usage pattern"
      >
        <CodeExample
          code={`import 'hamro-design-system/styles.css';\nimport { Button, FormField, Input } from 'hamro-design-system';\n\nexport function Example() {\n  return (\n    <FormField label="Workspace" helperText="Visible to the whole team">\n      <Input placeholder="Workspace name" />\n    </FormField>\n  );\n}`}
        />
      </ContentSection>

      <ContentSection
        description="The package should converge on the same prop words across components so developers do not have to relearn the system every time."
        title="API vocabulary"
      >
        <ul className="check-list">
          <li>`variant` controls visual treatment.</li>
          <li>`tone` controls semantic intent.</li>
          <li>`size` controls spacing and scale.</li>
          <li>`className` remains available for integration-level composition.</li>
          <li>`asChild` is used only where polymorphism materially helps composition.</li>
        </ul>
      </ContentSection>

      <ContentSection
        description="Reach for semantic composition patterns first instead of styling every surface from scratch."
        title="Composition guidance"
      >
        <ul className="check-list">
          <li>Wrap controls in `FormField` instead of rebuilding labels and helper text manually.</li>
          <li>Use `Badge` and `Alert` for semantic state surfaces instead of random inline colors.</li>
          <li>Use `Layout`, `Card`, and `Typography` as the structural language for examples and templates.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}
