import React from 'react';
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
import Calendar from './Calendar';
import InputField from './InputField';
import useDatePickerSelector from '../../../hooks/useDatePickerSelector';

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
  input,
  onlyFuture,
  dateTimeValue,
  isDateTimeDouble,
  dateTimeDefault,
  setDateTimeStart,
  setDateTimeEnd
}) => {
  const {
    startDate,
    endDate,
    openCalendar,
    openCalendarEnd,
    currentMonth,
    hoveredDate,
    weekdays,
    currentDate,
    displayErrorFirst,
    displayErrorLast,
    datePickerRef,
    inputRefEnd,
    inputRefStart,
    setHoveredDate,
    setOpenCalendar,
    setOpenCalendarEnd,
    handleDateRangeClick,
    enabledKeyboardFunc,
    disableKeyboardFunc,
    handleInputKeyDown,
    isInRange,
    handlePrevYear,
    handleNextYear,
    handleSingleDate,
    isInHoverRange,
    onChangeCurrent,
    handlePrevMonth,
    handleNextMonth,
    clearStartDate,
    clearEndDate,
    clearStartDateWhenNoDateTime
  } = useDatePickerSelector({
    isRangePicker,
    onlyFuture,
    input,
    onChange,
    disabled,
    dateTimeValue,
    dateTimeDefault,
    isDateTimeDouble,
    initialValue,
    locale,
    dateTimeStart,
    dateTimeEnd,
    setDateTimeStart,
    setDateTimeEnd
  });

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            data-testid="first-input"
            readOnly
            value={startDate && startDate.toLocaleDateString(locale)}
            onClick={() => (setOpenCalendarEnd(false), setOpenCalendar(!openCalendar))}
            disabled={disabled}
            width={124}
            height={40}
            isInvalid={displayErrorFirst && startDate === ''}
            placeholder={placeholder}
            ref={inputRefStart}
            onKeyDown={(e) => {
              if (!openCalendar && !openCalendarEnd) {
                handleInputKeyDown(e, true);
              }
            }}
          />
          <IconWrapper>
            {startDate || dateTimeStart || dateTimeEnd ? (
              <>
                {dateTimeValue ? (
                  <InputIcon 
                   onClick={disabled ? ()=>{} : clearStartDate}
                   data-testid='icon-click'
                 >
                   <Icon name="alert-circle-solid-cross" />
                 </InputIcon>
                ) : (
                  <InputIcon onClick={disabled ? () => {} : clearStartDateWhenNoDateTime}
                    data-testid='icon-click'
                  >
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                )}
              </>
            ) : (
              <InputIcon onClick={() => setOpenCalendar(!openCalendar)}>
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
                onClick={() => (setOpenCalendar(false), setOpenCalendarEnd(!openCalendarEnd))}
                disabled={disabled}
                width={124}
                height={40}
                placeholder={placeholder}
                activesecondinput={startDate && !endDate || openCalendarEnd}
                isInvalid={displayErrorLast && endDate === ''}
                ref={inputRefEnd}
                onKeyDown={(e) => {
                  if (!openCalendar && !openCalendarEnd) {
                    handleInputKeyDown(e, false);
                  }
                }}
              />
              <IconWrapper>
                {endDate ? (
                  <InputIcon onClick={disabled ? () => {} : clearEndDate}
                  data-testid='icon-button'
                  >
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ) : (
                  <InputIcon onClick={() => (setOpenCalendarEnd(!openCalendarEnd))}>
                    <Icon name="Interface-calendar-dot" />
                  </InputIcon>
                )}
              </IconWrapper>
            </InputWrapper>
          </>
        )}
      </InputContainer>
      {openCalendar && !disabled &&  (
        <CalendarWrapper ref={datePickerRef} data-testid='calendar-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
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
              openCalendar={openCalendar}
              openCalendarEnd={openCalendarEnd}
              setOpenCalendarEnd={setOpenCalendarEnd}
              setOpenCalendar={setOpenCalendar}
              onlyFuture={onlyFuture}
              inputRefEnd={inputRefEnd}
            />
          </Calendars>
        </CalendarWrapper>
      )}
      {openCalendarEnd && !disabled && (
        <CalendarWrapperEnd ref={datePickerRef} data-testid='calendar-id' isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
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
              openCalendar={openCalendar}
              openCalendarEnd={openCalendarEnd}
              setOpenCalendarEnd={setOpenCalendarEnd}
              setOpenCalendar={setOpenCalendar}
              onlyFuture={onlyFuture}
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
