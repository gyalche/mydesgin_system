/** @type { import('@storybook/react').Preview } */
import 'src/shared/css/globalStyle.css';
import 'src/shared/css/variables.css';

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
