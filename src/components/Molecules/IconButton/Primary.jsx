import React from 'react';

import { StyledIconButton } from './CommonIconButtonStyle';

export default function Primary({ ...props }) {
  return (
    <StyledIconButton appearance="primary" {...props} />
  );
}

// Added this for storybook
Primary.displayName = 'IconButton';
