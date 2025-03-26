import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/Atoms';

import { InputIcon } from '../styles';

function IconWithCalendar({
  startDate,
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
}) {
  let icon;

  if (isTimePicker) {
    if (time) {
      if (dateTimeValue) {
        icon = (
          <InputIcon
            onClick={handleClearTime}
            type="button"
            aria-label="Clear time"
          >
            <Icon name="alert-circle-solid-cross" />
          </InputIcon>
        );
      } else {
        icon = (
          <InputIcon
            onClick={handleClearFirstTimeRange}
            type="button"
            aria-label="Clear time range"
          >
            <Icon name="alert-circle-solid-cross" />
          </InputIcon>
        );
      }
    } else {
      icon = (
        <InputIcon
          onClick={toggleDropdown}
          type="button"
          aria-label="Open time picker"
        >
          <Icon name="global-clock" />
        </InputIcon>
      );
    }
  } else if (startDate) {
    if (dateTimeValue) {
      icon = (
        <InputIcon
          onClick={disabled ? () => {} : clearStartDate}
          data-testid="icon-click"
          type="button"
          aria-label="Clear date"
        >
          <Icon name="alert-circle-solid-cross" />
        </InputIcon>
      );
    } else {
      icon = (
        <InputIcon
          onClick={disabled ? () => {} : clearStartDateWhenNoDateTime}
          data-testid="icon-click"
          type="button"
          aria-label="Clear date"
        >
          <Icon name="alert-circle-solid-cross" />
        </InputIcon>
      );
    }
  } else {
    icon = (
      <InputIcon
        onClick={() => setOpenCalendar(!openCalendar)}
        type="button"
        aria-label="Open calendar"
      >
        <Icon name="Interface-calendar-dot" />
      </InputIcon>
    );
  }

  return icon;
}

IconWithCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  dateTimeValue: PropTypes.bool,
  disabled: PropTypes.bool,
  clearStartDate: PropTypes.func,
  clearStartDateWhenNoDateTime: PropTypes.func,
  setOpenCalendar: PropTypes.func,
  openCalendar: PropTypes.bool,
  handleClearTime: PropTypes.func,
  handleClearFirstTimeRange: PropTypes.func,
  toggleDropdown: PropTypes.func,
  isTimePicker: PropTypes.bool,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

IconWithCalendar.defaultProps = {
  startDate: null,
  dateTimeValue: false,
  disabled: false,
  clearStartDate: () => {},
  clearStartDateWhenNoDateTime: () => {},
  setOpenCalendar: () => {},
  openCalendar: false,
  handleClearTime: () => {},
  handleClearFirstTimeRange: () => {},
  toggleDropdown: () => {},
  isTimePicker: false,
  time: '',
};

export default IconWithCalendar;
