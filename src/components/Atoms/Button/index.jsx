import { default as Danger } from './Danger';
import { default as Link } from './Link';
import { default as Primary } from './Primary';
import { default as Secondary } from './Secondary';
import { default as SubtleLink } from './SubtleLink';
import { default as Warning } from './Warning';

const Button = Primary;

Button.Danger = Danger;
Button.Link = Link;
Button.Primary = Primary;
Button.Secondary = Secondary;
Button.SubtleLink = SubtleLink;
Button.Warning = Warning;

export default Button;
