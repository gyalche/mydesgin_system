import React from 'react';
import PropTypes from 'prop-types';
import icons from 'src/shared/css/icons.module.css';

const Icon = ({ name }) => {
  return <i className={['rds', icons[`rds-${name}`]].join(' ')}></i>;
};

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: null,
};

export default Icon;
