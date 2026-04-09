import { createThemeContract } from '@vanilla-extract/css';

export const themeVars = createThemeContract({
  color: {
    bg: {
      canvas: null,
      surface: null,
      elevated: null,
      subtle: null,
      inverse: null,
      overlay: null,
    },
    fg: {
      default: null,
      muted: null,
      subtle: null,
      inverse: null,
      accent: null,
    },
    border: {
      default: null,
      subtle: null,
      strong: null,
      focus: null,
    },
    status: {
      info: {
        bg: null,
        soft: null,
        border: null,
        fg: null,
      },
      success: {
        bg: null,
        soft: null,
        border: null,
        fg: null,
      },
      warning: {
        bg: null,
        soft: null,
        border: null,
        fg: null,
      },
      danger: {
        bg: null,
        soft: null,
        border: null,
        fg: null,
      },
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
    xxs: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    '3xl': null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
    pill: null,
  },
  shadow: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  typography: {
    family: {
      display: null,
      sans: null,
      mono: null,
    },
    size: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
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
      xl: null,
    },
  },
  motion: {
    duration: {
      fast: null,
      normal: null,
      slow: null,
      slower: null,
    },
    easing: {
      standard: null,
      emphasized: null,
    },
  },
  breakpoint: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  zIndex: {
    base: null,
    dropdown: null,
    sticky: null,
    overlay: null,
    modal: null,
    popover: null,
    toast: null,
  },
});
