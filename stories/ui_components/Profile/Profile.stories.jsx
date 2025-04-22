import ProfileComponent from 'components/Molecules/Profile';
import Divider from 'components/Atoms/Divider';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Profile',
  component: ProfileComponent,
  tags: ['!dev'],
};

export default meta;

export const Profile = {
  argTypes: {
    width: {
      description: 'Sets the button width (e.g., `100px`, `50%`).',
      control: {
        type: 'text',
      },
    },
    account: {
      description: 'The account to display inside the component',
      control: false,
    },
    children: {
      description: 'Extra elements to show inside the profile component.',
      control: false,
    },
  },
  args: {
    width: '208px',
    account: {
      name: '佐藤春',
      email: 'email@users.email',
      image:
      'https://s3-ap-northeast-1.amazonaws.com/receptionist/uploads/employee/icon_uri/1/0b0912de-ea24-4392-a2e0-ca02c83f8614.jpg',
    },
  },
  render: args => (
    <Layout.Block minH="300px">
      <ProfileComponent {...args}>
        <ProfileComponent.Item
          as="a"
          text="外部連携"
          icon="global-puzzle"
          onClick={() => alert('test')}
        />
        <ProfileComponent.Item
          as="a"
          text="ログアウト"
          icon="action-logout"
          onClick={() => alert('test')}
        />
        <Divider />
        <ProfileComponent.Header text="Company Name" />
        <ProfileComponent.Item
          as="a"
          text="Help"
          icon="global-circle-question"
          onClick={() => alert('test')}
        />
      </ProfileComponent>
    </Layout.Block>
  ),
};
