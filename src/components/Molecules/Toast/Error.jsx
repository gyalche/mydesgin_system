import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'src/components/Atoms';
import { Typography } from 'src/components/Atoms';

import StyledToast, {
  CloseIcon,
  Description,
  TextContainer,
  ToastContainer,
} from './CommonToastStyle';

export default function Error({
  title,
  description,
  close,
  $fadeOut,
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
      appearance="error"
      $withDescription={description}
      $isFadingOut={$fadeOut || isFadingOut}
      {...rest}
    >
      <ToastContainer $withDescription={description}>
        <Icon name="alert-circle-solid-cross" />
        <TextContainer>
          <Typography level="h7">{title}</Typography>
          {description && <Description>{description}</Description>}
        </TextContainer>
        <CloseIcon
          name="action-cross"
          onClick={closeToast}
          data-testid="close-icon"
        />
      </ToastContainer>
    </StyledToast>
  );
}

Error.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  close: PropTypes.func.isRequired,
  $fadeOut: PropTypes.bool,
};

Error.defaultProps = {
  title: '',
  description: null,
};
