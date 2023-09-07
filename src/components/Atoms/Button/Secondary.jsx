import styled from 'styled-components';
import CommonButtonStyle from './CommonButtonStyle';

const Secondary = styled(CommonButtonStyle)`
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  border: 1px solid var(--rds-teal-500);
  color: var(--rds-teal-500);
  background-color: var(--rds-neutral-0);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-neutral-100);
    border-color: var(--rds-teal-600);
  }

  &:active {
    background-color: var(--rds-neutral-200);
    border-color: var(--rds-teal-700);
  }
`;

export default Secondary;
