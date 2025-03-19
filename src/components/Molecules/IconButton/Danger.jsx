import React from 'react';

import { StyledIconButton } from './CommonIconButtonStyle';

export default function Danger({ ...props }) {
  return (
    <StyledIconButton appearance="danger" {...props} />
  );
}
