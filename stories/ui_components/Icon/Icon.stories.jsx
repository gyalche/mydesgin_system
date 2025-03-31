import IconComponent from 'components/Atoms/Icon';
import icons from 'shared/css/icons.module.css';

const meta = {
  title: 'UI Components/Icon',
  component: IconComponent,
  tags: ['!dev'],
};

export default meta;

const iconList = Object.getOwnPropertyNames(icons).map(key => key.substring(4, key.length));

export const Icon = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconList,
      description: 'Icon name to display.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    name: iconList[0],
  },
  render: ({ name }) => (
    <IconComponent name={name} />
  ),
};
