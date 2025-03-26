import DatePicker from 'components/Molecules/DateTimePicker';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/DatePicker/DateTime',
  component: DatePicker.DateTime,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['tabIndex', 'initialValue', 'dateTimeDefault'],
    },
  },
};

export default meta;

export const DateTime = {
  argTypes: {
    isDoubleView: {
      control: 'boolean',
      description: 'Enables a double calendar view for easier date selection.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isRangePicker: {
      control: 'boolean',
      description: 'Enables date and time range selection with start and end values.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    is12Hour: {
      control: 'boolean',
      description: 'Displays time in 12-hour format with AM/PM.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ja-JP' },
      },
    },
    initialValue: {
      control: 'date',
      description: 'Initial date and time value or array of values for range selection.',
      table: {
        type: { summary: 'Date | Date[]' },
        defaultValue: { summary: 'null' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that is called when the selection changes.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the date time picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      control: 'object',
      description: 'Placeholder text for the date and time input fields.',
      table: {
        type: { summary: '{ date: string, time: string }' },
        defaultValue: { summary: "{ date: 'yyyy/mm/dd', time: 'hh:mm' }" },
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
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
  },
  args: {
    isDoubleView: false,
    isRangePicker: false,
    is12Hour: false,
    locale: 'ja-JP',
    disabled: false,
    placeholder: { date: 'yyyy/mm/dd', time: 'hh:mm' },
    step: 15,
  },
  render: args => (
    <Layout.Block minH="360px">
      <DatePicker.DateTime {...args} />
    </Layout.Block>
  ),
};

export const DateTimeRange = {
  ...DateTime,
  args: {
    ...DateTime.args,
    isRangePicker: true,
  },
};

export const DateTime12Hour = {
  ...DateTime,
  args: {
    ...DateTime.args,
    is12Hour: true,
  },
};

export const DateTimeDoubleView = {
  ...DateTime,
  args: {
    ...DateTime.args,
    isDoubleView: true,
  },
};
