import * as IconComponents from 'components/Atoms/Logo';

const meta = {
  title: 'UI Components/Logo',
  component: IconComponents,
  tags: ['!dev'],
};

export default meta;

const logoList = Object.getOwnPropertyNames(IconComponents);

export const Logo = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: logoList,
      description: 'Icon name to display.',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Sets the logo width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    name: logoList[0],
    width: '64  cpx',
  },
  render: ({ name, width }) => {
    const IconComponent = IconComponents[name];
    IconComponent.displayName = `Logo.${name}`;
    return (
      <IconComponent width={width} />
    );
  },
};
