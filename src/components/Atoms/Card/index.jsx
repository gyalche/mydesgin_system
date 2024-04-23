import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  background-color: var(--rds-color-neutral-0); 
  border-radius: 8px;
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ padding }) => padding};
`;

Card.propTypes = {
  padding: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
};

Card.defaultProps = {
  padding: '8px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default Card;
