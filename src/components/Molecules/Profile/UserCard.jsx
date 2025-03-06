import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/Atoms/Layout';
import { Avatar } from 'components/Atoms';

import {
  IconWrapper,
  MainText,
  UserCardEmail,
  UserCardWrapper,
} from './styles';

function UserCard({ account }) {
  const { name, email, image } = account;
  return (
    <UserCardWrapper alignItems="center">
      <IconWrapper>
        <Avatar name={name} src={image} />
      </IconWrapper>

      <Flex direction="column" minW="0px">
        <MainText level="p2">{name}</MainText>
        <UserCardEmail level="p4">{email}</UserCardEmail>
      </Flex>
    </UserCardWrapper>
  );
}

UserCard.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserCard;
