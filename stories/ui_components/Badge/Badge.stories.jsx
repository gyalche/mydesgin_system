import BadgeComponent from 'components/Atoms/Badge';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Badge',
  component: BadgeComponent,
  tags: ['!dev'],
};

export default meta;

export const Badge = {
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
      options: ['blue', 'green', 'yellow', 'red', 'violet', 'teal', 'pink', 'orange'],
      description: 'Defines the badge appearance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'blue' },
      },
    },
    padding: {
      control: 'text',
      description: 'Sets the badge internal padding (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0 4px' },
      },
    },
    fontSize: {
      control: 'text',
      description: 'Sets the badge font size (e.g., `14px`, `10px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '12px' },
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
  },
  args: {
    content: 'Badge',
    appearance: 'blue',
    padding: '0 4px',
    fontSize: '12px',
    mt: '0px',
    mr: '0px',
    mb: '0px',
    ml: '0px',
  },
  render: ({ content, ...args }) => (
    <BadgeComponent {...args}>{content}</BadgeComponent>
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Block>
      <Layout.Item mt="20px">
        <BadgeComponent.Blue>Blue</BadgeComponent.Blue>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Green>Green</BadgeComponent.Green>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Yellow>Yellow</BadgeComponent.Yellow>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Red>Red</BadgeComponent.Red>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Violet>Violet</BadgeComponent.Violet>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Teal>Teal</BadgeComponent.Teal>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Pink>Pink</BadgeComponent.Pink>
      </Layout.Item>
      <Layout.Item mt="20px">
        <BadgeComponent.Orange>Orange</BadgeComponent.Orange>
      </Layout.Item>
    </Layout.Block>
  ),
};
