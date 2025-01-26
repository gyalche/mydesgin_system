import React from 'react';

import Toggle from 'components/Molecules/Toggle';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Molecules/Toggles',
};

export const Toggles = {
  title: 'Toggles',
  component: Toggle,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&mode=design&t=4i1BbgZioXcreUJq-0',
    },
  },
  argTypes: {
    w: {
      name: 'Width',
      description: 'Width of the component in number',
      control: {
        type: 'number',
      },
    },
    labels: {
      name: 'Labels',
      description: 'Array of labels',
      control: {
        type: 'array',
        separator: ',',
      },
    },
    colors: {
      name: 'Colors',
      description: 'Array of colors for enabled and disabled mode',
      control: {
        type: 'array',
        separator: ',',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disabled mode',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    w: 78,
    disabled: false,
    labels: ['Online', 'Offline'],
    colors: ['var(--rds-color-primary-1-normal)', 'var(--rds-color-neutral-5)'],
  },
  render: args => (
    <Layout.Block>
      <Layout.Item>
        <Toggle {...args} />
      </Layout.Item>
      <Layout.Item />
    </Layout.Block>
  ),
};
