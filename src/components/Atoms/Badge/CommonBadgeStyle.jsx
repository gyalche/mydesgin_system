import styled , { css }from 'styled-components';

export const CommonBadgeStyle = styled.span`
  display: inline-flex;
  font-size: 12px;
  height: 20px;
  padding: 0 4px;
  justify-content: center;
  align-items: center;
  color: var(--rds-color-neutral-10);
  border-radius: 4px;
  background-color: var(--rds-color-neutral-2);

  ${props => props.appearance === 'blue' && Blue}
  ${props => props.appearance === 'green' && Green}
  ${props => props.appearance === 'yellow' && Yellow}
  ${props => props.appearance === 'red' && Red}
  ${props => props.appearance === 'violet' && Violet}
  ${props => props.appearance === 'teal' && Teal}
  ${props => props.appearance === 'pink' && Pink}
  ${props => props.appearance === 'orange' && Orange}
`;

export const Blue = css`
  color: var(--rds-color-tertiary-2-deep);
  background-color: var(--rds-color-teritary-2-subtle);
`;

export const Green = css`
  color: var(--rds-color-secondary-2-deep);
  background-color: var(--rds-color-secondary-2-subtle);
`;

export const Yellow = css`
  color: var(--rds-color-tertiary-1-deep);
  background-color: var(--rds-color-tertiary-1-subtle);
`;

export const Red = css`
  color: var(--rds-color-secondary-3-deep);
  background-color: var(--rds-color-secondary-3-subtle);
`;

export const Violet = css`
  color: var(--rds-color-secondary-1-deep);
  background-color: var(--rds-color-secondary-1-subtle);
`;

export const Teal = css`
  color: var(--rds-color-primary-1-deep);
  background-color: var(--rds-color-primary-1-subtle);
`;

export const Pink = css`
  color: var(--rds-color-teritary-3-deep);
  background-color: var(--rds-color-teritary-3-subtle);
`;

export const Orange = css`
  color: var(--rds-color-teritary-4-deep);
  background-color: var(--rds-color-teritary-4-subtle);
`;

export default CommonBadgeStyle;
