import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/Atoms/Icon';
import AppLink from './AppLink.jsx';

const IconContainer = styled.div`
  height: 32px;
  width: 32px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${props => props.$open ? 'var(--rds-color-neutral-3)' : 'transparent'};
  box-shadow: ${props => props.$open ? '0px 4px 4px 0px var(--rds-color-neutral-3)' : 'none'};
  border-radius: ${props => props.$open ? '4px' : 'none'};
`;

const Divider = styled.div`
  margin: 12px 0 12px -20px;
  width: ${props => props.width};
  border-bottom: ${props => props.$displayLine ? '2px solid var(--rds-color-neutral-3)' : ''};
`;

const OwnedProduct = styled.div``;

const OtherProduct = styled.div``;

const DropDownSectionTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin: 12px 0 8px 0;
  text-align: left;
  color: var(--rds-color-neutral-7);
`;

const AppSwitcherContent = styled.div`
  position: absolute;
  z-index: 10;
  border-radius: 4px;
  border: 1px solid var(--rds-color-neutral-3);
  padding: 8px 20px 8px 20px;
  width: ${props => props.width};
  background-color: var(--rds-color-neutral-0);
  box-shadow: 0 4px 8px 0 var(--rds-color-neutral-4);
`;

function AppSwitcher({
  owned,
  other,
  ownedLabel,
  otherLabel,
  currentApp,
  width,
}) {
  const [toggled, setToggled] = useState(false);
  const appSwitcherRef = useRef(null);

  const handleClickOutside = event => {
    if (
      appSwitcherRef.current &&
      !appSwitcherRef.current.contains(event.target)
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
    <div ref={ appSwitcherRef }>
      <IconContainer
        onClick={() => setToggled(!toggled)}
        data-testid="grid-icon-button"
        $open={toggled}
      >
        <Icon
          name='global-menu-grid'
        />
      </IconContainer>
      {toggled && (
        <AppSwitcherContent width={width} data-testid="dropdown-container">
        {owned.length > 0 && (
          <>
          <DropDownSectionTitle>
            {ownedLabel}
          </DropDownSectionTitle>
          <OwnedProduct>
            {owned.map(({ product_type, name, onClick, description }) => {
              if (product_type !== currentApp) {
                return (
                  <AppLink
                    key={'appLink-' + product_type}
                    product={product_type}
                    productName={name}
                    onClick={() => onClick()}
                    isActive
                    currentApp={currentApp}
                    description={description}
                  />
                );
              }
              return null;
            })}
              </OwnedProduct>
              <Divider $displayLine={owned.length > 0 && other.length > 0} width={width}/>
          </>)}
          {other.length > 0 && (
            <>
          <DropDownSectionTitle>
            {otherLabel}
          </DropDownSectionTitle>
          <OtherProduct>
            {other.map(({ product_type, link, name, description }) => (
              <AppLink
                key={'appLink-' + product_type}
                link={link}
                product={product_type}
                productName={name}
                isActive={false}
                description={description}
              />
            ))}
          </OtherProduct>
          </> )}
        </AppSwitcherContent>
      )}
    </div>
  );
}

AppSwitcher.defaultProps = {
  owned: null,
  other: null,
  ownedLabel: null,
  otherLabel: null,
  currentApp: null,
  width: '347px',
};

AppSwitcher.propTypes = {
  owned: PropTypes.array,
  other: PropTypes.array,
  ownedLabel: PropTypes.string,
  otherLabel: PropTypes.string,
  currentApp: PropTypes.string,
  width: PropTypes.string,
};

export default AppSwitcher;
