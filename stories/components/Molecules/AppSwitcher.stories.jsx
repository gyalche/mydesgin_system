import React from 'react';
import AppSwitcher from 'src/components/Molecules/AppSwitcher';

export default {
  title: 'Molecules',
  component: AppSwitcher,
};

export const ApplicationSwitcher = {
  title: 'AppSwitcher',
  component: AppSwitcher,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  argTypes: {
    owned: {
      description:
        'Object of all the products already owned by the current user, all the fields need to be entered to properly render the dropdown menu',
    },
    other: {
      description:
        `Object of all the products not owned yet by the current user, all the fields need to be entered to properly 
        render the dropdown menu this should also include the Other product link which will send the user to the product page`,
    },
    ownedLabel: {
      description: 'The label text of the other product section',
      control: {
        type: 'text'
      }
    },
    otherLabel: {
      description: 'The label text of the other product section',
      control: {
        type: 'text'
      }
    },
    currentApp: {
      description: 'Current Application',
      control: {
        type: 'select',
      },
      options: ['reception', 'meetingroom', 'scheduling'],
    },
    width: {
      description: 'Width of the drop-down menu',
      control: {
        type: 'text'
      }
    },
    onClick: {
      description: 'set an onClick event on a link.'
    },
  },
  args: {
    owned: [
      { name: 'Reception', product_type: 'reception', isActive: true, link: 'https://receptionist.jp' },
      { name: 'scheduling', product_type: 'scheduling', isActive: true, link: 'https://scheduling.receptionist.jp' }
    ],
    other: [
      { name: 'Rooms', description: 'This is the Rooms App', product_type: 'meetingroom', link: 'https://rooms.receptionist.jp' },
      { name: 'Other', description: 'Other Reception Products', product_type: 'other', link: '/product' }
    ],
    ownedLabel: 'Owned Products',
    otherLabel: 'Other Products',
    currentApp: 'scheduling',
  },
  render: args => {
    return (
      <AppSwitcher { ...args } />
    );
  }
};
