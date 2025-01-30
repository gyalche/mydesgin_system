import { useCallback, useEffect, useState } from 'react';

import { createDateFromTime, roundToNearestStep } from '../../../../utils';

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
  const [time, setTime] = useState('');
  const [roundUpMinute, setRoundUpMinute] = useState(null);

  const [selectedHourEnd, setSelectedHourEnd] = useState('');
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState('');
  const [amPmEnd, setAmPmEnd] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roundMinuteSecond, setRoundMinuteSecond] = useState(null);

  const [timeErrorFirst, setTimeErrorFirst] = useState(false);
  const [timeErrorLast, setTimeErrorLast] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const hours = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) => (is12Hour ? (i + 1) : i)).filter(hour => hour !== 0);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);
  const currentMinute = new Date().getMinutes();

  const getNearestMinMinute = (current, stepSize) => Math.min(roundToNearestStep(current, stepSize));

  const handleFirstTimeSelection = useCallback(timeState => {
    const { hour, minute, amPm: amPmValue } = timeState;
    const timeString = `${hour}:${minute || currentMinute}:00 ${amPmValue}`;
    const updatedTime = createDateFromTime(timeString);

    setSelectedHour(String(hour));
    setSelectedMinute(String(minute));
    setAmPm(amPmValue);
    setTime(updatedTime);
    setRoundUpMinute(getNearestMinMinute(Number(minute), step));

    if (!isRangePicker) {
      onChange(updatedTime);
      input?.onChange?.(updatedTime);
    } else {
      onChange([updatedTime, endTime]);
      input?.onChange?.([updatedTime, endTime]);
    }
  }, [currentMinute, step, isRangePicker, onChange, input, endTime]);

  const handleHourClick = useCallback(hour => {
    handleFirstTimeSelection({
      hour: String(hour),
      minute: selectedMinute,
      amPm,
    });
  }, [handleFirstTimeSelection, selectedMinute, amPm]);

  const handleMinuteClick = useCallback(minute => {
    handleFirstTimeSelection({
      hour: selectedHour,
      minute: String(minute),
      amPm,
    });
  }, [handleFirstTimeSelection, selectedHour, amPm]);

  const handleAmPm = useCallback(value => {
    handleFirstTimeSelection({
      hour: selectedHour,
      minute: selectedMinute,
      amPm: value,
    });
  }, [handleFirstTimeSelection, selectedHour, selectedMinute]);

  const handleEndHourClick = useCallback(hour => {
    const timeString = `${hour}:${selectedMinuteEnd || currentMinute}:00 ${amPmEnd}`;
    const updatedEndTime = createDateFromTime(timeString);
    setSelectedHourEnd(String(hour));
    setEndTime(updatedEndTime);
    onChange([time, updatedEndTime]);
    input?.onChange?.([time, updatedEndTime]);
  }, [selectedMinuteEnd, currentMinute, amPmEnd, onChange, time, input]);

  const handleEndMinuteClick = useCallback(minute => {
    const timeString = `${selectedHourEnd}:${minute}:00 ${amPmEnd}`;
    const updatedTime = createDateFromTime(timeString);
    setRoundMinuteSecond(getNearestMinMinute(minute, step));
    setSelectedMinuteEnd(String(minute));
    setEndTime(updatedTime);
    onChange([time, updatedTime]);
    input?.onChange?.([time, updatedTime]);
  }, [selectedHourEnd, amPmEnd, time, step, onChange, input]);

  const handleEndAmPm = useCallback(value => {
    const timeString = `${selectedHourEnd}:${selectedMinuteEnd || currentMinute}:00 ${value}`;
    const updatedTime = createDateFromTime(timeString);
    setAmPmEnd(value);
    setEndTime(updatedTime);
    onChange([time, updatedTime]);
    input?.onChange?.([time, updatedTime]);
  }, [selectedHourEnd, selectedMinuteEnd, currentMinute, onChange, time, input]);

  const handleClearTime = () => {
    setTime('');
    setTimeError(true);
    input.onChange(null);
    onChange(null);
  };

  const handleClearFirstTimeRange = () => {
    setTime('');
    setTimeErrorFirst(true);
    if (isRangePicker) {
      onChange([null, endTime]);
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

  const handleDate = useCallback(date => {
    const hoursValue = date?.getHours();
    const minutesValue = date?.getMinutes();
    const isPM = hoursValue >= 12;
    const hour = is12Hour ? hoursValue % 12 || 12 : hoursValue;
    let amPmValue = '';

    if (is12Hour) {
      if (isPM) {
        amPmValue = 'PM';
      } else {
        amPmValue = 'AM';
      }
    }

    return {
      hour,
      minute: minutesValue,
      amPm: amPmValue,
    };
  }, [is12Hour]);

  const updateTimeValues = useCallback(value => {
    if (Array.isArray(value)) {
      const [startDate, endDate] = value;

      const startTime = handleDate(startDate);
      const endTimeValue = handleDate(endDate);

      setRoundUpMinute(getNearestMinMinute(startDate?.getMinutes(), step));
      setRoundMinuteSecond(getNearestMinMinute(endDate?.getMinutes(), step));

      setTime(startDate);
      setSelectedHour(startTime.hour);
      setSelectedMinute(startTime.minute);
      setAmPm(startTime.amPm);

      setEndTime(endDate);
      setSelectedHourEnd(endTimeValue.hour);
      setSelectedMinuteEnd(endTimeValue.minute);
      setAmPmEnd(endTimeValue.amPm);
    } else if (value) {
      const startDate = value;
      const startTime = handleDate(startDate);
      setRoundUpMinute(getNearestMinMinute(startDate?.getMinutes(), step));
      setTime(startDate);
      setSelectedHour(startTime.hour);
      setSelectedMinute(startTime.minute);
      setAmPm(startTime.amPm);
    }
  }, [handleDate, step]);

  useEffect(() => {
    updateTimeValues(input?.value || initialValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is12Hour, step, updateTimeValues]);

  useEffect(() => {
    if ((input?.value || dateTimeDefault) && !isDateTimeDouble) {
      let date = null;

      if (typeof input?.value === 'string') {
        const timePartsValue = input?.value.split(':');
        const hoursValue = parseInt(timePartsValue[0], 10);
        const minutesValue = parseInt(timePartsValue[1], 10);
        date = new Date();
        date.setHours(hoursValue, minutesValue);
      } else if (input?.value instanceof Date && !Number.isNaN(input?.value)) {
        date = input?.value;
      } else if (dateTimeDefault instanceof Date && !Number.isNaN(dateTimeDefault)) {
        date = dateTimeDefault;
      } else if (Array.isArray(dateTimeDefault) && dateTimeDefault[0] instanceof Date) {
        const [firstDate] = dateTimeDefault;
        date = firstDate;
      }

      if (date) {
        const hoursValue = date.getHours();
        const minutesValue = date.getMinutes();
        setRoundUpMinute(getNearestMinMinute(minutesValue, step));

        let formattedHour = hoursValue;
        let amPmValue = '';

        if (is12Hour) {
          amPmValue = hoursValue >= 12 ? 'PM' : 'AM';
          formattedHour = hoursValue % 12 || 12;
        }

        setTime(`${formattedHour}:${minutesValue < 10 ? `0${minutesValue}` : minutesValue} ${amPmValue}`.trim());
        setSelectedHour(String(formattedHour));
        setSelectedMinute(String(minutesValue));
        setAmPm(is12Hour ? amPmValue : '');
      }
    }
  }, [input?.value, isDateTimeDouble, is12Hour, dateTimeDefault, step]);

  useEffect(() => {
    if (isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length > 1) {
      const endDate = dateTimeDefault[1];

      if (endDate instanceof Date && !Number.isNaN(endDate)) {
        const hoursValue = endDate?.getHours();
        const minutesValue = endDate?.getMinutes();
        const amPmValue = hoursValue >= 12 ? 'PM' : 'AM';
        const timeParts = [`${hoursValue % 12 || 12}`, `${minutesValue} ${amPmValue}`];
        setRoundUpMinute(getNearestMinMinute(minutesValue, step));
        setTime(`${timeParts[0]}:${timeParts[1].split(' ')[0]} ${amPmValue}`);
        setSelectedHour(timeParts[0]);
        setSelectedMinute(timeParts[1].split(' ')[0]);
        setAmPm(is12Hour ? amPmValue : '');
      }
    }
  }, [isDateTimeDouble, is12Hour, dateTimeDefault, step]);

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
