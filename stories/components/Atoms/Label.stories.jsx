import React from 'react';
import Label from 'components/Atoms/Label';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
  component: Label,
};

export const Labels =  {
  title: 'Label',
  component: Label,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6073-10769&mode=design&t=10zB8cK7Dj60yRZA-0'
    }
  },
  argTypes: {
    content: {
      name: 'Label Content',
      description: 'Content of the Label',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Disabled state or not',
      control: { type: 'boolean'}
    }
  },
  args:{
    content: 'Label',
    disabled: false,
  },
  render: (args) => {
    return  (
      <Layout.Block>
        <Layout.Item>
          <Label {...args}>{args.content}</Label>
        </Layout.Item>

      </Layout.Block>
    );
  }
};
