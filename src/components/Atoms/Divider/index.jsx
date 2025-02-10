import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DividerLine = styled.div`
  width: ${({ w }) => (w ? `${w}px` : '100%')};
  height: 2px;
  margin: ${({
    mt,
    mr,
    mb,
    ml,
  }) => `${mt}px ${mr}px ${mb}px ${ml}px`};
  border-radius: 21px;
  background-color: var(--rds-color-neutral-3);
`;
function Divider({
  w,
  ml,
  mr,
  mt,
  mb,
}) {
  return <DividerLine role="separator" w={w} ml={ml} mr={mr} mt={mt} mb={mb} />;
}

Divider.propTypes = {
  w: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
};

Divider.defaultProps = {
  w: null,
  ml: 0,
  mr: 0,
  mt: 12,
  mb: 12,
};

export default Divider;
