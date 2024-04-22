const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || 'auto'};
  min-width: ${({ minW }) => minW || 'unset'};
  min-height: ${({ minH }) => minH || 'unset'};
  max-width: ${({ maxW }) => maxW || 'none'};
  max-height: ${({ maxH }) => maxH || 'none'};
  margin-top: ${({ mt }) => mt || 0};
  margin-right: ${({ mr }) => mr || 0};
  margin-bottom: ${({ mb }) => mb || 0};
  margin-left: ${({ ml }) => ml || 0};
  padding-top: ${({ pt }) => pt || 0};
  padding-right: ${({ pr }) => pr || 0};
  padding-bottom: ${({ pb }) => pb || 0};
  padding-left: ${({ pl }) => pl || 0};
  gap: ${({ gap }) => gap || 0};
  cursor: ${({ cursor }) => cursor || 'auto'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || 'unset'};

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    user-select: none;
    
    & * {
      opacity: 0.4;
    }
  `}
`;

import styled from 'styled-components';

export default Flex;
