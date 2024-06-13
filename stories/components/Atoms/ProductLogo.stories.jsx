import React from 'react';
import ProductLogo from 'components/Atoms/ProductLogo';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
};

export const ProductLogos = {
  title: 'ProductLogo',
  component: ProductLogo,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=2760-10889&mode=design&t=3ou118yu50CgwEHA-0',
    },
  },
  argTypes: {
    product: {
      description: 'Name of the product',
      control: {
        type: 'select',
      },
      options: ['Receptionist', 'Meetingrooms', 'Scheduling', 'Safetycheck'],
    },
  },
  args: {
    product: 'Receptionist',
  },
  render: args => {
    return (
      <Layout.Block>
        <Layout.Item>
          <ProductLogo {...args} />
        </Layout.Item>
      </Layout.Block>
    );
  },
};
