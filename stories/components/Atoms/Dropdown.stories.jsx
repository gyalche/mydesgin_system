import React from 'react';
import Dropdown from 'components/Atoms/Dropdown';

export default {
  title: 'Design System/Atoms',
  component: Dropdown,
};

export const Dropdowns = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6146%3A18832&mode=dev',
    },
  },
  argTypes: {
    w: {
      name: 'Dropdown Width',
      description: 'Width of the Dropdown, must include %, px etc',
      control: { type: 'text' },
    },
    h: {
      name: 'Dropdown Height',
      description: 'Height of the Dropdown, must include %, px etc',
      control: { type: 'text' },
    },
    isOpen: {
      name: 'isOpen',
      description:
        'Sets the visibility property to visible (true) and hidden (false)',
      control: { type: 'boolean' },
    },
    scroll: {
      name: 'Scroll',
      description:
        'Sets the overflow-y property to auto (true) and hidden (false). If scroll is true we have height, otherwise min-height.',
      control: { type: 'boolean' },
    },
  },
  args: {
    w: '240px',
    h: '200px',
    isOpen: true,
    scroll: true,
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
  },
  render: (args) => {
    const { w, h, isOpen, scroll, options } = args;
    return (
      <Dropdown w={w} h={h} isOpen={isOpen} scroll={scroll}>
        {options.map((item) => (
          <div key={item.value}>{item.label}</div>
        ))}
      </Dropdown>
    );
  },
};
