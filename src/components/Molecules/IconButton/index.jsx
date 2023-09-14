import { default as Primary } from './Primary';
import { default as Secondary } from './Secondary';
import { default as Warning } from './Warning';
import { default as Danger } from './Danger';
import { default as Link } from './Link';
import { default as SubtleLink } from './SubtleLink';

const IconButton = Primary;

IconButton.Primary = Primary;
IconButton.Secondary = Secondary;
IconButton.Warning = Warning;
IconButton.Danger = Danger;
IconButton.Link = Link;
IconButton.SubtleLink = SubtleLink;

export default IconButton;
