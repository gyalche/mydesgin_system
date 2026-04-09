'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

export function FormFieldDemo() {
  const [invalid, setInvalid] = useState(false);

  const code = `<FormField label="Workspace" ${
    invalid ? 'validationText="Required field"' : 'helperText="Visible to the whole team"'
  }>\n  <Input${invalid ? ' invalid aria-invalid="true"' : ''} placeholder="Workspace name" />\n</FormField>`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="toggle-row">
          <label className="toggle-chip">
            <input checked={invalid} onChange={() => setInvalid((v) => !v)} type="checkbox" />
            Show validation
          </label>
        </div>

        <div className="form-field-mock">
          <label className="field-label" htmlFor="demo-form-field">
            Workspace
          </label>
          <input
            className={`input-mock ${invalid ? 'input-mock--invalid' : ''}`}
            id="demo-form-field"
            placeholder="Workspace name"
            readOnly
          />
          <span className={`field-help ${invalid ? 'field-help--invalid' : ''}`}>
            {invalid ? 'Required field.' : 'Visible to the whole team.'}
          </span>
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
          <pre>import {'{ FormField, Input }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { FormField, Input } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}

