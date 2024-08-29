import React, { useState } from 'react';
import styled from 'styled-components';
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

const normalizeDate = (date) => new Date(date).setHours(0, 0, 0, 0);

const DatePicker = ({ isDoubleView, isRangePicker, prevStartDate, prevEndDate, dateTimeFormat }) => {
  const [startDate, setStartDate] = useState(prevStartDate);
  const [endDate, setEndDate] = useState(prevEndDate);
  const [openCalender, setOpenCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDateRangeClick = (date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (normalizedDate < today) return; // Disable past dates

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setDateRange([date]);
      setEndDate(null);
    } else if (normalizedDate < normalizeDate(startDate)) {
      setStartDate(date);
    } else {
      setEndDate(date);
      setDateRange([startDate, date]);
    }
  };

  const handleSingleDate = (date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    if (normalizedDate < today) return;
    setStartDate(date);
  };

  const isInRange = (day) => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate && normalizedDay > normalizedStartDate && normalizedDay < normalizedEndDate;
  };

  const getDaysInMonth = (date) => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const isInHoverRange = (day) => {
    if (!startDate || !hoveredDate) return false;
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedHoveredDate = normalizeDate(hoveredDate);

    return (
      (normalizedDay >= normalizedStartDate && normalizedDay <= normalizedHoveredDate) ||
      (normalizedDay <= normalizedStartDate && normalizedDay >= normalizedHoveredDate)
    );
  };

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

  const renderCalendar = (date, locale) => {
    const days = getDaysInMonth(date);
    return (
      <CalendarContainer>
        <CalenderMonths>
          {getLocalizedMonthName(date, locale)}
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
        
          {days.map((day, index) => (
              <Day
                key={`${day-index}`}
                currentDate={normalizeDate(new Date()) === normalizeDate(day)}
                isSelected={normalizeDate(day) === normalizeDate(startDate) || normalizeDate(day) === normalizeDate(endDate)}
                isInRange={isInRange(day)}
                isDisabled={normalizeDate(day) < normalizeDate(new Date())}
                isSaturday={day.getDay() === 6}
                onClick={ !isRangePicker ? () => handleSingleDate(day) : () => handleDateRangeClick(day)}
                isInHoverRange={isInHoverRange(day)}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {day.getDate()}
              </Day>
            ))}
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
            value={startDate ? startDate.toLocaleDateString('ja-JP') : 'yyyy/mm/dd'}
            onClick={() => setOpenCalender(!openCalender)}
          />
         {startDate && (
          <ClearButton onClick={()=>{
            setStartDate('');
            dateRange.shift()
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
                value={endDate ? endDate.toLocaleDateString('ja-JP') : 'yyyy/mm/dd'}
                onClick={() => setOpenCalender(!openCalender)}
              />
                {endDate && (
                  <ClearButton onClick={()=>{
                    setEndDate('')
                    dateRange.pop()
                  }}>
                    <Icon name="alert-circle-solid-cross" />
                  </ClearButton>
                )}
            </InputWrapper>
          </>
        )}
      </InputContainer>

      {openCalender && (
        <CalendarWrapper>
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
  prevStartDate: PropTypes.string,
  prevEndDate: PropTypes.string,
  dateTimeFormat: PropTypes.string,
};

DatePicker.defaultProps = {
  isDoubleView: false,
  isRangePicker: false,
  prevStartDate: null,
  prevEndDate: null,
  dateTimeFormat: 'ja-JA'
};

export default DatePicker;
