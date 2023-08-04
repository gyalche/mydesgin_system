
import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../../src/components/Atoms/Icon';
import * as logos from '../../../src/components/Atoms/Logo'
import icons from "../../../src/icons/rds-icons.module.css";

export default {
  title: "Atoms/Icon",
  component: Icon,
};

export const IndividualTest = {
  title: "Icon",
  render: ({ name }) => (
    <Icon name={name}></Icon>
  ),
  args: {
    name: "global-cog",
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
  title: "Icon List",
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
    )
  },
  args: null,
};

export const LogoList = {
  title: "Logo List",
  render: () => {
    const logoNameList = Object.getOwnPropertyNames(logos);

    return (
      <div>
        {logoNameList.map(key => {
          const Logo = logos[key]
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
    )
  },
  args: null,
};
