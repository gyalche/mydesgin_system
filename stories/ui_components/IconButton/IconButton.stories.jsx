import ButtonComponent from 'components/Molecules/IconButton';
import * as Layout from 'components/Atoms/Layout';
import icons from 'shared/css/icons.module.css';

const meta = {
  title: 'UI Components/Buttons/Icon Button',
  component: ButtonComponent,
  tags: ['!dev'],
};

export default meta;

const iconList = Object.getOwnPropertyNames(icons).map(key => key.substring(4, key.length));

export const Button = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: 'Text content to display.',
      control: { type: 'text' },
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'warning', 'danger', 'subtle', 'link', 'subtleLink'],
      description: 'Defines the button’s appearance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    iconName: {
      control: 'select',
      options: iconList,
      description: 'Icon name to display in the button. You can check the [reference here](..?path=/docs/general-assets--docs#icons).',
      table: {
        type: { summary: 'string' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'If true, the button has a smaller height and padding.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    w: {
      control: 'text',
      description: 'Sets the button width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    mt: {
      control: 'text',
      description: 'Margin-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      control: 'text',
      description: 'Margin-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      control: 'text',
      description: 'Margin-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      control: 'text',
      description: 'Margin-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
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
    text: 'Button',
    appearance: 'primary',
    iconName: iconList[0],
    compact: false,
    disabled: false,
    w: 'auto',
    mt: '0px',
    mr: '0px',
    mb: '0px',
    ml: '0px',
  },
  render: ({ content, ...args }) => (
    <ButtonComponent {...args}>{content}</ButtonComponent>
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Block>
      <Layout.Item mt="20px">
        <ButtonComponent iconName="navigation-users" text="Primary" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Secondary iconName="navigation-users" text="Secondary" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Danger iconName="navigation-users" text="Danger" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Warning iconName="navigation-users" text="Warning" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Subtle iconName="navigation-users" text="Subtle" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Link iconName="navigation-users" text="Link" />
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.SubtleLink iconName="navigation-users" text="SubtleLink" />
      </Layout.Item>
    </Layout.Block>
  ),
};
