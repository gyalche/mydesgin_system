import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'src/components/Atoms/Typography';
import PropTypes from 'prop-types';

const Label= styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: ${({ disabled }) => disabled ? 'var(--rds-color-neutral-5)' : 'var(--rds-color-neutral-9)'};
`;

Label.propTypes = {
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  disabled: false,
};

export default Label;
