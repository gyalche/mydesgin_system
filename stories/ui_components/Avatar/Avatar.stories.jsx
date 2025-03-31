import styled from 'styled-components';

import AvatarComponent, { colorPairs } from 'components/Atoms/Avatar';

const meta = {
  title: 'UI Components/Avatar',
  component: AvatarComponent,
  tags: ['!dev'],
};

export default meta;

export const Avatar = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      description: 'Content of the Avatar',
      control: { type: 'text' },
    },
    src: {
      description: 'Font size of the avatar content',
      control: { type: 'text' },
    },
    size: {
      description: 'Size of the avatar by default medium',
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
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
  },
  args: {
    name: '山田太郎',
    size: 'medium',
    mt: '0px',
    mr: '0px',
    mb: '0px',
    ml: '0px',
  },
  render: ({ ...args }) => (
    <AvatarComponent {...args} />
  ),
};

const Block = styled.div`
  height: 30px;
  width: 200px;
  display: inline-block;
  margin: 30px;
  text-align: center;
  align-content: center;

  ${({ cp }) => colorPairs[cp]}
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Palette = {
  render: () => (
    <Wrapper>
      {colorPairs.map((_, i) => <Block cp={i}>{`Combination ${i + 1}`}</Block>)}
    </Wrapper>
  ),
};
