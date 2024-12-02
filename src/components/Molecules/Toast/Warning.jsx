import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography } from 'components/Atoms';

import StyledToast, {
  BtnLabel,
  Description,
  StyledIcon,
  TextContainer,
  ToastButton,
  ToastContainer,
} from './CommonToastStyle';

export default function Warning({
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
      appearance="warning"
      $withDescription={description}
      $isFadingOut={$fadeOut || isFadingOut}
      {...rest}
    >
      <ToastContainer $withDescription={description}>
        <StyledIcon name="alert-polygon-solid-exclamation" />
        <TextContainer $withDescription={description}>
          <Layout.Block mt={description && '4px'}>
            <Typography level="h7">{title}</Typography>
          </Layout.Block>
          {description && <Description $isWarning>{description}</Description>}
          {action && title && btnLabel && description && (
            <ToastButton data-testid="button-id" mt="8px" onClick={action} compact $withDescription={description}>
              <BtnLabel>{btnLabel}</BtnLabel>
            </ToastButton>
          )}
        </TextContainer>
        {action && btnLabel && title && !description && (
          <ToastButton compact data-testid="right-side-btn" onClick={action} $withDescription={description}>
            <BtnLabel>{btnLabel}</BtnLabel>
          </ToastButton> 
        )}
        <StyledIcon
          name="action-cross"
          onClick={closeToast}
          data-testid="close-icon"
          $withDescription={description}
        />
      </ToastContainer>
    </StyledToast>
  );
}

Warning.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  close: PropTypes.func.isRequired,
  $fadeOut: PropTypes.bool,
  action:PropTypes.func,
  btnLabel:PropTypes.string,
};

Warning.defaultProps = {
  title: '',
  description: null,
  action: null,
  btnLabel: 'action',
};
