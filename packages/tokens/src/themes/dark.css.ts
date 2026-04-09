import { createTheme } from '@vanilla-extract/css';
import { themeVars } from './contract.css';

export const darkThemeClass = createTheme(themeVars, {
  color: {
    bg: {
      canvas: '#0f1218',
      surface: '#171b23',
      elevated: '#1e2430',
      subtle: '#202632',
      inverse: '#f7f8fb',
      overlay: 'rgb(0 0 0 / 0.62)',
    },
    fg: {
      default: '#f7f8fb',
      muted: '#d0d5dd',
      subtle: '#98a2b3',
      inverse: '#171a21',
      accent: '#8abbff',
    },
    border: {
      default: '#2b3445',
      subtle: '#242c3a',
      strong: '#3b465b',
      focus: '#6ea8fe',
    },
    status: {
      info: {
        bg: '#6ea8fe',
        soft: '#18263f',
        border: '#32507d',
        fg: '#cfe1ff',
      },
      success: {
        bg: '#34d399',
        soft: '#132c24',
        border: '#1f5b46',
        fg: '#bef5df',
      },
      warning: {
        bg: '#fbbf24',
        soft: '#34260e',
        border: '#6c5218',
        fg: '#ffe6a5',
      },
      danger: {
        bg: '#f97066',
        soft: '#351716',
        border: '#7a3230',
        fg: '#ffd1cb',
      },
    },
    accent: {
      brand: {
        bg: '#6ea8fe',
        bgHover: '#8abbff',
        fg: '#0f1218',
      },
      danger: {
        bg: '#f97066',
        bgHover: '#ff8a80',
        fg: '#0f1218',
      },
    },
  },
  space: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgb(0 0 0 / 0.24)',
    md: '0 8px 20px rgb(0 0 0 / 0.36)',
    lg: '0 16px 32px rgb(0 0 0 / 0.48)',
    xl: '0 28px 80px rgb(0 0 0 / 0.56)',
  },
  typography: {
    family: {
      display: '"Iowan Old Style", "Palatino Linotype", serif',
      sans: '"Inter", "Helvetica Neue", sans-serif',
      mono: '"SFMono-Regular", monospace',
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '3rem',
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      sm: '1.25rem',
      md: '1.5rem',
      lg: '1.75rem',
      xl: '2.25rem',
    },
  },
  motion: {
    duration: {
      fast: '120ms',
      normal: '180ms',
      slow: '280ms',
      slower: '420ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1.12)',
    },
  },
  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    overlay: '1200',
    modal: '1300',
    popover: '1400',
    toast: '1500',
  },
});
