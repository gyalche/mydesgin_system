import React from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './styles';

const Header = ({ text }) => {
  return <HeaderWrapper>{text}</HeaderWrapper>;
};

Header.defaultProps = {
  text: '',
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
