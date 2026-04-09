import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

const toneStyles = {
  info: {
    backgroundColor: themeVars.color.status.info.soft,
    borderColor: themeVars.color.status.info.border,
    color: themeVars.color.status.info.fg,
  },
  success: {
    backgroundColor: themeVars.color.status.success.soft,
    borderColor: themeVars.color.status.success.border,
    color: themeVars.color.status.success.fg,
  },
  warning: {
    backgroundColor: themeVars.color.status.warning.soft,
    borderColor: themeVars.color.status.warning.border,
    color: themeVars.color.status.warning.fg,
  },
  danger: {
    backgroundColor: themeVars.color.status.danger.soft,
    borderColor: themeVars.color.status.danger.border,
    color: themeVars.color.status.danger.fg,
  },
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode;
  heading?: ReactNode;
  tone?: keyof typeof toneStyles;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    className,
    description,
    heading,
    style,
    tone = 'info',
    ...props
  },
  ref,
) {
  const colors = toneStyles[tone];

  return (
    <div
      {...props}
      className={cn(className)}
      ref={ref}
      role="status"
      style={{
        backgroundColor: colors.backgroundColor,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: themeVars.radius.lg,
        boxShadow: themeVars.shadow.sm,
        color: colors.color,
        display: 'grid',
        gap: themeVars.space.xs,
        padding: themeVars.space.lg,
        ...style,
      }}
    >
      {heading ? <strong style={{ fontSize: themeVars.typography.size.md }}>{heading}</strong> : null}
      {description ? <span style={{ color: themeVars.color.fg.default }}>{description}</span> : null}
    </div>
  );
});
