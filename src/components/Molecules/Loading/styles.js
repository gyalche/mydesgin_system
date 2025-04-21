import styled from 'styled-components';

import { Icon } from 'components/Atoms';

const checkSize = {
  xlarge: '96px',
  large: '48px',
  medium: '24px',
  small: '16px',
};

export const LoadingIcon = styled(Icon)`
  ${({ size }) => `
    font-size: ${checkSize[size]};
    height: ${checkSize[size]};
    line-height: ${checkSize[size]};
    width: ${checkSize[size]};
  `};
  color: ${({ color }) => color && color};
  filter: ${({ invert }) => invert && 'invert(1)'};
`;
