import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  ClearButton,
  Column,
  Dropdown,
  TimeInput,
  TimeInputWrapper,
  TimeOption,
  TimePickerContainer
} from './styles';

const TimePicker = ({ is24Hour, step }) => {
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('15');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [time, setTime] = useState('');
  const hours = Array.from({ length: is24Hour ? 24 : 12 }, (_, i) => is24Hour ? i : (i + 1) % 12 || 12);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    setTime(`${hour}`);
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
    setTime(value => `${value}:${minute ? minute : selectedMinute ? selectedMinute : '00'}`);
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedHour('');
    setSelectedMinute('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <TimePickerContainer>
      <TimeInputWrapper onClick={toggleDropdown}>
        <TimeInput
          value={`${String(selectedHour).padStart(2, selectedHour ? '0':'hh')} : ${String(selectedMinute).padStart(2, selectedMinute ? '0' : 'mm')}`}
          readOnly
          placeholder="hh:mm"
        />
        {selectedHour !== '' && (
          <ClearButton onClick={clearSelection}>
            <Icon name="alert-circle-solid-cross" />
          </ClearButton>
        )}
      </TimeInputWrapper>
      {isDropdownOpen && (
        <Dropdown>
          <Column>
            {hours.map((hour, index) => (
              <TimeOption
                key={index}
                onClick={() => handleHourClick(hour)}
                selected={String(hour) === String(selectedHour)}
              >
                {String(hour).padStart(2, '0')}
              </TimeOption>
            ))}
          </Column>
          <Column>
            {minutes.map((minute, index) => (
              <TimeOption
                key={index}
                onClick={() => handleMinuteClick(minute)}
                selected={String(minute) === String(selectedMinute)}
              >
                {String(minute).padStart(2, '0')}
              </TimeOption>
            ))}
          </Column>
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
  is24Hour: false,
  step: 15,
};

export default TimePicker;
