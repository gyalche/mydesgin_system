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
    render: (args) => <Form {...args} />
};
