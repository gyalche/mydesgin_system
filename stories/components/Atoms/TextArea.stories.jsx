  import React from 'react';
  import TextArea from 'src/components/Atoms/TextArea';

  export default {
    title: 'Atoms',
  };

  export const TextAreas =  {
    title: 'TextAreas',
    component: TextArea,
    parameters: {
      layout: 'centered',
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev'
      }
    },
    argTypes: {
      w: {
        name: 'Width',
        description: 'Width of the Text Area, must include %, px etc',
        control: { type: 'text' }
      },
      h: {
        name: 'Height',
        description: 'Height of the Text Area, must include %, px etc',
        control: { type: 'text' }
      },
      disabled: {
        name: 'Disabled',
        description: 'set if the component is disabled or not',
        control: { type: 'boolean' }
      },
      invalid: {
        name: 'Invalid',
        description: 'set if the component is invalid or not',
        control: { type: 'boolean' }
      },
    },
    args:{
      w: 'auto',
      h: '160px',
    },
    render: (args) => {
      return  ( 
        <TextArea {...args} placeholder="Active"></TextArea>
      );
    }
  };
