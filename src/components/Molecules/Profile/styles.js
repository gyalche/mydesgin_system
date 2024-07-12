import styled from 'styled-components';
import { Icon, Layout } from 'components/Atoms';

const { Flex } = Layout;

export const UserCardWrapper = styled(Flex)`
  padding: 8px 16px;
  gap: 12px;
`;

export const UserCardImg = styled.img`
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 32px;
`;

/* TODO: Use Typography component later */
export const UserCardEmail = styled.div`
  font-size: 11px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  color: var(--rds-color-neutral-7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const IconWrapper = styled.div`
  font-size: 24px;
  cursor: ${({ $cursor }) => $cursor || 'default'};
`;

export const Container = styled.div`
  position: relative;
`;

export const ItemWrapper = styled(Flex)`
  &:hover {
    background: var(--rds-color-neutral-alpha-1);
  }

  &:active,
  &:focus {
    outline: none;
    background: var(--rds-color-neutral-alpha-2);
  }
`;

/* TODO: Use Typography component later */
export const MainText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: var(--rds-color-neutral-10);
`;

/* TODO: Use Typography component later */
export const HeaderWrapper = styled.div`
  color: var(--rds-color-neutral-7);
  display: flex;
  padding: 12px 20px 8px 20px;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

export const DefaultIcon = styled(Icon)`
  color: var(--rds-color-neutral-4);
`;
