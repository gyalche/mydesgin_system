import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-grid;
  position: relative;
  left: 8px;
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
  z-index: 2;

  &:hover {
    transition: 0s;
    visibility: visible;
    opacity: 1;
  }
`;

export const DisplayText = styled.div`
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(156, 168, 184, 0.48);
  color: ${({ $fontColor }) => $fontColor};
  max-width: ${({ $width }) => $width};
  left: ${props => props.$left + 8}px;
  padding: 12px;
  position: absolute;
  top: -10px;
  width: ${({ $width }) => $width};
  z-index: 2;

  @media (max-width: 599px) {
    top: 22px;
    left: ${({ $left, $windowWidth }) =>
      $windowWidth <= 599 && $left ? `${-$left + 13}px` : 'inherit'};
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
