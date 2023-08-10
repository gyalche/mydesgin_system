import styled from 'styled-components';
import CommonButtonStyle from './CommonButtonStyle';

const SubtleLink = styled(CommonButtonStyle)`
  border: none;
  color: var(--rds-neutral-900);
  background-color: transparent;

  &:hover {
    color: var(--rds-neutral-1000);
    background-color: transparent;
    text-decoration: underline;
  }

  &:active {
    color:  ;
    background-color: transparent;
    text-decoration: underline;
  }
`;

export default SubtleLink;
