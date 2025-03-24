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
  color: ${({ color }) => color || 'inherit'};
  margin-top: ${({ mt }) => mt || 0};
  margin-right: ${({ mr }) => mr || 0};
  margin-bottom: ${({ mb }) => mb || 0};
  margin-left: ${({ ml }) => ml || 0};
`;

Item.displayName = 'Item';

export default Item;
