import React from 'react';
import DatePicker from 'components/Molecules/DatePicker';

export default {
  title: 'Design System/Molecules/DatePicker',
  component: DatePicker,
};

const { Time, DateTime } = DatePicker;

export const DatePickers = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6273%3A32042&mode=dev',
    },
  },
  argTypes: {
    isRangePicker: {
      description: 'Ranged selection mode',
      control: { type: 'boolean' },
    },
    isDoubleView: {
      description: 'Display two months side by side, "isRangePicker" value must be true',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'enable and disable the description',
      control: { type: 'boolean' }
    },
    locale: {
      description: 'Locale format of the calendar. Default is ja-JP',
      control: { type: 'text' },
    },
    textCancel: {
      description: 'Text to be shown for the Cancel action',
      control: { type: 'text' },
    },
    initialValue: {
      description:
        'Initial Date value of the Datepicker, could be a date or an array of dates if in ranged mode',
      control: { type: 'date' },
    },
    placeholder: {
      description: 'Placeholder value',
      control: { type: 'text' },
    }
  },
  args: {
    isRangePicker: true,
    isDoubleView: false,
    disabled: false,
    locale: 'ja-JP',
    textCancel: 'キャンセル',
    initialValue: new Date(),
    placeholder: 'yyyy/mm/dd'
  },
  render: (args) => {
    const updatedArgs = {
      ...args,
      initialValue: args.isRangePicker
        ? [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
        : new Date(new Date().setDate(new Date().getDate() + 8)),
    };
    return <DatePicker {...updatedArgs} />;
  },
};

export const TimePickers = {
  title: 'TimePicker',
  component: Time,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6273%3A32042&mode=dev',
    },
  },
  argTypes: {
    is12Hour: {
      description: '12 hour mode (true) or 24 hour mode (false)',
      control: { type: 'boolean' },
    },
    step: {
      description: 'Time interval in minutes',
      control: { type: 'number' },
    },
    disabled: {
      description: 'enable and disable the description',
      control: { type: 'boolean' }
    },
    initialValue: {
      description:
        'Initial time value of the TimePicker in "HH:mm AM/PM" format for 12-hour mode or "HH:mm" for 24-hour mode',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Placholder value for time',
      control: { type: 'text' },
    },
    isTimeRange: {
      description: 'enable and disable the time range picker',
      control: { type: 'boolean' },
    }
  },
  args: {
    is12Hour: true,
    step: 15,
    initialValue: '',
    disabled: false,
    placeholder: 'hh:mm',
    isTimeRange: true,
  },
  render: args => {
    const updatedArgs = {
      ...args,
      initialValue: args.isTimeRange && ['7:00 AM', '8:00 PM']
    };
    return <Time {...updatedArgs} />;
  },
};

export const DateTimePicker = {
  title: 'datetime',
  component: DateTime,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6273%3A32042&mode=dev',
    },
  },
  argTypes: {
    disabled: {
      description: 'enable and disable input field',
      control: { type: 'boolean' },
    },
    is12Hour: {
      description: '12 Hour format for time',
      control: { type: 'boolean' },
    },
    isDoubleView : {
      description: 'double view calender, with current and next month',
      control: { type: 'boolean' },
    },
    isRangePicker: {
      description: 'Pick the range of date',
      control: { type: 'boolean' },
    },
    isDoublePicker: {
      description: 'Time and time has start and end picker double view',
      control: { type: 'boolean' },
    },
    locale: {
      description: 'Locale format of the calendar. Default is ja-JP',
      control: { type: 'select' },
      options: ['ja-JP', 'en-US']
    },
    placeholder: {
      description: 'Placeholder text for date and time fields',
      control: { type: 'object' },
    },
  },
  args: {
    disabled: false,
    is12Hour: false,
    isDoubleView: false,
    isRangePicker: false,
    isDoublePicker: true,
    locale: 'en-US',
    placeholder: {
      date: 'yyyy/mm/dd',
      time: 'hh:mm',
    },
  },
  render: (args) => {
    return <DateTime {...args} />;
  },
};
