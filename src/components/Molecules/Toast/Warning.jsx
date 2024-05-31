import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from 'components/Atoms';

import StyledToast, {
  CloseIcon,
  Description,
  TextContainer,
  ToastContainer,
} from './CommonToastStyle';

const StyledIcon = styled(CloseIcon)`
  color: var(--rds-color-neutral-8);
`;

export default function Warning({
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
      appearance="warning"
      $withDescription={description}
      $isFadingOut={$fadeOut || isFadingOut}
      {...rest}
    >
      <ToastContainer $withDescription={description}>
        <StyledIcon name="alert-polygon-solid-exclamation" />
        <TextContainer>
          <Typography level="h7">{title}</Typography>
          {description && <Description $isWarning>{description}</Description>}
        </TextContainer>
        <StyledIcon
          name="action-cross"
          onClick={closeToast}
          data-testid="close-icon"
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
};

Warning.defaultProps = {
  title: '',
  description: null,
};
