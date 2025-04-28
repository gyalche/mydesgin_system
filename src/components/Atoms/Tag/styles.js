import styled, { css } from 'styled-components';

import Icon from 'components/Atoms/Icon';

export const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  height: 32px;
  padding: ${props => {
    if (props.hasGraphic) {
      return '0 5px 0 0';
    } if (!props.hasOnClick) {
      return '0 16px';
    }
    return '0 5px 0 16px';
  }};
  border-radius: 40px;
  background-color: #FFFFFF;
  border: 1px solid #A8A19D;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  transition: all 0.2s ease;
  
  ${props => props.hasGraphic && css`
    padding-left: 0;
  `}
  
  ${props => props.isActive && css`
    border-color: #0098BB;
    background-color: #DDD9D652;
  `}
  
  ${props => props.disabled && css`
    background-color: #F5F5F5;
    color: #A8A19D;
    cursor: not-allowed;
  `}
  
  &:hover:not([disabled]) {
    border-color: #0098BB;
    }
  ${props => props.hasOnClick && css`
    &:active:not([disabled]) {
      border-color: #0098BB;
      background-color: #DDD9D652;
    }
  `}
`;

export const TagName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: 8px;
  min-height: 32px;
  min-width: 32px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  
  &:hover:not([disabled]) {
    opacity: 0.8;
  }
  
  &:focus:not([disabled]) {
    outline: none;
  }
`;

export const CrossIcon = styled(Icon)`
  font-size: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GraphicWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 50%;
    background-color: #FFFFFF;
    z-index: -1;
  }
`;
