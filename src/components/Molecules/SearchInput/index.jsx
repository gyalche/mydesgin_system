import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Input } from 'src/components/Atoms';

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-left: ${({ compact }) => (compact ? '30px' : '40px')};
`;

const IconWrapper = styled.div`
  font-size: ${({ $isInputCompact }) => ($isInputCompact ? '16px' : '24px')};
  left: 8px;
  position: absolute;
  top: ${({ $isInputCompact }) => ($isInputCompact ? '55%' : '53%')};
  transform: translateY(-50%);
  color: var(--rds-color-neutral-5);
`;

const SearchInput = ({ compact, placeholder, icon, input, ...props }) => {
  const handleOnChange = event => {
    input?.onChange(event);
  };

  return (
    <InputWrapper>
      <StyledInput
        name={input?.name}
        value={input?.value}
        onChange={handleOnChange}
        compact={compact}
        placeholder={placeholder}
        {...props}
      />
      <IconWrapper $isInputCompact={compact}>
        <Icon
          name={icon}
          data-testid={`icon-${icon}`}
        />
      </IconWrapper>
    </InputWrapper>
  );
};

SearchInput.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  placeholder: null,
  compact: false,
  isInvalid: false,
  icon: 'action-loupe',
};

SearchInput.propTypes = {
  w: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isInvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  input: PropTypes.object,
};

export default SearchInput;
