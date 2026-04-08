import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function ThemingPage() {
  return (
    <DocsLayout
      description="Theme with semantic CSS variables, not direct component-level hex values. That is the foundation for scale, dark mode, and branding."
      title="Theming"
    >
      <ContentSection
        title="Token layers"
        description="Separate raw scales, semantic aliases, and component-level exception tokens."
      >
        <ul className="check-list">
          <li>Raw tokens: palette, spacing, radius, typography, motion.</li>
          <li>Semantic tokens: `bg.surface`, `fg.default`, `border.focus`, `accent.brand.bg`.</li>
          <li>Component tokens only when semantic tokens are not expressive enough.</li>
        </ul>
      </ContentSection>

      <ContentSection
        title="Theme contract"
        description="All themes bind to one contract so components do not change their token keys when the theme changes."
      >
        <CodeExample
          code={`export const themeVars = createThemeContract({\n  color: {\n    bg: { surface: null },\n    fg: { default: null },\n    border: { focus: null },\n  },\n});`}
        />
      </ContentSection>

      <ContentSection
        title="Runtime model"
        description="Theme switching should be class-based and driven by CSS variables."
      >
        <ul className="check-list">
          <li>Support `light`, `dark`, and named brand themes.</li>
          <li>Keep React context light; CSS variables should drive rendering.</li>
          <li>Components should consume semantic variables by default.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}

