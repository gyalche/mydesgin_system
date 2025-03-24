import * as LayoutComponent from 'components/Atoms/Layout';

const meta = {
  title: 'Layout Components/Layout',
  component: LayoutComponent,
  tags: ['!dev'],
};

export default meta;

export const Block = {
  argTypes: {
    w: {
      control: 'text',
      description: 'Sets the layout width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the layout height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    minW: {
      control: 'text',
      description: 'Sets the layout minimum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    minH: {
      control: 'text',
      description: 'Sets the layout minimum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxW: {
      control: 'text',
      description: 'Sets the layout maximum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxH: {
      control: 'text',
      description: 'Sets the layout maximum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    mt: {
      control: 'text',
      description: 'Margin-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      control: 'text',
      description: 'Margin-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      control: 'text',
      description: 'Margin-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      control: 'text',
      description: 'Margin-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pt: {
      control: 'text',
      description: 'Padding-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pr: {
      control: 'text',
      description: 'Padding-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pb: {
      control: 'text',
      description: 'Padding-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pl: {
      control: 'text',
      description: 'Padding-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    cursor: {
      control: 'text',
      description: 'Sets the cursor type inside the layout.',
      table: {
        type: { summary: 'string' },
      },
    },
    border: {
      control: 'text',
      description: 'Sets the layout border (e.g., `1px solid black`).',
      table: {
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Sets the layout border radius (e.g., `8px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    w: '100px',
    h: '30px',
    minW: 'unset',
    minH: 'unset',
    maxW: 'none',
    maxH: 'none',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    pt: '0',
    pb: '0',
    pl: '0',
    pr: '0',
    cursor: 'auto',
    border: '1px solid lightgrey',
    borderRadius: 'unset',
  },
  render: ({ ...args }) => (
    <LayoutComponent.Block {...args} />
  ),
};

export const Flex = {
  argTypes: {
    w: {
      control: 'text',
      description: 'Sets the layout width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the layout height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    direction: {
      control: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse'],
      description: 'Sets the layout flex direction.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'row' },
      },
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'wrap-reverse', 'nowrap'],
      description: 'Sets the layout flex wrap (e.g., `wrap`, `nowrap`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'nowrap' },
      },
    },
    justifyContent: {
      control: 'text',
      description: 'Sets the layout justify content (e.g., `flex-start`, `flex-end`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    alignItems: {
      control: 'text',
      description: 'Sets the layout align items (e.g., `flex-start`, `flex-end`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    textAlign: {
      control: 'text',
      description: 'Sets the layout text alignment (e.g., `left`, `right`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    gap: {
      control: 'text',
      description: 'Sets the layout content gap (e.g., `2px`, `0`).',
      table: {
        type: { summary: 'string' },
      },
    },
    overflowX: {
      control: 'select',
      options: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
      description: 'Sets the layout overflow-x.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'visible' },
      },
    },
    overflowY: {
      control: 'select',
      options: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
      description: 'Sets the layout overflow-y.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'visible' },
      },
    },
    minW: {
      control: 'text',
      description: 'Sets the layout minimum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    minH: {
      control: 'text',
      description: 'Sets the layout minimum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxW: {
      control: 'text',
      description: 'Sets the layout maximum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxH: {
      control: 'text',
      description: 'Sets the layout maximum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    mt: {
      control: 'text',
      description: 'Margin-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      control: 'text',
      description: 'Margin-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      control: 'text',
      description: 'Margin-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      control: 'text',
      description: 'Margin-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pt: {
      control: 'text',
      description: 'Padding-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pr: {
      control: 'text',
      description: 'Padding-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pb: {
      control: 'text',
      description: 'Padding-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    pl: {
      control: 'text',
      description: 'Padding-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    cursor: {
      control: 'text',
      description: 'Sets the cursor type inside the layout.',
      table: {
        type: { summary: 'string' },
      },
    },
    border: {
      control: 'text',
      description: 'Sets the layout border (e.g., `1px solid black`).',
      table: {
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Sets the layout border radius (e.g., `8px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    w: '100px',
    h: 'auto',
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    wrap: 'nowrap',
    minW: 'unset',
    minH: 'unset',
    maxW: 'none',
    maxH: 'none',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    pt: '0',
    pb: '0',
    pl: '0',
    pr: '0',
    gap: '20px',
    cursor: 'auto',
    border: '1px solid lightgrey',
    borderRadius: 'unset',
    overflowX: 'visible',
    overflowY: 'visible',
  },
  render: ({ ...args }) => (
    <LayoutComponent.Flex {...args}>
      <LayoutComponent.Item bgColor="red" w="30px" h="30px">A</LayoutComponent.Item>
      <LayoutComponent.Item bgColor="blue" w="30px" h="30px">B</LayoutComponent.Item>
    </LayoutComponent.Flex>
  ),
};

export const Item = {
  argTypes: {
    flex: {
      control: 'text',
      description: 'Sets the layout flex value (e.g., `0 1 auto`).',
      table: {
        type: { summary: 'string' },
      },
    },
    w: {
      control: 'text',
      description: 'Sets the layout width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    h: {
      control: 'text',
      description: 'Sets the layout height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    minW: {
      control: 'text',
      description: 'Sets the layout minimum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    minH: {
      control: 'text',
      description: 'Sets the layout minimum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxW: {
      control: 'text',
      description: 'Sets the layout maximum width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    maxH: {
      control: 'text',
      description: 'Sets the layout maximum height (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
      },
    },
    mt: {
      control: 'text',
      description: 'Margin-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      control: 'text',
      description: 'Margin-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      control: 'text',
      description: 'Margin-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      control: 'text',
      description: 'Margin-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Sets the layout font color.',
      table: {
        type: { summary: 'string' },
      },
    },
    bgColor: {
      control: { type: 'color' },
      description: 'Sets the layout background color.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export const Samples = {
  render: () => (
    <LayoutComponent.Block w="60vw" minW="680px">
      <LayoutComponent.Flex mb="20px">
        <LayoutComponent.Item flex="0" bgColor="red">
          0
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="2" bgColor="green">
          2
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="0" bgColor="blue">
          0
        </LayoutComponent.Item>
      </LayoutComponent.Flex>
      <LayoutComponent.Flex mb="20px" disabled={true}>
        <LayoutComponent.Item flex="0" bgColor="red">
          0
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="2" bgColor="green">
          2
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="0" bgColor="blue">
          0
        </LayoutComponent.Item>
      </LayoutComponent.Flex>
      <LayoutComponent.Flex mb="20px">
        <LayoutComponent.Item flex="0" bgColor="red" minW="300px">
          0 (min-width: 300px)
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="2" bgColor="green">
          2
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="0" bgColor="blue">
          0
        </LayoutComponent.Item>
      </LayoutComponent.Flex>
      <LayoutComponent.Flex mb="20px">
        <LayoutComponent.Item flex="2" bgColor="red">
          2
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="4" bgColor="green">
          4
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="6" bgColor="blue">
          6
        </LayoutComponent.Item>
      </LayoutComponent.Flex>
      <LayoutComponent.Flex>
        <LayoutComponent.Item flex="1" bgColor="red">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="green">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="blue">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="cyan">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="magenta">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="yellow">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="red">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="green">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="blue">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="cyan">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="magenta">
          1
        </LayoutComponent.Item>
        <LayoutComponent.Item flex="1" bgColor="yellow">
          1
        </LayoutComponent.Item>
      </LayoutComponent.Flex>
    </LayoutComponent.Block>
  ),
};
