import styled from 'styled-components';

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

// TODO: Replace with Typography component once it's done
export const TitleText = styled.span`
  color: var(--rds-color-neutral-11);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

// TODO: Replace with Typography component once it's done
export const ContentText = styled.span`
  color: var(--rds-color-neutral-9);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

// TODO: Replace with Typography component once it's done
export const CloseIconPlacement = styled.span`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  right: 4px;
  top: 4px;
`;
