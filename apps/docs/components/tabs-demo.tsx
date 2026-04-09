'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

const tabValues = ['overview', 'activity', 'settings'] as const;

export function TabsDemo() {
  const [value, setValue] = useState<(typeof tabValues)[number]>('overview');

  const code = `<Tabs defaultValue="${value}">\n  <Tabs.Tab value="overview">Overview</Tabs.Tab>\n  <Tabs.Tab value="activity">Activity</Tabs.Tab>\n  <Tabs.Tab value="settings">Settings</Tabs.Tab>\n</Tabs>`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="tabs-mock">
          <div className="tabs-mock__list" role="tablist" aria-label="Workspace sections">
            {tabValues.map((tab) => (
              <button
                aria-selected={value === tab}
                className={`tabs-mock__tab ${value === tab ? 'tabs-mock__tab--active' : ''}`}
                key={tab}
                onClick={() => setValue(tab)}
                role="tab"
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tabs-mock__panel">
            {value === 'overview' ? 'Workspace summary, member count, and current status.' : null}
            {value === 'activity' ? 'Recent changes, invites, and automation history.' : null}
            {value === 'settings' ? 'Permissions, naming, notifications, and workspace defaults.' : null}
          </div>
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
          <pre>import {'{ Tabs }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { Tabs } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}

