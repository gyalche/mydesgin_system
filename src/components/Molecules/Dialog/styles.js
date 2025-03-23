import styled from 'styled-components';

import { Icon, Typography } from 'components/Atoms';

export const DialogContainer = styled.dialog`
  border: none;
  border-radius: 4px;
  bottom: 0;
  box-shadow: var(--rds-box-shadow-4);
  left: 0;
  max-width: ${({ $maxW }) => $maxW};
  outline: none;
  padding: 24px;
  position: fixed;
  right: 0;
  width: ${({ $w }) => $w};
  top: 0;

  &::backdrop {
    background: rgba(71, 77, 102, 0.64);
  }
`;

export const TitleText = styled(Typography).attrs(() => ({ level: 'h6' }))`
  color: var(--rds-color-neutral-11);
`;

export const ContentText = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: var(--rds-color-neutral-9);
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
