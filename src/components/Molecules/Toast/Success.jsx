import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/Atoms';
import { Typography } from 'components/Atoms';
import StyledToast, {
  BtnLabel,
  CloseIcon,
  Description,
  TextContainer,
  ToastButton,
  ToastContainer,
  ToastIcon,
} from './CommonToastStyle';

export default function Success({
  title,
  description,
  close,
  $fadeOut,
  action,
  btnLabel,
  ...rest
}) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const closeToast = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      close();
    }, 1000);
  };

  return (
    <StyledToast
      appearance="success"
      $withDescription={description}
      $isFadingOut={$fadeOut || isFadingOut}
      {...rest}
    >
      <ToastContainer $withDescription={description}>
        <ToastIcon name="alert-circle-solid-check" />
        <TextContainer $withDescription={description}>
          <Layout.Block mt={description && '8px'}>
            <Typography level="h7">{title}</Typography>
          </Layout.Block>
          {description && <Description>{description}</Description>}
          {action && btnLabel && title && btnLabel && description && (
            <ToastButton data-testid="button-id" mt="8px" onClick={action} compact $withDescription={description}>
              <BtnLabel>{btnLabel}</BtnLabel>
            </ToastButton>
          )}
        </TextContainer>
        {action && btnLabel && title && !description && (
          <ToastButton data-testid="right-side-btn" onClick={action} compact $withDescription={description}>
            <BtnLabel>{btnLabel}</BtnLabel>
          </ToastButton>
        )}
        <CloseIcon
          name="action-cross"
          onClick={closeToast}
          data-testid="close-icon"
          $withDescription={description}
        />
      </ToastContainer>
    </StyledToast>
  );
}

Success.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  close: PropTypes.func.isRequired,
  $fadeOut: PropTypes.bool,
  action: PropTypes.func,
  btnLabel: PropTypes.string,
};

Success.defaultProps = {
  title: '',
  description: null,
  action: null,
  btnLabel: 'action',
};
