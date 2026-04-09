import { DialogDemo } from '../../../components/dialog-demo';
import { CodeExample, ContentSection } from '../../../components/content-blocks';
import { ComponentDocTemplate } from '../../../components/component-doc-template';
import { componentDocs } from '../../../lib/docs';

const dialog = componentDocs.dialog;

export default function DialogDocsPage() {
  return (
    <ComponentDocTemplate
      accessibility={dialog.accessibility}
      anatomy={dialog.anatomy}
      apiRows={dialog.apiRows}
      description={dialog.description}
      donts={dialog.donts}
      dos={dialog.dos}
      examples={dialog.examples}
      hero={<DialogDemo />}
      title={dialog.title}
    >
      <ContentSection title="Usage" description="Use dialogs for interruptive decisions, not as a shortcut for every hidden panel.">
        <CodeExample code={dialog.previewCode} />
      </ContentSection>

      <ContentSection title="Variants" description="Semantic emphasis should stay limited and intentional.">
        <div className="mini-spec-grid">
          {dialog.variants.map((variant) => (
            <article className="mini-spec-card" key={variant}>
              <strong>{variant}</strong>
              <div className={`dialog-mini dialog-mini--${variant}`}>
                <span>{variant === 'danger' ? 'Destructive confirmation' : 'Standard confirmation'}</span>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>
    </ComponentDocTemplate>
  );
}
