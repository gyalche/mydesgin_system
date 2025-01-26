import React from 'react';

import Input from 'components/Atoms/Input';

export default {
  title: 'Design System/Atoms',
  component: Input,
};

export const Inputs = {
  title: 'Inputs',
  component: Input,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6073-9924&mode=design&t=Pzj3wd7ejShNo1a8-0',
    },
  },
  argTypes: {
    w: {
      name: 'Width',
      description: 'Width of the Input, must include %, px etc',
      control: { type: 'text' },
    },
    compact: {
      name: 'Compact',
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'set if the component is disabled or not',
      control: { type: 'boolean' },
    },
  },
  args: {
    w: 'auto',
    compact: false,
  },
  render: args => (
    <Input {...args} placeholder="Active" />
  ),
};
