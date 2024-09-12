import React from 'react';
import DatePicker from 'components/Molecules/DatePicker';

export default {
  title: 'Design System/Molecules/DatePicker',
  component: DatePicker,
};

const { Time } = DatePicker;

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
    dateTimeFormat: {
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
  },
  args: {
    isRangePicker: true,
    isDoubleView: false,
    dateTimeFormat: 'ja-JP',
    textCancel: 'キャンセル',
    initialValue: new Date(),
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
    initialValue: {
      description:
        'Initial time value of the TimePicker in "HH:mm AM/PM" format for 12-hour mode or "HH:mm" for 24-hour mode',
      control: { type: 'text' },
    },
  },
  args: {
    is12Hour: true,
    step: 15,
    initialValue: '1:15 AM',
  },
  render: args => {
    return <Time {...args} />;
  },
};
