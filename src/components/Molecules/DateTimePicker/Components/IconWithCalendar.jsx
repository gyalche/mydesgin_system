import React from 'react';

import { Icon } from 'components/Atoms';

import { InputIcon } from '../styles';

const IconWithCalendar = ({
  startDate,
  dateTimeStart,
  dateTimeEnd,
  dateTimeValue,
  disabled,
  clearStartDate,
  clearStartDateWhenNoDateTime,
  setOpenCalendar,
  openCalendar,
  handleClearTime,
  handleClearFirstTimeRange,
  toggleDropdown,
  isTimePicker,
  time,
}) => {
  let icon;

  if (isTimePicker) {
    if (time) {
      if (dateTimeValue) {
        icon = (
          <InputIcon onClick={handleClearTime}>
            <Icon name="alert-circle-solid-cross" />
          </InputIcon>
        );
      } else {
        icon = (
          <InputIcon onClick={handleClearFirstTimeRange}>
            <Icon name="alert-circle-solid-cross" />
          </InputIcon>
        );
      }
    } else {
      icon = (
        <InputIcon onClick={toggleDropdown}>
          <Icon name="global-clock" />
        </InputIcon>
      );
    }
  } else if (startDate || dateTimeStart || dateTimeEnd) {
    if (dateTimeValue) {
      icon = (
        <InputIcon
          onClick={disabled ? () => {} : clearStartDate}
          data-testid="icon-click"
        >
          <Icon name="alert-circle-solid-cross" />
        </InputIcon>
      );
    } else {
      icon = (
        <InputIcon
          onClick={disabled ? () => {} : clearStartDateWhenNoDateTime}
          data-testid="icon-click"
        >
          <Icon name="alert-circle-solid-cross" />
        </InputIcon>
      );
    }
  } else {
    icon = (
      <InputIcon onClick={() => setOpenCalendar(!openCalendar)}>
        <Icon name="Interface-calendar-dot" />
      </InputIcon>
    );
  }

  return icon;
};

export default IconWithCalendar;
