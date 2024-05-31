
import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Atoms/Icon';
import * as logos from 'components/Atoms/Logo';
import icons from 'shared/css/icons.module.css';

export default {
  title: 'Design System/Atoms/Icon',
  component: Icon,
};

export const IndividualTest = {
  title: 'Icon',
  render: ({ name }) => (
    <Icon name={name}></Icon>
  ),
  args: {
    name: 'global-cog',
  }
};

const PreviewItem = styled.div`
  display: inline-block;
  margin: 10px;
  width: 70px;
`;

const Content = styled.span`
  background: #f5f5f5;
  border-radius: 3px 3px 0 0;
  color: #333;
  display: inline-block;
  font-size: 40px;
  text-align: center;
  width: 100%;
  padding: 10px 0 0;
`;

const Label = styled.span`
  background: #ddd;
  border-radius: 0 0 3px 3px;
  box-sizing: border-box;
  color: #666;
  display: inline-block;
  font-size: 10px;
  font-family: sans-serif;
  overflow: hidden;
  padding: 5px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const IconList = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=131-1294&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  title: 'Icon List',
  render: () => {
    const iconNameList = Object.getOwnPropertyNames(icons).map(key => key.substring(4,key.length));
    return (
      <div>
        {iconNameList.map(key => (
          <PreviewItem title={key}>
            <Content>
              <Icon name={key}></Icon>
            </Content>
            <Label>{key}</Label>
          </PreviewItem>
        ))}
      </div>
    );
  },
  args: null,
};

export const LogoList = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=131-1294&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  title: 'Logo List',
  render: () => {
    const logoNameList = Object.getOwnPropertyNames(logos);

    return (
      <div>
        {logoNameList.map(key => {
          const Logo = logos[key];
          return (
            <PreviewItem title={key}>
              <Content>
                <Logo style={{width: '36px'}}/>
              </Content>
              <Label>{key}</Label>
            </PreviewItem>
          );
        })}
      </div>
    );
  },
  args: null,
};
