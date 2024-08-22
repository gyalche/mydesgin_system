import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimePickerContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  width: 100px;
  background-color: #f9f9f9;
`;

const TimeInput = styled.input`
  border: none;
  background: none;
  font-size: 12px;
  width: 60px;
  text-align: center;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;

  &:hover {
    color: #999;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000;
  display: flex;
  max-height: 200px;
  overflow-y: auto;
`;

const Column = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 50%;
  border-left: 1px solid #ccc;
  &:first-child {
    border-left: none;
  }
`;

const TimeOption = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TimePicker = ({ is24Hour, step }) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hours = Array.from({ length: is24Hour ? 24 : 12 }, (_, i) => is24Hour ? i : (i + 1) % 12 || 12);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
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
          <ClearButton onClick={clearSelection}>&times;</ClearButton>
        )}
      </TimeInputWrapper>
      {isDropdownOpen && (
        <Dropdown>
          <Column>
            {hours.map((hour, index) => (
              <TimeOption key={index} onClick={() => handleHourClick(hour)}>
                {String(hour).padStart(2, '0')}
              </TimeOption>
            ))}
          </Column>
          <Column>
            {minutes.map((minute, index) => (
              <TimeOption key={index} onClick={() => handleMinuteClick(minute)}>
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
