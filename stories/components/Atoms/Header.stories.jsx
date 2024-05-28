import React from 'react';
import Header from 'components/Atoms/Header';

export default {
  title: 'Atoms/Headers',
  component: Header
};

const LeftComponent1 = () => <div>Left 1</div>;
const LeftComponent2 = () => <div>Left 2</div>;
const CenterComponent1 = () => <div>Center 1</div>;
const CenterComponent2 = () => <div>Center 2</div>;
const RightComponent1 = () => <div>Right 1</div>;
const RightComponent2 = () => <div>Right 2</div>;

export const Headers = {
  title: 'Header',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0',
    },
  },
  argTypes: {
    leftContent: {
      name: 'Left Content',
      description: 'Insert components alone or in an array to display from Left to right',
    },
    centerContent: {
      name: 'Center Content',
      description: 'Insert components alone or in an array to display from Left to right',
    },
    rightContent: {
      name: 'Right Content',
      description: 'Insert components alone or in an array to display from Left to right',
    },
  },
  args: {
    leftContent: [<LeftComponent1 />, <LeftComponent2 />],
    centerContent: [<CenterComponent1 />, <CenterComponent2 />],
    rightContent: [<RightComponent1 />, <RightComponent2 />],
  },
  render: (args) => {
    return (
      <div>
        <Header {...args}></Header>
        <div style={{ height: '3000px' }}></div>
      </div>
    );
  },
};
