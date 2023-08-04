import styled from 'styled-components';

const Item = styled.div`
  flex: ${({ flex }) => flex || '0 1 auto'};
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || 'auto'};
  min-width: ${({ minW }) => minW || 'unset'};
  min-height: ${({ minH }) => minH || 'unset'};
  max-width: ${({ maxW }) => maxW || 'none'};
  max-height: ${({ maxH }) => maxH || 'none'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
`;

export default Item;
