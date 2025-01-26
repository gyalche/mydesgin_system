import React from 'react';

import { StyledIconButton } from './CommonIconButtonStyle';

export default function Subtle({ ...props }) {
  return (
    <StyledIconButton appearance="subtle" {...props} />
  );
}
