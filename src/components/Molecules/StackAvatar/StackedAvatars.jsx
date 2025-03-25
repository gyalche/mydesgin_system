import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from 'components/Atoms';

import { AvatarBorder, StackedUsers } from './style';

function StackedAvatars({ users, max }) {
  return (
    <StackedUsers>
      {users?.slice(0, max)?.map(user => (
        <AvatarBorder key={user?.name}>
          <Avatar key={user?.name} name={user?.name} />
        </AvatarBorder>
      ))}
    </StackedUsers>
  );
}

StackedAvatars.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  max: PropTypes.number.isRequired,
};

export default StackedAvatars;
