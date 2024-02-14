import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextArea = styled.textarea`
  background: var(--rds-color-neutral-0);
  border:${({ invalid }) => invalid ? '1px solid var(--rds-color-secondary-3-normal);': '1px solid var(--rds-color-neutral-3);'}
  border-radius: 4px;
  color: var(--rds-color-neutral-10);
  height: ${({ h }) => h };
  width: ${({ w }) => w };
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: 8px;
  resize: none;

  &::placeholder {
    color: var(--rds-color-neutral-5);
  }

  &:hover {
    border: 1px solid var(--rds-color-primary-1-normal);
  }

  &:invalid {
    border: 1px solid var(--rds-color-secondary-3-normal);
  }

  &:disabled {
    background-color: var(--rds-color-neutral-2)
    border: 1px solid var(--rds-color-neutral-3);
    color: var(--rds-color-neutral-5);
  }
`;

TextArea.propTypes = {
  invalid: PropTypes.bool,
  h: PropTypes.string,
  w: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
};

TextArea.defaultProps = {
  invalid: false,
  h: '500px',
  w: '200px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default TextArea;
