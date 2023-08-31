import { default as Primary } from './Primary';
import { default as Secondary } from './Secondary';
import { default as Warning } from './Warning';
import { default as Danger } from './Danger';
import { default as Link } from './Link';
import { default as SubtleLink } from './SubtleLink';

const Button = Primary;

Button.Primary = Primary;
Button.Secondary = Secondary;
Button.Warning = Warning;
Button.Danger = Danger;
Button.Link = Link;
Button.SubtleLink = SubtleLink;

export default Button;
