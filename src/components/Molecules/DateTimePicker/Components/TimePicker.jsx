import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/Atoms';

import {
  Dropdown,
  EndDropDown,
  IconWrapper,
  InputContainer,
  InputIcon,
  InputWrapper,
  NextIcon,
  TimePickerContainer,
} from '../styles';
import InputField from './InputField';
import { AM_PM_VALUES } from '../../../../constant/timePerios';
import { useTimePickerKeyboardNavigation } from '../hooks/useTimePickerKeyboardNavigation';
import { useTimePickerHandler } from '../hooks/useTimePickerHandler';
import IconWithCalendar from './IconWithCalendar';
import TimeDropdown from './TimeDropDown';

function TimePicker({
  is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  placeholder,
  isRangePicker,
  input,
  isDateTimeDouble,
  dateTimeDefault,
  dateTimeValue,
}) {
  const timePickerRef = useRef(null);
  const timeInputRef = useRef(null);
  const timeInputRefEnd = useRef(null);

  const {
    selectedHour,
    selectedHourEnd,
    selectedMinute,
    selectedMinuteEnd,
    amPm,
    amPmEnd,
    time,
    timeErrorFirst,
    timeErrorLast,
    endTime,
    hours,
    minutes,
    roundUpMinute,
    roundMinuteSecond,
    timeError,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm,
    handleClearTime,
    handleClearFirstTimeRange,
    handleClearEndTime,
  } = useTimePickerHandler({
    step,
    isRangePicker,
    onChange,
    input,
    is12Hour,
    initialValue,
    isDateTimeDouble,
    dateTimeDefault,
  });
  const {
    isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedIndex,
    activeColumn,
    toggleDropdown,
    toggleEndDropdown,
    onKeyDownFirstInput,
    onKeyDownSecondInput,
  } = useTimePickerKeyboardNavigation({
    is12Hour,
    AmPmValue: AM_PM_VALUES,
    timeInputRef,
    timeInputRefEnd,
    timePickerRef,
    hours,
    minutes,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm,
  });
  const timeValue = `${selectedHour || 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValueEnd = `${selectedHourEnd || 'hh'}:${selectedMinuteEnd !== '' ? String(selectedMinuteEnd).padStart(2, '0') : 'mm'} ${amPmEnd}`;

  return (
    <TimePickerContainer ref={timePickerRef}>
      <InputContainer>
        <InputWrapper time={true}>
          <InputField
            ref={timeInputRef}
            value={time && timeValue}
            readOnly={true}
            placeholder={placeholder}
            onClick={toggleDropdown}
            disabled={disabled}
            width={is12Hour ? 95 : 85}
            height={40}
            isInvalid={dateTimeValue ? timeError && time === '' : timeErrorFirst && time === ''}
            onKeyDown={onKeyDownFirstInput}
          />

          <IconWrapper>
            <IconWithCalendar
              time={time}
              dateTimeValue={dateTimeValue}
              handleClearTime={handleClearTime}
              handleClearFirstTimeRange={handleClearFirstTimeRange}
              toggleDropdown={toggleDropdown}
              isTimePicker={true}
            />
          </IconWrapper>
        </InputWrapper>
        {isRangePicker && (
          <>
            <NextIcon name="Interface-arrow-right" />

            <InputWrapper time={true} isTimeRange={isRangePicker}>
              <InputField
                ref={timeInputRefEnd}
                value={endTime && timeValueEnd}
                readOnly={true}
                placeholder={placeholder}
                onClick={toggleEndDropdown}
                disabled={disabled}
                width={is12Hour ? 95 : 85}
                height={40}
                isInvalid={timeErrorLast && endTime === ''}
                onKeyDown={onKeyDownSecondInput}
              />

              <IconWrapper>
                {endTime ? (
                  <InputIcon onClick={handleClearEndTime}>
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ) : (
                  <InputIcon onClick={toggleDropdown}>
                    <Icon name="global-clock" />
                  </InputIcon>
                )}
              </IconWrapper>
            </InputWrapper>
          </>
        )}

      </InputContainer>

      {isDropdownOpen && (
        <Dropdown is12Hour={is12Hour} isTimeRange={isRangePicker} data-testid="dropdown-id">
          <TimeDropdown
            is12Hour={is12Hour}
            isRangePicker={isRangePicker}
            hours={hours}
            minutes={minutes}
            AmPmValue={AM_PM_VALUES}
            handleHourClick={handleHourClick}
            handleMinuteClick={handleMinuteClick}
            handleAmPm={handleAmPm}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            roundUpMinute={roundUpMinute}
            amPm={amPm}
            highlightedHourIndex={highlightedIndex?.hour}
            highlightedMinuteIndex={highlightedIndex?.minute}
            highlightedAmPmIndex={highlightedIndex?.ampm}
            activeColumn={activeColumn}
          />
        </Dropdown>
      )}

      {isEndTimeDropdownOpen && (
        <EndDropDown is12Hour={is12Hour} isTimeRange={isRangePicker}>
          <TimeDropdown
            is12Hour={is12Hour}
            isRangePicker={isRangePicker}
            hours={hours}
            minutes={minutes}
            AmPmValue={AM_PM_VALUES}
            handleHourClick={handleEndHourClick}
            handleMinuteClick={handleEndMinuteClick}
            handleAmPm={handleEndAmPm}
            selectedHour={selectedHourEnd}
            selectedMinute={selectedMinuteEnd}
            roundUpMinute={roundMinuteSecond}
            amPm={amPmEnd}
            highlightedHourIndex={highlightedIndex?.hourEnd}
            highlightedMinuteIndex={highlightedIndex?.minuteEnd}
            highlightedAmPmIndex={highlightedIndex?.ampmEnd}
            activeColumn={activeColumn}
            isEndTime={true}
          />
        </EndDropDown>
      )}
    </TimePickerContainer>
  );
}

TimePicker.propTypes = {
  is12Hour: PropTypes.bool,
  step: PropTypes.number,
  initialValue: PropTypes.oneOfType([
    PropTypes.arrayOf(Date),
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  isRangePicker: PropTypes.bool,
  input: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  isDateTimeDouble: PropTypes.bool,
  dateTimeDefault: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  dateTimeValue: PropTypes.bool,
};

TimePicker.defaultProps = {
  is12Hour: false,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  placeholder: 'hh:mm',
  isRangePicker: false,
  isDateTimeDouble: false,
  dateTimeValue: false,
  input: {},
  dateTimeDefault: null,
};
export default TimePicker;
