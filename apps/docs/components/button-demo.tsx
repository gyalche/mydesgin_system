'use client';

import { useState } from 'react';
import { CopySnippet } from './copy-snippet';

const variants = ['solid', 'soft', 'outline', 'ghost'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const tones = ['brand', 'neutral', 'danger'] as const;

type Variant = (typeof variants)[number];
type Size = (typeof sizes)[number];
type Tone = (typeof tones)[number];

function getButtonClass(variant: Variant, size: Size, tone: Tone, disabled: boolean) {
  return [
    'button-mock',
    `button-mock--${variant}`,
    `button-mock--${size}`,
    `button-mock--tone-${tone}`,
    disabled ? 'button-mock--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function ButtonDemo() {
  const [variant, setVariant] = useState<Variant>('solid');
  const [size, setSize] = useState<Size>('md');
  const [tone, setTone] = useState<Tone>('brand');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const code = `<Button variant="${variant}" tone="${tone}" size="${size}"${
    disabled ? ' disabled' : ''
  }${loading ? ' loading' : ''}>\n  Create workspace\n</Button>`;

  return (
    <div className="component-detail-hero">
      <div className="component-detail-hero__preview">
        <div className="demo-toolbar">
          <div className="segmented-group">
            {variants.map((item) => (
              <button
                className={`segmented-pill ${variant === item ? 'segmented-pill--active' : ''}`}
                key={item}
                onClick={() => setVariant(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="segmented-group">
            {sizes.map((item) => (
              <button
                className={`segmented-pill ${size === item ? 'segmented-pill--active' : ''}`}
                key={item}
                onClick={() => setSize(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="segmented-group">
            {tones.map((item) => (
              <button
                className={`segmented-pill ${tone === item ? 'segmented-pill--active' : ''}`}
                key={item}
                onClick={() => setTone(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="toggle-row">
            <label className="toggle-chip">
              <input checked={disabled} onChange={() => setDisabled((v) => !v)} type="checkbox" />
              Disabled
            </label>
            <label className="toggle-chip">
              <input checked={loading} onChange={() => setLoading((v) => !v)} type="checkbox" />
              Loading
            </label>
          </div>
        </div>

        <div className="demo-stage">
          <div className={getButtonClass(variant, size, tone, disabled)}>
            {loading ? <span className="button-spinner" /> : null}
            <span>Create workspace</span>
          </div>
          <div className="demo-stage__secondary">
            <div className={getButtonClass('soft', 'md', 'neutral', false)}>Save draft</div>
            <div className={getButtonClass('outline', 'md', 'danger', false)}>Archive</div>
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
          <pre>import {'{ Button }'} from 'hamro-design-system';</pre>
          <CopySnippet code="import { Button } from 'hamro-design-system';" label="Copy import" />
        </div>
      </div>
    </div>
  );
}
