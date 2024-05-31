import React, { useState } from 'react';
import Checkbox from 'components/Molecules/Checkbox';
import Button from 'components/Atoms/Button';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Molecules',
};

export const Checkboxes =  {
  title: 'Checkboxes',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2806%3A4600&mode=dev'
    }
  },
  argTypes: {
    disabled: {
      description: 'disabled or not state',
      control: { type: 'boolean' }
    },
    hasIndeterminateState: {
      description: 'Button has the indeterminate state or not',
      control: { type: 'boolean' }
    },
    name:{
      description: 'Label next to the checkbox',
      control: { type: 'text'}
    },
    label:{
      description: 'Name of the checkbox that will be assigned a value on form submit',
      control: { type: 'text'}
    },
  },
  args:{
    disabled: false,
    label: 'Label',
  },
  render: (args) => {
    const [checkboxes, setCheckboxes] = useState({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    });

    const handleSubmit = (event) => {
      alert(event.currentTarget[0].checked);
    };

    return (
      <form onSubmit={handleSubmit}>
        <Layout.Block>
          <Layout.Item>
            <Checkbox
              {...args}
              checkboxName="checkbox1"
              checked={true}
            />
          </Layout.Item>
          <Layout.Item>
            <Checkbox
              {...args}
              checkboxName="checkbox2"
              checked={checkboxes.checkbox2}
            />
          </Layout.Item>
          <Layout.Item>
            <Checkbox
              {...args}
              checkboxName="checkbox3"
              checked={checkboxes.checkbox3}
            />
          </Layout.Item>
          <Layout.Item>
            <Button type="submit">Submit</Button>
          </Layout.Item>
        </Layout.Block>
      </form>
    );
  }
};
