import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  CalendarHeader,
  CalendarWrapper,
  Calenders,
  InputIcon,
  DatePickerContainer,
  HeaderIcons,
  IconWrapper,
  InputContainer,
  InputWrapper,
  NextIcon,
  CalendarIcon,
  CalendarWrapperEnd,
 } from './styles';
import useClickOutside from '../../../hooks/useClickOutside';
import { normalizeDate } from '../../../utils';
import Calendar from './Calender';
import InputField from './InputField';
import useEscToClose from '../../../hooks/useEscToClose';

const DatePicker = ({ 
  isDoubleView,
  isRangePicker,
  initialValue,
  locale,
  onChange,
  disabled,
  error,
  placeholder }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [openCalenderEnd, setOpenCalenderEnd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [weekdays, setWeekdays] = useState([]);

  const datePickerRef = useRef(null);
  const inputRefEnd = useRef(null);

  const handleDateRangeClick = useCallback((date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (normalizedDate < today) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate('');
      setDateRange([date]);
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

  //custom hook to close the model
  useClickOutside(datePickerRef, () => (setOpenCalender(false), setOpenCalenderEnd(false)));
  useEscToClose(() => setOpenCalender(false));

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

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

  const [currentDate, setCurrentDate] = useState(() => {
    return startDate ? new Date(startDate) : new Date();
  });

  useEffect(() => {
    if (startDate) {
      setCurrentDate(new Date(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    if (openCalender || openCalenderEnd) {
      const handleKeyDown = (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
            break;
          case 'ArrowRight':
            setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
            break;
          case 'ArrowUp':
            setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
            break;
          case 'ArrowDown':
            setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
            break;
          case 'Enter':
            if (!isRangePicker) {
              handleSingleDate(currentDate);
            } else {
              if (openCalender) {
                if (startDate || endDate) {
                  setStartDate(currentDate);
                  setEndDate('');
                  setOpenCalender(false);
                }
              } else if (openCalenderEnd) {
                if (startDate && !endDate) {
                  setEndDate(currentDate);
                }
              }
            }
            break;
          default:
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentDate, isRangePicker, handleSingleDate, openCalender, openCalenderEnd, startDate, endDate]);
  

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
            error={error}
            placeholder={placeholder}
          />
          <IconWrapper>
            {startDate ? (
              <InputIcon onClick={() => {
                  setStartDate('');
                  dateRange.shift();
                }}
                date-testid='icon-click'
              >
                <Icon name="alert-circle-solid-cross" />
              </InputIcon>
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
                readOnly
                value={endDate && endDate.toLocaleDateString(locale)}
                onClick={() => (setOpenCalender(false), setOpenCalenderEnd(!openCalenderEnd))}
                disabled={disabled}
                width={124}
                height={40}
                placeholder={placeholder}
                ref={inputRefEnd}
                activeSecondInput={startDate && !endDate || openCalenderEnd}
                error={error}
              />
              <IconWrapper>
                {endDate ? (
                  <InputIcon onClick={() => {
                    setEndDate('');
                    dateRange.pop();
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

      {openCalender && (
        <CalendarWrapper ref={datePickerRef} data-testid='calender-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <CalendarHeader>
            <HeaderIcons>
              <CalendarIcon name='Interface-chevron-double-left' onClick={() => handlePrevYear()}/>
              <CalendarIcon name='Interface-chevron-left' onClick={() => handlePrevMonth()}/>
            </HeaderIcons> 

            <HeaderIcons>
              <CalendarIcon name='Interface-chevron-right' onClick={() => handleNextMonth()}/>
              <CalendarIcon name='Interface-chevron-double-right' onClick={() => handleNextYear()}/>
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
              isSelected={currentDate}
            />
            {(isDoubleView && isRangePicker) && (
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
                isSelected={currentDate}
              />
            )}
          </Calenders>
        </CalendarWrapper>
      )}
      {openCalenderEnd && (
        <CalendarWrapperEnd ref={datePickerRef} data-testid='calender-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <CalendarHeader>
            <HeaderIcons>
              <CalendarIcon name='Interface-chevron-double-left' onClick={() => handlePrevYear()}/>
              <CalendarIcon name='Interface-chevron-left' onClick={() => handlePrevMonth()}/>
            </HeaderIcons> 

            <HeaderIcons>
              <CalendarIcon name='Interface-chevron-right' onClick={() => handleNextMonth()}/>
              <CalendarIcon name='Interface-chevron-double-right' onClick={() => handleNextYear()}/>
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
              isSelected={currentDate}
            />
            {(isDoubleView && isRangePicker) && (
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
                isSelected={currentDate}
              />
            )}
          </Calenders>
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
};

DatePicker.defaultProps = {
  isDoubleView: true,
  isRangePicker: false,
  initialValue: null,
  locale: 'en-US',
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'yyyy/mm/dd',
};

export default DatePicker;
