import styled, { keyframes, css } from 'styled-components';

import { Icon } from 'components/Atoms';

// Animation for the line to grow
const growLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const TrackerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepLineWrapper = styled.div`
  position: relative;
`;

// Step Circle for each step
export const StepCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: ${({ isActive, complete }) => {
    if (complete) return 'var(--rds-color-primary-1-deep)';
    if (isActive) return 'var(--rds-color-primary-1-dark)';
    return 'var(--rds-color-neutral-0)';
  }};
  color: ${({ isActive }) => (isActive ? 'var(--rds-color-neutral-0)' : 'var( --rds-color-primary-1-dark)')};
  border: ${({ complete }) => (complete ? '1px solid var(--rds-color-primary-1-deep)' : '1px solid var(--rds-color-primary-1-dark)')};
  font-size: 12px;
  transition: background-color 0.7s ease-in-out;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    margin-top: -2px;
  }
`;

export const StepIndex = styled.div`
  font-size: 12px;
  height: inherit;
  width: 100%;
  text-align: center;
`;

// Step label below the circle
export const LabelContainer = styled.div`
  position: relative;
  margin-left: -50px;
  width: 150px;
  margin-top: 8px;
  text-align: center;
`;

export const StepLabel = styled.div`
  font-size: 12px;
  color: ${({ hasCompleted, isInProgress }) => {
    if (hasCompleted) return 'var(--rds-color-neutral-5)';
    if (isInProgress) return 'var(--rds-color-neutral-11)';
    return 'var(--rds-color-neutral-10)';
  }};
  text-align: center;
  width: 120px;
  white-space: nowrap;
  text-align: center;
  text-wrap: wrap;
  height: 20px;
  font-weight: ${({ isInProgress }) => (isInProgress ? 'bold' : 'normal')};
  margin-top: ${({ lastIndex }) => (lastIndex ? '-10px' : '-5px')};
`;

export const StepLineBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: var(--rds-color-neutral-2);
  margin-top: -10px;
  z-index: -2;
`;

// Connector line between steps
export const StepLine = styled.div`
  height: 4px;
  width: 68px;
  flex-grow: 1;
  margin-left: 10px;
  z-index: -1;
  ${({ isActive }) => isActive
    && css`
      background-color: var(--rds-color-primary-1-normal);
      animation: ${growLine} 1s ease-in-out forwards;
    `};
  position: relative;
  margin-top: -10px;
`;

export const StepLabelContainer = styled.div`
  position: relative;
`;

export const CheckIcon = styled(Icon)`
  font-size: 14px;
  color: var(--rds-color-neutral-0);
  margin-top: 2px;
`;
