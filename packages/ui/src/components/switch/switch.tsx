import { forwardRef, type InputHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, ...props },
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
      <input {...props} ref={ref} role="switch" type="checkbox" />
      {label ? <span>{label}</span> : null}
    </label>
  );
});
