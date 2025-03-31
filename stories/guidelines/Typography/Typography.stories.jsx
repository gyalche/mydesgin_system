import React from 'react';
import styled from 'styled-components';

import Typography, { typographyStyles } from 'components/Atoms/Typography';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Guidelines/Typography',
  component: Typography,
  tags: ['!dev'],
};

const Row = styled(Layout.Item)`
  border-bottom: 1px solid var(--rds-color-neutral-1);
  align-content: center;
`;

export const TypographyList = {
  render: () => {
    const typographyStylesList = Object.getOwnPropertyNames(typographyStyles);
    return (
      <Layout.Flex direction="column">
        {typographyStylesList.map(key => (
          <Row minH="70px" key={key}>
            <Layout.Flex>
              <Layout.Item>
                <Typography level={key}>{`Typography-${key}`}</Typography>
              </Layout.Item>
              <Layout.Item flex="0" minW="100px" color="var(--rds-color-neutral-5)">
                <Layout.Flex direction="column">
                  <Layout.Item>
                    <Typography level="p3">{`font-size ${typographyStyles[key].fontSize}`}</Typography>
                  </Layout.Item>
                  <Layout.Item>
                    <Typography level="p3">{`font-weight ${typographyStyles[key].fontWeight}`}</Typography>
                  </Layout.Item>
                </Layout.Flex>
              </Layout.Item>
            </Layout.Flex>
          </Row>
        ))}
      </Layout.Flex>
    );
  },
};
