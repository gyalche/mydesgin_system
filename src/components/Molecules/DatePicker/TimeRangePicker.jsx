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
  TimePickerContainer,
} from './styles';
import useClickOutside from '../../../hooks/useClickOutside';
import { roundToNearestStep } from '../../../utils';
import InputField from './InputField';
import closeOpenModal from '../../../hooks/closeOpenModal';

const AmPmValue = [{name: 'AM', value:'am'}, {name: 'PM', value:'pm'}];

const TimeRangePicker = ({ is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  error,
  placeholder,
  isTimeRange,
  input,
}) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');

  const [selectedHourEnd, setSelectedHourEnd] = useState('');
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState('');
  const [amPmEnd, setAmPmEnd] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] = useState(false);

  const [openTime, setOpenTime] = useState(false);
  const [openTimeEnd, setOpenTimeEnd] = useState(false);

  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [timeErrorFirst, setTimeErrorFirst] = useState(false);
  const [timeErrorLast, setTimeErrorLast] = useState(false);

  const [activeColumn, setActiveColumn] = useState('hour');

  const [highlightedHourIndex, setHighlightedHourIndex] = useState(-1);
  const [highlightedMinuteIndex, setHighlightedMinuteIndex] = useState(-1);
  const [highlightedAmPmIndex, setHighlightedAmPmIndex] = useState(-1);

  const [highlightedHourEndIndex, setHighlightedHourEndIndex] = useState(-1);
  const [highlightedMinuteEndIndex, setHighlightedMinuteEndIndex] = useState(-1);
  const [highlightedAmPmEndIndex, setHighlightedAmPmEndIndex] = useState(-1);

  const columns = ['hour', 'minute', 'ampm'];

  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValueEnd = `${selectedHourEnd ? selectedHourEnd : 'hh'}:${selectedMinuteEnd !== '' ? 
    String(selectedMinuteEnd).padStart(2, '0') : 'mm'} ${amPmEnd}`;

  const timePickerRef = useRef(null);
  const timeInputRef = useRef(null);
  const timeInputRefEnd = useRef(null);

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
    input.onChange(updatedTime);
  }, [selectedMinute, amPm]);

  const handleMinuteClick = useCallback((minute) => {
    setSelectedMinute(String(minute));
    const updatedTime = formatTime(selectedHour, minute, amPm);
    setTime(updatedTime);
    onChange(updatedTime);
    input.onChange(updatedTime);
  }, [selectedHour, amPm]);

  const handleAmPm = useCallback((value)=>{
    setAmPm(value);
    const updatedTime = formatTime(selectedHour, selectedMinute, value);
    setTime(updatedTime);
    onChange([updatedTime, endTime]);
    input.onChange([updatedTime, endTime]);
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
      input.onChange([time, updatedEndTime]);
    },
    [selectedMinuteEnd, amPmEnd, time]
  );

  const handleEndMinuteClick = useCallback(
    (minute) => {
      setSelectedMinuteEnd(String(minute));
      const updatedEndTime = formatTime(selectedHourEnd, minute, amPmEnd);
      setEndTime(updatedEndTime);
      onChange([time, updatedEndTime ]);
      input.onChange([time, updatedEndTime]);
    },
    [selectedHourEnd, amPmEnd, time]
  );

  const handleEndAmPm = useCallback(
    (value) => {
      setAmPmEnd(value);
      const updatedEndTime = formatTime(selectedHourEnd, selectedMinuteEnd, value);
      setEndTime(updatedEndTime);
      onChange([time, updatedEndTime]);
      input.onChange([time, updatedEndTime]);
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
  
  closeOpenModal(() => (setIsDropdownOpen(false), setIsEndTimeDropdownOpen(false)));
  
  const getNearestMinMinute = (current, step) => Math.min(roundToNearestStep(current, step));

  const handleKeyDown = (e) => {
    const isEndTime = isEndTimeDropdownOpen;
    const isStartTime = isDropdownOpen;
    
    if (!isStartTime && !isEndTime) return;
    
    const getColumnIndices = (column, isEndTime) => {
      const hoursIndex = isEndTime ? highlightedHourEndIndex : highlightedHourIndex;
      const minutesIndex = isEndTime ? highlightedMinuteEndIndex : highlightedMinuteIndex;
      const ampmIndex = isEndTime ? highlightedAmPmEndIndex : highlightedAmPmIndex;
      return { hoursIndex, minutesIndex, ampmIndex };
    };
  
    const updateColumnIndex = (setIndexFn, maxLength, direction) => {
      setIndexFn((prevIndex) => {
        const newIndex = (prevIndex + direction + maxLength) % maxLength;
        return newIndex;
      });
    };
  
    const handleArrowDown = (isEndTime) => {
      if (activeColumn === 'hour') {
        updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, 1);
      } else if (activeColumn === 'minute') {
        updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, 1);
      } else if (activeColumn === 'ampm' && is12Hour) {
        updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, 1);
      }
    };
  
    const handleArrowUp = (isEndTime) => {
      if (activeColumn === 'hour') {
        updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, -1);
      } else if (activeColumn === 'minute') {
        updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, -1);
      } else if (activeColumn === 'ampm' && is12Hour) {
        updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, -1);
      }
    };
  
    const handleArrowRight = () => {
      setActiveColumn((prevColumn) => {
        const nextColumnIndex = (columns.indexOf(prevColumn) + 1) % (is12Hour ? columns.length : columns.length - 1);
        return columns[nextColumnIndex];
      });
    };
  
    const handleArrowLeft = () => {
      setActiveColumn((prevColumn) => {
        const prevColumnIndex = (columns.indexOf(prevColumn) - 1 + columns.length) % columns.length;
        return columns[prevColumnIndex];
      });
    };
  
    const handleEnter = (isEndTime) => {
      const { hoursIndex, minutesIndex, ampmIndex } = getColumnIndices(activeColumn, isEndTime);
      
      if (activeColumn === 'hour' && hoursIndex >= 0) {
        isEndTime ? handleEndHourClick(hours[hoursIndex]) : handleHourClick(hours[hoursIndex]);
      } else if (activeColumn === 'minute' && minutesIndex >= 0) {
        isEndTime ? handleEndMinuteClick(minutes[minutesIndex]) : handleMinuteClick(minutes[minutesIndex]);
      } else if (activeColumn === 'ampm' && is12Hour && ampmIndex >= 0) {
        isEndTime ? handleEndAmPm(AmPmValue[ampmIndex].name) : handleAmPm(AmPmValue[ampmIndex].name);
      }
    };
  
    if (isStartTime || isEndTime) {
      switch (e.key) {
        case 'ArrowDown':
          handleArrowDown(isEndTime);
          break;
        case 'ArrowUp':
          handleArrowUp(isEndTime);
          break;
        case 'ArrowRight':
          handleArrowRight();
          break;
        case 'ArrowLeft':
          handleArrowLeft();
          break;
        case 'Enter':
          handleEnter(isEndTime);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    setActiveColumn('hour');
  }, [isEndTimeDropdownOpen]);
  
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

  useEffect(() =>{
   const activeSelectHour = hours.indexOf(selectedHour);
   setHighlightedHourIndex(activeSelectHour);

   const activeMinute = minutes.indexOf(selectedMinute);
   setHighlightedMinuteIndex(activeMinute);

   const activeAmPm = AmPmValue.findIndex((data) => data?.name === amPm);
   setHighlightedAmPmIndex(activeAmPm);

  },[selectedHour, selectedMinute, amPm]);

  useEffect(() => {
    const activeSelectHourEnd = hours.indexOf(selectedHourEnd);
    setHighlightedHourEndIndex(activeSelectHourEnd);
  
    const activeMinuteEnd = minutes.indexOf(selectedMinuteEnd);
    setHighlightedMinuteEndIndex(activeMinuteEnd);
  
    const activeAmPmEnd = AmPmValue.findIndex((data) => data?.name === amPmEnd);
    setHighlightedAmPmEndIndex(activeAmPmEnd);
   },[selectedHourEnd, selectedMinuteEnd, amPmEnd, isEndTimeDropdownOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, highlightedHourIndex, highlightedMinuteIndex, highlightedAmPmIndex, activeColumn, hours, minutes]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (openTime) {
          setIsEndTimeDropdownOpen(false);
          setIsDropdownOpen(true);
        } else if (openTimeEnd) {
          setIsDropdownOpen(false);
          setIsEndTimeDropdownOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openTime, openTimeEnd]);

  useEffect(() => {
    if (Array.isArray(input?.value)) {
      const timeParts = input?.value[0]?.split(':');
      const endTimeParts = input?.value[1]?.split(':');
      if (timeParts.length >= 2) {
        const hour = timeParts[0];
        const minutePart = timeParts[1].split(' ');
        const minute = minutePart[0];
        const amPmValue = minutePart[1] || '';
        setTime(`${hour}:${minute} ${amPmValue}`);
        setSelectedHour(hour);
        setSelectedMinute(minute);
        if (is12Hour) {
          setAmPm(amPmValue || '');
        } else {
          setAmPm('');
        }
      }
      if (endTimeParts.length >= 2) {
        const hour = endTimeParts[0];
        const minutePart = endTimeParts[1].split(' ');
        const minute = minutePart[0];
        const amPmValue = minutePart[1] || '';
        setEndTime(`${hour}:${minute} ${amPmValue}`);
        setSelectedHourEnd(hour);
        setSelectedMinuteEnd(minute);
        if (is12Hour) {
          setAmPmEnd(amPmValue || '');
        } else {
          setAmPmEnd('');
        }
      }
    }
  }, []);

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
            error={timeErrorFirst && time == ''}
            onKeyDown={(e) => { 
              if (e.key === 'Tab' && !e.shiftKey && isTimeRange) {
                e.preventDefault();
                timeInputRefEnd.current?.focus();
                setOpenTime(false);
                setOpenTimeEnd(true);
              }
            }}
          />

          <IconWrapper>
            {time ? (
              <InputIcon onClick={() => {
                setTime('');
                setTimeErrorFirst(true);
                onChange(null);
                input.onChange(null);
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

            <NextIcon name="Interface-arrow-right" />

            <InputWrapper time={true} isTimeRange={isTimeRange}>
              <InputField
                ref={timeInputRefEnd}
                value={endTime && timeValueEnd}
                readOnly
                placeholder={placeholder}
                onClick={toggleEndDropdown}
                disabled={disabled}
                width={is12Hour ? 95 : 85}
                height={40}
                error={timeErrorLast && endTime == ''}
                onKeyDown={(e) => {
                  if (e.key === 'Tab' && e.shiftKey) {
                    e.preventDefault();
                    timeInputRef.current?.focus();
                    setOpenTimeEnd(false);
                    setOpenTime(true);
                  }
                }}
              
              />

              <IconWrapper>
                {endTime ? (
                  <InputIcon onClick={() => {
                    setEndTime('');
                    setTimeErrorLast(true);
                    onChange(null);
                    input.onChange(null);
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
                    onClick={() => handleMinuteClick(minute)}
                    selected={String(minute) === String(selectedMinute)}
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
                      onClick={()=>handleAmPm(name)}
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
        <EndDropDown is12Hour={is12Hour} isTimeRange={isTimeRange}>
          <HourMinuteWrapper>
            <ScrollColumn>
              {hours.map((hour, index) => (
                <TimeOption
                  key={index}
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
                 onClick={() => handleEndMinuteClick(minute)} 
                 selected={String(minute) === String(selectedMinuteEnd)}
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

TimeRangePicker.propTypes = {
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
  input: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

TimeRangePicker.defaultProps = {
  is12Hour: false,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'hh:mm',
  isTimeRange: false,
};

export default TimeRangePicker;
