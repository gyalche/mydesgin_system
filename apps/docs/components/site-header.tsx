import Link from 'next/link';
import { docsNavigation } from '../lib/docs';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand__mark">H</span>
          <span className="brand__wordmark">
            <span>Hamro</span>
            <span>Design System</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {docsNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

