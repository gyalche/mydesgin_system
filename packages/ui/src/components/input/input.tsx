import { forwardRef, type ChangeEventHandler, type InputHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

interface InputAdapter {
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  compact?: boolean | string;
  input?: InputAdapter;
  isInvalid?: boolean | string;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  w?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    compact = false,
    input,
    isInvalid = false,
    mb = '0',
    ml = '0',
    mr = '0',
    mt = '0',
    name,
    onChange,
    style,
    value,
    w = 'auto',
    ...props
  },
  ref,
) {
  const compactMode = compact === true || compact === 'true';
  const invalid = isInvalid === true || isInvalid === 'true';

  return (
    <input
      {...props}
      className={cn(className)}
      name={name ?? input?.name}
      onChange={onChange ?? input?.onChange}
      ref={ref}
      style={{
        background: themeVars.color.bg.surface,
        border: invalid
          ? `1px solid ${themeVars.color.status.danger.border}`
          : `1px solid ${themeVars.color.border.default}`,
        borderRadius: themeVars.radius.md,
        color: themeVars.color.fg.default,
        height: compactMode ? '32px' : '40px',
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        padding: compactMode ? `${themeVars.space.sm} ${themeVars.space.md}` : `10px ${themeVars.space.md}`,
        width: w,
        ...style,
      }}
      value={value ?? input?.value ?? ''}
    />
  );
});
