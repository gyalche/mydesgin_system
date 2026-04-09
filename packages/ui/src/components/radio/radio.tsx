import { forwardRef, type InputHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
      <input {...props} ref={ref} style={style} type="radio" />
      {label ? <span>{label}</span> : null}
    </label>
  );
});
