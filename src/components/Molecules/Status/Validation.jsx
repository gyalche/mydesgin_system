import styled from 'styled-components';
import React from 'react';
import Icon from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import Typography from 'components/Atoms/Typography';

const ValidText = styled.div`
  font-size: 11px;
  margin-top: -2px;
  margin-left: 6px;
`;

const ValidTextContainer = styled.div`
  height: 22px;
  align-items: center;
  color: ${({ $isValid }) => $isValid ? 'var(--rds-green-600)' : 'var(--rds-color-secondary-3-deep)'};
  display: flex;
`;

export const Validation = ({ children, isValid }) => {
  return (
    <Typography level='p4'>
      <ValidTextContainer $isValid={isValid}>
        <Icon name={isValid ? 'alert-circle-solid-check' : 'alert-circle-solid-cross'} />
        <ValidText>
          {children}
        </ValidText>
      </ValidTextContainer>
    </Typography>
  );
};

Validation.defaultProps = {
  children: null,
  isValid: true,
};

Validation.propTypes = {
  children: PropTypes.node.isRequired,
  isValid: PropTypes.bool,
};

export default Validation;
