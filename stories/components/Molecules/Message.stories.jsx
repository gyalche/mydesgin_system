import React from 'react';
import Message from 'src/components/Molecules/Message';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules/Messages',
};

export const Messages =  {
  title: 'Messages',
  component: Message,
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
          <Message {...args} >Initial State</Message>
        </Layout.Item>
        <Layout.Item>
          <Message.Validation {...args} >Validation State</Message.Validation>
        </Layout.Item>
      </Layout.Block>
    );
  }
};
