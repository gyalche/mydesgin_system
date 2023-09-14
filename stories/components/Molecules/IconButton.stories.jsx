import React from 'react';
import IconButton from 'src/components/Molecules/IconButton';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules',
};

export const IconButtons =  {
  title: 'IconButtons',
  component: IconButton,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  argTypes: {
    compact: {
      description: 'Change the height of the button',
      control: { type: 'boolean' }  
    },
    iconName: {
      description: 'name of the Icon from the Icons list',
      control: { type: 'text'}
    },
    w: {
      description: 'Width of the button, must include %, px etc',
      control: { type: 'text' }
    },
    text: {
      description: 'Set the text content of the icon button, but it doesnt need to have',
      control: { type: 'text' }
    },
    position: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
    }
  },
  args:{
    compact: false,
    w: 'auto',
    iconName: 'navigation-users',
  },
  render: (args) => {
    return  (
      <Layout.Block>
        <Layout.Item mt="20px">
          <IconButton.Primary {...args} ></IconButton.Primary>
        </Layout.Item>
        <Layout.Item mt="20px">
          <IconButton.Secondary {...args} ></IconButton.Secondary>
        </Layout.Item>
        <Layout.Item mt="20px">
          <IconButton.Danger {...args} ></IconButton.Danger>
        </Layout.Item>
        <Layout.Item mt="20px">
          <IconButton.Warning {...args} ></IconButton.Warning>
        </Layout.Item>
        <Layout.Item mt="20px">
          <IconButton.Link {...args} ></IconButton.Link>
        </Layout.Item>
        <Layout.Item mt="20px">
          <IconButton.SubtleLink {...args} ></IconButton.SubtleLink>
        </Layout.Item>
      </Layout.Block>
    );
  }
};
