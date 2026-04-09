import { forwardRef, type HTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
  variant?: 'soft' | 'solid';
}

const toneStyles = {
  neutral: {
    soft: {
      backgroundColor: themeVars.color.bg.subtle,
      border: `1px solid ${themeVars.color.border.subtle}`,
      color: themeVars.color.fg.default,
    },
    solid: {
      backgroundColor: themeVars.color.fg.default,
      border: '1px solid transparent',
      color: themeVars.color.fg.inverse,
    },
  },
  brand: {
    soft: {
      backgroundColor: themeVars.color.bg.subtle,
      border: `1px solid ${themeVars.color.border.subtle}`,
      color: themeVars.color.accent.brand.bg,
    },
    solid: {
      backgroundColor: themeVars.color.accent.brand.bg,
      border: '1px solid transparent',
      color: themeVars.color.accent.brand.fg,
    },
  },
  success: {
    soft: {
      backgroundColor: themeVars.color.status.success.soft,
      border: `1px solid ${themeVars.color.status.success.border}`,
      color: themeVars.color.status.success.fg,
    },
    solid: {
      backgroundColor: themeVars.color.status.success.bg,
      border: '1px solid transparent',
      color: themeVars.color.fg.inverse,
    },
  },
  warning: {
    soft: {
      backgroundColor: themeVars.color.status.warning.soft,
      border: `1px solid ${themeVars.color.status.warning.border}`,
      color: themeVars.color.status.warning.fg,
    },
    solid: {
      backgroundColor: themeVars.color.status.warning.bg,
      border: '1px solid transparent',
      color: themeVars.color.fg.inverse,
    },
  },
  danger: {
    soft: {
      backgroundColor: themeVars.color.status.danger.soft,
      border: `1px solid ${themeVars.color.status.danger.border}`,
      color: themeVars.color.status.danger.fg,
    },
    solid: {
      backgroundColor: themeVars.color.status.danger.bg,
      border: '1px solid transparent',
      color: themeVars.color.fg.inverse,
    },
  },
  info: {
    soft: {
      backgroundColor: themeVars.color.status.info.soft,
      border: `1px solid ${themeVars.color.status.info.border}`,
      color: themeVars.color.status.info.fg,
    },
    solid: {
      backgroundColor: themeVars.color.status.info.bg,
      border: '1px solid transparent',
      color: themeVars.color.fg.inverse,
    },
  },
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    tone = 'neutral',
    variant = 'soft',
    style,
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        alignItems: 'center',
        borderRadius: themeVars.radius.pill,
        display: 'inline-flex',
        fontSize: themeVars.typography.size.xs,
        fontWeight: themeVars.typography.weight.semibold,
        gap: themeVars.space.xs,
        letterSpacing: '0.02em',
        lineHeight: themeVars.typography.lineHeight.sm,
        padding: `${themeVars.space.xxs} ${themeVars.space.sm}`,
        ...toneStyles[tone][variant],
        ...style,
      }}
    />
  );
});
