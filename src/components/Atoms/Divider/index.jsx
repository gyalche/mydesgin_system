import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DividerLine = styled.div`
  width: ${({ w }) => (w ? `${w}` : '100%')};
  height: 2px;
  margin: ${({
    mt,
    mr,
    mb,
    ml,
  }) => `${mt} ${mr} ${mb} ${ml}`};
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
  w: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
};

Divider.defaultProps = {
  w: '100%',
  ml: '0',
  mr: '0',
  mt: '12px',
  mb: '12px',
};

export default Divider;
