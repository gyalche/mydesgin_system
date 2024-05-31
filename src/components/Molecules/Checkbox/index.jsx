import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../../Atoms/Icon';
import Typography from '../../Atoms/Typography';
import PropTypes from 'prop-types';

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
    if (isChecked) return 'var(--rds-color-primary-1-deep)';
    return 'var(--rds-color-neutral-6)';
}};

  &:hover {
    color: ${({ disabled }) => {
      if (disabled) return 'var(--rds-color-neutral-5)';
      return 'var(--rds-color-primary-1-dark)';
    }};
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

function Checkbox({ input, value, checkboxName, disabled, label }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (input) {
      setIsChecked(input.checked);
    }
  }, [input]);

  const toggleCheckbox = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (input) {
      input.onChange(newChecked);
    }
  };

  return (
    <CheckboxContainer isChecked={isChecked} onClick={toggleCheckbox} disabled={disabled}>
      <HiddenCheckbox
        type="checkbox"
        checked={isChecked}
        name={checkboxName}
        value={ value }
        {...input}
      />
      <Icon name={isChecked ? 'action-checkbox-selected' : 'action-checkbox-default'} />
      <LabelContainer level="p2">{label}</LabelContainer>
    </CheckboxContainer>
  );
}

Checkbox.defaultProps = {
  value: 'option1',
  label: '',
  checkboxName: 'checkbox',
  disabled: false,
};

Checkbox.propTypes = {
  input: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  checkboxName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
