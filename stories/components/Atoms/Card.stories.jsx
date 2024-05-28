import React from 'react';
import Card from 'components/Atoms/Card';

export default {
  title: 'Atoms',
};

export const Cards =  {
  title: 'Cards',
  component: Card,
  parameters: {
    background: { default: 'dark' },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/CQ57ObaAdQOh2XOO3VWKfh/receptionist?type=design&node-id=6158-58679&mode=design&t=Z2QI8DlFdhr0rcZr-0'
    }
  },
  argTypes: {
    padding: {
      name: 'Padding',
      description: 'Padding of the Card, This should be changed on very specific conditions',
      control: { type: 'text' }
    },
  },
  args:{
    padding: '8px',
  },
  render: (args) => {
    return  (
      <Card {...args} >Content</Card>
    );
  }
};
