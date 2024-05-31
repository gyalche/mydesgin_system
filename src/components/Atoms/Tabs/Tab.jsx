import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabContainer = styled.div``;

const Tab = ({ tabKey, label, children }) => {
  return (
    <TabContainer tabKey={tabKey} label={label}>
      {children}
    </TabContainer>
  );
};

Tab.defaultProps = {
  tabKey: null,
  label: 'tab1',
  children: null,
};

Tab.propTypes = {
  tabKey: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.node,
};

export default Tab;
