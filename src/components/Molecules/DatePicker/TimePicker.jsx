import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes, { string } from 'prop-types';
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
  TimePickerContainer
} from './styles';
import useClickOutside from '../../../hooks/useClickOutside';
import { roundToNearestStep } from '../../../utils';
import InputField from './InputField';

const AmPmValue = [{name: 'AM', value:'am'}, {name: 'PM', value:'pm'}];

const TimePicker = ({ is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  error,
  placeholder,
  isTimeRange,
}) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');

  const [selectedHourEnd, setSelectedHourEnd] = useState('');
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState('');
  const [amPmEnd, setAmPmEnd] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] = useState(false);

  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [toCurrentTime, setToCurrentTime] = useState(false);
  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValueEnd = `${selectedHourEnd ? selectedHourEnd : 'hh'}:${selectedMinuteEnd !== '' ? 
    String(selectedMinuteEnd).padStart(2, '0') : 'mm'} ${amPmEnd}`;

  const timePickerRef = useRef(null);
  const timeInputRef = useRef(null);

  const formatTime = (hour, minute, amPmvalue) => {
    if (!is12Hour) {
      return `${hour}:${String(minute).padStart(2, '0')}`;
    } else {
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${String(minute).padStart(2, '0')} ${amPmvalue}`;
    }
  };

  const handleHourClick = useCallback((hour) => {
    setSelectedHour(String(hour));
    const updatedTime = formatTime(hour, selectedMinute, amPm);
    setTime(updatedTime);
    onChange(updatedTime);
  }, [selectedMinute, amPm]);

  const handleMinuteClick = useCallback((minute) => {
    setSelectedMinute(String(minute));
    const updatedTime = formatTime(selectedHour, minute, amPm);
    setTime(updatedTime);
    onChange(updatedTime);
  }, [selectedHour, amPm]);

  const handleAmPm = useCallback((value)=>{
    setAmPm(value);
    const updatedTime = formatTime(selectedHour, selectedMinute, value);
    setTime(updatedTime);
    onChange([updatedTime, endTime]);
  }, [selectedHour, selectedMinute, endTime]);

  const toggleDropdown = () => {
    setIsEndTimeDropdownOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleEndDropdown = () => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(!isEndTimeDropdownOpen);
  };

  const handleEndHourClick = useCallback(
    (hour) => {
      setSelectedHourEnd(String(hour));
      const updatedEndTime = formatTime(hour, selectedMinuteEnd, amPmEnd);
      setEndTime(updatedEndTime);
      onChange([time, updatedEndTime ]);
    },
    [selectedMinuteEnd, amPmEnd, time]
  );

  const handleEndMinuteClick = useCallback(
    (minute) => {
      setSelectedMinuteEnd(String(minute));
      const updatedEndTime = formatTime(selectedHourEnd, minute, amPmEnd);
      setEndTime(updatedEndTime);
      onChange([time, updatedEndTime ]);
    },
    [selectedHourEnd, amPmEnd, time]
  );

  const handleEndAmPm = useCallback(
    (value) => {
      setAmPmEnd(value);
      const updatedEndTime = formatTime(selectedHourEnd, selectedMinuteEnd, value);
      setEndTime(updatedEndTime);
      onChange([time, updatedEndTime]);
    },
    [selectedHourEnd, selectedMinuteEnd, time]
  );

  //custom hook for outside click to close the model
  useClickOutside(timePickerRef, () => {
    if ((selectedHour && (amPm || !is12Hour)) || !time || isTimeRange) {
      setIsDropdownOpen(false);
      setIsEndTimeDropdownOpen(false);
    }
  });

  useEffect(()=>{
    if(initialValue){
      if (Array.isArray(initialValue)) {
        const startTime = initialValue[0]?.split(':');
        const endTime = initialValue[1]?.split(':');
  
        setSelectedHour(startTime[0]);
        setSelectedMinute(startTime[1]?.split(' ')[0]);
        if (is12Hour) {
          setAmPm(startTime[1]?.split(' ')[1] || '');
        }
  
        setSelectedHourEnd(endTime[0]);
        setSelectedMinuteEnd(endTime[1]?.split(' ')[0]);
        if (is12Hour) {
          setAmPmEnd(endTime[1]?.split(' ')[1] || '');
        }
  
        setTime(initialValue[0]);
        setEndTime(initialValue[1]);
  
      } else {
        const prevTimeValue = initialValue?.split(':');
  
        setSelectedHour(prevTimeValue[0]);
        setSelectedMinute(prevTimeValue[1]?.split(' ')[0]);
        if (is12Hour) {
          setAmPm(prevTimeValue[1]?.split(' ')[1] || '');
        } else {
          setAmPm('');
        }
  
        setTime(initialValue);
      }
    }else{
      const now = new Date();
      let currentHour = now.getHours();
      let currentMinute = now.getMinutes();
      const roundedMinute = Math.min(roundToNearestStep(currentMinute, step));
      
      if (is12Hour) {
        const isPM = currentHour >= 12;
        currentHour = currentHour % 12 || 12;
        setAmPm(isPM ? 'PM' : 'AM');
        setAmPmEnd(isPM ? 'PM' : 'AM');
      }
      setSelectedHour(currentHour);
      setSelectedMinute(roundedMinute);

      setSelectedHourEnd(currentHour);
      setSelectedMinuteEnd(roundedMinute);
    }

  },[initialValue, is12Hour, toCurrentTime]);

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
            error={error}
          />

          <IconWrapper>
            {time ? (
              <InputIcon onClick={() => {
                setTime('');
                onChange(null);
              }}>
                <Icon name="alert-circle-solid-cross" />
              </InputIcon>
            ) : (
              <InputIcon onClick={toggleDropdown}>
                <Icon name="global-clock" />
              </InputIcon>
            )}
          </IconWrapper>
        </InputWrapper>

        {isTimeRange && 
          <>
            <NextIcon name="Interface-arrow-right" />

            <InputWrapper time={true} isTimeRange={isTimeRange}>
              <InputField
                ref={timeInputRef}
                value={endTime && timeValueEnd}
                readOnly
                placeholder={placeholder}
                onClick={toggleEndDropdown}
                disabled={disabled}
                width={is12Hour ? 95 : 85}
                height={40}
                error={error}
              />

              <IconWrapper>
                {endTime ? (
                  <InputIcon onClick={() => {
                    setEndTime('');
                    onChange(null);
                  }}>
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
        }
      </InputContainer>
 
      {isDropdownOpen && (
        <Dropdown is12Hour={is12Hour} isTimeRange={isTimeRange} data-testid='dropdown-id'>     
            <HourMinuteWrapper>
              <ScrollColumn>
                {hours?.map((hour, index) => (
                  <TimeOption
                    key={index}
                    onClick={() => handleHourClick(hour)}
                    selected={String(hour) === String(selectedHour)}
                  >
                    {hour}
                  </TimeOption>
                ))}
              </ScrollColumn>
              <ScrollColumn>
                {minutes.map((minute, index) => (
                  <TimeOption
                    key={index}
                    onClick={() => handleMinuteClick(minute)}
                    selected={String(minute) === String(selectedMinute)}
                  >
                    {String(minute).padStart(2, '0')}
                  </TimeOption>
                ))}
              </ScrollColumn>
              {is12Hour && (
                <StaticColumn>
                  {AmPmValue.map(({name, value})=>(
                    <TimeOption
                      key={value}
                      onClick={()=>handleAmPm(name)}
                      selected={name === amPm}
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
        <EndDropDown is12Hour={is12Hour} isTimeRange={isTimeRange}>
          <HourMinuteWrapper>
            <ScrollColumn>
              {hours.map((hour, index) => (
                <TimeOption key={index} onClick={() => handleEndHourClick(hour)} selected={String(hour) === String(selectedHourEnd)}>
                  {hour}
                </TimeOption>
              ))}
            </ScrollColumn>
            <ScrollColumn>
              {minutes.map((minute, index) => (
                <TimeOption key={index} onClick={() => handleEndMinuteClick(minute)} selected={String(minute) === String(selectedMinuteEnd)}>
                  {String(minute).padStart(2, '0')}
                </TimeOption>
              ))}
            </ScrollColumn>
            {is12Hour && (
              <StaticColumn>
                {AmPmValue.map(({ name, value }) => (
                  <TimeOption key={value} onClick={() => handleEndAmPm(name)} selected={name === amPmEnd}>
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
    PropTypes.arrayOf(string), 
    PropTypes.instanceOf(string),
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  isTimeRange: PropTypes.bool,
};

TimePicker.defaultProps = {
  is12Hour: false,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'hh:mm',
  isTimeRange: false,
};

export default TimePicker;
