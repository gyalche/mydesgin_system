import { forwardRef, type InputHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, style, ...props },
  ref,
) {
  return (
    <label
      style={{
        alignItems: 'center',
        color: themeVars.color.fg.default,
        display: 'inline-flex',
        gap: themeVars.space.sm,
      }}
    >
      <input {...props} ref={ref} style={style} type="checkbox" />
      {label ? <span>{label}</span> : null}
    </label>
  );
});
