'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  const code = `<Dialog open={${open}} onOpenChange={setOpen}>\n  <Dialog.Title>Archive workspace</Dialog.Title>\n  <Dialog.Description>This action cannot be undone.</Dialog.Description>\n</Dialog>`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="demo-stage">
          <button className="button-mock button-mock--solid button-mock--md button-mock--tone-brand" onClick={() => setOpen(true)} type="button">
            Open dialog
          </button>
          {open ? (
            <div className="dialog-mock-overlay">
              <div className="dialog-mock">
                <strong>Archive workspace</strong>
                <p>This action cannot be undone. All invitations and settings will be removed.</p>
                <div className="dialog-mock__actions">
                  <button className="button-mock button-mock--ghost button-mock--md button-mock--tone-neutral" onClick={() => setOpen(false)} type="button">
                    Cancel
                  </button>
                  <button className="button-mock button-mock--solid button-mock--md button-mock--tone-danger" onClick={() => setOpen(false)} type="button">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="component-command">
          <span>Generated JSX</span>
          <pre>{code}</pre>
          <CopySnippet code={code} label="Copy JSX" />
        </div>
      </div>

      <div className="component-detail-hero__meta">
        <div className="component-command">
          <span>Install</span>
          <pre>npm install hamro-design-system</pre>
          <CopySnippet code="npm install hamro-design-system" label="Copy npm i" />
        </div>
        <div className="component-command">
          <span>Import</span>
          <pre>import {'{ Dialog }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { Dialog } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}

