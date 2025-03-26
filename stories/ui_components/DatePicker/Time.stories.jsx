import DatePicker from 'components/Molecules/DateTimePicker';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/DatePicker/Time',
  component: DatePicker.Time,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['tabIndex', 'initialValue', 'dateTimeDefault'],
    },
  },
};

export default meta;

export const Time = {
  argTypes: {
    is12Hour: {
      control: 'boolean',
      description: 'Displays time in 12-hour format with AM/PM.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    step: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Time interval in minutes for the minute selection.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 15 },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that is called when the time selection changes.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the time picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the time input field.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hh:mm' },
      },
    },
    isRangePicker: {
      control: 'boolean',
      description: 'Enables time range selection with start and end times.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
  },
  args: {
    is12Hour: false,
    step: 15,
    disabled: false,
    placeholder: 'hh:mm',
    isRangePicker: false,
  },
  render: args => (
    <Layout.Block minH="360px">
      <DatePicker.Time {...args} />
    </Layout.Block>
  ),
};

export const TimeRange = {
  ...Time,
  args: {
    ...Time.args,
    isRangePicker: true,
  },
};

export const Time12Hour = {
  ...Time,
  args: {
    ...Time.args,
    is12Hour: true,
  },
};

export const CustomStep = {
  ...Time,
  args: {
    ...Time.args,
    step: 5,
  },
};
