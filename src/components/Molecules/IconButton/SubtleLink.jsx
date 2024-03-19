import React from 'react';
import { StyledIconButton } from './CommonIconButtonStyle';

export default function SubtleLink({ ...props }) {
  return (
    <StyledIconButton appearance="subtleLink" {...props} />
  );
};
