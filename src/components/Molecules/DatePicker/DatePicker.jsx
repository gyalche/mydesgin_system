import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  CalendarHeader,
  CalendarWrapper,
  Calenders,
  DatePickerContainer,
  HeaderIcons,
  InputContainer,
  InputField,
 } from './styles';
import useClickOutside from '../../../hooks/useClickOutside';
import { normalizeDate } from '../../../utils';;
import Calendar from './Calender';

const DatePicker = ({ isDoubleView, isRangePicker, initialValue, locale, onChange, disabled }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [weekdays, setWeekdays] = useState([]);

  const datePickerRef = useRef();

  const handleDateRangeClick = useCallback((date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (normalizedDate < today) return;

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
  }, [startDate, endDate]);

  const handleSingleDate = useCallback((date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    if (normalizedDate < today) return;
    setStartDate(date);
    onChange(date);
  }, [setStartDate]);

  const isInRange = useCallback((day) => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate && normalizedDay > normalizedStartDate && normalizedDay < normalizedEndDate;
  },[startDate, endDate]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  },[setCurrentMonth]);
  
  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  },[setCurrentMonth]);

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

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <DatePickerContainer>
      <InputContainer>
          <InputField
            data-testid="first-input"
            type="text"
            readOnly
            value={startDate ? startDate.toLocaleDateString(locale) : 'yyyy/mm/dd'}
            onClick={() => setOpenCalender(!openCalender)}
            disabled={disabled}
            width={100}
          />

        {isRangePicker && (
          <>
            <span>～</span>
              <InputField
                data-testid="second-input"
                type="text"
                readOnly
                value={endDate ? endDate.toLocaleDateString(locale) : 'yyyy/mm/dd'}
                onClick={() => setOpenCalender(!openCalender)}
                disabled={disabled}
                width={100}
              />
          </>
        )}
      </InputContainer>

      {openCalender && (
        <CalendarWrapper ref={datePickerRef} data-testid='calender-id'>
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
            <Calenders data-testid='container-id'>
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
                />
                {isDoubleView && (
                <Calendar
                  date={nextMonth}
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
                />
              )}
            </Calenders>
        </CalendarWrapper>
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
};

DatePicker.defaultProps = {
  isDoubleView: true,
  isRangePicker: false,
  initialValue: null,
  locale: 'en-US',
  onChange: () => {},
  disabled: false,
};

export default DatePicker;
