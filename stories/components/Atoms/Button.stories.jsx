import React from 'react';
import Button from 'src/components/Atoms/Button';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Atoms',
};

export const Buttons =  {
  title: 'Atoms',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  argTypes: {
    content: {
      name: 'Button Content',
      description: 'Content of the Button',
      control: { type: 'text' },
    },
    compact: {
      name: 'Compact Mode',
      description: 'Change the height of the button',
      control: { type: 'boolean' }  
    },
    w: {
      name: 'Width',
      description: 'Width of the button, must include %, px etc',
      control: { type: 'text' }
    }
  },
  args:{
    compact: false,
    w: 'auto'
  },
  render: (args) => {
    return  (
      <Layout.Flex justifyContent='center' alignItems='center'>
        <Layout.Item flex="4"></Layout.Item>
        <Layout.Item flex="3">
          <Layout.Block>
            <Layout.Item mt="20px">
              <Button {...args}>{args.content || 'Primary'}</Button>
            </Layout.Item>
            <Layout.Item mt="20px">
              <Button.Secondary {...args}>{args.content || 'Secondary'}</Button.Secondary>
            </Layout.Item>
            <Layout.Item mt="20px">
              <Button.Danger {...args}>{args.content || 'Danger'}</Button.Danger>
            </Layout.Item>
            <Layout.Item mt="20px">
              <Button.Warning {...args}>{args.content || 'Warning'}</Button.Warning>
            </Layout.Item>
            <Layout.Item mt="20px">
              <Button.Link {...args}>{args.content || 'Link'}</Button.Link>
            </Layout.Item>
            <Layout.Item mt="30px">
              <Button.SubtleLink {...args}>{args.content || 'SubtleLink'}</Button.SubtleLink>
            </Layout.Item>
          </Layout.Block>
        </Layout.Item>
        <Layout.Item flex="4"></Layout.Item>
      </Layout.Flex>
    );
  }
};
