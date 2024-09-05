import Form from 'components/Organisms/Form';
export default {
    title: 'Design System/Organisms/ReactForm',
    component: Form,
};

export const ReactForm = {
  title: 'ReactForm',
  component: Form,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6273%3A32042&mode=dev',
    },
  },
  argTypes: {
      isRangePicker: {
        description: 'Enable ranged selection',
        control: { type: 'boolean' },
      },
      isDoubleView: {
        description: 'Show two months side by side',
        control: { type: 'boolean' },
      },
      dateTimeFormat: {
        description: 'Format of the DatePicker (locale)',
        control: { type: 'text' },
      },
      initialValue: {
        description: 'Initial date value',
        control: { type: 'date' },
      },
      is12Hour: {
        description: '12-hour (true) or 24-hour (false) mode',
        control: { type: 'boolean' },
      },
      step: {
        description: 'Minute step intervals for time selection',
        control: { type: 'number' },
      },
      initialValue: {
        description: 'Initial time value (HH:mm format)',
        control: { type: 'text' },
      },
  },
  args: {
      isRangePicker: true,
      isDoubleView: false,
      dateTimeFormat: 'ja-JA',
      initialValue: new Date(),
      is12Hour: true,
      step: 15,
      initialValue: '10:15 AM',
  },
  render: (args) => {
    const updatedArgs = {
        ...args,
        initialValue: args.isRangePicker
          ? [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
          : new Date(new Date().setDate(new Date().getDate() + 8))
    };

    return <Form {...updatedArgs} />;
  },
};

