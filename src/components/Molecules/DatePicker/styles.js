import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  height: 360px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--rds-neutral-300);
  border-radius: 3px;
  text-align: center;
`;

export const InputField = styled.input`
  border: none;
  text-align: center;
  outline: none;
  width: 83px;
  height: 40px;
  font-size: 12px;
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: var(--rds-neutral-800);
  padding: 12px 12px 0 12px;
`;

export const WeekdayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => 
    props.isSaturday ? 'var(--rds-color-teritary-2-dark)' : props.isSunday ? 'var(--rds-red-600)' : 'var(--rds-neutral-700)'};
`;

export const HeaderIcons = styled.div`
  gap: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 9999;
`;

export const CalendarContainer = styled.div`
  width: 340px;
  height: 250px; 
  padding: 10px;
`;

export const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const Day = styled.div`
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
    props.isInRange ? 'var(--rds-teal-200)' :
    props.isInHoverRange ? 'var(--rds-teal-100)' : 'transparent'};
  color: ${(props) => 
   props.isSelected ? 'var(--rds-neutral-0)' : props.isDisabled ? 'var(--rds-neutral-400)' : props.currentDate && 'var(--rds-teal-400)'};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  
  &:hover {
    background-color: ${(props) => !props.isDisabled && !props.isSelected && 'var(--rds-teal-100)'};
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--rds-neutral-300);
  box-shadow: 0px 4px 8px 0px var(--rds-neutral-500);
  align-items: center;
  justify-content: center;
`;

export const Calenders = styled.div`
  display: flex;
  gap: 5px;
  borderRadius: 4px;
`;

export const CalenderMonths = styled.div`
  color: var(--rds-neutral-900);
  margin-top: -55px;
  postion: absolute;
  text-align: center;
  padding-bottom: 20px;
  font-size: 17px;
  font-weight: 700;
`;

export const TimePickerContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--rds-neutral-300);
  border-radius: 4px;
  padding: 5px 10px;
  width: 100px;
`;

export const TimeInput = styled.input`
  border: none;
  background: none;
  font-size: 14px;
  width: 60px;
  text-align: center;
  outline: none;
`;

export const ClearButton = styled.button`
  color: var(--rds-neutral-500);
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 4px;
  z-index: 1000;
  display: flex;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px 0px var(--rds-neutral-500);
`;

export const Column = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 50%;
  max-height: 200px;
`;

export const TimeOption = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  position: sticky;
  border-right: 1px solid var(--rds-neutral-200);
  background-color: ${({ selected }) => (selected ? 'var(--rds-teal-500)' : 'transparent')};
  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;
