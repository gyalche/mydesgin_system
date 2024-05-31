import Icon from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const RadioButtonLabel = styled.label`
  cursor: pointer;
  padding: 8px 20px 8px 20px;
  padding-${({ position }) => position }: 32px;
  border: 1px solid transparent;
  position: relative;

  input:focus + span {
    & > i::before {
      outline: 3px solid var(--rds-color-primary-1-pale);
      outline-offset: -2px;
      border-radius: 100%;
    }
  }
`;

const RadioButtonIcon = styled.span`
  ${({ position }) => position }: 0;
  cursor: pointer;
  font-size: 20px;
  position: absolute;

  &:hover {
    color: var(--rds-color-primary-1-normal);
  }

  &:active-within {
    color: var(--rds-color-primary-1-deep);
  }

  ${RadioButtonLabel}:active & {
    color: var(--rds-color-primary-1-deep);
  }
`;

const HiddenRadio = styled.input`
  opacity: 0;
  position: absolute;
  ${({ position }) => position }: 0;

  &:checked + ${RadioButtonIcon} {
    color: var(--rds-color-primary-1-normal);
  }

  &:active {
    color: var(--rds-color-primary-1-deep);
  }

  &[disabled] + ${RadioButtonIcon} {
    color: var(--rds-color-neutral-5);
    cursor: not-allowed;
  }
`;

const RadioButton = ({ label, checked, onChange, value, disabled, position }) => {
  const actualPosition = position === 'right' ? position : 'left';

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <RadioButtonLabel position={actualPosition}>
      <HiddenRadio
        id={`radio-${value}`}
        type="radio"
        checked={checked}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        position={actualPosition}
      />
      <RadioButtonIcon position={actualPosition}>
        <Icon name={`action-circle-${checked ? 'radio-selected' : 'regular'}`} />
      </RadioButtonIcon>
      {label}
    </RadioButtonLabel>
  );
};

RadioButton.defaultProps = {
  checked: true,
  disabled: false,
  label: null,
  onChange: null,
  position: 'left',
  value: null,
};

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  position: PropTypes.string,
};

export default RadioButton;
