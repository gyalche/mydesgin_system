import styled, { css } from 'styled-components';

export const primaryStyles = css`
  border: 1px solid var(--rds-teal-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-teal-500);

  &:hover {
    background-color: var(--rds-teal-600);
    border-color: var(--rds-teal-600);
  }

  &:active {
    background-color: var(--rds-teal-700);
    border-color: var(--rds-teal-700);
  }
`;

export const secondaryStyles = css`
  border: 1px solid var(--rds-teal-500);
  color: var(--rds-teal-500);
  background-color: var(--rds-neutral-0);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-neutral-100);
    border-color: var(--rds-teal-600);
  }

  &:active {
    background-color: var(--rds-neutral-200);
    border-color: var(--rds-teal-700);
  }
`;

export const warningStyles = css`
  border: 1px solid var(--rds-yellow-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-yellow-500);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-yellow-600);
    border-color: var(--rds-yellow-600)
  }

  &:active {
    background-color: var(--rds-yellow-700);
    border-color: var(--rds-yellow-700);
  }
`;

export const dangerStyles = css`
  border: 1px solid var(--rds-red-500);
  color: var(--rds-neutral-0);
  background-color: var(--rds-red-500);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-red-600);
    border-color: var(--rds-red-600)
  }

  &:active {
    background-color: var(--rds-red-700);
    border-color: var(--rds-red-700);
  }
`;

export const linkStyles = css`
  padding: 0; 
  border: none;
  color: var(--rds-teal-500);
  background-color: transparent;
  
  &:hover {
    background-color: transparent;
    color: var(--rds-teal-600);
    text-decoration: underline;
  }

  &:active {
    background-color: transparent;
    color: var(--rds-teal-700);
    text-decoration: underline;
  }
`;

export const subtleLinkStyles = css`
  padding: 0;
  border: none;
  color: var(--rds-neutral-900);
  background-color: transparent;

  &:hover {
    color: var(--rds-neutral-1000);
    background-color: transparent;
    text-decoration: none;
  }

  &:active {
    color: var(--rds-neutral-800);
    background-color: transparent;
    text-decoration: underline;
  }
`;

export const CommonButtonStyle = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  height: ${({ compact }) => compact ? '32px' : '40px'};
  width: ${({ w }) => w };
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};

  &:disabled {
    background-color: var(--rds-neutral-200);
    border-color: var(--rds-neutral-400);
    color: var(--rds-neutral-700);
  }

  ${props => props.appearance === 'primary' && primaryStyles}
  ${props => props.appearance === 'secondary' && secondaryStyles}
  ${props => props.appearance === 'warning' && warningStyles}
  ${props => props.appearance === 'danger' && dangerStyles}
  ${props => props.appearance === 'link' && linkStyles}
  ${props => props.appearance === 'subtleLink' && subtleLinkStyles}
`;

CommonButtonStyle.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  compact: null,
};

export default CommonButtonStyle;
