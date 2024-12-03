import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from 'components/Atoms/Layout';
import { Button, Icon, Typography } from 'components/Atoms';

export const successStyles = css`
  background-color: var(--rds-color-secondary-2-intense);
  color: var(--rds-color-neutral-0);
`;

export const infoStyles = css`
  background-color: var(--rds-color-neutral-9);
  color: var(--rds-color-neutral-0);
`;

export const warningStyles = css`
  background-color: var(--rds-color-tertiary-1-light);
  color: var(--rds-color-neutral-11);
`;

export const errorStyles = css`
  background-color: var(--rds-color-secondary-3-dark);
  color: var(--rds-color-neutral-0);
`;

export const actionButtonStyle = css`
  background-color: var(--rds-color-secondary-2-intense);
  color: var(--rds-color-neutral-0);
`;

export const ToastContainer = styled(Flex)`
  gap: 12px;
  margin: ${({ $withDescription }) => $withDescription ? '12px' : '8px'};
`;

export const StyledIcon = styled(Icon)`
  color: var(--rds-color-neutral-8);
  font-size: 24px;
  margin-top: ${({ $withDescription }) => !$withDescription && '4px'}
`;

export const TextContainer = styled(Flex)`
  align-self: center;
  flex-direction: column;
  width: ${({$withDescription}) => !$withDescription && '80%'};
`;

export const Description = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: ${({ $isWarning }) =>
    $isWarning ? 'var(--rds-color-neutral-9)' : 'inherit'};
  line-height: 160%;
  margin-top: 8px;
`;

export const CloseIcon = styled(Icon)`
  cursor: pointer;
  font-size: 24px;
  margin-top: ${({$withDescription}) => !$withDescription && '4px'}
`;

export const ToastButton = styled(Button.Subtle)`
  background-color: var(--rds-neutral-0);
  margin-top: ${({$withDescription}) => !$withDescription && '4px'};
  max-width: calc(100% / 3);
  white-space: nowrap;
`;

export const BtnLabel = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ToastIcon = styled(Icon)`
  font-size: 24px;
  margin-top: 5px;
`;

export const TitleWrapper = styled.div`
  margin-top: ${({noDescriptiion})=> !noDescriptiion ? '-10px' : '0'}
`;

const getToastsPlacementStyles = placement => {
  switch (placement) {
    case 'topCenter':
      return css`
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      `;
    default:
      return css`
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      `;
  }
};

export const ToastsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  z-index: 9999;
  ${({ $placement }) => getToastsPlacementStyles($placement)};
`;

const handlePlacement = placement => {
  const placementAnimations = {
    topCenter: 'slideDown',
    default: 'slideUp',
  };

  return placementAnimations[placement] || placementAnimations.default;
};

export const CommonToastStyle = styled.div`
  align-items: center;
  animation: ${({ $placement, $isFadingOut }) =>
    $isFadingOut
      ? 'fadeOut 1s forwards'
      : `${handlePlacement($placement)} 0.2s ease forwards`};
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px var(--rds-color-neutral-alpha-3);
  display: flex;
  font-weight: 700;
  width: 488px;
  z-index: 9999;

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &:disabled {
    background-color: var(--rds-color-neutral-2);
    border-color: var(--rds-color-neutral-4);
    color: var(--rds-color-neutral-7);
  }

  ${props => props.appearance === 'success' && successStyles}
  ${props => props.appearance === 'info' && infoStyles}
  ${props => props.appearance === 'warning' && warningStyles}
  ${props => props.appearance === 'error' && errorStyles}
`;

CommonToastStyle.propTypes = {
  appearance: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  w: PropTypes.string,
};

CommonToastStyle.defaultProps = {
  appearance: false,
  w: 'auto',
};

export default CommonToastStyle;
