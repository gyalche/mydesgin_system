import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Logo from 'src/components/Atoms/Logo';

const ProductLogo = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

const DropDownProductTitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: var(--rds-color-neutral-10);
`;

const DropDownProductSubtitle = styled.span`
  font-size: 12px;
  text-align: left;
  font-weight: 400;
  color: var(--rds-color-neutral-7);
  display: flex;
`;

const TextContainer = styled.div`
  display: block;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropDownItem = styled.a`
  text-decoration: none;
  display: flex;
  margin-right: -20px;
  margin-left: -20px;
  padding: 8px 20px 8px 20px;
  &:hover {
    background-color: var(--rds-color-neutral-1);
    cursor: pointer;
  }
`;

function AppLink({
  link,
  product,
  productName,
  onClick,
  isActive,
  description,
}) {
  
  const logoMap = {
    reception: <Logo.Receptionist />,
    meetingroom: <Logo.ReceptionistRooms />,
    scheduling: <Logo.ReceptionistScheduling />,
    other: <Logo.ReceptionistDiscovery />,
  };

  const logo = logoMap[product] || null;

  return (
    <DropDownItem 
      href={!isActive ? link : null}
      onClick={isActive ? () => onClick() : null}
      target="_blank"
    >
      <LinkContainer>
        <ProductLogo>
          {logo}
        </ProductLogo>
        <TextContainer>
          <DropDownProductTitle>
            {productName}
          </DropDownProductTitle>
          {!isActive && <DropDownProductSubtitle>{description}</DropDownProductSubtitle>}
        </TextContainer>
      </LinkContainer>
    </DropDownItem>
  );
}

AppLink.defaultProps = {
  link: null,
  product: null,
  productName: null,
  onClick: null,
  isActive: true,
  description: null,
};

AppLink.propTypes = {
  link: PropTypes.string,
  product: PropTypes.string,
  productName: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  description: PropTypes.string,
};

export default AppLink;
