import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Tab from './Tab';
import { Flex } from '../Layout';

const TabsContainer = styled.div`
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
`;

const primaryStyles = css`
  padding: 4px 8px 4px 8px;
  cursor: pointer;
  background-color: transparent;
`;

const secondaryStyles = css`
  padding: 8px 12px 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--rds-color-neutral-0);
`;

const TabList = styled(Flex).attrs(props => ({
  wrap: 'wrap',
  gap: props.gap,
  mb: props.mb,
}))`
`;

const TabItemContainer = styled.div`
  ${props => (
    props.$active ? `
      border-bottom: 2px solid var(--rds-color-primary-1-normal);
      
      &:hover {
        background-color: transparent;
      }
    ` : `
      border-radius: 40px;

      &:hover {
        background-color: var(--rds-color-neutral-1);
      }
      &:active {
        background-color: var(--rds-color-neutral-2);
      }
    `
  )}
`;

const TabItem = styled.div`
  ${props => props.$active
    && `
    color: var(--rds-color-primary-1-dark);
  `}
  ${props => props.appearance === 'primary' && primaryStyles};
  ${props => props.appearance === 'secondary' && secondaryStyles};
`;

const TabContent = styled.div``;

function Tabs({
  defaultTab, appearance, gap, mt, mb, ml, mr, onClick, children,
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, setActiveTab]);

  const handleTabClick = tabKey => {
    setActiveTab(tabKey);
    if (onClick) {
      onClick(tabKey);
    }
  };

  const renderTabContent = () => {
    const activeChild = React.Children.toArray(children).find(
      child => child.props.tabKey === activeTab,
    );
    return activeChild && activeChild.props.children;
  };

  return (
    <TabsContainer mt={mt} ml={ml} mr={mr}>
      <TabList gap={gap} mb={mb}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return (
              <TabItemContainer $active={activeTab === child.props.tabKey}>
                <TabItem
                  key={child.props.tabKey}
                  appearance={appearance}
                  onClick={() => handleTabClick(child.props.tabKey)}
                >
                  {child.props.label}
                </TabItem>
              </TabItemContainer>

            );
          }
          return null;
        })}
      </TabList>
      <TabContent>{renderTabContent()}</TabContent>
    </TabsContainer>
  );
}

Tabs.defaultProps = {
  defaultTab: '1',
  appearance: 'primary',
  gap: '12px',
  mt: '0px',
  mb: '0px',
  ml: '0px',
  mr: '0px',
  onClick: () => {},
  children: null,
};

Tabs.propTypes = {
  defaultTab: PropTypes.string,
  appearance: PropTypes.string,
  gap: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  onClick: PropTypes.func,
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== Tab) {
        error = new Error(
          `\`${componentName}\` children should be of type \`Tab\` but received ${child.type}.`,
        );
      }
    });
    return error;
  },
};

export default Tabs;
