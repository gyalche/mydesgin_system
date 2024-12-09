import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  Dropdown,
  HourMinuteWrapper,
  IconWrapper,
  InputContainer,
  InputIcon, 
  InputWrapper,
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

const TimePicker = ({ is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  error,
  placeholder,
  input,
  isDateTimeDouble,
  dateTimeDefault,
}) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState('');
  const [activeColumn, setActiveColumn] = useState('hour');
  const [timeError, setTimeError] = useState(false);

  const [highlightedHourIndex, setHighlightedHourIndex] = useState(-1);
  const [highlightedMinuteIndex, setHighlightedMinuteIndex] = useState(-1);
  const [highlightedAmPmIndex, setHighlightedAmPmIndex] = useState(-1);

  useEffect(() => {
    setTime(input?.value);
  }, [input?.value]);

  const columns = ['hour', 'minute', 'ampm'];

  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  // const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValue = useMemo(() => {
    const formattedMinute = selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm';
    const formattedHour = selectedHour ? selectedHour : 'hh';
    return `${formattedHour}:${formattedMinute} ${amPm}`;
  }, [selectedHour, selectedMinute, amPm, input]);

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
    if(input?.onChange){
      input.onChange(updatedTime);
    }
  }, [selectedMinute, amPm]);

  const handleMinuteClick = useCallback((minute) => {
    setSelectedMinute(String(minute));
    const updatedTime = formatTime(selectedHour, minute, amPm);
    setTime(updatedTime);
    onChange(updatedTime);
    if(input?.onChange){
      input.onChange(updatedTime);
    }
  }, [selectedHour, amPm]);

  const handleAmPm = useCallback((value)=>{
    setAmPm(value);
    const updatedTime = formatTime(selectedHour, selectedMinute, value);
    setTime(updatedTime);
    onChange(updatedTime);
    if(input?.onChange){
      input.onChange(updatedTime);
    }
  }, [selectedHour, selectedMinute]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useClickOutside(timePickerRef, () => {
    if ((selectedHour && (amPm || !is12Hour)) || !time) {
      setIsDropdownOpen(false);
    }
  });
  
  closeOpenModal(() => (setIsDropdownOpen(false)));
  
  const getNearestMinMinute = (current, step) => Math.min(roundToNearestStep(current, step));

  const handleKeyDown = (e) => {
    const getColumnIndices = () => {
      const hoursIndex = highlightedHourIndex;
      const minutesIndex = highlightedMinuteIndex;
      const ampmIndex = highlightedAmPmIndex;
      return { hoursIndex, minutesIndex, ampmIndex };
    };
  
    const updateColumnIndex = (setIndexFn, maxLength, direction) => {
      setIndexFn((prevIndex) => {
        const newIndex = (prevIndex + direction + maxLength) % maxLength;
        return newIndex;
      });
    };
  
    const handleArrowDown = () => {
      if (activeColumn === 'hour') {
        updateColumnIndex(setHighlightedHourIndex, hours.length, 1);
      } else if (activeColumn === 'minute') {
        updateColumnIndex(setHighlightedMinuteIndex, minutes.length, 1);
      } else if (activeColumn === 'ampm' && is12Hour) {
        updateColumnIndex(setHighlightedAmPmIndex, AmPmValue.length, 1);
      }
    };
  
    const handleArrowUp = () => {
      if (activeColumn === 'hour') {
        updateColumnIndex(setHighlightedHourIndex, hours.length, -1);
      } else if (activeColumn === 'minute') {
        updateColumnIndex(setHighlightedMinuteIndex, minutes.length, -1);
      } else if (activeColumn === 'ampm' && is12Hour) {
        updateColumnIndex(setHighlightedAmPmIndex, AmPmValue.length, -1);
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
        handleHourClick(hours[hoursIndex]);
      } else if (activeColumn === 'minute' && minutesIndex >= 0) {
        handleMinuteClick(minutes[minutesIndex]);
      } else if (activeColumn === 'ampm' && is12Hour && ampmIndex >= 0) {
        handleAmPm(AmPmValue[ampmIndex].name);
      }
    };
    switch (e.key) {
      case 'ArrowDown':
        handleArrowDown();
        break;
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowRight':
        handleArrowRight();
        break;
      case 'ArrowLeft':
        handleArrowLeft();
        break;
      case 'Enter':
        handleEnter();
        break;

      default:
        break;
    }
  };

  useEffect(()=>{
    if(initialValue){
      if (Array.isArray(initialValue)) {
        const startTime = initialValue[0]?.split(':');

        const roundedMinute = getNearestMinMinute(startTime[1]?.split(' ')[0], step);

        setSelectedHour(startTime[0]);
        setSelectedMinute(roundedMinute);
        if (is12Hour) {
          setAmPm(startTime[1]?.split(' ')[1] || '');
        }
  
        setTime(initialValue[0]);
  
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
      }
      setSelectedHour(currentHour);
      setSelectedMinute(roundedMinute);
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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, highlightedHourIndex, highlightedMinuteIndex, highlightedAmPmIndex, activeColumn, hours, minutes]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (openTime) {
          setIsDropdownOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openTime]);

  useEffect(() => {
    if ((input?.value || dateTimeDefault?.time) && !isDateTimeDouble) {
      const timeParts = input?.value?.split(':')
      || Array.isArray(dateTimeDefault?.time) ? dateTimeDefault?.time[0]?.split(':') : dateTimeDefault?.time?.split(':');
      if (timeParts?.length >= 2) {
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
    }
  }, [input?.value, dateTimeDefault]);
  useEffect(() => {
    if (input?.value && !isDateTimeDouble) {
      const timeParts = input?.value?.split(':');
      if (timeParts.length >= 2) {
        const hour = timeParts[0];
        const [minute, amPmValue = ''] = timeParts[1].split(' ');
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setAmPm(is12Hour ? amPmValue : '');
        setTime(`${hour}:${minute} ${amPmValue}`);
      }
    }
  }, []);
  
  useEffect(() => {
    if(isDateTimeDouble && Array.isArray(dateTimeDefault?.time)){
      const timeParts = dateTimeDefault?.time[1]?.split(':');
      if (timeParts?.length >= 2) {
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
    }
  },[]);

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
            error={timeError && time == ''}
            onKeyDown={(e) => { 
              if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                timeInputRefEnd.current?.focus();
                setOpenTime(false);
              }
            }}
          />

          <IconWrapper>
            {time ? (
              <InputIcon onClick={() => {
                setTime('');
                setTimeError(true);
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
        <Dropdown is12Hour={is12Hour} isTimeRange={false} data-testid='dropdown-id'>     
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
  input: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  isDateTimeDouble: PropTypes.bool,
  dateTimeDefault: PropTypes.any,
};

TimePicker.defaultProps = {
  is12Hour: true,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'hh:mm',
};

export default TimePicker;
