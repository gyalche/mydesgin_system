import React from 'react';

import Divider from 'components/Atoms/Divider';

export default {
  title: 'Design System/Atoms',
  component: Divider,
};

export const Dividers = {
  title: 'Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826-1318&t=8aOPFh3x0DYZkSCs-0',
    },
  },
  argTypes: {
    w: {
      name: 'width',
      description: 'Width of the devider',
      control: { type: 'number' },
    },
    ml: {
      name: 'margin left',
      description: 'Margin left for the divider',
      control: { type: 'number' },
    },
    mr: {
      name: 'margin right',
      description: 'Margin rgiht for the divider',
      control: { type: 'number' },
    },
    mb: {
      name: 'margin bottom',
      description: 'Margin bottom for the divider',
      control: { type: 'number' },
    },
    mt: {
      name: 'margin top',
      description: 'Margin top for the divider',
      control: { type: 'number' },
    },
  },
  args: {
    w: 1184,
    ml: 0,
    mr: 0,
    mt: 12,
    mb: 12,
  },
  render: args => (
    <Divider {...args} />
  ),
};
