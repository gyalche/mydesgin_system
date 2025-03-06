import React from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './styles';

function Header({ text }) {
  return <HeaderWrapper level="h9">{text}</HeaderWrapper>;
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
