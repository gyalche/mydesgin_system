import React from 'react';
import Status from 'src/components/Molecules/Status';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules',
};

export const StatusMessage =  {
  title: 'Status',
  component: Status,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev'
    }
  },
  argTypes: {
    isValid: {
      name: 'Is Valid',
      description: 'Put it in Valid or invalid state',
      control: { type: 'boolean' }
    }
  },
  args:{
    isValid: true,
  },
  render: (args) => {
    return  ( 
      <Layout.Block>
        <Layout.Item>
          <Status {...args} >Initial State</Status>
        </Layout.Item>
        <Layout.Item>
          <Status.Validation {...args} >Validation State</Status.Validation>
        </Layout.Item>
      </Layout.Block>
    );
  }
};
