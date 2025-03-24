import TagComponent from 'components/Atoms/Tag';
import Avatar from 'components/Atoms/Avatar';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Tag',
  component: TagComponent,
  tags: ['!dev'],
};

export default meta;

export const Tag = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      description: 'Text content to display.',
      control: { type: 'text' },
    },
    onCloseClick: {
      description: 'Action triggered when closing the tag.',
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    content: 'Badge',
    disabled: false,
  },
  render: ({ ...args }) => (
    <TagComponent {...args} />
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Flex direction="column">
      <Layout.Item mt="20px">
        <TagComponent content="Content 1" onCloseClick={() => {}} />
      </Layout.Item>
      <Layout.Item mt="20px">
        <TagComponent
          content={(
            <Layout.Flex>
              <Avatar name="D" size="small" />
              <span style={{ marginLeft: '8px' }}>Effect</span>
            </Layout.Flex>
          )}
          onCloseClick={() => {}}
        />
      </Layout.Item>
    </Layout.Flex>
  ),
};
