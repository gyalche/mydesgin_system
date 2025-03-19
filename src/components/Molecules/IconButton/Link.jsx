import React from 'react';

import { StyledIconButton } from './CommonIconButtonStyle';

export default function Link({ ...props }) {
  return (
    <StyledIconButton appearance="link" {...props} />
  );
}
