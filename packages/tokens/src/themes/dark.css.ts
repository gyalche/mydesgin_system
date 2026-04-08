import { createTheme } from '@vanilla-extract/css';
import { themeVars } from './contract.css';

export const darkThemeClass = createTheme(themeVars, {
  color: {
    bg: {
      canvas: '#0f1218',
      surface: '#171b23',
      subtle: '#202632',
      inverse: '#f7f8fb',
    },
    fg: {
      default: '#f7f8fb',
      muted: '#d0d5dd',
      subtle: '#98a2b3',
      inverse: '#171a21',
    },
    border: {
      default: '#2b3445',
      subtle: '#242c3a',
      strong: '#3b465b',
      focus: '#6ea8fe',
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
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgb(0 0 0 / 0.24)',
    md: '0 8px 20px rgb(0 0 0 / 0.36)',
    lg: '0 16px 32px rgb(0 0 0 / 0.48)',
  },
  typography: {
    family: {
      sans: '"Inter", "Helvetica Neue", sans-serif',
      mono: '"SFMono-Regular", monospace',
    },
    size: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
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
    },
  },
  motion: {
    duration: {
      fast: '120ms',
      normal: '180ms',
      slow: '280ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1.12)',
    },
  },
});

