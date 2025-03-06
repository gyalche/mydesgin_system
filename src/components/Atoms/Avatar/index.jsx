import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Define all color pairs
const colorPairs = [
  css`
    background-color: var(--rds-color-tertiary-2-subtle);
    color: var(--rds-color-tertiary-2-intense);
  `,
  css`
    background-color: var(--rds-color-secondary-2-pale);
    color: var(--rds-color-secondary-2-intense);
  `,
  css`
    background-color: var(--rds-color-tertiary-1-subtle);
    color: var(--rds-color-tertiary-1-intense);
  `,
  css`
    background-color: var(--rds-color-secondary-3-subtle);
    color: var(--rds-color-secondary-3-intense);
  `,
  css`
    background-color: var(--rds-color-secondary-1-subtle);
    color: var(--rds-color-secondary-1-deep);
  `,
  css`
    background-color: var(--rds-color-primary-1-subtle);
    color: var(--rds-color-primary-1-intense);
  `,
  css`
    background-color: var(--rds-color-tertiary-3-subtle);
    color: var(--rds-color-tertiary-3-intense);
  `,
  css`
    background-color: var(--rds-color-tertiary-4-subtle);
    color: var(--rds-color-tertiary-4-intense);
  `,
  css`
    background-color: var(--rds-color-neutral-2);
    color: var(--rds-color-neutral-8);
  `,
];

// Get color pair based on the Unicode of the first character
const getColorPair = char => {
  const unicode = char?.charCodeAt(0);
  const index = unicode % 9;
  return colorPairs[index];
};

const avatarSize = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

// Styled component with dynamic styles based on the color pair
export const CommonAvatarStyle = styled.div`
  display: flex;
  width: ${({ size }) => avatarSize[size]};
  height: ${({ size }) => avatarSize[size]};
  align-items: center;
  justify-content: center;
  border-radius: ${({ size }) => avatarSize[size]};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 400;
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  padding: ${({ padding }) => padding};
  ${({ colorStyle }) => colorStyle}

  img {
    width: ${({ size }) => avatarSize[size]};
    height: ${({ size }) => avatarSize[size]};
    border-radius: ${({ size }) => avatarSize[size]};
    object-fit: cover;
  }
`;

function Avatar({ name, src, ...props }) {
  const [isImageValid, setIsImageValid] = useState(true);

  const usernameFirstChar = useMemo(() => name?.trim()[0]?.toUpperCase(), [name]);

  const colorStyle = useMemo(() => getColorPair(usernameFirstChar), [usernameFirstChar]);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsImageValid(true);
      img.onerror = () => setIsImageValid(false);
    } else {
      setIsImageValid(false);
    }
  }, [src]);

  return (
    <CommonAvatarStyle colorStyle={colorStyle} {...props}>
      {isImageValid && src ? (
        <img
          src={src}
          alt={name}
        />
      ) : (
        usernameFirstChar
      )}
    </CommonAvatarStyle>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  size: PropTypes.string,
};

Avatar.defaultProps = {
  src: '',
  padding: '0 4px',
  fontSize: '12px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  size: 'medium',
};

export default Avatar;
