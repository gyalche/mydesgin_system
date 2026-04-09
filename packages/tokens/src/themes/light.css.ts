import { createTheme } from '@vanilla-extract/css';
import { themeVars } from './contract.css';

export const lightThemeClass = createTheme(themeVars, {
  color: {
    bg: {
      canvas: '#f7f8fb',
      surface: '#ffffff',
      elevated: '#ffffff',
      subtle: '#eef1f6',
      inverse: '#171a21',
      overlay: 'rgb(9 12 18 / 0.48)',
    },
    fg: {
      default: '#171a21',
      muted: '#4f5868',
      subtle: '#697386',
      inverse: '#ffffff',
      accent: '#1459d9',
    },
    border: {
      default: '#d7dce5',
      subtle: '#e7ebf1',
      strong: '#b9c2d0',
      focus: '#2b6ef2',
    },
    status: {
      info: {
        bg: '#2563eb',
        soft: '#e8f0ff',
        border: '#bfd3ff',
        fg: '#133a94',
      },
      success: {
        bg: '#0f9f6e',
        soft: '#e8fbf2',
        border: '#b8efd5',
        fg: '#0b6b49',
      },
      warning: {
        bg: '#d97706',
        soft: '#fff5e8',
        border: '#ffd6a6',
        fg: '#9a5b08',
      },
      danger: {
        bg: '#d92d20',
        soft: '#fff0ee',
        border: '#f5beb8',
        fg: '#a22118',
      },
    },
    accent: {
      brand: {
        bg: '#2b6ef2',
        bgHover: '#1f5dd4',
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
    sm: '0 1px 2px rgb(16 24 40 / 0.06)',
    md: '0 8px 20px rgb(16 24 40 / 0.10)',
    lg: '0 16px 32px rgb(16 24 40 / 0.16)',
    xl: '0 28px 80px rgb(16 24 40 / 0.18)',
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
