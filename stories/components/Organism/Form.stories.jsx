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
        control: { type: 'radio' },
        options: ['ja-JP', 'en-US']
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
  },
  args: {
      isRangePicker: true,
      isDoubleView: false,
      dateTimeFormat: 'ja-JP',
      is12Hour: true,
      step: 15,
  },
  render: (args) => {

    return <Form {...args}/>;
  },
};
