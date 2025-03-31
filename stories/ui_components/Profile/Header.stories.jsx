import HeaderComponent from 'components/Molecules/Profile/Header';

const meta = {
  component: HeaderComponent,
  tags: ['!dev'],
};

export default meta;

export const Header = {
  argTypes: {
    text: {
      description: 'This is the header display text.',
      control: { type: 'text' },
    },
  },
};
