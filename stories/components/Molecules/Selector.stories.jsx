import React from 'react';
import Selector from 'src/components/Molecules/Selector';

export default {
  title: 'Molecules',
};

export const Selectors = {
  title: 'Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6146%3A18832&mode=dev',
    },
  },
  argTypes: {
    w: {
      name: 'Width',
      description: 'Width of the Selector, must include %, px etc',
      control: { type: 'text' },
    },
    h: {
      name: 'Height',
      description: 'Height of the Selector, must include %, px etc',
      control: { type: 'text' },
    },
    dropdownHeight: {
      name: 'Dropdown Height',
      description: 'Height of the Dropdown, must include %, px etc',
      control: { type: 'text' },
    },
    options: {
      name: 'List of items',
      description:
        'Array of objects with label and value keys for the Dropdown]',
      control: { type: 'array' },
    },
    name: {
      name: 'Name',
      description: 'Name for the component',
      control: { type: 'text' },
    },
  },
  args: {
    w: '240px',
    h: '40px',
    dropdownHeight: '200px',
    options: [
      { label: 'Black', value: 1 },
      { label: 'Red', value: 2 },
      { label: 'Green', value: 3 },
      { label: 'Blue', value: 4 },
      { label: 'Orange', value: 5 },
      { label: 'Purple', value: 6 },
      { label: 'Pink', value: 7 },
      { label: 'Orchid', value: 8 },
      { label: 'Aqua', value: 9 },
      { label: 'Lime', value: 10 },
      { label: 'Gray', value: 11 },
      { label: 'Brown', value: 12 },
      { label: 'Teal', value: 13 },
      { label: 'Skyblue', value: 14 },
    ],
    optionsComponent: Selector.Option,
    onChange: () => {},
    name: 'selector',
  },
  render: (args) => {
    return <Selector {...args} />;
  },
};
