import styled from 'styled-components';

import { Icon } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';

export const StackAvatarContainer = styled(Flex)``;

export const Header = styled(Flex).attrs(() => ({
  w: '100%',
  h: '100px',
  direction: 'column',
  gap: '10px',
}))`
  padding: 15px;
`;

export const AddAvatar = styled(Flex).attrs(() => ({
  minW: '32px',
  minH: '32px',
  alignItems: 'center',
  justifyContent: 'center',
}))`
  border-radius: 100%;
  cursor: pointer;
  background-color: ${({ opened }) => opened && 'var(--rds-color-neutral-2)'};

  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;

export const DropDownWrapper = styled(Flex).attrs(() => ({
  gap: '10px',
  ml: '-8px',
  mt: '2px',
}))`
`;

export const AddIcon = styled(Icon)`
  font-size: 20px;
  color: var(--rds-color-neutral-11);
  margin-top: 3px;
`;

export const UsersWrapper = styled(Flex).attrs(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
}))`
  padding: 8px;
  border-radius: 6px;

  &:hover {
    background-color: var(--rds-color-neutral-1);
  }
`;

export const StackedUsers = styled(Flex)`
  & > *:not(:first-child) {
    margin-left: -8px;
  };
`;

export const AvatarBorder = styled.div`
  border: 2px solid var(--rds-color-neutral-0);
  height: 36px;
  border-radius: 100%;
  background-color: var(--rds-color-neutral-0);
`;
