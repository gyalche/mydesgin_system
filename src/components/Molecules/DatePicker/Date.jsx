import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import { CalendarContainer,
  CalendarHeader,
  CalendarWrapper,
  CalenderMonths,
  Calenders,
  ClearButton,
  DatePickerContainer,
  Day,
  DaysContainer,
  HeaderIcons,
  InputContainer,
  InputField,
  InputWrapper,
  WeekdayHeader } from './styles';
import useClickOutside from '../../../hooks/useClickOutside';

const normalizeDate = (date) => new Date(date).setHours(0, 0, 0, 0);

const DatePicker = ({ isDoubleView, isRangePicker, initialValue, dateTimeFormat, onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const saturday = [6, 13, 20, 27, 34, 41];
  const sunday = [7, 14, 21, 28, 35, 42];

  const datePickerRef = useRef();

  const handleDateRangeClick = (date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (normalizedDate < today) return; // Disable past dates

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setDateRange([date]);
      setEndDate(null);
      onChange([date]);
    } else if (normalizedDate < normalizeDate(startDate)) {
      setStartDate(date);
      onChange([date, endDate]);
    } else {
      setEndDate(date);
      setDateRange([startDate, date]);
      onChange([startDate, date]);
    }
  };

  const handleSingleDate = (date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    if (normalizedDate < today) return;
    setStartDate(date);
    onChange(date);
  };

  const isInRange = useCallback((day) => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate && normalizedDay > normalizedStartDate && normalizedDay < normalizedEndDate;
  },[startDate, endDate]);

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Get the last day of the month
    const lastDateOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDateOfMonth.getDate();
    
    const days = [];
    
    // Add the last few days of the previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({date: new Date(year, month, -i), isCurrentMonth: false});
    }
    
    // Add all days in the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({date: new Date(year, month, i), isCurrentMonth: true});
    }
    
    // Add the first few days of the next month
    const lastDayOfMonth = lastDateOfMonth.getDay();
    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      days.push({date: new Date(year, month + 1, i), isCurrentMonth: false});
    }
    
    return days;
  },[]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  },[]);
  
  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  },[]);

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

  const handleMouseEnter = (day) => {
    if (isRangePicker && startDate && !endDate) {
      setHoveredDate(day);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const getLocalizedMonthName = (date, locale) => {
    return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  };

  //custom hook for outside click to close the model
  useClickOutside(datePickerRef, () => setOpenCalender(false));

  useEffect(()=>{
    if(Array.isArray(initialValue) && isRangePicker){
      setStartDate(initialValue[0]);
      setEndDate(initialValue[1]);
      setDateRange(initialValue);
    }
    else if(!isRangePicker){
      setStartDate(initialValue);
      setEndDate(null);
    }
  },[initialValue, isRangePicker]);

  const renderCalendar = (date, locale) => {
    const days = getDaysInMonth(date);
    const currentYear = new Date(Date.now()).getFullYear();
    const displayNextYear = date.getFullYear() !== currentYear && date.getFullYear();
    return (
      <CalendarContainer>
        <CalenderMonths>
          {displayNextYear} {getLocalizedMonthName(date, locale)}
        </CalenderMonths>
        <DaysContainer>
          {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
            <WeekdayHeader
            key={index}
            isSaturday={day === '土'}
            isSunday={day === '日'}
            >
              {day}
            </WeekdayHeader>
          ))}

          {days.map((day, index) => {
            const date = day?.date;
            const notCurrent = !day?.isCurrentMonth;
            const myIndex = index + 1;
            return (
              <Day
                key={`${day?.date-index}`}
                currentDate={normalizeDate(new Date()) === normalizeDate(date)}
                isSelected={normalizeDate(date) === normalizeDate(startDate) || normalizeDate(date) === normalizeDate(endDate)}
                isInRange={isInRange(date)}
                isDisabled={normalizeDate(date) < normalizeDate(new Date()) || notCurrent}
                isSaturday={saturday.includes(myIndex)}
                isSunday={sunday.includes(myIndex)}
                onClick={!isRangePicker ? () => handleSingleDate(date) : () => handleDateRangeClick(date)}
                isInHoverRange={isInHoverRange(date)}
                onMouseEnter={() => handleMouseEnter(date)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {date.getDate()}
              </Day>
            );
          })}
        </DaysContainer>
      </CalendarContainer>
    );
  };

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            type="text"
            readOnly
            value={startDate ? startDate.toLocaleDateString(dateTimeFormat) : 'yyyy/mm/dd'}
            onClick={() => setOpenCalender(!openCalender)}
          />
         {startDate && (
          <ClearButton onClick={()=>{
            setStartDate('');
            dateRange.shift();
          }}>
            <Icon name="alert-circle-solid-cross" />
          </ClearButton>
         )}
        </InputWrapper>

        {isRangePicker && (
          <>
            <span>～</span>
            <InputWrapper>
              <InputField
                type="text"
                readOnly
                value={endDate ? endDate.toLocaleDateString(dateTimeFormat) : 'yyyy/mm/dd'}
                onClick={() => setOpenCalender(!openCalender)}
              />
                {endDate && (
                  <ClearButton onClick={()=>{
                    setEndDate('');
                    dateRange.pop();
                  }}>
                    <Icon name="alert-circle-solid-cross" />
                  </ClearButton>
                )}
            </InputWrapper>
          </>
        )}
      </InputContainer>

      {openCalender && (
        <CalendarWrapper ref={datePickerRef}>
            <CalendarHeader>
                <HeaderIcons>
                  <Icon name='Interface-chevron-double-left' onClick={() => handlePrevMonth()}/>
                  <Icon name='Interface-chevron-left' onClick={() => handlePrevMonth()}/>
                </HeaderIcons>

                <HeaderIcons>
                  <Icon name='Interface-chevron-double-right' onClick={() => handleNextMonth()}/>
                  <Icon name='Interface-chevron-right' onClick={() => handleNextMonth()}/>
                </HeaderIcons>
            </CalendarHeader>
            <Calenders>
                {renderCalendar(currentMonth, dateTimeFormat)}
                {isDoubleView && renderCalendar(nextMonth, dateTimeFormat)}
            </Calenders>
        </CalendarWrapper>
      )}
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  initialValue:  PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)), 
    PropTypes.instanceOf(Date),
  ]),
  dateTimeFormat: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  isDoubleView: true,
  isRangePicker: true,
  initialValue: null,
  dateTimeFormat: 'ja-JA',
  onChange: () => {},
};

export default DatePicker;
