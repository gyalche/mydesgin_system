import { Input } from 'components/Atoms';
import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
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
  border: 1px solid var(--rds-neutral-200);
  border-radius: 3px;
  text-align: center;
  width: 110px;
  &:hover {
    border: 1px solid var(--rds-color-primary-1-normal);
  };
`;

export const InputField = styled(Input)`
  border: none;
  text-align: center;
  outline: none;
  width: 78px;
  height: 38px;
  font-size: 12px;
  color: var(--rds-neutral-600);
  &:hover {
    border: none;
  }
`;

export const TimeInputField = styled(Input)`
  border: 1px solid var(--rds-neutral-200);
  text-align: center;
  width: 80px;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  color: var(--rds-neutral-600);
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
  color: ${(props) => props?.isSaturday && !props.isSelected && !props.isDisabled ? 'var(--rds-blue-400)' 
    : props?.isSunday && !props.isSelected && !props.isDisabled? 'var(--rds-red-400)' :
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
  position: absolute;
  z-index: 999;
  margin-top: 50px;
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
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--rds-neutral-300);
  border-radius: 4px;
  width: ${(props) => props.is12Hour ? '120px' : '100px'};
  height: 40px;
  gap: 2px;
`;

export const TimeInput = styled.input`
  background: none;
  font-size: 14px;
  width: ${(props) => props.is12Hour ? '80px' : '60px'};
  text-align: center;
  outline: none;
  border: none;
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
  display: flex;
  flex-direction: column;
  top: 45px;
  left: 0;
  width: ${(props)=>props.is12Hour ? '130px' : '110px'};
  background: white;
  border-radius: 4px;
  z-index: 1000;
  display: flex;
  max-height: 280px;
  overflow-y: hidden;
  box-shadow: 0px 4px 8px 0px var(--rds-neutral-500);
  margin-top: 18px;
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 7px 5px;
  border-bottom: 1px solid var(--rds-neutral-200);
`;
export const HourMinuteWrapper = styled.div`
  display: flex;
`;
export const ScrollColumn = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 50%;
  max-height: 200px;
  overflow-y: auto;
  border-right: 1px solid var(--rds-neutral-200);
`;

export const StaticColumn = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 50%;
`;

export const TimeOption = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: ${({ selected }) => (selected && 'var(--rds-teal-500)')};
  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;
