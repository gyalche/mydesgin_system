import type { PropsWithChildren } from 'react';
import { brandDefaultThemeClass, darkThemeClass, lightThemeClass } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

export type ThemeName = 'light' | 'dark' | 'brand-default';

export interface ThemeProviderProps extends PropsWithChildren {
  className?: string;
  theme?: ThemeName;
}

const themeClassMap: Record<ThemeName, string> = {
  light: lightThemeClass,
  dark: darkThemeClass,
  'brand-default': brandDefaultThemeClass,
};

export function ThemeProvider({
  children,
  className,
  theme = 'light',
}: ThemeProviderProps) {
  return <div className={cn(themeClassMap[theme], className)}>{children}</div>;
}
