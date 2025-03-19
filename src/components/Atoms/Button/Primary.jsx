import React from 'react';

import StyledButton from './CommonButtonStyle';

export default function Primary(props) {
  return <StyledButton appearance="primary" {...props} />;
}

// Added this for storybook
Primary.displayName = 'Button';
