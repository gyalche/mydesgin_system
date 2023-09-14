import styled from 'styled-components';

const TextArea = styled.textarea`
  height: ${({ h }) => h };
  width: ${({ w }) => w };
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: 8px;
  border-radius: 4px;
  color: var(--rds-neutral-1000);
  background: var(--rds-neutral-0);
  resize: none;
  border:${({ invalid }) => invalid ? '1px solid var(--rds-red-400);': '1px solid var(--rds-neutral-300);'}

  &::placeholder {
    color: var(--rds-neutral-500);
  }

  &:hover {
    border: 1px solid var(--rds-teal-400);
  }

  &:invalid {
    border: 1px solid var(--rds-red-400);
  }

  &:disabled {
    border: 1px solid var(--rds-neutral-300);
    color: var(--rds-neutral-500);
    background-color: var(--rds-neutral-200)
  }
`;

TextArea.defaultProps = {
  h: '5000px'
};

export default TextArea;
