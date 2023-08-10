import styled from 'styled-components';
import CommonButtonStyle from './CommonButtonStyle';

const Link = styled(CommonButtonStyle)`
  border: none;
  color: var(--rds-teal-500);
  background-color: transparent;
  
  &:hover {
    background-color: transparent;
    color: var(--rds-teal-600);
    text-decoration: underline;
  }

  &:active {
    background-color: transparent;
    color: var(--rds-teal-700);
    text-decoration: underline;
  }
`;

export default Link;
