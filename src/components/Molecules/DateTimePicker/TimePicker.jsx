import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  Dropdown,
  EndDropDown,
  HourMinuteWrapper,
  IconWrapper,
  InputContainer,
  InputIcon,
  InputWrapper,
  NextIcon,
  ScrollColumn,
  StaticColumn,
  TimeOption,
  TimePickerContainer,
} from './styles';
import InputField from './InputField';
import { useTimePickerSelector } from '../../../hooks/useTimePickerSelector';
import { AmPmValue } from '../../../constants';

const TimePicker = ({ is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  placeholder,
  isRangePicker,
  input,
  isDateTimeDouble,
  dateTimeDefault,
  dateTimeValue
}) => {
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
    isDropdownOpen,
    isEndTimeDropdownOpen,
    hours,
    minutes,
    highlightedHourIndex,
    highlightedMinuteIndex,
    highlightedAmPmIndex,
    highlightedHourEndIndex,
    highlightedMinuteEndIndex,
    highlightedAmPmEndIndex,
    roundUpMinute,
    activeColumn,
    roundMinuteSecond,
    timeError,
    toggleDropdown,
    toggleEndDropdown,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm,
    handleClearTime,
    handleClearFirstTimeRange,
    handleClearEndTime,
    onKeyDownFirstInput,
    onKeyDownSecondInput
  } = useTimePickerSelector({
    step,
    isRangePicker,
    onChange,
    input,
    is12Hour,
    initialValue,
    isDateTimeDouble,
    dateTimeDefault,
    AmPmValue,
    timeInputRef,
    timeInputRefEnd,
    timePickerRef
  });
  const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValueEnd = `${selectedHourEnd ? selectedHourEnd : 'hh'}:${selectedMinuteEnd !== '' ? 
    String(selectedMinuteEnd).padStart(2, '0') : 'mm'} ${amPmEnd}`;

  return (
    <TimePickerContainer ref={timePickerRef}>
      <InputContainer>
        <InputWrapper time={true}>
          <InputField
            ref={timeInputRef}
            value={time && timeValue}
            readOnly
            placeholder={placeholder}
            onClick={toggleDropdown}
            disabled={disabled}
            width={is12Hour ? 95 : 85}
            height={40}
            isInvalid={dateTimeValue ? timeError && time === '' : timeErrorFirst && time === ''}
            onKeyDown={onKeyDownFirstInput}
          />

          <IconWrapper>
            {time ? (
              <>
                {dateTimeValue ? (
                  <InputIcon onClick={handleClearTime}>
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ): (
                  <InputIcon onClick={handleClearFirstTimeRange}>
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                )}
              </>
            ) : (
              <InputIcon onClick={toggleDropdown}>
                <Icon name="global-clock" />
              </InputIcon>
            )}
          </IconWrapper>
        </InputWrapper>
            {isRangePicker && (
              <>
              <NextIcon name="Interface-arrow-right" />

              <InputWrapper time={true} isTimeRange={isRangePicker}>
                <InputField
                  ref={timeInputRefEnd}
                  value={endTime && timeValueEnd}
                  readOnly
                  placeholder={placeholder}
                  onClick={toggleEndDropdown}
                  disabled={disabled}
                  width={is12Hour ? 95 : 85}
                  height={40}
                  isInvalid={timeErrorLast && endTime == ''}
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
        <Dropdown is12Hour={is12Hour} isTimeRange={isRangePicker} data-testid='dropdown-id'>     
            <HourMinuteWrapper>
              <ScrollColumn>
                {hours?.map((hour, index) => (
                  <TimeOption
                    key={index}
                    id={`hour-${index}`}
                    onClick={() => handleHourClick(hour)}
                    selected={String(hour) === String(selectedHour)}
                    highlighted={highlightedHourIndex === index && activeColumn === 'hour'}
                  >
                    {hour}
                  </TimeOption>
                ))}
              </ScrollColumn>
              <ScrollColumn>
                {minutes.map((minute, index) => (
                  <TimeOption
                    key={index}
                    id={`minute-${index}`}
                    onClick={() => handleMinuteClick(minute)}
                    selected={String(minute) === String(roundUpMinute)}
                    highlighted={highlightedMinuteIndex === index && activeColumn === 'minute'}
                  >
                    {String(minute).padStart(2, '0')}
                  </TimeOption>
                ))}
              </ScrollColumn>
              {is12Hour && (
                <StaticColumn>
                  {AmPmValue.map(({name, value}, index)=>(
                    <TimeOption
                      key={value}
                      id={`amPm-${index}`}
                      onClick={() => handleAmPm(name)}
                      selected={name === amPm}
                      highlighted={highlightedAmPmIndex === index && activeColumn === 'ampm'}
                    >
                      {name}
                    </TimeOption>
                  ))}
              </StaticColumn>
              )}
            </HourMinuteWrapper>
        </Dropdown>
      )}
      {isEndTimeDropdownOpen && (
        <EndDropDown is12Hour={is12Hour} isTimeRange={isRangePicker}>
          <HourMinuteWrapper>
            <ScrollColumn>
              {hours.map((hour, index) => (
                <TimeOption
                  key={index}
                  id={`hour-${index}`}
                  onClick={() => handleEndHourClick(hour)}
                  selected={String(hour) === String(selectedHourEnd)}
                  highlighted={highlightedHourEndIndex === index && activeColumn === 'hour'}
                  >
                  {hour}
                </TimeOption>
              ))}
            </ScrollColumn>
            <ScrollColumn>
              {minutes.map((minute, index) => (
                <TimeOption
                 key={index}
                 id={`minute-${index}`}
                 onClick={() => handleEndMinuteClick(minute)} 
                 selected={String(minute) === String(roundMinuteSecond)}
                 highlighted={highlightedMinuteEndIndex === index && activeColumn === 'minute'}
                 >
                  {String(minute).padStart(2, '0')}
                </TimeOption>
              ))}
            </ScrollColumn>
            {is12Hour && (
              <StaticColumn>
                {AmPmValue.map(({ name, value }, index) => (
                  <TimeOption
                    key={value}
                    id={`amPm-${index}`}
                    onClick={() => handleEndAmPm(name)} 
                    selected={name === amPmEnd}
                    highlighted={highlightedAmPmEndIndex === index && activeColumn === 'ampm'}
                    >
                    {name}
                  </TimeOption>
                ))}
              </StaticColumn>
            )}
          </HourMinuteWrapper>
        </EndDropDown>
      )}
    </TimePickerContainer>
  );
};

TimePicker.propTypes = {
  is12Hour: PropTypes.bool,
  step: PropTypes.number,
  initialValue: PropTypes.oneOfType([
    PropTypes.arrayOf(Date), 
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  isRangePicker: PropTypes.bool,
  input: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  isDateTimeDouble: PropTypes.bool,
  dateTimeDefault: PropTypes.any,
  dateTimeValue: PropTypes.bool,
};

TimePicker.defaultProps = {
  is12Hour: false,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'hh:mm',
  isRangePicker: false,
  isDateTimeDouble: false,
  dateTimeValue: false,
};
export default TimePicker;
