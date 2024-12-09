import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Icon } from 'components/Atoms';
import {
  CalendarWrapper,
  Calenders,
  InputIcon,
  DatePickerContainer,
  IconWrapper,
  InputContainer,
  InputWrapper,
 } from './styles';
import { normalizeDate } from '../../../utils';
import Calendar from './Calender';
import InputField from './InputField';
import closeOpenModal from '../../../hooks/closeOpenModal';
import useClickOutside from '../../../hooks/useClickOutside';
const DatePicker = ({
  locale,
  onChange,
  disabled,
  initialValue,
  error,
  placeholder,
  dateTimeStart,
  dateTimeEnd,
  setDateTimeStart,
  setDateTimeEnd,
  input,
  isDateTimeDouble,
  dateTimeDefault,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [openCalender, setOpenCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [weekdays, setWeekdays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [firstInputFocus, setFirstInputFocus] = useState(false);
  const [secondInputFocus, setSecondInputFocus] = useState(false);
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const datePickerRef = useRef(null);
  const inputRefEnd = useRef(null);
  const inputRefStart = useRef(null);

  const handleSingleDate = useCallback((date) => {
    setEnableKeyboard(true);
    setStartDate(date);
    setDisplayError(false);
    onChange(date);
    if(input?.onChange){
      input.onChange(date);
    }
  }, [setStartDate]);

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

  const onChangeCurrent = useCallback((val) => {
    if(!(val instanceof Date)) return;
    setCurrentMonth(val);
  }, [setCurrentMonth]);

  //custom hook to close the model
  useClickOutside(datePickerRef, () => (setOpenCalender(false)));
  closeOpenModal(() => (setOpenCalender(false)));

  // const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

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

  const handleKeyDown = (e) => {
    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if(!(currentDate instanceof Date)) return;

    const updateDate = (changeFn) => {
      setCurrentDate((prev) => {
        const newDate = changeFn(prev);
        const newYear = newDate.getFullYear();
        const currentYear = currentMonth.getFullYear();
        const isNextMonth = newDate.getMonth() > currentMonth.getMonth();
        const isPrevMonth = newDate.getMonth() < currentMonth.getMonth();
        if (isNextMonth && newYear === currentYear) handleNextMonth();
        if (isPrevMonth && newYear === currentYear) handlePrevMonth();
        if(newYear > currentYear) handleNextMonth();
        if(newYear < currentYear) handlePrevMonth();
        return newDate < todayNormalized ? todayNormalized : newDate;
      });
    };
    const handleEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleSingleDate(currentDate);
    };
  
    switch (e.key) {
      case 'ArrowLeft':
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
        break;
      case 'ArrowRight':
        updateDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
        break;
      case 'ArrowUp':
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      case 'ArrowDown':
        updateDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
        break;
      case 'Enter':
        handleEnter(e);
        break;
      default:
        break;
    }
  };

  const disableKeyboardFunc = () => {
    setEnableKeyboard(false);
  };

  const enabledKeyboardFunc = () => {
    setEnableKeyboard(true);
  };
  
  useEffect(() => {
    if (openCalender && enableKeyboard && !disabled) {
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentDate, openCalender, enableKeyboard, startDate]);

  useEffect(() => {
    const fallbackDate = new Date();
  
    if (openCalender) {
      const initialDate = startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialDate);
      setCurrentMonth(initialDate);
    }
  }, [startDate, openCalender]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (firstInputFocus) {
          setOpenCalender(true);
        } else if (secondInputFocus) {
          setOpenCalender(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [firstInputFocus, secondInputFocus]);

  useEffect(() => {
    if(isDateTimeDouble && Array.isArray(dateTimeDefault?.date)){
      setStartDate(dateTimeDefault?.date[1]);
    } else if(!isDateTimeDouble && dateTimeDefault?.date[0]){
      setStartDate(dateTimeDefault?.date[0]);
    } else if(!Array.isArray(dateTimeDefault?.date)){
      setStartDate(dateTimeDefault?.date);
    }else {
      setStartDate(new Date());
    }
  }, [dateTimeDefault]);

  useEffect(() => {
    if(input?.value){
      setStartDate(input?.value);
    }
    if(!isDateTimeDouble && !Array.isArray(dateTimeDefault?.date)){
      setStartDate(dateTimeDefault?.date);
    }
  },[isDateTimeDouble]);
  useEffect(() => {
    if(input?.value || initialValue){
      setStartDate(input?.value ?? initialValue);
    }
  }, []);

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            data-testid="first-input"
            readOnly
            value={startDate instanceof Date ? startDate.toLocaleDateString(locale) : ''}
            onClick={() => (setOpenCalender(!openCalender))}
            disabled={disabled}
            width={124}
            height={40}
            error={displayError}
            placeholder={placeholder}
            ref={inputRefStart}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey && !openCalender) {
                e.preventDefault();
                inputRefEnd.current?.focus();
                setFirstInputFocus(false);
                setSecondInputFocus(true);
              }
            }}
          />
          <IconWrapper>
            {startDate ? (
              <InputIcon onClick={disabled ? ()=>{} : () => {
                  setStartDate('');
                  input?.onChange(null);
                  setDisplayError(true);
                  if(dateTimeStart) (setDateTimeStart(false));
                  if(dateTimeEnd) setDateTimeEnd(false);
                }}
                data-testid='icon-click'
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
      </InputContainer>

      {openCalender && !disabled &&  (
        <CalendarWrapper ref={datePickerRef} data-testid='calender-id'>
          <Calenders data-testid='container-id'>
            <Calendar
              date={currentMonth}
              locale={locale}
              startDate={startDate}
              weekdays={weekdays}
              handleSingleDate={handleSingleDate}
              isSelected={currentDate}
              enableKeyboard={enabledKeyboardFunc}
              disableKeyboard={disableKeyboardFunc}
              handlePrevYear={handlePrevYear}
              handleNextYear={handleNextYear}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              setDates={onChangeCurrent}
              openCalender={openCalender}
            />
          </Calenders>
        </CalendarWrapper>
      )}
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  initialValue: PropTypes.instanceOf(Date),
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
  dateTimeStartDate: PropTypes.instanceOf(Date),
  isDateTimeDouble: PropTypes.bool,
  dateTimeDefault: PropTypes.any,
};

DatePicker.defaultProps = {
  initialValue: null,
  locale: 'en-US',
  onChange: () => {},
  disabled: false,
  error: false,
  placeholder: 'yyyy/mm/dd',
  dateTimeStart: false,
  dateTimeEnd: false,
  setDateTimeStart: false,
  setDateTimeEnd: false,
  isDateTimeDouble: false,
};

export default DatePicker;
