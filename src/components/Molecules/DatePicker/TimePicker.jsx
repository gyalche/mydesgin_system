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
import useEscToClose from '../../../hooks/useEscToClose';

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

  const [activeColumn, setActiveColumn] = useState('hour'); // Added to track active column

  const columns = ['hour', 'minute', 'ampm'];

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
  useEscToClose(() => setIsDropdownOpen(false));
  
  const getNearestMinMinute = (current, step) => Math.min(roundToNearestStep(current, step));

  useEffect(()=>{
    if(initialValue){
      if (Array.isArray(initialValue)) {
        const startTime = initialValue[0]?.split(':');
        const endTime = initialValue[1]?.split(':');

        const roundedMinute = getNearestMinMinute(startTime[1]?.split(' ')[0], step);
        const roundedMinuteEnd = getNearestMinMinute(endTime[1]?.split(' ')[0], step);

        setSelectedHour(startTime[0]);
        setSelectedMinute(roundedMinute);
        if (is12Hour) {
          setAmPm(startTime[1]?.split(' ')[1] || '');
        }
  
        setSelectedHourEnd(endTime[0]);
        setSelectedMinuteEnd(roundedMinuteEnd);
        if (is12Hour) {
          setAmPmEnd(endTime[1]?.split(' ')[1] || '');
        }
  
        setTime(initialValue[0]);
        setEndTime(initialValue[1]);
  
      } else {
        const prevTimeValue = initialValue?.split(':');
        const nearestMinute = getNearestMinMinute(prevTimeValue[1]?.split(' ')[0], step);
        setSelectedHour(prevTimeValue[0]);
        setSelectedMinute(nearestMinute);
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
      const roundedMinute = getNearestMinMinute(currentMinute, step);
      
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

  },[initialValue, is12Hour]);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDropdownOpen || isEndTimeDropdownOpen) {
        const totalAmPmOptions = is12Hour ? AmPmValue.length : 0;
        const totalItems = hours.length + minutes.length + totalAmPmOptions;
  
        switch (e.key) {
          case 'ArrowDown':
            setHighlightedIndex((prevIndex) =>
              prevIndex < totalItems - 1 ? prevIndex + 1 : 0
            );
            break;
          case 'ArrowUp':
            setHighlightedIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : totalItems - 1
            );
            break;
          case 'ArrowRight':
            setActiveColumn((prevColumn) => {
              const nextColumnIndex = (columns.indexOf(prevColumn) + 1) % columns.length;
              return columns[nextColumnIndex];
            });
            break;
          case 'ArrowLeft':
            setActiveColumn((prevColumn) => {
              const prevColumnIndex = (columns.indexOf(prevColumn) - 1 + columns.length) % columns.length;
              return columns[prevColumnIndex];
            });
            break;
          case 'Enter':
            // Select the value based on the active column
            if (activeColumn === 'hour' && highlightedIndex >= 0 && highlightedIndex < hours.length) {
              handleHourClick(hours[highlightedIndex]);
            } else if (activeColumn === 'minute' && highlightedIndex >= hours.length && highlightedIndex < hours.length + minutes.length) {
              handleMinuteClick(minutes[highlightedIndex - hours.length]);
            } else if (activeColumn === 'ampm' && is12Hour) {
              handleAmPm(AmPmValue[highlightedIndex - hours.length - minutes.length]?.name);
            }
            break;
          case 'Escape':
            setIsDropdownOpen(false);
            setIsEndTimeDropdownOpen(false);
            break;
          default:
            break;
        }
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, highlightedIndex, activeColumn, hours, minutes, handleHourClick, handleMinuteClick, isEndTimeDropdownOpen]);
  

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
                    highlighted={highlightedIndex === index && activeColumn==='hour'}
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
                    highlighted={highlightedIndex === hours.length + index}
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
                      onClick={()=>handleAmPm(name)}
                      selected={name === amPm}
                      highlighted={highlightedIndex === minutes.length + index && activeColumn === 'minute'}
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
                  <TimeOption key={value} onClick={() => handleEndAmPm(name)} 
                  selected={name === amPmEnd}>
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
