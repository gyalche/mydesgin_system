import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  Dropdown,
  HourMinuteWrapper,
  IconWrapper,
  InputIcon,
  InputWrapper,
  ScrollColumn,
  StaticColumn,
  TimeOption,
  TimePickerContainer
} from './styles';
import useClickOutside from '../../../hooks/useClickOutside';
import { roundToNearestStep } from '../../../utils';
import InputField from './InputField';

const AmPmValue = [{name: 'AM', value:'am'}, {name: 'PM', value:'pm'}];

const TimePicker = ({ is12Hour, step, initialValue, onChange, disabled, error }) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [time, setTime] = useState('');
  
  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;

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
    onChange(updatedTime);
  }, [selectedHour, selectedMinute]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //custom hook for outside click to close the model
  useClickOutside(timePickerRef, () => {
    if ((selectedHour && selectedMinute && (amPm || !is12Hour)) || !time) {
      setIsDropdownOpen(false);
    }
  });

  useEffect(()=>{
    if(initialValue){
      const prevTimeValue = initialValue?.split(':');
      setSelectedHour(prevTimeValue[0]);
      setSelectedMinute(prevTimeValue[1].split(' ')[0]);
      if (is12Hour) {
        setAmPm(prevTimeValue[1].split(' ')[1] || '');
      } else {
        setAmPm('');
      }
      setTime(initialValue);
    }else{
      const now = new Date();
      let currentHour = now.getHours();
      let currentMinute = now.getMinutes();
      const roundedMinute = roundToNearestStep(currentMinute, step);
      
      if (is12Hour) {
        const isPM = currentHour >= 12;
        currentHour = currentHour % 12 || 12;
        setAmPm(isPM ? 'PM' : 'AM');
      }
      setSelectedHour(currentHour);
      setSelectedMinute(roundedMinute);
    }

  },[initialValue, is12Hour]);

  return (
    <TimePickerContainer ref={timePickerRef}>
       <InputWrapper>
          <InputField
            ref={timeInputRef}
            value={time && timeValue}
            readOnly
            placeholder="hh:mm"
            onClick={toggleDropdown}
            disabled={disabled}
            width={100}
            error={error}
          />

          <IconWrapper>
            {time ? (
              <InputIcon onClick={() => {
                  setTime('');
                }}
              >
                <Icon name="alert-circle-solid-cross" />
              </InputIcon>
            ) : (
              <InputIcon onClick={toggleDropdown}>
                <Icon name="global-clock" />
              </InputIcon>
            )}
          </IconWrapper>
        </InputWrapper>

      {isDropdownOpen && (
          <Dropdown is12Hour={is12Hour} data-testid='dropdown-id'>          
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
  is12Hour: PropTypes.bool,
  step: PropTypes.number,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

TimePicker.defaultProps = {
  is12Hour: false,
  step: 15,
  initialValue: null,
  onChange: () => {},
  disabled: false,
  error: false,
};

export default TimePicker;
