import CommonButtonStyle from './CommonButtonStyle';
import styled from 'styled-components';

const Primary = styled(CommonButtonStyle)`
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  border: 1px solid var(--rds-teal-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-teal-500);
  height: ${({ compact }) => compact ? '32px' : '40px'};

  &:hover {
    background-color: var(--rds-teal-600);
    border-color: var(--rds-teal-600);
  }

  &:active {
    background-color: var(--rds-teal-700);
    border-color: var(--rds-teal-700);
  }
`;

export default Primary;
