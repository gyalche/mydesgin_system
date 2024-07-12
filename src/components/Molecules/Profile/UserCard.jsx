import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/Atoms/Layout';

import {
  DefaultIcon,
  IconWrapper,
  MainText,
  UserCardEmail,
  UserCardImg,
  UserCardWrapper,
} from './styles';

const UserCard = ({ account }) => {
  const { name, email, image } = account;
  return (
    <UserCardWrapper alignItems="center">
      {image ? (
        <UserCardImg src={image} />
      ) : (
        <IconWrapper>
          <DefaultIcon name="Interface-avatar" />
        </IconWrapper>
      )}
      <Flex direction="column" minW="0px">
        <MainText>{name}</MainText>
        <UserCardEmail>{email}</UserCardEmail>
      </Flex>
    </UserCardWrapper>
  );
};

UserCard.defaultProps = {
  name: '',
  email: '',
  image: '',
};

UserCard.propTypes = {
  account: PropTypes.object.isRequired,
};

export default UserCard;
