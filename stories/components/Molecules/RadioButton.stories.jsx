import React, { useState } from 'react';
import RadioButton from 'src/components/Molecules/RadioButton';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules',
};

export const RadioButtons =  {
  title: 'RadioButtons',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2806%3A4797&mode=dev'
    }
  },
  argTypes: {
    Disabled: {
      description: 'Make the button in Disabled mode',
      control: { type: 'boolean' }
    },
    Position: {
      name: 'Button Position',
      description: 'Position of the radio button in regards to the label',
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
    },
    Content1: {
      name:'Radio Button 1 Content',
      description: 'Content of the Label',
      control: { type: 'text' }
    },
    Content2: {
      name:'Radio Button 2 Content',
      description: 'Content of the Label',
      control: { type: 'text' }
    }
  },
  args:{
    Disabled: false,
    Position: 'left',
    Content1: 'Option 1',
    Content2: 'Option 2',
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return ( 
      <Layout.Block>
        <Layout.Item>
          <RadioButton
            position={args.Position}
            label={args.Content1}
            checked={selectedOption === 'Option 1'}
            onChange={handleOptionChange}
            value="Option 1"
            disabled={args.Disabled}
          />
        </Layout.Item>
        <Layout.Item mt="20px">
          <RadioButton
            position={args.Position}
            label={args.Content2}
            checked={selectedOption === 'Option 2'}
            onChange={handleOptionChange}
            value="Option 2" 
            disabled={args.Disabled}
          />
        </Layout.Item>
      </Layout.Block>
    );
  }
};
