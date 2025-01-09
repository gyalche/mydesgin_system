import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  CalendarWrapper,
  Calendars,
  InputIcon,
  DatePickerContainer,
  IconWrapper,
  InputContainer,
  InputWrapper,
  NextIcon,
  CalendarWrapperEnd,
 } from './styles';
import { normalizeDate } from '../../../utils';
import Calendar from './Calendar';
import InputField from './InputField';
import closeOpenModal from '../../../hooks/closeOpenModal';
import useClickOutside from '../../../hooks/useClickOutside';
import useDatePickerKeyboardHandler from '../../../hooks/useDatePickerKeyboard';

const DatePicker = ({
  isDoubleView,
  isRangePicker,
  initialValue,
  locale,
  onChange,
  disabled,
  placeholder,
  dateTimeStart,
  dateTimeEnd,
  setDateTimeStart,
  setDateTimeEnd,
  input,
  onlyFuture,
  dateTimeValue,
  isDateTimeDouble,
  dateTimeDefault,
}) => {
  const [startDate, setStartDate] = useState(Array.isArray(input?.value) ? input?.value[0] : input?.value);
  const [endDate, setEndDate] = useState(Array.isArray(input?.value) ? input?.value[1] : input?.value);
  const [openCalender, setOpenCalender] = useState(false);
  const [openCalenderEnd, setOpenCalenderEnd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [weekdays, setWeekdays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [displayErrorFirst, setDisplayErrorFirst] = useState(false);
  const [displayErrorLast, setDisplayErrorLast] = useState(false);

  const notCurrentMontAndYear = currentDate.getMonth() !== currentMonth.getMonth() || currentDate.getFullYear() !== currentMonth.getFullYear();

  const datePickerRef = useRef(null);
  const inputRefEnd = useRef(null);
  const inputRefStart = useRef(null);

  const handleSingleDate = useCallback((date) => {
    setEnableKeyboard(true);
    setStartDate(date);
    setDisplayErrorFirst(true);
    onChange(date);
    if(input?.onChange){
      input.onChange(date);
    }
  }, [setStartDate]);
  
  const handleDateRangeClick = useCallback((date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    if (onlyFuture && normalizedDate < today) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate('');
      setDateRange([date, null]);
      onChange([date, null]);
      input.onChange([date, null]);
    } else if (normalizedDate < normalizeDate(startDate)) {
      setStartDate(date);
      onChange([date, endDate]);
      input.onChange([date, endDate]);
    } else {
      setEndDate(date);
      setDateRange([startDate, date]);
      onChange([startDate, date]);
      input.onChange([startDate, date]);
      setOpenCalender(false);
      setOpenCalenderEnd(false);
    }
  }, [startDate, endDate]);

  const isInRange = useCallback((day) => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate && normalizedDay > normalizedStartDate && normalizedDay < normalizedEndDate;
  },[startDate, endDate]);

  const handlePrevYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() - 1, prevMonth.getMonth(), 1));
  }, [setCurrentMonth]);

  const handleNextYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() + 1, prevMonth.getMonth(), 1));
  }, [setCurrentMonth]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  }, [setCurrentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  }, [setCurrentMonth]);

  const isInHoverRange = useCallback((day) => {
    if (!startDate || !hoveredDate) return false;
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedHoveredDate = normalizeDate(hoveredDate);

    return (
      (normalizedDay >= normalizedStartDate && normalizedDay <= normalizedHoveredDate) ||
      (normalizedDay <= normalizedStartDate && normalizedDay >= normalizedHoveredDate)
    );
  }, [startDate, hoveredDate]);

  const onChangeCurrent = useCallback((val) => {
    if(!(val instanceof Date)) return;
    setCurrentMonth(val);
  }, [setCurrentMonth]);

  //custom hook to close the model
  useClickOutside(datePickerRef, () => (setOpenCalender(false), setOpenCalenderEnd(false)));
  closeOpenModal(() => (setOpenCalender(false), setOpenCalenderEnd(false)));

  useEffect(() => {
    if(Array.isArray(initialValue) && isRangePicker){
      setStartDate(initialValue[0]);
      setEndDate(initialValue[1]);
      setDateRange(initialValue);
    }
    else if(!isRangePicker){
      setStartDate(initialValue || input?.value);
      setEndDate(null);
    }
  },[initialValue, isRangePicker, input?.value]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + 1);

    const calculatedWeekdays = [...Array(7).keys()].map((index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
        dayIndex: date.getDay(),
      };
    });
    setWeekdays(calculatedWeekdays);
  }, [locale]);

  const selectPreviousDate = (monthAndYearNotSame) => {
    if(monthAndYearNotSame){
      const adjustDate = new Date(currentMonth);
      adjustDate.setDate(currentDate.getDate());
      setCurrentDate(adjustDate);
      updateDate(new Date(adjustDate));
      return;
    }
  };
  const {
    enabledKeyboardFunc,
    disableKeyboardFunc,
    handleInputKeyDown
  } = useDatePickerKeyboardHandler({
    openCalender,
    openCalenderEnd,
    currentDate,
    setCurrentDate,
    currentMonth,
    startDate,
    endDate,
    isRangePicker,
    onlyFuture,
    input,
    onChange,
    inputRefEnd,
    inputRefStart,
    selectPreviousDate,
    handleNextMonth,
    handlePrevMonth,
    hoveredDate,
    setHoveredDate,
    setStartDate,
    setEndDate,
    disabled,
    dateTimeValue,
    handleSingleDate,
    notCurrentMontAndYear,
    dateTimeDefault,
    isDateTimeDouble,
    setCurrentMonth,
    setOpenCalender,
    setOpenCalenderEnd
  });

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            data-testid="first-input"
            readOnly
            value={startDate && startDate.toLocaleDateString(locale)}
            onClick={() => (setOpenCalenderEnd(false), setOpenCalender(!openCalender))}
            disabled={disabled}
            width={124}
            height={40}
            error={displayErrorFirst && startDate === ''}
            placeholder={placeholder}
            ref={inputRefStart}
            onKeyDown={(e) => {
              if (!openCalender && !openCalenderEnd) {
                handleInputKeyDown(e, true);
              }
            }}
          />
          <IconWrapper>
            {startDate || dateTimeStart || dateTimeEnd ? (
              <>
                {dateTimeValue ? (
                  <InputIcon 
                   onClick={disabled ? ()=>{} : () => {
                     setStartDate('');
                     input?.onChange(null);
                     onChange(null);
                     setDisplayErrorFirst(true);
                     if(dateTimeStart) setDateTimeStart(false);
                     if(dateTimeEnd) setDateTimeEnd(false);
                   }}
                   data-testid='icon-click'
                 >
                   <Icon name="alert-circle-solid-cross" />
                 </InputIcon>
                ) : (
                  <InputIcon onClick={disabled ? ()=>{} : () => {
                      setStartDate('');
                      setDisplayErrorFirst(true);
                      if(isRangePicker){
                        input.onChange([null, endDate]);
                        if (Array.isArray(dateRange) && dateRange.length > 0) {
                          dateRange.shift();
                        }
                      }
                      input.onChange(null);
                      onChange(null);
                    }}
                    data-testid='icon-click'
                  >
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                )}
              </>
            ) : (
              <InputIcon onClick={() => setOpenCalender(!openCalender)}>
                <Icon name="Interface-calendar-dot" />
              </InputIcon>
            )}
          </IconWrapper>
        </InputWrapper>
        {isRangePicker && (
          <>
            <NextIcon name="Interface-arrow-right" />
            <InputWrapper isRangePicker={isRangePicker}>
              <InputField
                data-testid="second-input"
                className='secondInput'
                readOnly
                value={endDate && endDate.toLocaleDateString(locale)}
                onClick={() => (setOpenCalender(false), setOpenCalenderEnd(!openCalenderEnd))}
                disabled={disabled}
                width={124}
                height={40}
                placeholder={placeholder}
                activesecondinput={startDate && !endDate || openCalenderEnd}
                error={displayErrorLast && endDate==''}
                ref={inputRefEnd}
                onKeyDown={(e) => {
                  if (!openCalender && !openCalenderEnd) {
                    handleInputKeyDown(e, false);
                  }
                }}
              />
              <IconWrapper>
                {endDate ? (
                  <InputIcon onClick={disabled ? ()=>{} : () => {
                    setEndDate('');
                    setDisplayErrorLast(true);
                    input.onChange([startDate ? startDate : null, null]);
                    dateRange.pop();
                    setHoveredDate(startDate);
                  }}
                  data-testid='icon-button'
                  >
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ) : (
                  <InputIcon onClick={() => setOpenCalenderEnd(!openCalenderEnd)}>
                    <Icon name="Interface-calendar-dot" />
                  </InputIcon>
                )}
              </IconWrapper>
            </InputWrapper>
          </>
        )}
      </InputContainer>
      {openCalender && !disabled &&  (
        <CalendarWrapper ref={datePickerRef} data-testid='calender-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <Calendars data-testid='container-id'>
            <Calendar
              date={currentMonth}
              locale={locale}
              startDate={startDate}
              endDate={endDate}
              weekdays={weekdays}
              handleSingleDate={handleSingleDate}
              handleDateRangeClick={handleDateRangeClick}
              isRangePicker={isRangePicker}
              isInRange={isInRange}
              isInHoverRange={isInHoverRange}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
              isSelected={currentDate}
              enableKeyboard={enabledKeyboardFunc}
              disableKeyboard={disableKeyboardFunc}
              handlePrevYear={handlePrevYear}
              handleNextYear={handleNextYear}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              setDates={onChangeCurrent}
              isDoubleView={isDoubleView}
              openCalender={openCalender}
              openCalenderEnd={openCalenderEnd}
              setOpenCalenderEnd={setOpenCalenderEnd}
              setOpenCalender={setOpenCalender}
              onlyFuture={onlyFuture}
              setEnableKeyboard={setEnableKeyboard}
              inputRefEnd={inputRefEnd}
            />
          </Calendars>
        </CalendarWrapper>
      )}
      {openCalenderEnd && !disabled && (
        <CalendarWrapperEnd ref={datePickerRef} data-testid='calender-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <Calendars data-testid='container-id'>
            <Calendar
              date={currentMonth}
              locale={locale}
              startDate={startDate}
              endDate={endDate}
              weekdays={weekdays}
              handleSingleDate={handleSingleDate}
              handleDateRangeClick={handleDateRangeClick}
              isRangePicker={isRangePicker}
              isInRange={isInRange}
              isInHoverRange={isInHoverRange}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
              isSelected={currentDate}
              enableKeyboard={enabledKeyboardFunc}
              disableKeyboard={disableKeyboardFunc}
              handlePrevYear={handlePrevYear}
              handleNextYear={handleNextYear}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              setDates={onChangeCurrent}
              isDoubleView={isDoubleView}
              openCalender={openCalender}
              openCalenderEnd={openCalenderEnd}
              setOpenCalenderEnd={setOpenCalenderEnd}
              setOpenCalender={setOpenCalender}
              onlyFuture={onlyFuture}
              setEnableKeyboard={setEnableKeyboard}
            />
          </Calendars>
        </CalendarWrapperEnd>
      )}
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  initialValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)), 
    PropTypes.instanceOf(Date),
  ]),
  locale: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  dateTimeStart: PropTypes.bool,
  dateTimeEnd: PropTypes.bool,
  setDateTimeStart: PropTypes.bool,
  setDateTimeEnd: PropTypes.bool,
  input: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  onlyFuture: PropTypes.bool,
  dateTimeValue: PropTypes.bool,
  isDateTimeDouble: PropTypes.bool,
  dateTimeDefault: PropTypes.any,
};

DatePicker.defaultProps = {
  isDoubleView: false,
  isRangePicker: false,
  initialValue: null,
  locale: 'ja-JP',
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'yyyy/mm/dd',
  dateTimeStart: false,
  dateTimeEnd: false,
  setDateTimeStart: false,
  setDateTimeEnd: false,
  onlyFuture: true,
  dateTimeValue: false,
  isDateTimeDouble: false,
};

export default DatePicker;
