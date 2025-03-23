import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: inline-grid;
  position: relative;
`;

export const ContentWrapper = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;

  &:hover + .display-text {
    visibility: visible;
    opacity: 1;
  }
`;

export const Anchor = styled.div`
  visibility: hidden;
  content: '';
  transition: 0.2s;
  position: initial;
  z-index: var(--rds-z-index-1);

  &:hover {
    transition: 0s;
    visibility: visible;
    opacity: 1;
  }
`;

const handlePlacement = placement => {
  switch (placement) {
    case 'topLeft':
      return css`
        bottom: 100%;
        right: 0;
        margin-bottom: 2px;
      `;

    case 'top':
      return css`
        bottom: 100%;
        transform: translateX(-50%);
        margin-bottom: 2px;
      `;

    case 'topRight':
      return css`
        bottom: 100%;
        left: 0;
        margin-bottom: 2px;
      `;

    case 'bottomLeft':
      return css`
        top: 100%;
        left: 0;
        margin-top: 2px;
      `;

    case 'bottom':
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 2px;
      `;

    case 'bottomRight':
      return css`
        top: 100%;
        right: 0;
        margin-top: 2px;
      `;

    default:
      return css`
        top: -10px;
        left: ${props => props.$left + 8}px;
      `;
  }
};

export const DisplayText = styled.div`
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 4px;
  box-shadow: var(--rds-box-shadow-2);
  color: ${({ $fontColor }) => $fontColor};
  max-width: ${({ $width }) => $width};
  padding: 12px;
  position: absolute;
  width: ${({ $width }) => $width};
  z-index: var(--rds-z-index-1);
  ${({ $placement }) => handlePlacement($placement)};

  @media (max-width: 599px) {
    top: 22px;
    left: ${({ $left, $windowWidth }) => ($windowWidth <= 599 && $left ? `${-$left + 13}px` : 'inherit')};
    max-width: calc(100vw - 55px);
    width: calc(100vw - 55px);
  }
`;

export const TextHeader = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  margin-bottom: 8px;
`;

export const TextBody = styled.div``; // This component is just for readability

export const TextMessage = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  leading-trim: both;
  line-height: 160%;
  text-edge: cap;
`;

export const TextSubMessage = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  leading-trim: both;
  line-height: 160%;
  text-edge: cap;
`;

export const HelpLink = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 8px;
`;
