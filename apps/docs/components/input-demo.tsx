'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

export function InputDemo() {
  const [value, setValue] = useState('Hamro Workspace');
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = `<Input${value ? ` value="${value}"` : ''}${invalid ? ' invalid' : ''}${
    disabled ? ' disabled' : ''
  } placeholder="Project name" />`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="toggle-row">
          <label className="toggle-chip">
            <input checked={invalid} onChange={() => setInvalid((v) => !v)} type="checkbox" />
            Invalid
          </label>
          <label className="toggle-chip">
            <input checked={disabled} onChange={() => setDisabled((v) => !v)} type="checkbox" />
            Disabled
          </label>
        </div>

        <div className="demo-stage">
          <label className="field-label" htmlFor="demo-input">
            Workspace name
          </label>
          <input
            className={`input-mock ${invalid ? 'input-mock--invalid' : ''} ${disabled ? 'input-mock--disabled' : ''}`}
            disabled={disabled}
            id="demo-input"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Project name"
            value={value}
          />
          <span className={`field-help ${invalid ? 'field-help--invalid' : ''}`}>
            {invalid ? 'Workspace name is required.' : 'Visible to the whole team.'}
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
          <pre>import {'{ Input }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { Input } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}

