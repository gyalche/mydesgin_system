import { useCallback, useEffect, useState } from 'react';
import { createDateFromTime, roundToNearestStep } from '../utils';

export const useTimePickerHandler = ({
  step,
  isRangePicker,
  onChange,
  input,
  is12Hour,
  initialValue,
  isDateTimeDouble,
  dateTimeDefault,
}) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [amPm, setAmPm] = useState('');

  const [selectedHourEnd, setSelectedHourEnd] = useState('');
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState('');
  const [amPmEnd, setAmPmEnd] = useState('');

  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [timeErrorFirst, setTimeErrorFirst] = useState(false);
  const [timeErrorLast, setTimeErrorLast] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [roundMinuteSecond, setRoundMinuteSecond] = useState(null);
  const [roundUpMinute, setRoundUpMinute] = useState(null);

  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => is12Hour ? (i + 1) : i).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);
  
  const getNearestMinMinute = (current, step) => Math.min(roundToNearestStep(current, step));

  const handleHourClick = useCallback((hour) => {
    const timeString = `${hour}:${selectedMinute}:00 ${amPm}`;
    const updatedTime = createDateFromTime(timeString);
    setSelectedHour(String(hour));
    setTime(updatedTime);

    if (!isRangePicker) {
      onChange(updatedTime);
      input?.onChange?.(updatedTime);
    } else {
      onChange([updatedTime, endTime]);
      input?.onChange?.([updatedTime, endTime]);
    }
  }, [selectedMinute, amPm, endTime, isRangePicker, onChange, input]);

  const handleMinuteClick = useCallback((minute) => {
    const timeString = `${selectedHour}:${minute}:00 ${amPm}`;
    const updatedTime = createDateFromTime(timeString);
    setSelectedMinute(String(minute));
    setRoundUpMinute(String(minute));
    setTime(updatedTime);

    if (!isRangePicker) {
      onChange(updatedTime);
      input?.onChange?.(updatedTime);
    } else {
      onChange([updatedTime, endTime]);
      input?.onChange?.([updatedTime, endTime]);
    }
  }, [selectedHour, amPm, endTime, isRangePicker, onChange, input]);

  const handleAmPm = useCallback((value) => {
    const timeString = `${selectedHour}:${selectedMinute}:00 ${value}`;
    const updatedTime = createDateFromTime(timeString);
    setAmPm(value);

    if (!isRangePicker) {
      setTime(updatedTime);
      onChange(updatedTime);
      input?.onChange?.(updatedTime);
    } else {
      setTime(updatedTime);
      onChange([updatedTime, endTime]);
      input?.onChange?.([updatedTime, endTime]);
    }
  }, [selectedHour, selectedMinute, endTime, isRangePicker, onChange, input]);

  const handleEndHourClick = useCallback((hour) => {
    const timeString = `${hour}:${selectedMinuteEnd}:00 ${amPmEnd}`;
    const updatedEndTime = createDateFromTime(timeString);
    setSelectedHourEnd(String(hour));
    setEndTime(updatedEndTime);
    onChange([time, updatedEndTime]);
    input?.onChange?.([time, updatedEndTime]);
  }, [selectedMinuteEnd, amPmEnd, time, onChange, input]);

  const handleEndMinuteClick = useCallback((minute) => {
    const timeString = `${selectedHourEnd}:${minute}:00 ${amPmEnd}`;
    const updatedTime = createDateFromTime(timeString);
    setRoundMinuteSecond(getNearestMinMinute(minute, step));
    setSelectedMinuteEnd(String(minute));
    setEndTime(updatedTime);
    onChange([time, updatedTime]);
    input?.onChange?.([time, updatedTime]);
  }, [selectedHourEnd, amPmEnd, time, step, onChange, input]);

  const handleEndAmPm = useCallback((value) => {
    const timeString = `${selectedHourEnd}:${selectedMinuteEnd}:00 ${value}`;
    const updatedTime = createDateFromTime(timeString);
    setAmPmEnd(value);
    setEndTime(updatedTime);
    onChange([time, updatedTime]);
    input?.onChange?.([time, updatedTime]);
  }, [selectedHourEnd, selectedMinuteEnd, time, onChange, input]);

  const handleClearTime = () => {
    setTime('');
    setTimeError(true);
    input.onChange(null);
  };
  
  const handleClearFirstTimeRange = () => {
    setTime('');
    setTimeErrorFirst(true);
    if (isRangePicker) {
      onChange(null, endTime);
      input.onChange([null, endTime]);
    } else {
      onChange(null);
      input.onChange(null);
    }
  };
  
  const handleClearEndTime = () => {
    setEndTime('');
    setTimeErrorLast(true);
    if (isRangePicker) {
      onChange([time, null]);
      input?.onChange([time, null]);
    } else {
      onChange(null);
      input.onChange(null);
    }
  };

  // Initial value and date handling effects
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
      setRoundMinuteSecond(getNearestMinMinute(endTime.minute, step));
      setAmPmEnd(endTime.amPm);
    }
  }, [input?.value, is12Hour, step]);

  // Additional date handling effects
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

  // Additional end time handling for double datetime
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

  return {
    selectedHour,
    selectedHourEnd,
    selectedMinute,
    selectedMinuteEnd,
    amPm,
    amPmEnd,
    time,
    timeErrorFirst,
    timeErrorLast,
    endTime,
    hours,
    minutes,
    roundUpMinute,
    roundMinuteSecond,
    timeError,
    setTime,
    setEndTime,
    setTimeError,
    setTimeErrorFirst,
    setTimeErrorLast,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm,
    handleClearTime,
    handleClearFirstTimeRange,
    handleClearEndTime,
  };
};
