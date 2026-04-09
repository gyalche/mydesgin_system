'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNavigationGroups } from '../lib/docs';

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="docs-sidebar__nav" aria-label="Documentation navigation">
      {docsNavigationGroups.map((group) => (
        <div className="docs-nav-group" key={group.title}>
          <span className="docs-nav-group__title">{group.title}</span>
          <div className="docs-nav-group__items">
            {group.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'is-active' : undefined}
                  href={item.href}
                  key={item.href}
                >
                  <strong>{item.label}</strong>
                  {item.description ? <span>{item.description}</span> : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
