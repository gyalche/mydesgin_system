import { useCallback } from 'react';
import { createDateFromTime } from '../utils';

export const useTimeHandlers = ({
  selectedHour,
  selectedMinute,
  selectedHourEnd,
  selectedMinuteEnd,
  amPm,
  amPmEnd,
  time,
  endTime,
  step,
  isRangePicker,
  setSelectedHour,
  setSelectedMinute,
  setAmPm,
  setTime,
  setRoundUpMinute,
  setSelectedHourEnd,
  setSelectedMinuteEnd,
  setAmPmEnd,
  setEndTime,
  setRoundMinuteSecond,
  onChange,
  input
}) => {
  const getNearestMinMinute = (current, step) => {
    return Math.floor(current / step) * step;
  };

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

  return {
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm
  };
};
