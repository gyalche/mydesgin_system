import React from 'react';
import SearchInput from 'src/components/Molecules/SearchInput';

export default {
  title: 'Molecules',
};

export const SearchInputs = {
  title: 'SearchInputs',
  component: SearchInput,
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
      description: 'Width of the SearchInput, must include %, px etc',
      control: { type: 'text' },
    },
    icon: {
      name: 'Icon name',
      description: 'Name of the icon to be displayed',
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
    invalid: {
      name: 'Invalid',
      description: 'set if the component is invalid or not',
      control: { type: 'boolean' },
    },
  },
  args: {
    w: 'auto',
    compact: false,
    icon: 'action-loupe',
  },
  render: args => {
    return <SearchInput {...args} placeholder="Placeholder" />;
  },
};
