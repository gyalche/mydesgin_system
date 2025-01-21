import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Layout, Typography } from 'components/Atoms';

const { Flex } = Layout;

const appearanceColors = {
  success: {
    iconColor: 'var(--rds-color-secondary-2-deep)',
    textColor: 'var(--rds-color-secondary-2-deep)',
  },
  error: {
    iconColor: 'var(--rds-color-secondary-3-normal)',
    textColor: 'var(--rds-color-secondary-3-deep)',
  },
  disabled: {
    bulletColor: 'var(--rds-color-neutral-alpha-3)',
  },
  enabled: {
    bulletColor: 'var(--rds-color-secondary-2-normal)',
  },
  info: {
    bulletColor: 'var(--rds-color-primary-1-normal)',
  },
  warning: {
    bulletColor: 'var(--rds-color-tertiary-1-normal)',
  },
  nodata: {
    bulletColor: 'var(--rds-color-secondary-3-normal)',
  },
};

const icons = {
  success: 'alert-circle-solid-check',
  error: 'alert-circle-solid-cross',
};

const Bullet = styled.div`
  background-color: ${({ $appearance }) => appearanceColors[$appearance]?.bulletColor || 'transparent'};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  margin-right: 4px;
  flex-shrink: 0;
`;

const StyledIcon = styled(Icon)`
  color: ${({ $appearance }) => appearanceColors[$appearance]?.iconColor || 'inherit'};
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-top: -4px;
`;

const Label = styled(Typography).attrs(() => ({ level: 'p4' }))`
  color: ${({ $appearance }) => appearanceColors[$appearance]?.textColor || 'var(--rds-color-neutral-10)'};
`;

export function Status({ appearance, children }) {
  const renderBullet = [
    'disabled',
    'enabled',
    'info',
    'warning',
    'nodata',
  ].includes(appearance);

  const renderIcon = ['success', 'error'].includes(appearance);

  return (
    <Flex alignItems="center" h="18px">
      {renderBullet && <Bullet $appearance={appearance} data-testid="bullet" />}
      <Flex alignItems="center">
        {renderIcon && (
          <StyledIcon name={icons[appearance]} $appearance={appearance} />
        )}
        <Label $appearance={appearance}>{children}</Label>
      </Flex>
    </Flex>
  );
}

Status.defaultProps = {
  appearance: 'none',
};

Status.propTypes = {
  appearance: PropTypes.oneOf([
    'disabled',
    'enabled',
    'info',
    'warning',
    'nodata',
    'error',
    'success',
    'none',
  ]),
  children: PropTypes.node.isRequired,
};

export default Status;
