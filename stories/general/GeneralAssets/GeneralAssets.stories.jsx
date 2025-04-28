import React from 'react';

import Icon from 'components/Atoms/Icon';
import IconGallery from 'components/Organisms/IconGallery';
import LogosGallery from 'components/Organisms/LogosGallery';

export default {
  title: 'General Assets',
  component: Icon,
  tags: ['!dev'],
};

export const IconList = {
  render: () => <IconGallery />,
  args: null,
};

export const LogoList = {
  render: () => <LogosGallery />,
  args: null,
};
