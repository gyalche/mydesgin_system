import React from 'react';
import Profile from 'components/Molecules/Profile';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Molecules/Profiles',
};

export const Profiles = {
  title: 'Profiles',
  component: Profile,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/CQ57ObaAdQOh2XOO3VWKfh/receptionist?node-id=7189%3A42137&mode=dev',
    },
  },
  argTypes: {
    width: {
      name: 'Width',
      description: 'Width of the profile dropdown, must include %, px etc',
      control: { type: 'text' },
    },
    name: {
      name: 'Name',
      description: 'Name of the account',
      control: { type: 'text' },
    },
    email: {
      name: 'Email',
      description: 'Email of the account',
      control: { type: 'text' },
    },
    image: {
      name: 'Image',
      description: 'Image of the account',
      control: { type: 'text' },
    },
  },
  args: {
    width: '208px',
    name: '佐藤春',
    email: 'email@users.email',
    image:
      'https://s3-ap-northeast-1.amazonaws.com/receptionist/uploads/employee/icon_uri/1/0b0912de-ea24-4392-a2e0-ca02c83f8614.jpg',
  },
  render: args => {
    const { name, email, image } = args;
    const account = {
      name,
      email,
      image,
    };
    return (
      <Layout.Block>
        <Layout.Item>
          <Profile {...args} account={account}>
            <Profile.Item
              as="a"
              text="外部連携"
              icon="global-puzzle"
              onClick={() => alert('test')}
            />
            <Profile.Item
              as="a"
              text="ログアウト"
              icon="action-logout"
              onClick={() => alert('test')}
            />
            <Profile.Separator />
            <Profile.Header text="Company Name" />
            <Profile.Item
              as="a"
              text="Help"
              icon="global-circle-question"
              onClick={() => alert('test')}
            />
          </Profile>
        </Layout.Item>
      </Layout.Block>
    );
  },
};
