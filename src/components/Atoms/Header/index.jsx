import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Layout from 'src/components/Atoms/Layout';

const HeaderContainer = styled.header`
  background-color: var(--rds-color-neutral-1);
  padding: 8px 16px;
  position: fixed;
  top: 0;
  height: 48px;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const MainContentWrapper = styled.div`
  padding-top: 48px; /* this will offset the page vertically when the header is used it needs to be the same as the HeaderContainer's height */
`;

const Header = ({ leftContent, centerContent, rightContent }) => {

  return (
    <HeaderContainer>
      <MainContentWrapper />
      <Layout.Flex>
        <Layout.Item flex="1">
          <Layout.Flex gap="18px" data-testid="leftSection">
            {leftContent}
          </Layout.Flex>
        </Layout.Item>
        <Layout.Item flex="1">
          <Layout.Flex gap="18px" justifyContent="center" data-testid="centerSection">
            {centerContent}
          </Layout.Flex>
        </Layout.Item>
        <Layout.Item flex="1">
          <Layout.Flex gap="18px" justifyContent="flex-end" data-testid="rightSection">
            {rightContent}
          </Layout.Flex>
        </Layout.Item>
      </Layout.Flex>
    </HeaderContainer>
  );
};

Header.propTypes = {
  leftContent: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  centerContent: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  rightContent: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ])
};

Header.defaultProps = {
  leftContent: null,
  centerContent: null,
  rightContent: null
};

export default Header;
