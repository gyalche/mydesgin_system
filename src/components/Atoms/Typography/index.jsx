import styled from 'styled-components';
import PropTypes from 'prop-types';

const typographyStyles = {
  h1: { fontSize: '34px', fontWeight: 700 },
  h2: { fontSize: '30px', fontWeight: 700 },
  h3: { fontSize: '28px', fontWeight: 700 },
  h4: { fontSize: '26px', fontWeight: 700 },
  h5: { fontSize: '22px', fontWeight: 700 },
  h6: { fontSize: '18px', fontWeight: 700 },
  h7: { fontSize: '16px', fontWeight: 700 },
  h8: { fontSize: '14px', fontWeight: 700 },
  h9: { fontSize: '12px', fontWeight: 700 },
  p1: { fontSize: '15px', fontWeight: 400 },
  p2: { fontSize: '14px', fontWeight: 400 },
  p3: { fontSize: '12px', fontWeight: 400 },
  p4: { fontSize: '11px', fontWeight: 400 },
};

const Typography = styled.div`
  font-size: ${({ level }) => typographyStyles[level]?.fontSize || typographyStyles.p1.fontSize};
  font-weight: ${({ level }) => typographyStyles[level]?.fontWeight || typographyStyles.p1.fontWeight};
`;

Typography.propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'p1', 'p2', 'p3', 'p4']),
};

Typography.defaultProps = {
  level: 'p1',
};

export default Typography;
