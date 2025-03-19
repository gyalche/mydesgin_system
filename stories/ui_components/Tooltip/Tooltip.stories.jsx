import TooltipComponent from 'components/Molecules/Tooltip';
import icons from 'shared/css/icons.module.css';

import { getCSSVariable } from '../../utils/color';

const iconList = Object.getOwnPropertyNames(icons).map(key => key.substring(4, key.length));

const meta = {
  title: 'UI Components/Tooltip',
  component: TooltipComponent,
  tags: ['!dev'],
};

export default meta;

export const Tooltip = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      description: 'Header text to display.',
      control: { type: 'text' },
    },
    message: {
      description: 'Message text to display.',
      control: { type: 'text' },
    },
    subMessage: {
      description: 'Sub Message text to display.',
      control: { type: 'text' },
    },
    width: {
      description: 'Sets the button width (e.g., `100px`, `50%`).',
      control: { type: 'text' },
    },
    linkURL: {
      description: 'Link to display inside the tooltip.',
      control: { type: 'text' },
    },
    onHelpLinkClick: {
      description: 'Action triggered when on clicking the link button inside tooltip.',
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
    onHover: {
      description: 'Action triggered when hovering the tooltip.',
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
    moreDetails: {
      description: '\'More details\' text of shown inside the Tooltip.',
      control: { type: 'text' },
    },
    bgColor: {
      description: 'Background color of the Tooltip.',
      control: { type: 'color' },
    },
    fontColor: {
      description: 'Font color of the Tooltip.',
      control: { type: 'color' },
    },
    iconName: {
      control: 'select',
      options: iconList,
      description: 'Icon name to display in the Tooltip.  You can check the [reference here](../?path=/docs/general-assets--docs#icons).',
      table: {
        type: { summary: 'string' },
      },
    },
    placement: {
      description: 'Placement for the Tooltip',
      control: {
        type: 'select',
      },
      options: [
        'right',
        'topLeft',
        'top',
        'topRight',
        'bottomLeft',
        'bottom',
        'bottomRight',
      ],
    },
  },
  args: {
    children: 'Tooltip anchor',
    header: 'Tooltip',
    message: 'This is a message.',
    subMessage:
      'Segment syncs a list of users to these destinations and keeps it up to date.',
    width: '216px',
    linkURL:
      'https://scheduling.help.receptionist.jp/how-to-create-pages/#time2',
    onHelpLinkClick: () => alert('Help Link Clicked'),
    btnText: 'More Details',
    bgColor: getCSSVariable('--rds-color-neutral-9'),
    fontColor: getCSSVariable('--rds-color-neutral-0'),
    placement: 'right',
    iconName: 'global-circle-question',
    moreDetails: 'More Details',
  },
  render: ({ children, ...args }) => (
    <TooltipComponent {...args}>{children}</TooltipComponent>
  ),
};

// export const Palette = {
//   parameters: {
//     layout: 'centered',
//   },
//   render: () => (
//     <Layout.Block>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Blue>Blue</BadgeComponent.Blue>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Green>Green</BadgeComponent.Green>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Yellow>Yellow</BadgeComponent.Yellow>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Red>Red</BadgeComponent.Red>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Violet>Violet</BadgeComponent.Violet>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Teal>Teal</BadgeComponent.Teal>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Pink>Pink</BadgeComponent.Pink>
//       </Layout.Item>
//       <Layout.Item mt="20px">
//         <BadgeComponent.Orange>Orange</BadgeComponent.Orange>
//       </Layout.Item>
//     </Layout.Block>
//   ),
// };
