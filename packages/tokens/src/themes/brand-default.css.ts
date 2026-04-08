import { createTheme } from '@vanilla-extract/css';
import { themeVars } from './contract.css';

export const brandDefaultThemeClass = createTheme(themeVars, {
  color: {
    bg: {
      canvas: '#f7f8fb',
      surface: '#ffffff',
      subtle: '#eef1f6',
      inverse: '#171a21',
    },
    fg: {
      default: '#171a21',
      muted: '#4f5868',
      subtle: '#697386',
      inverse: '#ffffff',
    },
    border: {
      default: '#d7dce5',
      subtle: '#e7ebf1',
      strong: '#b9c2d0',
      focus: '#0f766e',
    },
    accent: {
      brand: {
        bg: '#0f766e',
        bgHover: '#0b5d57',
        fg: '#ffffff',
      },
      danger: {
        bg: '#d92d20',
        bgHover: '#b42318',
        fg: '#ffffff',
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
    sm: '0 1px 2px rgb(16 24 40 / 0.06)',
    md: '0 8px 20px rgb(16 24 40 / 0.10)',
    lg: '0 16px 32px rgb(16 24 40 / 0.16)',
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

