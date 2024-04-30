import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'src/components/Atoms/Typography';

const HelperStyle = styled.p`
  align-items: center;
  color: var(--rds-color-neutral-9);
  display: flex;
`;

export const Helper = ({ children }) => {
  return (
    <Typography level='p4'>
      <HelperStyle>
        {children}
      </HelperStyle>
    </Typography>
      
  );
};

Helper.defaultProps = {
  children: null,
};

Helper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Helper;
