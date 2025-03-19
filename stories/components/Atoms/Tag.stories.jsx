import React from 'react';

import Tag from 'components/Atoms/Tags';
import Avatar from 'components/Atoms/Avatar';
import * as Layout from 'components/Atoms/Layout';

const onCloseClicked = () => {
  alert('Close clicked!');
};

export default {
  title: 'Design System/Atoms',
};

export const Tags = {
  title: 'Tags',
  component: Tag,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826%3A1609&mode=dev',
    },
  },
  argTypes: {
    content: {
      name: 'Value',
      description: 'Value to be displayed on the tag',
      control: { type: 'text' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the tag',
      control: { type: 'boolean' },
    },
  },
  args: {
    content: 'Effect',
    disabled: false,
  },

  render: args => (
    <Layout.Flex direction="column">
      <Layout.Item mt="20px">
        <Tag {...args} onCloseClick={onCloseClicked} />
      </Layout.Item>
      <Layout.Item mt="20px">
        <Tag
          content={(
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar name="D" size="small" />
              <span style={{ marginLeft: '8px' }}>Effect</span>
            </div>
          )}
          onCloseClick={onCloseClicked}
        />
      </Layout.Item>
      <Layout.Item mt="20px">
        <Tag content={args.content} />
      </Layout.Item>
    </Layout.Flex>
  ),
};
