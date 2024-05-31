import { default as DefaultDisplay } from './DefaultDisplay';
import { default as Option } from './Option';
import { default as OptionSelectDisplay } from './OptionSelectDisplay';
import { default as SelectorInput } from './SelectorInput';

const Selector = SelectorInput;

Selector.Option = Option;
Selector.DefaultDisplay = DefaultDisplay;
Selector.OptionSelectDisplay = OptionSelectDisplay;

export default Selector;
