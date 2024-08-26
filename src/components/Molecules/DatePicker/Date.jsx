import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'components/Atoms';

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  height: 360px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.input`
  padding: 4px 5px;
  border: 1px solid var(--rds-neutral-300);
  border-radius: 4px;
  text-align: center;
  width: 83px;
  height: 40px;
  font-size: 12px;
  display: inline-block;
  position: relative;
`;

const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: var(--rds-neutral-800);
  padding: 12px 12px 0 12px;
`;

const WeekdayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => 
    props.isSaturday ? 'var(--rds-color-teritary-2-dark)' : props.isSunday ? 'var(--rds-red-600)' : 'var(--rds-neutral-700)'};
`;

const HeaderIcons = styled.div`
  gap: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  width: 340px;
  height: 230px; 
  padding: 10px;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41.29px; 
  height: 32px;
  text-align: center;
  font-size: 12px;
  border: ${(props) => (props.currentDate ? '1px solid var(--rds-teal-400)' : '')};
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  background: ${(props) => 
    props.isSelected ? 'var(--rds-teal-500)' :
    props.isInRange ? 'var(--rds-teal-200)' : 'transparent'};
  color: ${(props) => 
  props.isSelected || props.isInRange ? '#fff' : (props.isDisabled ? 'var(--rds-neutral-400)' : props.currentDate && 'var(--rds-teal-400)')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  &:hover {
    background-color: ${(props) => !props.isDisabled && !props.isSelected && 'var(--rds-teal-100)'};
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--rds-neutral-300);
  box-shadow: 0px 4px 8px 0px var(--rds-neutral-500);
  align-items: center;
  justify-content: center;
`;

const Calenders = styled.div`
  display: flex;
  gap: 5px;
  borderRadius: 4px;
`;

const normalizeDate = (date) => new Date(date).setHours(0, 0, 0, 0);

const DatePicker = ({ isDoubleView, isRange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const skipMonthCheck = isDoubleView  ? 2 : 1;

  const handleDayClick = (date) => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (normalizedDate < today) return; // Disable past dates

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (normalizedDate < normalizeDate(startDate)) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
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

  const handlePrevMonth = (val) => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - val, 1));
  };
  
  const handleNextMonth = (val) => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + val, 1));
  };
  

  const renderCalendar = (date) => {
    const days = getDaysInMonth(date);
    return (
      <CalendarContainer>
         <div>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</div>
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
                onClick={() => handleDayClick(day)}
              >
                {day.getDate()}
              </Day>
            ))}
        </DaysContainer>
      </CalendarContainer>
    );
  };

  const currentDate = new Date();
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  return (
    <DatePickerContainer>
      <InputContainer>
        <InputField
          type="text"
          readOnly
          value={startDate ? startDate.toLocaleDateString('ja-JP') : 'yyyy/mm/dd'}
          onClick={() => setOpenCalender(!openCalender)}
        />
        
        {(startDate && endDate) && (
          <>
            <span>～</span>
            <InputField
              type="text"
              readOnly
              value={endDate ? endDate.toLocaleDateString('ja-JP') : 'yyyy/mm/dd'}
              onClick={() => setOpenCalender(!openCalender)}
            />
          </>
        )}
      </InputContainer>
          {openCalender && (
              <CalendarWrapper>
                  <CalendarHeader>
                      <HeaderIcons>
                        <Icon name='Interface-chevron-double-left' onClick={() => handlePrevMonth(skipMonthCheck)}/>
                        <Icon name='Interface-chevron-left' onClick={() => handlePrevMonth(skipMonthCheck)}/>
                      </HeaderIcons>
                     
                      <HeaderIcons>
                        <Icon name='Interface-chevron-double-right' onClick={() => handleNextMonth(skipMonthCheck)}/>
                        <Icon name='Interface-chevron-right' onClick={() => handleNextMonth(skipMonthCheck)}/>
                      </HeaderIcons>
                  </CalendarHeader>
                  <Calenders>
                      {/* {renderCalendar(currentDate)}
                      {isDoubleView && renderCalendar(nextMonth)} */}
                      {renderCalendar(currentMonth)}
                      {isDoubleView && renderCalendar(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  </Calenders>
              </CalendarWrapper>
          )}
    
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  isDoubleView: PropTypes.bool,
  isRange: PropTypes.bool,
};

DatePicker.defaultProps = {
  isDoubleView: true,
  isRange: false,
};

export default DatePicker;
