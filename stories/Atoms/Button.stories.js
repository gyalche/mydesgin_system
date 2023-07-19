import { Button } from "../../src/components/Atoms/Buttons/Button";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  },
  // Figma integration, import the url of the related figma design
  decorators: [withDesign],
  // parameters: {
  //   design: {
  //     type: "figma",
  //     url: "https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Evergreen-v6-(Community)-(Copy)?type=design&node-id=6044-15271&mode=design&t=9NHRiv6uwxtagOEf-4"
  //   }
  // }
};

export const Primary = {
  args: {
    primary: true,
    label: "Button"
  }
};

export const Secondary = {
  args: {
    label: "Button"
  }
};
