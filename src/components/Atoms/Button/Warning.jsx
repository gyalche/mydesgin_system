import styled from 'styled-components';
import CommonButtonStyle from './CommonButtonStyle';

const Warning = styled(CommonButtonStyle)`
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  border: 1px solid var(--rds-yellow-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-yellow-500);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-yellow-600);
    border-color: var(--rds-yellow-600)
  }

  &:active {
    background-color: var(--rds-yellow-700);
    border-color: var(--rds-yellow-700);
  }
`;

export default Warning;
