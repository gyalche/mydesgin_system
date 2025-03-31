import DividerComponent from 'components/Atoms/Divider';

const meta = {
  title: 'UI Components/Divider',
  component: DividerComponent,
  tags: ['!dev'],
};

export default meta;

export const Divider = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    w: {
      control: 'text',
      description: 'Sets the divider width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
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
    w: '300px',
    mt: '12px',
    mr: '0px',
    mb: '12px',
    ml: '0px',
  },
  render: ({ ...args }) => (
    <DividerComponent {...args} />
  ),
};
