import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'components/Atoms';
import Dropdown from 'components/Atoms/Dropdown';

import NotificationItem from './Item';

const IconContainer = styled.div`
  height: 32px;
  width: 32px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Container = styled.div`
  position: relative;
`;

// TODO: Extract this to a component to apply in other places.
const NotificationDot = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: var(--rds-color-secondary-3-dark);
`;

function Notification({ notifications, hasDot }) {
  const [toggled, setToggled] = useState(false);

  const NotificationRef = useRef(null);

  const handleClickOutside = event => {
    if (
      NotificationRef.current
      && !NotificationRef.current.contains(event.target)
    ) {
      setToggled(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={NotificationRef}>
      <IconContainer
        onClick={() => setToggled(!toggled)}
        data-testid="bell-icon-button"
        $open={toggled}
      >
        <Icon name="Interface-bell" />
        {hasDot && <NotificationDot />}
      </IconContainer>
      <Dropdown
        isOpen={toggled}
        w="355px"
        h="auto"
        right="-2px"
        mt="4px"
        p="8px 0px 8px 0px"
        overflowX="hidden"
      >
        {notifications && notifications.map(notif => (
          <NotificationItem
            key={notif.title}
            title={notif.title}
            category={notif.category}
            date={notif.date}
          />
        ))}
      </Dropdown>
    </Container>
  );
}

Notification.defaultProps = {
  notifications: [],
  hasDot: false,
};

Notification.propTypes = {
  notifications: PropTypes.oneOfType([PropTypes.array]),
  hasDot: PropTypes.bool,
};

export default Notification;
