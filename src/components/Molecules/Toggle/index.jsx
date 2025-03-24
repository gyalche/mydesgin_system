import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const SwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  border-radius: 20px;
  margin: 0;
`;

const SwitchInner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.1s ease-in 0s;

  &:before,
  &:after {
    display: block;
    float: left;
    width: 50%;
    height: ${({ height }) => height};
    padding: 0;
    line-height: ${({ height }) => height};
    color: var(--rds-color-neutral-0);
    box-sizing: border-box;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
  }
  &:before {
    content: attr(data-yes);
    text-transform: uppercase;
    padding-left: 10px;
    background-color: ${({ $disabled, $selectedColor }) => ($disabled ? 'var(--rds-color-neutral-1)' : $selectedColor)};
    color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-4)' : 'var(--rds-color-neutral-0)')};
  }

  &:hover:before {
    background-color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-1)' : 'var(--rds-color-primary-1-dark)')};
  }

  &:active:before {
    background-color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-1)' : 'var(--rds-color-neutral-7)')};
  }

  &:after {
    content: attr(data-no);
    text-transform: uppercase;
    padding-right: 10px;
    background-color: ${({ $disabled, $unselectedColor }) => ($disabled ? 'var(--rds-color-neutral-1)' : $unselectedColor)};
    color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-4)' : 'var(--rds-color-neutral-0)')};
    text-align: right;
  }

  &:hover:after {
    background-color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-1)' : 'var(--rds-color-neutral-6)')};
  }

  &:active:after {
    background-color: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-1)' : 'var(--rds-color-primary-1-deep)')};
  }
`;

const SwitchSwitch = styled.span`
  display: block;
  width: calc(${({ height }) => height} - 10px);
  height: calc(${({ height }) => height} - 10px);
  margin: 5px;
  background: ${({ $disabled }) => ($disabled ? 'var(--rds-color-neutral-4)' : 'var(--rds-color-neutral-0)')};
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${({ width, height }) => `calc(${width} - ${height})`};
  border-radius: 20px;
  transition: all 0.1s ease-in 0s;
`;

const commonIconWrapperStyles = css`
  color: ${({ $disabled }) => ($disabled
    ? 'var(--rds-color-neutral-4)'
    : 'var(--rds-color-neutral-0)')};
  font-size: 24px;
  position: absolute;
  top: -4px;
  transition: visibility 0.1s ease-in-out 0.1s;
`;

const SelectedIconWrapper = styled.div`
  ${commonIconWrapperStyles}
  visibility: hidden;
  left: 0px;
`;

const UnselectedIconWrapper = styled.div`
  ${commonIconWrapperStyles}
  visibility: visible;
  right: 0px;
`;

const SwitchWrapper = styled.div`
  position: relative;
  width: ${({ width }) => (width ? `${width}` : '32px')};
  height: ${({ height }) => (height ? `${height}` : '16px')};
  display: inline-block;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: left;

  ${HiddenCheckbox}:checked + ${SwitchLabel} {
    ${SwitchInner} {
      margin-left: 0;
    }
    ${SwitchSwitch} {
      right: 0;
    }
    ${SelectedIconWrapper} {
      visibility: visible;
    }
    ${UnselectedIconWrapper} {
      visibility: hidden;
    }
  }
`;

function Toggle({
  id,
  w,
  name,
  h,
  labels,
  colors,
  disabled,
  input,
  tabIndex,
  checked,
  onChange,
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

  const handleKeyPress = event => {
    if (event.key === ' ' || event.key === 'Spacebar') {
      const newChecked = !isChecked;

      // Only update local state if not controlled
      if (!isControlled) {
        setIsChecked(newChecked);
        if (onChange) {
          onChange(newChecked);
        }
      }

      if (input && input.onChange) {
        input.onChange(newChecked);
      }
    }
  };

  const handleOnChange = () => {
    const newChecked = !isChecked;

    // Only update local state if not controlled
    if (!isControlled) {
      setIsChecked(newChecked);
      if (onChange) {
        onChange(newChecked);
      }
    }

    if (input && input.onChange) {
      input.onChange(newChecked);
    }
  };

  return (
    <SwitchWrapper
      width={w}
      height={h}
      data-testid="switch-wrapper"
      onKeyDown={handleKeyPress}
    >
      <HiddenCheckbox
        name={name}
        id={id}
        role="checkbox"
        disabled={disabled}
        checked={isChecked}
        onChange={handleOnChange}
        readOnly={true}
      />
      <SwitchLabel
        htmlFor={id}
        $disabled={disabled}
        tabIndex={tabIndex}
        data-testid="switch-label"
      >
        <SwitchInner
          height={h}
          data-yes={typeof labels[0] === 'string' ? labels[0] : ''}
          data-no={typeof labels[0] === 'string' ? labels[1] : ''}
          $selectedColor={colors[0]}
          $unselectedColor={colors[1]}
          $disabled={disabled}
          data-testid="switch-inner"
        />
        {typeof labels[0] !== 'string' && (
          <SelectedIconWrapper $disabled={disabled}>
            {labels[0]}
          </SelectedIconWrapper>
        )}
        {typeof labels[1] !== 'string' && (
          <UnselectedIconWrapper $disabled={disabled}>
            {labels[1]}
          </UnselectedIconWrapper>
        )}
        <SwitchSwitch width={w} height={h} $disabled={disabled} />
      </SwitchLabel>
    </SwitchWrapper>
  );
}

Toggle.defaultProps = {
  w: '78px',
  h: '24px',
  id: 'Toggle-id',
  name: 'Toggle-name',
  labels: ['Online', 'Offline'],
  colors: ['var(--rds-color-primary-1-normal)', 'var(--rds-color-neutral-5)'],
  disabled: false,
  input: null,
  tabIndex: '0',
  checked: false,
  onChange: null,
};

Toggle.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  labels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element]),
  ),
  colors: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    value: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  }),
  tabIndex: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
