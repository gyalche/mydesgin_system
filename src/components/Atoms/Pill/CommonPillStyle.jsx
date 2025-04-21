import styled, { css } from 'styled-components';

export const Danger = css`
  background-color: var(--rds-color-secondary-3-deep);
  color: var(--rds-color-neutral-0);
`;

export const Blue = css`
  background-color: var(--rds-color-tertiary-2-subtle);
  color: var(--rds-color-tertiary-2-deep);
`;

export const Green = css`
  background-color: var(--rds-color-secondary-2-subtle);
  color: var(--rds-color-secondary-2-deep);
`;

export const Yellow = css`
  background-color: var(--rds-color-tertiary-1-subtle);
  color: var(--rds-color-tertiary-1-deep);
`;

export const Red = css`
  background-color: var(--rds-color-secondary-3-subtle);
  color: var(--rds-color-secondary-3-deep);
`;

export const Violet = css`
  background-color: var(--rds-color-secondary-1-subtle);
  color: var(--rds-color-secondary-1-deep);
`;

export const Teal = css`
  background-color: var(--rds-color-primary-1-subtle);
  color: var(--rds-color-primary-1-deep);
`;

export const Pink = css`
  background-color: var(--rds-color-tertiary-3-subtle);
  color: var(--rds-color-tertiary-3-deep);
`;

export const Orange = css`
  background-color: var(--rds-color-tertiary-4-subtle);
  color: var(--rds-color-tertiary-4-deep);
`;

export const CommonPillStyle = styled.div`
  background-color: var(--rds-color-neutral-2);
  border-radius: 8px;
  color: var(--rds-color-neutral-10);
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-weight: 700;
  line-height: 14.4px;
  padding: 0 6px;
  ${props => props.appearance === 'danger' && Danger}
  ${props => props.appearance === 'blue' && Blue}
  ${props => props.appearance === 'green' && Green}
  ${props => props.appearance === 'yellow' && Yellow}
  ${props => props.appearance === 'red' && Red}
  ${props => props.appearance === 'violet' && Violet}
  ${props => props.appearance === 'teal' && Teal}
  ${props => props.appearance === 'pink' && Pink}
  ${props => props.appearance === 'orange' && Orange}
`;

CommonPillStyle.displayName = 'Pill';

export default CommonPillStyle;
