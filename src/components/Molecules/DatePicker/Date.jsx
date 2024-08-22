import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  // min-width: 390px;
  // max-width:500px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.input`
  padding: 4px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  width: 90px;
  font-size: 12px;
  background-color: #f9f9f9;
`;

const CalendarContainer = styled.div`
  border-radius: 4px;
  width: 321px;
  height: 293px;
  padding: 10px; 
  border: 1px solid gray;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
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
  border: ${(currentDate)=>(currentDate ? '1px solid red' : '')}
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  background: ${(props) => 
    props.isSelected ? '#00AED4' :
    props.isInRange ? '#00AED4' : 'transparent'};
  color: ${(props) => 
    props.isSelected || props.isInRange ? '#fff' : (props.isDisabled ? '#aaa' : '#000')};
  &:hover {
    background-color: ${(props) => !props.isDisabled && '#00AED4'};
  }
`;

const CalenderWrapper=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
`;

const DatePicker = ({ isDoubleView }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openCalender, setOpenCalender]=useState(false);

  const handleDayClick = (date) => {
    if (date < new Date()) return; // Disable past dates

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day > startDate && day < endDate;
  };

  const getDaysInMonth = (date) => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const renderCalendar = (date) => {
    const days = getDaysInMonth(date);
    return (
      <CalendarContainer>
        <CalendarHeader>
          <div>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</div>
        </CalendarHeader>
        <DaysContainer>
          {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: day === '土' ? '#0A47F2' : day === '日' ? '#EF0729' : 'gray',
                fontSize: '10px',
              }}
              key={index}
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <Day
              key={index}
              currentDate={new Date(Date.now())}
              isSelected={day.getTime() === startDate?.getTime() || day.getTime() === endDate?.getTime()}
              isInRange={isInRange(day)}
              isDisabled={day < new Date()}
              onClick={() => !day < new Date() && handleDayClick(day)}
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
          onClick={()=>setOpenCalender(!openCalender)}
        />
        
        {(isDoubleView || (startDate && endDate) ) && (
          <>
            <span>～</span>
            <InputField
              type="text"
              readOnly
              value={endDate ? endDate.toLocaleDateString('ja-JP') : 'yyyy/mm/dd'}
            />
          </>
        )}
      </InputContainer>
     <CalenderWrapper>
      {openCalender && (
        <>
           {renderCalendar(currentDate)}
           {isDoubleView && renderCalendar(nextMonth)}
        </>
      )}
     </CalenderWrapper>
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  isDoubleView: PropTypes.bool,
};

DatePicker.defaultProps = {
  isDoubleView: true,
};

export default DatePicker;
