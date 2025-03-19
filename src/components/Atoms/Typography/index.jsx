import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const typographyStyles = {
  h1: { fontSize: '42px', fontWeight: 700 },
  h2: { fontSize: '35px', fontWeight: 700 },
  h3: { fontSize: '29px', fontWeight: 700 },
  h4: { fontSize: '24px', fontWeight: 700 },
  h5: { fontSize: '20px', fontWeight: 700 },
  h6: { fontSize: '17px', fontWeight: 700 },
  h7: { fontSize: '14px', fontWeight: 700 },
  h8: { fontSize: '12px', fontWeight: 700 },
  h9: { fontSize: '10px', fontWeight: 700 },
  p1: { fontSize: '17px', fontWeight: 400 },
  p2: { fontSize: '14px', fontWeight: 400 },
  p3: { fontSize: '12px', fontWeight: 400 },
  p4: { fontSize: '10px', fontWeight: 400 },
};

const Typography = styled(({ as, ...rest }) => React.createElement(as || 'div', rest))`
  font-size: ${({ level }) => typographyStyles[level]?.fontSize || typographyStyles.p1.fontSize};
  font-weight: ${({ level }) => typographyStyles[level]?.fontWeight || typographyStyles.p1.fontWeight};
`;

Typography.displayName = 'Typography';

Typography.propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'p1', 'p2', 'p3', 'p4']),
  as: PropTypes.string,
};

Typography.defaultProps = {
  level: 'p1',
};

export default Typography;
