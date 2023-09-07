import styled from 'styled-components';
import CommonButtonStyle from './CommonButtonStyle';

const Danger = styled(CommonButtonStyle)`
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  border: 1px solid var(--rds-red-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-red-500);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-red-600);
    border-color: var(--rds-red-600)
  }

  &:active {
    background-color: var(--rds-red-700);
    border-color: var(--rds-red-700);
  }
`;

export default Danger;
