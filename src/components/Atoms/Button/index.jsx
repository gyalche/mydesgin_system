import { default as Primary } from './Primary.jsx';
import { default as Secondary } from './Secondary.jsx';
import { default as Warning } from './Warning.jsx';
import { default as Danger } from './Danger.jsx';
import { default as Link } from './Link.jsx';
import { default as SubtleLink } from './SubtleLink.jsx';

const Button = Primary;

Button.Primary = Primary;
Button.Secondary = Secondary;
Button.Warning = Warning;
Button.Danger = Danger;
Button.Link = Link;
Button.SubtleLink = SubtleLink;

export default Button;
