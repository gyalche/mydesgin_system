import React from 'react';
import DatePicker from 'components/Molecules/DatePicker';

export default {
  title: 'Molecules/DatePicker',
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
    isRange: {
      description: 'Ranged selection mode',
      control: { type: 'boolean' },
    },
    doubleMonthView: {
      description:
        'Ranged selection mode with the current month and next month, "isRange" value must be true',
      control: { type: 'boolean' },
    },
    locale: {
      description: 'Locale of the calendar. Default is ja',
      control: { type: 'text' },
    },
    textCancel: {
      description: 'Text to be shown for the Cancel action',
      control: { type: 'text' },
    },
    textOk: {
      description: 'Text to be shown for the Ok action',
      control: { type: 'text' },
    },
    initialValue: {
      description:
        'Initial Date value of the Datepicker, could be a date/date string or an array of date/date strings if in ranged mode',
      control: { type: 'date' },
    },
  },
  args: {
    isRange: false,
    doubleMonthView: true,
    textCancel: 'キャンセル',
    textOk: 'OK',
    initialValue: new Date(),
  },
  render: args => {
    return <DatePicker {...args} />;
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
    hour12: {
      description: '12 hour mode (true) or 24 hour mode (false)',
      control: { type: 'boolean' },
    },
    interval: {
      description: 'Time interval in minutes',
      control: { type: 'number' },
    },
    locale: {
      description: 'Locale of the calendar. Default is ja',
      control: { type: 'text' },
    },
    initialValue: {
      description:
        'Initial date and time value of the Timepicker in ISO date string format',
      control: { type: 'date' },
    },
  },
  args: {
    hour12: true,
    interval: 15,
    initialValue: new Date(),
  },
  render: args => {
    return <Time {...args} />;
  },
};
