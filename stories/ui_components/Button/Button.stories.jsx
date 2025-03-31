import ButtonComponent from 'components/Atoms/Button';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Buttons/Button',
  component: ButtonComponent,
  tags: ['!dev'],
};

export default meta;

export const Button = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
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
    content: 'Button',
    appearance: 'primary',
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
  render: () => (
    <Layout.Block>
      <Layout.Item mt="20px">
        <ButtonComponent>Primary</ButtonComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Secondary>Secondary</ButtonComponent.Secondary>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Danger>Danger</ButtonComponent.Danger>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Warning>Warning</ButtonComponent.Warning>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Subtle>Subtle</ButtonComponent.Subtle>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.Link>Link</ButtonComponent.Link>
      </Layout.Item>
      <Layout.Item mt="20px">
        <ButtonComponent.SubtleLink>SubtleLink</ButtonComponent.SubtleLink>
      </Layout.Item>
    </Layout.Block>
  ),
};
