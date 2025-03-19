import AppSwitcherComponent from 'components/Molecules/AppSwitcher';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/App Switcher',
  component: AppSwitcherComponent,
  tags: ['!dev'],
};

export default meta;

export const AppSwitcher = {
  argTypes: {
    owned: {
      description:
        'Object of all the products already owned by the current user, all the fields need to be entered to properly render the dropdown menu.',
      control: false,
    },
    other: {
      description:
        `Object of all the products not owned yet by the current user, all the fields need to be entered to properly
        render the dropdown menu this should also include the Other product link which will send the user to the product page.`,
      control: false,
    },
    ownedLabel: {
      description: 'The label text of the other product section.',
      control: {
        type: 'text',
      },
    },
    otherLabel: {
      description: 'The label text of the other product section.',
      control: {
        type: 'text',
      },
    },
    currentApp: {
      description: 'Current Application we are using.',
      control: {
        type: 'select',
      },
      options: ['reception', 'meetingroom', 'scheduling'],
    },
    width: {
      description: 'Sets the button width (e.g., `100px`, `50%`).',
      control: {
        type: 'text',
      },
    },
    onClick: {
      description: 'set an onClick event on a link.',
      control: false,
    },
  },
  args: {
    owned: [
      {
        name: 'Reception', productType: 'reception', description: 'This is the Reception app', isActive: true, link: 'https://receptionist.jp',
      },
      {
        name: 'scheduling', productType: 'scheduling', isActive: true, link: 'https://scheduling.receptionist.jp',
      },
    ],
    other: [
      {
        name: 'Rooms', description: 'This is the Rooms App', productType: 'meetingroom', link: 'https://rooms.receptionist.jp',
      },
      {
        name: 'Other', description: 'Other Reception Products', productType: 'other', link: '/product',
      },
    ],
    ownedLabel: 'Owned Products',
    otherLabel: 'Other Products',
    currentApp: 'scheduling',
    width: '347px',
  },
  render: args => (
    <Layout.Block minH="340px">
      <AppSwitcherComponent {...args} />
    </Layout.Block>
  ),
};
