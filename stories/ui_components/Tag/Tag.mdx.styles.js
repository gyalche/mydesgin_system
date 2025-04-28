import styled from 'styled-components';

import { Block } from 'components/Atoms/Layout';

// Container for code examples and canvases

export const ContentBlock = styled(Block).attrs({
  mt: '24px',
  mb: '32px',
})`
`;

// Container for smaller code examples
export const SmallContentBlock = styled(Block).attrs({
  mt: '16px',
  mb: '16px',
})`
`;
