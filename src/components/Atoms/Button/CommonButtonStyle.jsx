import styled from 'styled-components';

const CommonButtonStyle = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  width: ${({ w }) => w };
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};

  &:disabled {
    background-color: var(--rds-neutral-200);
    border-color: var(--rds-neutral-400);
    color: var(--rds-neutral-700);
  }
`;

CommonButtonStyle.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default CommonButtonStyle;
