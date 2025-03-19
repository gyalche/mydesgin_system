import CardComponent from 'components/Atoms/Card';

const meta = {
  title: 'Layout Components/Card',
  component: CardComponent,
  tags: ['!dev'],
};

export default meta;

export const Card = {
  argTypes: {
    padding: {
      description: 'Sets the card internal padding (e.g., `100px`, `50%`).',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '8px' },
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
    w: {
      control: 'text',
      description: 'Sets the button width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    padding: '8px',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    w: 'auto',
  },
  render: ({ ...args }) => (
    <CardComponent {...args}>
      Card content
    </CardComponent>
  ),
};
