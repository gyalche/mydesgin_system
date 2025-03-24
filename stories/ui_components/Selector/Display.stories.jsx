import DefaultDisplayComponent from 'components/Molecules/Selector/DefaultDisplay';

const meta = {
  component: DefaultDisplayComponent,
  tags: ['!dev'],
};

export default meta;

export const Selector = {
  argTypes: {
    h: {
      control: 'text',
      description: 'Sets the selector height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    selectedItem: {
      description: 'The currently selected.',
      control: { type: ['text', 'object'] },
    },
    label: {
      description: 'The label that can be displayed.',
      control: { type: 'text' },
    },
    isOpen: {
      control: 'boolean',
      description: 'If true, the dropdown would be displayed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};
