import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Flex } from 'components/Atoms/Layout';
import { Button, Icon, Typography } from 'components/Atoms';

const IconColors = {
  success: 'var(--rds-color-secondary-2-intense)',
  info: 'var(--rds-color-neutral-8)',
  warning: 'var(--rds-color-tertiary-1-light)',
  error: 'var(--rds-color-secondary-3-normal)',
};

export const successStyles = css`
  background-color: var(--rds-color-secondary-2-pale);
  color: var(--rds-color-neutral-10);
`;

export const infoStyles = css`
  background-color: var(--rds-color-neutral-2);
  color: var(--rds-color-neutral-10);
`;

export const warningStyles = css`
  background-color: var(--rds-color-tertiary-1-subtle);
  color: var(--rds-color-neutral-10);
`;

export const errorStyles = css`
  background-color: var(--rds-color-secondary-3-subtle);
  color: var(--rds-color-neutral-10);
`;

export const actionButtonStyle = css`
  background-color: var((--rds-color-secondary-2-intense);
  color: var(--rds-color-neutral-0);
`;

export const AlertContainer = styled(Flex).attrs(() => ({ gap: '12px' }))`
  margin: ${({ $withDescription }) => ($withDescription ? '8px 12px' : '8px')};
`;

export const TextContainer = styled(Flex).attrs(() => ({ direction: 'column', mt: '-2px' }))`
  align-self: center;
  width: ${({ $withDescription }) => !$withDescription && '80%'};
`;

export const Description = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: ${({ $isWarning }) => ($isWarning ? 'var(--rds-color-neutral-9)' : 'inherit')};
  margin-top: 2px;
  font-size: 12px;
`;

export const CloseIcon = styled(Icon)`
  cursor: pointer;
  font-size: 24px;
  margin-top: ${({ $withDescription }) => !$withDescription && '4px'}
`;

export const AlertButton = styled(Button.Subtle).attrs(() => ({ w: '72px' }))`
  background-color: var(--rds-color-neutral-0);
  margin-top: ${({ $withDescription }) => !$withDescription && '4px'};
  height: 32px;
  white-space: nowrap;
  padding: 4px 8px 4px 8px;
  border-radius: 40px;
`;

export const BtnLabel = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const AlertIcon = styled(Icon)`
  font-size: 16px;
  margin-top: 3px;
  color: ${({ appearance }) => IconColors[appearance]}
`;

export const TitleWrapper = styled.div`
  margin-top: ${({ noDescriptiion }) => (!noDescriptiion ? '-10px' : '0')}
`;

export const CommonAlertStyle = styled(Flex).attrs(() => ({
  alignItems: 'center',
  w: '488px',
  pb: '3px',
}))`
  border-radius: 4px;
  z-index: 9999;

  ${props => props.appearance === 'success' && successStyles}
  ${props => props.appearance === 'info' && infoStyles}
  ${props => props.appearance === 'warning' && warningStyles}
  ${props => props.appearance === 'error' && errorStyles}
`;

CommonAlertStyle.propTypes = {
  appearance: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  w: PropTypes.string,
};

CommonAlertStyle.defaultProps = {
  appearance: 'success',
  w: 'auto',
};

export default CommonAlertStyle;
