import { forwardRef, type SelectHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  w?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    isInvalid = false,
    mb = '0',
    ml = '0',
    mr = '0',
    mt = '0',
    style,
    w = 'auto',
    ...props
  },
  ref,
) {
  return (
    <select
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        appearance: 'none',
        background: themeVars.color.bg.surface,
        border: `1px solid ${isInvalid ? themeVars.color.status.danger.border : themeVars.color.border.default}`,
        borderRadius: themeVars.radius.md,
        color: themeVars.color.fg.default,
        height: '40px',
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        padding: `0 ${themeVars.space.xl} 0 ${themeVars.space.md}`,
        width: w,
        ...style,
      }}
    />
  );
});
