import Link from 'next/link';
import { CopySnippet } from './copy-snippet';

interface ComponentCardProps {
  category: string;
  description: string;
  example: string;
  slug: string;
  importCommand: string;
  installCommand: string;
  name: string;
  status: string;
  tags: readonly string[];
}

export function ComponentCard({
  category,
  description,
  example,
  slug,
  importCommand,
  installCommand,
  name,
  status,
  tags,
}: ComponentCardProps) {
  return (
    <article className="component-card">
      <div className="component-card__top">
        <div>
          <span className="component-card__category">{category}</span>
          <h3>{name}</h3>
        </div>
        <span className={`status-pill status-pill--${status.toLowerCase()}`}>{status}</span>
      </div>

      <p className="component-card__description">{description}</p>

      <div className="component-preview">
        <div className="component-preview__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="component-preview__body">
          <code>{example}</code>
        </div>
      </div>

      <div className="component-card__actions">
        <div className="component-command">
          <span>Install</span>
          <pre>{installCommand}</pre>
          <CopySnippet code={installCommand} label="Copy npm i" />
        </div>
        <div className="component-command">
          <span>Import</span>
          <pre>{importCommand}</pre>
          <CopySnippet code={importCommand} label="Copy import" />
        </div>
      </div>

      <div className="component-card__tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <Link className="feature-link" href={`/components/${slug}`}>
        Open component page
      </Link>
    </article>
  );
}
