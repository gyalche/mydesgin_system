/** @type { import('@storybook/react-vite').StorybookConfig } */
const { mergeConfig } = require('vite');

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          shared: '/src/shared',
          components: '/src/components',
        },
      },
    });
  },
};
export default config;
