import { Button } from './Button';
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    Somearguments: {control: 'text'}
  },
  // Figma integration, import the url of the related figma design
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Evergreen-v6-(Community)-(Copy)?type=design&node-id=2806-1732&mode=design&t=6IRBGZxc4phRX9n1-4',
   },

  }
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};
