import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Tab from './Tab';

const TabsContainer = styled.div``;

const primaryStyles = css`
  padding: 4px 8px 12px 8px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    `
    color: var(--rds-color-primary-1-dark);
    border-bottom: 1px solid var(--rds-color-primary-1-normal);
  `}
`;

const secondaryStyles = css`
  padding: 8px 12px 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  ${(props) =>
    props.active &&
    `
    color: var(--rds-color-primary-1-dark);
    background-color: var(--rds-color-primary-1-subtle);
  `}
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => gap};
`;

const TabItem = styled.div`
  ${(props) => props.appearance === 'primary' && primaryStyles};
  ${(props) => props.appearance === 'secondary' && secondaryStyles};
`;

const TabContent = styled.div``;

const Tabs = ({ defaultTab, appearance, gap, mt, mb, ml, mr, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderTabContent = () => {
    const activeChild = React.Children.toArray(children).find(
      (child) => child.props.tabKey === activeTab
    );
    return activeChild && activeChild.props.children;
  };

  return (
    <TabsContainer mt={mt} mb={mb} ml={ml} mr={mr}>
      <TabList gap={gap}>
        {React.Children.map(children, (child) => (
          <TabItem
            key={child.props.tabKey}
            active={ activeTab === child.props.tabKey }
            appearance={appearance}
            onClick={() => handleTabClick(child.props.tabKey)}
          >
            {child.props.label}
          </TabItem>
        ))}
      </TabList>
      <TabContent>{renderTabContent()}</TabContent>
    </TabsContainer>
  );
};

Tabs.defaultProps = {
  defaultTab: 'tab1',
  appearance: 'primary',
  gap: '12px',
  mt: '0px',
  mb: '0px',
  ml: '0px',
  mr: '0px',
};

Tabs.propTypes = {
  defaultTab: PropTypes.string,
  appearance: PropTypes.string,
  gap: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== Tab) {
        error = new Error(
          `\`${componentName}\` children should be of type \`Tab\` but received ${child.type}.`
        );
      }
    });
    return error;
  },
};

export default Tabs;
