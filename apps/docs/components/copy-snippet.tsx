'use client';

import { useState } from 'react';

interface CopySnippetProps {
  code: string;
  label: string;
}

export function CopySnippet({ code, label }: CopySnippetProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="copy-button" onClick={handleCopy} type="button">
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}

