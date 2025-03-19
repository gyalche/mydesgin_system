import React from 'react';

import Header from 'components/Atoms/Header';

export default {
  title: 'Design System/Atoms/Headers',
  component: Header,
};

function LeftComponent1() {
  return <div>Left 1</div>;
}
function LeftComponent2() {
  return <div>Left 2</div>;
}
function CenterComponent1() {
  return <div>Center 1</div>;
}
function CenterComponent2() {
  return <div>Center 2</div>;
}
function RightComponent1() {
  return <div>Right 1</div>;
}
function RightComponent2() {
  return <div>Right 2</div>;
}

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
  render: args => (
    <div>
      <Header {...args} />
      <div style={{ height: '3000px' }} />
    </div>
  ),
};
