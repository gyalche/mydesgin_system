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

const TimePicker = ({ is24Hour, step }) => {
  const [selectedHour, setSelectedHour] = useState('1');
  const [selectedMinute, setSelectedMinute] = useState('15');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [time, setTime] = useState('');
  const hours = Array.from({ length: is24Hour ? 24 : 12 }, (_, i) => is24Hour ? i : (i + 1) % 12 || 12).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue =
   `${selectedHour ? String(selectedHour).padStart(2, '0') : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'}`;

  const timePickerRef = useRef(null); 
  const dropdownRef = useRef(null);

  const formatTime = (hour, minute) => {
    if (is24Hour) {
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    } else {
      const formattedHour = hour % 12 || 12;
      return `${String(formattedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }
  };
  
  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    setTime(formatTime(hour, selectedMinute || 0));
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
    setTime(formatTime(selectedHour || 0, minute));
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedHour('');
    setSelectedMinute('');
    setTime('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      timePickerRef.current &&
      !timePickerRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <TimePickerContainer ref={timePickerRef}>
        <TimeInputField
          value={timeValue && timeValue}
          readOnly
          placeholder="hh:mm"
          onClick={toggleDropdown}
        />
     
      {isDropdownOpen && (
          <Dropdown ref={dropdownRef}> 
              <DropdownHeader>
                <TimeInputWrapper>
                  <TimeInput
                    value={timeValue}
                    readOnly
                    placeholder="hh:mm"
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
              <StaticColumn>
                {minutes.map((minute, index) => (
                  <TimeOption
                    key={index}
                    onClick={() => handleMinuteClick(minute)}
                    selected={String(minute) === String(selectedMinute)}
                  >
                    {String(minute).padStart(2, '0')}
                  </TimeOption>
                ))}
              </StaticColumn>
            </HourMinuteWrapper>
           
          </Dropdown>
      )}
    </TimePickerContainer>
  );
};

TimePicker.propTypes = {
  is24Hour: PropTypes.bool,
  step: PropTypes.number,
};

TimePicker.defaultProps = {
  is24Hour: true,
  step: 15,
};

export default TimePicker;
