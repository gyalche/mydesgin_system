import Link from 'next/link';
import { topNavigation } from '../lib/docs';
import { ThemeToggle } from './theme-toggle';

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
          {topNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link className="site-search-link" href="/components">
            Search components
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
