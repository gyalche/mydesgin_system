import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Receptionist Design System',
  brandUrl: 'https://receptionist.jp',
  brandImage: 'https://receptionist.jp/wp-content/themes/receptionist.jp/img/img-logo-reception.svg',
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
