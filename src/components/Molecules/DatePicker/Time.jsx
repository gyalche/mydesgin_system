import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  ClearButton,
  Dropdown,
  DropdownHeader,
  HourMinuteWrapper,
  ScrollColumn,
  StaticColumn,
  TimeInput,
  TimeInputField,
  TimeInputWrapper,
  TimeOption,
  TimePickerContainer
} from './styles';
import useClickOutside from './useClickOutside';

const TimePicker = ({ is24Hour, step, prevTime }) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [time, setTime] = useState('');
  const hours = Array.from({ length: is24Hour ? 24 : 12 }, (_, i) => is24Hour ? i : (i + 1) % 12 || 12).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue =
   `${selectedHour ? String(selectedHour).padStart(2, '0') : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;

  const timePickerRef = useRef(null); 

  const AmPmValue = [{name: 'AM', value:'am'}, {name: 'PM', value:'pm'}];

  const formatTime = (hour, minute, amPmvalue) => {
    if (is24Hour) {
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    } else {
      const formattedHour = hour % 12 || 12;
      return `${String(formattedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${amPmvalue}`;
    }
  };
  
  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    setTime(formatTime(hour, selectedMinute || 0));
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
    setTime(formatTime(selectedHour, minute || 0));
  };

  const handleAmPm = (value)=>{
    setAmPm(value);
    setTime(formatTime(selectedHour || 0, selectedMinute, value));
  };
  const clearSelection = () => {
    setSelectedHour('');
    setSelectedMinute('');
    setAmPm('');
    setTime('');
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    //custom hook for outside click to close the model
    useClickOutside(timePickerRef, () => setIsDropdownOpen(false));

  useEffect(()=>{
    const prevTimeValue = prevTime?.split(':');
    setSelectedHour(prevTimeValue[0]);
    setSelectedMinute(prevTimeValue[1].split(' ')[0]);
    {!is24Hour && setAmPm(prevTimeValue[1].split(' ')[1]);}
    setTime(prevTime);
  },[]);

  return (
    <TimePickerContainer ref={timePickerRef}>
        <TimeInputField
          value={timeValue && timeValue}
          readOnly
          placeholder="hh:mm"
          onClick={toggleDropdown}
        />
     
      {isDropdownOpen && (
          <Dropdown is24Hour={is24Hour}> 
              <DropdownHeader>
                <TimeInputWrapper  is24Hour={is24Hour}>
                  <TimeInput
                    value={timeValue}
                    readOnly
                    placeholder="hh:mm"
                    is24Hour={is24Hour}
                  />
                  {selectedHour !== '' && (
                    <ClearButton onClick={clearSelection}>
                      <Icon name="alert-circle-solid-cross" />
                    </ClearButton>
                  )}
                </TimeInputWrapper>
              </DropdownHeader>
          
              <HourMinuteWrapper>
              <ScrollColumn>
                  {hours?.map((hour, index) => (
                    <TimeOption
                      key={index}
                      onClick={() => handleHourClick(hour)}
                      selected={String(hour) === String(selectedHour)}
                    >
                      {String(hour).padStart(2, '0')}
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
                {!is24Hour && (
                  <StaticColumn>
                    {AmPmValue.map(({name, value})=>(
                      <TimeOption
                        key={value}
                        onClick={()=>handleAmPm(name)}
                        selected={name===amPm}
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
  is24Hour: PropTypes.bool,
  step: PropTypes.number,
  prevTime: PropTypes.string,
};

TimePicker.defaultProps = {
  is24Hour: false,
  step: 15,
  prevTime: '12:15 AM'
};

export default TimePicker;
