import { CodeExample, ContentSection } from '../../components/content-blocks';
import { DocsLayout } from '../../components/docs-layout';

export default function DesignTokensPage() {
  return (
    <DocsLayout
      description="The token system is the contract behind the entire platform: color, type, spacing, radius, elevation, motion, breakpoints, and semantic states."
      title="Design Tokens"
    >
      <ContentSection
        description="Keep a strict separation between raw scales and semantic aliases so themes can change without forcing component rewrites."
        title="Token layers"
      >
        <ul className="check-list">
          <li>Raw scales: spacing, type sizes, radius, shadows, motion, z-index, breakpoints.</li>
          <li>Semantic aliases: surface, foreground, border, accent, success, warning, danger, info.</li>
          <li>Component-level exceptions only when the semantic contract is not expressive enough.</li>
        </ul>
      </ContentSection>

      <ContentSection
        description="Every theme binds to the same contract. Components read from semantic keys instead of hardcoded palette values."
        title="Contract shape"
      >
        <CodeExample
          code={`themeVars.color.bg.surface\nthemeVars.color.status.success.soft\nthemeVars.typography.size['3xl']\nthemeVars.motion.duration.slower\nthemeVars.breakpoint.lg`}
        />
      </ContentSection>

      <ContentSection
        description="A serious design system token contract should be big enough to support product depth without becoming a random bucket of values."
        title="Current scope"
      >
        <ul className="check-list">
          <li>Light, dark, and brand-default themes.</li>
          <li>Status surfaces for info, success, warning, and danger.</li>
          <li>Display and body typography families.</li>
          <li>Breakpoints and z-index scales for application UI growth.</li>
          <li>Motion durations and easing curves for consistent interaction rhythm.</li>
        </ul>
      </ContentSection>
    </DocsLayout>
  );
}
