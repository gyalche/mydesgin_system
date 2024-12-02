import React from 'react';
import Spinner from 'components/Molecules/Loading';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Molecules',
  component: Spinner,
};

export const Loading = {
  title: 'loading',
  component: Spinner,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=2826-1795&mode=design&t=973V53j1FkUyBkzs-0',
    },
  },
  argTypes: {
    size: {
      description: 'Choose the size of the icons, available size are xlarge, lage, medium, small.',
      control: { type: 'select' },
      options: ['xlarge', 'large', 'medium', 'small'],
    },
    invert: {
      description: 'Invert the color',
      control: { type: 'boolean' },
    }
  },
  args: {
    size: 'xlarge',
    invert: false,
  },
  render: (args) => {
    const colors = [
      'var(--rds-color-neutral-6)',
      'var(--rds-color-primary-1-intense)',
      'var(--rds-color-secondary-1-intense)',
      'var(--rds-color-secondary-3-intense)',
      'var(--rds-color-tertiary-2-intense)'
    ];

    return (
      <Layout.Flex h="100vh" alignItems="center" justifyContent="center">
        {colors.map((color, index) => (
          <Layout.Item w="150px">
            <Spinner key={index} {...args} color={color} />
          </Layout.Item>
        ))}
     </Layout.Flex>
    );
  }
};
