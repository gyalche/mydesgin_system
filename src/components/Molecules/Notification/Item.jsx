import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Typography } from 'components/Atoms';

const Container = styled.div`
  display: flex;
  padding: 8px 16px 8px 16px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: var(--rds-color-neutral-2);
  }
`;

function NotificationItem({
  title,
  category,
  date,
}) {
  return (
    <Container data-testid="notification-item">
      <div>
        <Typography level="p1">{title}</Typography>
        <Typography level="p4">
          {/* eslint-disable-next-line */}
          {category} | {date}
        </Typography>
      </div>
    </Container>
  );
}

NotificationItem.defaultProps = {
  title: 'Title',
  category: 'Category',
  date: '2025/04/01',
};

NotificationItem.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
};

export default NotificationItem;
