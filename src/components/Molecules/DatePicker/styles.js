import { Icon, Input } from 'components/Atoms';
import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 2px;
  border-radius: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  color: var(--rds-color-neutral-5);
`;

export const InputFieldStyle = styled(Input)`
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  border: ${({error}) => error && '1px solid red'};
  outline: ${({error}) => error && 'none'};
  line-height: 22.4px;
  font-size: 14px;
  &:hover {
    border: ${({error}) => error && '1px solid red'}
  };
  &::placeholder {
    color: var(--rds-color-neutral-6);
    padding: 0;
  };
`;

export const IconWrapper = styled.div`
  right: 5px;
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: var(--rds-color-neutral-8);
  padding: 12px 12px 0 12px;
`;

export const WeekdayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => 
    props.isSaturday ? 'var(--rds-color-teritary-2-dark)' : props.isSunday ? 'var(--rds-color-secondary-3-deep)' : 'var(--rds-color-neutral-7)'};
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
  border: ${(props) => (props.currentDate ? '1px solid var(--rds-color-primary-1-normal)' : '')};
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  background: ${(props) => 
    props.isSelected ? 'var(--rds-color-primary-1-dark)' :
    props.isInRange ? 'var(--rds-color-primary-1-subtle)' :
    props.isInHoverRange ? 'var(--rds-color-primary-1-subtle)' : 'transparent'};
  color: ${(props) => props?.isSaturday && !props.isSelected && !props.isDisabled ? 'var(--rds-color-teritary-2-normal)' 
    : props?.isSunday && !props.isSelected && !props.isDisabled? 'var(--rds-color-secondary-3-normal)' :
   props.isSelected ? 'var(--rds-color-neutral-0)' : props.isDisabled ? 'var(--rds-color-neutral-4)' : 
   props.currentDate && 'var(--rds-color-primary-1-normal)'};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  
  &:hover {
    background-color: ${(props) => !props.isDisabled && !props.isSelected && 'var(--rds-color-primary-1-subtle)'};
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--rds-color-neutral-3);
  box-shadow: 0px 4px 8px 0px var(--rds-color-neutral-5);
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  margin-top: 48px;
  margin-left: 215px;
`;

export const Calenders = styled.div`
  display: flex;
  gap: 5px;
  borderRadius: 4px;
`;

export const CalenderMonths = styled.div`
  color: var(--rds-color-neutral-9);
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
  border-radius: 8px;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--rds-color-neutral-3);
  border-radius: 4px;
  width: ${({is12Hour}) => is12Hour ? '120px' : '100px'};
  height: 40px;
  gap: 2px;
`;

export const TimeInput = styled(Input)`
  background: none;
  font-size: 14px;
  width: ${({is12Hour}) => is12Hour ? '80px' : '60px'};
  text-align: center;
  outline: none;
  border: none;
  &:hover {
    border: none;
  };
`;

export const InputIcon = styled.button`
  color: var(--rds-color-neutral-5);
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
  outline: none;
`;

export const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30px;
  left: ${({is12Hour}) => !is12Hour && '-10px'};
  width: ${({is12Hour}) => is12Hour ? '130px' : '100px'};
  margin-left: ${({is12Hour}) => !is12Hour && '10px'};
  background: white;
  border-radius: 4px;
  z-index: 1000;
  display: flex;
  max-height: 280px;
  overflow-y: hidden;
  box-shadow: 0px 4px 8px 0px var(--rds-color-neutral-5);
  margin-top: 18px;
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 7px 5px;
  border-bottom: 1px solid var(--rds-color-neutral-2);
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
  border-right: 1px solid var(--rds-color-neutral-2);
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
  color: ${({ selected }) => (selected && 'var(--rds-color-primary-1-dark)')};
  background-color: ${({ selected }) => (selected && 'var(--rds-color-primary-1-subtle)')};
  
  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;

export const NextIcon = styled(Icon)`
  font-size: 25px;
  color: var(--rds-color-neutral-8);
`;

export const DateTimeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
