/** @type { import('@storybook/react').Preview } */
import 'shared/css/fonts.css';
import 'shared/css/globalStyle.css';
import 'shared/css/variables.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
