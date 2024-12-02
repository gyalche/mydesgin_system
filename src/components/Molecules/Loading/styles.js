import { Icon } from 'components/Atoms';
import styled from 'styled-components';

const checkSize = {
  xlarge: '96px',
  large: '48px',
  medium: '24px',
  small: '16px',
};

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  aling-items: center;
  justify-content: center;
  border: 1px solid;
  height: 100%;
`;

export const LoadingIcon = styled(Icon)`
  ${({size}) => `
    font-size: ${checkSize[size]};
    height: ${checkSize[size]};
    line-height: ${checkSize[size]};
    width: ${checkSize[size]};
  `};
  color: ${({color}) => color && color};
  filter: ${({ invert }) => invert && 'invert(1)'};
`;
