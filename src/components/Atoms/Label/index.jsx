import styled from 'styled-components';

const Label = styled.label`
  color: ${({ disabled }) => disabled ? 'var(--rds-neutral-500)' : 'var(--rds-neutral-900)'};
`;

export default Label;
