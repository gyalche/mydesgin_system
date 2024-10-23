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
  border-radius: 5px;
  margin-left: ${({isTimeRange, isRangePicker}) => (isTimeRange || isRangePicker) && '1px'};
`;

export const InputFieldStyle = styled(Input)`
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  border: ${({error, activeSecondInput}) => error ? '1px solid red' : 
    activeSecondInput && '1px solid var(--rds-color-primary-1-normal)'};
  outline: ${({error}) => error && 'none'};
  line-height: 22.4px;
  padding-right: 1px;
  font-size: 14px;

  &:hover {
    border: ${({error}) => error && '1px solid red'}
  };

  &:focus {
    border: ${({activeSecondInput}) => activeSecondInput && true};
  }
  &::placeholder {
    color: var(--rds-color-neutral-6);
    padding: 0;
  };
`;

export const IconWrapper = styled.div`
  right: 4px;
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: ${({isSaturday, isSunday}) => 
    isSaturday ? 'var(--rds-color-teritary-2-dark)' : 
    isSunday ? 'var(--rds-color-secondary-3-deep)' : 
    'var(--rds-color-neutral-7)'};
`;

export const HeaderIcons = styled.div`
  font-size: 24px;
  z-index: 9999;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
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
  border: ${({currentDate}) => currentDate && '1px solid var(--rds-color-primary-1-normal)'};
  cursor: ${({isDisabled}) => isDisabled ? 'not-allowed' : 'pointer'};
  border-radius: 4px;
  background: ${({ isSelected, isInRange, isInHoverRange, isKeyboardSelect, isDisabled }) => {
    if(isKeyboardSelect && isKeyboardSelect !== isSelected && !isDisabled) return 'var(--rds-color-primary-1-subtle)';
    if (isSelected) return 'var(--rds-color-primary-1-dark)';
    if ( isInHoverRange) return 'var(--rds-color-primary-1-subtle)';
    return 'transparent';
  }};
  color: ${({ isSaturday, isSunday, isSelected, isDisabled, currentDate }) => {
    if (isSelected) return 'var(--rds-color-neutral-0)';
    if (isDisabled) return 'var(--rds-color-neutral-4)';
    if (isSaturday && !isDisabled) return 'var(--rds-color-teritary-2-normal)';
    if (isSunday && !isDisabled) return 'var(--rds-color-secondary-3-normal)';
    if (currentDate) return 'var(--rds-color-primary-1-normal)';
  }};
  pointer-events: ${({isDisabled}) => isDisabled ? 'none' : 'auto'};
  box-shadow: ${({isSelected}) => isSelected && '0px 2px 4px 0px var(--rds-color-neutral-5)'};
  &:hover {
    background-color: ${({isDisabled, isSelected}) => (!isDisabled && !isSelected) && 'var(--rds-color-primary-1-subtle)'};
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
  margin-left: ${({isRangePicker, isDoubleView}) => !isRangePicker ? '215px' : 
    isRangePicker && isDoubleView ? '410px' : '65px'};
`;

export const CalendarWrapperEnd = styled(CalendarWrapper)`
  margin-left: ${({isDoubleView}) => isDoubleView ? '407px' : '377px'};
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
  font-size: 15px;
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
  left: ${({ is12Hour }) => !is12Hour && '-10px' };
  width: ${({ is12Hour }) => is12Hour ? '150px' : '100px'};
  margin-left: ${({ is12Hour, isTimeRange }) => {
    if(is12Hour && !isTimeRange) return '57px';
    if(!is12Hour) return '12px';
    if(is12Hour && isTimeRange) return '-70px';
  }};
  background: white;
  border-radius: 4px;
  z-index: 9999;
  display: flex;
  height: 260px;
  overflow-y: hidden;
  box-shadow: 0px 4px 8px 0px var(--rds-color-neutral-5);
  margin-top: 18px;
`;
export const EndDropDown = styled(Dropdown)`
  margin-left: ${({ is12Hour }) => {
    if(is12Hour) return '185px';
    if(!is12Hour) return '130px';
    return '50px';
  }};
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
  max-height: 260px;
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
  color: ${({ selected }) => selected && 'var(--rds-color-primary-1-dark)'};
  background-color: ${({ selected, highlighted }) => (selected || highlighted) && 'var(--rds-color-primary-1-subtle)'};
  
  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;

export const NextIcon = styled(Icon)`
  font-size: 25px;
  color: var(--rds-color-neutral-8);
`;

export const CalendarIcon = styled(Icon)`
  cursor: pointer;
`;

export const DateTimeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
