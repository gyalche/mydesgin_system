import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  background: var(--rds-color-neutral-0);
  border:${({ invalid }) => invalid ? '1px solid var(--rds-color-secondary-3-normal);': '1px solid var(--rds-color-neutral-3);'}
  border-radius: 4px;
  color: var(--rds-color-neutral-10);
  height: ${({ compact }) => compact ? '32px' : '40px'};;
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ compact }) => compact ? '6px 8px 6px 8px' : '10px 8px 10px 8px'};
  width: ${({ w }) => w };

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
    background-color: var(--rds-color-neutral-2);
    border: 1px solid var(--rds-color-neutral-3);
    color: var(--rds-color-neutral-5);
  }
`;

Input.propTypes = {
  w: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  compact: PropTypes.bool,
  invalid: PropTypes.bool,
};

Input.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  compact: false,
  invalid: false,
};

export default Input;
