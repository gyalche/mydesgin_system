'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

const rows = [
  { id: 'HMR-102', owner: 'Aayush', status: 'Active' },
  { id: 'HMR-103', owner: 'Mira', status: 'Draft' },
  { id: 'HMR-104', owner: 'Sujan', status: 'Review' },
] as const;

export function TableDemo() {
  const [compact, setCompact] = useState(false);

  const code = `<Table variant="${compact ? 'compact' : 'default'}" columns={columns} data={rows} />`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="toggle-row">
          <label className="toggle-chip">
            <input checked={compact} onChange={() => setCompact((v) => !v)} type="checkbox" />
            Compact mode
          </label>
        </div>

        <div className="table-mock">
          <div className="table-mock__head">
            <span>ID</span>
            <span>Owner</span>
            <span>Status</span>
          </div>
          {rows.map((row) => (
            <div className={`table-mock__row ${compact ? 'table-mock__row--compact' : ''}`} key={row.id}>
              <span>{row.id}</span>
              <span>{row.owner}</span>
              <span>{row.status}</span>
            </div>
          ))}
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
          <pre>import {'{ Table }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { Table } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}

