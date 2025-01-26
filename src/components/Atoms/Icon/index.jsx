import React from 'react';
import PropTypes from 'prop-types';

import icons from 'shared/css/icons.module.css';

function Icon({ name, className, ...props }) {
  return (
    <i className={`rds ${icons[`rds-${name}`]} ${className}`} {...props} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
