import { default as Header } from './Header';
import { default as Item } from './Item';
import { default as ProfileMain } from './Profile';
import { default as Separator } from './Separator';

const Profile = ProfileMain;

Profile.Item = Item;
Profile.Separator = Separator;
Profile.Header = Header;

export default Profile;
