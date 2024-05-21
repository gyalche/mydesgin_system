import styled from 'styled-components';
import { Icon, Typography } from 'src/components/Atoms';

export const DialogContainer = styled.dialog`
  border: none;
  border-radius: 4px;
  box-shadow: 0px 12px 40px 0px rgba(156, 168, 184, 0.48);
  max-width: ${({ $maxWidth }) => $maxWidth};
  outline: none;
  padding: 24px;

  &::backdrop {
    background: rgba(71, 77, 102, 0.64);
  }
`;

export const TitleText = styled(Typography).attrs(() => ({ level: 'h6' }))`
  color: var(--rds-color-neutral-11);
  line-height: 120%;
`;

export const ContentText = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: var(--rds-color-neutral-9);
  line-height: 160%;
`;

export const CloseIconPlacement = styled.span`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const StyledIcon = styled(Icon)`
  color: ${({ color }) => color};
`;
