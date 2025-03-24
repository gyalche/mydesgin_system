import PillComponent from 'components/Atoms/Pill';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Pill',
  component: PillComponent,
  tags: ['!dev'],
};

export default meta;

export const Pill = {
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
      options: {
        default: undefined,
        danger: 'danger',
        blue: 'blue',
        green: 'green',
        yellow: 'yellow',
        red: 'red',
        violet: 'violet',
        teal: 'teal',
        pink: 'pink',
        orange: 'orange',
      },
      description: 'Defines the pill appearance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
    fontSize: {
      control: 'text',
      description: 'Sets the badge font size (e.g., `14px`, `10px`).',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    content: 'Pill',
    appearance: undefined,
    fontSize: '12px',
  },
  render: ({ content, ...args }) => (
    <PillComponent {...args}>{content}</PillComponent>
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Block>
      <Layout.Item mt="20px">
        <PillComponent>Default</PillComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Danger>Danger</PillComponent.Danger>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Blue>Blue</PillComponent.Blue>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Green>Green</PillComponent.Green>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Yellow>Yellow</PillComponent.Yellow>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Red>Red</PillComponent.Red>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Violet>Violet</PillComponent.Violet>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Teal>Teal</PillComponent.Teal>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Pink>Pink</PillComponent.Pink>
      </Layout.Item>
      <Layout.Item mt="20px">
        <PillComponent.Orange>Orange</PillComponent.Orange>
      </Layout.Item>
    </Layout.Block>
  ),
};
