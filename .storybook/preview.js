/** @type { import('@storybook/react').Preview } */
import 'shared/css/fonts.css';
import 'shared/css/globalStyle.css';
import 'shared/css/variables.css';
import 'stories/customColors.css';

const preview = {
  parameters: {
    layout: 'centered',
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      }
    },
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
