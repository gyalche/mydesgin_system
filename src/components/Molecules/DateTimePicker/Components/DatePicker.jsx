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
} from '../styles';
import Calendar from '../Calendar';
import InputField from './InputField';
import { useDatePickerHandler } from '../hooks/useDatePickerHandler';
import { useDatePickerKeyboardNavigation } from '../hooks/useDatePickerKeyboardNavigation';
import IconWithCalendar from './IconWithCalendar';

function DatePicker({
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
  setDateTimeEnd,
}) {
  const {
    startDate,
    endDate,
    hoveredDate,
    displayErrorFirst,
    displayErrorLast,
    setHoveredDate,
    handleDateRangeClick,
    handleSingleDate,
    isInRange,
    isInHoverRange,
    clearStartDate,
    clearEndDate,
    clearStartDateWhenNoDateTime,
    setStartDate,
    setEndDate,
  } = useDatePickerHandler({
    isRangePicker,
    onlyFuture,
    input,
    onChange,
    initialValue,
    dateTimeValue,
    dateTimeDefault,
    isDateTimeDouble,
    dateTimeStart,
    dateTimeEnd,
    setDateTimeStart,
    setDateTimeEnd,
  });

  const {
    openCalendar,
    openCalendarEnd,
    currentMonth,
    currentDate,
    weekdays,
    datePickerRef,
    inputRefEnd,
    inputRefStart,
    setOpenCalendar,
    setOpenCalendarEnd,
    handlePrevYear,
    handleNextYear,
    handlePrevMonth,
    handleNextMonth,
    handleInputKeyDown,
    onChangeCurrent,
    enabledKeyboardFunc,
    disableKeyboardFunc,
  } = useDatePickerKeyboardNavigation({
    locale,
    disabled,
    onlyFuture,
    startDate,
    endDate,
    isRangePicker,
    dateTimeValue,
    input,
    onChange,
    handleSingleDate,
    setStartDate,
    setEndDate,
    hoveredDate,
  });

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            data-testid="first-input"
            readOnly={true}
            value={startDate && startDate.toLocaleDateString(locale)}
            onClick={() => {
              setOpenCalendarEnd(false);
              setOpenCalendar(!openCalendar);
            }}
            disabled={disabled}
            width={124}
            height={40}
            isInvalid={displayErrorFirst && startDate === ''}
            placeholder={placeholder}
            ref={inputRefStart}
            onKeyDown={e => {
              if (!openCalendar && !openCalendarEnd) {
                handleInputKeyDown(e, true);
              }
            }}
          />
          <IconWrapper>
            <IconWithCalendar
              startDate={startDate}
              dateTimeStart={dateTimeStart}
              dateTimeEnd={dateTimeEnd}
              dateTimeValue={dateTimeValue}
              disabled={disabled}
              clearStartDate={clearStartDate}
              clearStartDateWhenNoDateTime={clearStartDateWhenNoDateTime}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
            />
          </IconWrapper>
        </InputWrapper>
        {isRangePicker && (
          <>
            <NextIcon name="Interface-arrow-right" />
            <InputWrapper isRangePicker={isRangePicker}>
              <InputField
                data-testid="second-input"
                className="secondInput"
                readOnly={true}
                value={endDate && endDate.toLocaleDateString(locale)}
                onClick={() => {
                  setOpenCalendar(false);
                  setOpenCalendarEnd(!openCalendarEnd);
                }}
                disabled={disabled}
                width={124}
                height={40}
                placeholder={placeholder}
                activesecondinput={(startDate && !endDate) || openCalendarEnd}
                isInvalid={displayErrorLast && endDate === ''}
                ref={inputRefEnd}
                onKeyDown={e => {
                  if (!openCalendar && !openCalendarEnd) {
                    handleInputKeyDown(e, false);
                  }
                }}
              />
              <IconWrapper>
                {endDate ? (
                  <InputIcon
                    onClick={disabled ? () => {} : clearEndDate}
                    data-testid="icon-button"
                    type="button"
                    aria-label="Clear end date"
                  >
                    <Icon name="alert-circle-solid-cross" />
                  </InputIcon>
                ) : (
                  <InputIcon
                    onClick={() => (setOpenCalendarEnd(!openCalendarEnd))}
                    type="button"
                    aria-label="Open calendar"
                  >
                    <Icon name="Interface-calendar-dot" />
                  </InputIcon>
                )}
              </IconWrapper>
            </InputWrapper>
          </>
        )}
      </InputContainer>
      {openCalendar && !disabled && (
        <CalendarWrapper ref={datePickerRef} data-testid="calendar-id" isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <Calendars data-testid="container-id">
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
        <CalendarWrapperEnd ref={datePickerRef} data-testid="calendar-id" isRangePicker={isRangePicker} isDoubleView={isDoubleView}>
          <Calendars data-testid="container-id">
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
}

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
  dateTimeDefault: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
};

DatePicker.defaultProps = {
  isDoubleView: false,
  isRangePicker: false,
  initialValue: null,
  locale: 'ja-JP',
  onChange: () => {},
  disabled: false,
  placeholder: 'yyyy/mm/dd',
  dateTimeStart: false,
  dateTimeEnd: false,
  setDateTimeStart: false,
  setDateTimeEnd: false,
  onlyFuture: true,
  dateTimeValue: false,
  isDateTimeDouble: false,
  input: {},
  dateTimeDefault: null,
};

export default React.memo(DatePicker);
