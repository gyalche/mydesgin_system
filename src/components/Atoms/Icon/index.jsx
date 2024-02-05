import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icons from 'src/shared/css/icons.module.css';

const StyledIcon = styled.i`
  color: ${({ color }) => color};
`;

const Icon = ({ name, color }) => {
  return (
    <StyledIcon
      color={color}
      className={`rds ${icons[`rds-${name}`]}`}
    ></StyledIcon>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: null,
};

export default Icon;
