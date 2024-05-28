import React from 'react';
import Typography from 'components/Atoms/Typography';

export default {
  title: 'Atoms',
};

export const Typographies =  {
  title: 'Typographies',
  component: Typography,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev'
    }
  },
  argTypes: {
    level: {
      name: 'Level',
      control: 'select',
      description: 'Select the font size with the appropriate level tag',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'p1', 'p2', 'p3', 'p4'],
    },
  },
  args:{
    level: 'p1',
  },
  render: (args) => {
    return  (
      <Typography {...args}>Receptionist is Great</Typography>
    );
  }
};
