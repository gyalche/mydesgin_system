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

const UserCard = ({ account }) => {
  const { name, email, image } = account;
  return (
    <UserCardWrapper alignItems="center">
      <IconWrapper>
        <Avatar name={name} src={image}/>
      </IconWrapper>
  
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
