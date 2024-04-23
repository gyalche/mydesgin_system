import styled, { css } from 'styled-components';
import PropTypes from 'prop-types'; 

export const primaryStyles = css`
  background-color: var(--rds-color-primary-1-dark);
  border: 1px solid var(--rds-color-primary-1-dark);
  color: var(--rds-color-neutral-0);

  &:hover {
    background-color: var(--rds-color-primary-1-deep);
    border-color: var(--rds-color-primary-1-deep);
  }

  &:active {
    background-color: var(--rds-color-primary-1-intense);
    border-color: var(--rds-color-primary-1-intense);
  }
`;

export const secondaryStyles = css`
  background-color: var(--rds-color-neutral-0);
  border: 1px solid var(--rds-color-primary-1-dark);
  color: var(--rds-color-primary-1-dark);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-color-neutral-1);
    border-color: var(--rds-color-primary-1-deep);
  }

  &:active {
    background-color: var(--rds-color-neutral-2);
    border-color: var(--rds-color-primary-1-intense);
  }
`;

export const warningStyles = css`
  background-color: var(--rds-color-tertiary-1-dark);
  border: 1px solid var(--rds-color-tertiary-1-dark);
  color: var(--rds-color-neutral-0);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-color-tertiary-1-deep);
    border-color: var(--rds-color-tertiary-1-deep)
  }

  &:active {
    background-color: var(--rds-color-tertiary-1-intense);
    border-color: var(--rds-color-tertiary-1-intense);
  }
`;

export const dangerStyles = css`
  background-color: var(--rds-color-secondary-3-dark);
  border: 1px solid var(--rds-color-secondary-3-dark);
  color: var(--rds-color-neutral-0);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-color-secondary-3-deep);
    border-color: var(--rds-color-secondary-3-deep)
  }

  &:active {
    background-color: var(--rds-color-secondary-3-intense);
    border-color: var(--rds-color-secondary-3-intense);
  }
`;

export const subtleStyles = css`
  background-color: transparent;
  border: none;
  color: var(--rds-color-neutral-9);
  height: ${({ compact }) => compact ? '32px' : '40px'};
  
  &:hover {
    background-color: var(--rds-color-neutral-2);
    color: var(--rds-color-neutral-10);
  }

  &:active {
    background-color: var(--rds-color-neutral-3);
    color: var(--rds-color-neutral-11);
  }
`;

export const linkStyles = css`
  background-color: transparent;
  border: none;
  color: var(--rds-color-primary-1-dark);
  height: 20px;
  padding: 0;

  &:hover {
    background-color: transparent;
    color: var(--rds-color-primary-1-deep);
    text-decoration: underline;
  }

  &:active {
    background-color: transparent;
    color: var(--rds-color-primary-1-intense);
    text-decoration: underline;
  }
`;

export const subtleLinkStyles = css`
  background-color: transparent;
  border: none;
  color: var(--rds-color-neutral-9);
  padding: 0;
  height: 20px;
  
  &:hover {
    background-color: transparent;
    color: var(--rds-color-neutral-10);
    text-decoration: underline;
  }

  &:active {
    background-color: transparent;
    color: var(--rds-color-neutral-8);
    text-decoration: underline;
  }
`;

export const CommonButtonStyle = styled.button`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: ${({ compact }) => compact ? '32px' : '40px'};
  justify-content: center;
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ compact }) => compact ? '0 8px' : '0 16px'};
  width: ${({ w }) => w };

  &:disabled {
    background-color: var(--rds-color-neutral-2);
    border-color: var(--rds-color-neutral-4);
    color: var(--rds-color-neutral-7);
  }

  ${props => props.appearance === 'primary' && primaryStyles}
  ${props => props.appearance === 'secondary' && secondaryStyles}
  ${props => props.appearance === 'warning' && warningStyles}
  ${props => props.appearance === 'danger' && dangerStyles}
  ${props => props.appearance === 'subtle' && subtleStyles}
  ${props => props.appearance === 'link' && linkStyles}
  ${props => props.appearance === 'subtleLink' && subtleLinkStyles}
`;

CommonButtonStyle.propTypes = {
  appearance: PropTypes.oneOf(['primary', 'secondary', 'warning', 'danger', 'subtle', 'link', 'subtleLink']),
  compact: PropTypes.bool,
  w: PropTypes.string, 
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
};

CommonButtonStyle.defaultProps = {
  appearance: false,
  compact: false,
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default CommonButtonStyle;
