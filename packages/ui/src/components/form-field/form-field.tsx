import { type ReactNode } from 'react';
import { themeVars } from '@hamro-design-system/tokens';

export interface FormFieldProps {
  children: ReactNode;
  helperText?: ReactNode;
  id?: string;
  invalid?: boolean;
  label: ReactNode;
  validationText?: ReactNode;
}

export function FormField({
  children,
  helperText,
  id,
  invalid = false,
  label,
  validationText,
}: FormFieldProps) {
  const description = invalid ? validationText : helperText;

  return (
    <div style={{ display: 'grid', gap: themeVars.space.sm }}>
      <label
        htmlFor={id}
        style={{
          color: themeVars.color.fg.default,
          fontSize: themeVars.typography.size.sm,
          fontWeight: Number(themeVars.typography.weight.medium),
          lineHeight: themeVars.typography.lineHeight.sm,
        }}
      >
        {label}
      </label>
      {children}
      {description ? (
        <span
          style={{
            color: invalid ? themeVars.color.status.danger.fg : themeVars.color.fg.muted,
            fontSize: themeVars.typography.size.sm,
            lineHeight: themeVars.typography.lineHeight.sm,
          }}
        >
          {description}
        </span>
      ) : null}
    </div>
  );
}
