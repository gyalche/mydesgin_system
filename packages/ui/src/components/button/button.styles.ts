import type { CSSProperties } from 'react';
import { themeVars } from '@hamro-design-system/tokens';

export interface ButtonStyleOptions {
  fullWidth?: boolean;
  size: 'sm' | 'md' | 'lg';
  tone: 'neutral' | 'brand' | 'danger';
  variant: 'solid' | 'soft' | 'outline' | 'ghost';
}

const baseStyles: CSSProperties = {
  alignItems: 'center',
  border: 0,
  borderRadius: themeVars.radius.md,
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: themeVars.typography.family.sans,
  fontWeight: themeVars.typography.weight.medium,
  gap: themeVars.space.sm,
  justifyContent: 'center',
  lineHeight: themeVars.typography.lineHeight.md,
  transition: [
    `background-color ${themeVars.motion.duration.normal} ${themeVars.motion.easing.standard}`,
    `color ${themeVars.motion.duration.normal} ${themeVars.motion.easing.standard}`,
    `box-shadow ${themeVars.motion.duration.normal} ${themeVars.motion.easing.standard}`,
  ].join(', '),
};

const sizeStyles: Record<ButtonStyleOptions['size'], CSSProperties> = {
  sm: {
    fontSize: themeVars.typography.size.sm,
    minHeight: '2rem',
    padding: `0 ${themeVars.space.md}`,
  },
  md: {
    fontSize: themeVars.typography.size.md,
    minHeight: '2.5rem',
    padding: `0 ${themeVars.space.lg}`,
  },
  lg: {
    fontSize: themeVars.typography.size.lg,
    minHeight: '3rem',
    padding: `0 ${themeVars.space.xl}`,
  },
};

const variantToneStyles: Record<ButtonStyleOptions['variant'], Record<ButtonStyleOptions['tone'], CSSProperties>> = {
  solid: {
    neutral: {
      backgroundColor: themeVars.color.bg.subtle,
      color: themeVars.color.fg.default,
    },
    brand: {
      backgroundColor: themeVars.color.accent.brand.bg,
      color: themeVars.color.accent.brand.fg,
    },
    danger: {
      backgroundColor: themeVars.color.accent.danger.bg,
      color: themeVars.color.accent.danger.fg,
    },
  },
  soft: {
    neutral: {
      backgroundColor: themeVars.color.bg.subtle,
      color: themeVars.color.fg.default,
    },
    brand: {
      backgroundColor: themeVars.color.bg.subtle,
      color: themeVars.color.accent.brand.bg,
    },
    danger: {
      backgroundColor: themeVars.color.bg.subtle,
      color: themeVars.color.accent.danger.bg,
    },
  },
  outline: {
    neutral: {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 0 0 1px ${themeVars.color.border.default}`,
      color: themeVars.color.fg.default,
    },
    brand: {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 0 0 1px ${themeVars.color.accent.brand.bg}`,
      color: themeVars.color.accent.brand.bg,
    },
    danger: {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 0 0 1px ${themeVars.color.accent.danger.bg}`,
      color: themeVars.color.accent.danger.bg,
    },
  },
  ghost: {
    neutral: {
      backgroundColor: 'transparent',
      color: themeVars.color.fg.default,
    },
    brand: {
      backgroundColor: 'transparent',
      color: themeVars.color.accent.brand.bg,
    },
    danger: {
      backgroundColor: 'transparent',
      color: themeVars.color.accent.danger.bg,
    },
  },
};

export function getButtonStyles({
  fullWidth,
  size,
  tone,
  variant,
}: ButtonStyleOptions): CSSProperties {
  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantToneStyles[variant][tone],
    width: fullWidth ? '100%' : undefined,
  };
}
