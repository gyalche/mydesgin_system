import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from 'components/Atoms/Typography';

const Label = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: ${({ disabled }) => (disabled ? 'var(--rds-color-neutral-5)' : 'var(--rds-color-neutral-9)')};
`;

// Added this for storybook
Label.displayName = 'Label';

Label.propTypes = {
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  disabled: false,
};

export default Label;
