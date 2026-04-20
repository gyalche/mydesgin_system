import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Hamro Design System',
  brandUrl: '/',
  brandImage: null,
  brandTarget: '_self',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  //
  colorPrimary: '#57C3EA',
  colorSecondary: '#00AFD5',

  // UI
  appBg: '#FFFFFF',
  appContentBg: '#FFFFFF',
  appBorderColor: '#57C3EA',
  appBorderRadius: 4,

  // Text colors
  textColor: '#484f63',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#00AFD5',
  barSelectedColor: '#00738b',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#57C3EA',
  inputTextColor: '#484f63',
  inputBorderRadius: 4,
});
