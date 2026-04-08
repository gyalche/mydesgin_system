import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@hamro-design-system/tokens';

const base = style({
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
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${themeVars.color.border.focus}`,
      outline: 'none',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.56,
    },
  },
});

export const buttonRecipe = recipe({
  base,
  variants: {
    variant: {
      solid: {
        backgroundColor: themeVars.color.accent.brand.bg,
        color: themeVars.color.accent.brand.fg,
        selectors: {
          '&:not(:disabled):hover': {
            backgroundColor: themeVars.color.accent.brand.bgHover,
          },
        },
      },
      soft: {
        backgroundColor: themeVars.color.bg.subtle,
        color: themeVars.color.fg.default,
      },
      outline: {
        backgroundColor: 'transparent',
        boxShadow: `inset 0 0 0 1px ${themeVars.color.border.default}`,
        color: themeVars.color.fg.default,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: themeVars.color.fg.default,
      },
    },
    size: {
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
    },
    tone: {
      neutral: {},
      brand: {},
      danger: {
        backgroundColor: themeVars.color.accent.danger.bg,
        color: themeVars.color.accent.danger.fg,
        selectors: {
          '&:not(:disabled):hover': {
            backgroundColor: themeVars.color.accent.danger.bgHover,
          },
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'outline',
        tone: 'danger',
      },
      style: {
        boxShadow: `inset 0 0 0 1px ${themeVars.color.accent.danger.bg}`,
        color: themeVars.color.accent.danger.bg,
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    tone: 'brand',
  },
});
