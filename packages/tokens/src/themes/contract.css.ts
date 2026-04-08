import { createThemeContract } from '@vanilla-extract/css';

export const themeVars = createThemeContract({
  color: {
    bg: {
      canvas: null,
      surface: null,
      subtle: null,
      inverse: null,
    },
    fg: {
      default: null,
      muted: null,
      subtle: null,
      inverse: null,
    },
    border: {
      default: null,
      subtle: null,
      strong: null,
      focus: null,
    },
    accent: {
      brand: {
        bg: null,
        bgHover: null,
        fg: null,
      },
      danger: {
        bg: null,
        bgHover: null,
        fg: null,
      },
    },
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    pill: null,
  },
  shadow: {
    sm: null,
    md: null,
    lg: null,
  },
  typography: {
    family: {
      sans: null,
      mono: null,
    },
    size: {
      sm: null,
      md: null,
      lg: null,
      xl: null,
    },
    weight: {
      regular: null,
      medium: null,
      semibold: null,
      bold: null,
    },
    lineHeight: {
      sm: null,
      md: null,
      lg: null,
    },
  },
  motion: {
    duration: {
      fast: null,
      normal: null,
      slow: null,
    },
    easing: {
      standard: null,
      emphasized: null,
    },
  },
});

