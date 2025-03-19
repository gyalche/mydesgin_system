import LoadingComponent from 'components/Molecules/Loading';

import { getCSSVariable } from '../../utils/color';

const meta = {
  title: 'UI Components/Loading',
  component: LoadingComponent,
  tags: ['!dev'],
};

export default meta;

export const Loading = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      description: 'Choose the size of loader.',
      control: { type: 'select' },
      options: ['xlarge', 'large', 'medium', 'small'],
    },
    color: {
      description: 'Customize the loader to adapt to any situation.',
      control: { type: 'color' },
    },
    invert: {
      description: 'Invert the color if you need to add some contrast',
      control: { type: 'boolean' },
    },
  },
  args: {
    size: 'xlarge',
    color: getCSSVariable('--rds-color-neutral-6'),
    invert: false,
  },
  render: ({ content, ...args }) => (
    <LoadingComponent {...args} />
  ),
};
