import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'src/components/Atoms';

import { IconWrapper, ItemWrapper, MainText } from './styles';

const Item = ({ as, text, icon, ...props }) => {
  return (
    <ItemWrapper
      alignItems="center"
      cursor="pointer"
      gap="12px"
      pt="8px"
      pr="16px"
      pb="8px"
      pl="16px"
      as={as}
      data-testid="profile-item"
      {...props}
    >
      {icon && (
        <IconWrapper>
          <Icon name={icon} data-testid={`icon-${icon}`}></Icon>
        </IconWrapper>
      )}
      <MainText>{text}</MainText>
    </ItemWrapper>
  );
};

Item.defaultProps = {
  as: 'a',
  text: '',
  icon: null,
};

Item.propTypes = {
  as: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default Item;
