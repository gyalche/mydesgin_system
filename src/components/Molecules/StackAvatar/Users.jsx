import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Layout, Typography } from 'components/Atoms';

import { Checkbox } from '..';
import { AvatarBorder, UsersWrapper } from './style';

function Users({
  name,
  img,
  onChange,
  usersList,
}) {
  const isChecked = usersList?.some(user => user.name === name && user.img === img);

  return (
    <UsersWrapper
      role="option"
      aria-selected={isChecked}
    >
      <Layout.Flex gap="10px">
        <AvatarBorder>
          <Avatar name={name} img={img} />
        </AvatarBorder>
        <Typography level="p2">{name}</Typography>
      </Layout.Flex>
      <Checkbox
        input={{
          onChange,
          checked: isChecked,
          'aria-label': isChecked ? `Remove ${name}` : `Add ${name}`,
        }}
      />
    </UsersWrapper>
  );
}

Users.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  img: PropTypes.string,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

Users.defaultProps = {
  name: '',
  img: '',
  onChange: () => {},
};

// Use memo to prevent unnecessary re-renders
export default memo(Users);
