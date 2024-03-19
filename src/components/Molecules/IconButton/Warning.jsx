import React from 'react';
import { StyledIconButton } from './CommonIconButtonStyle';

export default function Warning({ ...props }) {
  return (
    <StyledIconButton appearance="warning" {...props} />
  );
};
