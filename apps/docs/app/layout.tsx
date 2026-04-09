import type { Metadata } from 'next';
import { SiteFooter } from '../components/footer';
import { SiteHeader } from '../components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamro Design System',
  description:
    'Production-grade React UI library, tokens, theming, and documentation platform for Hamro Design System.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="docs-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
