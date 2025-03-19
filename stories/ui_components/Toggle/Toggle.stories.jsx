import ToggleComponent from 'components/Molecules/Toggle';

import { getCSSVariable } from '../../utils/color';

const meta = {
  title: 'UI Components/Toggle',
  component: ToggleComponent,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['tabIndex', 'checked'],
    },
  },
};

export default meta;

export const Toggle = {
  argTypes: {
    w: {
      control: 'text',
      description: 'Sets the toggle width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the toggle width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
      table: {
        type: { summary: '{ value: bool, checked: bool, onChange: func }' },
        defaultValue: { summary: null },
      },
    },
    labels: {
      description: 'Text labels that will be shown inside the toggle.',
      control: { type: 'array' },
    },
    colors: {
      description: 'Colors to customize on/off states.',
      control: false,
    },
    id: {
      description: 'Text id to identify the toggle.',
      control: { type: 'text' },
    },
    name: {
      description: 'Text name to identify the toggle.',
      control: { type: 'text' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the toggle.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the toggle when used directly (not through FormField).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that is called when the toggle state changes.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'null' },
      },
    },
  },
  args: {
    w: '78px',
    h: '24px',
    id: 'Toggle-id',
    name: 'Toggle-name',
    labels: ['Online', 'Offline'],
    colors: [getCSSVariable('--rds-color-primary-1-normal'), getCSSVariable('--rds-color-neutral-5')],
    disabled: false,
    checked: false,
  },
  render: ({ content, ...args }) => (
    <ToggleComponent {...args} />
  ),
};
