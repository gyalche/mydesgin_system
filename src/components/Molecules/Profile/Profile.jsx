import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Dropdown } from 'components/Atoms';

import UserCard from './UserCard';
import { Container, IconWrapper } from './styles';

function Profile({ width, account, children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const iconRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        !profileRef?.current?.contains(event.target)
        && !iconRef?.current?.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleIsProfileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <Container>
      <IconWrapper
        onClick={() => handleIsProfileOpen()}
        ref={iconRef}
        $cursor="pointer"
        data-testid="profile-image"
      >
        <Avatar name={account?.name} src={account?.image} />
      </IconWrapper>
      <Dropdown
        scroll={false}
        isOpen={isProfileOpen}
        border="1px solid var(--rds-color-neutral-3)"
        boxShadow="3"
        w={width}
        right="-2px"
        p="8px 0"
        ref={profileRef}
      >
        <UserCard account={account} />
        {children}
      </Dropdown>
    </Container>
  );
}

Profile.displayName = 'Profile';

Profile.propTypes = {
  width: PropTypes.string.isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};

export default Profile;
