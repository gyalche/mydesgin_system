/** @type { import('@storybook/react-vite').StorybookConfig } */
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {},
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          shared: '/src/shared',
          components: '/src/components',
          stories: '/stories'
        },
      },
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;
