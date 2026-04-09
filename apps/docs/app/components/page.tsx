import { ComponentCard } from '../../components/component-card';
import { ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';
import { componentCatalog, componentRoadmap } from '../../lib/docs';

export default function ComponentsPage() {
  return (
    <DocsLayout
      description="Build the system in layers and keep the API vocabulary consistent. That matters more than total component count."
      title="Components"
    >
      <ContentSection
        title="API conventions"
        description="Use the same small vocabulary across the library."
      >
        <ul className="check-list">
          <li>`variant`, `size`, `tone`, `className`, and `asChild` are the standard surface.</li>
          <li>Prefer composition and slots over giant prop APIs.</li>
          <li>Support controlled and uncontrolled behavior where the pattern is standard.</li>
        </ul>
      </ContentSection>

      <ContentSection
        title="Build order"
        description="Prioritise the pieces that define ergonomics and styling discipline."
      >
        <div className="stack-grid">
          {componentRoadmap.map((group) => (
            <article className="stack-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Component catalog"
        description="Each component should present install and import actions directly, so developers can copy what they need without hunting through generic setup pages."
      >
        <div className="component-grid">
          {componentCatalog.map((component) => (
            <ComponentCard key={component.name} {...component} />
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Accessibility boundary"
        description="Use Radix primitives for complex interactive building blocks rather than re-implementing overlay behavior from scratch."
      >
        <ul className="check-list">
          <li>Dialog, Select, Tabs, Tooltip, Checkbox, RadioGroup, and menus should wrap proven primitives.</li>
          <li>Keyboard support, focus visibility, and aria relationships are non-negotiable.</li>
          <li>Do not ship advanced components before the foundation primitives are stable.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}
