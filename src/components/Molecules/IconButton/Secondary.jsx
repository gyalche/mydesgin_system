import React from 'react';

import { StyledIconButton } from './CommonIconButtonStyle';

export default function Secondary({ ...props }) {
  return (
    <StyledIconButton appearance="secondary" {...props} />
  );
}
