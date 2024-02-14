import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${({ disabled }) => disabled ? 'var(--rds-color-neutral-5)' : 'var(--rds-color-neutral-9)'};
  font-size: 16px;
`;

Label.propTypes = {
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  disabled: false,
};

export default Label;
