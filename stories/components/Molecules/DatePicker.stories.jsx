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
    isRangePickerDate: {
      description: 'Ranged selection mode',
      control: { type: 'boolean' },
    },
    isDoubleView: {
      description: 'Display two months side by side, "isRangePicker" value must be true',
      control: { type: 'boolean' },
    },
    onlyFuture: {
      description: 'Allows user to select future date or past date aswell',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'enable and disable the description',
      control: { type: 'boolean' }
    },
    locale: {
      description: 'Locale format of the calendar. Default is ja-JP',
      control: { type: 'select' },
      options: ['ja-JP', 'en-US']
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
    isDoubleView: false,
    disabled: false,
    locale: 'ja-JP',
    textCancel: 'キャンセル',
    initialValue: new Date(),
    placeholder: 'yyyy/mm/dd',
    onlyFuture: true,
  },
  render: (args) => {
    const updatedArgs = {
      ...args,
      initialValue: args?.isRangePicker ? [new Date, new Date('Dec 28 2024 1:45:00')] : new Date('Dec 14 2024 1:45:00'),
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
    initialValue: new Date(),
    disabled: false,
    placeholder: 'hh:mm',
    isRangePicker: true,
  },
  render: args => {
    const updatedArgs = {
      ...args,
      initialValue:  args.isRangePicker ? [new Date('Dec 14 2024 15:45:00'), new Date('Dec 14 2024 1:45:00')] 
      : new Date('Dec 14 2024 1:45:00')
    };
    return <Time {...updatedArgs} />;
  },
};

export const DateTimePickers = {
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
    isTimeRange: {
      description: 'Time range picker enabe and disable',
      control: { type: 'boolean' },
    }
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
    const updatedArgs = {
      ...args,
      initialValue: args.isDoublePicker ? [new Date('Dec 14 2024 15:40:00'), new Date('Dec 15 2024 1:45:00')] : new Date(),
    };
    return <DateTime {...updatedArgs} />;
  },
};
