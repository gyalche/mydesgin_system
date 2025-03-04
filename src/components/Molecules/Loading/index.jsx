import React from 'react';
import PropTypes from 'prop-types';

import animations from 'shared/css/animations.module.css';

import { LoadingIcon } from './styles';

function Spinner({ size, color, invert }) {
  return (
    <LoadingIcon className={animations.spin} name="global-spinner" size={size} invert={invert} color={color} />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['xlarge', 'large', 'medium', 'small']),
  color: PropTypes.string,
  invert: PropTypes.bool,
};

Spinner.defaultProps = {
  size: 'xlarge',
  invert: false,
  color: 'var(--rds-color-neutral-6)',
};

export default Spinner;
