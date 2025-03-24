import DropdownComponent from 'components/Atoms/Dropdown';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'Layout Components/Dropdown',
  component: DropdownComponent,
  tags: ['!dev'],
};

export default meta;

const demoOptions = [
  { label: 'Black', value: 1 },
  { label: 'Red', value: 2 },
  { label: 'Green', value: 3 },
  { label: 'Blue', value: 4 },
  { label: 'Orange', value: 5 },
  { label: 'Purple', value: 6 },
  { label: 'Pink', value: 7 },
  { label: 'Orchid', value: 8 },
  { label: 'Aqua', value: 9 },
  { label: 'Lime', value: 10 },
  { label: 'Gray', value: 11 },
  { label: 'Brown', value: 12 },
  { label: 'Teal', value: 13 },
  { label: 'Skyblue', value: 14 },
];

export const Dropdown = {
  argTypes: {
    w: {
      control: 'text',
      description: 'Sets the dropdown width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '240px' },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the dropdown height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '200px' },
      },
    },
    p: {
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
    isOpen: {
      control: 'boolean',
      description: 'If true, the dropdown would be displayed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    border: {
      control: 'text',
      description: 'Sets the layout border (e.g., `1px solid black`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px solid var(--rds-color-neutral-3)' },
      },
    },
    boxShadow: {
      control: false,
      description: 'Sets the dropdown shadow. [This is pending to be updated]',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0 4px 8px 0 rgba(156, 168, 184, 0.48)' },
      },
    },
    scroll: {
      control: 'boolean',
      description: 'If true, the dropdown would be scrollable if there\'s a defined height.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    overflowX: {
      control: 'select',
      options: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
      description: 'Sets the dropdown overflow-x.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'visible' },
      },
    },
    right: {
      control: 'text',
      description: 'Right offset (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    children: {
      description: 'Components or content to display inside the dropdown.',
      control: false,
      table: {
        type: { summary: ['html'] },
      },
    },
  },
  args: {
    w: '240px',
    h: '200px',
    p: '0',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    isOpen: true,
    border: '1px solid var(--rds-color-neutral-3)',
    boxShadow: '0 4px 8px 0 rgba(156, 168, 184, 0.48)',
    scroll: true,
    overflowX: 'visible',
    right: 'auto',
  },
  render: ({ ...args }) => (
    <Layout.Block minH="350px">
      <DropdownComponent {...args}>
        Dropdown demo content
        {demoOptions.map(item => (
          <div key={item.value}>{item.label}</div>
        ))}
      </DropdownComponent>
    </Layout.Block>
  ),
};
