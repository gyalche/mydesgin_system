import HeaderComponent from 'components/Atoms/Header';
import * as Layout from 'components/Atoms/Layout';
import ProductLogo from 'components/Atoms/ProductLogo';
import AppSwitcher from 'components/Molecules/AppSwitcher';
import Profile from 'components/Molecules/Profile';

const meta = {
  title: 'Layout Components/Header',
  component: HeaderComponent,
  tags: ['!dev'],
};

export default meta;

function CenterComponent1() {
  return <div>Center 1</div>;
}
function CenterComponent2() {
  return <div>Center 2</div>;
}
function RightComponent1() {
  return <div>Right 1</div>;
}

export const Header = {
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    leftContent: {
      control: false,
      description: 'Any component or array of componentes would be displayed from Left to right',
    },
    centerContent: {
      control: false,
      description: 'Any component or array of componentes would be displayed from Left to right',
    },
    rightContent: {
      control: false,
      description: 'Any component or array of componentes would be displayed  from Left to right',
    },
  },
  args: {
    leftContent: [<AppSwitcher
      currentApp="reception"
      other={[
        {
          description: 'This is the Rooms App',
          link: 'https://rooms.receptionist.jp',
          name: 'Rooms',
          productType: 'meetingroom',
        },
        {
          description: 'Other Reception Products',
          link: '/product',
          name: 'Other',
          productType: 'other',
        },
      ]}
      otherLabel="Other Products"
      owned={[
        {
          description: 'This is the Reception app',
          isActive: true,
          link: 'https://receptionist.jp',
          name: 'Reception',
          productType: 'reception',
        },
        {
          isActive: true,
          link: 'https://scheduling.receptionist.jp',
          name: 'scheduling',
          productType: 'scheduling',
        },
      ]}
      ownedLabel="Owned Products"
    />, <ProductLogo product="Receptionist" />],
    centerContent: [<CenterComponent1 />, <CenterComponent2 />],
    rightContent: [<RightComponent1 />,
      <Profile
        account={{
          email: 'email@users.email',
          image: 'https://s3-ap-northeast-1.amazonaws.com/receptionist/uploads/employee/icon_uri/1/0b0912de-ea24-4392-a2e0-ca02c83f8614.jpg',
          name: '佐藤春',
        }}
        width="208px"
      >
        <Profile.Item
          icon="global-puzzle"
          onClick={() => {}}
          text="外部連携"
        />
        <Profile.Item
          icon="action-logout"
          onClick={() => {}}
          text="ログアウト"
        />
        <Profile.Separator />
        <Profile.Header text="Company Name" />
        <Profile.Item
          icon="global-circle-question"
          onClick={() => {}}
          text="Help"
        />
      </Profile>,
    ],
  },
  render: ({ ...args }) => (
    <Layout.Block minH="350px">
      <HeaderComponent {...args} />
    </Layout.Block>
  ),
};
