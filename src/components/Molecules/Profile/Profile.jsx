import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'components/Atoms';

import UserCard from './UserCard';
import { Container, DefaultIcon, IconWrapper, UserCardImg } from './styles';

const Profile = ({ width, account, children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const iconRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        !profileRef?.current?.contains(event.target) &&
        !iconRef?.current?.contains(event.target)
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
      {account?.image ? (
        <UserCardImg
          src={account.image}
          onClick={() => handleIsProfileOpen()}
          ref={iconRef}
          data-testid="profile-image"
        />
      ) : (
        <IconWrapper
          onClick={() => handleIsProfileOpen()}
          ref={iconRef}
          $cursor="pointer"
          data-testid="profile-icon-wrapper"
        >
          <DefaultIcon name="Interface-avatar" />
        </IconWrapper>
      )}
      <Dropdown
        scroll={false}
        isOpen={isProfileOpen}
        border="1px solid var(--rds-color-neutral-3)"
        boxShadow="0 4px 8px 0 var(--rds-color-neutral-alpha-3)"
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
};

Profile.defaultProps = {
  width: '208px',
};

Profile.propTypes = {
  width: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};

export default Profile;
