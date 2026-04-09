'use client';

import { useEffect, useState } from 'react';

type ThemeName = 'brand-default' | 'light' | 'dark';

const themes: ThemeName[] = ['brand-default', 'light', 'dark'];

function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>('brand-default');

  useEffect(() => {
    const stored = window.localStorage.getItem('hamro-docs-theme') as ThemeName | null;
    const nextTheme = stored && themes.includes(stored) ? stored : 'brand-default';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function cycleTheme() {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem('hamro-docs-theme', nextTheme);
  }

  return (
    <button className="theme-toggle" onClick={cycleTheme} type="button">
      <span className="theme-toggle__label">Theme</span>
      <strong>{theme === 'brand-default' ? 'Brand' : theme === 'light' ? 'Light' : 'Dark'}</strong>
    </button>
  );
}
