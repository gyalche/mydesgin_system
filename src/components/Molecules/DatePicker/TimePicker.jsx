import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import useClickOutside from '../../../hooks/useClickOutside';
import { createDateFromTime, roundToNearestStep } from '../../../utils';
import InputField from './InputField';
import closeOpenModal from '../../../hooks/closeOpenModal';
import useTimePickerKeyboardNavigation from '../../../hooks/useTimePickerKeyboard';

const AmPmValue = [{name: 'AM', value:'am'}, {name: 'PM', value:'pm'}];

const TimePicker = ({ is12Hour,
  step,
  initialValue,
  onChange,
  disabled,
  error,
  placeholder,
  isRangePicker,
  input,
  isDateTimeDouble,
  dateTimeDefault,
  dateTimeValue
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
  const [roundUpMinute, setRoundUpMinute] = useState(null);
  const [timeError, setTimeError] = useState(false);
  
  const [highlightedHourIndex, setHighlightedHourIndex] = useState(-1);
  const [highlightedMinuteIndex, setHighlightedMinuteIndex] = useState(-1);
  const [highlightedAmPmIndex, setHighlightedAmPmIndex] = useState(-1);

  const [highlightedHourEndIndex, setHighlightedHourEndIndex] = useState(-1);
  const [highlightedMinuteEndIndex, setHighlightedMinuteEndIndex] = useState(-1);
  const [highlightedAmPmEndIndex, setHighlightedAmPmEndIndex] = useState(-1);

  const [roundMinuteFirst, setRoundMinueFirst] = useState(null);
  const [roundMinuteSecond, setRoundMinueSecond] = useState(null);
  const columns = ['hour', 'minute', 'ampm'];

  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  const timeValue = `${selectedHour ? selectedHour : 'hh'}:${selectedMinute !== '' ? String(selectedMinute).padStart(2, '0') : 'mm'} ${amPm}`;
  const timeValueEnd = `${selectedHourEnd ? selectedHourEnd : 'hh'}:${selectedMinuteEnd !== '' ? 
    String(selectedMinuteEnd).padStart(2, '0') : 'mm'} ${amPmEnd}`;
  const timePickerRef = useRef(null);
  const timeInputRef = useRef(null);
  const timeInputRefEnd = useRef(null);

  const handleHourClick = useCallback((hour) => {
    const timeString = `${hour}:${selectedMinute}:00 ${amPm}`;
    const updatedTime = createDateFromTime(timeString);
    setSelectedHour(String(hour));
    setTime(updatedTime);
    if(!isRangePicker){
      onChange(updatedTime);
      input?.onChange(updatedTime);
    }else {
      onChange([updatedTime, endTime]);
      input?.onChange([updatedTime, endTime]);
    }
  }, [selectedMinute, amPm]);

  const handleMinuteClick = useCallback((minute) => {
    const timeString = `${selectedHour}:${minute}:00 ${amPm}`;
    const updatedTime = createDateFromTime(timeString);
    setSelectedMinute(String(minute));
    setRoundUpMinute(String(minute));
    setTime(updatedTime);

    if(!isRangePicker){
      onChange(updatedTime);
      input?.onChange(updatedTime);
    }else {
      onChange([updatedTime, endTime]);
      input?.onChange([updatedTime, endTime]);
    }
  }, [selectedHour, amPm]);

  const handleAmPm = useCallback((value) => {
    const timeString = `${selectedHour}:${selectedMinute}:00 ${value}`;
    const updatedTime = createDateFromTime(timeString);
  
    setAmPm(value);
    setTime([updatedTime, endTime]);
    onChange([updatedTime, endTime]);
    if(!isRangePicker){
      onChange(updatedTime);
      input?.onChange(updatedTime);
    }else {
      onChange([updatedTime, endTime]);
      input?.onChange([updatedTime, endTime]);
    }
  }, [selectedHour, selectedMinute]);
  
  const handleEndHourClick = useCallback((hour) => {
    setSelectedHourEnd(String(hour));
    const timeString = `${hour}:${selectedMinuteEnd}:00 ${amPmEnd}`;
    const updatedEndTime = createDateFromTime(timeString);
    setEndTime(updatedEndTime);
    onChange([time, updatedEndTime]);
    input?.onChange([time, updatedEndTime]);
  }, [selectedMinuteEnd, amPmEnd, time]);

  const handleEndMinuteClick = useCallback((minute) => {
    const timeString = `${selectedHourEnd}:${minute}:00 ${amPmEnd}`;
    const updatedTime = createDateFromTime(timeString);
    setRoundMinueSecond(getNearestMinMinute(minute, step));
    setSelectedMinuteEnd(String(minute));
    setTime(updatedTime);
    onChange([time, updatedTime]);
  
    if (input?.onChange) {
      input.onChange([time, updatedTime]);
    }
  }, [selectedHourEnd, amPmEnd, time]);

  const handleEndAmPm = useCallback((value) => {
    const timeString = `${selectedHourEnd}:${selectedMinuteEnd}:00 ${value}`;
    const updatedTime = createDateFromTime(timeString);
    setAmPmEnd(value);
    setEndTime([time, updatedTime]);
    onChange([time, updatedTime]);
    if (input?.onChange) {
      input.onChange([time, updatedTime]);
    }
  }, [selectedHour, selectedMinute]);

  const toggleDropdown = () => {
    setIsEndTimeDropdownOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleEndDropdown = () => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(!isEndTimeDropdownOpen);
  };
  //custom hook for outside click to close the model
  useClickOutside(timePickerRef, () => {
    if ((selectedHour && (amPm || !is12Hour)) || !time || isRangePicker) {
      setIsDropdownOpen(false);
      setIsEndTimeDropdownOpen(false);
    }
  });
  
  closeOpenModal(() => (setIsDropdownOpen(false), setIsEndTimeDropdownOpen(false)));
  
  const getNearestMinMinute = (current, step) => Math.min(roundToNearestStep(current, step));

  useEffect(() => {
    setActiveColumn('hour');
  }, [isEndTimeDropdownOpen]);
  

  useEffect(() => {
    const handleDate = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const isPM = hours >= 12;
      const hour = is12Hour ? hours % 12 || 12 : hours;
      const amPmValue = is12Hour ? (isPM ? 'PM' : 'AM') : '';
  
      return {
        hour,
        minute: minutes,
        amPm: amPmValue,
      };
    };

    if (Array.isArray(input?.value || initialValue)) {
      const startDate = input?.value[0] || initialValue[0];
      const endDate = input?.value[1] || initialValue[1];
  
      const startTime = handleDate(startDate);
      const endTime = handleDate(endDate);
  
      setTime(createDateFromTime(`${startTime.hour}:${startTime.minute} ${startTime.amPm}`));
      setSelectedHour(startTime.hour);
      setSelectedMinute(startTime.minute);
      setAmPm(startTime.amPm);
      setRoundUpMinute(getNearestMinMinute(startTime?.minute, step));
      setEndTime(`${endTime.hour}:${endTime.minute} ${endTime.amPm}`);

      setSelectedHourEnd(endTime.hour);
      setSelectedMinuteEnd(endTime.minute);
      setRoundMinueSecond(getNearestMinMinute(endTime.minute, step));
      setAmPmEnd(endTime.amPm);
    }
  }, [input?.value, is12Hour, step]);

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

  useTimePickerKeyboardNavigation({
    isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedHourIndex,
    highlightedMinuteIndex,
    highlightedAmPmIndex,
    highlightedHourEndIndex,
    highlightedMinuteEndIndex,
    highlightedAmPmEndIndex,
    activeColumn,
    hours,
    minutes,
    AmPmValue,
    is12Hour,
    columns,
    step,
    setHighlightedHourIndex,
    setHighlightedMinuteIndex,
    setHighlightedAmPmIndex,
    setHighlightedHourEndIndex,
    setHighlightedMinuteEndIndex,
    setHighlightedAmPmEndIndex,
    setActiveColumn,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm
  });

  useEffect(() => {
    if (Array.isArray(input?.value || initialValue)) {
      const handleDate = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isPM = hours >= 12;
        const hour = is12Hour ? hours % 12 || 12 : hours;
        const amPmValue = is12Hour ? (isPM ? 'PM' : 'AM') : '';
  
        return {
          hour,
          minute: minutes,
          amPm: amPmValue,
        };
      };
      const startDate = input?.value[0] || initialValue[0];
      const endDate = input?.value[1] || initialValue[1];
  
      const startTime = handleDate(startDate);
      const timeEnd = handleDate(endDate);

      setTime(startDate);
      setSelectedHour(startTime.hour);
      setSelectedMinute(startTime.minute);
      setAmPm(startTime.amPm);
  
      setEndTime(endDate);
      setSelectedHourEnd(timeEnd.hour);
      setSelectedMinuteEnd(timeEnd.minute);
      setAmPmEnd(timeEnd.amPm);
    }
  }, [is12Hour, step, input?.value]);

  useEffect(() => {
    if ((input?.value || dateTimeDefault) && !isDateTimeDouble) {
      let timeParts = [];
      let date = null;
      if (typeof input?.value === 'string') {
        const timeParts = input?.value.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        date = new Date();
        date.setHours(hours, minutes);
      } else if (input?.value instanceof Date && !isNaN(input?.value)) {
        date = input?.value;
      } else if (dateTimeDefault instanceof Date && !isNaN(dateTimeDefault)) {
        date = dateTimeDefault;
      } else if (Array.isArray(dateTimeDefault) && dateTimeDefault[0] instanceof Date) {
        date = dateTimeDefault[0];
      }
  
      if (date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPmValue = hours >= 12 ? 'PM' : 'AM';
        setRoundUpMinute(getNearestMinMinute(minutes, step));

        timeParts = [`${hours % 12 || 12}`, `${minutes} ${amPmValue}`];
  
        const hour = timeParts[0];
        const [minute, amPm = ''] = timeParts[1].split(' ');
        setTime(`${hour}:${minute} ${amPm}`);
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setAmPm(is12Hour ? amPm : '');
      }
    }
  }, [input?.value, isDateTimeDouble, is12Hour]);

  useEffect(() => {
    if (isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length > 1) {
      const endDate = dateTimeDefault[1];
  
      if (endDate instanceof Date && !isNaN(endDate)) {
        const hours = endDate.getHours();
        const minutes = endDate.getMinutes();
        const amPmValue = hours >= 12 ? 'PM' : 'AM';
        const timeParts = [`${hours % 12 || 12}`, `${minutes} ${amPmValue}`];
        setRoundUpMinute(getNearestMinMinute(minutes, step));
        setTime(`${timeParts[0]}:${timeParts[1].split(' ')[0]} ${amPmValue}`);
        setSelectedHour(timeParts[0]);
        setSelectedMinute(timeParts[1].split(' ')[0]);
        setAmPm(is12Hour ? amPmValue : '');
      }
    }
  }, [isDateTimeDouble, is12Hour]);

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
            error={dateTimeValue ? timeError && time === '' : timeErrorFirst && time === ''}
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                timeInputRef?.current?.click();
                if(isDropdownOpen) setIsDropdownOpen(true);
              }
              if(e.key === 'Tab' && isDropdownOpen) setIsDropdownOpen(false);
              if (e.key === 'Tab' && !e.shiftKey && isRangePicker) {
                e.preventDefault();
                timeInputRefEnd.current?.focus();
                setOpenTime(false);
                setOpenTimeEnd(true);
              }
            }}
          />

          <IconWrapper>
            {time ? (
              <>
                {dateTimeValue ? (
                  <InputIcon onClick={() => {
                      setTime('');
                      setTimeError(true);
                      input.onChange(null);
                  }}>
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ): (
                  <InputIcon onClick={() => {
                    setTime('');
                    setTimeErrorFirst(true);
                    if(isRangePicker){
                      onChange(null, endTime);
                      input.onChange([null, endTime]);
                    }
                    onChange(null);
                    input.onChange(null);
                  }}>
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
                  error={timeErrorLast && endTime == ''}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      timeInputRefEnd?.current?.click();
                      if(isEndTimeDropdownOpen) setIsEndTimeDropdownOpen(true);
                    }
                    if(e.key === 'Tab' && isEndTimeDropdownOpen) setIsEndTimeDropdownOpen(false);
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
                      if(isRangePicker){
                        onChange([time, null]);
                        input?.onChange([time, null]);
                      }
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
                    selected={String(minute) === String(roundUpMinute || roundMinuteFirst || roundUpMinute)}
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
        <EndDropDown is12Hour={is12Hour} isTimeRange={isRangePicker}>
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
