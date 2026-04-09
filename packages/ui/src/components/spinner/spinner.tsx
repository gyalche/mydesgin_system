import { forwardRef, type HTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.5rem',
} as const;

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    className,
    size = 'md',
    style,
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn(className)}
      ref={ref}
      style={{
        animation: 'hamro-spin 0.8s linear infinite',
        border: `2px solid ${themeVars.color.border.subtle}`,
        borderRadius: '50%',
        borderTopColor: themeVars.color.accent.brand.bg,
        display: 'inline-block',
        height: sizeMap[size],
        width: sizeMap[size],
        ...style,
      }}
    />
  );
});
