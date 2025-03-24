import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Typography } from 'components/Atoms';

import AlertStyle, {
  AlertContainer,
  BtnLabel,
  Description,
  TextContainer,
  AlertButton,
  AlertIcon,
} from './styles';

const ICONS = {
  success: 'alert-circle-solid-check',
  info: 'alert-circle-solid-info',
  warning: 'alert-polygon-solid-exclamation',
  error: 'alert-circle-solid-cross',
};

function Alert({
  title,
  description,
  action,
  btnLabel,
  appearance,
  ...rest
}) {
  return (
    <AlertStyle
      appearance={appearance}
      $withDescription={!!description}
      {...rest}
      role="alert"
    >
      <AlertContainer $withDescription={!!description}>
        <AlertIcon name={ICONS[appearance]} appearance={appearance} className="icon-size" />
        <TextContainer $withDescription={!!description}>
          <Layout.Block mt={description ? '5px' : '-5px'}>
            <Typography level="h7">{title}</Typography>
          </Layout.Block>
          {description && <Description>{description}</Description>}
          {action && btnLabel && (
            <AlertButton data-testid="button-id" mt="8px" onClick={action} compact={true} $withDescription={!!description}>
              <BtnLabel>{btnLabel}</BtnLabel>
            </AlertButton>
          )}
        </TextContainer>
      </AlertContainer>
    </AlertStyle>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.func,
  btnLabel: PropTypes.string,
  appearance: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
};

Alert.defaultProps = {
  title: '',
  description: null,
  action: () => {},
  btnLabel: '',
};

export default Alert;
