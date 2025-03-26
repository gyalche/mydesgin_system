import DatePicker from 'components/Molecules/DateTimePicker';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/DatePicker/Date',
  component: DatePicker,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['tabIndex', 'initialValue', 'dateTimeDefault'],
    },
  },
};

export default meta;

export const Date = {
  argTypes: {
    isDoubleView: {
      control: 'boolean',
      description: 'Enables a double calendar view for easier date range selection.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isRangePicker: {
      control: 'boolean',
      description: 'Enables date range selection with start and end dates.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dateTimeDefault: {
      control: 'date',
      description: 'Initial date value or array of dates for range selection.',
      table: {
        type: { summary: 'Date | Date[]' },
        defaultValue: { summary: 'null' },
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
    onChange: {
      action: 'changed',
      description: 'Callback function that is called when the date selection changes.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the date picker.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the date input field.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'yyyy/mm/dd' },
      },
    },
    onlyFuture: {
      control: 'boolean',
      description: 'Only allows selection of future dates.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
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
    locale: 'ja-JP',
    disabled: false,
    placeholder: 'yyyy/mm/dd',
    onlyFuture: true,
  },
  render: args => (
    <Layout.Block minH="360px">
      <DatePicker {...args} />
    </Layout.Block>
  ),
};

export const DateRange = {
  ...Date,
  args: {
    ...Date.args,
    isRangePicker: true,
  },
};

export const DoubleView = {
  ...Date,
  args: {
    ...Date.args,
    isDoubleView: true,
  },
};

export const DoubleViewRange = {
  ...Date,
  args: {
    ...Date.args,
    isDoubleView: true,
    isRangePicker: true,
  },
};
