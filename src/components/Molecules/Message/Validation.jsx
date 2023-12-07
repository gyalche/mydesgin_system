import styled from 'styled-components';
import React from 'react';
import Icon from 'src/components/Atoms/Icon';
import PropTypes from 'prop-types';

const Message = styled.div`
  margin-top: -2px;
  margin-left: 6px;
`;

const MessageContainer = styled.p`
  display: flex;
  align-items: center;
  color: ${({ isValid }) =>
    isValid ? 'var(--rds-green-600)' : 'var(--rds-red-600)'};
`;

export const Validation = ({ children, isValid }) => {
  return (
    <MessageContainer isValid={isValid}>
      <Icon name={isValid ? 'alert-circle-solid-check' : 'alert-circle-solid-cross'} />
      <Message>
        {children}
      </Message>
    </MessageContainer>
  );
};

Validation.propTypes = {
  children: PropTypes.node.isRequired,
  isValid: PropTypes.bool,
};

export default Validation;
