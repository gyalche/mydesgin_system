import styled from 'styled-components';

const Input = styled.input`
  height: 20px;
  padding: ${({ compact }) => compact ? '4px' : '8px'};
  width: ${({ w }) => w };
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  border-radius: 4px;
  color: var(--rds-neutral-1000);
  border:${({ invalid }) => invalid ? '1px solid var(--rds-red-400);': '1px solid var(--rds-neutral-300);'}

  background: var(--rds-neutral-0);

  &::placeholder {
    color: var(--rds-neutral-500);
  }

  &:hover {
    border: 1px solid var(--rds-teal-400);
  }

  &:focus {
    outline: none;
    border: 1px solid var(--rds-teal-500);
  }

  &:invalid {
    border: 1px solid var(--rds-red-400);
  }

  &:disabled {
    border: 1px solid var(--rds-neutral-300);
    color: var(--rds-neutral-500);
    background-color: var(--rds-neutral-200);
  }
`;

Input.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default Input;
