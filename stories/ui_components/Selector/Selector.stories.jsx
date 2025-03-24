import SelectorComponent from 'components/Molecules/Selector';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Selector',
  component: SelectorComponent,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['onChange', 'value'],
    },
  },
};

export default meta;

export const Selector = {
  argTypes: {
    display: {
      control: { type: 'select' },
      options: {
        'Selector (default)': null,
        'Option Select Display': SelectorComponent.OptionSelectDisplay,
      },
      description: 'Component to render the main selector display.[Display](..?path=/docs/ui-components-selector--docs#display)',
      table: {
        type: { summary: ['Component', 'Node'] },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the selector height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    w: {
      control: 'text',
      description: 'Sets the selector width (e.g., `100px`, `50%`).',
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
    dropdownHeight: {
      control: 'text',
      description: 'Sets the selector\'s dropdown height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      description: 'Array of items to display within the dropdown',
      control: { type: 'array' },
    },
    optionsComponent: {
      control: false,
      description: 'Component to render when the options are shown inside the dropdown. [Option](..?path=/docs/ui-components-selector--docs#option)',
      table: {
        type: { summary: ['Component', 'Node'] },
      },
    },
    label: {
      control: 'text',
      description: 'Sets the selector\'s display label, if the display supports label.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'The name to identify the field.',
      control: { type: 'text' },
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
  },
  args: {
    h: '40px',
    w: '240px',
    mt: '0',
    mr: '0',
    mb: '0',
    ml: '0',
    dropdownHeight: '200px',
    options: [
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
    ],
    label: 'Test',
    name: '',
    value: null,
    onChange: () => {},
    display: null,
  },
  render: ({ content, ...args }) => (
    <Layout.Block minH="300px">
      <SelectorComponent {...args} />
    </Layout.Block>
  ),
};
