import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Icon from '../../Atoms/Icon';
import Typography from '../../Atoms/Typography';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CheckboxContainer = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ isChecked, disabled }) => {
    if (disabled) return 'var(--rds-color-neutral-5)';
    if (isChecked) return 'var(--rds-color-primary-1-normal)';
    return 'var(--rds-color-neutral-6)';
  }};

  &:hover {
  color: ${({ isChecked, disabled }) => {
    if (disabled) return 'var(--rds-color-neutral-5)';
    if (isChecked) return 'var(--rds-color-primary-1-dark)';
    return 'var(--rds-color-primary-1-normal)';
  }};
  }

  &:active {
    color: var(--rds-color-primary-1-deep);
  }

  input:focus + i {
    &::before {
      outline: 3px solid var(--rds-color-primary-1-pale);
      outline-offset: -2px;
      border-radius: 7px;
    }
  }
`;

const LabelContainer = styled(Typography)`
  color: var(--rds-color-neutral-10);
  margin-top: -4px;
  margin-left: 8px;
`;

function Checkbox({
  input, value, name, disabled, label, checked, onChange,
}) {
  // For react-final-form, we need to check if input.checked is defined
  const isControlled = input && (input.checked !== undefined);
  const [isChecked, setIsChecked] = useState(isControlled ? input?.checked : checked || false);

  // Update local state when input.checked or checked changes
  useEffect(() => {
    if (isControlled) {
      setIsChecked(input.checked);
    } else if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [input, isControlled, checked]);

  const toggleCheckbox = event => {
    event.preventDefault();
    if (disabled) return;

    const newChecked = !isChecked;

    // Only update local state if not controlled
    if (!isControlled) {
      setIsChecked(newChecked);
      if (onChange) {
        onChange(newChecked);
      }
    }

    // Call onChange handler if provided
    if (input && input.onChange) {
      input.onChange(newChecked);
    }
  };

  return (
    <CheckboxContainer isChecked={isChecked} onClick={toggleCheckbox} disabled={disabled}>
      <HiddenCheckbox
        type="checkbox"
        name={input?.name || name}
        value={value}
        checked={isChecked}
        readOnly={true}
      />
      <Icon name={isChecked ? 'action-checkbox-selected' : 'action-checkbox-default'} />
      <LabelContainer level="p2">{label}</LabelContainer>
    </CheckboxContainer>
  );
}

Checkbox.defaultProps = {
  value: 'option1',
  label: '',
  name: 'checkbox',
  disabled: false,
  input: null,
  checked: false,
  onChange: null,
};

Checkbox.propTypes = {
  input: PropTypes.shape({
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
  }),
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
